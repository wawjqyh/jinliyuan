<template>
    <div class="customerAdd">
        <v-header title="新增客户"></v-header>

        <div class="form">
            <div class="formRow">
                <span>姓名 <b>*</b></span>
                <input type="text" placeholder="请输入姓名" v-model="username">
                <p class="error" v-if="!validate.username.state">{{validate.username.mes}}</p>
            </div>

            <div class="formRow">
                <span>号码 <b>*</b></span>
                <input type="text" placeholder="请输入手机号码" v-model="phone">
                <p class="error" v-if="!validate.phone.state">{{validate.phone.mes}}</p>
            </div>

            <div class="formRow">
                <span>省份 <b>*</b></span>
                <select v-model="provinceId">
                    <option value="">请选择</option>
                    <option v-for="(val, key) in provinceData" :value="key">{{val}}</option>
                </select>
                <p class="error" v-if="!validate.province.state">{{validate.province.mes}}</p>
            </div>

            <div class="formRow">
                <span>城市 <b>*</b></span>
                <select v-model="cityId">
                    <option value="">请选择</option>
                    <option v-for="(val, key) in cityData" :value="key">{{val}}</option>
                </select>
                <p class="error" v-if="!validate.city.state">{{validate.city.mes}}</p>
            </div>

            <div class="formRow">
                <span>地区</span>
                <select v-model="districtId">
                    <option value="">请选择</option>
                    <option v-for="(val, key) in districtData" :value="key">{{val}}</option>
                </select>
            </div>
        </div>
        <p class="tip">注：带*为必填项</p>

        <a href="javascript:void(0)" class="btn save" @click="submit">保存</a>
        <a href="javascript:void(0)" class="btn cancel" @click="$router.go(-1)">取消</a>
    </div>
</template>

<script>
    import vHeader from "../../components/header.vue";
    import addressData from "../../common/js/placeData";
    import axios from "axios";
    import api from "../../common/js/api";

    export default{
        components: {
            vHeader
        },
        data(){
            return {
                provinceData: addressData["86"],
                cityData: {},
                districtData: {},
                username: "",
                phone: "",
                provinceId: "",
                cityId: "",
                districtId: "",

                validate: {
                    username: {
                        state: true,
                        mes: ""
                    },
                    phone: {
                        state: true,
                        mes: ""
                    },
                    province: {
                        state: true,
                        mes: ""
                    },
                    city: {
                        state: true,
                        mes: ""
                    }
                }
            }
        },
        watch: {
            //省市区联动
            provinceId(val){
                this.districtData = {};
                this.cityId = "";
                this.districtId = "";

                if (val === "") {
                    this.cityData = {};
                } else {
                    this.cityData = addressData[val];
                }
            },

            cityId(val){
                this.districtId = "";

                if (val === "") {
                    this.districtData = {};
                } else {
                    this.districtData = addressData[val];
                }
            }
        },
        methods: {
            //提交表单
            submit(){
                let self = this;

                if (!self.validation()) {
                    return;
                }

                let provinceName = addressData["86"][self.provinceId];
                let cityName = addressData[self.provinceId][self.cityId];
                let districtName = addressData[self.cityId][self.districtId];

                let postData = {
                    username: self.username,
                    phone: self.phone,
                    province_id: self.provinceId,
                    province: provinceName,
                    city_id: self.cityId,
                    city: cityName,
                    district_id: self.districtId,
                    district: districtName
                };

                axios
                    .post(api.customerInsert, postData)
                    .then(res => {
                        self.$router.go(-1);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

            //表单验证
            validation(){
                let self = this;
                let canSubmit = true;

                if (self.username === "") {
                    self.validate.username.state = false;
                    self.validate.username.mes = "请输入客户姓名";
                    canSubmit = false;
                } else {
                    self.validate.username.state = true;
                    self.validate.username.mes = "";
                }

                if (!/^\d{11}$/.test(self.phone)) {
                    self.validate.phone.state = false;
                    self.validate.phone.mes = "请输入正确的手机号码";
                    canSubmit = false;
                } else {
                    self.validate.phone.state = true;
                    self.validate.phone.mes = "";
                }

                if (self.provinceId === "") {
                    self.validate.province.state = false;
                    self.validate.province.mes = "请选择省份";
                    canSubmit = false;
                } else {
                    self.validate.province.state = true;
                    self.validate.province.mes = "";
                }

                if (self.cityId === "") {
                    self.validate.city.state = false;
                    self.validate.city.mes = "请选择城市";
                    canSubmit = false;
                } else {
                    self.validate.city.state = true;
                    self.validate.city.mes = "";
                }

                return canSubmit;
            }
        }
    }
</script>

<style lang="less">
    .customerAdd {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 0.8rem;
        background-color: #eee;

        .form {
            background-color: #fff;
            padding: 0 0.3rem;

            .formRow {
                border-bottom: 1px solid #eee;
                position: relative;
                line-height: 1rem;
                padding-left: 1.5rem;

                span {
                    position: absolute;
                    top: 0;
                    left: 0;
                }

                b {
                    color: #f00;
                    line-height: 1rem;
                }

                input, select {
                    background: none;
                    border: none;
                    font-size: 0.3rem;
                    color: #999;
                    display: block;
                    width: 100%;
                    height: 1rem;
                    outline: none;
                }

                .error {
                    color: #f00;
                    font-size: 0.2rem;
                    line-height: 0.3rem;
                }
            }

            .formRow:last-child {
                border: none;
            }
        }

        .tip {
            padding: 0 0.3rem;
            font-size: 0.24rem;
            color: #999;
        }

        .btn {
            width: 90%;
            display: block;
            margin: 0.5rem auto;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            border-radius: 0.2rem;
        }

        .save {
            color: #fff;
            background-color: #31bfcf;
        }

        .cancel {
            background-color: #fff;
        }
    }
</style>