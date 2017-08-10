<template>
    <el-form :model="form" label-width="100px" class="form">
        <el-form-item label="姓名">
            <el-input></el-input>
        </el-form-item>

        <el-form-item label="电话">
            <el-input></el-input>
        </el-form-item>

        <el-form-item label="职位">

        </el-form-item>
    </el-form>
</template>

<script>
    export default{
        data(){
            return {
                form: {}
            }
        }
    }
</script>

<style lang="less">
    .form {
        width: 500px;
    }
</style>