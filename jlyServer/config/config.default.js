'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1515564640962_6611';

    // add your config here
    config.middleware = [];

    config.sequelize = {
        dialect: 'mysql',
        host: 'localhost',
        port: '3306',
        database: 'jinliyuan',
        username: 'root',
        password: '',
        operatorsAliases: false,
        timezone: "+08:00"
    };

    config.security = {
        xframe: {
            enable: false,
        },
        csrf: {
            enable: false,
        }
    };

    return config;
};