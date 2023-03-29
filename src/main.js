import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import ToastPlugin from 'vue-toast-notification';
import { createI18n } from "vue-i18n";
import { pt_BR } from "./locales/pt_BR";
import { en_US } from "./locales/en_US";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "vue-toast-notification/dist/theme-default.css";

const languages = {
    pt_BR,
    en_US
}

const i18n = createI18n({
    locale: 'en_US',
    fallbackLocale: 'en_US',
    messages: languages
});
const pinia = createPinia();
const app = createApp(App);

app.use(ToastPlugin, {
    position: 'top-right',
    duration: 3000,
    dismissible: true,
    queue: true
});
app.use(i18n);
app.use(router);
app.use(pinia);

app.mount("#app");
