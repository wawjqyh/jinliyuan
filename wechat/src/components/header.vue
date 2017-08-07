<template>
    <div class="header">
        <a href="javascript:void(0)" class="fa fa-angle-left" @click="$router.go(-1)"></a>
        <h3>{{title}}</h3>
    </div>
</template>

<script>
    export default{
        props: ["title"]
    }
</script>

<style lang="less">
    .header {
        position: fixed;
        width: 100%;
        height: 0.8rem;
        top: 0;
        left: 0;
        background-color: #31bfcf;
        z-index: 1;

        .fa-angle-left {
            position: absolute;
            width: 0.8rem;
            height: 0.8rem;
            top: 0;
            left: 0;
            line-height: 0.8rem;
            text-align: center;
            color: #fff;
            font-size: 0.5rem;
        }

        h3 {
            line-height: 0.8rem;
            color: #fff;
            font-size: 0.35rem;
            text-align: center;

        }
    }
</style>