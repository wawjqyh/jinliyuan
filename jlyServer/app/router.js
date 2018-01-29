'use strict';

module.exports = app => {
    const {router, controller} = app;

    router.get('/api/customer', controller.customer.read);
};
