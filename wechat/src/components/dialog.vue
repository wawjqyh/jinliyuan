<template>
    <transition name="fade">
        <div class="vDialog" v-show="show" :style="{width: option.width}">
            <div class="dialogTitle" v-if="option.title != ''">{{option.title}}</div>
            <div class="dialogCon">{{option.content}}</div>
            <div class="dialogBtn">
                <a href="javascript:void(0)" @click="cancel" class="btnCancel"
                   v-show="option.dialog">{{option.cancelValue}}</a>
                <a href="javascript:void(0)" @click="ok" class="btnConfirm">{{option.okValue}}</a>
            </div>
        </div>
    </transition>
</template>

<script>
    export default{
        props: {
            show: {
                default: false
            },
            options: {
                default(){
                    return {}
                }
            }
        },

        computed: {
            option(){
                let self = this;
                let defaultVal = {
                    title: "",
                    content: "",
                    width: "4rem",
                    dialog: false,
                    cancelValue: "取消",
                    okValue: "确定"
                };

                return Object.assign(defaultVal, self.options);
            }
        },

        methods: {
            cancel(){
                this.$emit("cancel");
                this.$emit("update:show", false);
            },

            ok(){
                this.$emit("ok");
                this.$emit("update:show", false);
            }
        }
    }
</script>

<style lang="less">
    .vDialog {
        position: fixed;
        top: 40%;
        left: 50%;
        width: 4rem;
        background-color: #fff;
        border-radius: 0.2rem;
        overflow: hidden;
        transform: translate(-50%, -50%);
        box-shadow: 4px 4px 15px #999;
        z-index: 9999;

        .dialogTitle {
            font-size: 0.3rem;
            line-height: 0.8rem;
            text-align: center;
            color: #60a0ff;
        }

        .dialogCon {
            font-size: 0.28rem;
            color: #555;
            padding: 0.3rem;
            line-height: 0.4rem;
            text-align: center;
            border-bottom: 1px solid #ccc;
            word-break: break-all;
            word-wrap: break-word;
            position: relative;
        }

        .dialogBtn {
            height: 0.8rem;
            display: flex;
            flex-wrap: nowrap;

            a {
                flex-grow: 1;
                flex-shrink: 1;
                text-align: center;
                line-height: 0.8rem;
            }

            .btnConfirm {
                color: #60a0ff;
            }
        }
    }
</style>