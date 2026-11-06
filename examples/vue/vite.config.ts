import { namedRoutes } from "@triooo/named-routes/vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";

export default defineConfig({
	// unplugin-vue-router must run before @vitejs/plugin-vue.
	plugins: [namedRoutes(), VueRouter(), vue()],
});
