import { getAllScans, getQrCode } from "@/lib/db";
import { getUserPlan } from "@/lib/billing";
import { PLAN_LIMITS } from "@/lib/plans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

function csvCell(value: string | number | null): string {
  const s = value == null ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const token = new URL(req.url).searchParams.get("token");

  const row = await getQrCode(slug);
  if (!row) {
    return Response.json({ error: "Not found." }, { status: 404 });
  }
  if (!token || token !== row.edit_token) {
    return Response.json({ error: "Unauthorized." }, { status: 401 });
  }

  const plan = await getUserPlan(row.user_id);
  if (!PLAN_LIMITS[plan].csvExport) {
    return Response.json(
      { error: "CSV export is a Pro feature.", code: "upgrade_required" },
      { status: 402 },
    );
  }

  const scans = await getAllScans(slug);
  const header = ["timestamp", "device", "os", "browser", "referer", "country"];
  const lines = [header.join(",")];
  for (const s of scans) {
    lines.push(
      [
        new Date(s.ts).toISOString(),
        csvCell(s.device),
        csvCell(s.os),
        csvCell(s.browser),
        csvCell(s.referer),
        csvCell(s.country),
      ].join(","),
    );
  }

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="vyntrix-${slug}-scans.csv"`,
    },
  });
}
