<template>
    <div class="customer">
        <el-breadcrumb separator="/" class="position">
            <el-breadcrumb-item>销售</el-breadcrumb-item>
            <el-breadcrumb-item>客户</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="operate">
            <el-form :inline="true" class="operateForm">
                <el-form-item label="搜索">
                    <el-input v-model="searchData" placeholder="输入姓名/手机号/地址"></el-input>
                </el-form-item>
            </el-form>
        </el-row>

        <el-table :data="customerShows" class="tables">
            <el-table-column prop="username" label="姓名" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column label="地址" align="center">
                <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.district}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                    <el-button size="small" @click="loadCustomerDetail(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="客户详情" :visible.sync="customerDialogState">
            <div class="customerDetail">
                <el-row>
                    <el-col :span="12">客户姓名：{{customerDetail.username}}</el-col>
                    <el-col :span="12">手机号：{{customerDetail.phone}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        客户地址：{{customerDetail.province}} - {{customerDetail.city}} - {{customerDetail.district}}
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">最近下单：{{lastDate}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">交易总数：{{customerOrders.length}}</el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">总交易额：￥{{totalMoney}}</el-col>
                </el-row>
            </div>

            <div class="customerOrderList">
                <h3>订单商品</h3>

                <el-table :data="customerOrders" style="width:100%">
                    <el-table-column prop="order_date" label="下单时间"></el-table-column>
                    <el-table-column prop="delivery_address" label="送货地址"></el-table-column>
                    <el-table-column label="状态">
                        <template scope="scope">
                            <span v-if="scope.row.delivery_state == 0">未发货</span>
                            <span v-if="scope.row.delivery_state == 1">已发货</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total_money" label="合计"></el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";

    export default{
        data(){
            return {
                searchData: "",                 //筛选条件
                customer: [],                   //客户列表
                customerDetail: {},             //客户详情
                customerOrders: [],             //客户历史订单
                customerDialogState: false,     //客户详情弹框的状态
            }
        },

        computed: {
            //根据筛选条件筛选客户
            customerShows(){
                let self = this;

                if (self.searchData === "") {
                    return self.customer;
                }

                return self.customer.filter(item => {
                    let reg = new RegExp(self.searchData, "g");
                    return reg.test(item.username) || reg.test(item.phone) || reg.test(item.province) || reg.test(item.city) || reg.test(item.district);
                });
            },

            //最近一次交易日期
            lastDate(){
                let self = this;

                if (self.customerOrders.length > 0) {
                    return self.customerOrders[0].order_date;
                } else {
                    return ""
                }
            },

            //总交易额
            totalMoney(){
                let totalMoney = 0;

                this.customerOrders.forEach(item => {
                    totalMoney += item.total_money;
                });

                return totalMoney;
            }
        },

        methods: {
            //加载客户列表
            loadData(){
                let self = this;

                axios.get(api.customerList).then(res => {
                    if (res.data.code === 1) {
                        self.customer = res.data.data;
                        console.log(self.customer);
                    } else {
                        self.$message({
                            message: "网络错误，加载客户失败，请重试！",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.$message({
                        message: "网络错误，加载客户失败，请重试！",
                        type: "error"
                    });
                });
            },

            //获取客户详情
            loadCustomerDetail(id){
                let self = this;

                self.customerDialogState = true;

                axios.post(api.customerDetail, {id: id})
                    .then(res => {
                        if (res.data.code === 1) {
                            self.customerDetail = res.data.data.customer[0];
                            self.customerOrders = res.data.data.orders;
                        } else {
                            self.$message({
                                message: "网络错误，获取客户详情失败，请重试！",
                                type: "error"
                            });
                        }
                    })
                    .catch(err => {
                        self.$message({
                            message: "网络错误，获取客户详情失败，请重试！",
                            type: "error"
                        });
                    })
            }
        },

        mounted(){
            this.loadData();
        }
    }
</script>

<style lang="less">
    .customer {
        .customerDetail {
            line-height: 20px;
        }
    }
</style>