<template>
    <div class="orders">
        <el-breadcrumb separator="/" class="position">
            <el-breadcrumb-item>销售</el-breadcrumb-item>
            <el-breadcrumb-item>订单记录</el-breadcrumb-item>
        </el-breadcrumb>

        <!--筛选条件-->
        <el-row class="operate">
            <el-form :inline="true" class="form">
                <el-form-item label="选择日期">
                    <el-date-picker v-model="dateRange" type="daterange" align="left" placeholder="选择日期范围"
                                    :picker-options="pickerOptions" range-separator=" - " :editable=false>
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </el-row>

        <!--列表-->
        <el-table :data="orders" style="width:100%" v-loading="loading">
            <el-table-column prop="username" label="客户"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="order_date" label="下单日期" align="center"></el-table-column>
            <el-table-column prop="total_money" label="总价" align="center"></el-table-column>
            <el-table-column prop="delivery_address" label="送货地址"></el-table-column>
            <el-table-column label="状态" align="center">
                <template scope="scope">
                    <span v-if="scope.row.delivery_state == 0">未发货</span>
                    <span v-if="scope.row.delivery_state == 1">已发货</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                    <el-button size="small">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="condition.page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="condition.pageSize"
                layout="total, sizes, prev, pager, next"
                :total="totalNum">
            </el-pagination>
        </div>

        //商品详情
        <el-dialog title="选择产品" :visible.sync="goodsDetailVisible">
        </el-dialog>
    </div>
</template>

<script>
    import api from "../../common/js/api";
    import axios from "axios";

    export default{
        data(){
            return {
                dateRange: [null, null],                 //日期插件值
                pickerOptions: {                         //日期插件配置
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },                     //日期插件配置
                condition: {
                    page: 1,
                    pageSize: 10,
                    startTime: "",
                    endTime: ""
                },          //筛选条件
                orders: [],                               //订单列表
                totalNum: 0,                              //订单总数
                loading: false,                          //loading遮罩层的状态
                goodsDetailVisible: false,               //商品详情弹框的状态
            }
        },

        watch: {
            //监听选择日期，格式化筛选条件的日期
            dateRange(val){
                let self = this;

                if (val[0] === null) {
                    self.condition.startTime = "";
                    self.condition.endTime = "";
                } else {
                    self.condition.startTime = val[0].toLocaleDateString();
                    self.condition.endTime = val[1].toLocaleDateString();
                }
            }
        },

        methods: {
            //获取订单列表
            getList(){
                let self = this;

                self.loading = true;
                axios.post(api.order, self.condition).then(res => {
                    self.loading = false;

                    console.log(res.data.data);

                    if (res.data.code === 1) {
                        self.orders = res.data.data;
                        self.totalNum = res.data.totalNum;
                    } else {
                        self.$message({
                            message: "获取订单失败",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.loading = false;

                    self.$message({
                        message: "获取订单失败",
                        type: "error"
                    });
                });
            },

            //分页数量改变
            handleSizeChange(val){
                let self = this;
                self.condition.pageSize = val;
                self.getList();
            },

            //页码改变
            handleCurrentChange(){
                this.getList();
            }
        },

        mounted(){
            this.getList();
        }
    }
</script>

<style lang="less">

</style>