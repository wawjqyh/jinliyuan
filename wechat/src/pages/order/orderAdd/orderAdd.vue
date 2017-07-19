<template>
    <div class="orderAdd">
        <div>
            <v-header title="新增订单"></v-header>

            <div class="baseMes">
                <div class="formRow">
                    <span>客户 <b>*</b></span>
                    <input type="text" placeholder="请选择客户" readonly @click="customerBoxState = true"
                           :value="customerVal">
                </div>

                <div class="formRow">
                    <span>送货时间 <b>*</b></span>
                    <input type="text" placeholder="请选择送货时间" readonly>
                </div>
            </div>

            <div class="goodsList">
                <div class="goodsListTitle">
                    <span>商品</span>
                    <a href="javascript:void(0)" class="addGoodsBtn">选择商品</a>
                </div>

                <div class="goodsItem">
                    <span class="goodsName">830 苹果 红</span>
                </div>
            </div>
        </div>

        <v-select-customer :state="customerBoxState" @selectCustomer="onSelectCustomer"></v-select-customer>
    </div>
</template>

<script>
    import vHeader from "../../../components/header.vue";
    import vSelectCustomer from "./selectCustomer.vue";

    export default{
        data(){
            return {
                customerBoxState: false,            //选择客户弹框的状态
                customer: {},                       //客户
            }
        },
        components: {
            vHeader,
            vSelectCustomer
        },
        computed: {
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
                line-height: 1rem;
                padding-left: 1.8rem;

                span {
                    position: absolute;
                    top: 0;
                    left: 0;
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