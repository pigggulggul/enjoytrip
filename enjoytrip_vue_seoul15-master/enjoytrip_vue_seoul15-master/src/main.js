import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(router).use(pinia);

app.mount("#app");
