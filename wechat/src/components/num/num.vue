<template>
    <div class="numBtn">
        <transition name="slideOutLeft">
            <a href="javascript:void(0)" class="subNumBtn" @click="subNum" v-show="num > 0">-</a>
        </transition>

        <span class="num" v-show="num > 0">{{num}}</span>
        <a href="javascript:void(0)" class="addNum" @click="addNum">+</a>
    </div>
</template>

<script>
    export default{
        props: {
            num: {
                type: Number,
                default: 0
            }
        },

        methods: {
            //增加数量
            addNum(){
                this.$emit("addNum");
            },

            //减少数量
            subNum(){
                this.$emit("subNum");
            }
        }
    }
</script>

<style lang="less">
    .numBtn {
        display: inline-block;
        height: 0.4rem;
        width: 1.4rem;
        vertical-align: middle;
        position: relative;
        text-align: center;
        line-height: 0.4rem;

        .subNumBtn, .addNum {
            display: inline-block;
            vertical-align: bottom;
            width: 0.3rem;
            height: 0.3rem;
            line-height: 0.25rem;
            text-align: center;
            font-size: 0.4rem;
            font-weight: bold;
            border: 0.05rem solid #00a0dc;
            border-radius: 50%;
            position: absolute;
        }

        .subNumBtn {
            color: #00a0dc;
            background-color: #fff;
            left: 0;
        }

        .addNum {
            color: #fff;
            background-color: #00a0dc;
            right: 0;
        }

        .num {
            color: #ccc;
        }
    }
</style>