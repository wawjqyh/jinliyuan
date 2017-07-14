<template>
    <div class="header">
        <div class="bg">
            <img :src="seller.avatar">
        </div>

        <div class="sellerImg">
            <img :src="seller.avatar">
        </div>

        <div class="baseMes">
            <h3 class="sellerName">{{seller.name}}</h3>
            <div class="distribution">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
            <div class="supports" v-if="seller.supports">
                <span>{{seller.supports[0].description}}</span>
                <div class="supportsBtn" @click="changeSellerBox">{{seller.supports.length}}个 ></div>
            </div>
        </div>

        <div class="bulletin" @click="changeSellerBox">
            <p>{{seller.bulletin}}</p>
            <span> > </span>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "header",
        computed: {
            ...mapState(["seller"])
        },
        methods: {
            ...mapMutations(["changeSellerBox"]),
        }
    }
</script>

<style lang="less">
    @import "../../../../common/less/mixin";

    .header {
        position: relative;
        padding: 0.48rem 0.24rem 0.9rem 2.08rem;
        overflow: hidden;
        background-color: rgba(7, 17, 27, 0.5);
        color: #fff;

        .bg {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            filter: blur(0.1rem);

            img {
                display: block;
                width: 100%;
            }
        }

        .sellerImg {
            position: absolute;
            width: 1.28rem;
            height: 1.28rem;
            top: 0.48rem;
            left: 0.48rem;
            border-radius: 0.1rem;
            overflow: hidden;

            img {
                display: block;
                width: 100%;
            }
        }

        .baseMes {
            height: 1.36rem;
        }

        .sellerName {
            font-size: 0.32rem;
            line-height: 0.36rem;
            font-weight: bold;
        }

        .distribution {
            font-size: 0.24rem;
            line-height: 0.5rem;
        }

        .supports {
            font-size: 0.2rem;
            line-height: 0.5rem;
            height: 0.5rem;

            .supportsBtn {
                height: 0.5rem;
                border-radius: 0.25rem;
                line-height: 0.5rem;
                padding: 0 0.16rem;
                background-color: rgba(0, 0, 0, 0.2);
                float: right;
            }
        }

        .bulletin {
            box-sizing: border-box;
            position: absolute;
            width: 100%;
            height: 0.56rem;
            left: 0;
            bottom: 0;
            background-color: rgba(7, 17, 27, 0.2);
            line-height: 0.56rem;
            font-size: 0.2rem;
            padding: 0 0.5rem 0 0.24rem;

            p {
                .ellipsisNormal();
            }

            span {
                position: absolute;
                top: 0;
                right: 0.2rem;
            }
        }
    }
</style>