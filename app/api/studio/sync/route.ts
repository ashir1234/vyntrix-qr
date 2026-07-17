import { NextResponse } from "next/server";
import { getUserId, syncSignedInUser } from "@/lib/authServer";
import { getUserPlan } from "@/lib/billing";
import { getAppUser, saveUserStudioState } from "@/lib/db";
import { PLAN_LIMITS } from "@/lib/plans";
import {
  parseStudioCloudJson,
  sanitizeStudioCloudState,
  studioCloudToJson,
} from "@/lib/qr/studioCloud";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const plan = await getUserPlan(userId);
  if (!PLAN_LIMITS[plan].cloudSync) {
    return NextResponse.json(
      { error: "Cloud Studio sync is a Pro feature.", code: "upgrade_required" },
      { status: 402 },
    );
  }

  const user = await getAppUser(userId);
  const state = parseStudioCloudJson(user?.studio_state ?? null);

  return NextResponse.json({
    state,
    updatedAt: user?.studio_updated_at ?? null,
  });
}

export async function PUT(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const plan = await getUserPlan(userId);
  if (!PLAN_LIMITS[plan].cloudSync) {
    return NextResponse.json(
      { error: "Cloud Studio sync is a Pro feature.", code: "upgrade_required" },
      { status: 402 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const state = sanitizeStudioCloudState(body);
  if (!state) {
    return NextResponse.json({ error: "Invalid studio state." }, { status: 400 });
  }

  await syncSignedInUser();
  await saveUserStudioState(userId, studioCloudToJson(state), state.updatedAt);

  return NextResponse.json({ ok: true, updatedAt: state.updatedAt });
}
