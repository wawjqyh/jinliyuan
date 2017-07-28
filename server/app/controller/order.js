let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 新整订单，同时向订单表和订单商品表插入数据
 */
main.new = async function (ctx, next) {
    try {
        let order = ctx.request.body.order;
        let goods = ctx.request.body.goods;
        let connection = await sql.pool();

        await Promise.all([
            sql.operate("INSERT INTO orders " + util.insertSql(order), connection),
            sql.operate("INSERT INTO order_goods " + util.insertSql(goods), connection)
        ]);

        connection.release();

        ctx.body = {
            code: 1,
            mes: "success"
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            code: 0,
            mes: "操作失败"
        }
    }
};

module.exports = main;