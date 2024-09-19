import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [react()],
    };
  } else
    return {
      //base: "/shopping-cart",
      plugins: [react()],
      css: {
        modules: {
          generateScopedName: "[hash:base64:4]",
        },
      },
    };
});
