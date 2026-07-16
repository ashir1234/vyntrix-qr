import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = await readFile(join(root, "public", "logo.svg"));

const sizes = [16, 32, 48];
const pngs = await Promise.all(
  sizes.map((s) =>
    sharp(svg, { density: 384 }).resize(s, s).png().toBuffer(),
  ),
);

// Build a multi-image ICO that embeds PNGs (Vista+ format).
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4); // image count

const entries = [];
let offset = 6 + 16 * sizes.length;
for (let i = 0; i < sizes.length; i++) {
  const size = sizes[i];
  const png = pngs[i];
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // width
  entry.writeUInt8(size === 256 ? 0 : size, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(png.length, 8); // size of image data
  entry.writeUInt32LE(offset, 12); // offset
  offset += png.length;
  entries.push(entry);
}

const ico = Buffer.concat([header, ...entries, ...pngs]);
await writeFile(join(root, "app", "favicon.ico"), ico);
console.log(`Wrote favicon.ico (${ico.length} bytes) sizes: ${sizes.join(", ")}`);
