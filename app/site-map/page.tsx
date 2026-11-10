import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { blogPosts } from "@/lib/blog";
import { qrPlatforms } from "@/lib/qr-platforms";
import { absoluteUrl, breadcrumbJsonLd, guides } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Every public page on Vyntrix QR: studio, guides, blog posts, and QR use cases.",
  alternates: { canonical: "/site-map" },
  openGraph: {
    title: "Sitemap | Vyntrix QR",
    description: "Every public page on Vyntrix QR.",
    url: absoluteUrl("/site-map"),
  },
};

const pages = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "QR Studio" },
  { href: "/gallery", label: "Gallery" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/qr-code-for", label: "Use cases" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
] as const;

function LinkList({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
        {links.map((link) => (
          <li key={link.href} className="mb-1.5 break-inside-avoid">
            <Link
              href={link.href}
              className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SiteMapPage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const platforms = qrPlatforms.filter((p) => !p.relatedGuideSlug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Sitemap", path: "/site-map" },
            ]),
          ),
        }}
      />
      <Nav />
      <main className="mx-auto w-[min(800px,92vw)] flex-1 py-10">
        <h1 className="text-4xl font-bold tracking-tight">Sitemap</h1>
        <p className="mt-3 text-[var(--muted)]">
          Every public page. New blog posts show up here automatically.
        </p>
        <div className="mt-10 space-y-10">
          <LinkList title="Pages" links={[...pages]} />
          <LinkList
            title="Guides"
            links={guides.map((g) => ({
              href: `/guides/${g.slug}`,
              label: g.short,
            }))}
          />
          <LinkList
            title="Blog"
            links={posts.map((p) => ({
              href: `/blog/${p.slug}`,
              label: p.title,
            }))}
          />
          <LinkList
            title="Use cases"
            links={platforms.map((p) => ({
              href: `/qr-code-for/${p.slug}`,
              label: p.name,
            }))}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
