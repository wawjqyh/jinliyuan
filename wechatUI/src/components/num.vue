<template>
    <div class="numBtn">
        <transition name="slideOutLeft">
            <a href="javascript:void(0)" class="subNumBtn" @click="subNum" v-show="value > 0">-</a>
        </transition>

        <input class="num" v-show="value > 0 || focus" :value="value" @input="onInput($event)" @focus="focus = true" @blur="focus = false">

        <a href="javascript:void(0)" class="addNum" @click="addNum">+</a>
    </div>
</template>

<script>
    export default{
        props: ["value"],

        data(){
            return {
                focus: false
            }
        },

        methods: {
            //增加数量
            addNum(){
                let num = this.value;
                num++;
                this.$emit("input", num);
            },

            //减少数量
            subNum(){
                let num = this.value;

                if (num <= 0) {
                    return;
                }

                num--;
                this.$emit("input", num);
            },

            onInput(e){
                this.$emit("input", e.target.value);
            }
        }
    }
</script>

<style lang="less">
    .numBtn {
        display: inline-block;
        height: 0.4rem;
        width: 1.5rem;
        vertical-align: middle;
        position: relative;
        text-align: center;
        line-height: 0.4rem;

        .subNumBtn, .addNum {
            display: inline-block;
            width: 0.4rem;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.4rem;
            font-weight: bold;
            border-radius: 50%;
            position: absolute;
            color: #fff;
            background-color: #00a0dc;
        }

        .subNumBtn {
            left: 0;
        }

        .addNum {
            right: 0;
        }

        .num {
            color: #ccc;
            position: absolute;
            width: 0.5rem;
            border: 1px solid #eee;
            border-radius: 0.1rem;
            height: 0.4rem;
            text-align: center;
            top: 0;
            left: 0.5rem;
            box-sizing: border-box;
        }
    }
</style>