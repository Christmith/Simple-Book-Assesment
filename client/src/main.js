import "./index.css";
import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

// Create the Vue app
const app = createApp(App);

// Use the Vuex store
app.use(store);
// Use the Vue Router
app.use(router);

// Mount the app
app.mount("#app");
