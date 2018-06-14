import Vue from "vue";
import element from "element-ui";
import 'element-ui/lib/theme-default/index.css';

import router from "./router/router";
import store from "./store/store";
import app from "./app.vue";

Vue.use(element);

new Vue({
    el: "#app",
    router,
    store,
    template: "<app/>",
    components: {
        app
    }
});