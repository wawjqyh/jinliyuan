<template>
    <div>
        <el-breadcrumb separator="/" class="position">
            <el-breadcrumb-item>生产</el-breadcrumb-item>
            <el-breadcrumb-item>派工单</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="operate">
            <el-form :inline="true" class="form">
                <el-form-item label="型号">
                    <el-input icon="search" :value="goodsName" @click="goodsSelectVisible = true" readonly></el-input>
                </el-form-item>

                <el-form-item label="日期">
                    <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围"
                                    :editable="false"></el-date-picker>
                </el-form-item>
            </el-form>

            <div class="btnAera">
                <router-link to="/production/add">
                    <el-button type="primary" icon="plus" class="newBtn">新增派工单</el-button>
                </router-link>
            </div>
        </el-row>

        <v-select-goods :visible.sync="goodsSelectVisible" @selectGoods="onSelectGoods"></v-select-goods>
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
                condition: {                //筛选条件
                    goods_id: "",
                    startTime: "",
                    endTime: ""
                },
                goodsName: "",              //显示在输入框的商品名
                dateRange: [null, null]               //日期范围
            }
        },

        watch: {
            dateRange(val){
                console.log(val);
            }
        },

        components: {
            vSelectGoods
        },

        methods: {
            getList(){
                let self = this;

                axios.post(api.production).then(res => {
                    if (res.data.code === 1) {
                        self.production = res.data.data;
                    } else {
                        self.$message({
                            message: "获取派工单失败",
                            type: "error"
                        });
                    }
                }).catch(err => {
                    self.$message({
                        message: "获取派工单失败",
                        type: "error"
                    });
                });
            },

            onSelectGoods(val){
                this.goodsName = val.goodsName;
            }
        },

        mounted(){
            this.getList();
        }
    }
</script>

<style lang="less">

</style>