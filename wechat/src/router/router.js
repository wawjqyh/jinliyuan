import Vue from "vue";
import Router from "vue-router";

import vMain from "../pages/main.vue";

import vIndex from "../pages/index/index.vue";
import vGoods from "../pages/goods/goods.vue";
import vOrder from "../pages/order/order.vue";

import vCustomer from "../pages/customer/customer.vue";
import vCustomerAdd from "../pages/customer/customerAdd.vue";

import vReport from "../pages/report/report.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: vMain,
            children: [
                {
                    path: "/",
                    component: vIndex
                },
                {
                    path: "goods",
                    component: vGoods
                },
                {
                    path: "order",
                    component: vOrder
                },
                {
                    path: "customer",
                    component: vCustomer
                },
                {
                    path: "report",
                    component: vReport
                }
            ]
        },
        {
            path: "/customerAdd",
            component: vCustomerAdd
        }
    ]
});