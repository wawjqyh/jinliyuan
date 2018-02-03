import axios from "axios";
import api from "../common/js/api";
import {Toast} from "mint-ui";

export default {
    //获取客户列表
    async getCustomer({commit}){
        let res = await axios.get(api.customer);

        if (res.state) {
            commit("initCustomer", res.data.rows);
        } else {
            Toast("获取客户列表失败");
        }
    },

    //获取商品列表
    async getGoods({commit}){
        let res = await axios.get(api.goods);

        if (res.state) {
            commit("initGoods", res.data.rows);
        } else {
            Toast("获取商品列表失败");
        }
    },

    //获取商品类别列表
    async getCategory({commit}){
        let res = await axios.get(api.category);

        if (res.state) {
            commit("initCategory", res.data);
        } else {
            Toast("获取商品类别失败");
        }
    }
}