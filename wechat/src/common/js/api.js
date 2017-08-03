let baseUrl = "/api";

export default {
    customerList: baseUrl + "/customer",
    customerInsert: baseUrl + "/customer/insert",

    goodsList: baseUrl + "/goods",
    goodsCategory: baseUrl + "/goods/category",

    orderList: baseUrl + "/order",
    orderInsert: baseUrl + "/order/new",
    orderDetail: baseUrl + "/order/detail",
    orderDelete: baseUrl + "/order/delete"
}