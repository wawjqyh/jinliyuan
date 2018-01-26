<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "app",

        methods: {
            ...mapActions(["getCustomer", "getGoods", "getCategory"])
        },

        mounted(){
            this.getCategory({});           //获取商品类别列表
        }
    }
</script>

<style lang="less">
    @import "common/less/media";
    @import "common/less/reset";
    @import "common/less/animate";
    @import "common/font-awesome/css/font-awesome";

    .mint-indicator-mask {
        z-index: 2;
    }
</style>