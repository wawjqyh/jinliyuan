<template>
    <div>
        <div class="orderAdd">
            <v-header>新增订单</v-header>

            <div class="baseMes">
                <div class="formRow">
                    <span class="itemName">客户 <b>*</b></span>
                    <input type="text" placeholder="请选择客户" readonly
                           :value="formData.customer | customerFilter"
                           @click="CSVisible = true">
                    <p class="error" v-if="error.customer">{{error.customer[0].message}}</p>
                </div>

                <div class="formRow">
                    <span class="itemName">送货时间 <b>*</b></span>
                    <input type="text" placeholder="请选择送货时间" readonly :value="formData.deliveryDate | dateFilter"
                           @click="$refs.datePicker.open()">
                    <p class="error" v-if="error.deliveryDate">{{error.deliveryDate[0].message}}</p>
                </div>

                <div class="formRow">
                    <span class="itemName">送货地址 <b>*</b><br>（物流）</span>
                    <textarea placeholder="请输入送货地址或物流" v-model="formData.address"></textarea>
                    <p class="error" v-if="error.address">{{error.address[0].message}}</p>
                </div>

                <div class="formRow">
                    <span class="itemName">备注</span>
                    <input type="text" placeholder="请输入备注（选填）" v-model="formData.remark">
                </div>
            </div>

            <div class="goodsList">
                <div class="goodsListTitle">
                    <span>商品</span>
                    <a href="javascript:void(0)" class="addGoodsBtn" @click="GSVisible = true">选择商品</a>
                </div>

                <div class="goodsItem" v-for="(item, index) in formData.goods" v-show="item.sNum > 0">
                    <span class="goodsName">{{item.name}}</span>
                    <span class="goodsType">{{item.category}}</span>
                    <span class="goodsColor">{{item.color}}</span>
                    <input :class="{error: error['goods.' + index + '.price'] != undefined}" class="price"
                           v-model="item.price"
                           placeholder="请输入单价">
                    <v-num :value="item.sNum" @input="filterGoods($event, index, item)"></v-num>
                </div>
            </div>

            <div class="settlement">
                <span class="fa fa-shopping-cart"></span>
                <span class="totalNum" v-show="totalNum > 0">{{totalNum}}</span>
                <span class="totalMoney">总计：￥{{totalMoney}}</span>
                <a href="javascript:void(0)" class="submit" @click="submit">提交</a>
            </div>
        </div>

        <!--日期控件-->
        <mt-datetime-picker
            ref="datePicker"
            v-model="formData.deliveryDate"
            type="date">
        </mt-datetime-picker>

        <!--选择客户控件-->
        <v-customer-selector :visible.sync="CSVisible" v-model="formData.customer"></v-customer-selector>
        <v-goods-selector :visible.sync="GSVisible" v-model="formData.goods"></v-goods-selector>
    </div>
</template>

<script>
    import moment from "moment";
    import vCustomerSelector from "./customerSelector.vue";
    import vGoodsSelector from "./goodsSelector.vue";
    import vNum from "../../components/num.vue";

    import AsyncValidator from "async-validator";

    let rules = {
        customer: [{required: true, message: "请选择客户"}],
        deliveryDate: [{required: true, message: "请选择送货时间"}],
        address: [{required: true, message: "请输入送货地址"}],
        goods: {
            type: "array",
            require: true,
            message: "请选择商品",
            defaultField: {
                type: "object",
                fields: {
                    price: [{required: true, message: "请输入价格"}]
                }
            }
        }
    };
    let validator = new AsyncValidator(rules);

    export default{
        data(){
            return {
                formData: {                 //表单数据
                    customer: "",
                    deliveryDate: new Date(),
                    address: "",
                    remark: "",
                    goods: []
                },

                CSVisible: false,           //选择客户控件状态
                GSVisible: false,           //选择商品控件状态

                error: {}
            }
        },

        computed: {
            //商品总数
            totalNum(){
                let totalNum = 0;

                this.formData.goods.forEach(item => {
                    totalNum = totalNum + item.sNum;
                });

                return totalNum;
            },

            //总价
            totalMoney(){
                let totalMoney = 0;

                this.formData.goods.forEach(item => {
                    totalMoney = totalMoney + (item.sNum * item.price);
                });

                return totalMoney;
            }
        },

        components: {
            vCustomerSelector,
            vGoodsSelector,
            vNum
        },

        methods: {
            //改变数量时校验数量，如果为0则删除该项
            filterGoods(num, index, item){
                item.sNum = num;
                if (num === 0) {
                    this.formData.goods.splice(index, 1);
                }
            },

            async submit(){
                let self = this;

                //表单验证
                let fields = await new Promise((resolve, reject) => {
                    validator.validate(self.formData, function (error, fields) {
                        resolve(fields);
                    });
                });
                //fields不为空则有校验失败的数据
                if (fields !== null) {
                    self.error = fields;
                    return;
                }

                let orderId = new Date().getTime();
                let order = {
                    order_id: orderId,
                    customer_id: self.formData.customer.id,
                    delivery_address: self.formData.address,
                    remarks: self.formData.remark,
                    deliver_date: moment(self.formData.deliveryDate).format("YYYY-MM-DD"),
                    order_date: moment().format("YYYY-MM-DD"),
                    total_money: self.totalMoney
                };

                let goods = self.formData.goods.map(item => {
                    return {
                        order_id: orderId,
                        goods_id: item.id,
                        num: item.sNum,
                        price: item.price
                    }
                });

                let data = {
                    order: order,
                    goods: goods
                };

                self.$indicator.open();
                let res = await self.$axios.post(self.$api.orderInsert, data);
                self.$indicator.close();

                if (res.state) {
                    self.$toast("下单成功");
                    self.$router.push("/order");
                } else {
                    self.$toast("操作失败");
                }
            }
        },

        filters: {
            //格式化客户信息
            customerFilter(val){
                if (val.username) {
                    return val.username + "-" + val.phone;
                } else {
                    return "";
                }
            },

            //格式化日期
            dateFilter(val){
                return moment(val).format("YYYY-MM-DD");
            }
        },

        mounted(){
            this.$nextTick(() => {
                this.$indicator.close();
            })
        }
    }
</script>

<style lang="less">
    @import "./less/orderAdd";
</style>