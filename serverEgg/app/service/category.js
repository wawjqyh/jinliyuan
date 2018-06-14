const Service = require("egg").Service;

class CategoryService extends Service {
    /**
     * @desc 查询所有商品类型
     */
    async read() {
        try {
            let Category = this.ctx.model.Category;

            return Category.findAll()
        } catch (err) {
            return false;
        }
    }

    /**
     * @desc 新增类别
     */
    async create(data) {
        try {
            let Category = this.ctx.model.Category;
            let category = Category.build(data);
            return await category.save();
        } catch (err) {
            return false;
        }
    }
}

module.exports =  CategoryService;