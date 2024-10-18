import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(process.cwd(), "./env"), "");
  return {
    plugins: [react()],
    define: {
      "process.env": env,
    },
    envDir: "./env",
  };
});
