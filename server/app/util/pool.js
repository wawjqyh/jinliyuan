let mysql = require("mysql");
let mysqlConfig = require("../../config/config");

/**
 * @desc 创建连接池
 * @type {Pool}
 */
let pool = mysql.createPool(mysqlConfig.mysql);

module.exports = pool;