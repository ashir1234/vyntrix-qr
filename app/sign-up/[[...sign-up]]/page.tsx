import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex w-[min(1000px,94vw)] flex-1 items-center justify-center py-12">
        <SignUp signInUrl="/sign-in" fallbackRedirectUrl="/dashboard" />
      </main>
      <Footer />
    </>
  );
}
