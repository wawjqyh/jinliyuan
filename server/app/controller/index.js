let sql = require("../util/pool");

let main = {};

main.index = async function (ctx, next) {
    try {
        let connection = await sql.pool();

        let date = new Date();
        let month = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + "1";
        let day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

        let goodsSql = `
            SELECT category.category, order_goods.num, order_goods.price, goods.category_id 
            FROM orders 
            LEFT JOIN order_goods ON orders.order_id = order_goods.order_id 
            LEFT JOIN goods ON order_goods.goods_id = goods.id 
            LEFT JOIN category ON goods.category_id = category.id 
            WHERE order_date >= ${month}
        `;

        let orderSql = `
            SELECT order_id, deliver_date, order_date, total_money, delivery_address, delivery_state, username, phone 
            FROM orders 
            LEFT JOIN customer ON orders.customer_id = customer.id 
            ORDER BY order_id DESC 
            LIMIT 10 
        `;

        let [goods, orders] = await Promise.all([
            sql.operate(goodsSql, connection),  //查询本月销售的商品列表
            sql.operate(orderSql, connection)   //最近10个订单
        ]);

        connection.release();

        let totalMoney = 0;
        let sales = {};

        //计算当月销售总额和各个种类的销量
        goods.forEach(item => {
            totalMoney += item.num * item.price;

            if (!sales.hasOwnProperty(item.category_id)) {
                Object.defineProperties(sales, item.category_id);

                sales[item.category_id] = {
                    name: item.category,
                    num: item.num
                }
            } else {
                sales[item.category_id].num += item.num;
            }
        });

        ctx.body = {
            code: 1,
            mes: "success",
            data: {
                orders,
                statistics: {
                    totalMoney,
                    sales
                }
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