import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config/tailwind";

const config: Config = {
  content: ["./app/**/*.tsx"],
  presets: [sharedConfig],
  // Add these empty configs to satisfy TypeScript requirements
  theme: {
    extend: {
      container: {
        center: true,
      },
      colors: {
      },
    },
  },
};

export default config;

