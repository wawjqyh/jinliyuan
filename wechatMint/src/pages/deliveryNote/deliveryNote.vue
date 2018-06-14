<template>
    <div class="delivery">
        <ul class="tab">
            <li :class="{active: active == 1}" @click="active = 1">待配送</li>
            <li :class="{active: active == 2}" @click="active = 2">订单记录</li>
        </ul>

        <ul class="list">
            <li v-for="order in orderShows">
                <router-link :to="'/delivery/detail/' + order.order_id">
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
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                active: 1,
                onDelivery: [],     //待送货
                record: []          //订单记录
            }
        },

        computed: {
            //显示在页面中的数据
            orderShows(){
                let self = this;
                if (self.active === 1) {
                    return self.onDelivery;
                } else {
                    return self.record;
                }
            }
        },

        methods: {
            //加载数据
            async loadData(){
                let self = this;

                let res = await self.$axios.get(self.$api.delivery);
                self.$indicator.close();

                if (res.state) {
                    self.onDelivery = res.data.onDelivery;
                    self.record = res.data.record;
                } else {
                    self.$toast("获取订单失败");
                }
            }
        },

        mounted(){
            this.loadData();
        }
    }
</script>

<style lang="less">
    @import "./less/deliveryNote";
</style>