const Controller = require('egg').Controller;

class GoodsController extends Controller {
    async read() {
        let ctx = this.ctx;
        let data = await ctx.service.goods.read();

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
     * @desc 新增产品
     */
    async create() {
        let ctx = this.ctx;
        let req = ctx.request.body;

        let status = await ctx.service.goods.create(req);

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

module.exports = GoodsController;