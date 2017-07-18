<template>
    <router-view></router-view>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "app",

        mounted(){
            //获取客户列表
            this.getCustomer({});
        },

        methods: {
            ...mapActions(["getCustomer"])
        }
    }
</script>

<style lang="less">
    @import "common/less/media";
    @import "common/less/reset";
    @import "common/less/animate";
    @import "common/font-awesome/css/font-awesome";
</style>