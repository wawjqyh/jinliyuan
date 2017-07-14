<template>
    <ul class="star" :style="{width: width + 'rem'}">
        <li v-for="item in scoreArr" :style="{width: size/100 + 'rem', height: size/100 + 'rem'}">
            <img v-if="item === 0" src="./images/1_1.png">
            <img v-if="item === 1" src="./images/1_2.png">
            <img v-if="item === 2" src="./images/1_3.png">
        </li>
    </ul>
</template>

<script>
    export default{
        props: {
            score: {
                type: Number,
                default: 0
            },
            size: {
                type: Number,
                default: 48
            }
        },
        computed: {
            scoreArr(){
                let score = this.score;
                let arr = [];

                for (let i = 0; i < 5; i++) {
                    if (score >= 0.5) {
                        arr[i] = 2;
                    } else if (score > 0) {
                        arr[i] = 1;
                    } else {
                        arr[i] = 0;
                    }
                    score--;
                }

                return arr;
            },
            width(){
                return (this.size / 100) * 7;
            }
        }
    }
</script>

<style lang="less">
    @import "../../common/less/mixin";

    .star {
        display: inline-flex;
        vertical-align: bottom;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;

        li {
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
</style>