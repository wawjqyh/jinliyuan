"use strict";

/**
 * config
 * |- config.default.js
 * |- config.test.js
 * |- config.prod.js
 * |- config.unittest.js
 * `- config.local.js
 * config.default.js 为默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件
 * 当指定 env 时会同时加载对应的配置文件，并覆盖默认配置文件的同名配置
 * 如 prod 环境会加载 config.prod.js 和 config.default.js 文件，config.prod.js 会覆盖 config.default.js 的同名配置
 */
module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1515564640962_6611";

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: "mysql",
    host: "118.24.41.14",
    port: "3306",
    database: "management",
    username: "wawjqyh",
    password: "3699forever",
    operatorsAliases: false,
    timezone: "+08:00"
  };

  config.security = {
    xframe: {
      enable: false
    },
    csrf: {
      enable: false
    }
  };

  return config;
};
