<template>
    <div class="orderDetail">
        <v-header title="订单详情"></v-header>

        <div class="orderMes">
            <div class="userName">
                <span>{{order.username}}</span>
                <span class="phone">{{order.phone}}</span>
            </div>

            <div class="address">

            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";
    import vHeader from "../../components/header.vue";

    export default{
        data(){
            let self = this;

            return {
                id: self.$route.params.order_id,
                order: {},
                goods: []
            }
        },

        components: {
            vHeader
        },

        methods: {
            getData(){
                let self = this;

                axios.post(api.orderDetail, {order_id: this.id})
                    .then(res => {
                        if (res.data.code === 1) {
                            self.order = res.data.data.order[0];
                            self.goods = res.data.data.goods
                        } else {
                            console.log(res.data);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    .orderDetail {
        padding-top: 0.8rem;
    }
</style>