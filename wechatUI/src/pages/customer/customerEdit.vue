<template>
    <div class="customerAdd">
        <v-header>修改客户</v-header>

        <div class="form">
            <div class="formRow">
                <span>姓名 <b>*</b></span>
                <input type="text" placeholder="请输入姓名" v-model="formData.username">
                <p class="error" v-if="error.username">{{error.username[0].message}}</p>
            </div>

            <div class="formRow">
                <span>号码 <b>*</b></span>
                <input type="text" placeholder="请输入手机号码" v-model="formData.phone">
                <p class="error" v-if="error.phone">{{error.phone[0].message}}</p>
            </div>

            <div class="formRow">
                <span>省份 <b>*</b></span>
                <select v-model="formData.province">
                    <option value="">请选择</option>
                    <option v-for="(val, key) in provinceData" :value="key">{{val}}</option>
                </select>
                <p class="error" v-if="error.province">{{error.province[0].message}}</p>
            </div>

            <div class="formRow">
                <span>城市 <b>*</b></span>
                <select v-model="formData.city">
                    <option value="">请选择</option>
                    <option v-for="(val, key) in cityData" :value="key">{{val}}</option>
                </select>
                <p class="error" v-if="error.city">{{error.city[0].message}}</p>
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
                id: this.$route.params.customer_id, //用户id
                provinceData: addressData["86"],    //省份数据
                cityData: {},                       //城市数据
                districtData: {},                   //地区数据

                formData: {                         //表单数据
                    username: "",
                    phone: "",
                    province: "",
                    city: "",
                    district: ""
                },

                error: {}                           //表单验证信息
            }
        },

        watch: {
            //省市区联动
            "formData.province"(val){
                this.districtData = {};
                this.formData.city = "";
                this.formData.district = "";

                if (val === "") {
                    this.cityData = {};
                } else {
                    this.cityData = addressData[val];
                }
            },

            "formData.city"(val){
                this.formData.district = "";

                if (val === "") {
                    this.districtData = {};
                } else {
                    this.districtData = addressData[val];
                }
            }
        },

        methods: {
            //获取当前用户信息
            async getData(){
                let self = this;

                //调接口
                let res = await self.$axios.post(self.$api.customerBase, {id: self.id});
                self.$indicator.close();

                //处理响应信息
                if (res.state) {
                    let mes = res.data[0];

                    self.formData.username = mes.username;
                    self.formData.phone = mes.phone;
                    self.formData.province = mes.province_id;
                    self.formData.city = await mes.city_id;
                    self.formData.district = await mes.district_id;
                } else {
                    self.$toast("修改失败！");
                }
            },

            async submit(){
                let self = this;

                //表单校验
                let fields = await new Promise((resolve, reject) => {
                    validator.validate(self.formData, function (error, fields) {
                        resolve(fields);
                    });
                });
                if (fields !== null) {
                    self.error = fields;
                    return;
                }

                //获取省市区名称
                let provinceName = addressData["86"][self.formData.province];
                let cityName = addressData[self.formData.province][self.formData.city];
                let districtName = addressData[self.formData.city][self.formData.district];

                //整理提交数据
                let postData = {
                    id: self.id,
                    username: self.formData.username,
                    phone: self.formData.phone,
                    province_id: self.formData.province,
                    province: provinceName,
                    city_id: self.formData.city,
                    city: cityName,
                    district_id: self.formData.district,
                    district: districtName
                };

                //调接口
                self.$indicator.open();
                let res = await self.$axios.post(self.$api.customerUpdate, postData);
                self.$indicator.close();

                //处理响应信息
                if (res.state) {
                    self.$toast("保存成功");
                    self.$router.go(-1);
                } else {
                    self.$toast("操作失败");
                }
            }
        },

        mounted(){
            this.getData();
        }
    }
</script>

<style lang="less">
    @import "./less/customerEdit";
</style>