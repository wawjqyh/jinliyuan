let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

main.add = async function (ctx, next) {
    try {
        let production = ctx.request.body;

        let insertSql = util.insertSql(production);

        await sql.query("INSERT INTO production " + insertSql);

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