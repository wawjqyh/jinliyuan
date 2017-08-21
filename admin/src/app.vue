<template>
    <router-view></router-view>
</template>

<script>
    export default {
        name: "app"
    }
</script>

<style lang="less">
    @import "./common/less/common";

    body {
        color: #333;
        font: normal normal normal 0.3rem/0.4rem 'Microsoft YaHei', Arial, sans-serif;
    }
</style>