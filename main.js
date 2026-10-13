import { createApp } from "vue";
import { createPinia } from "pinia";
import PortalApp from "./src/PortalApp.vue";
import router from "./src/router/index.js";
import "./src/style.css";

createApp(PortalApp).use(createPinia()).use(router).mount("#app");