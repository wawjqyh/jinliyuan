const router = require('koa-router')();

let customer = require("../controller/customer");
let goods = require("../controller/goods");

router.get("/api/customer", customer.list);                 //客户列表
router.post("/api/customer/insert", customer.insert);       //新增客户

router.get("/api/goods", goods.list);                       //商品列表
router.get("/api/goods/category", goods.category);           //商品类型列表

module.exports = router;