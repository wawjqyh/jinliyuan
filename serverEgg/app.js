module.exports = app => {
  app.beforeStart(async () => {
    // 根据模型创建数据表
    // force先丢弃表，然后重新创建它
    // https://wawjqyh.github.io/docs/sequelize/index.html#docs/models-definition#%E6%95%B0%E6%8D%AE%E5%BA%93%E5%90%8C%E6%AD%A5
    await app.model.sync({ force: true });
  });
};
