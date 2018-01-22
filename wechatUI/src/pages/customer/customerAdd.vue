<template>
    <div class="customerAdd">
        <v-header>新增客户</v-header>

        <div class="form">
            <div class="formRow">
                <span>姓名 <b>*</b></span>
                <input type="text" placeholder="请输入姓名" v-model="formData.username">
                <p class="error"></p>
            </div>

            <div class="formRow">
                <span>号码 <b>*</b></span>
                <input type="text" placeholder="请输入手机号码" v-model="formData.phone">
                <p class="error"></p>
            </div>

            <div class="formRow">
                <span>省份 <b>*</b></span>
                <select v-model="formData.province">
                    <option value="">请选择</option>
                    <option v-for="(val, key) in provinceData" :value="key">{{val}}</option>
                </select>
                <p class="error"></p>
            </div>

            <div class="formRow">
                <span>城市 <b>*</b></span>
                <select v-model="formData.city">
                    <option value="">请选择</option>
                    <option v-for="(val, key) in cityData" :value="key">{{val}}</option>
                </select>
                <p class="error"></p>
            </div>

            <div class="formRow">
                <span>地区</span>
                <select v-model="formData.district">
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
    import AsyncValidator from "async-validator";

    let rules = {
        username: [{required: true, message: "请输入姓名"}],
        phone: [
            {required: true, message: "请输入手机号"},
            {pattern: /^\d{11}$/, message: "请输入正确的号码"}
        ],
        province: [{required: true, message: "请输入姓名"}],
        city: [{required: true, message: "请输入姓名"}]
    };
    let validator = new AsyncValidator(rules);

    export default{
        data(){
            return {
                provinceData: addressData["86"],
                cityData: {},
                districtData: {},

                formData: {
                    username: "",
                    phone: "",
                    province: "",
                    city: "",
                    district: ""
                },

                error: {},
                validate: false
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
            },

            formData(val){
                let self = this;

                validator.validate(val, function (error, fields) {
                    if (fields !== null) {
                        self.error = fields;
                    } else {
                        self.validate = true;
                    }
                });
            }
        },

        components: {
            vHeader
        },

        methods: {
            async submit(){
                let self = this;

                let provinceName = addressData["86"][self.formData.province];
                let cityName = addressData[self.formData.province][self.formData.city];
                let districtName = addressData[self.formData.city][self.formData.district];

                let postData = {
                    username: self.formData.username,
                    phone: self.formData.phone,
                    province_id: self.formData.province,
                    province: provinceName,
                    city_id: self.formData.city,
                    city: cityName,
                    district_id: self.formData.district,
                    district: districtName
                };

                self.$indicator.open();
                let res = await self.$axios.post(self.$api.customerInsert, postData);
                self.$indicator.close();

                if (res.state) {
                    self.$toast("保存成功");
                    self.$router.go(-1);
                } else {
                    self.$toast("操作失败");
                }
            }
        },

        mounted(){
            this.$nextTick(() => {
                this.$indicator.close();
            })
        }
    }
</script>

<style lang="less">
    @import "./less/customerAdd";
</style>