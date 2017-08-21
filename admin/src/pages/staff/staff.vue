<template>
    <div>
        <div class="position"><b>位置：</b>生产 <span class="el-icon-arrow-right"></span> 员工</div>

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
                <el-table-column prop="job_name" label="职位" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <router-link :to="'/staff/edit/' + scope.row.id">
                            <el-button size="small">修改</el-button>
                        </router-link>
                        <el-button type="danger" size="small" @click="deleteStaff(scope.row.id)">删除</el-button>
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
            //获取员工列表
            getData(){
                let self = this;

                axios.get(api.staffList).then(res => {
                    if (res.data.code === 1) {
                        self.staff = res.data.data;
                    } else {
                        self.$message({
                            message: "网络错误，加载员工失败，请重试！",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.$message({
                        message: "网络错误，加载员工失败，请重试！",
                        type: "error"
                    });
                });
            },

            //删除员工
            deleteStaff(id){
                let self = this;

                //弹出确提示框
                self.$confirm("是否删除该员工", "提示", {type: "warning"}).then(() => {

                    //显示全屏Loading
                    let loading = self.$loading({fullscreen: true});

                    axios.post(api.staffDelete, {id: id}).then(res => {
                        loading.close();        //关闭Loading

                        if (res.data.code === 1) {
                            self.getData();         //重新获取员工列表

                            self.$message({
                                message: "删除成功！",
                                type: "success"
                            });
                        } else {
                            self.$message({
                                message: "删除失败，请重试！",
                                type: "error"
                            });
                        }
                    }).catch(err => {
                        loading.close();        //关闭Loading

                        self.$message({
                            message: "删除失败，请重试！",
                            type: "error"
                        });
                    });
                }).catch(() => {
                    //取消
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