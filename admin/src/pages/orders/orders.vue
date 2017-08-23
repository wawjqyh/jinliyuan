<template>
    <div class="orders">
        <el-breadcrumb separator="/" class="position">
            <el-breadcrumb-item>销售</el-breadcrumb-item>
            <el-breadcrumb-item>订单记录</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="operate">
            <el-form :inline="true" class="form">
                <el-form-item label="选择日期">
                    <el-date-picker v-model="dateRange" type="daterange" align="left" placeholder="选择日期范围"
                                    :picker-options="pickerOptions" range-separator="/" :editable=false>
                    </el-date-picker>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                dateRange: [null, null],              //日期范围
                pickerOptions: {            //日期插件配置
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },

        computed: {
            date(){
                let self = this;

                if (self.dateRange[0] === null) {
                    return [];
                } else {
                    return [self.dateRange[0].toLocaleDateString(), self.dateRange[1].toLocaleDateString()]
                }
            }
        },

        watch: {
            dateRange(val){
                console.log(this.date);
            }
        }
    }
</script>

<style lang="less">

</style>