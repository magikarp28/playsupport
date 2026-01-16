// Import createRequire from the module package
import { createRequire } from "module";
// Use createRequire to simulate CommonJS's require in ESM
const require = createRequire(import.meta.url);

const withVideos = require("next-videos");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
};

export default withVideos(nextConfig);
