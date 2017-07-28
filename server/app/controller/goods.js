let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 查找商品列表
 */
main.list = async function (ctx, next) {
    let sqlCon = `
        SELECT goods.id, name, color, num, category_id, category 
        FROM goods INNER JOIN category 
        ON goods.category_id = category.id
        ORDER BY category_id ASC, name ASC
    `;

    ctx.body = await sql.query(sqlCon);
};

/**
 * @desc 查找商品类型列表
 */
main.category = async function (ctx, next) {
    ctx.body = await sql.query("SELECT * FROM category");
};

module.exports = main;
