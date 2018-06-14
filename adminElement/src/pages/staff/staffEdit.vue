<template>
    <div>
        <el-breadcrumb separator="/" class="position">
            <el-breadcrumb-item>生产</el-breadcrumb-item>
            <el-breadcrumb-item>员工</el-breadcrumb-item>
            <el-breadcrumb-item>修改</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :model="staff" ref="staffAdd" :rules="rules" label-width="100px" class="formBlock">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="staff.name"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="phone">
                <el-input v-model="staff.phone"></el-input>
            </el-form-item>

            <el-form-item label="职位" prop="job_id">
                <el-select v-model="staff.job_id" placeholder="请选择">
                    <el-option v-for="item in job" :label="item.job_name" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <div class="formBtn">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import api from "../../common/js/api";
    import axios from "axios";

    export default{
        data(){
            let self = this;

            //验证手机号
            let validatePhone = function (rule, value, callback) {
                if (!/^\d{11}$/.test(value)) {
                    callback(new Error("请输入正确的手机号"))
                } else {
                    callback();
                }
            };

            return {
                job: [],                //职位列表
                staff: {                 //表单字段
                    id: self.$route.params.staff_id,
                    name: "",
                    phone: "",
                    job_id: ""
                },
                rules: {                //表单验证规则
                    name: [{required: true, message: "请输入姓名"}],
                    phone: [
                        {required: true, message: "请输入手机号", trigger: "blur"},
                        {validator: validatePhone, trigger: "blur"}
                    ],
                    job_id: [{required: true, message: "请选择职位"}]
                }
            }
        },

        methods: {
            //获取职位列表
            getJobList(){
                let self = this;
                axios.get(api.jobList).then(res => {
                    if (res.data.code === 1) {
                        self.job = res.data.data;
                    } else {
                        self.$message({
                            message: "网络错误，加载职位失败，请重试！",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.$message({
                        message: "网络错误，加载职位失败，请重试！",
                        type: "error"
                    });
                })
            },

            //获取员工详情
            getStaffList(){
                let self = this;
                axios.post(api.staffDetail, {id: self.staff.id}).then(res => {
                    if (res.data.code === 1) {
                        self.staff = res.data.data;
                    } else {
                        self.$message({
                            message: "网络错误，获取员工详情失败，请重试！",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.$message({
                        message: "网络错误，获取员工详情失败，请重试！",
                        type: "error"
                    });
                })
            },

            submit(){
                let self = this;

                //表单验证
                self.$refs.staffAdd.validate(valid => {
                    if (!valid) {
                        return;
                    }

                    //显示全屏Loading
                    let loading = self.$loading({fullscreen: true});

                    axios.post(api.staffUpdate, self.staff).then(res => {
                        loading.close();

                        if (res.data.code === 1) {
                            //保存成功弹出提示弹框
                            self.$message({
                                message: "修改成功！",
                                type: "success"
                            });

                            //返回列表页
                            self.$router.push("/staff");
                        } else {
                            self.$message({
                                message: "修改成功，请重试！",
                                type: "error"
                            });
                        }
                    }).catch(err => {
                        loading.close();

                        self.$message({
                            message: "保存失败，请重试！",
                            type: "error"
                        });
                    });
                });
            }
        },

        mounted(){
            this.getJobList();
            this.getStaffList();
        }
    }
</script>

<style lang="less">
    .staffAdd {
        .form {
            width: 500px;

            .el-select {
                display: block;
            }
        }
    }
</style>