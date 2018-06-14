import Vue from "vue";
import vuex from "vuex";

import state from "./state";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(vuex);

export default new vuex.Store({
    state,
    mutations,
    actions
});