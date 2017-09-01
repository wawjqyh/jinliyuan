<template>
    <div class="stock">
        <el-breadcrumb separator="/" class="position">
            <el-breadcrumb-item>报表</el-breadcrumb-item>
            <el-breadcrumb-item>库存</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="operate">
            <el-form :inline="true" class="form">
                <el-form-item label="搜索">
                    <el-input v-model="search" placeholder="输入型号/类型/颜色"></el-input>
                </el-form-item>
            </el-form>

            <div class="btnAera">
                <router-link to="/goods/add">
                    <el-button type="primary" icon="plus" class="newBtn">新增产品</el-button>
                </router-link>
            </div>
        </el-row>

        <el-table :data="goodsShows" style="width:100%">
            <el-table-column prop="name" label="型号" align="center"></el-table-column>
            <el-table-column prop="category" label="类型" align="center"></el-table-column>
            <el-table-column prop="color" label="颜色" align="center"></el-table-column>
            <el-table-column prop="num" label="库存" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                    <router-link :to="'goods/edit/' + scope.row.id">
                        <el-button size="small">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="small" @click="deleteGoods(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import api from "../../common/js/api";
    import axios from "axios";

    export default{
        data(){
            return {
                goods: [],                          //产品列表
                search: "",                         //搜索字段
            }
        },

        computed: {
            //符合搜索条件的产品
            goodsShows(){
                let self = this;

                if (self.search === "") {
                    return self.goods;
                }

                return self.goods.filter(item => {
                    let reg = new RegExp(self.search, "g");
                    return reg.test(item.name) || reg.test(item.color) || reg.test(item.category);
                });
            }
        },

        methods: {
            //获取商品列表
            getGoods(){
                let self = this;

                axios.get(api.goodsList).then(res => {
                    if (res.data.code === 1) {
                        self.goods = res.data.data;
                    } else {
                        self.$message({
                            message: "网络错误，加载产品失败，请重试！",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.$message({
                        message: "网络错误，加载产品失败，请重试！",
                        type: "error"
                    });
                })
            },

            deleteGoods(id){
                let self = this;

                //弹出确提示框
                self.$confirm("是否删除该产品", "提示", {type: "warning"}).then(() => {

                    //显示全屏Loading
                    let loading = self.$loading({fullscreen: true});

                    axios.post(api.goodsDelete, {id: id}).then(res => {
                        loading.close();        //关闭Loading

                        if (res.data.code === 1) {
                            self.getGoods();         //重新获取产品列表

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
            this.getGoods();
        }
    }
</script>

<style lang="less">
</style>