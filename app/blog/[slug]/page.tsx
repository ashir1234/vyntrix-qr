import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import {
  PrintQrChecklistPost,
  StaticQrPrivacyPost,
  StaticVsDynamicCostPost,
} from "@/components/blog/posts";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const BODY: Record<string, () => ReactNode> = {
  "static-qr-privacy-in-the-browser": () => <StaticQrPrivacyPost />,
  "print-qr-codes-that-scan": () => <PrintQrChecklistPost />,
  "static-vs-dynamic-qr-cost": () => <StaticVsDynamicCostPost />,
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const Body = BODY[slug];
  if (!post || !Body) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]),
            articleJsonLd({
              title: post.title,
              description: post.description,
              path: `/blog/${post.slug}`,
              datePublished: post.date,
            }),
          ]),
        }}
      />
      <Nav />
      <main className="mx-auto w-[min(800px,92vw)] flex-1 py-10">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[var(--muted)]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition hover:text-[var(--foreground)]">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/blog"
                className="transition hover:text-[var(--foreground)]"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-[var(--foreground)]">{post.topic}</li>
          </ol>
        </nav>

        <p className="text-xs font-medium uppercase tracking-wide text-[var(--brand-2)]">
          {post.topic}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-[var(--muted)]">
          {post.date} · {post.readingMinutes} min read · {siteConfig.name}
        </p>
        <p className="mt-4 text-lg text-[var(--muted)]">{post.description}</p>

        <div className="mt-10">
          <Body />
        </div>

        <p className="mt-12 border-t border-[var(--border)] pt-6 text-sm text-[var(--muted)]">
          <Link href="/blog" className="text-[var(--brand-2)] underline">
            ← All posts
          </Link>
          {" · "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Open Studio
          </Link>
          {" · "}
          <Link href="/guides" className="text-[var(--brand-2)] underline">
            Guides
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}
