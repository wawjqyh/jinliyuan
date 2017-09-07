<template>
    <div class="customer">
        <el-breadcrumb separator="/" class="position">
            <el-breadcrumb-item>报表</el-breadcrumb-item>
            <el-breadcrumb-item>库存</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="operate">
            <el-form :inline="true" class="form">
                <el-form-item label="搜索">
                    <el-input v-model="searchData" placeholder="输入姓名/手机号/地址"></el-input>
                </el-form-item>
            </el-form>
        </el-row>

        <el-table :data="customerShows" style="width:100%">
            <el-table-column prop="username" label="姓名" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column label="地址" align="center">
                <template scope="scope">{{scope.row.province}}-{{scope.row.city}}-{{scope.row.district}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                    <el-button size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="客户详情" :visible="customerDialogState">
            <el-row>
                <el-col :span="12">客户姓名：{{customerDetail.username}}</el-col>
                <el-col :span="12">手机号：{{customerDetail.username}}</el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";

    export default{
        data(){
            return {
                searchData: "",
                customer: [],
                customerDetail: {},
                customerOrders: [],
                customerDialogState: false,
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
        },

        mounted(){
            this.loadData();
        }
    }
</script>