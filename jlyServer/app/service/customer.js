const Service = require("egg").Service;

class CustomerService extends Service {
    async read() {
        try {
            return await this.app.mysql.select("customer", {
                where: {state: !0},
                orders: [["username", "desc"]]
            });
        } catch (err) {
            return false;
        }
    }
}

module.exports = CustomerService;