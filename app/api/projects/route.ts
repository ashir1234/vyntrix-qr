import { NextResponse } from "next/server";
import { getUserId, syncSignedInUser } from "@/lib/authServer";
import { getUserPlan } from "@/lib/billing";
import {
  countProjectsByUser,
  createProject,
  deleteProject,
  getProject,
  listProjectsByUser,
  listQrCodesByProject,
  renameProject,
  setQrProject,
} from "@/lib/db";
import { generateEditToken } from "@/lib/ids";
import { PLAN_LIMITS } from "@/lib/plans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function codeJson(c: Awaited<ReturnType<typeof listQrCodesByProject>>[number]) {
  return {
    slug: c.slug,
    title: c.title,
    destination: c.destination,
    editToken: c.edit_token,
    design: c.design,
    projectId: c.project_id,
    createdAt: c.created_at,
  };
}

async function projectWithCodes(
  p: NonNullable<Awaited<ReturnType<typeof getProject>>>,
) {
  const codes = await listQrCodesByProject(p.id);
  return {
    id: p.id,
    name: p.name,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
    codeCount: codes.length,
    codes: codes.map(codeJson),
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
  const withCodes = await Promise.all(projects.map(projectWithCodes));
  return NextResponse.json({
    projects: withCodes,
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

  let body: { name?: string; slugs?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 80);
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
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
  const row = await createProject({ id, userId, name });

  const slugs = Array.isArray(body.slugs) ? body.slugs : [];
  for (const slug of slugs) {
    await setQrProject(String(slug), userId, id);
  }

  return NextResponse.json(await projectWithCodes(row), { status: 201 });
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
    /** Assign these slugs to the project. */
    addSlugs?: string[];
    /** Remove these slugs from the project (set project_id null). */
    removeSlugs?: string[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  let row = await getProject(body.id);
  if (!row || row.user_id !== userId) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  if (body.name?.trim()) {
    row = (await renameProject(body.id, userId, body.name.trim())) ?? row;
  }

  for (const slug of body.addSlugs ?? []) {
    await setQrProject(String(slug), userId, body.id);
  }
  for (const slug of body.removeSlugs ?? []) {
    const code = await setQrProject(String(slug), userId, null);
    void code;
  }

  const fresh = await getProject(body.id);
  if (!fresh) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json(await projectWithCodes(fresh));
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
