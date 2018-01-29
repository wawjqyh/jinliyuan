'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1515564640962_6611';

    // add your config here
    config.middleware = [];

    config.mysql = {
        client: {
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
            database: 'jinliyuan',
            timezone: "08:00"
        },
        app: true,
        agent: false
    };

    return config;
};