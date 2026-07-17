"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StaticQr } from "@/components/gallery/StaticQr";
import {
  defaultSavedDesign,
  sanitizeDesign,
  type SavedQrDesign,
} from "@/lib/qr/design";
import type { QrFields } from "@/lib/qr/types";
import { trackEvent } from "@/lib/analytics";

interface ProjectItem {
  id: string;
  name: string;
  kind: "static" | "dynamic";
  contentType: string;
  fields: Partial<QrFields>;
  design: SavedQrDesign | null;
  dynamicSlug: string | null;
  updatedAt: number;
}

export function ProjectsPanel({ isPro }: { isPro: boolean }) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isPro) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects");
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to load projects.");
      setProjects(
        (json.projects ?? []).map(
          (p: {
            id: string;
            name: string;
            kind: "static" | "dynamic";
            contentType: string;
            fields: Partial<QrFields>;
            design: unknown;
            dynamicSlug: string | null;
            updatedAt: number;
          }) => ({
            ...p,
            design: sanitizeDesign(p.design),
          }),
        ),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load.");
    } finally {
      setLoading(false);
    }
  }, [isPro]);

  useEffect(() => {
    void load();
  }, [load]);

  const remove = async (id: string, name: string) => {
    if (!confirm(`Delete project “${name}”?`)) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((list) => list.filter((p) => p.id !== id));
        trackEvent("project_delete");
      }
    } finally {
      setDeleting(null);
    }
  };

  const openInStudio = (p: ProjectItem) => {
    try {
      sessionStorage.setItem(
        "vyntrix_load_project",
        JSON.stringify({
          type: p.contentType,
          fields: p.fields,
          design: p.design,
          dynamicSlug: p.dynamicSlug,
          kind: p.kind,
        }),
      );
    } catch {
      /* ignore */
    }
    trackEvent("project_open", { kind: p.kind });
    router.push("/studio?project=1");
  };

  if (!isPro) {
    return (
      <div className="glass rounded-2xl p-5">
        <h2 className="font-semibold">Projects</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Save Studio designs as named projects and reopen them anytime.{" "}
          <Link href="/pricing" className="text-[var(--brand-2)] underline">
            Upgrade to Pro
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-semibold">Projects</h2>
        <Link
          href="/studio"
          className="text-sm text-[var(--brand-2)] transition hover:text-[var(--foreground)]"
        >
          + Save from Studio
        </Link>
      </div>

      {loading ? (
        <p className="py-6 text-center text-sm text-[var(--muted)]">
          Loading projects…
        </p>
      ) : error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : projects.length === 0 ? (
        <p className="py-6 text-center text-sm text-[var(--muted)]">
          No projects yet. Open the studio, style a code, then tap{" "}
          <span className="font-medium text-[var(--foreground)]">
            Save project
          </span>
          .
        </p>
      ) : (
        <ul className="divide-y divide-[var(--border)]">
          {projects.map((p) => {
            const design = p.design ?? defaultSavedDesign();
            const previewData = previewForProject(p);
            return (
              <li
                key={p.id}
                className="flex flex-wrap items-center gap-4 py-4"
              >
                <div className="shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-white p-1.5">
                  <StaticQr data={previewData} style={design.style} size={64} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {p.kind} · {p.contentType} ·{" "}
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2 text-sm">
                  <button
                    onClick={() => openInStudio(p)}
                    className="btn-primary rounded-lg px-3 py-1.5 text-xs font-semibold"
                  >
                    Open in Studio
                  </button>
                  <button
                    onClick={() => remove(p.id, p.name)}
                    disabled={deleting === p.id}
                    className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-[var(--muted)] transition hover:border-red-500/50 hover:text-red-400 disabled:opacity-60"
                  >
                    {deleting === p.id ? "…" : "Delete"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function previewForProject(p: ProjectItem): string {
  if (p.dynamicSlug) {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/r/${p.dynamicSlug}`;
    }
    return `https://vyntrixqr.app/r/${p.dynamicSlug}`;
  }
  const url = typeof p.fields.url === "string" ? p.fields.url.trim() : "";
  if (url) return url;
  const text = typeof p.fields.text === "string" ? p.fields.text.trim() : "";
  if (text) return text;
  return "https://vyntrixqr.app";
}
