<template>
    <div class="index">
        <div class="baseMes">
            <img class="bg" src="./images/1_1.jpg">

            <div class="con">
                <div class="now"><span class="month">{{month}}</span> / {{year}}</div>

                <div class="saleMoney">
                    <span>本月销售额</span>
                    <span class="num">￥{{statistics.totalMoney}}</span>
                </div>

                <div class="saleNum">
                    <h3>本月销量</h3>

                    <div class="numItem" v-for="item in statistics.sales">
                        <span>{{item.name}}</span>
                        <span class="num">{{item.num}}</span>
                    </div>
                </div>
            </div>

            <router-link to="/order/add" class="orderBtn">开单</router-link>
        </div>

        <div class="orderTitle"><span class="fa fa-file-text-o"></span> 最近订单</div>

        <ul class="list">
            <li v-for="order in orders">
                <router-link :to="'/order/detail/' + order.order_id">
                    <div class="orderTime">
                        <span>下单时间：{{order.order_date}}</span>
                        <span v-if="order.delivery_state == 0" class="deliveryState">未发货</span>
                    </div>
                    <div class="customerMes">
                        <span class="name">{{order.username}}</span>
                        <span class="phone">{{order.phone}}</span>
                    </div>
                    <div>
                        <span class="deliveryAddress">送货地址：{{order.delivery_address}}</span>
                        <span class="money">合计：￥{{order.total_money}}</span>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            let now = new Date();

            return {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                orders: [],
                statistics: {}
            }
        },

        methods: {
            //获取首页数据
            async getData(){
                let self = this;

                //调接口获取数据
                let res = await self.$axios.get(self.$api.index);
                self.$indicator.close();

                if (res.state) {
                    self.orders = res.data.orders;
                    self.statistics = res.data.statistics;
                } else {
                    self.$toast({
                        message: "获取首页数据失败"
                    });
                }
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    @import "./less/index";
</style>