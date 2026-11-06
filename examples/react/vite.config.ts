import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// No generator here: routes are declared by hand, see src/routes.ts.
export default defineConfig({ plugins: [react()] });
