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

  return {
    title: platform.title,
    description: platform.description,
    keywords: [...platform.keywords],
    alternates: { canonical: `/qr-code-for/${platform.slug}` },
    openGraph: {
      title: platform.title,
      description: platform.description,
      type: "article",
    },
  };
}

export default async function QrCodeForPlatformPage({ params }: Props) {
  const { platform: slug } = await params;
  const platform = getQrPlatform(slug);
  if (!platform) notFound();

  return <PlatformGuideContent platform={platform} />;
}
