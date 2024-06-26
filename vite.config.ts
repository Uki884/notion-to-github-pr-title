import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import path from "path";

const manifest = defineManifest({
  manifest_version: 3,
  description:
    "ブランチ名からnotionのタスク名を取得して、githubのPRタイトルを自動で入力します。",
  name: "Notion To Github PR Title",
  version: "0.1",
  icons: {
    128: "public/logo.png",
  },
  action: {
    default_icon: "public/logo.png",
    default_title: "Notion To Github PR Title",
  },
  background: {
    service_worker: "src/background/index.ts",
  },
  options_ui: {
    page: "src/options/index.html",
  },
  content_scripts: [
    {
      matches: ["https://github.com/*"],
      js: ["src/contentScript/index.ts"],
    },
  ],
  permissions: ["activeTab", "storage", "cookies"],
  host_permissions: ["https://api.notion.com/v1/*"],
});

export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});
