<template>
    <div class="delivery">
        <ul class="tab">
            <li :class="{active: active == 1}" @click="active = 1">待配送</li>
            <li :class="{active: active == 2}" @click="active = 2">订单记录</li>
        </ul>

        <ul class="list">
            <li v-for="order in orderShows">
                <router-link :to="'/deliveryDetail/' + order.order_id">
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
    import axios from "axios";
    import api from "../../common/js/api";

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
            loadData(){
                let self = this;

                axios.get(api.delivery).then(res => {
                    if (res.data.code === 1) {
                        self.onDelivery = res.data.data.onDelivery;
                        self.record = res.data.data.record;
                    } else {
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },

        mounted(){
            this.loadData();
        }
    }
</script>

<style lang="less">
    @import "../../common/less/common";

    .delivery {
        padding-top: 0.8rem;
        background-color: #eee;

        .tab {
            position: fixed;
            width: 100%;
            height: 0.8rem;
            top: 0;
            left: 0;
            box-sizing: border-box;
            display: flex;
            border-bottom: 1px solid @mainColor;
            background-color: #fff;

            li {
                flex-grow: 1;
                text-align: center;
                line-height: 0.8rem;
                color: @mainColor;
            }

            .active {
                color: #fff;
                background-color: @mainColor;
            }
        }

        .list {
            li {
                padding: 0.2rem 0.3rem;
                background-color: #fff;
                margin-bottom: 0.2rem;

                a {
                    display: block;
                }
            }

            .orderTime {
                font-size: 0.24rem;
                border-bottom: 1px solid #eee;
                color: #999;
                line-height: 0.5rem;
            }

            .deliveryState {
                float: right;
                color: #f00;
            }

            .customerMes {
                height: 0.7rem;
                line-height: 0.7rem;

                .phone {
                    float: right;
                    font-size: 0.24rem;
                }
            }

            .deliveryAddress {
                font-size: 0.24rem;
                color: #999;
            }
        }
    }
</style>