let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 订单列表
 */
main.list = async function (ctx, next) {
    try {
        let page = ctx.request.body.page;
        let date = ctx.request.body.date;
        let pageSize = 20;

        let sqlCon = `
            SELECT orders.id,order_id,deliver_date,order_date,total_money,customer_id,username,phone 
            FROM orders LEFT JOIN customer 
            ON orders.customer_id = customer.id 
        `;

        if (date.length === 1) {
            sqlCon += `WHERE order_date = '${date[0]}'`;
        }

        if (date.length === 2) {
            if (date[1] === "") {
                sqlCon += `WHERE order_date >= '${date[0]}'`;
            } else if (date[0] === "") {
                sqlCon += `WHERE order_date <= '${date[1]}'`;
            } else {
                sqlCon += `WHERE order_date >= '${date[0]}' AND order_date <= '${date[1]}'`;
            }
        }

        sqlCon += `
            ORDER BY order_date DESC 
            LIMIT ${(page - 1) * pageSize},${page * pageSize}
        `;

        let data = await sql.query(sqlCon);

        ctx.body = {
            code: 1,
            mes: "success",
            data: data
        }
    }

    catch (err) {
        console.log(err);

        ctx.body = {
            code: 0,
            mes: "操作失败"
        }
    }
};

/**
 * @desc 新增订单，同时向订单表和订单商品表插入数据
 */
main.new = async function (ctx, next) {
    try {
        let order = ctx.request.body.order;
        let goods = ctx.request.body.goods;
        let connection = await sql.pool();

        let subGoods = goods.map(item => {
            return sql.operate(`UPDATE goods SET num = num - ${item.num} WHERE id = ${item.goods_id}`, connection);
        });

        await Promise.all([
            sql.operate("INSERT INTO orders " + util.insertSql(order), connection),
            sql.operate("INSERT INTO order_goods " + util.insertSql(goods), connection)
        ].concat(subGoods));

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

/**
 * @desc 查询订单详情
 */
main.detail = async function (ctx, next) {
    try {
        let order_id = ctx.request.body.order_id;
        let connection = await sql.pool();

        let orderSql = `
            SELECT orders.id,order_id,deliver_date,order_date,total_money,customer_id,username,phone 
            FROM orders LEFT JOIN customer 
            ON orders.customer_id = customer.id 
            WHERE order_id = ${order_id}
        `;

        let goodsSql = `SELECT * FROM order_goods WHERE order_id = ${order_id}`;

        let [order, goods] = await Promise.all([
            sql.operate(orderSql, connection),
            sql.operate(goodsSql, connection)
        ]);

        connection.release();

        ctx.body = {
            code: 1,
            mes: "success",
            data: {
                order: order,
                goods: goods
            }
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