let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 获取客户列表
 */
main.list = async function (ctx, next) {
    let cList = await sql("SELECT * FROM customer");

    ctx.body = cList;
};

/**
 * @desc 新增客户
 */
main.insert = async function (ctx, next) {
    let data = ctx.request.body;
    let insertSql = util.insertSql(data);

    let res = await sql("INSERT INTO customer " + insertSql);

    ctx.body = res;
};

module.exports = main;