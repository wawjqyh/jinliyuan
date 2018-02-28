module.exports = app => {
    const {STRING, INTEGER, TINYINT, DATEONLY} = app.Sequelize;

    //定义模型
    let Order = app.model.define("order", {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true}, //主键、自增
        order_id: {type: STRING(50), allowNull: false},
        deliver_date: {type: DATEONLY, allowNull: false},
        total_money: {type: INTEGER, allowNull: false},
        delivery_address: {type: STRING(50), allowNull: false},
        remarks: {type: STRING(50)},
        delivery_state: {type: TINYINT, allowNull: false, defaultValue: 0}
    }, {
        timestamps: true,       //时间戳属性updated_at, created_at
        paranoid: true,         //不删除数据库条目，但将新添加的属性deleted_at设置为当前日期
        underscored: true,      //不使用驼峰样式自动添加属性，而是下划线样式
        freezeTableName: true   //禁用修改表名
    });

    Order.associate = function () {
        Order.belongsTo(app.model.Customer, {
            foreignKey: "customer_id",
            constraints: false
        });
    };

    return Order;
};