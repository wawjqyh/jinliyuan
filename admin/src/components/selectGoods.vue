<!--
@props visible {Boolean} sync 弹框的状态
@event selectGoods 返回
    {
        goodsId: self.goodsIdTemp,      //商品id
        goodsName: self.goodsName       //商品信息
    }
-->
<template>
    <el-dialog title="选择产品" :visible="visible" @update:visible="changeState" class="selectGoods">
        <el-form :inline="true">
            <el-form-item label="搜索">
                <el-input v-model="search" placeholder="输入型号/类型/颜色"></el-input>
            </el-form-item>
        </el-form>

        <el-table :data="goodsShows" height="400" style="width:100%">
            <el-table-column prop="name" label="型号" align="center"></el-table-column>
            <el-table-column prop="category" label="类型" align="center"></el-table-column>
            <el-table-column prop="color" label="颜色" align="center"></el-table-column>
            <el-table-column prop="num" label="库存" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template scope="scope">
                    <el-radio :value="goodsId" @input="onSelect" :label="scope.row.id"></el-radio>
                </template>
            </el-table-column>
        </el-table>

        <el-row>
            <div class="dialogBtn">
                <el-button type="primary" @click="changeState(false)">确定</el-button>
            </div>
        </el-row>
    </el-dialog>
</template>

<script>
    import api from "../common/js/api";
    import axios from "axios";

    export default{
        props: ["visible", "goodsId", "goodsName"],                         //弹框的状态

        data(){
            return {
                goods: [],                          //产品列表
                search: ""                          //搜索字段
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

        watch: {
            goodsId(id){
                this.$emit("update:goodsName", this.getGoodsName(id));
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

            //改变弹框状态，emit一个事件
            changeState(visible){
                this.$emit("update:visible", visible);
            },

            //选择某个产品
            onSelect(id){
                this.$emit("update:goodsId", id);
            },

            //根据id返回商品的信息
            getGoodsName(id){
                let self = this;

                let selected = self.goods.find(item => {
                    return item.id === id;
                });

                if (selected) {
                    return selected.name + " " + selected.category + " " + selected.color;
                } else {
                    return "";
                }
            }
        },

        mounted(){
            this.getGoods();
        }
    }
</script>

<style lang="less">
    .selectGoods {
        .el-radio__label {
            display: none;
        }

        .dialogBtn {
            margin-top: 20px;
            float: right;
        }
    }
</style>