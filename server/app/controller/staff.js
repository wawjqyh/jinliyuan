let sql = require("../util/pool");
let util = require("../util/util");

let main = {};

/**
 * @desc 职位列表
 */
main.jobList = async function (ctx, next) {
    try {
        let job = await sql.query(`SELECT * from job`);

        ctx.body = {
            code: 1,
            mes: "success",
            data: job
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
 * @desc 员工列表
 */
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

/**
 * @desc 新增员工
 */
main.add = async function (ctx, next) {
    try {
        let data = ctx.request.body;
        let insertSql = util.insertSql(data);

        await sql.query("INSERT INTO staff " + insertSql);

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
 * @desc 删除
 */
main.delete = async function (ctx, next) {
    try {
        let id = ctx.request.body.id;

        await sql.query(`UPDATE staff SET state = 0 WHERE id = ${id}`);

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