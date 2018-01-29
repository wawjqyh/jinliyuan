'use strict';

module.exports = {
    write: true,
    prefix: '^',
    plugin: 'autod-egg',
    test: [
        'test',
        'benchmark',
    ],
    dep: [
        'egg',
        'egg-scripts',
    ],
    devdep: [
        'egg-ci',
        'egg-bin',      //调试工具，可以断点调试
        'egg-mock',     //单元测试
        'autod',        //自动分析项目所有的文件，获取所有的项目依赖和它们的版本的工具
        'autod-egg',
        'webstorm-disable-index',//初始化node配置
    ],
    exclude: [
        './test/fixtures',
        './dist',
    ],
};

