let baseUrl = "/api";

export default {
    index: baseUrl + "/index",

    customer: baseUrl + "/customer",
    category: baseUrl + "/category",
    goods: baseUrl + "/goods",

    customerList: baseUrl + "/customer",
    customerInsert: baseUrl + "/customer/insert",
    customerDetail: baseUrl + "/customer/detail",
    customerDelete: baseUrl + "/customer/delete",
    customerBase: baseUrl + "/customer/base",
    customerUpdate: baseUrl + "/customer/update",

    goodsList: baseUrl + "/goods",
    goodsCategory: baseUrl + "/goods/category",

    orderList: baseUrl + "/order",
    orderInsert: baseUrl + "/order/new",
    orderDetail: baseUrl + "/order/detail",
    orderDelete: baseUrl + "/order/delete",
    orderUpdate: baseUrl + "/order/update",

    delivery: baseUrl + "/delivery",
    deliveryFinish: baseUrl + "/delivery/finish"
}