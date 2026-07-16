import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ManageClient } from "@/components/manage/ManageClient";

export const metadata: Metadata = {
  title: "Manage QR Code",
  robots: { index: false, follow: false },
};

export default async function ManagePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { slug } = await params;
  const { token } = await searchParams;
  const initialToken = Array.isArray(token) ? token[0] : (token ?? "");

  return (
    <>
      <Nav />
      <main className="mx-auto w-[min(1000px,94vw)] flex-1 py-8">
        <ManageClient slug={slug} initialToken={initialToken} />
      </main>
      <Footer />
    </>
  );
}
