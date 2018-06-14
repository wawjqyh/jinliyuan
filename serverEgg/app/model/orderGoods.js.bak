module.exports = app => {
    const {STRING, INTEGER} = app.Sequelize;

    //定义模型
    let OrderGoods = app.model.define("order_goods", {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true}, //主键、自增
        order_id: {type: STRING(50), allowNull: false},
        customer_id: {type: INTEGER, allowNull: false},
        goods_id: {type: INTEGER, allowNull: false},
        name: {type: STRING(20), allowNull: false},
        color: {type: STRING(10), allowNull: false},
        num: {type: INTEGER, allowNull: false},
        price: {type: INTEGER, allowNull: false}
    }, {
        timestamps: true,       //时间戳属性updated_at, created_at
        paranoid: true,         //不删除数据库条目，但将新添加的属性deleted_at设置为当前日期
        underscored: true,      //不使用驼峰样式自动添加属性，而是下划线样式
        freezeTableName: true   //禁用修改表名
    });

    OrderGoods.associate = function () {
        OrderGoods.belongsTo(app.model.Order, {
            foreignKey: "order_id",
            targetKey: "order_id",
            constraints: false
        });
    };

    return OrderGoods;
};