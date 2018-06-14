import Vue from "vue";

import router from "./router/router";
import store from "./store/store";

import app from "./app.vue";

new Vue({
    el: "#app",
    router,
    store,
    template: "<app/>",
    components: {
        app
    }
});