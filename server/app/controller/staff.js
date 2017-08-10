let sql = require("../util/pool");

let main = {};

main.list = async function (ctx, next) {
    try {
        let staffSql = `
            SELECT staff.id, name, phone, job 
            FROM staff 
            LEFT JOIN job ON staff.job_id = job.id 
            WHERE state != 0 
            ORDER BY name 
        `;

        let staff = await sql.query(staffSql);

        ctx.body = {
            code: 1,
            mes: "success",
            data: staff
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