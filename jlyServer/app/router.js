'use strict';

module.exports = app => {
    const {router, controller} = app;

    router.get('/api/customer', controller.customer.read);
    router.get('/api/customer/:id', controller.customer.readById);
    router.post('/api/customer', controller.customer.create);
    router.patch('/api/customer/:id', controller.customer.update);
};