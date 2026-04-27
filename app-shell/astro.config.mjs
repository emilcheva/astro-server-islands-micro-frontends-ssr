import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "http://localhost:4321",
  integrations: [
    react(),
    tailwind({ applyBaseStyles: true }),
    {
      name: "importmap-externals",
      hooks: {
        "astro:build:setup": ({ vite, target }) => {
          if (target === "client") {
            vite.build.rollupOptions["external"] = [
              "react",
              "react-dom",
              "solid-js",
              "app-cart",
              "app-heading",
            ];
          }
        },
      },
    },
  ],
});
