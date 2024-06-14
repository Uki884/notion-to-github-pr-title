import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  description: "ブランチ名からnotionのタスク名を取得して、githubのPRタイトルを自動で入力します。",
  name: "Notion To Github PR Title",
  version: "0",
  icons: {
    128: "public/logo.png"
  },
  action: {
    default_icon: "public/logo.png",
    default_title: "example",
    default_popup: "index.html"
  },
  background: {
    service_worker: "src/background/index.ts",
  },
  options_ui: {
    page: "src/options/index.html",
  },
  content_scripts: [
    {
      "matches": ["<all_urls>"],
      "js": ["src/contentScript/index.ts"],
    }
  ],
  permissions: ["activeTab", "storage", "cookies"],
  host_permissions: ["https://api.notion.com/v1/*"],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  }
});
