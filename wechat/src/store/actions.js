import axios from "axios";

export default {
    //获取商家信息
    getSeller({commit}){
        axios.get("/api/sellerData")
            .then(function (res) {
                commit("initSeller", res.data);
            });
    },

    //获取商品列表
    getGoods({commit}){
        axios.get("/api/goodsData")
            .then(function (res) {
                commit("initGoods", res.data);
            });
    }
}