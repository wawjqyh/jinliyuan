let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc @desc 新增派工单
 */
main.add = async function (ctx, next) {
    try {
        let connection = await sql.pool();
        let production = ctx.request.body;

        let insertSql = util.insertSql(production);

        await Promise.all([
            sql.operate("INSERT INTO production " + insertSql, connection),
            sql.operate(`UPDATE goods SET num = num + ${production.num} WHERE id = ${production.goods_id}`, connection)
        ]);

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

main.list = async function (ctx, next) {
    try {
        let listSql = `
            SELECT production.id, goods.name, goods.color, category.category, production.num, production.date, 
                cuter.name AS cuter_name, drill.name AS drill_name, sanding.name AS sanding_name, paste.name AS paste_name, 
                pack.name AS pack_name, cut_price, drill_price, sanding_price, paste_price, pack_price 
            FROM production 
            JOIN goods ON production.goods_id = goods.id 
            JOIN category ON goods.category_id = category.id 
            JOIN staff AS cuter ON production.cuter_id = cuter.id 
            JOIN staff AS drill ON production.drill_id = drill.id 
            JOIN staff AS sanding ON production.sanding_id = sanding.id 
            JOIN staff AS paste ON production.paste_id = paste.id 
            JOIN staff AS pack ON production.pack_id = pack.id 
        `;

        let list = await sql.query(listSql);

        ctx.body = {
            code: 1,
            mes: "success",
            data: list
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