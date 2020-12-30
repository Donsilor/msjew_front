<template>
  <div class="container">
    <div class="address">
      <div class="pink-title">
        <div class="pink-line" />
        <div class="title-name">{{ $t(`${lang}.address`) }}</div>
        <div class="quit" @click="$emit('close')">X</div>
      </div>

      <div class="form">
        <div v-if="language == 'zh_CN'" class="form-list clf">
          <div class="list-l fl"><span class="required">*</span>{{ $t(`${lang}.firstName`) }}</div>
          <div class="list-l fl width100">
            <input
                v-model="using.lastname"
                type="text"
                maxlength="30"
              />
          </div>
          <div class="list-l fl"><span class="required">*</span>{{ $t(`${lang}.lastName`) }}</div>
          <div class="list-l fl width100">
            <input
                v-model="using.firstname"
                type="text"
                maxlength="30"
              />
          </div>
        </div>

        <div v-else class="form-list clf">
          <div class="list-l fl"><span class="required">*</span>{{ $t(`${lang}.lastName`) }}</div>
          <div class="list-l fl width100">
            <input
                v-model="using.firstname"
                type="text"
                maxlength="30"
              />
          </div>
          <div class="list-l fl"><span class="required">*</span>{{ $t(`${lang}.firstName`) }}</div>
          <div class="list-l fl width100">
            <input
                v-model="using.lastname"
                type="text"
                maxlength="30"
              />
          </div>
        </div>

        <div class="form-list clf">
          <div class="list-l fl"><span v-if="language !== 'zh_CN'" class="required">*</span>{{ $t(`${lang}.addEmail`) }}</div>
          <div class="list-r fl">
            <input
                v-model="using.email"
                :placeholder="$t(`${lang}.mailAvenue`)"
                type="text"
                maxlength="60"
              />
          </div>
        </div>

        <div class="form-list clf">
          <div class="list-l fl"><span class="required">*</span>{{ $t(`${lang}.phone`) }}</div>
          <div class="phone-json fl">
            <input :value="phoneNum.phone_code" type="text" />
            <select v-model="phoneNum">
              <option v-for="(p, index) in phoneJson" :key="index" :value="p">{{
                psn ? p.en :psn ? p.cn :p.zh
              }}</option>
            </select>
            <i class="iconfont iconxiala" />
          </div>
          <div class="list-l fl phone-box">
            <input
              v-model="using.mobile"
              type="tel"
              :maxlength="mobileMax"
              @input="mobileIpt"
            />
          </div>
        </div>

        <div class="new-addr-address clf">
          <div class="address-class clf fl">
            <div class="address-text fl"><span class="required">*</span>{{ $t(`${lang}.country`) }}</div>
            <div class="address-content fl">
              <input :value="country.areaName" type="text" />
              <select v-model="country" @change="getListTwo">
                <option
                  v-for="(c, index) in countryList"
                  :key="index"
                  :value="c"
                  >{{ c.areaName }}</option
                >
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>
          <div class="address-class clf fl width100">
            <div class="address-text fl">{{ $t(`${lang}.province`) }}</div>
            <div class="address-content fl">
              <input :value="province.areaName" type="text" />
              <select v-model="province" @change="getListThree">
                <option
                  v-for="(p, index) in provinceList"
                  :key="index"
                  :value="p"
                  >{{ p.areaName }}</option
                >
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>
          <div class="address-class clf fl">
            <div class="address-text fl">{{ $t(`${lang}.city`) }}</div>
            <div class="address-content fl">
              <input :value="city.areaName" type="text" />
              <select v-model="city">
                <option v-for="(c, index) in cityList" :key="index" :value="c">{{
                  c.areaName
                }}</option>
              </select>
              <i class="iconfont iconxiala" />
            </div>
          </div>
        </div>

        <div class="form-list clf">
          <div class="list-l fl">{{ $t(`${lang}.zip`) }}</div>
          <div class="list-r fl">
            <input
                v-model="using.zip_code"
                type="text"
                maxlength="11"
                @input="keydown"
              />  
          </div>
        </div>

        <div class="form-list clf detail">
          <div class="list-l fl"><span class="required">*</span>{{ $t(`${lang}.longAddress`) }}</div>
          <div class="list-r fl">
            <textarea 
              class="address-detail"
              v-model="using.address_details"
              type="text"
              maxlength="300"
            ></textarea>     
          </div>
        </div>

        <div class="form-list last-child clf">
          <div class="default fl" :class="{'active': ifDefault}" @click="ifDefault = ifDefault == 0 ? 1 : 0">
            <i class="iconfont el-icon-success fl"></i>
            <span class="setDefault fl">{{ $t(`${lang}.setDefaultAddress`) }}</span>
          </div>
          <div v-if="this.editData" class="affirm fr" :class="{'active': ifAffirm}" @click="changeSave">{{ $t(`${lang}.affirmChanges`) }}</div>
          <div v-else class="affirm fr" :class="{'active': ifAffirm}" @click="createAddress">{{ $t(`${lang}.affirmAdd`) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Address from '@/assets/js/address.js'
import { Email, RegMobile, RegTelephone, RegMobiles } from '@/assets/js/require-lee.js'
import termsAndConditionsVue from '../../pages/policies/terms-and-conditions.vue'
const lang = 'personal.account'

export default {
  name: 'Index',
  mixins: [Address],
  data() {
    return{
      lang,
      address: [],
      isDel: false,
      delId: ``,
      delIdx: -1,
      isEdit: false,
      isNew: true,
      isShow: false,
      using: {
        firstname: ``,
        lastname: ``,
        mobile_code: ``,
        mobile: ``,
        email: ``,
        country_id: ``,
        province_id: ``,
        city_id: ``,
        address_details: ``,
        zip_code: ``
      },
      checkEmail: ``,
      language:'',
      mobileMax: 20,
      // 所编辑的否是默认地址，如果是默认地址且提交时取消默认则重新生成默认地址
      editDefault: false,
      // 当前地址是否设置默认地址
      ifDefault: 0,
      ifAffirm: false
    }
  },
  props: {
    editData: {
      type: Object,
      default: null
    }
  },
  computed: {
    pnN() {
      if (this.$store.state.language === 'en_US') {
        return this.phoneNum.en
      }else if(this.$store.state.language === 'zh_TW'){
        return this.phoneNum.cn
      }else
        return this.phoneNum.zh
    },
    psn() {
      return this.$store.state.language === 'en_US'
    }
  },
  mounted(){
    this.language = this.$store.state.language;

    if(this.editData){
      if(this.editData['is_default'] == 1){
        this.ifDefault = 1;
        this.editDefault = true;
      }else{
        this.ifDefault = 0;
        this.editDefault = false;
      }
      this.changeAddress(this.editData)
    }else{
      this.getData()
    }
  },
  methods: {
    // 新建地址
    createAddress() {
      if (this.using.firstname === '') {
        this.$message.error(this.$t(`${lang}.wip1`))
        return
      }
      if (this.using.firstname.length > 20) {
        this.$message.error(this.$t(`${lang}.wip2`))
        return
      }
      if (this.using.lastname === '') {
        this.$message.error(this.$t(`${lang}.wip3`))
        return
      }
      if (this.using.lastname.length > 20) {
        this.$message.error(this.$t(`${lang}.wip4`))
        return
      }
      if (this.language !== 'zh_CN' && this.using.email === '') {
        this.$message.error(this.$t(`${lang}.wip5`))
        return
      }
      if (this.language !== 'zh_CN' && !Email.test(this.using.email)) {
        this.$message.error(this.$t(`${lang}.wip6`))
        return
      }
      // if (this.using.email !== this.checkEmail) {
      //   this.$message.error(this.$t(`${lang}.wip7`))
      //   return
      // }
      if (this.using.mobile === '') {
        this.$message.error(this.$t(`${lang}.wip8`))
        return
      }
      if(this.phoneNum.phone_code == '+86'){
        if (!RegMobiles.test(this.using.mobile) // && // !RegTelephone.test(this.using.mobile)
        ) {
          this.$message.error(this.$t(`${lang}.wip9`))
          return
        }
      }
      if (this.language !== 'zh_CN' && !RegMobile.test(this.using.mobile)) {
        this.$message.error(this.$t(`${lang}.wip9`))
        return
      }
      if (this.language === 'zh_CN' && !RegTelephone.test(this.using.mobile)) {
        this.$message.error(this.$t(`${lang}.wip9`))
        return
      }
      if (!this.country.areaId) {
        this.$message.error(this.$t(`${lang}.wip10`))
        return false
      }
      if (this.using.address_details === '') {
        this.$message.error(this.$t(`${lang}.wip11`))
        return
      }

      const json = {
        firstname: this.using.firstname,
        lastname: this.using.lastname,
        mobile_code: this.phoneNum.phone_code,
        mobile: this.using.mobile,
        email: this.using.email,
        country_id: this.country.areaId,
        province_id: this.province.areaId,
        city_id: this.city.areaId,
        address_details: this.using.address_details,
        zip_code: this.using.zip_code,
        is_default: this.ifDefault
      }    

      this.$axios
        .post('web/member/address/add',json)
        .then(res => {
          if(res.code==200){
            // console.log("新增地址成功",res)
            this.$message({
              message: this.$t(`${lang}.addAddressSuccess`),
              type: 'success'
            })

            this.ifDefault = 0;

            this.$emit('addSuccess')
          }else {
            throw new Error (res.message)
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    // 获取地址
    getData() {
      this.$axios
        .get('/web/member/address')
        .then(res => {
            this.address = res.data

            if(this.address.length){
              this.ifDefault = 0
            }else{
              this.ifDefault = 1
            }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    // 新增地址以后清空新建地址模板
    resetAddress() {
      this.isShow = false
      this.isNew = true
      this.isEdit = false
      this.using = {
        firstname: ``,
        lastname: ``,
        mobile_code: ``,
        mobile: ``,
        email: ``,
        country_id: ``,
        province_id: ``,
        city_id: ``,
        address_details: ``,
        zip_code: ``
      }
      this.clone = {
        firstname: ``,
        lastname: ``,
        mobile_code: ``,
        mobile: ``,
        email: ``,
        country_id: ``,
        province_id: ``,
        city_id: ``,
        address_details: ``,
        zip_code: ``
      }
      this.checkEmail = ``
      this.delId = ``
    },
    // 修改地址
    changeAddress(obj) {
      this.resetAddress()
      this.using = this.$helpers.cloneObject(obj)
      this.checkEmail = obj.email

      const code = obj.mobile_code.split('+').reverse()
      JSON.parse(JSON.stringify(this.phoneJson)).forEach(o => {
        if (o.phone_code === '+' + code[0]) this.phoneNum = o
      })

      this.setAddress(obj).then(res => {})
    },
    // 保存修改
    changeSave() {
      var that = this;
      if (this.using.firstname === '') {
        this.$message.error(this.$t(`${lang}.wip1`))
        return
      }
      if (this.using.firstname.length > 20) {
        this.$message.error(this.$t(`${lang}.wip2`))
        return
      }
      if (this.using.lastname === '') {
        this.$message.error(this.$t(`${lang}.wip3`))
        return
      }
      if (this.using.lastname.length > 20) {
        this.$message.error(this.$t(`${lang}.wip4`))
        return
      }
      // if (this.using.email === '') {
      //   this.$message.error(this.$t(`${lang}.wip5`))
      //   return
      // }
      // if (!Email.test(this.using.email)) {
      //   this.$message.error(this.$t(`${lang}.wip6`))
      //   return
      // }
      // if (this.using.email !== this.checkEmail) {
      //   this.$message.error(this.$t(`${lang}.wip7`))
      //   return
      // }
      if (this.using.mobile === '') {
        this.$message.error(this.$t(`${lang}.wip8`))
        return
      }
      if (
        !RegMobile.test(this.using.mobile) &&
        !RegTelephone.test(this.using.mobile)
      ) {
        this.$message.error(this.$t(`${lang}.wip9`))
        return
      }
      if (!this.country.areaId) {
        this.$message.error(this.$t(`${lang}.wip10`))
        return false
      }
      if (this.using.address_details === '') {
        this.$message.error(this.$t(`${lang}.wip11`))
        return
      }

      if (this.using.zip_code == null) {
        this.using.zip_code = ''
      }
      
      const json = {
        id: this.using.id,
        firstname: this.using.firstname,
        lastname: this.using.lastname,
        mobile_code: this.phoneNum.phone_code,
        mobile: this.using.mobile,
        email: this.using.email,
        country_id: this.country.areaId,
        province_id: this.province.areaId,
        city_id: this.city.areaId,
        address_details: this.using.address_details,
        zip_code: this.using.zip_code,
        is_default: this.ifDefault
      }
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify(json)),
        false
      )
      // console.log("json",json)
      this.$axios
        .post('/web/member/address/edit', data)
        .then(res => {
          if(res.code==200){
            // console.log("修改成功",res)
            this.$message({
              message: this.$t(`${lang}.saveSuccess`),
              type: 'success'
            })

            this.$emit('editSuccess')

            if(this.editDefault && !this.ifDefault){
              this.$emit('anewDefault', that.using.id)
            }
          }else {
            throw new Error (res.message)
          }
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    keydown(){
      var reg = /^[0-9a-zA-Z\-]{1}$/;
      var k = this.using.zip_code.slice(-1);
      if(!reg.test(k)){
        this.using.zip_code = this.using.zip_code.slice(0,-1)
      }
    },
    mobileIpt(){
      if(this.pnN == '中国' || this.pnN == '中國' || this.pnN == 'China'){
        this.mobileMax = 11
      }else{
        this.mobileMax = 20
      }
    }
  }
}

</script>

<style lang="less" scoped="scoped">
.container{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1202;
}
.address {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 550px;
  height: 600px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  padding-top: 40px;
  .pink-title {
    display: flex;
    align-items: center;
    position: relative;
    width: 444px;
    margin: 0 auto;
    .pink-line {
      width: 2px;
      height: 16px;
      background: rgba(242, 155, 135, 1);
    }
    .title-name {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(242, 155, 135, 1);
      margin-left: 12px;
    }

    .quit{
      position: absolute;
      top: 50%;
      right: -10px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      border: 1px solid #666;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
    }
  }

  .form{
    width: 444px;
    height: 400px;
    margin: 40px auto;
    padding-right: 34px;

    .form-list{
      height: 30px;
      line-height: 30px;
      margin-bottom: 26px;

      .list-l{
        width: 100px;
        height: 100%;
        text-align: right;
        line-height: 30px;
      }

      .list-r{
        width: 322px;
        height: 100%;
        margin-left: 20px;
        border: 1px solid #ccc;
      }

      .width100{
        width: 100px;
        height: 100%;
        border: 1px solid #ccc;
        margin-left: 20px;
      }

      input{
        width: 100%;
        height: 100%;
        padding: 0 4px;
        box-sizing: border-box;

        &::placeholder{
          color: #bbb;
        }
      }

      .phone-json{
        position: relative;
        width: 100px;
        height: 100%;
        border: 1px solid #ccc;
        margin-left: 20px;

        select{
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9;
          width: 100%;
          height: 100%;
          opacity: 0;
        }

        .iconfont{
          position: absolute;
          top: 50%;
          right: 6px;
          z-index: 8;
          transform: translateY(-50%);
        }

        input{
          padding-right: 28px;
        }
      }

      .phone-box{
        width: 200px;
        height: 100%;
        border: 1px solid #ccc;
        margin-left: 20px;

        input{
          // text-align: center;
        }
      }

      .address-detail{
        width: 100%;
        height: 50px;
        padding: 4px;
        box-sizing: border-box;
      }
    }

    .detail{
      height: 50px;
    }

    .new-addr-address{
      .address-class{
        height: 30px;
        margin-bottom: 30px;

        .address-text{
          width: 100px;
          height: 100%;
          text-align: right;
          line-height: 30px;
        }
        .address-content{
          width: 100px;
          border: 1px solid #ccc;
          margin-left: 20px;
          overflow: hidden;
          position: relative;
          line-height: 30px;

          input{
            width: 100%;
            height: 100%;
            padding: 0 28px 0 4px;
            text-align: center;
          }

          select{
            position: absolute;
            z-index: 9;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
          }

          .iconfont{
            position: absolute;
            top: 50%;
            right: 6px;
            transform: translateY(-50%);
            z-index: 8;
          }
        }
      
      }
    }

    .last-child{
      height: 34px;
      margin-top: 50px;
      .default{
        height: 34px;
        line-height: 34px;
        margin-left: 40px;
        color: #999;
        cursor: pointer;
        .iconfont{
          font-size: 28px;
          color: #999;
          margin-top: 3px;
       }
       .setDefault{
         margin-left: 10px;
       }

       &.active{
         color: #333;
         .iconfont{
            color: #157f12;
         }
       }
      }

      .affirm{
        height: 34px;
        background-color: #f29b87;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        line-height: 34px;
        padding: 0 26px;
        cursor: pointer;

        &.active{
          background-color: #f29b87;
          color: #fff;
        }
      }
    }
 
  }

  // .margin70{
  //   margin-left: 20px;
  //   width: 70px !important;
  // }
}

.required{
  color: #f00;
  margin-right: 2px;
}

</style>
