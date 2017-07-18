import axios from "axios";
import api from "../common/js/api";

export default {
    //获取商家信息
    getCustomer({commit}){
        axios.get(api.customerList)
            .then(function (res) {
                commit("initCustomer", res.data);
            })
            .catch(err => {
                console.log("获取客户列表失败：");
                console.log(err);
            });
    }
}