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
            <router-link to="/customerAdd" tag="li">新增<br>客户</router-link>
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
        mounted(){
            //进入这个页面时重新获取最新的客户列表
            this.getCustomer({});
        },
        computed: {
            ...mapState(["customer"]),

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
        }
    }
</script>

<style lang="less">
    .customer {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0.9rem;
        overflow: auto;
        padding-top: 0.8rem;

        .searchRow {
            padding: 0.15rem 0.3rem;
            background-color: #31bfcf;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            box-sizing: border-box;

            input {
                display: block;
                border: 1px solid #fff;
                background: none;
                color: #fff;
                width: 100%;
                box-sizing: border-box;
                height: 0.5rem;
                border-radius: 0.3rem;
                padding-left: 0.6rem;
            }

            input::placeholder {
                color: #fff;
            }

            .fa-search {
                color: #fff;
                position: absolute;
                top: 0.26rem;
                left: 0.48rem;
            }
        }

        .customerList {
            padding: 0 0.2rem;

            li {
                border-bottom: 1px solid #eee;
                padding: 0.2rem 0 0.1rem 0;
            }

            a {
                display: block;
            }

            .nameRow {
                line-height: 0.4rem;
                font-size: 0.3rem;

                .phone {
                    float: right;
                    font-size: 0.24rem;
                }
            }

            .address {
                color: #999;
                font-size: 0.24rem;
                line-height: 0.5rem;
            }
        }

        .toolBtn {
            position: absolute;
            bottom: 0.3rem;
            right: 0.3rem;

            li {
                width: 1rem;
                height: 1rem;
                color: #fff;
                margin-bottom: 0.2rem;
                background-color: #31bfcf;
                border-radius: 50%;
                font-size: 0.24rem;
                text-align: center;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                line-height: 0.3rem;
            }
        }
    }
</style>