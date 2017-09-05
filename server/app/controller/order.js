let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 订单列表
 */
main.list = async function (ctx, next) {
    try {
        let connection = await sql.pool();
        let condition = ctx.request.body;

        //查询订单列表的sql语句，按日期查询
        let querySql = `
            SELECT orders.id, order_id, deliver_date, delivery_address, delivery_state, order_date, total_money, customer_id, username, phone 
            FROM orders 
            LEFT JOIN customer ON orders.customer_id = customer.id 
        `;

        let countSql = `SELECT COUNT(id) AS totalNum FROM orders `;

        if (condition.startTime && condition.endTime) {
            querySql += `WHERE order_date >= '${condition.startTime}' AND order_date <= '${condition.endTime}' `;
            countSql += `WHERE order_date >= '${condition.startTime}' AND order_date <= '${condition.endTime}' `;
        } else if (condition.startTime) {
            querySql += `WHERE order_date >= '${condition.startTime}' `;
            countSql += `WHERE order_date >= '${condition.startTime}' `;
        } else if (condition.endTime) {
            querySql += `WHERE order_date <= '${condition.endTime}' `;
            countSql += `WHERE order_date <= '${condition.endTime}' `;
        }

        //分页
        querySql += `
            ORDER BY order_id DESC 
            LIMIT ${(condition.page - 1) * condition.pageSize},${condition.page * condition.pageSize}
        `;

        //操作数据库
        let sqlData = await Promise.all([
            sql.operate(querySql, connection),
            sql.operate(countSql, connection)
        ]);

        connection.release();

        ctx.body = {
            code: 1,
            mes: "success",
            data: sqlData[0],
            totalNum: sqlData[1][0].totalNum
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
 * 1、更新商品表的库存数量
 * 2、插入数据到订单表
 * 3、将订单中的商品插入到订单商品表
 */
main.new = async function (ctx, next) {
    try {
        let order = ctx.request.body.order;
        let goods = ctx.request.body.goods;
        let connection = await sql.pool();

        //更新商品数量的sql语句
        let subGoodsSql = `
            UPDATE goods
            SET num = CASE id
        `;
        let goodsId = [];

        goods.forEach(item => {
            subGoodsSql += `
                WHEN ${item.goods_id} THEN num - ${item.num}
            `;
            goodsId.push(item.goods_id);
        });

        subGoodsSql += `
            END
            WHERE id IN (${goodsId.join(",")})
        `;

        //操作数据库
        await Promise.all([
            sql.operate("INSERT INTO orders " + util.insertSql(order), connection),
            sql.operate("INSERT INTO order_goods " + util.insertSql(goods), connection),
            sql.operate(subGoodsSql, connection)
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

/**
 * @desc 查询订单详情
 * 分别查询订单信息和订单中的商品列表
 */
main.detail = async function (ctx, next) {
    try {
        let order_id = ctx.request.body.order_id;
        let connection = await sql.pool();

        //查询订单信息的sql语句
        let orderSql = `
            SELECT orders.id, order_id, deliver_date, order_date, total_money, delivery_address, remarks, delivery_state, customer_id, username, phone, province, city, district
            FROM orders LEFT JOIN customer 
            ON orders.customer_id = customer.id 
            WHERE order_id = ${order_id}
        `;

        //查询订单商品的sql语句
        let goodsSql = `
            SELECT goods_id, order_goods.num, price, name, color, category 
            FROM order_goods 
            LEFT JOIN goods ON order_goods.goods_id = goods.id
            LEFT JOIN category ON goods.category_id = category.id
            WHERE order_id = ${order_id}
        `;

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

/**
 * @desc 删除订单
 * 1、通过order_id查询出该订单的商品，恢复商品表的库存
 * 2、删除订单表的该订单的信息
 * 3、删除订单商品表相关的商品
 */
main.delete = async function (ctx, next) {
    try {
        let order_id = ctx.request.body.order_id;
        let connection = await sql.pool();

        //查询订单商品的sql语句
        let goodsSql = `
            SELECT goods_id, num 
            FROM order_goods 
            WHERE order_id = ${order_id}
        `;

        //查询该订单的商品
        let goods = await sql.operate(goodsSql, connection);

        //更新商品数量的sql语句
        let subGoodsSql = `
            UPDATE goods
            SET num = CASE id
        `;
        let goodsId = [];

        goods.forEach(item => {
            subGoodsSql += `
                WHEN ${item.goods_id} THEN num + ${item.num}
            `;
            goodsId.push(item.goods_id);
        });

        subGoodsSql += `
            END
            WHERE id IN (${goodsId.join(",")})
        `;

        await Promise.all([
            sql.operate(`DELETE FROM orders WHERE order_id = ${order_id}`, connection),
            sql.operate(`DELETE FROM order_goods WHERE order_id = ${order_id}`, connection),
            sql.operate(subGoodsSql, connection)
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

/**
 * @desc 更新订单
 * 1、查询旧的订单商品
 * 2、恢复商品表的库存数量
 * 3、删除旧的订单商品
 * 4、更新定单表
 * 5、将新的商品插入到订单商品表
 */
main.update = async function (ctx, next) {
    try {
        let order = ctx.request.body.order;
        let goods = ctx.request.body.goods;
        let order_id = order.order_id;
        let connection = await sql.pool();

        //查询旧的订单商品的sql语句
        let goodsSql = `
            SELECT goods_id, num
            FROM order_goods 
            WHERE order_id = ${order_id}
        `;
        let oldGoods = await sql.operate(goodsSql, connection);

        await sql.operate(`DELETE FROM order_goods WHERE order_id = ${order_id}`, connection);        //删除旧的订单商品

        //恢复商品数量的sql语句
        let addGoodsSql = `
            UPDATE goods
            SET num = CASE id
        `;
        let oldGoodsId = [];
        oldGoods.forEach(item => {
            addGoodsSql += `
                WHEN ${item.goods_id} THEN num + ${item.num}
            `;
            oldGoodsId.push(item.goods_id);
        });
        addGoodsSql += `
            END
            WHERE id IN (${oldGoodsId.join(",")})
        `;

        //减去商品数量的sql语句
        let subGoodsSql = `
            UPDATE goods
            SET num = CASE id
        `;
        let goodsId = [];
        goods.forEach(item => {
            subGoodsSql += `
                WHEN ${item.goods_id} THEN num - ${item.num}
            `;
            goodsId.push(item.goods_id);
        });
        subGoodsSql += `
            END
            WHERE id IN (${goodsId.join(",")})
        `;

        let updateOrderSql = `
            UPDATE orders 
            SET customer_id = '${order.customer_id}', delivery_address = '${order.delivery_address}', remarks = '${order.remarks}', 
            deliver_date = '${order.deliver_date}', total_money = '${order.total_money}' 
            WHERE order_id = ${order.order_id}
        `;

        await Promise.all([
            sql.operate(addGoodsSql, connection),                                                   //恢复商品表的库存
            sql.operate(updateOrderSql, connection),                                                //更新订单表
            sql.operate("INSERT INTO order_goods " + util.insertSql(goods), connection),            //将新的商品插入到订单商品表
            sql.operate(subGoodsSql, connection)                                                    //更新商品表的库存
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