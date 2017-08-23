import Vue from "vue";
import Router from "vue-router";

import vIndex from "../pages/main/index.vue";

import vGoods from "../pages/goods/goods.vue";
import vGoodsAdd from "../pages/goods/goodsAdd.vue";
import vGoodsEdit from "../pages/goods/goodsEdit.vue";

import vOrder from "../pages/orders/orders.vue";

import vStaff from "../pages/staff/staff.vue";
import vStaffAdd from "../pages/staff/staffAdd.vue";
import vStaffEdit from "../pages/staff/staffEdit.vue";

import vProduction from "../pages/production/production.vue";
import vProductionAdd from "../pages/production/productionAdd.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            component: vIndex,
            children: [
                {path: "/", component: vGoods},
                {path: "goods/add", component: vGoodsAdd},

                {path: "orders", component: vOrder},

                {path: "staff", component: vStaff},
                {path: "staff/add", component: vStaffAdd},
                {path: "staff/edit/:staff_id", component: vStaffEdit},

                {path: "production", component: vProduction},
                {path: "production/add", component: vProductionAdd},
                {path: "production/edit/:goods_id", component: vGoodsEdit}
            ]
        }
    ]
});