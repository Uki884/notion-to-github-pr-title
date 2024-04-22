import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  description: "This is an example extension",
  name: "example",
  version: "0.1.0",
  // action: {
  //   default_icon: "icons/icon128.png",
  //   default_title: "example",
  // },
  action: { default_popup: "index.html" },
  background: {
    service_worker: "src/chrome/background/index.ts",
  },
  options_ui: {
    page: "src/chrome/options/index.html",
  },
  permissions: ["activeTab", "storage", "cookies"],
  host_permissions: ["*://*.notion.so/"],
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
