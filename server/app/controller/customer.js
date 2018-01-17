let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 获取客户列表
 */
main.list = async function (ctx, next) {
    try {
        let customer = await sql.query("SELECT * FROM customer WHERE state != 0 ORDER BY username");

        ctx.body = {
            state: true,
            mes: "success",
            data: customer
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            state: false,
            mes: "操作失败"
        }
    }
};

/**
 * @desc 新增客户
 */
main.insert = async function (ctx, next) {
    try {
        let data = ctx.request.body;
        let insertSql = util.insertSql(data);

        await sql.query("INSERT INTO customer " + insertSql);

        ctx.body = {
            state: true,
            mes: "success"
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            state: false,
            mes: "操作失败"
        }
    }

};

/**
 * @desc 查询客户信息和订单记录
 */
main.detail = async function (ctx, next) {
    try {
        let id = ctx.request.body.id;
        let connection = await sql.pool();

        let [customer, orders] = await Promise.all([
            sql.operate(`SELECT * FROM customer WHERE id = ${id}`, connection),
            sql.operate(`SELECT * FROM orders WHERE customer_id = ${id} ORDER BY order_id DESC`, connection)
        ]);

        connection.release();

        ctx.body = {
            state: true,
            mes: "success",
            data: {
                customer,
                orders
            }
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            state: false,
            mes: "操作失败"
        }
    }
};

/**
 * @desc 删除客户，即把客户的状态改为0
 */
main.delete = async function (ctx, next) {
    try {
        let id = ctx.request.body.id;

        await sql.query(`UPDATE customer SET state = 0 WHERE id = ${id}`);

        ctx.body = {
            state: true,
            mes: "success"
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            state: false,
            mes: "操作失败"
        }
    }
};

/**
 * @desc 查询用户基本信息
 */
main.baseMes = async function (ctx, next) {
    try {
        let id = ctx.request.body.id;

        let customer = await sql.query(`SELECT * FROM customer WHERE id = ${id}`);

        ctx.body = {
            state: true,
            mes: "success",
            data: customer
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            state: false,
            mes: "操作失败"
        }
    }
};

/**
 * @desc 修改用户信息
 */
main.update = async function (ctx, next) {
    try {
        let data = ctx.request.body;

        let updateSql = `
            UPDATE customer 
            SET username = '${data.username}', phone = '${data.phone}', province_id = '${data.province_id}', province = '${data.province}', 
            city_id = '${data.city_id}', city = '${data.city}', district_id = '${data.district_id}', district = '${data.district}' 
            WHERE id = ${data.id} 
        `;

        await sql.query(updateSql);

        ctx.body = {
            state: true,
            mes: "success"
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            state: false,
            mes: "操作失败"
        }
    }
};

module.exports = main;