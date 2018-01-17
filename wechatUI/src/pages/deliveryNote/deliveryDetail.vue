<template>
    <div class="orderDetail">
        <v-header title="订单详情"></v-header>

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

            <a href="javascript:void(0)" class="finishBtn" @click="dialogShow = true" v-if="order.delivery_state == 0">完成送货</a>
            <a href="javascript:void(0)" class="finishBtn" v-if="order.delivery_state == 1">已完成</a>
        </div>

        <v-dialog :show.sync="dialogShow" :options="dialogOptions" @ok="finishOrder"></v-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";
    import {mapMutations} from "vuex";

    import vHeader from "../../components/header.vue";
    import vDialog from "../../components/dialog.vue";

    export default{
        data(){
            let self = this;

            return {
                id: self.$route.params.order_id,    //订单id
                order: {},                          //订单信息
                goods: [],                          //商品信息

                dialogShow: false,                   //弹框的状态
                dialogOptions: {
                    title: "提示",
                    content: "是否完成这个订单？",
                    dialog: true
                }
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

        components: {
            vHeader,
            vDialog
        },

        methods: {
            ...mapMutations(["showLoading", "hideLoading"]),

            //获取订单信息
            getData(){
                let self = this;

                axios.post(api.orderDetail, {order_id: self.id})
                    .then(res => {
                        if (res.data.code === 1) {
                            console.log(res.data.data);
                            self.order = res.data.data.order[0];
                            self.goods = res.data.data.goods
                        } else {
                            console.log(res.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },

            //删除订单
            finishOrder(){
                let self = this;

                self.showLoading();

                axios.post(api.deliveryFinish, {order_id: self.id})
                    .then(res => {
                        self.hideLoading();

                        if (res.data.code === 1) {
                            alert("提交成功");
                            self.$router.go(-1);
                        } else {
                            alert("操作失败");
                        }
                    })
                    .catch(err => {
                        self.hideLoading();
                        console.log(err);
                        alert("操作失败");
                    })
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    @import "../../common/less/common";

    .orderDetail {
        padding: 0.8rem 0 3.5rem 0;

        .orderMes {
            padding: 0.2rem 0.3rem;
            border-bottom: 0.2rem solid #f3f3f3;

            .orderTime {
                font-size: 0.24rem;
                line-height: 0.5rem;
                border-bottom: 1px solid #eee;
                color: #999;

                .deliveryState {
                    float: right;
                    color: #f00;
                }
            }

            .userName {
                line-height: 0.8rem;

                .phone {
                    float: right;
                }
            }

            .address {
                font-size: 0.24rem;
                color: #999;
                color: #999;
            }
        }

        .goodsList {
            h3 {
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.3rem;
                font-weight: normal;
                color: @mainColor;
                padding-left: 0.3rem;

                .fa-angle-right {
                    color: #ccc;
                    font-size: 0.5rem;
                    vertical-align: middle;
                }
            }

            li {
                border-bottom: 2px solid #fff;
                height: 1rem;
                line-height: 1rem;
                position: relative;
                padding-left: 1.3rem;
                background-color: #f5f5f5;

                .goodsName {
                    font-size: 0.4rem;
                    position: absolute;
                    height: 1rem;
                    line-height: 1rem;
                    width: 1rem;
                    top: 0;
                    left: 0.3rem;
                }

                .goodsType, .goodsColor {
                    color: #999;
                    font-size: 0.24rem;
                }

                .goodsNum {
                    position: absolute;
                    right: 0.2rem;
                }
            }
        }

        .footerBar {
            position: fixed;
            width: 100%;
            height: 0.8rem;
            background-color: #fff;
            bottom: 0;
            color: @mainColor;
            border-top: 1px solid @mainColor;
            line-height: 0.8rem;
            box-sizing: border-box;
            padding: 0 0.3rem;
            font-size: 0.24rem;

            .finishBtn {
                position: absolute;
                width: 2rem;
                height: 100%;
                top: 0;
                right: 0;
                background-color: @mainColor;
                color: #fff;
                text-align: center;
                font-size: 0.3rem;
            }
        }
    }
</style>