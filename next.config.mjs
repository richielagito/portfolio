import { readFileSync } from "node:fs";
import { assertSlugs, buildRewrites } from "./lib/projects.mjs";

const projects = JSON.parse(readFileSync(new URL("./lib/data/projectData.json", import.meta.url), "utf8"));

// Fails `next build` on a missing, malformed, duplicate, or reserved slug.
assertSlugs(projects);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: { formats: ["image/avif", "image/webp"] },
  // Each project with a `demo` origin is served at /<slug>/* from its own deployment.
  async rewrites() {
    return buildRewrites(projects);
  },
};

export default nextConfig;
