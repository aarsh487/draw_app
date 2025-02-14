import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.tsx"],
  presets: [],
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

