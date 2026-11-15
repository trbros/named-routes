import { namedRoutes } from "@triooo/named-routes/vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "vue-router/vite";
import { defineConfig } from "vite";

export default defineConfig({
	// Vue Router 5 file-based routing (formerly unplugin-vue-router) must run
	// before @vitejs/plugin-vue.
	plugins: [namedRoutes(), VueRouter(), vue()],
});
