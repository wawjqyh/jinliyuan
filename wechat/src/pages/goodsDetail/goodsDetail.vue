<template>
    <div class="goodsDetail">
        <img class="goodsImg" :src="goods.image">

        <div class="baseMes">
            <h3>{{goods.name}}</h3>
            <p>月售{{goods.sellCount}}份 &nbsp; 好评率{{goods.rating}}%</p>
            <div class="price">￥{{goods.price}}</div>
            <a href="javascript:void(0)" class="buyBtn" @click="addGoodsNum(goods)">加入购物车</a>
        </div>

        <div class="desc">
            <h3>商品介绍</h3>
            <p>{{goods.info}}</p>
        </div>

        <div class="comment">
            <h3>商品评价</h3>

            <ul class="commentTab">
                <li :class="{commentActive: type == 'all'}" @click="type = 'all'">全部 {{allNum}}</li>
                <li :class="{commentActive: type == 'good'}" @click="type = 'good'">推荐 {{goodNum}}</li>
                <li :class="{commentActive: type == 'bad'}" @click="type = 'bad'">吐槽 {{badNum}}</li>
            </ul>

            <div class="btn2" @click="withText = !withText">
                <img src="./images/1_1.png" v-show="!withText">
                <img src="./images/1_2.png" v-show="withText">
                <span>只看有内容的评价</span>
            </div>
        </div>

        <ul class="commentList">
            <li v-for="item in goodsShow">
                <div class="commentHead">
                    <span class="time">{{item.rateTime}}</span>
                    <span class="userId">{{item.username}}</span>
                    <img class="userImg" :src="item.avatar">
                </div>

                <div class="commentContent">
                    <img class="cIcon" src="./images/1_4.png" v-show="item.rateType == 0">
                    <img class="cIcon" src="./images/1_3.png" v-show="item.rateType == 1">
                    <span>{{item.text}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from "vuex";

    export default{
        data(){
            return {
                type: "all",         //all、good、bad
                withText: false     //false为显示所有评价
            }
        },
        computed: {
            ...mapState({
                goods: "curFood"
            }),

            allNum(){
                return this.goods.ratings.length;
            },

            goodNum(){
                let self = this;
                let num = 0;

                self.goods.ratings.forEach(item => {
                    if (item.rateType === 0) {
                        num++;
                    }
                });

                return num;
            },

            badNum(){
                let self = this;
                let num = 0;

                self.goods.ratings.forEach(item => {
                    if (item.rateType === 1) {
                        num++;
                    }
                });

                return num;
            },

            goodsShow(){
                let self = this;
                let list1 = [];

                if (self.type === "all") {
                    list1 = self.goods.ratings;
                }

                if (self.type === "good") {
                    list1 = self.goods.ratings.filter(item => item.rateType === 0);
                }

                if (self.type === "bad") {
                    list1 = self.goods.ratings.filter(item => item.rateType === 1);
                }

                if (self.withText) {
                    return list1.filter(item => item.text !== "")
                } else {
                    return list1;
                }
            }
        },

        methods: {
            ...mapMutations(["addGoodsNum"])
        }
    }
</script>

<style lang="less">
    @import "../../common/less/mixin";

    .goodsDetail {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 1rem;
        overflow: auto;
        background-color: #f3f5f7;

        .goodsImg {
            display: block;
            width: 100%;
        }

        .baseMes {
            padding: 0.36rem;
            background-color: #fff;
            position: relative;

            h3 {
                font-size: 0.28rem;
                line-height: 0.5rem;
            }

            p {
                font-size: 0.2rem;
                color: #999;
            }

            .price {
                font-size: 0.3rem;
                color: #f00;
                font-weight: bold;
                line-height: 0.5rem;
                margin-top: 0.2rem;
            }

            .buyBtn {
                position: absolute;
                padding: 0 0.2rem;
                bottom: 0.36rem;
                right: 0.36rem;
                height: 0.5rem;
                border-radius: 0.25rem;
                color: #fff;
                background-color: #00a0dc;
                line-height: 0.5rem;
                font-size: 0.2rem;
            }
        }

        .desc {
            padding: 0.36rem;
            background-color: #fff;
            margin-top: 0.3rem;

            h3 {
                font-size: 0.28rem;
                line-height: 0.5rem;
            }

            p {
                font-size: 0.24rem;
                line-height: 0.48rem;
                color: #999;
            }
        }

        .comment {
            padding: 0.36rem;
            background-color: #fff;
            margin-top: 0.3rem;

            h3 {
                font-size: 0.28rem;
                line-height: 0.5rem;
            }

            .commentTab {
                margin-top: 0.2rem;
                padding-bottom: 0.36rem;
                border-bottom: 1px solid #eee;
                .clearFix();

                li {
                    float: left;
                    width: 1.4rem;
                    height: 0.6rem;
                    background-color: #eee;
                    margin-right: 0.2rem;
                    line-height: 0.6rem;
                    font-size: 0.24rem;
                    text-align: center;
                }
            }

            .commentActive {
                color: #fff;
                background-color: #00a0dc !important;
            }

            .btn2 {
                padding: 0.24rem 0;
                line-height: 0.5rem;
                font-size: 0.24rem;
                color: #999;

                img {
                    width: 0.5rem;
                    vertical-align: bottom;
                    margin-right: 0.2rem;
                }
            }
        }

        .commentList {
            border-top: 1px solid #ddd;
            background-color: #fff;
            padding: 0 0.36rem;

            li {
                padding: 0.32rem 0;
                border-bottom: 1px solid #eee;

                .commentHead {
                    padding: 0.1rem 0.4rem 0.1rem 0;
                    color: #999;
                    font-size: 0.2rem;
                    line-height: 0.24rem;
                    position: relative;
                }

                .userImg {
                    position: absolute;
                    width: 0.24rem;
                    height: 0.24rem;
                    top: 0.1rem;
                    right: 0;
                    border-radius: 50%;
                }

                .userId {
                    float: right;
                }

                .commentContent {
                    font-size: 0.24rem;
                    line-height: 0.4rem;
                }

                .cIcon {
                    width: 0.24rem;
                    height: 0.24rem;
                    vertical-align: baseline;
                }
            }
        }
    }
</style>