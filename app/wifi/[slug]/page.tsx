import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQrCode } from "@/lib/db";
import { parseWifiPayloadJson } from "@/lib/qr/wifiPayload";
import { WifiLandingClient } from "@/components/wifi/WifiLandingClient";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WiFi access",
  robots: { index: false, follow: false },
};

type Ctx = { params: Promise<{ slug: string }> };

export default async function WifiLandingPage({ params }: Ctx) {
  const { slug } = await params;
  const row = await getQrCode(slug);
  if (!row || row.content_type !== "wifi") notFound();

  const wifi = parseWifiPayloadJson(row.payload);
  if (!wifi) notFound();

  return (
    <>
      <Nav />
      <main className="mx-auto flex w-[min(480px,94vw)] flex-1 flex-col justify-center py-12">
        <WifiLandingClient
          title={row.title || wifi.ssid}
          wifi={wifi}
        />
      </main>
      <Footer />
    </>
  );
}
