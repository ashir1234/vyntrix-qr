import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PlatformGuideContent } from "@/components/guides/PlatformGuideContent";
import { getQrPlatform, qrPlatforms } from "@/lib/qr-platforms";

type Props = { params: Promise<{ platform: string }> };

/** Platforms without a deeper /guides article stay as indexable use-case pages. */
export function generateStaticParams() {
  return qrPlatforms
    .filter((p) => !p.relatedGuideSlug)
    .map((p) => ({ platform: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getQrPlatform(slug);
  if (!platform) return {};
  if (platform.relatedGuideSlug) {
    return {};
  }

  const canonical = `/qr-code-for/${platform.slug}`;

  return {
    title: platform.title,
    description: platform.description,
    keywords: [...platform.keywords],
    alternates: { canonical },
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

  // Belt-and-suspenders with next.config redirects for platforms that have guides.
  if (platform.relatedGuideSlug) {
    permanentRedirect(`/guides/${platform.relatedGuideSlug}`);
  }

  return <PlatformGuideContent platform={platform} />;
}
