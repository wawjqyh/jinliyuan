let sql = require("../util/pool");

let main = {};

main.index = async function (ctx, next) {
    try {
        let connection = await sql.pool();

        let date = new Date();
        let month = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + "1";
        let day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        let goodsSql = `
            SELECT goods.name, category.category, order_goods.num, order_goods.price 
            FROM orders
            LEFT JOIN order_goods ON orders.order_id = order_goods.order_id 
            LEFT JOIN goods ON order_goods.goods_id = goods.id 
            LEFT JOIN category ON goods.category_id = category.id 
            WHERE order_date >= ${month}
        `;

        let [goods, orders] = await Promise.all([
            sql.operate(goodsSql, connection),
            sql.operate(`SELECT * FROM orders WHERE order_date = ${day}`, connection)
        ]);

        connection.release();

        ctx.body = {
            code: 1,
            mes: "success",
            data: {
                orders,
                goods
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