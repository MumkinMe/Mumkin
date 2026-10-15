import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async redirects() {
    return [
      // Team email sign-in. Temporary, so browsers do not cache it and the
      // destination can change later without anyone getting stuck.
      {
        source: "/login",
        destination: "https://email.mumkin.me/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
