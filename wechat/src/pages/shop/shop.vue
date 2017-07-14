<template>
    <div>
        <v-header></v-header>

        <v-tab></v-tab>

        <div class="content">
            <router-view></router-view>
        </div>

        <v-seller-box></v-seller-box>
    </div>
</template>

<script>
    import vHeader from "./common/header/header.vue";
    import vTab from "./common/tab/tab.vue";
    import vSellerBox from "./sellerBox/sellerBox.vue";

    export default{
        components: {
            vHeader,
            vTab,
            vSellerBox
        }
    }
</script>