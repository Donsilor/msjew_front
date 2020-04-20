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
        :class="{ 'addr-active': a.is_default === 1 }"
        class="addr-block"
      >
        <div class="addr-title">
          <div>{{ a.country_name }}{{ a.province_name }}-{{ a.city_name }}</div>
        </div>
        <div class="addr-user">
          <div>{{ a.realname }}</div>
          <div>{{ $t(`${lang}.get`) }}</div>
        </div>
        <div class="addr-address">
          <!-- {{ a.address_name }}{{ a.address_details }} -->
           {{ a.country_name }}-{{ a.province_name }}{{ a.city_name
          }}{{ a.address_details }}
        </div>
        <div class="addr-user-phone">
          <div>{{ a.mobile_code }}</div>
          <div>{{ a.mobile }}</div>
        </div>
        <div class="font-size-14 color-333">{{ a.zip_code }}</div>
        <div class="font-size-14 color-333">{{ a.email }}</div>
        <div
          v-if="a.is_default === 1"
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
          v-show="a.is_default === 1"
          src="../../../static/personal/account/address-bar.png"
        />
      </div>
    </div>
    <div class="addr-mid dle-btn">
      <div v-show="!isShow" style="cursor: pointer;" class="middle-btn-show" @click="newAddress()">
        + {{ $t(`${lang}.newAddress`) }}
      </div>
      <div v-show="isShow"  class="middle-btn-title">
        <span v-show="isNew" style="cursor: pointer;" class="middle-btn-title-name">{{
          $t(`${lang}.newAddress`)
        }}</span
        ><span v-show="isEdit" style="cursor: pointer;" class="middle-btn-title-name">{{
          $t(`${lang}.editAddress`)
        }}</span
        ><span class="middle-btn-title-hide" style="cursor: pointer;margin-left:50px;" @click="resetAddress()">{{
          $t(`${lang}.show-hey`)
        }}</span>
      </div>
      <!-- 中文简体 -->
      <div v-if="language==='zh_CN'">
        <div v-show="isNew && isShow" class="new-addr">
          <div class="new-addr-name">

            <div>
              <input
                v-model="using.lastname"
                :placeholder="$t(`${lang}.lastName`) + '*'"
                type="text"
                maxlength="30"
              />
            </div>

             <div>
              <input
                v-model="using.firstname"
                :placeholder="$t(`${lang}.firstName`) + '*'"
                type="text"
                maxlength="30"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="using.email"
                :placeholder="$t(`${lang}.addEmail`)"
                type="text"
                maxlength="60"
              />
            </div>
          </div>
          <div class="new-addr-phone">
            <div>
              <input :value="pnN + ' ' + phoneNum.phone_code" type="text" />
              <select v-model="phoneNum">
                <option v-for="(p, index) in phoneJson" :key="index" :value="p">{{
                  psn ? p.en :psn ? p.cn :p.zh
                }}</option>
              </select>
              <i class="iconfont iconxiala" />
            </div>
            <div>
              <input
                v-model="using.mobile"
                :placeholder="$t(`${lang}.phone`) + '*'"
                type="tel"
                :maxlength="mobileMax"
                @input="mobileIpt"
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
                v-model="using.address_details"
                :placeholder="$t(`${lang}.longAddress`) + '*'"
                type="text"
                maxlength="300"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="using.zip_code"
                :placeholder="$t(`${lang}.zip`) + '*'"
                type="text"
                maxlength="11"
                @input="keydown"
              />
            </div>
          </div>
          <div class="new-addr-btn" @click="createAddress1()">
            {{ $t(`${lang}.save`) }}
          </div>
        </div>
        <div v-show="isEdit && isShow" class="new-addr">
          <div class="new-addr-name">
            <div>
              <input
                v-model="clone.lastname"
                :placeholder="$t(`${lang}.lastName`) + '*'"
                type="text"
                maxlength="30"
              />
            </div>

            <div>
              <input
                v-model="clone.firstname"
                :placeholder="$t(`${lang}.firstName`) + '*'"
                type="text"
                maxlength="30"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="clone.email"
                :placeholder="$t(`${lang}.addEmail`)"
                type="text"
                maxlength="60"
              />
            </div>
          </div>
          <div class="new-addr-phone">
            <div>
              <input :value="pnN + ' ' + phoneNum.phone_code" type="text" />
              <select v-model="phoneNum">
                <option v-for="(p, index) in phoneJson" :key="index" :value="p">{{
                  psn ? p.en :psn ? p.cn :p.zh
                }}</option>
              </select>
              <i class="iconfont iconxiala" />
            </div>
            <div>
              <input
                v-model="clone.mobile"
                :placeholder="$t(`${lang}.phone`) + '*'"
                type="tel"
                :maxlength="mobileMax"
                @input="mobileIpt"
              />
            </div>
          </div>
          <div class="new-addr-address">
            <div>
              <input :value="country.areaName" type="text" />
              <select v-model="country" @change="getListTwo">
                <option
                  v-for="(c, index) in countryList.slice(2,3)"
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
                v-model="clone.address_details"
                :placeholder="$t(`${lang}.longAddress`) + '*'"
                type="text"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="clone.zip_code"
                :placeholder="$t(`${lang}.zip`) + '*'"
                type="text"
                maxlength="11"
                @input="keydown"
              />
            </div>
          </div>
          <div class="new-addr-btn" @click="changeSave()">
            {{ $t(`${lang}.save`) }}
          </div>
        </div>
      </div>
      <!-- 中文繁体 -->
      <div v-else>
        <div v-show="isNew && isShow" class="new-addr">
          <div class="new-addr-name">
            <div>
              <input
                v-model="using.firstname"
                :placeholder="$t(`${lang}.firstName`) + '*'"
                type="text"
                maxlength="30"
              />
            </div>

            <div>
              <input
                v-model="using.lastname"
                :placeholder="$t(`${lang}.lastName`) + '*'"
                type="text"
                maxlength="30"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="using.email"
                :placeholder="$t(`${lang}.addEmail`) + '*'"
                type="text"
                maxlength="60"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="checkEmail"
                :placeholder="$t(`${lang}.sureEmail`) + '*'"
                type="text"
                maxlength="60"
              />
            </div>
          </div>
          <div class="new-addr-phone">
            <div>
              <input :value="pnN + ' ' + phoneNum.phone_code" type="text" />
              <select v-model="phoneNum">
                <option v-for="(p, index) in phoneJson" :key="index" :value="p">{{
                  psn ? p.en :psn ? p.cn :p.zh
                }}</option>
              </select>
              <i class="iconfont iconxiala" />
            </div>
            <div>
              <input
                v-model="using.mobile"
                :placeholder="$t(`${lang}.phone`) + '*'"
                type="tel"
                :maxlength="mobileMax"
                @input="mobileIpt"
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
                v-model="using.address_details"
                :placeholder="$t(`${lang}.longAddress`) + '*'"
                type="text"
                maxlength="300"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="using.zip_code"
                :placeholder="$t(`${lang}.zip`) + '*'"
                type="text"
                maxlength="11"
                @input="keydown"
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
                v-model="clone.lastname"
                :placeholder="$t(`${lang}.firstName`) + '*'"
                type="text"
                maxlength="30"
              />
            </div>

            <div>
              <input
                v-model="clone.firstname"
                :placeholder="$t(`${lang}.lastName`) + '*'"
                type="text"
                maxlength="30"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="clone.email"
                :placeholder="$t(`${lang}.addEmail`) + '*'"
                type="text"
                maxlength="60"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="checkEmail"
                :placeholder="$t(`${lang}.sureEmail`) + '*'"
                type="text"
                maxlength="60"
              />
            </div>
          </div>
          <div class="new-addr-phone">
            <div>
              <input :value="pnN + ' ' + phoneNum.phone_code" type="text" />
              <select v-model="phoneNum">
                <option v-for="(p, index) in phoneJson" :key="index" :value="p">{{
                  psn ? p.en :psn ? p.cn :p.zh
                }}</option>
              </select>
              <i class="iconfont iconxiala" />
            </div>
            <div>
              <input
                v-model="clone.mobile"
                :placeholder="$t(`${lang}.phone`) + '*'"
                type="tel"
                :maxlength="mobileMax"
                @input="mobileIpt"
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
                v-model="clone.address_details"
                :placeholder="$t(`${lang}.longAddress`) + '*'"
                type="text"
                maxlength="300"
              />
            </div>
          </div>
          <div class="new-addr-email">
            <div>
              <input
                v-model="clone.zip_code"
                :placeholder="$t(`${lang}.zip`) + '*'"
                type="text"
                maxlength="11"
                @input="keydown"
              />
            </div>
          </div>
          <div class="new-addr-btn" @click="changeSave()">
            {{ $t(`${lang}.save`) }}
          </div>
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
import { Email, RegMobile, RegTelephone, RegMobiles } from '@/assets/js/require-lee.js'
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
      clone: {
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
      isDefault:{},
      mobileMax: 20
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
  created() {
    this.getData()
  },
  mounted(){
    console.log("ffff",this.phoneNum.phone_code)
    this.language = this.getCookie('language')
  },
  methods: {
    // 查询cookie
    getCookie(cname) {
      const name = cname + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    // 获取地址
    getData() {
      this.$axios
        .get('/web/member/address')
        .then(res => {
          // if(res.code==200){
            // console.log('获取地址成功', res)
            this.address = res.data
          // }
          // else {
          //   throw new Error (res.message)
          // }
          // console.log("地址",this.address)
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
    // 修改地址
    changeAddress(obj) {
      // console.log("ddasdas",obj)
      this.resetAddress()
      this.clone = this.$helpers.cloneObject(obj)
      this.checkEmail = obj.email
      // console.log("email",this.checkEmail)
      const code = obj.mobile_code.split('+').reverse()
      JSON.parse(JSON.stringify(this.phoneJson)).forEach(o => {
        if (o.phone_code === '+' + code[0]) this.phoneNum = o
      })
      // if(this.language==='zh_CN'){
      //   this.email=obj.email
      // }else{
      //   this.checkEmail = obj.email
      //   const code = obj.userTelCode.split('+').reverse()
      //   JSON.parse(JSON.stringify(this.phoneJson)).forEach(o => {
      //     if (o.phone_code === '+' + code[0]) this.phoneNum = o
      //   })
      // }
      this.setAddress(obj).then(res => {
        if (!res) {
          this.isShow = !this.isShow
          this.isNew = false
          this.isEdit = true
        }
        // this.checkEmail = res.userMail;
      })
    },
    // 修改默认地址
    changeDefaultAddress(id) {
      // console.log("aaa",id)
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ id:id,is_default: 1 })),
        false
      )
      this.$axios
        .post('/web/member/address/edit',data)
        .then(res => {
          // if(res.code==200){
            // console.log("修改默认地址成功",res)
            this.getData()
          // }else {
          //   throw new Error (res.message)
          // }
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
    // 新建地址
    createAddress() {
      // console.log("this.u",this.using)
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
      if (this.using.email === '') {
        this.$message.error(this.$t(`${lang}.wip5`))
        return
      }
      if (!Email.test(this.using.email)) {
        this.$message.error(this.$t(`${lang}.wip6`))
        return
      }
      if (this.using.email !== this.checkEmail) {
        this.$message.error(this.$t(`${lang}.wip7`))
        return
      }
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
      if (!RegMobile.test(this.using.mobile)) {
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
        zip_code: this.using.zip_code
      }
      // const data = this.$helpers.transformRequest(
      //   JSON.parse(JSON.stringify(json)),
      //   false
      // )
      this.$axios
        .post('web/member/address/add',json)
        .then(res => {
          if(res.code==200){
            // console.log("新增地址成功",res)
            this.getData()
            this.resetAddress()
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
    // 新建地址简体
    createAddress1() {
      // console.log("this.u",this.using)
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
      if (this.using.mobile === '') {
        this.$message.error(this.$t(`${lang}.wip8`))
        return
      }
      if(this.phoneNum.phone_code == '+86'){
        if (!RegMobiles.test(this.using.mobile)) {
          this.$message.error(this.$t(`${lang}.wip9`))
          return
        }
      }
      if (!RegTelephone.test(this.using.mobile)) {
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
        zip_code: this.using.zip_code
      }
      // const data = this.$helpers.transformRequest(
      //   JSON.parse(JSON.stringify(json)),
      //   false
      // )
      this.$axios
        .post('web/member/address/add',json)
        .then(res => {
          if(res.code==200){
            // console.log("新增地址成功",res)
            this.getData()
            this.resetAddress()
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
    // 保存修改
    changeSave() {
      if (this.clone.firstname === '') {
        this.$message.error(this.$t(`${lang}.wip1`))
        return
      }
      if (this.clone.firstname.length > 20) {
        this.$message.error(this.$t(`${lang}.wip2`))
        return
      }
      if (this.clone.lastname === '') {
        this.$message.error(this.$t(`${lang}.wip3`))
        return
      }
      if (this.clone.lastname.length > 20) {
        this.$message.error(this.$t(`${lang}.wip4`))
        return
      }
      // if (this.clone.email === '') {
      //   this.$message.error(this.$t(`${lang}.wip5`))
      //   return
      // }
      // if (!Email.test(this.clone.email)) {
      //   this.$message.error(this.$t(`${lang}.wip6`))
      //   return
      // }
      // if (this.clone.email !== this.checkEmail) {
      //   this.$message.error(this.$t(`${lang}.wip7`))
      //   return
      // }
      if (this.clone.mobile === '') {
        this.$message.error(this.$t(`${lang}.wip8`))
        return
      }
      if (
        !RegMobile.test(this.clone.mobile) &&
        !RegTelephone.test(this.clone.mobile)
      ) {
        this.$message.error(this.$t(`${lang}.wip9`))
        return
      }
      if (!this.country.areaId) {
        this.$message.error(this.$t(`${lang}.wip10`))
        return false
      }
      if (this.clone.address_details === '') {
        this.$message.error(this.$t(`${lang}.wip11`))
        return
      }
      const json = {
        id: this.clone.id,
        firstname: this.clone.firstname,
        lastname: this.clone.lastname,
        mobile_code: this.phoneNum.phone_code,
        mobile: this.clone.mobile,
        email: this.clone.email,
        country_id: this.country.areaId,
        province_id: this.province.areaId,
        city_id: this.city.areaId,
        address_details: this.clone.address_details,
        zip_code: this.clone.zip_code
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
            this.getData()
            this.resetAddress()
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
    deleteAddress() {
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ id: this.delId })),
        false
      )
      this.$axios
        .post('/web/member/address/del', data)
        .then(res => {
          if(res.code==200){
            this.isDel = false
            this.getData()
            this.resetAddress()
            // console.log("删除",res)
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
          this.isDel = false
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
      cursor: pointer!important;
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
        cursor: pointer!important;
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
