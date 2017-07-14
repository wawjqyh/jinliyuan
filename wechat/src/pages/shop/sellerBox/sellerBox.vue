<template>
    <transition name="fade">
        <div class="sellerBox" v-show="sellerBoxState">
            <div class="sellerMes">
                <h3 class="name">{{seller.name}}</h3>

                <div class="score">
                    <star :size="48" :score="seller.score"></star>
                </div>

                <div class="itemHeader">
                    <div>优惠信息</div>
                </div>
                <ul class="supports">
                    <li v-for="item in seller.supports">{{item.description}}</li>
                </ul>

                <div class="itemHeader">
                    <div>商家公告</div>
                </div>
                <div class="bulletin">{{seller.bulletin}}</div>
            </div>

            <div class="closeBtn" @click="changeSellerBox">×</div>
        </div>
    </transition>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from "vuex";
    import star from "../../../components/star/star.vue";

    export default{
        computed: {
            ...mapState(["sellerBoxState","seller"])
        },
        methods: {
            ...mapMutations(["changeSellerBox"])
        },
        components: {
            star
        }
    }
</script>

<style lang="less">
    .sellerBox {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
        box-sizing: border-box;
        padding: 1.28rem 0.72rem 0 0.72rem;
        z-index: 1;

        .sellerMes {
            min-height: 100%;
            box-sizing: border-box;
            padding-bottom: 1.92rem;
            color: #fff;

            .name {
                font-size: 0.32rem;
                font-weight: bold;
                line-height: 0.32rem;
                text-align: center;
            }

            .score {
                padding: 0.32rem 0;
                text-align: center;
            }

            .itemHeader {
                display: flex;
                flex-flow: row nowrap;
                padding: 0.5rem 0;

                div {
                    flex-grow: 0;
                    padding: 0 0.2rem;
                }

                &:before, &:after {
                    content: " ";
                    display: block;
                    flex-grow: 1;
                    border-top: 1px solid rgba(255, 255, 255, 0.4);
                    margin-top: 0.2rem;
                }
            }

            .supports {
                font-size: 0.24rem;
                line-height: 0.5rem;
            }

            .bulletin {
                font-size: 0.24rem;
                line-height: 0.48rem;
            }
        }

        .closeBtn {
            padding: 0.64rem;
            height: 0.64rem;
            line-height: 0.64rem;
            font-size: 0.64rem;
            color: rgba(255, 255, 255, 0.5);
            text-align: center;
            margin-top: -1.92rem;
        }
    }
</style>