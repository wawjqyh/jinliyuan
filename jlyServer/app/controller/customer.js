'use strict';

const Controller = require('egg').Controller;

class CustomerController extends Controller {
    async read() {
        let ctx = this.ctx;
        let customer = await this.ctx.service.customer.read();
        if (customer) {
            ctx.body = {
                state: true,
                mes: "success",
                data: customer
            }
        } else {

        }
    }
}

module.exports = CustomerController;