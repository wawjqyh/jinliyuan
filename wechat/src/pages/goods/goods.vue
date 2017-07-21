<template>
    <div class="goods">

        <!--搜索栏-->
        <div class="searchRow">
            <input type="text" placeholder="搜索" v-model="searchData">
            <span class="fa fa-search"></span>
        </div>

        <!--商品列表-->
        <ul class="goodsList">
            <li v-for="item in goodsShows">
                <span class="goodsName">{{item.name}}</span>
                <span class="goodsType">{{item.category}}</span>
                <span class="goodsColor">{{item.color}}</span>
                <span class="goodsNum">库存:{{item.num}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";

    export default {
        data(){
            return {
                searchData: ""
            }
        },
        mounted(){
            this.getGoods({});      //获取商品列表
        },
        computed: {
            ...mapState(["goods"]),

            //展示在列表中的商品，即符合搜索条件的商品
            goodsShows(){
                let self = this;

                if (self.searchData === "") {
                    return self.goods;
                }

                return self.goods.filter(item => {
                    let reg = new RegExp(self.searchData, "g");
                    return reg.test(item.name) || reg.test(item.color) || reg.test(item.category);
                });
            }
        },
        methods: {
            ...mapActions(["getGoods"])
        }
    }
</script>

<style lang="less">
    .goods {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0.9rem;
        overflow: auto;
        padding-top: 0.8rem;

        .searchRow {
            padding: 0.15rem 0.3rem;
            background-color: #31bfcf;
            position: absolute;
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
                    right: 0;
                    color: #f00;
                    font-size: 0.24rem;
                }

                .goodsType, .goodsColor {
                    color: #999;
                    font-size: 0.24rem;
                }
            }

            li:last-child {
                border: none;
            }
        }
    }
</style>