/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    formats: ["image/avif", "image/webp"],
    // domains: ["ik.imagekit.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        // pathname: "wrqklvdkyj/**",
        // port: "",
      },
    ],
    // domains: ["ik.imagekit.io"],
  },
};

export default config;
