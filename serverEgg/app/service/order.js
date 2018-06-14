const Service = require("egg").Service;

class OrderService extends Service {
    /**
     * @desc 查询订单
     * @param id {Number} 订单id
     * @param customerId {Number} 客户id
     * @param startTime {Date} 订单日期
     * @param endTime {Date} 订单日期
     * @param offset {Number} 偏移量
     * @param limit {Number} 返回数量
     */
    async read({id, customerId, startTime = new Date("2000-01-01"), endTime = new Date("9999-01-01"), offset = 0, limit = 1000} = {}) {
        try {
            let Order = this.ctx.model.Order;
            let OrderGoods = this.ctx.model.OrderGoods;

            if (id) {
                return Order.findOne({
                    where: {order_id: id},
                    include: [{
                        model: OrderGoods
                    }]
                });
            } else {
                return Order.findAndCountAll({
                    where: {
                        customer_id: customerId,
                        created_at: startTime
                    },
                    order: [["order_id", "ASC"]],
                    offset: offset,
                    limit: limit
                })
            }
        } catch (err) {
            return false;
        }
    }
}

module.exports = OrderService;