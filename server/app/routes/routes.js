const router = require('koa-router')();

let index = require("../controller/index");
let customer = require("../controller/customer");
let goods = require("../controller/goods");
let order = require("../controller/order");
let staff = require("../controller/staff");

router.get("/api/index", index.index);                      //首页

router.get("/api/customer", customer.list);                 //客户列表
router.post("/api/customer/insert", customer.insert);       //新增客户
router.post("/api/customer/detail", customer.detail);       //客户详情及订单信息
router.post("/api/customer/delete", customer.delete);       //删除客户
router.post("/api/customer/base", customer.baseMes);        //客户基本信息
router.post("/api/customer/update", customer.update);       //修改客户信息

router.get("/api/goods", goods.list);                       //商品列表
router.get("/api/goods/category", goods.category);          //商品类型列表
router.post("/api/goods/insert", goods.insert);             //新增产品
router.post("/api/goods/delete", goods.delete);             //删除产品
router.post("/api/goods/detail", goods.detail);             //单个商品信息

router.post("/api/order", order.list);                      //订单列表
router.post("/api/order/new", order.new);                   //新增订单
router.post("/api/order/detail", order.detail);             //订单详情
router.post("/api/order/delete", order.delete);             //删除订单
router.post("/api/order/update", order.update);             //修改订单

router.get("/api/staff", staff.list);                       //员工列表
router.get("/api/staff/job", staff.jobList);                //职位列表
router.post("/api/staff/add", staff.add);                   //新增员工
router.post("/api/staff/delete", staff.delete);             //删除员工

module.exports = router;