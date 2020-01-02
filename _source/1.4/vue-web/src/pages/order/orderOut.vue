<template>
  <div
    v-loading="loading"
    class="order">

    <!--    步骤模块-->
    <div class="order-step">
      <div class="one-step">
        <div class="step-img">
          <img
            src="../../../static/images/order/step.png"
            alt="">
          <span>1</span>
        </div>
        <div class="step-arrow">
          <img
            src="../../../static/images/order/arrow.png"
            alt="">
        </div>
        <div class="step-title">{{ lang.ConfirmOrder }}</div>
        <div class="step-desc">{{ lang.finishOrder }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <span>2</span>
        </div>
        <div class="step-arrow"/>
        <div class="step-title">{{ lang.orderPay }}</div>
        <div class="step-desc"/>
      </div>
      <div class="one-step">
        <div class="step-img">
          <span>3</span>
        </div>
        <div class="step-arrow"/>
        <div class="step-title">{{ lang.finishPay }}</div>
        <div class="step-desc"/>
      </div>
      <div class="step-line"/>
    </div>

    <!--    用户名称和提示登陆-->
    <div class="user-info">
      <i class="iconfont iconrentou"/>
      <div class="login-line">
        <span @click="toLogin">{{ lang.login }}</span>
        <span>{{ lang.balbala }}</span>
        <span @click="toSignIn">{{ lang.Registration }}</span>
        <span>{{ lang.balabalabala }}</span>
      </div>
    </div>

    <!--    地址模块-->
    <div class="new-address">
      <div class="new-address-title">
        <div class="na-line"/>
        <div class="na-title">{{ lang.address }}</div>
        <div class="na-little-word">{{ lang.mustInput }}</div>
      </div>
      <div class="new-address-input">

        <!--        左边输入框-->
        <div class="left-side">

          <!--          姓名-->
          <div class="input-line">
            <div class="label">*{{ lang.lastName }}</div>
            <div
              :class="[{'border-change': borderChange===1},{'border-wrong': wrongInput.firstName}]"
              class="input-box">
              <input
                v-model="addressData.firstName"
                :class="{'wrong-input': wrongInput.firstName}"
                type="text"
                @focus="borderChange = 1;wrongInput.firstName = false;"
                @blur="borderChange = 0">
              <div
                v-show="wrongInput.firstName"
                class="wrong-alert">{{ lang.wrongInput }}
              </div>
            </div>
          </div>

          <!--          姓名-->
          <div class="input-line">
            <div class="label">*{{ lang.firstName }}</div>
            <div
              :class="[{'border-change': borderChange===2},{'border-wrong': wrongInput.lastName}]"
              class="input-box">
              <input
                v-model="addressData.lastName"
                :class="{'wrong-input': wrongInput.lastName}"
                type="text"
                @focus="borderChange = 2;wrongInput.lastName = false"
                @blur="borderChange = 0">
              <div
                v-show="wrongInput.lastName"
                class="wrong-alert">{{ lang.wrongInput }}
              </div>
            </div>
          </div>

          <!--          电话-->
          <div class="input-line">
            <div class="label">*{{ lang.telephone }}</div>
            <div class="tel-special">
              <div class="tel-area">
                <input
                  :value="pnN+' '+phoneNum.phone_code"
                  type="text">
                <select v-model="phoneNum">
                  <option
                    v-for="(p,index) in phoneJson"
                    :value="p"
                    :key="index">{{ psn ? p.en : p.cn }}{{ p.phone_code }}
                  </option>
                </select>
                <i class="iconfont iconxiala"/>
              </div>
              <div
                :class="[{'border-change': borderChange===3},{'border-wrong': wrongInput.userTel}]"
                class="input-box tel">
                <input
                  v-model="addressData.userTel"
                  :class="{'wrong-input': wrongInput.userTel}"
                  type="text"
                  @focus="borderChange = 3;wrongInput.userTel = false"
                  @blur="borderChange = 0">
                <div
                  v-show="wrongInput.userTel"
                  class="wrong-alert">{{ lang.wrongInput }}
                </div>
              </div>
            </div>
          </div>

          <!--          邮箱-->
          <div class="input-line">
            <div class="label">*{{ lang.email }}</div>
            <div
              :class="[{'border-change': borderChange===4},{'border-wrong': wrongInput.userMail}]"
              class="input-box">
              <input
                v-model="addressData.userMail"
                :class="{'wrong-input': wrongInput.userMail}"
                type="text"
                @focus="borderChange = 4;wrongInput.userMail = false"
                @blur="borderChange = 0">
              <div
                v-show="wrongInput.userMail"
                class="wrong-alert">{{ lang.wrongInput }}
              </div>
            </div>
          </div>

          <!--          确认邮箱-->
          <div class="input-line">
            <div class="label">*{{ lang.checkEmail }}</div>
            <div
              :class="[{'border-change': borderChange===5},{'border-wrong': wrongInput.checkEmail}]"
              class="input-box">
              <input
                v-model="addressData.checkEmail"
                :class="{'wrong-input': wrongInput.checkEmail}"
                type="text"
                @focus="borderChange = 5;wrongInput.checkEmail = false"
                @blur="borderChange = 0">
              <div
                v-show="wrongInput.checkEmail"
                class="wrong-alert">{{ lang.wrongInputAgain }}
              </div>
            </div>
          </div>

        </div>

        <!--        右边输入框-->
        <div class="right-side">

          <!--          国家-->
          <div class="input-line">
            <div class="label">*{{ lang.country }}</div>
            <div class="input-box">
              <input
                :value="country.areaName"
                type="address">
              <select
                v-model="country"
                @change="getListTwo();getTex()">
                <option
                  v-for="(c,index) in countryList"
                  :value="c"
                  :key="index">{{ c.areaName }}
                </option>
              </select>
              <i class="iconfont iconxiala"/>
            </div>
          </div>

          <!--          省份-->
          <div class="input-line">
            <div class="label">{{ lang.province }}</div>
            <div class="input-box">
              <input
                :value="province.areaName"
                type="address">
              <select
                v-model="province"
                @change="getListThree();getTex()">
                <option
                  v-for="(p,index) in provinceList"
                  :value="p"
                  :key="index">{{ p.areaName }}
                </option>
              </select>
              <i class="iconfont iconxiala"/>
            </div>
          </div>

          <!--          城市-->
          <div class="input-line">
            <div class="label">{{ lang.city }}</div>
            <div class="input-box">
              <input
                :value="city.areaName"
                type="address">
              <select
                v-model="city"
                @change="getTex()">
                <option
                  v-for="(c,index) in cityList"
                  :value="c"
                  :key="index">{{ c.areaName }}
                </option>
              </select>
              <i class="iconfont iconxiala"/>
            </div>
          </div>

          <!--          详细地址-->
          <div class="input-line">
            <div class="label">*{{ lang.longAddress }}</div>
            <div
              :class="[{'border-change': borderChange===6},{'border-wrong': wrongInput.address}]"
              class="input-box">
              <textarea
                v-model="addressData.address"
                :class="{'wrong-input': wrongInput.address}"
                @focus="borderChange = 6;wrongInput.address = false"
                @blur="borderChange = 0"/>
              <div
                v-show="wrongInput.address"
                class="wrong-alert">{{ lang.wrongInput }}
              </div>
            </div>
          </div>

          <!--          邮编-->
          <div class="input-line">
            <div class="label">{{ lang.zipCode }}</div>
            <div
              :class="[{'border-change': borderChange===7},{'border-wrong': wrongInput.zipCode}]"
              class="input-box">
              <input
                v-model="addressData.zipCode"
                :class="{'wrong-input': wrongInput.zipCode}"
                type="text"
                @focus="borderChange = 7;wrongInput.zipCode = false"
                @blur="borderChange = 0">
              <div
                v-show="wrongInput.zipCode"
                class="wrong-alert">{{ lang.wrongInput }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!--    购物车模块-->
    <div class="cart-top-bar">
      <span>{{ lang.info }}</span><span>{{ lang.number }}</span><span>{{ lang.price }}</span>
    </div>
    <div
      v-loading="goodsLoading"
      class="cart-goods">

      <!--成品样式-->
      <div
        v-loading="g.loading"
        v-for="(g,index) in goods.full"
        :key="index"
        class="finished">
        <div class="cart-radio"/>
        <div class="good-info">
          <div class="good-img">
            <img
              :src="IMG_URL + g.data.simpleGoodsEntity.goodsImages"
              alt="">
          </div>
          <div class="good-desc">
            <div>
              {{ g.data.simpleGoodsEntity.goodsName }}
            </div>
            <div>SKU：{{ g.data.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}</div>
          </div>
          <div
            v-if="g.data.simpleGoodsEntity.categoryId !== 1"
            class="good-information">
            <div
              v-for="(i,k) in g.data.simpleGoodsEntity.detailConfig"
              :key="k"
              class="infos">
              <div>{{ i.configVal }}</div>
              <div>{{ i.configAttrIVal }}</div>
            </div>
          </div>
          <div
            v-if="g.data.simpleGoodsEntity.categoryId === 1"
            class="good-description">
            <span
              v-for="(i,k) in g.data.simpleGoodsEntity.baseConfig"
              :key="'info-' + k">
              {{ i.configAttrIVal }},
            </span>
          </div>
          <div class="good-num">{{ g.data.goodsCount }}</div>
          <div class="good-price">{{ g.data.simpleGoodsEntity.coinType }} {{
          formatMoney(g.data.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}
          </div>
        </div>
      </div>

      <!--定制样式-->
      <div
        v-loading="g.loading"
        v-for="(g,y) in goods.single"
        class="customization">
        <div class="cart-radio"/>
        <div class="good-info">
          <div class="good-info-line">
            <div class="good-img">
              <img
                :src="IMG_URL + g.data.first.simpleGoodsEntity.goodsImages"
                alt="">
            </div>
            <div class="good-desc">
              <div>
                {{ g.data.first.simpleGoodsEntity.goodsName }}
              </div>
              <div>SKU：{{ g.data.first.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}</div>
            </div>
            <div class="good-information">
              <div
                v-for="s in g.data.first.simpleGoodsEntity.detailConfig"
                class="infos">
                <div>{{ s.configVal }}</div>
                <div>{{ s.configAttrIVal }}</div>
              </div>
            </div>
            <div class="good-num">{{ g.data.first.goodsCount }}</div>
            <div class="good-price">{{ g.data.first.simpleGoodsEntity.coinType }} {{
            formatMoney(g.data.first.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}
            </div>
          </div>
          <div class="good-info-dotted"/>
          <div class="good-info-line">
            <div class="good-img">
              <img
                :src="IMG_URL + g.data.second.simpleGoodsEntity.goodsImages"
                alt="">
            </div>
            <div class="good-desc">
              <div>
                {{ g.data.second.simpleGoodsEntity.goodsName }}
              </div>
              <div>SKU：{{ g.data.second.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}</div>
            </div>
            <div class="good-description">
              <span v-for="(i,k) in g.data.second.simpleGoodsEntity.baseConfig">
                {{ i.configAttrIVal }},
              </span>
            </div>
            <div class="good-num">{{ g.data.second.goodsCount }}</div>
            <div class="good-price">{{ g.data.second.simpleGoodsEntity.coinType }} {{
            formatMoney(g.data.second.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}
            </div>
          </div>
          <div class="good-dingzhi-logo">
            <i class="iconfont iconstar-jt"/>
            <span>{{ lang['custom-made'] }}</span>
          </div>
        </div>
      </div>

      <!--对戒样式-->
      <div
        v-loading="g.loading"
        v-for="g in goods.couple"
        class="couple">
        <div class="cart-radio"/>
        <div class="good-info">
          <div class="good-img">
            <img
              :src="IMG_URL + g.data.first.ringsSimpleGoodsEntity.ringImg.split(',')[0]"
              alt="">
          </div>
          <div class="good-desc">
            <div>
              {{ g.data.first.ringsSimpleGoodsEntity.name }}
            </div>
            <div>SKU：{{ g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}
            </div>
            <div>SKU：{{ g.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode }}
            </div>
          </div>
          <div class="couple-rings">
            <div class="one-person">
              <div class="good-information">
                <div v-for="i in g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.baseConfig">
                  <div
                    v-if="i.configId === 196"
                    class="infos">
                    <div>{{ i.configVal }}</div>
                    <div>{{ i.configAttrIVal }}</div>
                  </div>
                </div>
                <div
                  v-for="s in g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.detailConfig"
                  class="infos">
                  <div>{{ s.configVal }}</div>
                  <div>{{ s.configAttrIVal }}</div>
                </div>
              </div>
              <div class="good-num">{{ g.data.first.goodsCount }}</div>
              <div class="good-price">{{ g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.coinType }} {{
              formatMoney(g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) }}
              </div>
            </div>
            <div class="one-person">
              <div class="good-information">
                <div v-for="i in g.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.baseConfig">
                  <div
                    v-if="i.configId === 196"
                    class="infos">
                    <div>{{ i.configVal }}</div>
                    <div>{{ i.configAttrIVal }}</div>
                  </div>
                </div>
                <div
                  v-for="i in g.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.detailConfig"
                  class="infos">
                  <div>{{ i.configVal }}</div>
                  <div>{{ i.configAttrIVal }}</div>
                </div>
              </div>
              <div class="good-num">{{ g.data.second.goodsCount }}</div>
              <div class="good-price">{{ g.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.coinType }} {{
                formatMoney(g.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice)
              }}
              </div>
            </div>
            <div class="couple-line"/>

          </div>
        </div>
      </div>
    </div>

    <!--    订单信息模块-->
    <div class="order-info">
      <div class="left-info">
        <div class="new-address-title">
          <div class="na-line"/>
          <div class="na-title">{{ lang['delivery-information'] }}</div>
        </div>
        <div
          v-if="productNum > 1"
          class="is-pack">
          <div
            v-show="!isAllPack"
            class="free-check"
            @click="isAllPack = !isAllPack"/>
          <i
            v-show="isAllPack"
            class="iconfont icongou"
            @click="isAllPack = !isAllPack"/>
          <div>
            <span>{{ lang.sendTogether }}</span><span>（{{ lang.chatBor }}）</span>
          </div>
        </div>
        <div class="send-time">
          <div class="send-left">
            <div>{{ lang.sendTime }}</div>
            <div>
              <router-link to="/deliveryPolicy">{{ lang.checkDeliveryPolicy }}</router-link>
            </div>
          </div>
          <div class="send-right">{{ tex.planDays }}{{ lang['go-sing-kei'] }}</div>
        </div>
        <div class="after-sale-email">
          <div>{{ lang['show-hou-email'] }}</div>
          <div>
            <div
              v-show="!isSameEmail"
              class="free-check"
              @click="isSameEmail = !isSameEmail"/>
            <i
              v-show="isSameEmail"
              class="iconfont icongou"
              @click="isSameEmail = !isSameEmail"/>
            <span>{{ lang['same-tong-address'] }}</span>
          </div>
        </div>
        <div
          :class="[{'border-change': borderChange===8}, {'border-wrong': wrongInput.odMail}]"
          class="after-sale-email-input">
          <input
            v-show="!isSameEmail"
            v-model="orderEmail"
            :class="{'wrong-input': wrongInput.odMail}"
            type="text"
            @focus="borderChange = 8;wrongInput.odMail = false"
            @blur="borderChange = 0">
          <input
            v-show="isSameEmail"
            :class="{'wrong-input': wrongInput.odMail}"
            v-model="addressData.userMail"
            type="text"
            @focus="borderChange = 8;wrongInput.odMail = false"
            @blur="borderChange = 0">
        </div>
        <div class="message">
          <div class="message-title">{{ lang.remark }}</div>
          <textarea
            v-model="remark"
            :class="[{'border-change': borderChange===9}, {'wrong-input': wrongInput.remark}, {'border-wrong': wrongInput.remark}]"
            @focus="borderChange = 9;wrongInput.remark = false"
            @blur="borderChange = 0"/>
        </div>
      </div>
      <div class="right-info">
        <div
          v-show="!makeGay"
          class="coupon">
          <div class="two-on-one">
            <input
              ref="too"
              v-model="tooInp"
              :placeholder="lang.tooInpShort"
              type="text"
              class="too-input"
              @focus="die = false;"
              @input="inputCouponCode">
          </div>
          <div
            :style="[{backgroundColor: couponCode ? 'rgba(170,138,123,1)' : '#eee'}]"
            class="too-btn"
            @click="checkCount">{{ lang.exchange }}
          </div>
          <div
            v-show="die"
            class="too-die">{{ familyDie }}
          </div>
          <div class="too-wenhao">
            ?
            <div class="too-gay">
              <div>{{ lang.gay1 }}</div>
              <div>{{ lang.gay2 }}</div>
              <div>{{ lang.gay3 }}</div>
            </div>
          </div>
        </div>
        <div class="new-address-title">
          <div class="na-line"/>
          <div class="na-title">{{ lang['kou-mai-info'] }}</div>
        </div>
        <div class="price-detail">
          <div class="detail-line">
            <div>{{ lang.goodsNum }}</div>
            <div class="hkd">{{ formatMoney(goodsNum, 0) }}</div>
          </div>
          <div class="detail-line">
            <div>{{ lang.goodsNumNum }}</div>
            <div class="hkd">{{ coinType }} {{ formatMoney(goodsPrice) }}</div>
          </div>
          <div
            v-show="makeGay"
            class="detail-line">
            <div>*{{ lang.coupon }}: <span style="color: red;">{{ tooInp }}</span> <span
              style="color: red;text-decoration: underline;cursor: pointer;"
              @click="removeCoupon">{{ lang.sc }}</span></div>
            <div class="hkd color-pink">-{{ coinType }} {{ formatMoney(preferFee) }}</div>
          </div>
          <div class="detail-line">
            <div>
              <span>{{ lang.expressMoney }}</span>
              <div class="question">
                <a
                  href="/freeShipping"
                  target="_blank"><span>?</span></a>
                <div class="answer">{{ lang.expressSay }}</div>
              </div>
            </div>
            <div class="hkd color-gold">+{{ coinType }} {{ formatMoney(tex.logisticsFee) }}</div>
          </div>
          <div class="detail-line">
            <div>
              <span>{{ lang.tex }}</span>
              <div class="question">
                <a
                  href="/internationalPolicy"
                  target="_blank"><span>?</span></a>
                <div class="answer">{{ lang.texSay }}</div>
              </div>
            </div>
            <div class="hkd color-gold">+{{ coinType }} {{ formatMoney(tex.taxFee) }}</div>
          </div>
          <div class="detail-line">
            <div>
              <span>{{ lang.insurance }}</span>
              <div class="question">
                <span>?</span>
                <div class="answer">{{ lang.insuranceSay }}</div>
              </div>
            </div>
            <div class="hkd color-gold">+{{ coinType }} {{ formatMoney(tex.safeFee) }}</div>
          </div>
          <div class="detail-line">
            <div class="font-size-16 color-333">{{ lang.totalMoney }}</div>
            <div class="hkd color-pink price-big">{{ coinType }} {{ showOrderAmount }}</div>
          </div>
        </div>
      </div>
      <div class="info-line"/>
      <div
        :class="['buy-btn', { disabled: !canSubmit }]"
        @click="createOrder()">
        <span>{{ coinType }} {{ showOrderAmount }}</span>
        <span>{{ lang['bei-qin'] }}</span>
      </div>
    </div>

    <MessageBox
      v-show="confirmBox"
      :title="lang.msgTitle1"
      :message="lang.msgContent1"
      type="two"
      @cancel="confirmBox = false"
      @sure="deleteAddress()"/>
    <MessageBox
      v-show="alertBox"
      :message="wrongMsg"
      :title="lang.msgTitle1"
      type="one"
      @done="alertBox = false"/>
  </div>
</template>

<script>
import {Email, RegMobile, RegTelephone} from '@/api/require-lee.js';
import MessageBox from '../../components/messageBox';
import Address from '../../assets/address.js';
import {settleList} from '@/api/func.js';
import {
  getCartGoods,
  getCookie,
  clearCartGoods,
  getCartLeftGoods,
  clearCartLeftGoods,
  setCartList,
  clearCartList,
  setCartNum,
  getCartNum,
  clearTwoCustom,
  clearCustom
} from '@/api/cache.js';
import {formatMoney} from '@/api/filterUtil.js';

export default {
  name: 'OrderOut',
  components: {MessageBox},
  mixins: [Address],
  data() {
    return {
      lang: this.$LANGUAGE.order,
      canSubmit: false,
      pathTakeIds: [],
      userInfo: {},
      confirmBox: false,
      addressData: {
        lastName: '',
        firstName: '',
        userTel: '',
        userMail: '',
        checkEmail: '',
        address: '',
        zipCode: ''
      },
      borderChange: 0,
      wrongInput: {
        firstName: false,
        lastName: false,
        userTel: false,
        userMail: false,
        checkEmail: false,
        address: false,
        zipCode: false,
        odMail: false,
        remark: false
      },
      wrongMsg: '',
      alertBox: false,
      isAllPack: false,
      isSameEmail: false,
      orderEmail: '',
      remark: '',
      goodsLoading: true,
      goods: {
        full: [],
        single: [],
        couple: []
      },
      goodsNum: 0,
      goodsPrice: 0,
      preferFee: 0,
      tex: {
        logisticsFee: 0,
        taxFee: 0,
        safeFee: 0,
        orderAmount: 0,
        planDays: '1-12'
      },
      infoRight: true,
      coinType: null,
      loading: true,
      productNum: 0,
      die: false,
      tooInp: '',
      makeGay: false,
      session: '',
      couponCode: false,
      familyDie: ``
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
    },
    hadAddress() {
      return (
        this.addressData.address
      );
    },
    showOrderAmount() {
      let result = '--';
      console.log('this.tex=====>', JSON.stringify(this.tex));
      if (this.tex.orderAmount === null) {
        result = this.formatMoney(this.goodsPrice);
      } else {
        if (typeof this.tex.orderAmount === 'number') {
          result = this.formatMoney(this.tex.orderAmount);
        } else {
          result = '--';
        }
      }
      return result;
    }
  },
  created() {
    clearTwoCustom();
    clearCustom();
    this.coinType = localStorage.getItem('coin') || 'HKD';
    let token = getCookie('token');
    if (token) {
      // 在cookie存在token的话，获取用户信息，改变用户状态
      this.$router.replace({
        name: 'Cart'
      });
    } else {

    }
  },
  mounted() {
    this.getGoodsList();
    this.$nextTick(() => {
      if (localStorage.getItem('session')) {
        this.session = localStorage.getItem('session');
      } else {
        const time = new Date().getTime().toString();
        localStorage.setItem('session', time);
        this.session = time;
      }
      // 此为迫不得已而为之，不敢改动上一手的代码
      setTimeout(() => {
        this.productNum = document.getElementsByClassName('good-info').length;
      }, 1000);
    });
  },
  methods: {
    formatMoney: formatMoney,
    inputCouponCode() {
      if (this.tooInp.trim() === '') {
        this.couponCode = false;
      } else {
        this.couponCode = true;
      }
    },
    removeCoupon() {
      this.tooInp = '';
      this.makeGay = false;
      this.preferFee = 0;
      this.getTex();
      this.couponCode = false;
    },
    checkCount() {
      this.infoRight = true;
      let carts = [];
      for (let i in this.pathTakeIds) {
        let o = {
          createTime: this.pathTakeIds[i].createTime || new Date().getTime(),
          goodsCount: 1,
          goodsDetailsId: this.pathTakeIds[i].goodsDetailsId,
          goodsId: this.pathTakeIds[i].goodsId,
          groupId: this.pathTakeIds[i].groupId,
          groupType: this.pathTakeIds[i].groupType
        };
        carts.push(o);
      }
      if (this.tooInp.trim() === '') {
        console.log(11111111)
        this.infoRight = false;
        return;
      }
      if (!this.hadAddress) {
        this.infoRight = false;
        this.tooInp = ''
        this.couponCode = false;
        this.$message.error(this.lang.msg9);
        return;
      }
      this.$postJsonRequest('/web/order/getAnonymousCouponAmount', {
        couponCode: this.tooInp.trim(),
        carts: carts,
        session: this.session
      }).then(res => {
        if (res.data.code === 200) {
          this.makeGay = true;
          this.preferFee = res.data.data;
          this.getTex();
        } else {
          this.preferFee = 0;
          this.die = true;
          this.familyDie = res.data.msg;
          this.getTex();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getTex() {
      this.canSubmit = false;
      this.$axiosGet('/web/order/getAnonymousTax', {
        countryId: this.country.areaId,
        provinceId: this.province.areaId,
        cityId: this.city.areaId,
        preferFee: this.preferFee,
        productAmount: this.goodsPrice
      }).then(res => {
        if (res.code === 200) {
          this.canSubmit = true;
          this.tex = res.data;
        } else {
          this.canSubmit = false;
          this.$message.error(res.msg);
          this.tex = {
            'logisticsFee': 0,
            'taxFee': 0,
            'safeFee': 0,
            'orderAmount': null,
            'planDays': '--'
          };
        }
      }).catch(err => {
        this.canSubmit = false;
        console.log(err);
      });
    },
    getGoodsList() {
      this.pathTakeIds = getCartGoods();
      if (this.localArr === null) {
        this.$message.error(this.lang.msg8);
        return;
      }
      // console.log(this.pathTakeIds);
      this.$postJsonRequest('/web/goodsCart/postCart', this.pathTakeIds)
        .then(res => {
          // console.log(res);
          if (res.length === 0) {
            this.$message.error(this.lang.list1);
            return;
          }
          // 清空数据组
          this.goods = {
            full: [],
            single: [],
            couple: []
          };
          let data = settleList(res.data);
          this.goods = data.goods;
          this.goodsLoading = false;
          let aj = Object.keys(this.goods);
          for (let i in aj) {
            this.goods[aj[i]].forEach(some => {
              this.goodsPrice += some.price;
            });
          }
          this.goodsNum = this.goods.full.length + this.goods.single.length + this.goods.couple.length;
          this.tex.orderAmount = this.goodsPrice;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createOrder() {
      if (!this.canSubmit) {
        return;
      }
      if (this.addressData.firstName === '') {
        this.wrongMsg = this.lang.wip6;
        this.alertBox = true;
        this.wrongInput.firstName = true;
        return false;
      }
      if (this.addressData.firstName.length > 20) {
        this.wrongMsg = this.lang.wip7;
        this.alertBox = true;
        this.wrongInput.firstName = true;
        return false;
      }
      if (this.addressData.lastName === '') {
        this.wrongMsg = this.lang.wip8;
        this.alertBox = true;
        this.wrongInput.lastName = true;
        return false;
      }
      if (this.addressData.lastName.length > 20) {
        this.wrongMsg = this.lang.wip9;
        this.alertBox = true;
        this.wrongInput.lastName = true;
        return false;
      }
      if ((!RegMobile.test(this.addressData.userTel)) && (!RegTelephone.test(this.addressData.userTel))) {
        this.wrongMsg = this.lang.wip2;
        this.alertBox = true;
        this.wrongInput.userTel = true;
        return false;
      }
      if (!Email.test(this.addressData.userMail)) {
        this.wrongMsg = this.lang.wip3;
        this.alertBox = true;
        this.wrongInput.userMail = true;
        return false;
      }
      if (this.addressData.userMail !== this.addressData.checkEmail) {
        this.wrongMsg = this.lang.wip3;
        this.alertBox = true;
        this.wrongInput.checkEmail = true;
        return false;
      }
      if (!this.country.areaId) {
        this.wrongMsg = this.lang.wip4;
        this.alertBox = true;
        return false;
      }
      if (!this.addressData.address) {
        this.wrongMsg = this.lang.wip5;
        this.alertBox = true;
        this.wrongInput.address = true;
        return false;
      }
      if (!Email.test(this.isSameEmail ? this.addressData.userMail : this.orderEmail)) {
        this.wrongMsg = this.lang.msg5;
        this.wrongInput.odMail = true;
        this.alertBox = true;
        return false;
      }
      if (this.remark.length >= 300) {
        this.wrongMsg = this.lang.msg6;
        this.wrongInput.remark = true;
        this.alertBox = true;
        return false;
      }
      let json = {
        address: {
          address: this.addressData.address,
          cityId: this.city.areaId,
          countryId: this.country.areaId,
          firstName: this.addressData.firstName,
          lastName: this.addressData.lastName,
          provinceId: this.province.areaId,
          userMail: this.addressData.userMail,
          userTel: this.addressData.userTel,
          userTelCode: this.phoneNum.phone_code,
          zipCode: this.addressData.zipCode
        },
        afterMail: this.isSameEmail ? this.addressData.userMail : this.orderEmail,
        allSend: this.isAllPack ? 1 : 2,
        carts: [],
        orderAmount: this.tex.orderAmount,
        productAmount: this.goodsPrice,
        recvType: 1,
        userRemark: this.remark,
        session: this.session,
        couponCode: this.tooInp
      };
      for (let i in this.pathTakeIds) {
        let o = {
          createTime: this.pathTakeIds[i].createTime || new Date().getTime(),
          goodsCount: 1,
          goodsDetailsId: this.pathTakeIds[i].goodsDetailsId,
          goodsId: this.pathTakeIds[i].goodsId,
          groupId: this.pathTakeIds[i].groupId,
          groupType: this.pathTakeIds[i].groupType
        };
        json.carts.push(o);
      }
      this.$postJsonRequest('/web/order/createAnonymousOrder', json).then(res => {
        console.log('od===>', res, res.data.code === 500, res.data.msg);
        if (res.data.code === 500) {
          this.$message.error(res.data.msg);
        } else if (res.data.code === 200) {
          //  清除已下单商品
          clearCartList();
          setCartList(getCartLeftGoods());
          setCartNum(getCartNum() - (this.goods.full.length + this.goods.couple.length + this.goods.single.length));
          clearCartLeftGoods();
          clearCartGoods();
          this.$router.replace({
            name: 'pay',
            params: {
              orderId: res.data.data.orderId,
              price: res.data.data.orderAmount,
              coinType: res.data.data.coinType
            }
          });
        }
      }).catch(err => {
        console.log(err);
      });
    },
    toLogin() {
      this.$router.replace({
        name: 'login'
      });
    },
    toSignIn() {
      this.$router.push({
        name: 'login',
        query: {id: 'SignIn'}
      });
    }
  }
};
</script>

<style scoped lang="less">
  .order {
    width: 1360px;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    text-align: left;
    background: rgba(248, 248, 248, 1);
    padding: 33px 30px 60px;

    .order-step {
      width: 1300px;
      height: 182px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      position: relative;
      justify-content: center;
      padding-top: 36px;

      .one-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-right: 250-31-31px;
        position: relative;
        z-index: 9;

        .step-img {
          width: 58px;
          height: 58px;
          background: rgba(225, 225, 225, 1);
          border: 4px solid rgba(217, 217, 217, 1);
          border-radius: 50%;
          text-align: center;
          line-height: 50px;
          color: #fff;
          font-size: 22px;
          position: relative;
          box-sizing: border-box;
          margin-bottom: 4px;

          img {
            position: absolute;
            top: -4px;
            left: -4px;
            width: 58px;
            height: 58px;
            display: block;
          }

          span {
            position: relative;
            z-index: 10;
          }
        }

        .step-arrow {
          width: 12px;
          height: 6px;
          margin-bottom: 9px;

          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }

        .step-title {
          font-size: 18px;
          color: #666;
          line-height: 18px;
          margin-bottom: 10px;
        }

        .step-desc {
          color: #666;
          line-height: 16px;
          width: 121px;
          text-align: center;
        }
      }

      .one-step:nth-child(3) {
        margin-right: 0;
      }

      .step-line {
        position: absolute;
        top: 65px;
        left: 50%;
        transform: translateX(-50%);
        width: 250*2+58+20px;
        height: 2px;
        background: rgba(231, 231, 231, 1);
        z-index: 0;
      }
    }

    .user-info {
      position: relative;
      display: flex;
      justify-content: space-between;
      line-height: 17px;
      font-size: 16px;
      color: #333;
      margin: 21px 0 18px 60px;

      .iconrentou {
        display: block;
        position: absolute;
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #CFA48D;
        left: -23px;
      }

      .login-line {
        color: #333;
        font-size: 16px;
        line-height: 16px;

        span:nth-child(2n+1) {
          color: #CFA48D;
          cursor: pointer;
        }
      }
    }

    .address-box {
      position: relative;
      width: 1300px;
      overflow: hidden;
      transition: 0.3s linear;
      margin-bottom: 22px;

      .addr-blocks {
        width: 1300px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        .addr-block {
          position: relative;
          width: 635px;
          height: 250px;
          padding: 25px 30px 0;
          margin-bottom: 20px;
          border: 1px solid rgba(230, 230, 230, 1);
          background-color: #ffffff;

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

            div:nth-child(2) {
              font-size: 16px;
              margin-left: 10px;
            }
          }

          .addr-address {
            color: #333;
            font-size: 14px;
            /*width: 220px;*/
            height: 16*3px;
            line-height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            word-break: break-all;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            margin-bottom: 10px;
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
            background: rgba(251, 247, 245, 1);
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
          border: 1px solid rgba(212, 196, 188, 1);
        }
      }
    }

    .new-address {
      width: 1300px;
      height: 360px;
      background-color: #FFFFFF;
      position: relative;
      margin: 0 0 22px;
      padding: 20px 51px 0 36px;
      overflow: hidden;
      transition: 0.3s linear;

      .new-address-title {
        width: 1300-51-36px;
        height: 20px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 19px;

        .na-line {
          width: 4px;
          height: 20px;
          background: rgba(207, 164, 141, 1);
          border-radius: 2px;
          margin-right: 8px;
        }

        .na-title {
          font-size: 20px;
          color: #333;
          line-height: 20px;
          margin-right: 11px;
        }

        .na-little-word {
          font-size: 14px;
          line-height: 14px;
          color: #C28C8C;
        }
      }

      .new-address-input {
        width: 1300-51-36px;
        display: flex;
        justify-content: space-between;

        .left-side,
        .right-side {
          width: 545px;
          height: 176+80px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .input-line {
          width: 545px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .label {
            font-size: 14px;
            color: #333;
          }

          .input-box {
            width: 420px;
            border: 1px solid rgba(221, 221, 221, 1);
            border-radius: 4px;
            position: relative;
            color: #111;

            input[type="text"] {
              width: 418px;
              height: 38px;
              line-height: 38px;
              display: block;
              -webkit-appearance: none;
              border-radius: 4px;
              border: 0;
              outline: 0;
              font-size: 16px;
              padding: 0 13px;
            }

            textarea {
              width: 418px;
              height: 58px;
              line-height: 29px;
              display: block;
              -webkit-appearance: none;
              border-radius: 4px;
              border: 0;
              outline: 0;
              font-size: 16px;
              padding: 0 13px;
              resize: none;
            }

            input[type="address"] {
              width: 418px;
              height: 32px;
              line-height: 32px;
              display: block;
              -webkit-appearance: none;
              border-radius: 4px;
              border: 0;
              outline: 0;
              font-size: 14px;
              padding: 0 13px;
              background: rgba(249, 249, 249, 1);
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

            .iconxiala {
              position: absolute;
              font-size: 12px;
              width: 12px;
              height: 12px;
              line-height: 12px;
              display: block;
              color: #AA8A7B;
              left: 379px;
              top: 50%;
              transform: translateY(-50%);
            }

            .wrong-input {
              color: #D9423E;
            }

            .wrong-alert {
              position: absolute;
              width: 109+7px;
              height: 23px;
              line-height: 23px;
              text-align: center;
              color: #D9423E;
              background-image: url("../../../static/images/order/wrong-input.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              top: 9px;
              right: 19px;
            }
          }

          .tel-special {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 420px;

            .tel {
              width: 290px;

              input[type="text"] {
                width: 288px;
              }
            }

            .tel-area {
              width: 120px;
              height: 40px;
              background: rgba(248, 248, 248, 1);
              border: 1px solid rgba(221, 221, 221, 1);
              border-radius: 4px;
              position: relative;
              overflow: hidden;

              input {
                width: 100%;
                height: 100%;
                line-height: 38px;
                text-align: left;
                background: rgba(248, 248, 248, 1);
                -webkit-appearance: none;
                border: 0;
                padding: 0 0 0 13px;
                margin: 0;
                outline: 0;
              }

              select {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
              }

              .iconxiala {
                position: absolute;
                font-size: 12px;
                width: 12px;
                height: 12px;
                line-height: 12px;
                display: block;
                color: #AA8A7B;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }

          .border-change {
            border: 1px solid rgba(170, 138, 123, 1);
          }
        }
      }

      .new-address-btn {
        position: absolute;
        top: 15px;
        right: 51px;
        width: 160px;
        height: 30px;
        line-height: 30px;
        background: rgba(176, 160, 155, 1);
        text-align: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
      }

      .close-new-address-btn {
        position: absolute;
        top: 15px;
        right: 231px;
        width: 160px;
        height: 30px;
        line-height: 30px;
        /*background:rgba(176,160,155,1);*/
        border: 1px solid rgba(176, 160, 155, 1);
        text-align: center;
        color: rgba(176, 160, 155, 1);
        font-size: 14px;
        cursor: pointer;
      }
    }

    .is-new-address {
      width: 480px;
      height: 50px;
      background: rgba(255, 255, 255, 1);
      border: 1px dotted rgba(221, 221, 221, 1);
      font-size: 18px;
      color: #333;
      text-align: center;
      line-height: 50px;
      margin: 0 auto 20px;
      cursor: pointer;
    }

    .cart-top-bar {
      width: 1300px;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 1);
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #666;
      padding-left: 77px;

      span {
        display: block;
      }

      span:nth-child(1) {
        width: 710px;
      }

      span:nth-child(2) {
        width: 70px;
        margin-right: 110px;
        text-align: center;
      }
    }

    .cart-goods {
      width: 1300px;
      position: relative;
      overflow: hidden;
      background: rgba(255, 255, 255, 1);
      margin-bottom: 17px;

      .finished {
        width: 1300px;
        height: 179px;
        display: flex;
        align-items: center;

        .cart-radio {
          width: 49px;
          height: 178px;
        }

        .good-info {
          position: relative;
          width: 1200px;
          height: 179px;
          border-bottom: 1px solid rgba(239, 239, 239, 1);
          display: flex;
          align-items: center;

          .good-img {
            position: relative;
            width: 120px;
            height: 120px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(221, 221, 221, 1);
            border-radius: 2px;
            display: flex;
            align-items: center;
            margin-right: 20px;

            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }

          .good-desc {
            width: 269px;
            line-height: 18px;
            margin-right: 71px;

            div:nth-child(1) {
              max-height: 18*3px;
              margin-bottom: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              /*word-break: break-all;*/
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }

            div:nth-child(2) {
              color: #999;
            }
          }

          .good-information {
            width: 185px;
            margin-right: 83px;

            .infos {
              width: 100%;
              display: flex;
              margin-bottom: 21px;

              div:nth-child(1) {
                width: 50%;
                color: #666;
              }

              div:nth-child(2) {
                width: 50%;
                color: #111;
              }
            }
          }

          .good-description {
            width: 185px;
            line-height: 20px;
            max-height: 60px;
            color: #666;
            margin-right: 83px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            word-break: break-all;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }

          .good-num {
            width: 60px;
            text-align: center;
            font-size: 18px;
            color: #333;
            margin-right: 217-60-83px;
          }

          .good-price {
            font-family: twCenMt;
            font-size: 18px;
            color: #F29B87;
            width: 130px;
            text-align: center;
          }

          .good-btn {
            width: 80px;
            height: 21px;
            line-height: 21px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: space-between;

            div:nth-child(2) {
              width: 1px;
              height: 21px;
              background-color: rgba(166, 166, 166, 1);
            }

            i {
              width: 18px;
              display: block;
              height: 21px;
              line-height: 21px;
              color: #999999;
              font-size: 20px;
              cursor: pointer;
            }

            div:nth-child(1) {
              cursor: pointer;
              width: 22px;
              height: 21px;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }

      .customization {
        width: 1300px;
        height: 282px;
        display: flex;
        align-items: center;
        position: relative;

        .cart-radio {
          width: 49px;
          height: 282px;
        }

        .good-info {
          position: relative;
          width: 1200px;
          height: 281px;
          border-bottom: 1px solid rgba(239, 239, 239, 1);

          .good-info-dotted {
            position: absolute;
            left: 142px;
            top: 140px;
            width: 956px;
            height: 1px;
            padding-left: 20px;
            border-bottom: 1px dotted rgba(221, 221, 221, 1);
          }

          .good-info-line {
            width: 1200px;
            height: 140px;
            display: flex;
            align-items: center;

            .good-img {
              position: relative;
              width: 100px;
              height: 100px;
              background: rgba(255, 255, 255, 1);
              border: 1px solid rgba(221, 221, 221, 1);
              border-radius: 2px;
              display: flex;
              align-items: center;
              margin-right: 40px;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .good-desc {
              width: 269px;
              line-height: 18px;
              margin-right: 71px;

              div:nth-child(1) {
                max-height: 18*3px;
                margin-bottom: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                word-break: break-all;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }

              div:nth-child(2) {
                color: #999;
              }
            }

            .good-information {
              width: 185px;
              margin-right: 83px;

              .infos {
                width: 100%;
                display: flex;
                margin-bottom: 21px;

                div:nth-child(1) {
                  width: 50%;
                  color: #666;
                }

                div:nth-child(2) {
                  width: 50%;
                  color: #111;
                }
              }
            }

            .good-description {
              width: 185px;
              line-height: 20px;
              max-height: 60px;
              color: #666;
              margin-right: 83px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              word-break: break-all;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }

            .good-num {
              width: 60px;
              text-align: center;
              font-size: 18px;
              color: #333;
              margin-right: 217-60-83px;
            }

            .good-price {
              font-family: twCenMt;
              font-size: 18px;
              color: #F29B87;
              width: 130px;
              text-align: center;
            }
          }

          .good-btn {
            width: 80px;
            height: 21px;
            line-height: 21px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: space-between;

            div:nth-child(2) {
              width: 1px;
              height: 21px;
              background-color: rgba(166, 166, 166, 1);
            }

            i {
              width: 18px;
              display: block;
              height: 21px;
              line-height: 21px;
              color: #999999;
              font-size: 20px;
              cursor: pointer;
            }

            div:nth-child(1) {
              cursor: pointer;
              width: 22px;
              height: 21px;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
        }

        .good-dingzhi-logo {
          position: absolute;
          width: 200px;
          height: 24px;
          left: 24px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;

          span {
            color: #999;
            font-size: 14px;
            line-height: 14px;
          }

          i {
            display: block;
            color: #aaa;
          }
        }
      }

      .couple {
        width: 1300px;
        height: 174*2+2px;
        display: flex;
        align-items: center;

        .cart-radio {
          width: 49px;
          height: 174*2+2px;
        }

        .good-info {
          position: relative;
          width: 1200px;
          height: 174*2+2px;
          border-bottom: 1px solid rgba(239, 239, 239, 1);
          display: flex;
          align-items: center;

          .good-img {
            position: relative;
            width: 120px;
            height: 120px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(221, 221, 221, 1);
            border-radius: 2px;
            display: flex;
            align-items: center;
            margin-right: 20px;
            overflow: hidden;

            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }

          .good-desc {
            width: 269px;
            line-height: 18px;
            margin-right: 71px;

            div:nth-child(1) {
              max-height: 18*3px;
              margin-bottom: 16px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              word-break: break-all;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }

            div:nth-child(2) {
              color: #999;
            }
          }

          .couple-rings {
            position: relative;

            .one-person {
              height: 174px;
              display: flex;
              align-items: center;

              .good-information {
                width: 185px;
                margin-right: 83px;

                .infos {
                  width: 100%;
                  display: flex;
                  margin-bottom: 21px;

                  div:nth-child(1) {
                    width: 50%;
                    color: #666;
                  }

                  div:nth-child(2) {
                    width: 50%;
                    color: #111;
                  }
                }
              }

              .good-num {
                width: 60px;
                text-align: center;
                font-size: 18px;
                color: #333;
                margin-right: 217-60-83px;
              }

              .good-price {
                font-family: twCenMt;
                font-size: 18px;
                color: #F29B87;
                width: 130px;
                text-align: center;
              }
            }

            .couple-line {
              position: absolute;
              top: 173px;
              left: -56px;
              width: 673px;
              height: 1px;
              border-bottom: 1px dotted rgba(221, 221, 221, 1);
            }
          }

          .good-btn {
            width: 80px;
            height: 21px;
            line-height: 21px;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: space-between;

            div:nth-child(2) {
              width: 1px;
              height: 21px;
              background-color: rgba(166, 166, 166, 1);
            }

            i {
              width: 18px;
              display: block;
              height: 21px;
              line-height: 21px;
              color: #999999;
              font-size: 20px;
              cursor: pointer;
            }

            div:nth-child(1) {
              cursor: pointer;
              width: 22px;
              height: 21px;

              img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }

      .img-bord {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #fff;
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        background-color: rgba(102, 102, 102, 0.4);
      }

      .lose-btn {
        width: 101px;
        height: 21px;
        line-height: 21px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: space-between;

        div:nth-child(2) {
          width: 1px;
          height: 21px;
          background-color: rgba(166, 166, 166, 1);
        }

        i {
          display: block;
          width: 18px;
          height: 21px;
          line-height: 21px;
          color: #999999;
          font-size: 20px;
          cursor: pointer;
        }

        div:nth-child(1) {
          width: 43px;
          height: 15px;
          line-height: 15px;
          font-size: 14px;
          color: #AA8A7B;
          cursor: pointer;
        }
      }
    }

    .order-info {
      position: relative;
      width: 1300px;
      height: 544px;
      background: rgba(255, 255, 255, 1);
      padding: 30px 50px 0 35px;
      display: flex;
      justify-content: space-between;

      .left-info {
        width: 550px;

        .new-address-title {
          width: 1300-51-36px;
          height: 20px;
          display: flex;
          align-items: flex-end;
          margin-bottom: 25px;

          .na-line {
            width: 4px;
            height: 20px;
            background: rgba(207, 164, 141, 1);
            border-radius: 2px;
            margin-right: 8px;
          }

          .na-title {
            font-size: 20px;
            color: #333;
            line-height: 20px;
            margin-right: 11px;
          }

          .na-little-word {
            font-size: 14px;
            line-height: 14px;
            color: #C28C8C;
          }
        }

        .is-pack {
          display: flex;
          align-items: center;
          margin-bottom: 22px;
          padding-left: 10px;

          div {
            font-size: 14px;
            color: #333;
            line-height: 16px;

            span:nth-child(2) {
              color: #999;
            }
          }
        }

        .send-time {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          padding-left: 10px;

          .send-left {
            div:nth-child(1) {
              line-height: 14px;
              font-size: 14px;
              color: #333;
              margin-bottom: 5px;
            }

            div:nth-child(2) {
              line-height: 12px;
              font-size: 12px;
              color: #CFA48D;
              cursor: pointer;

              a {
                color: #CFA48D;
              }
            }
          }

          .send-right {
            line-height: 18px;
            font-size: 18px;
            color: #333;
          }
        }

        .after-sale-email {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          line-height: 14px;
          padding-left: 10px;
          margin-bottom: 9px;

          div:nth-child(1) {
            color: #333;
          }

          div:nth-child(2) {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }

        .after-sale-email-input {
          width: 540px;
          height: 40px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 4px;
          margin-left: 10px;

          input {
            width: 538px;
            height: 38px;
            line-height: 38px;
            padding: 0 11px;
            font-size: 14px;
            color: #1b1b1b;
            -webkit-appearance: none;
            border: 0;
            outline: 0;
            border-radius: 4px;
          }

          .wrong-input {
            color: #D9423E;
          }
        }

        .border-wrong {
          border: 1px solid #D9423E;
        }

        .message {
          width: 100%;
          padding-left: 10px;
          margin-top: 19px;
          font-size: 14px;
          color: #333333;

          textarea {
            width: 540px;
            height: 80px;
            padding: 0 12px;
            color: #111;
            -webkit-appearance: none;
            outline: 0;
            resize: none;
            border: 1px solid rgba(221, 221, 221, 1);
            border-radius: 4px;
            margin: 9px 0 71px;
          }

          .border-change {
            border: 1px solid rgba(170, 138, 123, 1);
          }

          .border-wrong {
            border: 1px solid #D9423E;
          }
        }

        .border-change {
          border: 1px solid rgba(170, 138, 123, 1);
        }

        .free-check {
          width: 16px;
          height: 16px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(187, 187, 187, 1);
          border-radius: 4px;
          cursor: pointer;
          margin-right: 9px;
        }

        .icongou {
          display: block;
          width: 16px;
          height: 16px;
          background: rgba(170, 138, 123, 1);
          border-radius: 2px;
          color: #fff;
          font-size: 16px;
          line-height: 16px;
          cursor: pointer;
          margin-right: 9px;
        }
      }

      .right-info {
        width: 66+348+120+12+4px;

        .coupon {
          /*background: pink;*/
          width: 100%;
          height: 60px;
          margin-bottom: 20px;
          position: relative;

          .too-input {
            width: 390px;
            height: 28px;
            line-height: 28px;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-appearance: none;
            border: 1px solid rgba(221, 221, 221, 1);
            outline: 0;
            padding: 0 20px 0 60px;
            background: rgba(249, 249, 249, 1);
            text-align: right;
          }

          .too-tell {
            color: #333;
            font-size: 14px;
            width: 390px;
            height: 28px;
            line-height: 28px;
            padding: 0 20px 0 60px;
            text-align: right;
            position: absolute;
            top: 0;
            left: 0;
          }

          .iconxiala {
            position: absolute;
            display: block;
            color: #AA8A7B;
            font-size: 12px;
            top: 7px;
            left: 21px;
          }

          .too-select {
            position: absolute;
            display: block;
            top: 7px;
            left: 21px;
            opacity: 0;
          }

          .too-btn {
            width: 100px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            color: white;
            font-size: 14px;
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 390+20px;
          }

          .too-die {
            color: #D9423E;
            font-size: 12px;
            position: absolute;
            left: 0;
            top: 8+28px;
          }

          .too-wenhao {
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            background: rgba(221, 189, 170, 1);
            border-radius: 50%;
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            position: absolute;
            top: 6px;
            right: 0;
            cursor: pointer;

            .too-gay {
              display: none;
              position: absolute;
              width: 535px;
              /*height:102px;*/
              top: 4+16px;
              right: -10px;
              background-image: url('../../../static/images/order/too-big.png');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              z-index: 8;
              color: #000;
              text-align: left;
              padding: 40px;
            }
          }

          .too-wenhao:hover .too-gay {
            display: block;
          }
        }

        .new-address-title {
          width: 1300-51-36px;
          height: 20px;
          display: flex;
          align-items: flex-end;
          margin-bottom: 30px;

          .na-line {
            width: 4px;
            height: 20px;
            background: rgba(207, 164, 141, 1);
            border-radius: 2px;
            margin-right: 8px;
          }

          .na-title {
            font-size: 20px;
            color: #333;
            line-height: 20px;
            margin-right: 11px;
          }
        }

        .price-detail {
          width: 100%;
          padding-left: 15px;
          font-size: 12px;
          color: #656565;

          .detail-line {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 13px;

            div:nth-child(1) {
              position: relative;
            }

            .hkd {
              font-family: twCenMt;
              font-size: 14px;
              color: #111;
            }

            .color-pink {
              color: #F29B87;
            }

            .color-gold {
              color: #AA8A7B;
            }

            .price-big {
              font-size: 20px;
            }

            .question {
              position: absolute;
              left: 75px;
              top: 2px;
              width: 16px;
              height: 16px;
              background: rgba(221, 189, 170, 1);
              border-radius: 50%;
              color: #FFFFFF;
              text-align: center;
              line-height: 16px;
              font-size: 12px;
              cursor: pointer;

              a {
                color: #FFFFFF;
              }

              .answer {
                display: none;
                width: 223+9px;
                height: 93px;
                color: #666;
                font-size: 12px;
                background-image: url("../../../static/images/order/answer.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                position: absolute;
                left: 20px;
                top: -33px;
                padding: 30px 10px 30px 20px;
                text-align: left;
                z-index: 9;
              }
            }

            .question:hover .answer {
              display: block;
            }
          }
        }
      }

      .info-line {
        position: absolute;
        width: 1200px;
        height: 1px;
        background: rgba(221, 221, 221, 1);
        top: 406px;
        left: 50px;
      }

      .buy-btn {
        position: absolute;
        bottom: 60px;
        left: 410px;
        width: 480px;
        height: 40px;
        background: rgba(51, 51, 51, 1);
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;

        span:nth-child(1) {
          font-family: twCenMt;
          margin-right: 50px;
        }

        &.disabled {
          background: #ddd;
          color: #aaa;
        }
      }
    }
  }
</style>
