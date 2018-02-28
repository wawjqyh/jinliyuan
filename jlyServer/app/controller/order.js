'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
    async create() {
        let ctx = this.ctx;
        let order = ctx.request.body.order;
        let goods = ctx.request.body.goods;
    }
}