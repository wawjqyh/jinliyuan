<template>
    <el-col :span="4" class="sidebar">
        <el-menu class="sidebarMenu" :default-active="$route.path" theme="dark" :router="true">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>报表</template>
                <el-menu-item index="/">库存</el-menu-item>
                <el-menu-item index="1-2">销量统计</el-menu-item>
                <el-menu-item index="1-3">客户分布</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-document"></i>销售</template>
                <el-menu-item index="/orders">订单记录</el-menu-item>
                <el-menu-item index="/customer">客户</el-menu-item>
            </el-submenu>
            <el-submenu index="/staff">
                <template slot="title"><i class="el-icon-setting"></i>生产</template>
                <el-menu-item index="/staff" :route="{path: '/staff'}">员工</el-menu-item>
                <el-menu-item index="/production" :route="{path: '/production'}">派工单</el-menu-item>
                <el-menu-item index="3-3">月统计</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>

</script>

<style lang="less">
    .sidebar {
        position: absolute;
        top: 100px;
        left: 0;
        bottom: 0;

        .sidebarMenu {
            height: 100%;
        }

        a {
            display: block;
            color: inherit;
            text-decoration: none;
        }
    }
</style>