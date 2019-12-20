<template>
  <div class="address">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.address`) }}</div>
    </div>
    <div class="addr-blocks">
      <div
        v-for="(a, index) in address"
        :key="index"
        :class="{ 'addr-active': a.isDefault === 1 }"
        class="addr-block"
      >
        <div class="addr-title">
          <div>{{ a.countryName }}{{ a.provinceName }}-{{ a.cityName }}</div>
        </div>
        <div class="addr-user">
          <div>{{ a.firstName }}{{ a.lastName }}</div>
          <div>{{ $t(`${lang}.get`) }}</div>
        </div>
        <div class="addr-address">
          {{ a.countryName }}-{{ a.provinceName }}{{ a.cityName
          }}{{ a.address }}
        </div>
        <div class="addr-user-phone">
          <div>{{ a.userTelCode }}</div>
          <div>{{ a.userTel }}</div>
        </div>
        <div class="font-size-14 color-333">{{ a.zipCode }}</div>
        <div class="font-size-14 color-333">{{ a.userMail }}</div>
        <div
          v-if="a.isDefault === 1"
          class="font-size-14"
          style="color: #f29b87; margin-top: 6px;"
        >
          {{ $t(`${lang}.mrAddress`) }}
        </div>
        <div class="addr-board" @click="changeDefaultAddress(a.id)" />
        <i
          class="iconfont iconlajitong"
          @click="
            isDel = true
            delId = a.id
          "
        />
        <div class="addr-btn" @click="changeAddress(a)">
          {{ $t(`${lang}.change`) }}
        </div>
        <img
          v-show="a.isDefault === 1"
          src="../../../static/personal/account/address-bar.png"
        />
      </div>
    </div>
    <div class="addr-mid dle-btn">
      <div v-show="!isShow" class="middle-btn-show" @click="newAddress()">
        + {{ $t(`${lang}.newAddress`) }}
      </div>
      <div v-show="isShow" class="middle-btn-title">
        <span v-show="isNew" class="middle-btn-title-name">{{
          $t(`${lang}.newAddress`)
        }}</span
        ><span v-show="isEdit" class="middle-btn-title-name">{{
          $t(`${lang}.editAddress`)
        }}</span
        ><span class="middle-btn-title-hide" @click="resetAddress()">{{
          $t(`${lang}.show-hey`)
        }}</span>
      </div>
      <div v-show="isNew && isShow" class="new-addr">
        <div class="new-addr-name">
          <div>
            <input
              v-model="using.lastName"
              :placeholder="$t(`${lang}.firstName`) + '*'"
              type="text"
            />
          </div>

          <div>
            <input
              v-model="using.firstName"
              :placeholder="$t(`${lang}.lastName`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-email">
          <div>
            <input
              v-model="using.userMail"
              :placeholder="$t(`${lang}.addEmail`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-email">
          <div>
            <input
              v-model="checkEmail"
              :placeholder="$t(`${lang}.sureEmail`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-phone">
          <div>
            <input :value="pnN + ' ' + phoneNum.phone_code" type="text" />
            <select v-model="phoneNum">
              <option v-for="(p, index) in phoneJson" :key="index" :value="p">{{
                psn ? p.en : p.cn
              }}</option>
            </select>
            <i class="iconfont iconxiala" />
          </div>
          <div>
            <input
              v-model="using.userTel"
              :placeholder="$t(`${lang}.phone`) + '*'"
              type="tel"
            />
          </div>
        </div>
        <div class="new-addr-address">
          <div>
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
          <div>
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
          <div>
            <input :value="city.areaName" type="text" />
            <select v-model="city">
              <option v-for="(c, index) in cityList" :key="index" :value="c">{{
                c.areaName
              }}</option>
            </select>
            <i class="iconfont iconxiala" />
          </div>
        </div>
        <div class="new-addr-email">
          <div>
            <input
              v-model="using.address"
              :placeholder="$t(`${lang}.longAddress`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-email">
          <div>
            <input
              v-model="using.zipCode"
              :placeholder="$t(`${lang}.zip`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-btn" @click="createAddress()">
          {{ $t(`${lang}.save`) }}
        </div>
      </div>
      <div v-show="isEdit && isShow" class="new-addr">
        <div class="new-addr-name">
          <div>
            <input
              v-model="clone.lastName"
              :placeholder="$t(`${lang}.firstName`) + '*'"
              type="text"
            />
          </div>

          <div>
            <input
              v-model="clone.firstName"
              :placeholder="$t(`${lang}.lastName`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-email">
          <div>
            <input
              v-model="clone.userMail"
              :placeholder="$t(`${lang}.addEmail`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-email">
          <div>
            <input
              v-model="checkEmail"
              :placeholder="$t(`${lang}.sureEmail`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-phone">
          <div>
            <input :value="pnN + ' ' + phoneNum.phone_code" type="text" />
            <select v-model="phoneNum">
              <option v-for="(p, index) in phoneJson" :key="index" :value="p">{{
                psn ? p.en : p.cn
              }}</option>
            </select>
            <i class="iconfont iconxiala" />
          </div>
          <div>
            <input
              v-model="using.userTel"
              :placeholder="$t(`${lang}.phone`) + '*'"
              type="tel"
            />
          </div>
        </div>
        <div class="new-addr-address">
          <div>
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
          <div>
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
          <div>
            <input :value="city.areaName" type="text" />
            <select v-model="city">
              <option v-for="(c, index) in cityList" :key="index" :value="c">{{
                c.areaName
              }}</option>
            </select>
            <i class="iconfont iconxiala" />
          </div>
        </div>
        <div class="new-addr-email">
          <div>
            <input
              v-model="clone.address"
              :placeholder="$t(`${lang}.longAddress`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-email">
          <div>
            <input
              v-model="clone.zipCode"
              :placeholder="$t(`${lang}.zip`) + '*'"
              type="text"
            />
          </div>
        </div>
        <div class="new-addr-btn" @click="changeSave()">
          {{ $t(`${lang}.save`) }}
        </div>
      </div>
    </div>
    <message-box
      v-show="isDel"
      :title="$t(`${lang}.tips`)"
      :message="$t(`${lang}.deleteConfirm`)"
      type="two"
      @sure="deleteAddress"
      @cancel="isDel = false"
    />
  </div>
</template>

<script>
import Address from '@/assets/js/address.js'
import { Email, RegMobile, RegTelephone } from '@/assets/js/require-lee.js'
const lang = 'personal.account'
export default {
  name: 'Index',
  mixins: [Address],
  data() {
    return {
      lang,
      address: [],
      isDel: false,
      delId: ``,
      isEdit: false,
      isNew: true,
      isShow: false,
      using: {
        firstName: ``,
        lastName: ``,
        userTelCode: ``,
        userTel: ``,
        userMail: ``,
        countryId: ``,
        provinceId: ``,
        cityId: ``,
        address: ``,
        zipCode: ``
      },
      clone: {
        firstName: ``,
        lastName: ``,
        userTelCode: ``,
        userTel: ``,
        userMail: ``,
        countryId: ``,
        provinceId: ``,
        cityId: ``,
        address: ``,
        zipCode: ``
      },
      checkEmail: ``
    }
  },
  computed: {
    pnN() {
      if (this.$store.state.language === 'en_US') {
        return this.phoneNum.en
      }
      return this.phoneNum.cn
    },
    psn() {
      return this.$store.state.language === 'en_US'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios
        .get('/web/myAccount/getMyAddress')
        .then(res => {
          // console.log('addr===>', res)
          this.address = res
          // this.isShow = false
          // this.isDel = false
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    changeAddress(obj) {
      this.resetAddress()
      this.clone = this.$helpers.cloneObject(obj)
      this.checkEmail = obj.userMail
      const code = obj.userTelCode.split('+').reverse()
      JSON.parse(JSON.stringify(this.phoneJson)).forEach(o => {
        if (o.phone_code === '+' + code[0]) this.phoneNum = o
      })
      this.setAddress(obj).then(res => {
        // console.log(res)
        if (!res) {
          this.isShow = !this.isShow
          this.isNew = false
          this.isEdit = true
        }
        // this.checkEmail = res.userMail;
      })
    },
    changeDefaultAddress(id) {
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ defaultAddressId: id })),
        false
      )
      this.$axios
        .post('/web/myAccount/updateDefaultAddress', data)
        .then(res => {
          // console.log(res)
          this.getData()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    newAddress() {
      this.resetAddress()
      this.isShow = !this.isShow
      this.isNew = true
      this.isEdit = false
    },
    resetAddress() {
      this.isShow = false
      this.isNew = true
      this.isEdit = false
      this.using = {
        firstName: ``,
        lastName: ``,
        userTelCode: ``,
        userTel: ``,
        userMail: ``,
        countryId: ``,
        provinceId: ``,
        cityId: ``,
        address: ``,
        zipCode: ``
      }
      this.clone = {
        firstName: ``,
        lastName: ``,
        userTelCode: ``,
        userTel: ``,
        userMail: ``,
        countryId: ``,
        provinceId: ``,
        cityId: ``,
        address: ``,
        zipCode: ``
      }
      this.checkEmail = ``
      this.delId = ``
    },
    createAddress() {
      if (this.using.firstName === '') {
        this.$message.error(this.$t(`${lang}.wip1`))
        return
      }
      if (this.using.firstName.length > 20) {
        this.$message.error(this.$t(`${lang}.wip2`))
        return
      }
      if (this.using.lastName === '') {
        this.$message.error(this.$t(`${lang}.wip3`))
        return
      }
      if (this.using.lastName.length > 20) {
        this.$message.error(this.$t(`${lang}.wip4`))
        return
      }
      if (this.using.userMail === '') {
        this.$message.error(this.$t(`${lang}.wip5`))
        return
      }
      if (!Email.test(this.using.userMail)) {
        this.$message.error(this.$t(`${lang}.wip6`))
        return
      }
      if (this.using.userMail !== this.checkEmail) {
        this.$message.error(this.$t(`${lang}.wip7`))
        return
      }
      if (this.using.userTel === '') {
        this.$message.error(this.$t(`${lang}.wip8`))
        return
      }
      if (
        !RegMobile.test(this.using.userTel) &&
        !RegTelephone.test(this.using.userTel)
      ) {
        this.$message.error(this.$t(`${lang}.wip9`))
        return
      }
      if (!this.country.areaId) {
        this.$message.error(this.$t(`${lang}.wip10`))
        return false
      }
      if (this.using.address === '') {
        this.$message.error(this.$t(`${lang}.wip11`))
        return
      }
      const json = {
        firstName: this.using.lastName,
        lastName: this.using.firstName,
        userTelCode: this.phoneNum.phone_code,
        userTel: this.using.userTel,
        userMail: this.using.userMail,
        countryId: this.country.areaId,
        provinceId: this.province.areaId,
        cityId: this.city.areaId,
        address: this.using.address,
        zipCode: this.using.zipCode
      }
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify(json)),
        false
      )
      this.$axios
        .post('/web/myAccount/saveUserAddress', data)
        .then(res => {
          // console.log(res)
          this.getData()
          this.resetAddress()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    changeSave() {
      if (this.clone.firstName === '') {
        this.$message.error(this.$t(`${lang}.wip1`))
        return
      }
      if (this.clone.firstName.length > 20) {
        this.$message.error(this.$t(`${lang}.wip2`))
        return
      }
      if (this.clone.lastName === '') {
        this.$message.error(this.$t(`${lang}.wip3`))
        return
      }
      if (this.clone.lastName.length > 20) {
        this.$message.error(this.$t(`${lang}.wip4`))
        return
      }
      if (this.clone.userMail === '') {
        this.$message.error(this.$t(`${lang}.wip5`))
        return
      }
      if (!Email.test(this.clone.userMail)) {
        this.$message.error(this.$t(`${lang}.wip6`))
        return
      }
      if (this.clone.userMail !== this.checkEmail) {
        this.$message.error(this.$t(`${lang}.wip7`))
        return
      }
      if (this.clone.userTel === '') {
        this.$message.error(this.$t(`${lang}.wip8`))
        return
      }
      if (
        !RegMobile.test(this.clone.userTel) &&
        !RegTelephone.test(this.clone.userTel)
      ) {
        this.$message.error(this.$t(`${lang}.wip9`))
        return
      }
      if (!this.country.areaId) {
        this.$message.error(this.$t(`${lang}.wip10`))
        return false
      }
      if (this.clone.address === '') {
        this.$message.error(this.$t(`${lang}.wip11`))
        return
      }
      const json = {
        id: this.clone.id,
        firstName: this.clone.lastName,
        lastName: this.clone.firstName,
        userTelCode: this.phoneNum.phone_code,
        userTel: this.clone.userTel,
        userMail: this.clone.userMail,
        countryId: this.country.areaId,
        provinceId: this.province.areaId,
        cityId: this.city.areaId,
        address: this.clone.address,
        zipCode: this.clone.zipCode
      }
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify(json)),
        false
      )
      this.$axios
        .post('/web/myAccount/saveUserAddress', data)
        .then(res => {
          // console.log(res)
          this.getData()
          this.resetAddress()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    deleteAddress() {
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ addressId: this.delId })),
        false
      )
      this.$axios
        .post('/web/myAccount/delMyAddress', data)
        .then(res => {
          // console.log(res)
          this.getData()
          this.resetAddress()
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
          this.isDel = false
        })
    }
  }
}
</script>

<style scoped lang="less">
.address {
  width: 100%;
  padding: 30px 0;
  .pink-title {
    display: flex;
    align-items: center;
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
      margin-left: 28px;
    }
  }
  .addr-blocks {
    width: 100%;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    flex-wrap: wrap;
    padding: 40px 28px;
    .addr-block {
      position: relative;
      width: 430px;
      height: 250px;
      padding: 25px 30px 0;
      margin: 0 30px 20px 0;
      border: 1px solid rgba(230, 230, 230, 1);
      box-sizing: border-box;
      .addr-title {
        display: flex;
        align-items: flex-end;
        margin-bottom: 10px;
        div {
          font-size: 20px;
          color: #333;
        }
        div:nth-child(2) {
          font-size: 14px;
          margin-left: 7px;
        }
      }
      .addr-user {
        display: flex;
        font-size: 22px;
        align-items: center;
        color: #333;
        margin-bottom: 10px;
        div:nth-child(1) {
          min-height: 22px;
          max-height: 22 * 2px;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        div:nth-child(2) {
          font-size: 16px;
          margin-left: 10px;
        }
      }
      .addr-address {
        color: #333;
        font-size: 14px;
        /*width: 220px;*/
        max-height: 16 * 2px;
        min-height: 16px;
        line-height: 16px;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .addr-user-phone {
        display: flex;
        align-items: flex-end;
        font-family: twCenMt;
        font-size: 18px;
        color: #333;
        margin-bottom: 5px;
        div:nth-child(1) {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .addr-board {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 10;
      }
      .iconlajitong {
        position: absolute;
        bottom: 36px;
        right: 28px;
        display: block;
        font-size: 21px;
        color: #999;
        z-index: 39;
        cursor: pointer;
      }
      .addr-btn {
        position: absolute;
        width: 50px;
        height: 22px;
        line-height: 20px;
        border: 1px solid #aa8a7b;
        border-radius: 4px;
        background: rgba(251, 247, 245, 1);
        color: #aa8a7b;
        text-align: center;
        cursor: pointer;
        top: 30px;
        right: 28px;
        z-index: 40;
      }
      img {
        display: block;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
    .addr-active {
      border: 1px solid rgba(212, 196, 188, 1);
    }
  }
  .addr-middle-btn {
    padding: 0 28px;
    .middle-btn-show {
      cursor: pointer;
      display: inline-block;
    }
    .middle-btn-title {
      width: 407px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .middle-btn-title-name {
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(242, 155, 135, 1);
      }
      .middle-btn-title-hide {
        cursor: pointer;
        font-size: 16px;
        line-height: 16px;
      }
    }
  }
  .new-addr {
    min-height: 400px;
    .new-addr-name {
      display: flex;
      width: 407px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      div {
        width: 190px;
        height: 37px;
        border-bottom: 1px solid rgba(153, 153, 153, 1);
        input {
          width: 100%;
          height: 36px;
          line-height: 36px;
          -webkit-appearance: none;
          outline: 0;
          border: 0;
          padding: 0;
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .new-addr-email {
      width: 407px;
      height: 37px;
      border-bottom: 1px solid rgba(153, 153, 153, 1);
      margin-bottom: 10px;
      input {
        width: 100%;
        height: 36px;
        line-height: 36px;
        -webkit-appearance: none;
        outline: 0;
        border: 0;
        padding: 0;
        font-size: 14px;
        color: #999;
      }
    }
    .new-addr-phone {
      display: flex;
      width: 407px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      div {
        position: relative;
        height: 37px;
        border-bottom: 1px solid rgba(153, 153, 153, 1);
        input {
          width: 100%;
          height: 36px;
          line-height: 36px;
          -webkit-appearance: none;
          outline: 0;
          border: 0;
          padding: 0;
          font-size: 14px;
          color: #999;
        }
      }
      div:nth-child(1) {
        width: 139px;
        select {
          position: absolute;
          z-index: 9;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      div:nth-child(2) {
        width: 228px;
      }
    }
    .new-addr-address {
      display: flex;
      width: 407px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      div {
        position: relative;
        width: 109px;
        height: 37px;
        border-bottom: 1px solid rgba(153, 153, 153, 1);
        input {
          width: 100%;
          height: 36px;
          line-height: 36px;
          -webkit-appearance: none;
          outline: 0;
          border: 0;
          padding: 0;
          font-size: 14px;
          color: #999;
        }
        select {
          position: absolute;
          z-index: 9;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
    .new-addr-btn {
      width: 190px;
      height: 40px;
      line-height: 40px;
      color: #8b766c;
      border: 1px solid #8b766c;
      text-align: center;
      margin: 40px 0 190px;
      cursor: pointer;
    }
    .iconxiala {
      position: absolute;
      font-size: 12px;
      width: 12px;
      height: 12px;
      line-height: 12px;
      display: block;
      color: #999;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
