<template>
    <div>
        <!--订单页面-->
        <div class="orderAdd">
            <v-header title="新增订单"></v-header>

            <div class="baseMes">
                <div class="formRow">
                    <span class="itemName">客户 <b>*</b></span>
                    <input type="text" placeholder="请选择客户" readonly @click="customerBoxState = true"
                           :value="customerVal">
                </div>

                <div class="formRow">
                    <span class="itemName">送货时间 <b>*</b></span>
                    <v-date-picker v-model="date" :option="option"></v-date-picker>
                </div>

                <div class="formRow">
                    <span class="itemName">送货地址 <b>*</b><br>（物流）</span>
                    <textarea placeholder="请输入送货地址或物流" v-model="deliveryAddress"></textarea>
                </div>

                <div class="formRow">
                    <span class="itemName">备注</span>
                    <input type="text" placeholder="请输入备注（选填）" v-model="remarks">
                </div>
            </div>

            <div class="goodsList">
                <div class="goodsListTitle">
                    <span>商品</span>
                    <a href="javascript:void(0)" class="addGoodsBtn" @click="goodsBoxState = true">选择商品</a>
                </div>

                <div class="goodsItem" v-for="item in goods" v-if="item.sNum > 0">
                    <span class="goodsName">{{item.name}}</span>
                    <span class="goodsType">{{item.category}}</span>
                    <span class="goodsColor">{{item.color}}</span>
                    <input class="price" v-model="item.price" placeholder="请输入单价">
                    <v-num v-model="item.sNum"></v-num>
                </div>
            </div>

            <div class="settlement">
                <span class="fa fa-shopping-cart"></span>
                <span class="totalNum" v-show="totalNum > 0">{{totalNum}}</span>
                <span class="totalMoney">总计：￥{{totalMoney}}</span>
                <a href="javascript:void(0)" class="submit" @click="submit">提交</a>
            </div>
        </div>

        <!--选择客户弹框-->
        <div class="selectCustomer" v-show="customerBoxState">
            <div class="searchRow">
                <input type="text" placeholder="搜索" v-model="customerSearch">
                <span class="fa fa-search"></span>
            </div>

            <ul class="customerList">
                <li v-for="item in customerList" v-show="checkCustomer(item)">
                    <div class="nameRow">
                        <span class="customerName">{{item.username}}</span>
                        <span class="phone">{{item.phone}}</span>
                    </div>
                    <div class="address">
                        {{item.province}}-{{item.city}}-{{item.district}}
                    </div>

                    <label>
                        <input type="radio" class="radio" name="customer" v-model="selectId" :value="item.id">
                    </label>
                </li>
            </ul>

            <ul class="toolBtn">
                <router-link to="/customerAdd" tag="li">新增<br>客户</router-link>
            </ul>

            <a href="javascript:void(0)" class="confirmBtn" @click="customerBoxState = false">确定</a>
        </div>

        <!--选中商品弹框-->
        <div class="selectGoods" v-show="goodsBoxState">
            <!--搜索栏-->
            <div class="searchRow">
                <input type="text" placeholder="搜索" v-model="goodsSearch">
                <span class="fa fa-search"></span>
            </div>

            <!--商品列表-->
            <ul class="goodsList">
                <li v-for="item in goods" v-show="checkGoods(item)">
                    <span class="goodsName">{{item.name}}</span>
                    <span class="goodsType">{{item.category}}</span>
                    <span class="goodsColor">{{item.color}}</span>
                    <span class="goodsNum">库存:{{item.num}}</span>
                    <v-num v-model="item.sNum"></v-num>
                </li>
            </ul>

            <!--购物车-->
            <div class="goodsSelectedCon" v-show="cartBoxState">
                <div class="goodsSelected">
                    <div class="selectedHeader">已选商品</div>

                    <ul class="selectedList">
                        <li v-for="item in goods" v-if="item.sNum > 0">
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
                <div class="totalArea" @click="cartBoxState = !cartBoxState">
                    <div class="cartIcon" :class="{iconLight: totalNum > 0}">
                        <span class="fa fa-shopping-cart"></span>
                        <span class="goodsNum" v-show="totalNum > 0">{{totalNum}}</span>
                    </div>
                </div>
                <a href="javascript:void(0)" class="confirmBtn" @click="goodsBoxState = !goodsBoxState">确定</a>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations, mapActions} from "vuex";
    import axios from "axios";
    import api from "../../common/js/api";

    import vHeader from "../../components/header.vue";
    import vDatePicker from "../../components/vue-datepicker.vue";
    import vNum from "../../components/num.vue";

    export default{
        data(){
            return {
                customerBoxState: false,            //选择客户弹框的状态
                customerSearch: "",                 //搜索客户输入框
                selectId: "",                       //选中的客户的id
                deliveryAddress: "",                //送货地址
                remarks: "",                        //备注

                goodsBoxState: false,               //选择商品弹框的状态
                cartBoxState: false,                //购物车弹框的状态
                goodsSearch: "",                    //搜索商品输入框
                goods: [],                          //商品列表

                date: "",
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

        computed: {
            //客户列表
            ...mapState({
                customerList: state => state.customer
            }),

            //通过id获取被选中的客户
            customer(){
                let self = this;

                return self.customerList.find(item => {
                    return item.id === self.selectId;
                });
            },

            //展示在Input框中的用户信息
            customerVal(){
                let self = this;

                if (self.customer) {
                    return self.customer.username + " - " + self.customer.phone;
                } else {
                    return "";
                }
            },

            //购物车商品，筛选数量大于0的商品
            cart(){
                return this.goods.filter(item => {
                    return item.sNum > 0;
                });
            },

            //商品总数
            totalNum(){
                let totalNum = 0;

                this.cart.forEach(item => {
                    totalNum = totalNum + item.sNum;
                });

                return totalNum;
            },

            //总价
            totalMoney(){
                let totalMoney = 0;

                this.cart.forEach(item => {
                    totalMoney = totalMoney + (item.sNum * item.price);
                });

                return totalMoney;
            }
        },

        components: {
            vHeader,
            vDatePicker,
            vNum
        },

        methods: {
            ...mapMutations(["showLoading", "hideLoading"]),
            ...mapActions(["getCustomer"]),

            //ajax获取商品列表
            getGoods(){
                let self = this;

                axios.get(api.goodsList)
                    .then(res => {
                        if (res.data.code === 1) {
                            res.data.data.forEach(item => {
                                item.sNum = 0;
                                item.price = "";
                            });

                            self.goods = res.data.data;
                        } else {
                            console.log(res);
                        }
                    })
                    .catch(err => {
                        console.log("获取商品列表失败");
                        console.log(err);
                    })
            },

            //根据搜索的字段判断该客户是否显示
            checkCustomer(item){
                let self = this;
                let reg = new RegExp(self.customerSearch, "g");

                return reg.test(item.username) || reg.test(item.phone) || reg.test(item.province) || reg.test(item.city) || reg.test(item.district);
            },

            //根据搜索的字段判断该商品是否显示
            checkGoods(item){
                let self = this;
                let reg = new RegExp(self.goodsSearch, "g");

                return reg.test(item.name) || reg.test(item.color) || reg.test(item.category);
            },

            //验证表单
            validate(){
                let self = this;

                if (self.selectId === "") {
                    alert("请选择客户");
                    return false;
                }

                if (self.date === "") {
                    alert("请选择送货日期");
                    return false;
                }

                if (self.deliveryAddress === "") {
                    alert("请输入送货地址");
                    return false;
                }

                if (self.cart.length === 0) {
                    alert("请选择商品");
                    return false;
                }

                for (let i = 0; i < self.cart.length; i++) {
                    if (self.cart[i].price === "") {
                        alert("请输入单价");
                        return false;
                    }
                }

                return true;
            },

            //提交
            submit(){
                let self = this;

                if (!self.validate()) {
                    return;
                }

                let now = new Date();
                let order_id = now.getTime();

                let order = {
                    order_id: order_id,
                    customer_id: self.selectId,
                    delivery_address: self.deliveryAddress,
                    remarks: self.remarks,
                    deliver_date: self.date,
                    order_date: now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
                    total_money: self.totalMoney
                };

                let goods = self.cart.map(item => {
                    return {
                        order_id: order_id,
                        goods_id: item.id,
                        num: item.sNum,
                        price: item.price
                    }
                });

                let data = {
                    order: order,
                    goods: goods
                };

                self.showLoading();

                axios
                    .post(api.orderInsert, data)
                    .then(res => {
                        self.hideLoading();

                        if (res.data.code === 1) {
                            alert("下单成功");
                            self.$router.push("/order");
                        } else {
                            alert("操作失败");
                        }
                    })
                    .catch(err => {
                        self.hideLoading();
                        alert("操作失败");
                    });
            }
        },

        mounted(){
            this.getGoods();        //ajax获取商品列表
            this.getCustomer({});   //更新store中的客户
        }
    }
</script>

<style lang="less">
    @import "../../common/less/common";

    .orderAdd {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding: 0.8rem 0 0.9rem 0;
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
                    top: 0.3rem;
                    left: 0;
                    line-height: 0.4rem;
                }

                b {
                    color: #f00;
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

                textarea {
                    height: 1.4rem;
                    box-sizing: border-box;
                    font-size: 0.3rem;
                    padding: 0.3rem 0;
                    background: none;
                    width: 100%;
                    display: block;
                    color: #999;
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
            padding: 0 0.2rem;
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

        .goodsItem {
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

            .goodsType, .goodsColor {
                color: #999;
                font-size: 0.24rem;
            }

            .price {
                width: 1.5rem;
                padding: 0 0.1rem;
                font-size: 0.24rem;
                height: 0.4rem;
                box-sizing: border-box;
                position: absolute;
                border: 1px solid #ddd;
                border-radius: 0.1rem;
                top: 0.3rem;
                right: 2rem;
                outline: none;
            }

            .numBtn {
                position: absolute;
                top: 0.3rem;
                right: 0;
            }
        }

        .goodsItem:last-child {
            border: none;
        }

        .settlement {
            position: fixed;
            width: 100%;
            height: 0.9rem;
            bottom: 0;
            left: 0;
            background-color: #fff;
            border-top: 1px solid #ddd;
            overflow: hidden;

            .fa-shopping-cart {
                position: absolute;
                height: 0.9rem;
                line-height: 0.9rem;
                color: @mainColor;
                font-size: 0.6rem;
                left: 0.3rem;
            }

            .totalNum {
                font-size: 0.24rem;
                padding: 0 0.1rem;
                background-color: #f00;
                border-radius: 0.2rem;
                height: 0.34rem;
                line-height: 0.34rem;
                top: 0.1rem;
                left: 0.65rem;
                position: absolute;
                color: #fff;
            }

            .totalMoney {
                position: absolute;
                line-height: 0.9rem;
                font-size: 0.3rem;
                color: #f00;
                left: 1.6rem;
            }

            .submit {
                position: absolute;
                width: 2rem;
                height: 0.9rem;
                background-color: @mainColor;
                color: #fff;
                top: 0;
                right: 0;
                text-align: center;
                line-height: 0.9rem;
            }
        }
    }

    .selectCustomer {
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

        .customerList {
            padding: 0 0.2rem;

            li {
                border-bottom: 1px solid #eee;
                padding: 0.2rem 1rem 0.1rem 0;
                position: relative;
            }

            .nameRow {
                line-height: 0.4rem;
                font-size: 0.3rem;

                .phone {
                    float: right;
                    font-size: 0.24rem;
                }
            }

            .address {
                color: #999;
                font-size: 0.24rem;
                line-height: 0.5rem;
            }

            label {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

            .radio {
                position: absolute;
                width: 0.3rem;
                height: 0.3rem;
                -webkit-appearance: none;
                border: 2px solid @mainColor;
                border-radius: 50%;
                top: 0.4rem;
                right: 0;
                outline: none;
            }

            .radio:checked {
                background-color: @mainColor;
            }
        }

        .confirmBtn {
            position: absolute;
            width: 100%;
            height: 0.8rem;
            left: 0;
            bottom: 0;
            background-color: @mainColor;
            line-height: 0.8rem;
            color: #fff;
            text-align: center;
        }

        .toolBtn {
            position: absolute;
            bottom: 1rem;
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