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
  background: {
    service_worker: "src/background/index.ts",
  },
  options_ui: {
    page: "src/options/index.html",
  },
  permissions: ["activeTab", "storage"],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
