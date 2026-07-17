"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StaticQr } from "@/components/gallery/StaticQr";
import {
  defaultSavedDesign,
  type SavedQrDesign,
} from "@/lib/qr/design";
import { trackEvent } from "@/lib/analytics";

interface CodeBrief {
  slug: string;
  title: string | null;
  destination: string;
  editToken: string;
  design: SavedQrDesign | null;
  projectId: string | null;
  createdAt: number;
}

interface ProjectItem {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  codeCount: number;
  codes: CodeBrief[];
}

export function ProjectsPanel({
  isPro,
  allCodes,
  origin,
}: {
  isPro: boolean;
  allCodes: CodeBrief[];
  origin: string;
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isPro) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to load projects.");
      setProjects(json.projects ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }, [isPro]);

  useEffect(() => {
    void load();
  }, [load]);

  const unassigned = useMemo(() => {
    const inProject = new Set(
      projects.flatMap((p) => p.codes.map((c) => c.slug)),
    );
    return allCodes.filter((c) => !inProject.has(c.slug));
  }, [allCodes, projects]);

  const create = async () => {
    const name = newName.trim();
    if (!name) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not create project.");
      setProjects((list) => [json, ...list]);
      setExpanded((e) => ({ ...e, [json.id]: true }));
      setNewName("");
      trackEvent("project_create");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create failed.");
    } finally {
      setCreating(false);
    }
  };

  const removeProject = async (id: string, name: string) => {
    if (
      !confirm(
        `Delete project “${name}”? Your QR codes stay — they just leave the folder.`,
      )
    )
      return;
    setBusy(`del:${id}`);
    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((list) => list.filter((p) => p.id !== id));
        trackEvent("project_delete");
        router.refresh();
      }
    } finally {
      setBusy(null);
    }
  };

  const addCode = async (projectId: string, slug: string) => {
    if (!slug) return;
    setBusy(`add:${projectId}`);
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: projectId, addSlugs: [slug] }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not add code.");
      setProjects((list) =>
        list.map((p) => (p.id === projectId ? json : p)),
      );
      trackEvent("project_add_code");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add.");
    } finally {
      setBusy(null);
    }
  };

  const removeCode = async (projectId: string, slug: string) => {
    setBusy(`rm:${slug}`);
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: projectId, removeSlugs: [slug] }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not remove code.");
      setProjects((list) =>
        list.map((p) => (p.id === projectId ? json : p)),
      );
      trackEvent("project_remove_code");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to remove.");
    } finally {
      setBusy(null);
    }
  };

  if (!isPro) {
    return (
      <div className="glass rounded-2xl p-5">
        <h2 className="font-semibold">Projects</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Group multiple dynamic QR codes into campaign folders.{" "}
          <Link href="/pricing" className="text-[var(--brand-2)] underline">
            Upgrade to Pro
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Projects</h2>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            Folders for campaigns — each project can hold many QR codes.
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New project name (e.g. Restaurant launch)"
          className="input-field text-sm"
          maxLength={80}
          onKeyDown={(e) => {
            if (e.key === "Enter") void create();
          }}
        />
        <button
          onClick={create}
          disabled={creating || !newName.trim()}
          className="btn-primary shrink-0 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {creating ? "Creating…" : "Create project"}
        </button>
      </div>

      {loading ? (
        <p className="py-6 text-center text-sm text-[var(--muted)]">
          Loading projects…
        </p>
      ) : error ? (
        <p className="mb-3 text-sm text-red-400">{error}</p>
      ) : null}

      {!loading && projects.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--muted)]">
          No projects yet. Create one, then add dynamic QR codes into it.
        </p>
      ) : (
        <ul className="space-y-3">
          {projects.map((p) => {
            const open = expanded[p.id] ?? p.codeCount > 0;
            return (
              <li
                key={p.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/40"
              >
                <div className="flex flex-wrap items-center gap-2 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((e) => ({ ...e, [p.id]: !open }))
                    }
                    className="min-w-0 flex-1 text-left"
                  >
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-2 text-xs text-[var(--muted)]">
                      {p.codeCount} code{p.codeCount === 1 ? "" : "s"}
                    </span>
                  </button>
                  <button
                    onClick={() => removeProject(p.id, p.name)}
                    disabled={busy === `del:${p.id}`}
                    className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)] transition hover:border-red-500/50 hover:text-red-400 disabled:opacity-60"
                  >
                    Delete folder
                  </button>
                </div>

                {open && (
                  <div className="border-t border-[var(--border)] px-3 py-3">
                    {p.codes.length === 0 ? (
                      <p className="mb-3 text-xs text-[var(--muted)]">
                        Empty — add a dynamic code below.
                      </p>
                    ) : (
                      <ul className="mb-3 divide-y divide-[var(--border)]">
                        {p.codes.map((code) => {
                          const design = code.design ?? defaultSavedDesign();
                          const shortUrl = origin
                            ? `${origin}/r/${code.slug}`
                            : `/r/${code.slug}`;
                          return (
                            <li
                              key={code.slug}
                              className="flex flex-wrap items-center gap-3 py-2.5"
                            >
                              <div className="shrink-0 overflow-hidden rounded-lg border border-[var(--border)] bg-white p-1">
                                <StaticQr
                                  data={shortUrl}
                                  style={design.style}
                                  size={48}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">
                                  {code.title || code.slug}
                                </p>
                                <p className="truncate text-[11px] text-[var(--muted)]">
                                  {shortUrl}
                                </p>
                              </div>
                              <div className="flex shrink-0 flex-wrap gap-1.5 text-xs">
                                <Link
                                  href={`/studio?load=${encodeURIComponent(code.slug)}&token=${encodeURIComponent(code.editToken)}`}
                                  className="btn-primary rounded-lg px-2.5 py-1 font-semibold"
                                >
                                  Studio
                                </Link>
                                <Link
                                  href={`/manage/${code.slug}?token=${code.editToken}`}
                                  className="rounded-lg border border-[var(--border)] px-2.5 py-1 font-medium transition hover:border-[var(--brand)]"
                                >
                                  Manage
                                </Link>
                                <button
                                  onClick={() => removeCode(p.id, code.slug)}
                                  disabled={busy === `rm:${code.slug}`}
                                  className="rounded-lg border border-[var(--border)] px-2.5 py-1 text-[var(--muted)] transition hover:text-[var(--foreground)] disabled:opacity-60"
                                >
                                  Remove
                                </button>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {unassigned.length > 0 ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          id={`add-${p.id}`}
                          defaultValue=""
                          className="input-field max-w-xs text-xs"
                          onChange={(e) => {
                            const slug = e.target.value;
                            e.target.value = "";
                            void addCode(p.id, slug);
                          }}
                          disabled={busy === `add:${p.id}`}
                        >
                          <option value="" disabled>
                            Add dynamic code…
                          </option>
                          {unassigned.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {c.title || c.slug}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <p className="text-[11px] text-[var(--muted)]">
                        All your dynamic codes are already in a project. Create
                        a new code or remove one from a folder to reassign.
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
