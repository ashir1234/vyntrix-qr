import type { NextConfig } from "next";
import { cannibalizationRedirects } from "./lib/cannibalization-redirects";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "libsql"],
  experimental: {
    // 9KB app CSS was a second critical-path request. Inline it.
    inlineCss: true,
  },
  async redirects() {
    return cannibalizationRedirects;
  },
};

export default nextConfig;
