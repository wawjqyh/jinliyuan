'use strict';

module.exports = app => {
    const {router, controller} = app;

    router.get('/api/customer', controller.customer.read);              //获取客户
    router.get('/api/customer/:id', controller.customer.readById);      //根据id获取客户
    router.post('/api/customer', controller.customer.create);           //新增客户
    router.patch('/api/customer/:id', controller.customer.update);      //修改客户

    router.get('/api/category', controller.category.read);              //获取产品类别
    router.post('/api/category', controller.category.create);           //新增产品类别

    router.get("/api/goods", controller.goods.read);                    //获取产品
    router.post("/api/goods", controller.goods.create);                 //新增产品
};