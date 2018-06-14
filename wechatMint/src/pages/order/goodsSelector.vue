<template>
    <div class="selectGoods" v-show="visible">
        <!--搜索栏-->
        <div class="searchRow">
            <input type="text" placeholder="搜索" v-model="search">
            <span class="fa fa-search"></span>
        </div>

        <!--商品列表-->
        <ul class="goodsList">
            <li v-for="item in goodsList" v-show="checkGoods(item)">
                <span class="goodsName">{{item.name}}</span>
                <span class="goodsType">{{item.category}}</span>
                <span class="goodsColor">{{item.color}}</span>
                <span class="goodsNum">库存:{{item.num}}</span>
                <v-num v-model="item.sNum"></v-num>
            </li>
        </ul>

        <!--购物车-->
        <div class="goodsSelectedCon" v-show="cartVisible">
            <div class="goodsSelected">
                <div class="selectedHeader">已选商品</div>

                <ul class="selectedList">
                    <li v-for="item in goodsList" v-show="item.sNum > 0">
                        <span class="goodsName">{{item.name}}</span>
                        <span class="goodsType">{{item.category}}</span>
                        <span class="goodsColor">{{item.color}}</span>
                        <span class="goodsNum">库存:{{item.num}}</span>
                        <v-num v-model="item.sNum"></v-num>
                    </li>
                </ul>
            </div>
        </div>

        <!--购物车图标-->
        <div class="cart">
            <div class="totalArea" @click="cartVisible = !cartVisible">
                <div class="cartIcon" :class="{iconLight: totalNum > 0}">
                    <span class="fa fa-shopping-cart"></span>
                    <span class="goodsNum" v-show="totalNum > 0">{{totalNum}}</span>
                </div>
            </div>
            <a href="javascript:void(0)" class="confirmBtn" @click="confirm">确定</a>
        </div>
    </div>
</template>

<script>
    import vNum from "../../components/num.vue";

    export default{
        props: ["visible", "value"],

        data(){
            return {
                search: "",             //搜索
                cartVisible: false,    //购物车列表状态
                goodsList: []
            }
        },

        computed: {
            //商品总数
            totalNum(){
                let totalNum = 0;

                this.goodsList.forEach(item => {
                    totalNum = totalNum + item.sNum;
                });

                return totalNum;
            }
        },

        components: {
            vNum
        },

        methods: {
            checkGoods(item){
                let self = this;
                let reg = new RegExp(self.search, "g");

                return reg.test(item.name) || reg.test(item.color) || reg.test(item.category);
            },

            //获取商品列表
            async loadData(){
                let self = this;

                let res = await self.$axios.get(self.$api.goods);

                if (res.state) {
                    res.data.rows.forEach(item => {
                        item.sNum = 0;
                        item.price = "";
                    });

                    self.goodsList = res.data.rows;
                } else {
                    self.$toast("获取商品失败！");
                }
            },

            confirm(){
                let sItem = this.goodsList.filter(item => {
                    return item.sNum > 0;
                });

                this.$emit("update:visible", false);
                this.$emit("input", sItem);
            }
        },

        mounted(){
            this.loadData();
        }
    }
</script>

<style lang="less">
    .selectGoods {
        position: fixed;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        top: 0;
        left: 0;
        overflow: auto;
        padding: 0.8rem 0;
        z-index: 9999;
        background-color: #fff;

        .searchRow {
            padding: 0.15rem 0.3rem;
            background-color: #31bfcf;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            box-sizing: border-box;

            input {
                display: block;
                border: 1px solid #fff;
                background: none;
                color: #fff;
                width: 100%;
                box-sizing: border-box;
                height: 0.5rem;
                border-radius: 0.3rem;
                padding-left: 0.6rem;
            }

            input::placeholder {
                color: #fff;
            }

            .fa-search {
                color: #fff;
                position: absolute;
                top: 0.26rem;
                left: 0.48rem;
            }
        }

        .goodsList {
            padding: 0 0.2rem;

            li {
                border-bottom: 1px solid #eee;
                height: 1rem;
                line-height: 1rem;
                position: relative;
                padding-left: 1rem;

                .goodsName {
                    font-size: 0.4rem;
                    position: absolute;
                    height: 1rem;
                    line-height: 1rem;
                    width: 1rem;
                    top: 0;
                    left: 0;
                }

                .goodsNum {
                    position: absolute;
                    height: 1rem;
                    line-height: 1rem;
                    width: 1.5rem;
                    top: 0;
                    right: 2rem;
                    color: #f00;
                    font-size: 0.24rem;
                }

                .goodsType, .goodsColor {
                    color: #999;
                    font-size: 0.24rem;
                }

                .numBtn {
                    position: absolute;
                    top: 0.3rem;
                    right: 0;
                }
            }

            li:last-child {
                border: none;
            }
        }

        .cart {
            position: fixed;
            width: 100%;
            height: 0.8rem;
            left: 0;
            bottom: 0;
            background-color: #141c27;
            line-height: 0.8rem;
            color: #fff;
            text-align: center;

            .totalArea {
                height: 0.8rem;
            }

            .cartIcon {
                position: absolute;
                width: 0.9rem;
                height: 0.9rem;
                border-radius: 50%;
                border: 0.2rem solid #141c27;
                left: 0.3rem;
                bottom: -0.1rem;
                background-color: #2b343d;
                text-align: center;

                .fa-shopping-cart {
                    font-size: 0.5rem;
                    line-height: 0.9rem;
                    color: #808589;
                }

                .goodsNum {
                    font-size: 0.24rem;
                    padding: 0 0.1rem;
                    background-color: #f00;
                    border-radius: 0.2rem;
                    height: 0.34rem;
                    line-height: 0.34rem;
                    top: -0.2rem;
                    right: -0.2rem;
                    position: absolute;
                }
            }

            .iconLight {
                background-color: #00a0dc;

                .fa-shopping-cart {
                    color: #fff;
                }
            }

            .confirmBtn {
                position: absolute;
                width: 2rem;
                height: 0.9rem;
                background-color: #00a0dc;
                color: #fff;
                top: 0;
                right: 0;
            }
        }

        .goodsSelectedCon {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            bottom: 0.8rem;
            background-color: rgba(0, 0, 0, 0.7);
        }

        .goodsSelected {
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            background-color: #fff;

            .selectedHeader {
                background-color: #f3f3f3;
                padding: 0 0.2rem;
                height: 0.8rem;
                line-height: 0.8rem;
                border-bottom: 1px solid #ddd;
            }

            .selectedList {
                padding: 0 0.2rem 0.5rem 0.2rem;
                max-height: 4rem;
                overflow: auto;

                li {
                    border-bottom: 1px solid #eee;
                    height: 1rem;
                    line-height: 1rem;
                    position: relative;
                    padding-left: 1rem;
                }

                li:last-child {
                    border: none;
                }

                .goodsName {
                    font-size: 0.4rem;
                    position: absolute;
                    height: 1rem;
                    line-height: 1rem;
                    width: 1rem;
                    top: 0;
                    left: 0;
                }

                .goodsNum {
                    position: absolute;
                    height: 1rem;
                    line-height: 1rem;
                    width: 1.5rem;
                    top: 0;
                    right: 2rem;
                    color: #f00;
                    font-size: 0.24rem;
                }

                .goodsType, .goodsColor {
                    color: #999;
                    font-size: 0.24rem;
                }

                .numBtn {
                    position: absolute;
                    top: 0.3rem;
                    right: 0;
                }
            }
        }
    }
</style>