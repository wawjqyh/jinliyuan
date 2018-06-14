let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 查找商品列表
 */
main.list = async function (ctx, next) {
    try {
        let sqlCon = `
            SELECT goods.id, name, color, num, category_id, category 
            FROM goods INNER JOIN category 
            ON goods.category_id = category.id
            WHERE state != 0 
            ORDER BY category_id ASC, name ASC
        `;

        let goods = await sql.query(sqlCon);

        ctx.body = {
            state: true,
            mes: "success",
            data: goods
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
 * @desc 查找商品类型列表
 */
main.category = async function (ctx, next) {
    try {
        let category = await sql.query("SELECT * FROM category");

        ctx.body = {
            state: true,
            mes: "success",
            data: category
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
 * @desc 新增产品
 */
main.insert = async function (ctx, next) {
    try {
        let data = ctx.request.body;
        let insertSql = util.insertSql(data);

        await sql.query("INSERT INTO goods " + insertSql);

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
 * @desc 删除产品
 */
main.delete = async function (ctx, next) {
    try {
        let id = ctx.request.body.id;

        await sql.query(`UPDATE goods SET state = 0 WHERE id = ${id}`);

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
 * @desc 查询单个产品信息
 */
main.detail = async function (ctx, next) {
    try {
        let id = ctx.request.body.id;

        let goods = await sql.query(`SELECT * FROM goods WHERE id = ${id}`);

        ctx.body = {
            state: true,
            mes: "success",
            data: goods[0]
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
 * @desc 更新产品
 */
main.update = async function (ctx, next) {
    try {
        let goods = ctx.request.body;

        let updateSql = `
            UPDATE goods 
            SET name = '${goods.name}', color = '${goods.color}', num = '${goods.num}', category_id = '${goods.category_id}' 
            WHERE id = ${goods.id}
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
