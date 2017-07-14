<template>
    <div class="tab">
        <div class="tabItem">
            <router-link to="/shop/goods">商品</router-link>
        </div>
        <div class="tabItem">
            <router-link to="/shop/comments">评论</router-link>
        </div>
        <div class="tabItem">
            <router-link to="/shop/seller">商家</router-link>
        </div>
    </div>
</template>

<script>
    export default{}
</script>

<style lang="less">
    .tab {
        display: flex;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .tabItem {
            flex: 1;
            text-align: center;

            a {
                display: block;
            }

            .router-link-exact-active {
                color: rgb(240, 30, 20);
            }
        }
    }
</style>