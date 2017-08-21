<template>
    <div class="goodsAdd">
        <div class="position"><b>位置：</b>报表 <span class="el-icon-arrow-right"></span> 新增产品</div>

        <el-form :model="product" ref="productAdd" :rules="rules" :label-width="'100px'" class="form">
            <el-form-item label="型号" prop="name">
                <el-input v-model="product.name"></el-input>
            </el-form-item>

            <el-form-item label="颜色" prop="color">
                <el-input v-model="product.color"></el-input>
            </el-form-item>

            <el-form-item label="库存" prop="num">
                <el-input v-model="product.num"></el-input>
            </el-form-item>

            <el-form-item label="类型" prop="category_id">
                <el-select v-model="product.category_id" placeholder="请选择">
                    <el-option v-for="item in category" :label="item.category" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import api from "../../common/js/api";
    import axios from "axios";

    export default{
        data(){
            let self = this;

            //验证库存
            let validateNum = function (rule, value, callback) {
                if (!/^\d+$/.test(value)) {
                    callback(new Error("请输入数字"));
                } else {
                    callback();
                }
            };

            return {
                category: [],           //产品类型

                product: {
                    id: self.$route.params.goods_id,
                    name: "",
                    color: "",
                    num: "0",
                    category_id: ""
                },

                rules: {
                    name: [{required: true, message: "请输入型号", trigger: "blur"}],
                    color: [{required: true, message: "请输入颜色", trigger: "blur"}],
                    num: [
                        {required: true, message: "请输入库存", trigger: "blur"},
                        {validator: validateNum, trigger: "blur"}
                    ],
                    category_id: [{required: true, message: "请选择类型"}]
                }
            }
        },

        methods: {
            //获取产品数据
            getDetail(){
                let self = this;

                axios.post(api.goodsDetail, {id: self.product.id}).then(res => {
                    if (res.data.code === 1) {
                        self.product = res.data.data;
                    } else {
                        self.$message({
                            message: "网络错误，获取产品数据失败，请重试！",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.$message({
                        message: "网络错误，获取产品数据失败，请重试！",
                        type: "error"
                    });
                })
            },

            //获取产品类型
            getCategory(){
                let self = this;

                axios.get(api.category).then(res => {
                    if (res.data.code === 1) {
                        self.category = res.data.data;
                    } else {
                        self.$message({
                            message: "网络错误，加载产品类型失败，请重试！",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.$message({
                        message: "网络错误，加载产品类型失败，请重试！",
                        type: "error"
                    });
                })
            },

            submit(){
                let self = this;

                //表单验证
                self.$refs.productAdd.validate(valid => {
                    if (!valid) {
                        return;
                    }

                    //显示全屏Loading
                    let loading = self.$loading({fullscreen: true});

                    //提交
                    axios.post(api.goodsAdd, self.product).then(res => {
                        loading.close();

                        if (res.data.code === 1) {
                            //保存成功弹出提示弹框
                            self.$message({
                                message: "保存成功！",
                                type: "success"
                            });

                            //返回列表页
                            self.$router.push("/");
                        } else {
                            self.$message({
                                message: "保存失败，请重试！",
                                type: "error"
                            });
                        }
                    }).catch(err => {
                        loading.close();

                        self.$message({
                            message: "保存失败，请重试！",
                            type: "error"
                        });
                    })
                });
            }
        },

        mounted(){
            this.getCategory();
            this.getDetail();
        }
    }
</script>

<style lang="less">
    .goodsAdd {
        .form {
            width: 500px;

            .el-select {
                display: block;
            }
        }
    }
</style>