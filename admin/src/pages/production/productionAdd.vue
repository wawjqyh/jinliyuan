<template>
    <div class="productionAdd">
        <div class="position"><b>位置：</b>生产 <span class="el-icon-arrow-right"></span> 派工单 <span
            class="el-icon-arrow-right"></span> 新增
        </div>

        <el-form :model="production" :rules="rules" :inline="true" ref="productionAdd" label-width="100px" class="form">
            <div class="fromRow">
                <el-form-item label="产品" prop="goods_id">
                    <el-input :value="goodsName" icon="search" @click="goodsDialogVisible = true" readonly></el-input>
                </el-form-item>

                <el-form-item label="数量" prop="num">
                    <el-input v-model.number="production.num"></el-input>
                </el-form-item>

                <el-form-item label="日期" prop="date">
                    <el-date-picker v-model="production.date" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </div>

            <div class="formRow">
                <el-form-item label="开料" prop="cuter_id">
                    <el-select v-model="production.cuter_id" placeholder="请选择">
                        <el-option v-for="item in staff.cuter" :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="单价" prop="cut_price">
                    <el-input v-model.number="production.cut_price"></el-input>
                </el-form-item>
            </div>

            <div class="fromRow">
                <el-form-item label="排钻" prop="drill_id">
                    <el-select v-model="production.drill_id" placeholder="请选择">
                        <el-option v-for="item in staff.drill" :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="单价" prop="drill_price">
                    <el-input v-model.number="production.drill_price"></el-input>
                </el-form-item>
            </div>

            <div class="fromRow">
                <el-form-item label="锣机" prop="sanding_id">
                    <el-select v-model="production.sanding_id" placeholder="请选择">
                        <el-option v-for="item in staff.sanding" :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="单价" prop="sanding_price">
                    <el-input v-model.number="production.sanding_price"></el-input>
                </el-form-item>
            </div>

            <div class="fromRow">
                <el-form-item label="封边" prop="paste_id">
                    <el-select v-model="production.paste_id" placeholder="请选择">
                        <el-option v-for="item in staff.paste" :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="单价" prop="paste_price">
                    <el-input v-model.number="production.paste_price"></el-input>
                </el-form-item>
            </div>

            <div class="fromRow">
                <el-form-item label="打包" prop="pack_id">
                    <el-select v-model="production.pack_id" placeholder="请选择">
                        <el-option v-for="item in staff.pack" :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="单价" prop="pack_price">
                    <el-input v-model.number="production.pack_price"></el-input>
                </el-form-item>
            </div>

            <div class="formBtn">
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="$router.go(-1)">返回</el-button>
            </div>
        </el-form>

        <!--选择产品弹框-->
        <el-dialog title="选择产品" :visible.sync="goodsDialogVisible">
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
                        <el-radio v-model="production.goods_id" :label="scope.row.id"></el-radio>
                    </template>
                </el-table-column>
            </el-table>

            <el-row>
                <div class="dialogBtn">
                    <el-button @click="goodsDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="goodsDialogVisible = false">确定</el-button>
                </div>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import api from "../../common/js/api";
    import axios from "axios";

    export default{
        data(){
            return {
                production: {
                    goods_id: "",
                    num: "",
                    date: "",
                    cuter_id: "",
                    cut_price: "",
                    drill_id: "",
                    drill_price: "",
                    sanding_id: "",
                    sanding_price: "",
                    paste_id: "",
                    paste_price: "",
                    pack_id: "",
                    pack_price: ""
                },

                rules: {
                    goods_id: [{required: true, message: "请选择产品"}],
                    num: [
                        {required: true, message: "请输入生产数量"},
                        {type: "integer", message: "数量不合法"}
                    ],
                    date: [{required: true, message: "请选择生产日期"}],
                    cuter_id: [{required: true, message: "请选择开料员工"}],
                    cut_price: [
                        {required: true, message: "请输入价格"},
                        {type: "number", message: "请输入正确的价格"}
                    ],
                    drill_id: [{required: true, message: "请选择排钻员工"}],
                    drill_price: [
                        {required: true, message: "请输入价格"},
                        {type: "number", message: "请输入正确的价格"}
                    ],
                    sanding_id: [{required: true, message: "请选择锣机员工"}],
                    sanding_price: [
                        {required: true, message: "请输入价格"},
                        {type: "number", message: "请输入正确的价格"}
                    ],
                    paste_id: [{required: true, message: "请选择封边员工"}],
                    paste_price: [
                        {required: true, message: "请输入价格"},
                        {type: "number", message: "请输入正确的价格"}
                    ],
                    pack_id: [{required: true, message: "请选择打包员工"}],
                    pack_price: [
                        {required: true, message: "请输入价格"},
                        {type: "number", message: "请输入正确的价格"}
                    ]
                },

                goods: [],                          //产品列表
                search: "",                         //搜索字段
                goodsDialogVisible: false,          //选择商品弹框的状态

                staff: {}                           //员工
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
            },

            //选中的商品
            goodsName(){
                let self = this;

                let selected = self.goods.find(item => {
                    return item.id === self.production.goods_id;
                });

                if (selected) {
                    return selected.name + " " + selected.category + " " + selected.color;
                } else {
                    return "";
                }
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

            //获取所有员工
            getStaff(){
                let self = this;

                axios.get(api.staffList).then(res => {
                    if (res.data.code === 1) {
                        let staff = {};

                        //对员工进行分类
                        res.data.data.forEach(item => {
                            if (!staff[item.job]) {
                                Object.defineProperty(staff, item.job, {value: []});
                                staff[item.job].push(item);
                            } else {
                                staff[item.job].push(item);
                            }
                        });

                        self.staff = staff;
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
                })
            },

            submit(){
                let self = this;

                self.$refs.productionAdd.validate(valid => {
                    if (!valid) {
                        return;
                    }


                })
            }
        },

        mounted(){
            this.getGoods();
            this.getStaff();
        }
    }
</script>

<style lang="less">
    .productionAdd {
        .formBtn {
            text-align: center;
        }

        .el-radio__label {
            display: none;
        }

        .dialogBtn {
            margin-top: 20px;
            float: right;
        }
    }
</style>