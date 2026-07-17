import { NextResponse } from "next/server";
import { getUserId, syncSignedInUser } from "@/lib/authServer";
import { getUserPlan } from "@/lib/billing";
import {
  countProjectsByUser,
  createProject,
  deleteProject,
  getProject,
  listProjectsByUser,
  updateProject,
} from "@/lib/db";
import { generateEditToken } from "@/lib/ids";
import { PLAN_LIMITS } from "@/lib/plans";
import { designToJson, sanitizeDesign } from "@/lib/qr/design";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function projectJson(p: Awaited<ReturnType<typeof getProject>>) {
  if (!p) return null;
  let fields: unknown = {};
  let design: unknown = null;
  try {
    fields = JSON.parse(p.fields_json);
  } catch {
    /* keep {} */
  }
  try {
    design = JSON.parse(p.design_json);
  } catch {
    /* keep null */
  }
  return {
    id: p.id,
    name: p.name,
    kind: p.kind,
    contentType: p.content_type,
    fields,
    design,
    dynamicSlug: p.dynamic_slug,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  };
}

export async function GET() {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const plan = await getUserPlan(userId);
  const max = PLAN_LIMITS[plan].maxProjects;
  if (max === 0) {
    return NextResponse.json(
      { error: "Projects are a Pro feature.", code: "upgrade_required" },
      { status: 402 },
    );
  }

  const projects = await listProjectsByUser(userId);
  return NextResponse.json({
    projects: projects.map((p) => projectJson(p)),
    maxProjects: max,
  });
}

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const plan = await getUserPlan(userId);
  const max = PLAN_LIMITS[plan].maxProjects;
  if (max === 0) {
    return NextResponse.json(
      { error: "Projects are a Pro feature.", code: "upgrade_required" },
      { status: 402 },
    );
  }

  let body: {
    name?: string;
    kind?: "static" | "dynamic";
    contentType?: string;
    fields?: unknown;
    design?: unknown;
    dynamicSlug?: string | null;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 80);
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  const design = sanitizeDesign(body.design);
  if (!design) {
    return NextResponse.json({ error: "Invalid design." }, { status: 400 });
  }

  if (max !== null) {
    const count = await countProjectsByUser(userId);
    if (count >= max) {
      return NextResponse.json(
        {
          error: `You've reached your plan limit of ${max} projects.`,
          code: "quota_exceeded",
        },
        { status: 402 },
      );
    }
  }

  await syncSignedInUser();
  const id = `prj_${generateEditToken().slice(0, 16)}`;
  const row = await createProject({
    id,
    userId,
    name,
    kind: body.kind === "dynamic" ? "dynamic" : "static",
    contentType: body.contentType ?? "url",
    fieldsJson: JSON.stringify(body.fields ?? {}),
    designJson: designToJson(design) ?? "{}",
    dynamicSlug: body.dynamicSlug ?? null,
  });

  return NextResponse.json(projectJson(row), { status: 201 });
}

export async function PATCH(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const plan = await getUserPlan(userId);
  if (PLAN_LIMITS[plan].maxProjects === 0) {
    return NextResponse.json(
      { error: "Projects are a Pro feature.", code: "upgrade_required" },
      { status: 402 },
    );
  }

  let body: {
    id?: string;
    name?: string;
    fields?: unknown;
    design?: unknown;
    dynamicSlug?: string | null;
    kind?: "static" | "dynamic";
    contentType?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const design =
    body.design !== undefined ? sanitizeDesign(body.design) : undefined;
  if (body.design !== undefined && !design) {
    return NextResponse.json({ error: "Invalid design." }, { status: 400 });
  }

  const row = await updateProject(body.id, userId, {
    name: body.name,
    fieldsJson:
      body.fields !== undefined ? JSON.stringify(body.fields) : undefined,
    designJson: design ? designToJson(design) ?? undefined : undefined,
    dynamicSlug: body.dynamicSlug,
    kind: body.kind,
    contentType: body.contentType,
  });

  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json(projectJson(row));
}

export async function DELETE(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }
  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }
  const ok = await deleteProject(id, userId);
  if (!ok) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
