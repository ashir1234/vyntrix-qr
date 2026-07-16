import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const client = siteConfig.adsenseClient; // e.g. ca-pub-1234567890123456
  const pub = client.replace(/^ca-/, ""); // -> pub-1234567890123456
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Set NEXT_PUBLIC_ADSENSE_CLIENT to populate ads.txt\n";
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
