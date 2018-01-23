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
                    <span class="goodsNum">× {{item.num}}</span>
                </li>
            </ul>
        </div>

        <div class="footerBar">
            <span>共 {{totalNum}} 件商品</span>

            <a href="javascript:void(0)" class="finishBtn" @click="finishOrder"
               v-if="order.delivery_state == 0">完成送货</a>
            <a href="javascript:void(0)" class="finishBtn" v-if="order.delivery_state == 1">已完成</a>
        </div>
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

                //遍历商品列表获取总数
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

                //调接口获取数据
                let res = await self.$axios.post(self.$api.orderDetail, {order_id: self.id});
                self.$indicator.close();

                //处理响应信息
                if (res.state) {
                    self.order = res.data.order[0];
                    self.goods = res.data.goods
                } else {
                    self.$toast("获取订单信息失败");
                }
            },

            //完成订单
            async finishOrder(){
                let self = this;

                //弹框确认
                let action = await self.$messagebox({
                    title: "提示",
                    message: "是否完成这个订单？",
                    showCancelButton: true
                });
                if (action === "cancel") {
                    return;
                }

                //调接口提交
                self.$indicator.open();
                let res = await self.$axios.post(self.$api.deliveryFinish, {order_id: self.id});
                self.$indicator.close();

                //处理响应信息
                if (res.state) {
                    self.$toast("提交成功");
                    self.$router.go(-1);
                } else {
                    self.$toast("操作失败！");
                }
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    @import "./less/deliveryDetail";
</style>