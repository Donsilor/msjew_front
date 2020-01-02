<template>
  <div
    v-loading="newAddress"
    class="addr">
    <div class="addr-blocks">
      <div
        v-if="!address || address.length===0"
        style="margin: auto;">
        <Empty
          type="6"/>
      </div>
      <div
        v-for="(a,index) in address"
        :class="{'addr-active':a.isDefault === 1}"
        :key="index"
        class="addr-block">
        <div class="addr-title">
          <div>{{ a.countryName }}{{ a.provinceName }}-{{ a.cityName }}</div>
        </div>
        <div class="addr-user">
          <div>{{ a.firstName }}{{ a.lastName }}</div>
          <div>{{ lang.get }}</div>
        </div>
        <div class="addr-address">
          {{ a.countryName }}-{{ a.provinceName }}{{ a.cityName }}{{ a.address }}
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
          style="color: #f29b87; margin-top: 6px;">{{ lang.mrAddress }}</div>
        <div
          class="addr-board"
          @click="changeDefaultAddress(a.id)"/>
        <i
          class="iconfont iconlajitong"
          @click="isDel = true;delId = a.id;"/>
        <div
          class="addr-btn"
          @click="changeAddress(a);showBox = true">{{ lang.change }}</div>
        <img
          v-show="a.isDefault === 1"
          src="../../../static/images/personal/account/address-bar.png">
      </div>
    </div>

    <div
      v-show="!showBox"
      class="middle-btn"
      @click="showBox = true;isNew = true;isEdit = false;reset()">
      <i class="icon iconfont">&#xe633;</i>{{ lang.newAddress }}
    </div>

    <div
      v-show="showBox"
      class="my-info">
      <h4 v-show="isNew">{{ lang.newAddress }}</h4>
      <h4 v-show="isEdit">{{ lang.editAddress }}</h4>

      <!--      收起按钮-->
      <div
        class="hideAddress"
        @click="reset();isEdit = false;isNew = false;showBox = false;checkEmail = '';">{{ lang['show-hey'] }}</div>
    </div>

    <div class="addr-help">

      <!--    新增-->
      <div
        v-show="isNew"
        class="new-addr">
        <div class="new-addr-name">
          <div><input
            v-model="using.lastName"
            :placeholder="lang.firstName + '*'"
            type="text"></div>
          <div><input
            v-model="using.firstName"
            :placeholder="lang.lastName + '*'"
            type="text"></div>
        </div>
        <div class="new-addr-email">
          <div><input
            v-model="using.userMail"
            :placeholder="lang.addEmail + '*'"
            type="text"></div>
        </div>
        <div class="new-addr-email">
          <div><input
            v-model="checkEmail"
            :placeholder="lang.sureEmail + '*'"
            type="text"></div>
        </div>
        <div class="new-addr-phone">
          <div>
            <input
              :value="pnN+' '+phoneNum.phone_code"
              type="text">
            <select v-model="phoneNum">
              <option
                v-for="(p,index) in phoneJson"
                :value="p"
                :key="index">{{ psn ? p.en : p.cn }}</option>
            </select>
            <i class="iconfont iconxiala"/>
          </div>
          <div><input
            v-model="using.userTel"
            :placeholder="lang.phone + '*'"
            type="tel"></div>
        </div>
        <div class="new-addr-address">
          <div>
            <input
              :value="country.areaName"
              type="text">
            <select
              v-model="country"
              @change="getListTwo">
              <option
                v-for="(c,index) in countryList"
                :value="c"
                :key="index">{{ c.areaName }}</option>
            </select>
            <i class="iconfont iconxiala"/>
          </div>
          <div>
            <input
              :value="province.areaName"
              type="text">
            <select
              v-model="province"
              @change="getListThree">
              <option
                v-for="(p,index) in provinceList"
                :value="p"
                :key="index">{{ p.areaName }}</option>
            </select>
            <i class="iconfont iconxiala"/>
          </div>
          <div>
            <input
              :value="city.areaName"
              type="text">
            <select v-model="city">
              <option
                v-for="(c,index) in cityList"
                :value="c"
                :key="index">{{ c.areaName }}</option>
            </select>
            <i class="iconfont iconxiala"/>
          </div>
        </div>
        <div class="new-addr-email">
          <div><input
            v-model="using.address"
            :placeholder="lang.longAddress + '*'"
            type="text"></div>
        </div>
        <div class="new-addr-email">
          <div><input
            v-model="using.zipCode"
            :placeholder="lang.zip + '*'"
            type="text"></div>
        </div>
        <div
          class="new-addr-btn"
          @click="createAddress()">{{ lang.save }}</div>
      </div>

      <!--    编辑-->
      <div
        v-show="isEdit"
        class="new-addr">
        <div class="new-addr-name">
          <div><input
            v-model="using.lastName"
            :placeholder="lang.firstName + '*'"
            type="text"></div>
          <div><input
            v-model="using.firstName"
            :placeholder="lang.lastName + '*'"
            type="text"></div>
        </div>
        <div class="new-addr-email">
          <div><input
            v-model="using.userMail"
            :placeholder="lang.addEmail + '*'"
            type="text"></div>
        </div>
        <div class="new-addr-email">
          <div><input
            v-model="checkEmail"
            :placeholder="lang.sureEmail + '*'"
            type="text"></div>
        </div>
        <div class="new-addr-phone">
          <div>
            <input
              :value="pnN + ' ' + phoneNum.phone_code"
              type="text">
            <select v-model="phoneNum">
              <option
                v-for="(p,index) in phoneJson"
                :value="p"
                :key="index">{{ psn ? p.en : p.cn }}</option>
            </select>
            <i class="iconfont iconxiala"/>
          </div>
          <div><input
            v-model="using.userTel"
            type="tel"
            placeholder="電話*"></div>
        </div>
        <div class="new-addr-address">
          <div>
            <input
              :value="country.areaName"
              type="text">
            <select
              v-model="country"
              @change="getListTwo">
              <option
                v-for="(c,index) in countryList"
                :value="c"
                :key="index">{{ c.areaName }}</option>
            </select>
            <i class="iconfont iconxiala"/>
          </div>
          <div>
            <input
              :value="province.areaName"
              type="text">
            <select
              v-model="province"
              @change="getListThree">
              <option
                v-for="(p,index) in provinceList"
                :value="p"
                :key="index">{{ p.areaName }}</option>
            </select>
            <i class="iconfont iconxiala"/>
          </div>
          <div>
            <input
              :value="city.areaName"
              type="text">
            <select v-model="city">
              <option
                v-for="(c,index) in cityList"
                :value="c"
                :key="index">{{ c.areaName }}</option>
            </select>
            <i class="iconfont iconxiala"/>
          </div>
        </div>
        <div class="new-addr-email">
          <div><input
            v-model="using.address"
            :placeholder="lang.longAddress + '*'"
            type="text"></div>
        </div>
        <div class="new-addr-email">
          <div><input
            v-model="using.zipCode"
            :placeholder="lang.zip + '*'"
            type="text"></div>
        </div>
        <div
          class="new-addr-btn"
          @click="changeSave()">{{ lang.save }}</div>
      </div>

    </div>
    <MessageBox
      v-show="isDel"
      :title="lang.tips"
      :message="lang.deleteConfirm"
      type="two"
      @sure="deleteAddress"
      @cancel="isDel = false;"/>
  </div>
</template>

<script>
import Address from '../../assets/address.js';
import { Email, RegMobile, RegTelephone } from '../../api/require-lee';
import MessageBox from '@/components/messageBox';
import Empty from '@/components/empty.vue';

export default {
  name: 'MyAddressList',
  components: {MessageBox, Empty},
  mixins: [Address],
  data() {
    return {
      lang: this.$LANGUAGE.personal.account,
      isDel: false,
      isNew: false,
      isEdit: false,
      showBox: false,
      address: [],
      newAddress: false,
      using: {
        firstName: '',
        lastName: '',
        userTelCode: '',
        userTel: '',
        userMail: '',
        countryId: '',
        provinceId: '',
        cityId: '',
        address: '',
        zipCode: ''
      },
      checkEmail: '',
      delId: null
    };
  },
  computed: {
    pnN: function () {
      if (localStorage.getItem('locale') === 'en_US') {
        return this.phoneNum.en;
      }
      return this.phoneNum.cn;
    },
    psn: function () {
      return localStorage.getItem('locale') === 'en_US';
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axiosGet('/web/myAccount/getMyAddress')
        .then(res => {
          // console.log('addr===>', res)
          this.address = res.data;
          this.newAddress = false;
          this.isDel = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeAddress(obj) {
      this.isNew = false;
      this.isEdit = true;
      this.newAddress = true;
      this.using = obj;
      this.checkEmail = obj.userMail;
      let code = obj.userTelCode.split('+').reverse();
      JSON.parse(JSON.stringify(this.phoneJson)).forEach(o => {
        if (o.phone_code === '+' + code[0]) this.phoneNum = o;
      });
      this.setAddress(obj)
        .then(res => {
          this.newAddress = res;
          // this.checkEmail = res.userMail;
        });
    },
    changeDefaultAddress(id) {
      this.newAddress = true;
      this.$axiosPost('/web/myAccount/updateDefaultAddress', {
        defaultAddressId: id
      }).then(res => {
        console.log(res);
        if (res.data === 'success') this.getData();
      }).catch(err => {
        console.log(err);
      });
    },
    changeSave() {
      if (this.using.firstName === '') {
        this.$message.error(this.lang.wip1);
        return;
      }
      if (this.using.firstName.length > 20) {
        this.$message.error(this.lang.wip2);
        return;
      }
      if (this.using.lastName === '') {
        this.$message.error(this.lang.wip3);
        return;
      }
      if (this.using.lastName.length > 20) {
        this.$message.error(this.lang.wip4);
        return;
      }
      if (this.using.userMail === '') {
        this.$message.error(this.lang.wip5);
        return;
      }
      if (!Email.test(this.using.userMail)) {
        this.$message.error(this.lang.wip6);
        return;
      }
      if (this.using.userMail !== this.checkEmail) {
        this.$message.error(this.lang.wip7);
        return;
      }
      if (this.using.userTel === '') {
        this.$message.error(this.lang.wip8);
        return;
      }
      if ((!RegMobile.test(this.using.userTel)) && (!RegTelephone.test(this.using.userTel))) {
        this.$message.error(this.lang.wip9);
        return;
      }
      if (!this.country.areaId) {
        this.$message.error(this.lang.wip10);
        return false;
      }
      if (this.using.address === '') {
        this.$message.error(this.lang.wip11);
        return;
      }
      this.newAddress = true;
      let json = {
        id: this.using.id,
        firstName: this.using.firstName,
        lastName: this.using.lastName,
        userTelCode: this.phoneNum.phone_code,
        userTel: this.using.userTel,
        userMail: this.using.userMail,
        countryId: this.country.areaId,
        provinceId: this.province.areaId,
        cityId: this.city.areaId,
        address: this.using.address,
        zipCode: this.using.zipCode
      };
      let data = JSON.parse(JSON.stringify(json));
      this.$axiosPostAll('/web/myAccount/saveUserAddress', data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.getData();
          this.reset();
          this.isEdit = false;
          this.isNew = false;
          this.showBox = false;
          this.checkEmail = '';
        } else {
          this.$message.error(res.msg);
          this.newAddress = false;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    createAddress() {
      if (this.using.firstName === '') {
        this.$message.error(this.lang.wip1);
        return;
      }
      if (this.using.firstName.length > 20) {
        this.$message.error(this.lang.wip2);
        return;
      }
      if (this.using.lastName === '') {
        this.$message.error(this.lang.wip3);
        return;
      }
      if (this.using.lastName.length > 20) {
        this.$message.error(this.lang.wip4);
        return;
      }
      if (this.using.userMail === '') {
        this.$message.error(this.lang.wip5);
        return;
      }
      if (!Email.test(this.using.userMail)) {
        this.$message.error(this.lang.wip6);
        return;
      }
      if (this.using.userMail !== this.checkEmail) {
        this.$message.error(this.lang.wip7);
        return;
      }
      if (this.using.userTel === '') {
        this.$message.error(this.lang.wip8);
        return;
      }
      if ((!RegMobile.test(this.using.userTel)) && (!RegTelephone.test(this.using.userTel))) {
        this.$message.error(this.lang.wip9);
        return;
      }
      if (!this.country.areaId) {
        this.$message.error(this.lang.wip10);
        return false;
      }
      if (this.using.address === '') {
        this.$message.error(this.lang.wip11);
        return;
      }
      this.newAddress = true;
      let json = {
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
      };
      let data = JSON.parse(JSON.stringify(json));
      this.$axiosPostAll('/web/myAccount/saveUserAddress', data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.getData();
          this.reset();
          this.isNew = false;
          this.isEdit = false;
          this.showBox = false;
        } else {
          this.$message.error(res.msg);
          this.newAddress = false;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    reset() {
      this.using = {
        firstName: '',
        lastName: '',
        userTelCode: '+86',
        userTel: '',
        userMail: '',
        countryId: '',
        provinceId: '',
        cityId: '',
        address: '',
        zipCode: ''
      };
      this.checkEmail = '';
      this.resetAddress();
    },
    deleteAddress() {
      this.$axiosPost('/web/myAccount/delMyAddress', {
        addressId: this.delId
      }).then(res => {
        // console.log(res)
        if (res.code === 200) this.getData();
        else this.$message.error(res.msg);
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped lang="less">
.addr {
  text-align: left;
  .addr-blocks {
    width: 100%;
    display: flex;
    align-items: center;
    /*justify-content: space-between;*/
    flex-wrap: wrap;
    .addr-block {
      position: relative;
      width: 430px;
      height: 250px;
      padding: 25px 30px 0;
      margin: 0 30px 20px 0;
      border:1px solid rgba(230,230,230,1);
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
          max-height: 22*2px;
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
        max-height: 16*2px;
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
        border: 1px solid #AA8A7B;
        border-radius: 4px;
        background:rgba(251,247,245,1);
        color: #AA8A7B;
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
      border: 1px solid rgba(212,196,188,1);
    }
  }
  .middle-btn {
    font-size: 16px;
    line-height: 20px;
    text-align: left;
    color: #333333;
    margin-bottom: 30px;
    cursor: pointer;
    i {
      font-size: 12px;
      line-height: 20px;
      cursor: pointer;
    }
  }
}
.addr-help {
  min-height: 400px;
  .new-addr {
    min-height: 400px;
    .new-addr-name {
      display: flex;
      width: 407px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      div {
        width:190px;
        height: 37px;
        border-bottom: 1px solid rgba(153,153,153,1);
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
      border-bottom: 1px solid rgba(153,153,153,1);
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
        border-bottom: 1px solid rgba(153,153,153,1);
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
        border-bottom: 1px solid rgba(153,153,153,1);
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
      color: #8B766C;
      border: 1px solid #8B766C;
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
.my-info{
  h4 {
    font-size: 16px;
    line-height: 16px;
    color: #f29b87;
    text-align: left;
    margin-bottom: 10px;
  }
  position: relative;
  .hideAddress {
    position: absolute;
    top: 0;
    left: 375px;
    z-index: 9;
    font-size: 16px;
    line-height: 16px;
    cursor: pointer;
  }
}
</style>
