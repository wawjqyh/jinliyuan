<template>
    <div class="goods">
        <div class="searchRow">
            <input type="text" placeholder="搜索" v-model="searchData">
            <span class="fa fa-search"></span>
        </div>

        <div class="listTitle">
            <span>型号</span>
            <span>颜色</span>
            <span>类型</span>
            <span>库存</span>
        </div>

        <ul class="goodsList">
            <li v-for="item in goodsShows">
                <span>{{item.name}}</span>
                <span>{{item.color}}</span>
                <span>{{item.category}}</span>
                <span>{{item.num}}</span>
            </li>
        </ul>

        <ul class="toolBtn">
            <router-link to="/orderAdd" tag="li">开单</router-link>
        </ul>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        data(){
            return {
                searchData: ""
            }
        },
        computed: {
            ...mapState(["goods", "category"]),

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
        padding-top: 1.4rem;

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

        .listTitle {
            position: absolute;
            width: 100%;
            height: 0.6rem;
            top: 0.8rem;
            left: 0;
            line-height: 0.6rem;
            display: flex;
            flex-wrap: nowrap;
            background-color: #fffbe6;

            span {
                flex-grow: 1;
                width: 25%;
                text-align: center;
                color: #31bfcf;
            }
        }

        .goodsList {
            li {
                display: flex;
                flex-wrap: nowrap;
                height: 0.8rem;
                line-height: 0.8rem;

                span {
                    flex-grow: 1;
                    width: 25%;
                    text-align: center;
                }
            }
            li:nth-child(2n) {
                background-color: #f3f3f3;
            }
        }

        .toolBtn {
            position: absolute;
            bottom: 0.3rem;
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
        }
    }
</style>