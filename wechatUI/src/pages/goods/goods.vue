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
        },

        mounted(){
            this.getGoods({});      //获取商品列表
            this.$nextTick(() => {
                this.$indicator.close();
            })
        }
    }
</script>

<style lang="less">
    @import "./less/goods";
</style>