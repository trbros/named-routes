import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { namedRoutes } from "@triooo/next-named-routes/vite";

export default defineConfig({
  // unplugin-vue-router must run before @vitejs/plugin-vue.
  plugins: [namedRoutes(), VueRouter(), vue()],
});
