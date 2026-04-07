import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

// Replace "Abhiramrathod" with your actual GitHub username if different
const GITHUB_USERNAME = "Abhiramrathod";
const REPO_NAME = "portfolio";

export default defineConfig({
  site: `https://${GITHUB_USERNAME}.github.io`,
  base: `/${REPO_NAME}`,
  devToolbar: { enabled: false },
  integrations: [
    tailwind(),
    preact({ compat: true }),
  ],
  vite: {
    ssr: {
      noExternal: ["gsap"],
    },
  },
});
