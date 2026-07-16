import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex w-[min(1000px,94vw)] flex-1 items-center justify-center py-12">
        <SignIn signUpUrl="/sign-up" fallbackRedirectUrl="/dashboard" />
      </main>
      <Footer />
    </>
  );
}
