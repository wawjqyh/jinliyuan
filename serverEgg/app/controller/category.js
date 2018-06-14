'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
    async read() {
        let ctx = this.ctx;
        let data = await ctx.service.category.read();

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

    async create() {
        let ctx = this.ctx;
        let req = ctx.request.body;
        console.log(req);

        let status = await ctx.service.category.create(req);

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

module.exports = CategoryController;