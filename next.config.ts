import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@libsql/client", "libsql"],
  experimental: {
    // 9KB app CSS was a second critical-path request. Inline it.
    inlineCss: true,
  },
};

export default nextConfig;
