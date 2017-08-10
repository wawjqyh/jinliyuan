<template>
    <div id="container">
        <v-header></v-header>

        <v-sidebar></v-sidebar>

        <el-col :span="20" :offset="4" class="content">
            <router-view></router-view>
        </el-col>
    </div>
</template>

<script>
    import vHeader from "./header.vue";
    import vSidebar from "./sidebar.vue";

    export default{
        components: {
            vHeader,
            vSidebar
        }
    }
</script>

<style lang="less">
    #container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: auto;
    }

    .content {
        padding: 10px 20px;
    }
</style>