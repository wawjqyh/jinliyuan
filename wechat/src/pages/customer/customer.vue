<template>
    <div class="customer">
        <div class="searchRow">
            <input type="text" placeholder="搜索">
            <span class="fa fa-search"></span>
        </div>

        <ul class="customerList">
            <li v-for="item in customer">
                <div class="nameRow">
                    <span class="customerName">{{item.username}}</span>
                    <span class="phone">{{item.phone}}</span>
                </div>
                <div class="address">
                    {{item.province | formatPlace}}-{{item.city | formatPlace}}-{{item.district | formatPlace}}
                </div>
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
        mounted(){
            this.getCustomer({});
        },
        computed: {
            ...mapState(["customer"])
        },
        filters: {
            //格式化地址
            formatPlace(val){
                let name = val.split("-");

                if (name.length >= 2)
                    return val.split("-")[1];
                else
                    return val;
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