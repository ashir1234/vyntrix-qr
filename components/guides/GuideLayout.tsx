import Link from "next/link";
import { ReactNode } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export function GuideLayout({
  breadcrumbs,
  children,
  jsonLd,
}: {
  breadcrumbs: { name: string; href: string }[];
  children: ReactNode;
  jsonLd?: object | object[];
}) {
  const scripts = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <>
      {scripts.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <Nav />
      <main className="mx-auto w-[min(800px,92vw)] flex-1 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[var(--muted)]">
          <ol className="flex flex-wrap items-center gap-1.5">
            {breadcrumbs.map((b, i) => (
              <li key={b.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-[var(--foreground)]">{b.name}</span>
                ) : (
                  <Link href={b.href} className="transition hover:text-white">
                    {b.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </main>
      <Footer />
    </>
  );
}

export function GuideCta({ label = "Open free studio" }: { label?: string }) {
  return (
    <div className="glass glow my-8 rounded-2xl p-6 text-center">
      <p className="text-lg font-semibold">Ready to create yours?</p>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Free forever — no account, no watermark.
      </p>
      <Link
        href="/studio"
        className="btn-primary mt-4 inline-block rounded-xl px-6 py-2.5 text-sm font-semibold"
      >
        {label}
      </Link>
    </div>
  );
}
