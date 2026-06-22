import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vendored app builds under public/apps/ are generated, minified artifacts —
  // keep the formatter and linter out of them.
  fmt: { ignorePatterns: ["public/apps/**"] },
  lint: { ignorePatterns: ["public/apps/**"] },
});
