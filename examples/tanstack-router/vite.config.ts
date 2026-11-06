import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";

export default defineConfig({
  plugins: [namedRoutes(), tanstackRouter({ target: "react" }), react()],
});
