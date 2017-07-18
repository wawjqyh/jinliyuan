<template>
    <div>
        <router-view></router-view>

        <v-nav></v-nav>
    </div>
</template>

<script>
    import vNav from "../components/nav.vue";

    export default{
        components: {
            vNav
        }
    }
</script>