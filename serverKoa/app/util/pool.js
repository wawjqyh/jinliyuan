let mysql = require("mysql");
let mysqlConfig = require("../../config/config");

let main = {};

/**
 * @desc 创建连接池
 */
let pool = mysql.createPool(mysqlConfig.mysql);

/**
 * @desc 创建一个连接池
 */
main.pool = function () {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }

            resolve(connection);
        });
    });
};

/**
 * @desc 数据库操作
 * @param sql {String} sql语句
 * @param connection mysql连接
 */
main.operate = function (sql, connection) {
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, res, fields) {
            if (err) {
                reject(err);
            }

            resolve(res);
        })
    });
};

/**
 * @desc 一次数据库操作
 * @param sql {String} sql语句
 */
main.query = function (sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }

            connection.query(sql, function (err, res, fields) {
                connection.release();

                if (err) {
                    reject(err);
                }

                resolve(res);
            })
        });
    });
};

module.exports = main;