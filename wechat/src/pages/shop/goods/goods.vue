<template>
    <div class="goods">
        <div class="menu">
            <ul>
                <li v-for="(item, index) in goods" :class="{active: currentIndex == index}" @click="clickItem(index)">
                    <div>{{item.name}}</div>
                </li>
            </ul>
        </div>

        <div class="goodsList" @scroll="onScroll($event)" ref="goodsListCon">
            <div class="category" v-for="category in goods" ref="category">
                <div class="itemName">{{category.name}}</div>

                <div class="itemList">
                    <div class="item" v-for="item in category.foods" @click="turnDetail(item)">
                        <div class="goodsImg">
                            <img :src="item.icon">
                        </div>

                        <h3 class="goodsName">{{item.name}}</h3>
                        <div class="goodsSells">月销售{{item.sellCount}}份 &nbsp; 好评率{{item.rating}}%</div>
                        <div class="goodsPrice">￥{{item.price}}</div>

                        <v-num :num="item.num" @addNum="addGoodsNum(item)" @subNum="subGoodsNum(item)"></v-num>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from "vuex";
    import vNum from "../../../components/num/num.vue";

    export default{
        components: {
            vNum
        },

        data(){
            return {
                offsetTop: [],          //保存个各类型商品的位置
                currentIndex: 0         //当前滚动条的位置为第几个商品
            }
        },

        computed: {
            ...mapState(["goods"])
        },

        //dom更新时会触发update，这个时候保存商品的位置
        updated(){
            let self = this;
            let category = self.$refs.category;

            //只需要保存第一次
            if (self.offsetTop.length > 0) {
                return;
            }

            for (let i = 0; i < category.length; i++) {
                self.offsetTop.push(category[i].offsetTop);
            }
        },

        methods: {
            ...mapMutations(["addGoodsNum", "subGoodsNum", "setCurFood"]),

            //滚动条滑动事件
            onScroll(e){
                let self = this;
                let st = e.target.scrollTop;
                let arr = self.offsetTop;

                //判断滚动条处于哪个商品的位置
                for (let i = 0; i < arr.length; i++) {
                    if ((st > arr[i] && i === arr.length - 1) || (st > arr[i] && st < arr[i + 1])) {
                        self.currentIndex = i;
                    }
                }
            },

            //点击左侧菜单栏滚动到相应商品的位置
            clickItem(index){
                let self = this;
                let con = self.$refs.goodsListCon;

                con.scrollTop = self.offsetTop[index];
                self.currentIndex = index;
            },

            turnDetail(food){
                this.setCurFood(food);
                this.$router.push("/goodsDetail");
            }
        }
    }
</script>

<style lang="less">
    .goods {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        .menu {
            box-sizing: border-box;
            position: absolute;
            width: 1.6rem;
            height: 100%;
            top: 0;
            left: 0;
            background-color: #f3f5f7;
            overflow: auto;

            li {
                padding: 0 0.24rem;
                display: table;
                width: 100%;
                box-sizing: border-box;

                div {
                    font-size: 0.24rem;
                    line-height: 0.3rem;
                    height: 0.6rem;
                    padding: 0.24rem 0;
                    border-bottom: 1px solid #ddd;
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;
                }
            }

            li:last-child div {
                border: none;
            }

            .active {
                background-color: #fff;

                & div {
                    border: none;
                }
            }
        }

        .goodsList {
            position: absolute;
            top: 0;
            left: 1.6rem;
            right: 0;
            bottom: 0;
            overflow: auto;

            .itemName {
                font-size: 0.24rem;
                height: 0.5rem;
                line-height: 0.5rem;
                background-color: #f3f5f7;
                border-left: 2px solid #ddd;
                color: rgb(147, 153, 159);
                padding-left: 0.2rem;
            }

            .itemList {
                padding: 0 0.3rem;
            }

            .item {
                padding: 0.3rem 0 0.3rem 1.4rem;
                position: relative;
                border-bottom: 1px solid #ddd;
                height: 1.2rem;
                overflow: hidden;

                &:last-child {
                    border: none;
                }

                .goodsImg {
                    width: 1.2rem;
                    height: 1.2rem;
                    overflow: hidden;
                    position: absolute;
                    top: 0.3rem;
                    left: 0;
                    border-radius: 0.1rem;

                    img {
                        display: block;
                        width: 100%;
                    }
                }

                .goodsName {
                    font-size: 0.28rem;
                }

                .goodsSells {
                    font-size: 0.2rem;
                    color: rgb(147, 153, 159);
                    line-height: 0.5rem;
                }

                .goodsPrice {
                    font-size: 0.28rem;
                    line-height: 0.3rem;
                    font-weight: bold;
                    color: #f11;
                }

                .numBtn {
                    position: absolute;
                    right: 0;
                    bottom: 0.2rem;
                }
            }
        }
    }
</style>