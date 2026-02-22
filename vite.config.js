import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "./env"), "");
  return {
    plugins: [
      react(),
      VitePWA({
        strategies: "injectManifest",
        srcDir: "public",
        filename: "firebase-messaging-sw.js",
        injectManifest: {
          injectionPoint: null,
        },
        manifest: {
          // Your manifest configuration here
        },
      }),
    ],
    define: {
      "process.env": env,
    },
    envDir: "./env",
  };
});
