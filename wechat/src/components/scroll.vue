<template>
    <div class="scroll" ref="scrollContainer" @scroll="onScroll">
        <slot></slot>

        <div class="loadTip" v-show="!canLoad">
            <div class="tipCon">
                <span class="loadT1"></span>
                <span class="loadT2"></span>
                <span class="loadT3"></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: {
            canLoad: true       //是否可以加载，防止重复加载
        },

        methods: {
            //滑动事件
            onScroll(e){
                let self = this;

                if (!self.canLoad) {
                    return;
                }

                let el = e.target;

                if ((el.scrollHeight - el.clientHeight - el.scrollTop) < 100) {
                    self.$emit("update:canLoad", false);

                    self.$emit("loadMore");
                }
            }
        }
    }
</script>

<style lang="less">
    .scroll {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: auto;

        .loadTip {
            position: relative;
            height: 0.8rem;
        }

        .tipCon {
            position: absolute;
            width: 6.4rem;
            height: 0.8rem;
            top: 0;
            left: 50%;
            margin-left: -3.2rem;

            .loadT1, .loadT2, .loadT3 {
                position: absolute;
                width: 0.2rem;
                height: 0.2rem;
                top: 0.3rem;
                background-color: #60a2ff;
                border-radius: 50%;
            }

            .loadT1 {
                left: 2.5rem;
                -webkit-animation: loadAni linear infinite 0.9s;
            }

            .loadT2 {
                left: 3.1rem;
                -webkit-animation: loadAni linear infinite 0.9s 0.3s;
            }

            .loadT3 {
                right: 2.5rem;
                -webkit-animation: loadAni linear infinite 0.9s 0.6s;
            }
        }

        @-webkit-keyframes loadAni {
            0% {
                -webkit-transform: scale(1);
            }
            50% {
                -webkit-transform: scale(1.5);
            }
            100% {
                -webkit-transform: scale(1);
            }
        }
    }
</style>