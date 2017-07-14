<template>
    <div class="cart">
        <div class="cartIcon" @click="changeCartBox" :class="{cartIconActive: totalNum > 0}">
            <img src="./images/cart.png">
            <span class="goodsNum" v-show="totalNum > 0">{{totalNum}}</span>
        </div>

        <span class="totalMoney" :class="{totalMoneyActive: totalNum > 0}">￥{{totalMoney}}</span>
        <span class="deliveryFee">另需配送费￥4元</span>

        <a href="javascript:void(0)" class="submitBtn">{{submitBtnText}}</a>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from "vuex";

    export default {
        computed: {
            ...mapState({
                //总价
                totalMoney(state){
                    let totalMoney = 0;

                    state.cart.forEach(item => {
                        totalMoney += parseInt(item.price) * item.num;
                    });

                    return totalMoney;
                },

                //总数量
                totalNum(state){
                    let totalNum = 0;

                    state.cart.forEach(item => {
                        totalNum += item.num;
                    });

                    return totalNum;
                },

                //提交按钮的文字
                submitBtnText(state){
                    let self = this;
                    let text;

                    if (self.totalMoney === 0) {
                        text = `￥${state.seller.minPrice}起送`;
                    }

                    if (self.totalMoney > 0 && self.totalMoney < state.seller.minPrice) {
                        text = `还差￥${state.seller.minPrice - self.totalMoney}起送`;
                    }

                    if (self.totalMoney >= state.seller.minPrice) {
                        text = "下单";
                    }

                    return text;
                }
            })
        },

        methods: {
            ...mapMutations(["changeCartBox"])
        }
    }
</script>

<style lang="less">
    .cart {
        position: absolute;
        width: 100%;
        height: 1rem;
        left: 0;
        bottom: 0;
        background-color: #141d27;
        box-sizing: border-box;
        padding-left: 1.5rem;
        line-height: 1rem;

        .cartIcon {
            position: absolute;
            width: 0.88rem;
            height: 0.88rem;
            left: 0.24rem;
            bottom: 0.1rem;
            border: 0.12rem solid #141d27;
            background-color: #2b343a;
            border-radius: 50%;

            img {
                display: block;
                width: 60%;
                margin: 20% auto 0 auto;
            }

            .goodsNum {
                font-size: 0.2rem;
                position: absolute;
                line-height: 0.3rem;
                background-color: #f00;
                color: #fff;
                padding: 0 0.14rem;
                border-radius: 0.15rem;
                top: -0.1rem;
                right: -0.1rem;
            }
        }

        .cartIconActive {
            background-color: #00a0dc;
        }

        .totalMoney {
            font-size: 0.32rem;
            font-weight: bolder;
            color: #919396;
        }

        .totalMoneyActive {
            color: #fff;
        }

        .deliveryFee {
            font-size: 0.26rem;
            color: #919396;
            margin-left: 0.2rem;
        }

        .submitBtn {
            position: absolute;
            width: 2.1rem;
            height: 100%;
            top: 0;
            right: 0;
            font-size: 0.24rem;
            color: #919396;
            background-color: #2b333b;
            text-align: center;
            line-height: 1rem;
            font-weight: bold;
        }
    }
</style>