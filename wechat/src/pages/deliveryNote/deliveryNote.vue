<template>
    <div class="delivery">
        <ul class="tab">
            <li class="active">待配送</li>
            <li>订单记录</li>
        </ul>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";

    export default{
        data(){
            return {
                onDelivery: [],
                record: []
            }
        },

        methods: {
            loadData(){
                let self = this;

                axios.get(api.delivery).then(res => {
                    if (res.data.code === 1) {
                        self.onDelivery = res.data.data.onDelivery;
                        self.record = res.data.data.record;
                    } else {
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },

        mounted(){
            this.loadData();
        }
    }
</script>

<style lang="less">
    @import "../../common/less/common";

    .delivery {
        padding-top: 0.8rem;

        .tab {
            position: fixed;
            width: 100%;
            height: 0.8rem;
            top: 0;
            left: 0;
            box-sizing: border-box;
            display: flex;
            border-bottom: 1px solid @mainColor;

            li {
                flex-grow: 1;
                text-align: center;
                line-height: 0.8rem;
                color: @mainColor;
            }

            .active {
                color: #fff;
                background-color: @mainColor;
            }
        }
    }
</style>