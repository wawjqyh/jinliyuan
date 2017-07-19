<template>
    <router-view></router-view>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "app",

        mounted(){
            this.getCustomer({});           //获取客户列表
            this.getGoods({});              //获取商品列表
            this.getCategory({});           //获取商品类别列表
        },

        methods: {
            ...mapActions(["getCustomer", "getGoods", "getCategory"])
        }
    }
</script>

<style lang="less">
    @import "common/less/media";
    @import "common/less/reset";
    @import "common/less/animate";
    @import "common/font-awesome/css/font-awesome";
</style>