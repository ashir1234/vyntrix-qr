import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { blogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog — QR Codes, Print & Privacy",
  description: `Practical articles from the ${siteConfig.name} team on QR design, print reliability, privacy, and static vs dynamic strategy.`,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: `Articles on QR codes, print, and privacy from ${siteConfig.name}.`,
    url: absoluteUrl("/blog"),
  },
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
            ]),
          ),
        }}
      />
      <Nav />
      <main className="mx-auto w-[min(800px,92vw)] flex-1 py-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Blog
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          Original notes from the {siteConfig.name} team — print reliability,
          privacy, and when dynamic codes are worth it. For step-by-step
          tutorials, see{" "}
          <Link href="/guides" className="text-[var(--brand-2)] underline">
            Guides
          </Link>
          .
        </p>

        <ul className="mt-10 space-y-4">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="glass block rounded-2xl p-5 transition hover:border-[var(--brand)]"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--brand-2)]">
                  {post.topic}
                </p>
                <h2 className="mt-1.5 text-lg font-semibold text-[var(--foreground)]">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-sm text-[var(--muted)]">
                  {post.description}
                </p>
                <p className="mt-3 text-xs text-[var(--muted)]">
                  {post.date} · {post.readingMinutes} min read
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
