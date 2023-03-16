import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ToastPlugin from 'vue-toast-notification';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toast-notification/dist/theme-default.css";

const pinia = createPinia();
const app = createApp(App);

app.use(ToastPlugin, {
    position: 'top-right',
    duration: 3000,
    dismissible: true,
    queue: true
});
app.use(router);
app.use(pinia);

app.mount("#app");
