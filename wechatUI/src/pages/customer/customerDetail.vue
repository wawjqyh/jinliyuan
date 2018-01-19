<template>
    <div class="customerDetail">
        <v-header title="客户详情"></v-header>

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
            <li class="deleteOrder" @click="dialogShow = true">删除</li>
        </ul>

        <v-dialog :show.sync="dialogShow" :options="dialogOptions" @ok="deleteCustomer"></v-dialog>
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
                id: self.$route.params.customer_id,     //客户id
                customer: {},                           //客户信息
                orders: [],

                dialogShow: false,                      //弹框的状态
                dialogOptions: {
                    title: "警告",
                    content: "是否删除这个客户？",
                    dialog: true
                }
            }
        },

        computed: {
            //最近一次交易日期
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

                this.orders.forEach(item => {
                    totalMoney += item.total_money;
                });

                return totalMoney;
            }
        },

        components: {
            vHeader,
            vDialog
        },

        methods: {
            ...mapMutations(["showLoading", "hideLoading"]),

            //获取用户信息
            getData(){
                let self = this;

                axios.post(api.customerDetail, {id: self.id})
                    .then(res => {
                        if (res.data.code === 1) {
                            self.customer = res.data.data.customer[0];
                            self.orders = res.data.data.orders
                        } else {
                            console.log(res.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },

            //删除客户
            deleteCustomer(){
                let self = this;

                self.showLoading();

                axios.post(api.customerDelete, {id: self.id})
                    .then(res => {
                        self.hideLoading();

                        if (res.data.code === 1) {
                            alert("删除成功");
                            self.$router.push("/customer");
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

    .customerDetail {
        padding: 0.8rem 0 3.5rem 0;
        background-color: #f5f5f5;
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;

        .customerMes {
            padding: 0.2rem 0.3rem;
            background-color: #fff;
            margin-bottom: 0.2rem;

            .username {
                line-height: 0.6rem;
                border-bottom: 1px solid #eee;
                margin-bottom: 0.1rem;
            }

            .phone {
                float: right;
            }

            .itemRow {
                line-height: 0.5rem;
                font-size: 0.26rem;
                color: #999;
            }
        }

        .orderList {
            h3 {
                height: 0.8rem;
                line-height: 0.8rem;
                font-size: 0.3rem;
                font-weight: normal;
                color: #31bfcf;
                padding-left: 0.3rem;
                border-bottom: 1px solid #eee;
                background-color: #fff;

                .fa-angle-right {
                    color: #ccc;
                    font-size: 0.5rem;
                    vertical-align: middle;
                }
            }

            li {
                background-color: #fff;
                padding: 0.2rem 0.3rem;
                margin-bottom: 0.2rem;

                a {
                    display: block;
                }

                .orderTime {
                    font-size: 0.24rem;
                    border-bottom: 1px solid #eee;
                    color: #999;
                    line-height: 0.5rem;
                    margin-bottom: 0.2rem;
                }

                .deliveryState {
                    float: right;
                    color: #f00;
                }

                .deliveryAddress {
                    font-size: 0.24rem;
                    color: #999;
                }

                .money {
                    float: right;
                    color: #999;
                }
            }
        }

        .toolBtn {
            position: fixed;
            bottom: 0.9rem;
            right: 0.3rem;

            li {
                width: 1rem;
                height: 1rem;
                color: #fff;
                margin-bottom: 0.2rem;
                background-color: #31bfcf;
                border-radius: 50%;
                font-size: 0.24rem;
                text-align: center;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                line-height: 0.3rem;
            }

            .deleteOrder {
                background-color: #cd270a;
            }
        }
    }
</style>