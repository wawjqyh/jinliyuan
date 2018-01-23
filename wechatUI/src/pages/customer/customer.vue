<template>
    <div class="customer">
        <div class="searchRow">
            <input type="text" placeholder="搜索" v-model="searchData">
            <span class="fa fa-search"></span>
        </div>

        <ul class="customerList">
            <li v-for="item in customerShows">
                <router-link :to="'/customer/detail/' + item.id">
                    <div class="nameRow">
                        <span class="customerName">{{item.username}}</span>
                        <span class="phone">{{item.phone}}</span>
                    </div>
                    <div class="address">
                        {{item.province}}-{{item.city}}-{{item.district}}
                    </div>
                </router-link>
            </li>
        </ul>

        <ul class="toolBtn">
            <router-link to="/customer/add" tag="li">新增<br>客户</router-link>
        </ul>
    </div>
</template>

<script>
    import axios from "axios";
    import api from "../../common/js/api";
    import {mapState, mapActions} from "vuex";

    export default {
        data(){
            return {
                searchData: ""
            }
        },

        computed: {
            ...mapState(["customer"]),

            //过滤列表
            customerShows(){
                let self = this;

                if (self.searchData === "") {
                    return self.customer;
                }

                return self.customer.filter(item => {
                    let reg = new RegExp(self.searchData, "g");
                    return reg.test(item.username) || reg.test(item.phone) || reg.test(item.province) || reg.test(item.city) || reg.test(item.district);
                });
            }
        },

        methods: {
            ...mapActions(["getCustomer"])
        },

        mounted(){
            //进入这个页面时重新获取最新的客户列表
            this.getCustomer({});
            this.$nextTick(() => {
                this.$indicator.close();
            })
        }
    }
</script>

<style lang="less">
    @import "./less/customer";
</style>