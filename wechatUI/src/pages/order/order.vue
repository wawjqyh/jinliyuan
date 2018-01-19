<template>
    <div class="order">
        <div class="searchRow">
            <span>
                <span>日期：</span>
                <span v-show="startTime == '' && endTime == ''">全部</span>
                <span v-show="!(startTime == '' && endTime == '')">{{startTime}} - {{endTime}}</span>
            </span>
            <span class="screenBtn" @click="filterBoxState = true"><i class="fa fa-filter"></i> 筛选</span>
        </div>

        <div class="filter" v-show="filterBoxState">
            <div class="selectAll" :class="{active: startTime == '' && endTime == ''}">
                <input @click="onSelectAll" type="text" value="全部" placeholder="" readonly>
            </div>
            <div class="selectTime" :class="{active: !(startTime == '' && endTime == '')}">
                <input @click="openPicker('pickerStart')" v-model="startTime" class="startTime" type="text"
                       placeholder="开始日期" readonly>
                <span>-</span>
                <input @click="openPicker('pickerEnd')" v-model="endTime" class="endTime" type="text" placeholder="结束日期"
                       readonly>
            </div>

            <a href="javascript:void(0)" class="closeFilter" @click="onSelectDate">确定</a>
        </div>

        <div class="listCon">
            <ul class="list" v-infinite-scroll="loadData" infinite-scroll-disabled="loading">
                <li v-for="order in orderList">
                    <router-link :to="'/order/detail/' + order.order_id">
                        <div class="orderTime">
                            <span>下单时间：{{order.order_date}}</span>
                            <span v-if="order.delivery_state == 0" class="deliveryState">未发货</span>
                        </div>
                        <div class="customerMes">
                            <span class="name">{{order.username}}</span>
                            <span class="phone">{{order.phone}}</span>
                        </div>
                        <div>
                            <span class="deliveryAddress">送货地址：{{order.delivery_address}}</span>
                            <span class="money">合计：￥{{order.total_money}}</span>
                        </div>
                    </router-link>
                </li>
            </ul>

            <mt-spinner v-show="loading && canLoad" type="triple-bounce" color="#60a2ff"></mt-spinner>
        </div>

        <mt-datetime-picker
            ref="pickerStart"
            v-model="pickerStartTime"
            type="date"
            @confirm="onSelectStart">
        </mt-datetime-picker>

        <mt-datetime-picker
            ref="pickerEnd"
            v-model="pickerEndTime"
            type="date"
            @confirm="onSelectEnd">
        </mt-datetime-picker>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        data(){
            return {
                loading: false,                     //是否正在加载中
                canLoad: true,                      //是否可以加载

                orderList: [],                      //订单列表
                startTime: "",
                endTime: "",
                pageIndex: 1,
                pageSize: 10,

                filterBoxState: false,              //选择日期弹框状态
                pickerStartTime: new Date(),
                pickerEndTime: new Date()
            }
        },

        methods: {
            async loadData(){
                let self = this;

                self.loading = true;

                let postData = {
                    page: self.pageIndex,
                    pageSize: self.pageSize,
                    startTime: self.startTime,
                    endTime: self.endTime
                };

                let res = await self.$axios.post(self.$api.orderList, postData);

                self.$indicator.close();

                if (res.state) {
                    if (res.data.length === self.pageSize) {
                        self.loading = false;
                        self.canLoad = false;
                    }

                    self.orderList = self.orderList.concat(res.data);
                    self.pageIndex++;
                } else {
                    self.$toast("获取订单失败");
                }
            },

            openPicker(picker){
                this.$refs[picker].open();
            },

            onSelectAll(){
                this.startTime = "";
                this.endTime = "";
            },

            onSelectStart(val){
                this.startTime = moment(val).format("YYYY/MM/DD");
            },

            onSelectEnd(val){
                this.endTime = moment(val).format("YYYY/MM/DD");
            },

            onSelectDate(){
                this.filterBoxState = false;
                this.pageIndex = 1;
                this.orderList = [];
                this.loadData();
            }
        },

        mounted(){
            this.loadData();
        }
    }
</script>

<style lang="less">
    @import "./less/order";
</style>