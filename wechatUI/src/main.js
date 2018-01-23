import Vue from "vue";
import MintUI from "mint-ui";
import axios from "axios";
import api from "./common/js/api";
import "mint-ui/lib/style.css";
import router from "./router/router";
import store from "./store/store";
import vHeader from "./components/header.vue";

import app from "./app.vue";

Vue.component("v-header", vHeader);

Vue.use(MintUI);
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;

//axios过滤器
axios.interceptors.response.use(function (res) {
    return res.data;
}, function (err) {
    MintUI.Indicator.close();
    MintUI.Toast({message: "网络原因操作失败"});
    return Promise.reject(err);
});

new Vue({
    el: "#app",
    router,
    store,
    template: "<app/>",
    components: {
        app
    }
});