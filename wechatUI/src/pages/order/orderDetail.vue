<template>
    <div class="orderDetail">
        <v-header>订单详情</v-header>

        <div class="orderMes">
            <div class="orderTime">
                <span>下单时间：{{order.order_date}}</span>
                <span class="deliveryState" v-if="order.delivery_state == 0">未发货</span>
            </div>
            <div class="userName">
                <span>{{order.username}}</span>
                <span class="phone">{{order.phone}}</span>
            </div>

            <div class="address">客户地址：{{order.province}} - {{order.city}} - {{order.district}}</div>
            <div class="address">送货地址：{{order.delivery_address}}</div>
            <div class="address">送货时间：{{order.deliver_date}}</div>
            <div class="address">备注：{{order.remarks}}</div>
        </div>

        <div class="goodsList">
            <h3>订单商品 &nbsp;<span class="fa fa-angle-right"></span></h3>

            <ul class="list">
                <li v-for="item in goods">
                    <span class="goodsName">{{item.name}}</span>
                    <span class="goodsType">{{item.category}}</span>
                    <span class="goodsColor">{{item.color}}</span>
                    <span class="goodsPrice">￥{{item.price}}</span>
                    <span class="goodsNum">× {{item.num}}</span>
                </li>
            </ul>
        </div>

        <div class="detailFooter">
            共 {{totalNum}} 件商品  &nbsp;合计：<span class="totalMoney">￥{{order.total_money}}</span>
        </div>

        <ul class="toolBtn">
            <router-link :to="'/order/edit/' + id" tag="li">修改</router-link>
            <br>
            <li class="deleteOrder" @click="deleteOrder">删除</li>
        </ul>
    </div>
</template>

<script>
    export default{
        data(){
            let self = this;

            return {
                id: self.$route.params.order_id,    //订单id
                order: {},                          //订单信息
                goods: []                           //商品信息
            }
        },

        computed: {
            //商品总数
            totalNum(){
                let total = 0;

                this.goods.forEach(item => {
                    total += item.num;
                });

                return total;
            }
        },

        methods: {
            //获取订单信息
            async getData(){
                let self = this;

                let res = await self.$axios.post(self.$api.orderDetail, {order_id: self.id});
                self.$indicator.close();

                if (res.state) {
                    self.order = res.data.order[0];
                    self.goods = res.data.goods
                } else {
                    self.$toast("获取订单信息失败");
                }
            },

            //删除订单
            async deleteOrder(){
                let self = this;

                //弹框确认
                let action = await self.$messagebox({
                    title: "提示",
                    message: "确定删除该订单？",
                    showCancelButton: true
                });
                if (action === "cancel") {
                    return;
                }

                //调接口删除
                self.$indicator.open();
                let res = await self.$axios.post(self.$api.orderDelete, {order_id: self.id});
                self.$indicator.close();

                if (res.state) {
                    self.$toast("删除成功");
                    self.$router.push("/order");
                } else {
                    self.$toast("操作失败");
                }
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    @import "./less/orderDetail";
</style>