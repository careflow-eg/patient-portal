import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // P2-5 FIX: Add security headers to protect against clickjacking, MIME sniffing,
  // and information leakage. Medical portals are high-value XSS targets.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent the portal from being embedded in iframes (clickjacking defense)
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent browsers from MIME-sniffing a response away from the declared content-type
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Only send the origin in the Referer header (no full URL to external sites)
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Enforce HTTPS for 1 year (HSTS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Restrict browser features (camera, microphone, geolocation)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
