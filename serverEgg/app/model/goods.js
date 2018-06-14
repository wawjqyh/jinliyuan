module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  //定义模型
  let Goods = app.model.define(
    "goods",
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true }, //主键、自增
      name: { type: STRING(20), allowNull: false },
      color: { type: STRING(10), allowNull: false },
      num: { type: INTEGER, allowNull: false, defaultValue: 0 }
    },
    {
      timestamps: true, //时间戳属性updated_at, created_at
      paranoid: true, //不删除数据库条目，但将新添加的属性deleted_at设置为当前日期
      underscored: true, //不使用驼峰样式自动添加属性，而是下划线样式
      freezeTableName: true //禁用修改表名
    }
  );

  Goods.associate = function() {
    Goods.belongsTo(app.model.Category, {
      foreignKey: "category_id",
      constraints: false
    });
  };

  return Goods;
};
