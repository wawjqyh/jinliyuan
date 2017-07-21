<template>
    <div class="selectGoods" v-show="state">
        <div class="searchRow">
            <input type="text" placeholder="搜索" v-model="searchData">
            <span class="fa fa-search"></span>
        </div>

        <div class="listTitle">
            <span>型号</span>
            <span>颜色</span>
            <span>类型</span>
            <span></span>
        </div>

        <ul class="gList">
            <li v-for="item in goods" v-show="item.show">
                <span class="item">{{item.name}}</span>
                <span class="item">{{item.color}}</span>
                <span class="item">{{item.category}}</span>
                <span class="item">
                    <v-num v-model="item.sNum"></v-num>
                </span>
            </li>
        </ul>

        <div class="goodsSelectedCon" v-show="selectedBoxState">
            <div class="goodsSelected">
                <div class="selectedHeader">已选商品</div>

                <ul class="selectedList">
                    <li v-for="item in goods" v-show="item.sNum > 0">
                        <span class="goodsMes">{{item.name}}-{{item.category}}-{{item.color}}</span>
                        <v-num v-model="item.sNum"></v-num>
                    </li>
                </ul>
            </div>
        </div>

        <div class="cart">
            <div class="totalArea" @click="selectedBoxState = !selectedBoxState">
                <div class="cartIcon" :class="{iconLight: totalNum > 0}">
                    <span class="fa fa-shopping-cart"></span>
                    <span class="goodsNum" v-show="totalNum > 0">{{totalNum}}</span>
                </div>
            </div>
            <a href="javascript:void(0)" class="confirmBtn" @click="onClose">确定</a>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    import vNum from "../../../components/num.vue";

    export default {
        props: ["state"],

        data(){
            return {
                searchData: "",
                selectedBoxState: false
            }
        },
        components: {
            vNum
        },
        computed: {
            ...mapState(["goods"]),

            totalNum(){
                let totalNum = 0;

                if (this.goods) {
                    this.goods.forEach(item => {
                        totalNum = totalNum + item.sNum;
                    })
                }

                return totalNum;
            }
        },

        watch: {
            searchData(data){
                let self = this;

                console.log(self.goods);

                self.goods.forEach(item => {
                    let reg = new RegExp(data, "g");
                    item.show = reg.test(item.name) || reg.test(item.color) || reg.test(item.category);
                });
            }
        },

        methods: {
            onClose(){
                this.$emit("close");
            }
        }
    }
</script>

<style lang="less">
    @import "../../../common/less/common";

    .selectGoods {
        position: fixed;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        top: 0;
        left: 0;
        overflow: auto;
        padding: 1.4rem 0 0.8rem 0;
        z-index: 9999;
        background-color: #fff;

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

        .gList {
            li {
                display: flex;
                flex-wrap: nowrap;
                height: 0.8rem;
                line-height: 0.8rem;

                .item {
                    flex-grow: 1;
                    width: 25%;
                    text-align: center;
                }
            }
            li:nth-child(2n) {
                background-color: #f3f3f3;
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

            .goodsSelected {
                position: absolute;
                width: 100%;
                left: 0;
                bottom: 0;
                background-color: #fff;
            }

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
                    height: 1rem;
                    line-height: 1rem;
                    border-bottom: 1px solid #eee;
                    position: relative;

                    .numBtn {
                        position: absolute;
                        top: 0.3rem;
                        right: 0;
                    }
                }
            }
        }
    }
</style>