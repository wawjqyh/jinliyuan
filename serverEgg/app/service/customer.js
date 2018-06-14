const Service = require("egg").Service;

class CustomerService extends Service {
    /**
     * @desc 查询客户
     * @param id {Number} id
     * @param offset {Number} 偏移量
     * @param limit {Number} 返回数量
     */
    async read({id, offset = 0, limit = 1000} = {}) {
        try {
            let Customer = this.ctx.model.Customer;

            if (id) {
                return Customer.findById(id);
            } else {
                return Customer.findAndCountAll({
                    order: [["username", "ASC"]],
                    offset: offset,
                    limit: limit
                })
            }
        } catch (err) {
            return false;
        }
    }

    /**
     * @desc 新增客户
     */
    async create(data) {
        try {
            let Customer = this.ctx.model.Customer;
            let customer = Customer.build(data);
            return await customer.save();
        } catch (err) {
            return false;
        }
    }

    /**
     * @desc 更新客户信息
     */
    async update(id, data) {
        try {
            let Customer = this.ctx.model.Customer;
            return await Customer.update(data, {where: {id: id}});
        } catch (err) {
            return false;
        }
    }
}

module.exports = CustomerService;