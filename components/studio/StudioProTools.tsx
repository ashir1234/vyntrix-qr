"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { selectEncodedData, useQrStore } from "@/lib/store";
import { downloadPrintPdf, downloadQr } from "@/components/studio/QRPreview";
import { trackEvent } from "@/lib/analytics";
import { authEnabled } from "@/lib/authFlags";

interface ProjectOpt {
  id: string;
  name: string;
}

/** Pro-only Studio actions: add code to project folder + print pack. */
export function StudioProTools() {
  const [isPro, setIsPro] = useState(false);
  const [checked, setChecked] = useState(!authEnabled);
  const [projects, setProjects] = useState<ProjectOpt[]>([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const type = useQrStore((s) => s.type);
  const style = useQrStore((s) => s.style);
  const frame = useQrStore((s) => s.frame);
  const frameLabel = useQrStore((s) => s.frameLabel);
  const dynamic = useQrStore((s) => s.dynamic);
  const data = useQrStore(selectEncodedData);

  const loadProjects = () => {
    fetch("/api/projects")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.projects) {
          setProjects(
            j.projects.map((p: { id: string; name: string }) => ({
              id: p.id,
              name: p.name,
            })),
          );
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!authEnabled) return;
    let active = true;
    fetch("/api/billing/plan")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!active) return;
        const pro = j?.plan === "pro";
        setIsPro(pro);
        setChecked(true);
        if (pro) loadProjects();
      })
      .catch(() => {
        if (active) setChecked(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!checked) return null;

  if (!isPro) {
    return (
      <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-xs text-[var(--muted)]">
        Pro unlocks cloud sync, project folders, bulk create, and print pack.{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Upgrade
        </Link>
      </div>
    );
  }

  const addToProject = async () => {
    if (!dynamic?.slug) {
      setMsg("Create a dynamic QR first, then add it to a project.");
      return;
    }
    setBusy("project");
    setMsg(null);
    try {
      let projectId = selectedProject;
      if (!projectId) {
        const name = newProjectName.trim() || `Project ${dynamic.slug}`;
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ name, slugs: [dynamic.slug] }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Could not create project.");
        setMsg(`Added to new project “${json.name}”.`);
        setNewProjectName("");
        loadProjects();
        trackEvent("project_create", { from: "studio" });
      } else {
        const res = await fetch("/api/projects", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: projectId, addSlugs: [dynamic.slug] }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Could not add to project.");
        setMsg(`Added to “${json.name}”.`);
        trackEvent("project_add_code", { from: "studio" });
      }
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mt-3 space-y-3 rounded-xl border border-[var(--brand)]/25 bg-[var(--brand)]/5 p-3">
      <p className="text-xs font-semibold text-[var(--brand-2)]">Pro tools</p>

      <div className="space-y-2">
        <p className="text-[11px] text-[var(--muted)]">
          Add the current dynamic QR to a project folder.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="input-field text-sm"
          >
            <option value="">Create new project…</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {!selectedProject && (
            <input
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="New project name"
              className="input-field text-sm"
              maxLength={80}
            />
          )}
          <button
            onClick={addToProject}
            disabled={busy === "project"}
            className="btn-primary shrink-0 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {busy === "project" ? "Saving…" : "Add to project"}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          disabled={Boolean(busy)}
          onClick={async () => {
            setBusy("4k");
            try {
              trackEvent("qr_download", { format: "png_4k", type });
              await downloadQr("png", style, data, frame, frameLabel, 2048);
            } finally {
              setBusy(null);
            }
          }}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium transition hover:border-[var(--brand)] disabled:opacity-60"
        >
          4K PNG
        </button>
        <button
          disabled={Boolean(busy)}
          onClick={async () => {
            setBusy("pdf");
            try {
              trackEvent("qr_download", { format: "pdf", type });
              await downloadPrintPdf(style, data, frame, frameLabel);
            } finally {
              setBusy(null);
            }
          }}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium transition hover:border-[var(--brand)] disabled:opacity-60"
        >
          Print PDF
        </button>
      </div>

      {msg && (
        <p
          className={`text-xs ${
            /fail|error|first|could not/i.test(msg)
              ? "text-red-400"
              : "text-emerald-400"
          }`}
        >
          {msg}
        </p>
      )}
    </div>
  );
}
