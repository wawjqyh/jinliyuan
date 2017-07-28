let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 获取客户列表
 */
main.list = async function (ctx, next) {
    ctx.body = await sql.query("SELECT * FROM customer");
};

/**
 * @desc 新增客户
 */
main.insert = async function (ctx, next) {
    let data = ctx.request.body;
    let insertSql = util.insertSql(data);

    ctx.body = await sql.query("INSERT INTO customer " + insertSql);
};

module.exports = main;