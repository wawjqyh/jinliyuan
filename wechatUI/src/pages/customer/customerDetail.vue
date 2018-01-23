<template>
    <div class="customerDetail">
        <v-header>客户详情</v-header>

        <div class="customerMes">
            <div class="username">
                <span>{{customer.username}}</span>
                <span class="phone">{{customer.phone}}</span>
            </div>

            <div class="itemRow">客户地址：{{customer.province}} - {{customer.city}} - {{customer.district}}</div>
            <div class="itemRow">最近下单：{{lastDate}}</div>
            <div class="itemRow">交易总数：{{orders.length}}（次）</div>
            <div class="itemRow">总交易额：￥{{totalMoney}}</div>
        </div>

        <div class="orderList">
            <h3>订单记录 &nbsp;<span class="fa fa-angle-right"></span></h3>

            <ul class="list">
                <li v-for="order in orders">
                    <router-link :to="'/order/detail/' + order.order_id">
                        <div class="orderTime">
                            <span>下单时间：{{order.order_date}}</span>
                            <span v-if="order.delivery_state == 0" class="deliveryState">未发货</span>
                        </div>
                        <div>
                            <span class="deliveryAddress">送货地址：{{order.delivery_address}}</span>
                            <span class="money">合计：￥{{order.total_money}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>

        <ul class="toolBtn">
            <router-link :to="'/customer/edit/' + id" tag="li">修改</router-link>
            <br>
            <li class="deleteOrder" @click="deleteCustomer">删除</li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            let self = this;

            return {
                id: self.$route.params.customer_id,     //客户id
                customer: {},                           //客户信息
                orders: []                              //客户订单记录
            }
        },

        computed: {
            //最近一次交易日期，取第一个订单的日期
            lastDate(){
                let self = this;

                if (self.orders.length > 0) {
                    return self.orders[0].order_date;
                } else {
                    return ""
                }
            },

            //总交易额
            totalMoney(){
                let totalMoney = 0;

                //遍历所有订单获取总额
                this.orders.forEach(item => {
                    totalMoney += item.total_money;
                });

                return totalMoney;
            }
        },

        methods: {
            //获取用户信息
            async getData(){
                let self = this;

                //获取数据
                let res = await self.$axios.post(self.$api.customerDetail, {id: self.id});
                self.$indicator.close();

                //处理响应信息
                if (res.state) {
                    self.customer = res.data.customer[0];
                    self.orders = res.data.orders
                } else {
                    self.$toast("获取客户信息失败");
                }
            },

            //删除客户
            async deleteCustomer(){
                let self = this;

                //弹框确认
                let action = await self.$messagebox({
                    title: "提示",
                    message: "确定删除该客户",
                    showCancelButton: true
                });
                if (action === "cancel") {
                    return;
                }

                //调接口删除
                self.$indicator.open();
                let res = await self.$axios.post(self.$api.customerDelete, {id: self.id});
                self.$indicator.close();

                //处理响应信息
                if (res.state) {
                    self.$toast("删除客户成功");
                    self.$router.push("/customer");
                } else {
                    self.$toast("删除失败");
                }
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    @import "./less/customerDetail";
</style>