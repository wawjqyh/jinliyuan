<template>
    <div>
        <el-row class="operate">
            <div class="btnAera">
                <router-link to="/staff/add">
                    <el-button type="primary" icon="plus" class="newBtn">新增</el-button>
                </router-link>
            </div>
        </el-row>

        <el-row class="table">
            <el-table :data="staff" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <el-table-column prop="phone" label="电话" align="center"></el-table-column>
                <el-table-column prop="job" label="职位" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button size="small">编辑</el-button>
                        <el-button type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";

    export default{
        data(){
            return {
                staff: []
            }
        },

        methods: {
            getData(){
                let self = this;

                axios.get(api.staffList).then(res => {
                    if (res.data.code === 1) {
                        self.staff = res.data.data;
                    } else {
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    .staffList {
        .newBtn {
            float: right;
        }
    }
</style>