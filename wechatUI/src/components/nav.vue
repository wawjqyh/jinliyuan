<template>
    <ul class="footerNav">
        <router-link to="/" tag="li" exact>
            <div><span class="fa fa-home"></span></div>
            <div class="navName">首页</div>
        </router-link>

        <router-link to="/goods" tag="li">
            <div><span class="fa fa-cubes"></span></div>
            <div class="navName">库存</div>
        </router-link>

        <router-link to="/order" tag="li">
            <div><span class="fa fa-file-text-o"></span></div>
            <div class="navName">订单</div>
        </router-link>

        <router-link to="/customer" tag="li">
            <div><span class="fa fa-address-book-o"></span></div>
            <div class="navName">客户</div>
        </router-link>

        <router-link to="/report" tag="li">
            <div><span class="fa fa-bar-chart"></span></div>
            <div class="navName">报表</div>
        </router-link>
    </ul>
</template>

<script>
    export default{
        data(){
            return {
                page: "index"
            }
        }
    }
</script>

<style lang="less">
    .footerNav {
        position: absolute;
        width: 100%;
        height: 0.9rem;
        left: 0;
        bottom: 0;
        border-top: 1px solid #ddd;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: hidden;
        color: #999;
        box-sizing: border-box;
        z-index: 1;
        background-color: #fff;

        li {
            flex-grow: 1;
            width: 20%;
            text-align: center;

            .fa {
                font-size: 0.35rem;
                margin-top: 0.14rem;
            }

            .navName {
                font-size: 0.24rem;
                line-height: 0.3rem;
            }
        }

        .router-link-active {
            color: #31bfcf;
        }
    }
</style>