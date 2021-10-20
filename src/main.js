import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Components from "./components";

createApp(App).use(store).use(router).use(Components).mount("#app");
