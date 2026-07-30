import type { NextConfig } from "next";

// Make Cloudflare bindings available when running `pnpm dev` locally. The
// production Worker initializes the same context itself.
import("@opennextjs/cloudflare").then((cloudflare) =>
  cloudflare.initOpenNextCloudflareForDev(),
);

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
