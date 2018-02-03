const Service = require("egg").Service;

class GoodsService extends Service {
    /**
     * @desc 查询产品
     * @param id {Number} id
     * @param offset {Number} 偏移量
     * @param limit {Number} 返回数量
     */
    async read({id, offset = 0, limit = 1000} = {}) {
        try {
            let Goods = this.ctx.model.Goods;
            let Category = this.ctx.model.Category;

            if (id) {
                return Goods.findById(id);
            } else {
                return Goods.findAndCountAll({
                    include: [{
                        model: Category,
                        attributes: ["category"]
                    }],
                    order: [["name", "ASC"]],
                    offset: offset,
                    limit: limit
                })
            }
        } catch (err) {
            return false;
        }
    }

    /**
     * @desc 新增产品
     */
    async create(data) {
        try {
            let Goods = this.ctx.model.Goods;
            let goods = Goods.build(data);
            return await goods.save();
        } catch (err) {
            return false;
        }
    }
}

module.exports = GoodsService;