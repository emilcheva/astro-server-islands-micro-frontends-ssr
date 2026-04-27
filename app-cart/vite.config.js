import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInject from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [react(), cssInject()],
  base: "http://localhost:7100/",
  preview: {
    port: 7100,
  },
});
