import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.nightcafe.studio",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    const isProduction = process.env.NODE_ENV === "production";

    return [
      // Static assets caching headers
      {
        source: "/img/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source:
          "/:path*\\.(js|css|woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|webp|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Security headers for all routes
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking attacks
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Enable XSS protection
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Content Security Policy - restrict resource loading
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              // Only add upgrade-insecure-requests in production
              ...(isProduction ? ["upgrade-insecure-requests"] : []),
            ].join("; "),
          },
          // HTTP Strict Transport Security - only in production
          ...(isProduction
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains; preload",
                },
              ]
            : []),
          // Permissions Policy - control browser features
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
              "usb=()",
              "magnetometer=()",
              "gyroscope=()",
              "accelerometer=()",
              "autoplay=()",
              "encrypted-media=()",
              "picture-in-picture=()",
              "publickey-credentials-get=()",
              "screen-wake-lock=()",
              "sync-xhr=()",
            ].join(", "),
          },
          // Cross-Origin Embedder Policy
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          // Cross-Origin Opener Policy
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          // Cross-Origin Resource Policy
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          // Origin Agent Cluster
          {
            key: "Origin-Agent-Cluster",
            value: "?1",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
