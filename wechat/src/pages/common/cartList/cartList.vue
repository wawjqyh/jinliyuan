<template>
    <transition name="fade">
        <div class="cartListCon" v-show="cartBoxState && cart.length > 0">
            <div class="cartList">
                <div class="cartListHeader">
                    <span>购物车</span>
                    <a href="javascript:void(0)" class="clear" @click="clearCart">清空</a>
                </div>

                <ul class="list">
                    <li v-for="item in cart">
                        <span class="name">{{item.name}}</span>
                        <span class="money">￥{{item.price}}</span>
                        <v-num :num="item.num" @addNum="addGoodsNum(item)" @subNum="subGoodsNum(item)"></v-num>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
    import vNum from "../../../components/num/num.vue";
    import {mapState, mapMutations} from "vuex";

    export default{
        computed: {
            ...mapState(["cartBoxState", "cart"])
        },

        components: {
            vNum
        },

        methods: {
            ...mapMutations(["addGoodsNum", "subGoodsNum", "clearCart"])
        }
    }
</script>

<style lang="less">
    .cartListCon {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);

        .cartList {
            position: absolute;
            background-color: #fff;
            width: 100%;
            bottom: 1rem;
            left: 0;
            padding-bottom: 0.3rem;
        }

        .cartListHeader {
            height: 0.8rem;
            line-height: 0.8rem;
            background-color: #eee;
            padding: 0 0.4rem;
            font-size: 0.28rem;
            position: relative;
            border-bottom: 1px solid #ddd;

            .clear {
                position: absolute;
                right: 0.4rem;
                color: #00a0dc;
            }
        }

        .list {
            padding: 0 0.3rem;

            li {
                height: 0.9rem;
                line-height: 0.9rem;
                border-bottom: 1px solid #eee;
                font-size: 0.28rem;
                position: relative;

                .numBtn {
                    position: absolute;
                    top: 0.25rem;
                    right: 0;
                }

                .money {
                    position: absolute;
                    right: 1.8rem;
                    color: #f00;
                    font-weight: bold;
                }
            }

            li:last-child {
                border: none;
            }
        }
    }
</style>