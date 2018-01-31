'use strict';

const Controller = require('egg').Controller;

class CustomerController extends Controller {
    async read() {
        let ctx = this.ctx;
        let data = await ctx.service.customer.read();

        if (data) {
            ctx.body = {
                state: true,
                mes: "success",
                data: data
            }
        } else {
            ctx.body = {
                state: false,
                mes: "error"
            }
        }
    }

    async readById() {
        let ctx = this.ctx;
        let id = ctx.params.id;
        let data = await ctx.service.customer.read({id: id});

        if (data) {
            ctx.body = {
                state: true,
                mes: "success",
                data: data
            }
        } else {
            ctx.body = {
                state: false,
                mes: "error"
            }
        }
    }

    /**
     * @desc 新增客户
     */
    async create() {
        let ctx = this.ctx;
        let req = ctx.request.body;

        let status = await ctx.service.customer.create(req);

        if (status) {
            ctx.body = {
                state: true,
                mes: "success"
            }
        } else {
            ctx.body = {
                state: false,
                mes: "error"
            }
        }
    }

    async update() {
        let ctx = this.ctx;
        let id = ctx.params.id;
        let req = ctx.request.body;

        let status = await ctx.service.customer.update(id, req);

        if (status) {
            ctx.body = {
                state: true,
                mes: "success"
            }
        } else {
            ctx.body = {
                state: false,
                mes: "error"
            }
        }
    }
}

module.exports = CustomerController;