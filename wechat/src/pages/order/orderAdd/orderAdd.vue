<template>
    <div class="orderAdd">
        <div>
            <v-header title="新增订单"></v-header>

            <div class="baseMes">
                <div class="formRow">
                    <span class="itemName">客户 <b>*</b></span>
                    <input type="text" placeholder="请选择客户" readonly @click="customerBoxState = true"
                           :value="customerVal">
                </div>

                <div class="formRow">
                    <span class="itemName">送货时间 <b>*</b></span>
                    <v-date-picker :date="startTime" :option="option"></v-date-picker>
                </div>
            </div>

            <div class="goodsList">
                <div class="goodsListTitle">
                    <span>商品</span>
                    <a href="javascript:void(0)" class="addGoodsBtn" @click="goodsBoxState = true">选择商品</a>
                </div>

                <div class="goodsItem" v-for="item in goods" v-show="item.sNum > 0">
                    <span class="goodsName">{{item.name}}-{{item.category}}-{{item.color}}</span>
                    <v-num v-model="item.sNum"></v-num>
                </div>
            </div>
        </div>

        <v-select-customer :state="customerBoxState" @selectCustomer="onSelectCustomer"></v-select-customer>
        <v-select-goods :state="goodsBoxState" @close="goodsBoxState = false"></v-select-goods>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    import vHeader from "../../../components/header.vue";
    import vDatePicker from "../../../components/vue-datepicker.vue";

    import vNum from "../../../components/num.vue";
    import vSelectCustomer from "./selectCustomer.vue";
    import vSelectGoods from "./selectGoods.vue";

    export default{
        data(){
            return {
                customerBoxState: false,            //选择客户弹框的状态
                goodsBoxState: false,               //选择商品弹框的状态
                customer: {},                       //客户

                startTime: {
                    time: ""
                },
                option: {
                    type: "day",
                    week: ["一", "二", "三", "四", "五", "六", "日"],
                    month: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    format: "YYYY-MM-DD",
                    placeholder: "请选择送货日期",
                    inputStyle: {
                        "background": "none",
                        "border": "none",
                        "font-size": "0.3rem",
                        "color": "#999",
                        "display": "block",
                        "width": "100%",
                        "height": "1rem",
                        "outline": "none"
                    },
                    buttons: {
                        ok: "确定",
                        cancel: "取消"
                    },
                    overlayOpacity: 0.5, // 0.5 as default
                    dismissible: true // as true as default
                }
            }
        },
        components: {
            vHeader,
            vSelectCustomer,
            vDatePicker,
            vSelectGoods,
            vNum
        },
        computed: {
            ...mapState(["goods"]),

            customerVal(){
                let self = this;

                if (self.customer.username) {
                    return self.customer.username + " - " + self.customer.phone;
                } else {
                    return "";
                }
            }
        },
        methods: {
            onSelectCustomer(data){
                let self = this;
                self.customerBoxState = false;
                self.customer = data;
            }
        }
    }
</script>

<style lang="less">
    @import "../../../common/less/common";

    .orderAdd {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 0.8rem;
        background-color: #eee;

        .baseMes {
            background-color: #fff;
            padding: 0 0.3rem;

            .formRow {
                border-bottom: 1px solid #eee;
                position: relative;
                padding-left: 1.8rem;

                .itemName {
                    position: absolute;
                    top: 0;
                    left: 0;
                    line-height: 1rem;
                }

                b {
                    color: #f00;
                    line-height: 1rem;
                }

                input, select {
                    background: none;
                    border: none;
                    font-size: 0.3rem;
                    color: #999;
                    display: block;
                    width: 100%;
                    height: 1rem;
                    outline: none;
                }

                .error {
                    color: #f00;
                    font-size: 0.2rem;
                    line-height: 0.3rem;
                }
            }

            .formRow:last-child {
                border: none;
            }
        }

        .goodsList {
            background-color: #fff;
            padding: 0 0.3rem;
            margin-top: 0.2rem;

            .goodsListTitle {
                height: 0.5rem;
                line-height: 0.5rem;
                padding: 0.1rem 0;
                color: @mainColor;
                position: relative;

                .addGoodsBtn {
                    position: absolute;
                    box-sizing: border-box;
                    height: 0.5rem;
                    top: 0.1rem;
                    right: 0;
                    background-color: @mainColor;
                    color: #fff;
                    padding: 0 0.2rem;
                    border-radius: 0.2rem;
                    font-size: 0.24rem;
                }
            }
        }
    }
</style>