import { createApp } from "vue";
import PortalApp from "./src/PortalApp.vue";
import router from "./src/router/index.js";
import "./src/style.css";

createApp(PortalApp).use(router).mount("#app");