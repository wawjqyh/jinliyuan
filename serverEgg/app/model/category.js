module.exports = app => {
    const {STRING, INTEGER} = app.Sequelize;

    //定义模型
    return app.model.define("category", {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true}, //主键、自增
        category: {type: STRING(50), allowNull: false}
    }, {
        timestamps: true,       //时间戳属性updated_at, created_at
        paranoid: true,         //不删除数据库条目，但将新添加的属性deleted_at设置为当前日期
        underscored: true,      //不使用驼峰样式自动添加属性，而是下划线样式
        freezeTableName: true   //禁用修改表名
    });
};