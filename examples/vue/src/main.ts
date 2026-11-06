import { createApp, h } from "vue";
import { createRouter, createWebHistory, RouterView } from "vue-router";
import { routes } from "vue-router/auto-routes";

const router = createRouter({ history: createWebHistory(), routes });
createApp({ render: () => h("main", { style: "font-family: system-ui; max-width: 640px; margin: 48px auto" }, [h("h1", "NamedRoutes · Vue Router"), h(RouterView)]) })
  .use(router)
  .mount("#app");
