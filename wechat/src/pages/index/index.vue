<template>
    <div class="index">
        <div>test num</div>
        <v-num v-model="num"></v-num>
    </div>
</template>

<script>
    import vNum from "../../components/num.vue";

    export default {
        data(){
            return {
                num: 0
            }
        },
        components: {
            vNum
        },
        methods: {
            onChange(val){
                console.log(val);
                this.num = val;
            }
        }
    }
</script>

<style lang="less">

</style>