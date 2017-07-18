let mysql = require("mysql");
let mysqlConfig = require("../../config/config");

/**
 * @desc 创建连接池
 * @type {Pool}
 */
let pool = mysql.createPool(mysqlConfig.mysql);

module.exports = function (sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }

            connection.query(sql, function (err, res, fields) {
                connection.release();

                if (err) {
                    reject();
                }

                resolve(res);
            })
        });
    });
};