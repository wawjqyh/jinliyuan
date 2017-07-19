import axios from "axios";
import api from "../common/js/api";

export default {
    //获取客户列表
    getCustomer({commit}){
        axios.get(api.customerList)
            .then(function (res) {
                commit("initCustomer", res.data);
            })
            .catch(err => {
                console.log("获取客户列表失败：");
                console.log(err);
            });
    },

    //获取商品列表
    getGoods({commit}){
        axios.get(api.goodsList)
            .then(res => {
                commit("initGoods", res.data);
            })
            .catch(err => {
                console.log("获取商品列表失败");
                console.log(err);
            })
    },

    //获取商品类别列表
    getCategory({commit}){
        axios.get(api.goodsCategory)
            .then(res => {
                commit("initCategory", res.data);
            })
            .catch(err => {
                console.log("获取商品类别列表失败");
                console.log(err);
            })
    }
}