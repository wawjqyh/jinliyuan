<template>
    <div id="container">
        <router-view></router-view>

        <v-cart-list></v-cart-list>

        <v-cart></v-cart>
    </div>
</template>

<script>
    import vCart from "./pages/common/cart/cart.vue";
    import vCartList from "./pages/common/cartList/cartList.vue";

    import {mapActions} from "vuex";

    export default {
        name: "app",
        mounted(){
            this.getGoods({});
            this.getSeller({});
        },
        components: {
            vCart,
            vCartList
        },
        data(){
            return {
                seller: {}
            }
        },
        methods: {
            ...mapActions(["getGoods", "getSeller"])
        }
    }
</script>

<style lang="less">
    @import "common/less/media";
    @import "common/less/reset";
    @import "common/less/animate";

    .content {
        box-sizing: border-box;
        width: 100%;
        top: 3.55rem;
        left: 0;
        bottom: 1rem;
        position: absolute;
    }
</style>