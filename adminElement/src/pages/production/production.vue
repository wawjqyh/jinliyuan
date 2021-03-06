<template>
    <div class="production">
        <el-breadcrumb separator="/" class="position">
            <el-breadcrumb-item>生产</el-breadcrumb-item>
            <el-breadcrumb-item>派工单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="operate">
            <el-form :inline="true" class="operateForm">
                <el-form-item label="型号">
                    <el-input icon="search" :value="goodsName" @click="goodsSelectVisible = true" readonly></el-input>
                </el-form-item>

                <el-form-item label="日期">
                    <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围"
                                    :editable="false"></el-date-picker>
                </el-form-item>

                <el-button type="primary" @click="getList">搜索</el-button>
            </el-form>

            <div class="operateBtn">
                <router-link to="/production/add">
                    <el-button type="primary" icon="plus" class="newBtn">新增派工单</el-button>
                </router-link>
            </div>
        </el-row>

        <el-table :data="production" class="tables" v-loading="loading">
            <el-table-column label="产品" align="center" width="300">
                <template scope="scope">{{scope.row.name}}-{{scope.row.category}}-{{scope.row.color}}</template>
            </el-table-column>
            <el-table-column prop="date" label="日期" align="center"></el-table-column>
            <el-table-column prop="num" label="数量" align="center"></el-table-column>
            <el-table-column prop="cuter_name" label="开料" align="center"></el-table-column>
            <el-table-column prop="drill_name" label="排钻" align="center"></el-table-column>
            <el-table-column prop="sanding_name" label="锣机" align="center"></el-table-column>
            <el-table-column prop="paste_name" label="封边" align="center"></el-table-column>
            <el-table-column prop="pack_name" label="打包" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                    <router-link :to="'production/edit/' + scope.row.id">
                        <el-button size="small">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="small" @click="deleteProduction(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

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

        <v-select-goods :visible.sync="goodsSelectVisible" :goodsId.sync="condition.goods_id"
                        :goodsName.sync="goodsName"></v-select-goods>
    </div>
</template>

<script>
    import api from "../../common/js/api";
    import axios from "axios";
    import vSelectGoods from "../../components/selectGoods.vue";

    export default{
        data(){
            return {
                goodsSelectVisible: false,  //选择商品弹框的状态
                production: [],             //派工单
                totalNum: 0,             //派工单总数
                condition: {                //筛选条件
                    goods_id: "",
                    startTime: "",
                    endTime: "",
                    page: 1,
                    pageSize: 10
                },
                goodsName: "",              //显示在输入框的商品名
                dateRange: [null, null],   //日期范围
                loading: false
            }
        },

        watch: {
            //选择日期是格式化
            dateRange(val){
                let self = this;
                self.condition.startTime = val[0] === null ? "" : val[0].toLocaleDateString();
                self.condition.endTime = val[1] === null ? "" : val[1].toLocaleDateString();
            }
        },

        components: {
            vSelectGoods
        },

        methods: {
            //获取派工单列表
            getList(){
                let self = this;

                self.loading = true;
                axios.post(api.production, self.condition).then(res => {
                    self.loading = false;

                    if (res.data.code === 1) {
                        self.production = res.data.data;
                        self.totalNum = res.data.totalNum;
                    } else {
                        self.$message({
                            message: "获取派工单失败",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.loading = false;

                    self.$message({
                        message: "获取派工单失败",
                        type: "error"
                    });
                });
            },

            //删除派工单
            deleteProduction(id){
                console.log(id);
            },

            //分页数量改变
            handleSizeChange(val){
                let self = this;
                self.condition.pageSize = val;
                self.getList();
            },

            //页码改变
            handleCurrentChange(val){
                this.getList();
            },

            //删除
            deleteProduction(id){
                let self = this;

                //弹出确提示框
                self.$confirm("是否删除", "提示", {type: "warning"}).then(() => {

                    //显示全屏Loading
                    let loading = self.$loading({fullscreen: true});

                    axios.post(api.productionDelete, {id: id}).then(res => {
                        loading.close();        //关闭Loading

                        if (res.data.code === 1) {
                            self.getList();         //重新获取产品列表

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
            this.getList();
        }
    }
</script>

<style lang="less">

</style>