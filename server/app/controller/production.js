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

/**
 * @desc 列表
 */
main.list = async function (ctx, next) {
    try {
        let connection = await sql.pool();
        let condition = ctx.request.body;

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

        let countSql = `SELECT COUNT(id) AS totalNum FROM production `;

        if (condition.goods_id) {
            listSql += `WHERE goods_id = '${condition.goods_id}' `;
            countSql += `WHERE goods_id = '${condition.goods_id}' `;

            if (condition.startTime) {
                listSql += `AND date >= '${condition.startTime}' AND date <= '${condition.endTime}' `;
                countSql += `AND date >= '${condition.startTime}' AND date <= '${condition.endTime}' `
            }
        } else {
            if (condition.startTime) {
                listSql += `WHERE date >= '${condition.startTime}' AND date <= '${condition.endTime}' `;
                countSql += `WHERE date >= '${condition.startTime}' AND date <= '${condition.endTime}' `
            }
        }

        listSql += `
            ORDER BY date DESC 
            LIMIT ${(condition.page - 1) * condition.pageSize},${condition.page * condition.pageSize}
        `;

        let sqlData = await Promise.all([
            sql.operate(listSql, connection),
            sql.operate(countSql, connection)
        ]);

        connection.release();

        ctx.body = {
            code: 1,
            mes: "success",
            data: sqlData[0],
            totalNum: sqlData[1][0].totalNum
        }
    } catch (err) {
        console.log(err);

        ctx.body = {
            code: 0,
            mes: "操作失败"
        }
    }
};

main.update = async function (ctx, next) {
    try {
        let connection = await sql.pool();
        let production = ctx.request.body;
        let upPro = await sql.operate(`SELECT goods_id, num FROM production WHERE id = ${production.id}`, connection);
        let num = production.num - upPro[0].num;
        let updateProductionSql = `
        `;

        await Promise.all([
            sql.operate(``, connection),
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

main.delete = async function (ctx, next) {
    try {
        let connection = await sql.pool();
        let id = ctx.request.body.id;

        let production = await sql.operate(`SELECT goods_id, num FROM production WHERE id = ${id}`, connection);

        await Promise.all([
            sql.operate(`UPDATE goods SET num = num - ${production[0].num} WHERE id = ${production[0].goods_id}`, connection),
            sql.operate(`DELETE FROM production WHERE id = ${id}`, connection)
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

main.detail = async function (ctx, next) {
    try {
        let id = ctx.request.body.id;

        let production = await sql.query(`SELECT * FROM production WHERE id = ${id}`);

        ctx.body = {
            code: 1,
            mes: "success",
            data: production[0]
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