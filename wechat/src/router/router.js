import Vue from "vue";
import Router from "vue-router";

import vGoodsDetail from "../pages/goodsDetail/goodsDetail.vue";
import vShop from "../pages/shop/shop.vue";

import vGoods from "../pages/shop/goods/goods.vue";
import vComments from "../pages/shop/comments/comments.vue";
import vSeller from "../pages/shop/seller/seller.vue";

Vue.use(Router);

export default new Router({
    /*mode: "history",*/        //使用html的history，url上不会出现#
    routes: [
        {
            path: "/",
            redirect: "/shop/goods"
        },
        {
            path: "/goodsDetail",
            component: vGoodsDetail
        },
        {
            path: "/shop",
            component: vShop,
            children: [
                {
                    path: "goods",
                    component: vGoods
                },
                {
                    path: "comments",
                    component: vComments
                },
                {
                    path: "seller",
                    component: vSeller
                }
            ]
        }
    ]
});