<template>
    <div class="loading" v-show="loadingState">
        <div class="loadingTip">
            <img src="./loading.png">
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default{
        computed: {
            ...mapState(["loadingState"])
        }
    }
</script>

<style lang="less">
    .loading {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 9999;

        .loadingTip {
            position: absolute;
            width: 1.6rem;
            height: 1.6rem;
            top: 50%;
            left: 50%;
            margin: -0.8rem 0 0 -0.8rem;
        }

        img {
            position: absolute;
            width: 100%;
            height: 100%;
            animation: loading 2s linear infinite;
        }
    }

    @keyframes loading {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>