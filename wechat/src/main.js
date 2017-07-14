import Vue from "vue";

import router from "./router/router";
import vueResource from "vue-resource";

import app from "./app.vue";
import store from "./store/store";

Vue.use(vueResource);

new Vue({
    el: "#app",
    router,
    store,
    template: "<app/>",
    components: {
        app
    }
});