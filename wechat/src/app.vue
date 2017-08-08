<template>
    <div>
        <router-view></router-view>
        <v-loading></v-loading>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    import vLoading from "./components/loading/loading.vue";

    export default {
        name: "app",

        components: {
            vLoading
        },

        methods: {
            ...mapActions(["getCustomer", "getGoods", "getCategory"])
        },

        mounted(){
            this.getCustomer({});           //获取客户列表
            this.getGoods({});              //获取商品列表
            this.getCategory({});           //获取商品类别列表
        }
    }
</script>

<style lang="less">
    @import "common/less/media";
    @import "common/less/reset";
    @import "common/less/animate";
    @import "common/font-awesome/css/font-awesome";
</style>