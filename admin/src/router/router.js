import Vue from "vue";
import Router from "vue-router";

import vIndex from "../pages/main/index.vue";
import vStock from "../pages/statistics/stock.vue";

import vStaff from "../pages/staff/staff.vue";
import vStaffAdd from "../pages/staff/staffAdd.vue";
import vStaffEdit from "../pages/staff/staffEdit.vue";

import vProduction from "../pages/production/production.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: vIndex,
            children: [
                {path: "/", component: vStock},
                {path: "staff", component: vStaff},
                {path: "staff/add", component: vStaffAdd},
                {path: "staff/edit/:staff_id", component: vStaffEdit},

                {path: "production", component: vProduction}
            ]
        }
    ]
});