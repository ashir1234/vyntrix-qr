import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlatformGuideContent } from "@/components/guides/PlatformGuideContent";
import { getQrPlatform, qrPlatforms } from "@/lib/qr-platforms";

type Props = { params: Promise<{ platform: string }> };

export function generateStaticParams() {
  return qrPlatforms.map((p) => ({ platform: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getQrPlatform(slug);
  if (!platform) return {};

  const hasDeepGuide = Boolean(platform.relatedGuideSlug);
  const canonical = hasDeepGuide
    ? `/guides/${platform.relatedGuideSlug}`
    : `/qr-code-for/${platform.slug}`;

  return {
    title: platform.title,
    description: platform.description,
    keywords: [...platform.keywords],
    alternates: { canonical },
    // Consolidate indexing on the deeper /guides article when one exists —
    // reduces thin duplicate URLs for search / AdSense quality.
    robots: hasDeepGuide ? { index: false, follow: true } : undefined,
    openGraph: {
      title: platform.title,
      description: platform.description,
      type: "article",
      url: canonical,
    },
  };
}

export default async function QrCodeForPlatformPage({ params }: Props) {
  const { platform: slug } = await params;
  const platform = getQrPlatform(slug);
  if (!platform) notFound();

  return <PlatformGuideContent platform={platform} />;
}
