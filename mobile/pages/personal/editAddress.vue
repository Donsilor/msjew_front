<template>
  <div class="edit-address">
    <div class="header">
      <span>
        {{ title }}
      </span>
      <i class="icon iconfont iconicon-test2" @click="goBack"></i>
    </div>
    <div class="mod">
      <div class="input-mod">
        <bdd-input
          v-model="name"
          :placeholder="lang.name"
          @input="check(1)"
        ></bdd-input>
      </div>
      <div :class="['error-message', { active: nameTrue }]">
        {{ nameText }}
      </div>

      <div class="input-mod">
        <bdd-input
          v-model="surname"
          :placeholder="lang.surname"
          @input="check(2)"
        ></bdd-input>
      </div>
      <div :class="['error-message', { active: surnameTrue }]">
        {{ surnameText }}
      </div>

      <div class="input-mod" @click="showSelect">
        <bdd-input
          v-model="mailbox"
          :placeholder="lang.mailbox"
          @input="check(3)"
        ></bdd-input>
      </div>
      <div :class="['error-message', { active: mailboxTrue }]">
        {{ mailboxText }}
      </div>

      <div class="test-mod" @click="showSwiperTap">
        {{ area }}
        <i class="icon iconfont iconxiala"></i>
      </div>
      <div :class="['error-message', { active: areaTrue }]">
        {{ areaText }}
      </div>

      <div class="input-mod">
        <bdd-input
          v-model="phone"
          :placeholder="lang.phone"
          @input="check(4)"
        ></bdd-input>
      </div>
      <div :class="['error-message', { active: phoneTrue }]">
        {{ phoneText }}
      </div>

      <div class="text-area">
        <textarea
          v-model="details"
          maxlength="300"
          :placeholder="lang.details"
          @keyup="check(5)"
        ></textarea>
      </div>
      <div :class="['error-message', { active: detailsTrue }]">
        {{ detailsText }}
      </div>

      <div class="test-mod" @click="showCountry">
        {{ country }}
        <i class="icon iconfont iconxiala"></i>
      </div>
      <div :class="['error-message', { active: countryTrue }]">
        {{ countryText }}
      </div>

      <div class="test-mod" @click="showProvince">
        {{ province }}
        <i class="icon iconfont iconxiala"></i>
      </div>

      <div class="test-mod" @click="showCity">
        {{ city }}
        <i class="icon iconfont iconxiala"></i>
      </div>

      <div class="input-mod">
        <bdd-input v-model="postal" :placeholder="lang.postal"></bdd-input>
      </div>

      <div class="btn-common btn-pink btn-address" @click="createAddress">
        {{ lang.storage }}
      </div>
      <div v-if="id" class="btn-common btn-address2" @click="deleteAddress(id)">
        {{ lang.deleteAddress }}
      </div>
      <swiper-tap
        ref="suitability1"
        :list="arealist"
        @clear="sureArea"
      ></swiper-tap>
      <swiper-tap
        ref="country"
        :list="countryList"
        @clear="countrySure"
      ></swiper-tap>
      <swiper-tap
        ref="province"
        :list="provinceList"
        @clear="provinceSure"
      ></swiper-tap>
      <swiper-tap ref="city" :list="cityList" @clear="citySure"></swiper-tap>
    </div>
  </div>
</template>

<script>
// import storage from 'good-storage'
import PhoneJson from '../../assets/countrycode.json'
import { Email, RegMobile, RegTelephone } from '../../assets/js/require-lee'
const storage = process.client ? require('good-storage').default : {}
export default {
  name: 'EditAddress',
  layout: 'no-bar',
  data() {
    return {
      lang: this.LANGUAGE.personal.editAddress,
      title: '',
      id: '',
      name: '',
      nameTrue: false,
      nameText: '',
      surname: '',
      surnameTrue: false,
      surnameText: '',
      mailbox: '',
      mailboxTrue: false,
      mailboxText: '',
      area: this.LANGUAGE.personal.editAddress.area,
      userTelCode: '+852',
      arealist: PhoneJson,
      areaTrue: false,
      areaText: '',
      phone: '',
      phoneTrue: false,
      phoneText: '',
      details: '',
      detailsTrue: false,
      detailsText: '',
      country: this.LANGUAGE.personal.editAddress.country,
      countryTrue: false,
      countryText: '',
      province: this.LANGUAGE.personal.editAddress.province,
      city: this.LANGUAGE.personal.editAddress.city,
      postal: '',
      countryList: [],
      countryId: '',
      provinceList: [],
      provinceId: '',
      cityList: [],
      cityId: '',
      isLogin: !!this.$store.state.token,
      isOver: true,
      postals: false
    }
  },
  created() {
    this.getinfo()
    this.getListOne()
    this.getArealist()
  },
  mounted() {},
  methods: {
    goBack() {
      if (this.$route.query.type === 'add') {
        if (
          this.name &&
          this.surname &&
          this.mailbox &&
          this.phone &&
          this.details &&
          this.country
        ) {
          const _this = this
          _this.$ConfirmBox({
            title: this.lang.tips,
            message: this.lang.text,
            buttons: [
              {
                text: this.lang.cancel,
                callback: () => {
                  console.log('点击了取消')
                }
              },
              {
                text: this.lang.course,
                callback: () => {
                  _this.$router.go(-1)
                }
              }
            ]
          })
        } else {
          this.$router.go(-1)
        }
      } else {
        this.$router.go(-1)
      }
    },
    showSwiperTap() {
      this.$refs.suitability1.show()
    },
    getArealist() {
      if (process.client) {
        const Cookies = process.client ? require('js-cookie') : undefined
        const language = Cookies.get('language')
        this.arealist = []
        PhoneJson.map((item, index) => {
          const o = {
            content: language === 'zh_TW' ? item.cn : item.en,
            phone_code: item.phone_code
          }
          this.arealist.push(o)
        })
      }
    },
    sureArea(val) {
      this.userTelCode = this.arealist[val.index].phone_code
      this.area =
        this.arealist[val.index].content +
        ' ' +
        this.arealist[val.index].phone_code
    },
    // 登录状态下修改地址信息回填
    getinfo() {
      if (process.server) {
        return
      }
      this.title = this.lang.header1
      const address = storage.get('myAdders', 0)
      if (this.$route.query.id) {
        this.title = this.lang.header2
        this.id = this.$route.query.id
        this.name = this.$route.query.firstName
        this.surname = this.$route.query.lastName
        this.userTelCode = this.$route.query.userTelCode
        this.phone = this.$route.query.userTel
        this.mailbox = this.$route.query.userMail
        this.country = this.$route.query.countryName
        this.countryId = this.$route.query.countryId
        this.province = this.$route.query.provinceName
        this.provinceId = this.$route.query.provinceId
        this.city = this.$route.query.cityName
        this.cityId = this.$route.query.cityId
        this.details = this.$route.query.address
        this.postal = this.$route.query.zipCode
      } else if (address && this.$route.query.type !== 'add') {
        this.title = this.lang.header2
        this.id = address.id
        this.name = address.name
        this.surname = address.surname
        this.userTelCode = address.userTelCode
        this.phone = address.phone
        this.mailbox = address.mailbox
        this.country = address.country
        this.countryId = address.countryId
        this.province = address.province
        this.provinceId = address.provinceId
        this.city = address.city
        this.cityId = address.cityId
        this.details = address.details
        this.postal = address.postal
      }
    },
    // 获取国家列表
    getListOne() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/myAccount/listArea`
        })
        .then(res => {
          _this.countryList = []
          for (let i = 0; i < res.length; i++) {
            const o = {
              id: res[i].areaId,
              content: res[i].areaName
            }
            _this.countryList.push(o)
          }
          _this.countryList.unshift({ id: '', content: this.lang.pleaseChoose })
          this.getListTwo()
          this.getListThree()
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 获取省列表
    getListTwo() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/myAccount/listArea`,
          params: {
            areaId: this.countryId
          }
        })
        .then(res => {
          _this.provinceList = []
          for (let i = 0; i < res.length; i++) {
            const o = {
              id: res[i].areaId,
              content: res[i].areaName
            }
            _this.provinceList.push(o)
          }
          _this.provinceList.unshift({
            id: '',
            content: this.lang.pleaseChoose
          })
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 获取市列表
    getListThree() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/myAccount/listArea`,
          params: {
            areaId: this.provinceId
          }
        })
        .then(res => {
          _this.cityList = []
          for (let i = 0; i < res.length; i++) {
            const o = {
              id: res[i].areaId,
              content: res[i].areaName
            }
            _this.cityList.push(o)
          }
          _this.cityList.unshift({ id: '', content: this.lang.pleaseChoose })
        })
        .catch(err => {
          console.log(err)
        })
    },
    showCountry() {
      this.countryId = ''
      this.country = this.lang.country
      this.provinceList = []
      this.provinceId = ''
      this.province = this.lang.province
      this.cityList = []
      this.cityId = ''
      this.city = this.lang.city
      if (this.countryList.length > 1) {
        this.$refs.country.show()
      }
    },
    countrySure(val) {
      this.countryId = this.countryList[val.index].id
      this.country = this.countryList[val.index].content
      this.getListTwo()
      this.check(6)
    },
    showProvince() {
      this.provinceId = ''
      this.province = this.lang.province
      this.cityList = []
      this.cityId = ''
      this.city = this.lang.city
      if (!this.countryId) {
        this.$toast.show(this.lang.country2)
        return
      }
      if (this.provinceList.length > 1) {
        this.$refs.province.show()
      }
    },
    provinceSure(val) {
      this.provinceId = this.provinceList[val.index].id
      this.province = this.provinceList[val.index].content
      this.getListThree()
    },
    showCity() {
      this.cityId = ''
      this.city = this.lang.city
      if (!this.provinceId) {
        this.$toast.show(this.lang.province2)
        return
      }
      if (this.cityList.length > 1) {
        this.$refs.city.show()
      }
    },
    // 刪除地址
    deleteAddress(id) {
      const _this = this
      _this
        .$axios({
          method: 'post',
          url: `/wap/myAccount/delMyAddress`,
          params: {
            addressId: id
          }
        })
        .then(res => {
          this.$toast.show(this.lang.toast1)
          setTimeout(() => {
            _this.$router.go(-1)
          }, 2000)
        })
        .catch(err => {
          this.$toast.show(err.message)
        })
    },
    citySure(val) {
      this.cityId = this.cityList[val.index].id
      this.city = this.cityList[val.index].content
    },
    check(val) {
      this.nameTrue = this.surnameTrue = this.mailboxTrue = this.phoneTrue = this.detailsTrue = this.countryTrue = false
      if ((val === 1 || val === 0) && this.name === '') {
        this.nameText = this.lang.nameText1
        this.nameTrue = true
        return
      }
      if ((val === 1 || val === 0) && this.name.length > 20) {
        this.nameText = this.lang.nameText2
        this.nameTrue = true
      }
      if ((val === 2 || val === 0) && this.surname === '') {
        this.surnameText = this.lang.surnameText1
        this.surnameTrue = true
        return
      }
      if ((val === 2 || val === 0) && this.surname.length > 20) {
        this.surnameText = this.lang.surnameText2
        this.surnameTrue = true
        return
      }
      if ((val === 3 || val === 0) && this.mailbox === '') {
        this.mailboxText = this.lang.mailboxText1
        this.mailboxTrue = true
        return
      }
      if ((val === 3 || val === 0) && !Email.test(this.mailbox)) {
        this.mailboxText = this.lang.mailboxText2
        this.mailboxTrue = true
        return
      }
      if ((val === 4 || val === 0) && this.phone === '') {
        this.phoneText = this.lang.phoneText1
        this.phoneTrue = true
        return
      }
      if (
        (val === 4 || val === 0) &&
        !RegMobile.test(this.phone) &&
        !RegTelephone.test(this.phone)
      ) {
        this.phoneText = this.lang.phoneText2
        this.phoneTrue = true
        return
      }
      if ((val === 5 || val === 0) && this.details === '') {
        this.detailsText = this.lang.detailsText
        this.detailsTrue = true
        return
      }
      if ((val === 6 || val === 0) && this.countryId === '') {
        this.countryText = this.lang.countryText
        this.countryTrue = true
      }
    },
    createAddress() {
      this.check(0)
      if (
        this.nameTrue === false &&
        this.surnameTrue === false &&
        this.mailboxTrue === false &&
        this.phoneTrue === false &&
        this.detailsTrue === false &&
        this.countryTrue === false &&
        this.isOver === true
      ) {
        this.isOver = false
        const json = {
          id: this.$route.query.id ? this.$route.query.id : null,
          firstName: this.name,
          lastName: this.surname,
          userTelCode: this.userTelCode,
          userTel: this.phone,
          userMail: this.mailbox,
          countryId: this.countryId,
          provinceId: this.provinceId,
          cityId: this.cityId,
          address: this.details,
          zipCode: this.postal
        }
        const data = JSON.parse(JSON.stringify(json))
        if (this.isLogin) {
          const _this = this
          _this
            .$axios({
              method: 'post',
              url: `/wap/myAccount/saveUserAddress`,
              params: data
            })
            .then(res => {
              this.$toast.show(this.lang.toast2)
              setTimeout(() => {
                this.$router.go(-1)
                this.isOver = true
              }, 3000)
            })
            .catch(err => {
              this.isOver = true
              console.log(err)
            })
        } else {
          const json2 = {
            id: this.$route.query.id ? this.$route.query.id : null,
            name: this.name,
            surname: this.surname,
            userTelCode: this.userTelCode,
            phone: this.phone,
            mailbox: this.mailbox,
            country: this.country,
            countryId: this.countryId,
            province: this.province,
            provinceId: this.provinceId,
            city: this.city,
            cityId: this.cityId,
            details: this.details,
            postal: this.postal
          }
          const data2 = JSON.parse(JSON.stringify(json2))
          storage && storage.set('myAdders', data2)
          setTimeout(() => {
            this.$router.go(-1)
            this.isOver = true
          }, 1500)
        }
      }
    },
    showSelect() {
      console.log('6767')
    }
  }
}
</script>

<style scoped lang="less">
.edit-address {
  padding: 0 20px;
  .header {
    span {
      display: inline-block;
      height: 55px;
      margin: 0 auto;
      font-size: 16px;
      line-height: 55px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    .iconicon-test2 {
      float: right;
      margin-top: 18px;
      font-size: 16px;
      color: #999999;
    }
  }
  .mod {
    .input-mod {
      display: inline-block;
      padding: 10px 0px;
      width: 100%;

      .input-box {
        font-size: 15px;
        input {
          font-size: 15px;
        }
      }
    }
    .error-message {
      display: none;
      font-size: 12px;
      text-align: left;
      color: #ed4949;
    }
    .active {
      display: block;
    }
    .test-mod {
      display: inline-block;
      width: 100%;
      height: 40px;
      padding: 0 14px;
      margin: 10px 0;
      text-align: left;
      background: rgba(249, 249, 249, 1);
      border: 1px solid rgba(187, 187, 187, 1); /*no*/
      font-size: 15px;
      line-height: 40px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      .iconxiala {
        float: right;
      }
    }
    .text-area {
      width: 100%;
      height: 82px;
      margin: 10px 0;
      padding: 10px 12px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(187, 187, 187, 1); /*no*/
      font-size: 15px;
      font-weight: 400;
      color: #333333;
      textarea {
        color: #333333;
        width: 100%;
      }
      textarea::-webkit-input-placeholder {
        color: #999999;
      }
      textarea:-moz-placeholder {
        color: #999999;
      }
      textarea::-moz-placeholder {
        color: #999999;
      }
      textarea::-ms-input-placeholder {
        color: #999999;
      }
    }
    .btn-address {
      width: 100%;
      margin-top: 30px;
    }
    .btn-address2 {
      width: 100%;
      margin: 20px 0 50px;
      border: 1px solid rgba(221, 221, 221, 1); /*no*/
      color: #999999;
    }
  }
}
</style>
