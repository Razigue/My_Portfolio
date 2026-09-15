import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Each language has its own root layout, so an address that matches no
    // route has no layout to render a 404 in. `app/global-not-found.tsx`
    // answers those, in both languages.
    globalNotFound: true,
  },
};

export default nextConfig;
