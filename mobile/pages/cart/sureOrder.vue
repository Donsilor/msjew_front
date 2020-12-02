<template>
  <div class="sure-oredr" ref="getScroll">
    <Header :title="lang.sureOrder" />
    <div v-if="!isLogin" class="is-login" id="loginBox">
      <i class="icon iconfont icongantanhao1"></i>
      <a @click="gologin">{{ lang.login }}</a>
      <span>{{ lang.settlement }}</span>
      <a @click="gologin">{{ lang.accont }}</a>
      <span>{{ lang.any }}</span>
    </div>
    <div class="address" >
      <div v-if="hasAddress" class="has-address" @click="goAddress">
        <div>
          <span v-if="language == 'zh_CN'">{{ address.lastname }}{{ address.firstname }}</span>
          <span v-else>{{ address.firstname }} {{ address.lastname }}</span>
          <!-- <span v-if="!this.queryId">{{ lang.default }}</span> -->
        </div>
        <p>{{ address.mobile_code }} {{ address.mobile }}</p>
        <p class="p ow-h2">
          {{ address.country_name }}-{{ address.province_name }}-{{
            address.city_name
          }}-{{ address.address_details }}
        </p>
        <i class="icon iconfont iconyou"></i>
        <img src="~/static/cart/address.png" />
      </div>
      <div v-if="!hasAddress" class="no-address" @click="goAddress"> 
        <i class="icon iconfont iconweizhiyuyan"></i>
        <span>{{ lang.address }}</span>
        <i class="icon iconfont iconyou"></i>
      </div>
    </div>
    <!-- 支付方式 -->
    <div class="payways" v-if="!isLogin">
      <div class="pay">
        <!-- <Header :title="lang2.pay" tips="1" /> -->
        <!-- <div v-if="this.$store.state.coin == 'CNY' && this.$store.state.platform === 21" class="proce">
          <div class="note"><span class="star">*</span> {{ lang2.Note3 }}</div>
          <span>{{ formatCoin(coin) }} </span>
          {{ formatMoney(productAmount) }}
          <span class="price-hkd">({{ coinHKD }} {{ formatMoney(priceHKD) }}) </span>
        </div> -->
        <div class="proce select-proce">
          {{lang2.selectPayWays}}
          <!-- <span>{{ formatCoin(coin) }} </span>
          {{ formatMoney( productAmount) }} -->
        </div>
		<!-- 大陆支付 -->
    <ul v-if="this.$store.state.platform == 21">
      <li v-for="(item, index) in list2" :key="index">
        <!-- v-show="price > 0 || (price == 0 && item.type === 5)" -->
        <div>
          <img :src="item.url" />
          <div class="right">
            <span
              class="icon iconfont"
              :class="typeIndex === index ? 'icongou' : ''"
              @click="changeType(index)"
            ></span>
            <b
              >{{ item.title }}
              <span
                v-if="item.type == ''"
                class="ph"
                @click="needtips = !needtips"
                >?</span
              >
            </b>

                <p>{{ item.des }}</p>
                <p v-if="item.des2">{{ item.des2 }}</p>
                <p class="hint-color" v-if="index != 0 && index != 1 && index != 2 && index != 3 && index != 5">({{lang.msg11}})</p>
              </div>
            </div>
          </li>
        </ul>
		<!-- 香港支付 -->
		<ul v-if="this.$store.state.platform == 11">
		  <li v-for="(item, index) in listHK" :key="index">
			<!-- v-show="price > 0 || (price == 0 && item.type === 5)" -->
			<div>
			  <img :src="item.url"/>
			  <div class="right">
				<span
				  class="icon iconfont"
				  :class="typeIndex === index ? 'icongou' : ''"
				  @click="changeType(index)"
				></span>
				<b
				  >{{ item.title }}
				  <span
					v-if="item.type == ''"
					class="ph"
					@click="needtips = !needtips"
					>?</span
				  >
				</b>
		
				<p>{{ item.des }}</p>
				<p v-if="item.des2">{{ item.des2 }}</p>
				<p class="hint-color" v-if="index != 0 && index != 1 && index != 2 && index != 3 && index != 5">({{lang.msg11}})</p> 
			  </div>
			</div>
		  </li>
		</ul>
    <!-- 台湾支付 -->
		<ul v-if="this.$store.state.platform == 41">
		  <li v-for="(item, index) in listTw" :key="index">
			<!-- v-show="price > 0 || (price == 0 && item.type === 5)" -->
			<div>
			  <img :src="item.url"/>
			  <div class="right">
				<span
				  class="icon iconfont"
				  :class="typeIndex === index ? 'icongou' : ''"
				  @click="changeType(index)"
				></span>
				<b
				  >{{ item.title }}
				  <span
					v-if="item.type == ''"
					class="ph"
					@click="needtips = !needtips"
					>?</span
				  >
				</b>
		
				<p>{{ item.des }}</p>
				<p v-if="item.des2">{{ item.des2 }}</p>
				<p class="hint-color" v-if="index != 0 && index != 1 && index != 2 && index != 3 && index != 5">({{lang.msg11}})</p> 
			  </div>
			</div>
		  </li>
		</ul>
		<!-- 美国支付 -->
    <ul v-if="this.$store.state.platform == 31">
      <li v-for="(item, index) in listUs" :key="index">
        <!-- v-show="price > 0 || (price == 0 && item.type === 5)" -->
        <div>
          <img :src="item.url" />
          <div class="right">
            <span
              class="icon iconfont"
              :class="typeIndex === index ? 'icongou' : ''"
              @click="changeType(index)"
            ></span>
            <b
              >{{ item.title }}
              <span
                v-if="item.type == ''"
                class="ph"
                @click="needtips = !needtips"
                >?</span
              >
            </b>

                <p>{{ item.des }}</p>
                <p v-if="item.des2">{{ item.des2 }}</p>
                <p class="hint-color" v-if="index != 0 && index != 1 && index != 3 && index != 5">({{lang.msg11}})</p>
              </div>
            </div>
          </li>
        </ul>
        <!-- <div class="tips">
          <i class="icon iconfont icongantanhao1"></i><span>{{ lang2.tips }}</span>
        </div> -->
        <!-- <div class="btn" @click="goPaySuccess">
          @click="goPaySuccess"
          {{ list2[typeIndex].title }}
          {{ lang2.goPay }}
          {{ info.coinType }}
          {{ formatMoney(price) }}
        </div> -->

        <!--  unionPayHide  -->
        <div v-show="false">
          <form :action="actionLink" method="post">
            <div v-for="(f, index) in form" :key="index">
              <label :for="f.name">{{ f.name }}</label>
              <input v-model="f.val" :name="f.name" />
            </div>
            <input id="unionPay" type="submit" value="akm" />
          </form>
        </div>

        <NeedKnow v-if="needtips" @close="needtips = !needtips" />
      </div>
    </div>

    <Address v-if="ifShowAddress" :id="id" :queryId="queryId" @closeAP="closeAddressPop" ></Address>

    <CartList :list="list" />
    <div class="footer">
      <div class="content">
        <div class="time">
          <span>{{ lang.time }}</span>
          <span v-if="!isLogin">{{ allFee.plan_days }}{{ lang.week }}</span>
          <span v-else>{{ planDays }}{{ lang.week }}</span> 
        </div>
        <div v-if="productNum > 1" class="send">
          <div
            class="btn"
            :class="isSend ? '' : 'active'"
            @click="isSend = !isSend"
          >
            <span></span>
          </div>
          <b>{{ lang.send }}</b>
          <p>{{ lang.tips }}</p>
        </div>
        <!-- <div class="input-mod">
          <div class="tips"><span>*</span>{{ lang.aftermailbox }}</div>
          <bdd-input v-model="mailbox" :placeholder="lang.mailbox"></bdd-input>
        </div> -->
        <div class="text-area">
          <p>{{ lang.remark }}</p>
          <textarea
            v-model="userRemark"
            cols="38"
            maxlength="500"
            :placeholder="lang.more"
          ></textarea>
          <span class="tex-count" :class="{'color-red':userRemark.length == 500}">{{texsum}}/500</span>
        </div>

        <!-- 添加购物卡 -->
        <div class="clf">
          <div class="addShoppingCard fr" v-if="this.$store.state.platform !== 31" @click="addCard()">+{{this.cardList.length == 0 ? lang.useShoppingCard : lang.editOrUnbound}}</div>
        </div>
        <!-- 开具发票 -->
        <div class="invoice" v-if="this.areaId == '1'">
          <div class="title">
            <span>{{ lang3.invo }}</span>
            <div>
              <span class="underline" v-show="!kai" @click="show()">{{ lang3.NotInvoiced }}</span>
              <span v-show="kai" @click="show">{{ lang3.Invoicing }}</span>
            </div>
          </div>
        </div>

        <!-- <div v-show="!(sureCoupon && usingCouponInfo.couponCode)" class="coupon" >
          <div class="operate">
            <div class="choose">
              <div class="coupon-code">
                <input
                  v-show="!selectCouponId"
                  ref="coupon-code-input"
                  v-model="inputCouponCode"
                  :placeholder="
                    isLogin ? lang.inputOrSelectCode : lang.inputCode
                  "
                  @input="onInputCouponCode"
                />
                <div
                  v-show="selectCouponId"
                  class="select-coupon-info ow-h1"
                  @click="cleanAndFocusCoupon"
                >
                  {{ selectedCouponInfo.desc }}
                </div>
              </div>
              <div v-if="isLogin" class="coupon-select">
                <i class="iconfont iconkuozhan"></i>
                <select v-model="selectCouponId" @change="onChangeSelectCoupon">
                  <option
                    v-for="(item, index) in cuponList"
                    :key="index"
                    :value="item.couponId"
                    >{{ item.desc }}</option
                  >
                </select>
              </div>
            </div>
            <div
              :class="[
                'exchange',
                {
                  disabled: (!inputCouponCode && !selectCouponId) || !hadAddress
                }
              ]"
            >
              <button
                :disabled="(!inputCouponCode && !selectCouponId) || !hadAddress"
                @click="useCoupon"
              >
                {{ lang.exchange }}
              </button>
            </div>
            <div class="icon" @click="showCouponTips">
              <i class="iconfont icongantanhao2"></i>
            </div>
          </div>
        </div> -->

        <ul class="price">
          <!-- <li v-if="isLogin" @click="selectCupon">
            <span>{{ lang.cupon }}</span
            ><span>{{ cuponName }}</span>
          </li> -->
          
          <li>
            <span>{{ lang.itemsNum }}：</span> 
            <span>{{ amount }}</span>
          </li>

          <li>
            <span>{{ lang.allFee }} </span
            ><span
              >{{ formatCoin(coin) }}
              {{ formatMoney( productAmount) }}</span
            >
          </li>

          <!-- 优惠码 -->
          <!-- <li v-show="preferFee > 0">
            <div>
              <span>{{ lang.preferFee }}</span>
              <span
                v-show="sureCoupon && usingCouponInfo.couponCode"
                class="using-coupon"
                >{{ usingCouponInfo.couponCode }}</span
              >
              <span
                v-show="sureCoupon && usingCouponInfo.couponCode"
                class="delete-coupon"
                @click="cleanAllCoupon"
                >{{ lang.delete }}</span
              >
            </div>
            <span>-{{ coin }} {{ formatMoney(preferFee) }}</span>
          </li> -->

          <li>
            <div>
              <span>{{ lang.logisticsFee }}</span>
              <span class="question" @click="showChoose(`orderExpress`)"
                >!</span
              >
            </div>
            <span>+{{ formatCoin(coin) }} {{ formatMoney(allFee.logisticsFee) }}</span>
          </li>
          <li>
            <div>
              <span>{{ lang.taxFee }}</span>
              <span class="question" @click="showChoose(`orderTex`)">!</span>
            </div>
            <span>+{{ formatCoin(coin) }} {{ formatMoney(allFee.taxFee) }}</span>
          </li>
          <li>
            <div>
              <span>{{ lang.safeFee }}</span
              ><span class="question" @click="showChoose(`orderSafe`)">!</span>
            </div>
            <span>+{{ formatCoin(coin) }} {{ formatMoney(allFee.safeFee) }}</span>
          </li>
          <li>
            <!-- formatMoney(allFee.productAmount || productAmount) -->
            <span>{{ lang.orderAmount }}</span
            ><span>{{ formatCoin(coin) }} {{ formatMoney(orderTotalAmount) }}</span>
          </li>

          <!-- 折扣金额 -->
          <li v-if="allFee.discountAmount">
            <span>{{ lang.discountedAmount }}：</span
            ><span
              >-{{ formatCoin(coin) }}
              {{ formatMoney( allFee.discountAmount) }}</span
            >
          </li>

          <!-- 折扣金额 -->
          <li v-if="allFee.discount_amount">
            <span>{{ lang.discountedAmount }}：</span
            ><span
              >-{{ formatCoin(coin) }}
              {{ formatMoney( allFee.discount_amount) }}</span
            >
          </li>

          <!-- 优惠金额 -->
          <li v-if="ifShowCouponMoney && isLogin">
            <span>{{ lang.couponAmount }}： </span
            ><span
            class="use-coupon"
             v-if="couponCodeR.couponPrice"
             @click="ifShowCoupon = true"
              >-{{ formatCoin(coin) }}
              {{this.couponCodeR.couponPrice}}</span
            >
            <span class="use-coupon" v-if="!couponCodeR.couponPrice" @click="useCoupon">{{ lang.useCoupons }}</span>
          </li>

          <!-- 购物卡 -->
          <li v-for="(item,index) in useAmount" :key="index">
            <div>
              <span>{{ lang.shoppingCard }}</span> <span>({{item.sn}})</span>
            </div>
            <span class="color-pink">-{{ formatCoin(coin) }} {{ formatMoney(item.useAmount) }}</span>
          </li>

          <li class="order-pay">
            <span>{{ lang.NeedPay }}</span>
            <span v-if="this.$store.state.platform == 41">{{ formatCoin(coin) }} {{ formatAmount(ultimatelyPay) }}</span>
            <span v-else>{{ formatCoin(coin) }} {{ formatMoney(ultimatelyPay) }}</span>
          </li>
          <li>
            <p class="point" v-show="this.$store.state.platform == 41 && floatStr(ultimatelyPay)>0">({{lang.point }})</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 未登录 -->
    <!-- <div v-if="!isLogin" :class="['submit']" @click="createOrder2">
      <span>{{ lang.sureOrder }}</span>
    </div> -->

    <div :class="['submit']" @click="createOrder">
      <span>{{ lang.sureOrder }}</span>
    </div>

    <order-express ref="orderExpress"></order-express>
    <order-tex ref="orderTex"></order-tex>
    <order-safe ref="orderSafe"></order-safe>
    <order-coupon-tips ref="order-coupon-tips"></order-coupon-tips>
    <Invoice v-if="ifShowInvoice" @closeIP="closeInvoicePop" :kai="kai" :totlePrice="totlePrice" :ultimatelyPay="ultimatelyPay" ></Invoice>
    <shopping-card v-if="ifShowShoppingCard" @closePop="closeCardPop" :cardType="useAmount" :goodsLine ="goodsListLine" :currencyType="currency"></shopping-card>
    <use-coupon v-if="ifShowCoupon" @closeCoupon="closeCo" :couponAll="this.couponAll" :couponAlready="this.couponAlready" :useC="couponCodeR"></use-coupon>
    <login-pop v-if="ifShowPop" @closePop="closePop"></login-pop>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import Address from '@/components/address/address.vue'
import CartList from '@/components/cart/cartlist.vue'
import Invoice from '@/components/invoice/index'
import OrderCouponTips from '@/components/white-board/order-coupon-tips/index.vue'
import { Email } from '../../assets/js/require-lee'
import { formatMoney } from '@/assets/js/filterUtil.js'
import NeedKnow from '@/components/cart/needKnow.vue'
import ShoppingCard from '@/components/shopping-card/index'
const storage = process.client ? require('good-storage').default : {}
// console.log(storage, 'storage') 
export default {
  name: 'SureOrder',
  layout: 'no-bar',
  components: {
    Header,
    CartList,
    OrderCouponTips,
    NeedKnow,
    ShoppingCard,
    Invoice,
    Address
  },
  data() {
    return {
      texsum:0,
      kai:false,
      url:'',
      lang: this.LANGUAGE.cart.sureOrder,
      lang2: this.LANGUAGE.cart.pay,
      lang3: this.LANGUAGE.cart.invoice,
      coin: this.$store.state.coin,
      language: this.$store.state.language,
      form: [],
      actionLink: '',
      // 大陆支付
      list2: [
        {
          url: '/cart/ap.png',
          type: 82,
          title: this.LANGUAGE.cart.pay.payType3,
          des: this.LANGUAGE.cart.pay.type3Text
        },
        {
          url: '/cart/wac.png',
          type: 83,
          title: this.LANGUAGE.cart.pay.payType4,
          des: this.LANGUAGE.cart.pay.type4Text
        },
      ],
      // 香港支付
      listHK: [
        {
          url: '/cart/pay.png',
          type: 6,
          title: this.LANGUAGE.cart.pay.payType0,
          des: this.LANGUAGE.cart.pay.type0Text
        },
        {
          url: '/cart/Stripe.png',
          type: 9,
          title: this.LANGUAGE.cart.pay.payType9,
          des: this.LANGUAGE.cart.pay.type9Text
        }
      ],
      // 台湾支付
      listTw: [
        {
          url: '/cart/pay.png',
          type: 6,
          title: this.LANGUAGE.cart.pay.payType0,
          des: this.LANGUAGE.cart.pay.type0Text
        },
        {
          url: '/cart/visa_1.png',
          type: 61,
          title: this.LANGUAGE.cart.pay.payType6,
          des: this.LANGUAGE.cart.pay.type6Text
        },
        {
          url: '/cart/ph.png',
          type: 89,
          title: this.LANGUAGE.cart.pay.payType5,
          des: this.LANGUAGE.cart.pay.type5Text,
        }
      ],
      // 美国支付
      listUs: [
        {
          url: '/cart/pay.png',
          type: 6,
          title: this.LANGUAGE.cart.pay.payType0,
          des: this.LANGUAGE.cart.pay.type0Text
        },
        {
          url: '/cart/Stripe.png',
          type: 9,
          title: this.LANGUAGE.cart.pay.payType9,
          des: this.LANGUAGE.cart.pay.type9Text
        }
      ],
      sum: '2,120.00',
      info:'',
      price:'',
      typeIndex:0,
      // info: JSON.parse(this.$route.query.info),
      // price: JSON.parse(this.$route.query.info).orderAmount,
      // typeIndex: JSON.parse(this.$route.query.info).orderAmount === 0 ? 5 : 0,
      needtips: false,
      canSubmit: false,
      coin: this.$store.state.coin,
      mailbox: '',
      hasAddress: false,
      isLogin: !!this.$store.state.token,
      list: [],
      address: '',
      idList: [],
      cuponId: 0,
      cuponName: this.LANGUAGE.cart.sureOrder.cuponName,
      preferFee: 0, // 优惠卷金额
      productAmount: 0, // 商品总金额
      priceHKD:0, //人民币转化成港币后的价格
      coinHKD:"HKD",
      allFee: this.defaultAllFeeInfo(),
      userRemark: '',
      isSend: true,
      productNum: 0,
      planDays:'',
      sureCoupon: false,
      inputCouponCode: '',
      inputCouponInfo: null,
      selectCouponId: '',
      cuponList: [],
      session: '',
      info:[],
      totlePrice:'',
      areaId: this.$store.state.areaId,
      ifShowShoppingCard: false,
      ifShowInvoice:false,
      cardList: [],
      useAmount: [],
      cardType: 1,
      goodsListLine: [],
      scrollTop: 0,
      orderTotalAmount: 0,
      ultimatelyPay: 0,
      currency: '',
      platform: this.$store.state.platform,
      couponCodeR: {
        couponId: '',
        couponPrice: ''
      },
      ifShowCoupon: false,
      ifShowCouponMoney: false,
      // 所有可有优惠券
      couponAll: [],
      // 已领取优惠券
      couponAlready: [],
      amount: 0,
      invoices:'',
      ifShowAddress: false,
      id:'',
      queryId:'',
      code:'',
      ifShowPop: false,
      order_sn:''
    }
  },
  watch:{
    userRemark(){
      this.texsum = this.userRemark.length;
    }
  },
  computed: {
    selectedCouponInfo() {
      const _this = this
      let result = {}
      const cuponList = _this.cuponList
      cuponList.forEach(item => {
        if (item.couponId === _this.selectCouponId) {
          result = item
        }
      })
      return result
    },
    hadAddress() {
      return (
        this.address.id ||
        (this.address.countryId &&
          this.address.provinceId &&
          this.address.cityId)
      )
    },
    usingCouponInfo() {
      let result = {
        couponCode: '',
        couponId: 0,
        discountAmount: 0,
        discountType: 0
      }
      if (this.inputCouponCode) {
        result = this.inputCouponInfo || {
          couponCode: this.inputCouponCode,
          couponId: 0,
          discountAmount: 0,
          discountType: 0
        }
      } else if (this.selectCouponId) {
        this.cuponList.forEach(item => {
          if (item.couponId === this.selectCouponId) {
            result = item
          }
        })
      }
      return result
    },
    showOrderAmount() {
      // console.log("allfee",)
      let result = '--'
      // console.log('this.allFee=====>', JSON.stringify(this.allFee))
       if (this.isLogin){
         if (this.allFee.orderAmount === null) {
           // result = this.formatMoney(this.productAmount)
           result = this.formatMoney(this.allFee.payAmount)
         } else  {
           // result = this.formatMoney(this.allFee.orderAmount)
           result = this.formatMoney(this.allFee.payAmount)
         }
       } else {
         if (this.allFee.order_amount === null) {
           result = this.formatMoney(this.goods_amount)
         } else  {
           result = this.formatMoney(this.allFee.order_amount)
         }
       }
       this.totlePrice = result
       // console.log(this.totlePrice)
      return result
    }
  },
  mounted() {
    // console.log("InvoiceMsg",this.invoices)
    // console.log("query",this.$route.params.invoice)
    this.$nextTick(() => {
      // this.kai = typeof this.invoices !== 'undefined' && this.invoices.invoice_title != ''
      // console.log(this.kai)
      if (localStorage.getItem('session')) {
        this.session = localStorage.getItem('session')
      } else {
        const time = new Date().getTime().toString()
        localStorage.setItem('session', time)
        this.session = time
      }

      this.list = JSON.parse(storage.get('myCartList', 0))
      // this.planDays = this.allFee.planDays
      console.log("allFee",this.list)
      this.amount = this.list.length
      this.idList = []
      this.productAmount = 0
      if(this.list != 0){
        this.list.map((item, index) => {
          this.idList.push(item.id)
          this.goodsListLine.push(item.simpleGoodsEntity.categoryId)
          // this.idList.push(item.localSn)
          // this.productAmount = this.productAmount + item.salePrice   localSn
          this.productAmount = parseFloat(this.productAmount + item.salePrice)
          // console.log("productAmount",this.productAmount)
        })
      }

      
      // this.getCouponList() // 获取优惠券列表
      this.getData()
      // if(this.isLogin){
        // this.getData() // 获取地址
        let ua = window.navigator.userAgent.toLowerCase();
        if((ua.match(/MicroMessenger/i)) && !(ua.match(/wxwork/i)) ){
          this.getCode()
        }
      // } 
      // let isWeiXin = ()=>{
      //   return navigator.userAgent.toLowerCase().indexOf('micromessenger')!==-1
      // }
      // if(isWeiXin()){
      //   this.getCode()
      // }
      // this.getOpenId()
      fbq('track', 'InitiateCheckout');

      // 此为迫不得已而为之，不敢改动上一手的代码
      setTimeout(() => {
        this.productNum = document.getElementsByClassName('mod-item').length
      }, 1000)
    })
    
  },
  methods: {
    show(){
      if (!this.hasAddress) {
        if(this.isLogin){
          this.$toast.show(this.lang.toast2)
          const topC = document.getElementsByClassName('layout-main')[0];
  
          let timer = setInterval(() => {
            let ispeed = Math.floor(-this.scrollTop / 5)
            topC.scrollTop = this.scrollTop + ispeed
            if (this.scrollTop === 0) {
              clearInterval(timer)
            }
          }, 22)
          return 
        }
      }
      this.kai = !this.kai
      this.ifShowInvoice = !this.ifShowInvoice
      
      // this.$router.push({
      //   name: 'cart-invoice',
      //   query:{
      //     price:this.totlePrice,
      //     kai:this.kai,
      //     ultimatelyPay: this.ultimatelyPay
      //   }
      // })
    },
     // 关闭发票弹窗
    closeInvoicePop(val){
      this.ifShowInvoice = false
      if(val == true){
        this.kai = !this.kai
      }
      this.invoices = val
    },
    changeType(ind) {
      
      this.typeIndex = ind
      let pay = 0
      if(this.typeIndex == 0){
        if(this.$store.state.platform === 21){
          pay = 2
        } else {
          pay = 6
        }
      }else if(this.typeIndex == 1){
        if(this.$store.state.platform === 21){
          pay = 1
        }else{
          pay = 9
        }
      }
      console.log("选择哪一个",ind,pay)

      // if(pay == 81 || pay == 82 || pay == 83 || pay == 84 || pay == 89 || pay == 9){
      //   this.ifShowPop = true
      //   return
        
      //   this.$toast.show(this.lang.firstLogin)
      //   // 点击修改滚顶到地址编辑模块
      //   document.getElementById('loginBox').scrollIntoView({
      //     block: 'center',
      //     inline: 'nearest',
      //     behavior: 'smooth'
      //   })
      // }
      if (ind === 5) {
        this.price = this.info.orderAmount
      } else {
        this.price = this.info.orderAmount
      }
    },
    defaultAllFeeInfo() {
      return {
        logisticsFee: 0, // 运费金额 ,
        orderAmount: 0, // 订单金额(实际支付) ,
        otherFee: 0, // 附加费用 ,
        productAmount: 0, // 商品总价 ,
        safeFee: 0, // 保险金额 ,
        taxFee: 0, // 税费金额
        planDays: ``
      }
    },
    showCouponTips() {
      // console.log(this.$refs[index])
      this.$refs['order-coupon-tips'].show()
    },
    showChoose(index) {
      // console.log(this.$refs[index])
      this.$refs[index].show()
    },
    formatMoney: formatMoney,
    // 输入优惠码
    onInputCouponCode() {
      this.cleanSelectedCoupon()
      this.inputCouponInfo = null
      this.preferFee = 0
      this.sureCoupon = false
    },
    // 选择优惠券
    onChangeSelectCoupon() {
      this.cleanInputCoupon()
      this.preferFee = 0
      this.sureCoupon = false
    },
    cleanAndFocusCoupon() {
      this.cleanAllCoupon()
      setTimeout(() => {
        this.$refs['coupon-code-input'].focus()
      }, 100)
    },
    cleanAllCoupon() {
      this.cleanSelectedCoupon()
      this.cleanInputCoupon()
      this.preferFee = 0
      this.sureCoupon = false
    },
    // 清空选择的优惠码信息
    cleanSelectedCoupon() {
      this.selectCouponId = ''
    },
    // 清空输入的优惠码信息
    cleanInputCoupon() {
      this.inputCouponCode = ''
      this.inputCouponInfo = null
    },
    // 去选择地址
    goAddress() {
      this.ifShowAddress = true
      this.id = this.isLogin ? '1' : null
      // const name = this.isLogin ? 'personal-address' : 'personal-editAddress'
      // const id = this.isLogin ? '1' : null
      // this.$router.push({
      //   name: name,
      //   query: {
      //     id: id
      //   }
      // })
    },
    closeAddressPop(id){
      let addr = storage.get('myAdders', '')
      this.ifShowAddress = false
      this.getData() 
      if(addr == ''){
        this.hasAddress = false
        this.address=''
      } else {
        this.queryId = id
      }
      // console.log("this.addr",addr) 
    },
    // 登录下获取相关费用
    getTex(k) {
      var cards = k || [];
      var cardL = sessionStorage.getItem('cardList');

      if(cardL != null){
        this.cardList = JSON.parse(cardL);
        cards = JSON.parse(cardL);
      }

      const arr = [];
      var obj = {cart_id: '', coupon_id: ''};
      for (const i in this.list) {
        arr.push({...obj})
        arr[i].cart_id = this.list[i].id;

        if(this.list[i].coupon.hasOwnProperty('discount')){
          arr[i].coupon_id = this.list[i].coupon.discount.coupon_id
        }
      }

      this.canSubmit = false
      let data = {}
      let url = ''
      if (this.isLogin) {
        if(this.idList.length){
          url = `/web/member/order/tax`
          data = {
            addressId: this.address.id,
            cards: cards,
            // preferFee: this.preferFee,
            // cartIds: this.idList.join(',')
            carts: arr,
            coupon_id: this.couponCodeR.couponId
          }

          this.$axios({
            method: 'post',
            url: url,
            data: data
          })
          .then(res => {
            // console.log("费用",res)
            this.canSubmit = true
            this.allFee = res

            if(res.cards !== undefined){
              this.cardType = 2;
              this.useAmount = JSON.parse(JSON.stringify(res.cards))
            }else{
              this.cardType = 1;
            }

            this.orderTotalAmount = res.orderAmount;
            this.ultimatelyPay = res.payAmount;
            this.coin = res.currency
            this.currency = res.currency;

            this.planDays = this.allFee.planDays

            // this.info=res.details
            // console.log("费用>>>>>>>>",this.info)

            this.couponAll = res.coupons
            this.couponAlready = res.myCoupons;

            if(res.myCoupons.length != 0){
              this.ifShowCouponMoney = true
            }else{
              this.ifShowCouponMoney = false
            }

          })
          .catch(err => {
            this.canSubmit = false
            this.$toast.show(err.message)
            this.allFee = this.defaultAllFeeInfo()

            // console.log("ggg",this.allFee)
          })
        }else{
          var that = this;
          this.$toast.show(that.lang.msg10)
          var timer = setTimeout(function(){
            that.$router.replace('/cart');
            clearTimeout(timer)
          },2000)
        }
      } else {
        if(this.list.length){
          url = `/web/member/order-tourist/tax`
          const goodsCartList=[]
          var coupon_discount = ''
          for (const i in this.list) {
            if(this.list[i].coupon.hasOwnProperty('discount')){
              coupon_discount = this.list[i].coupon.discount.coupon_id;
            }

            const o = {
              goods_id: this.list[i].goodsDetailsId,
              goods_type: this.list[i].goodsStatus,
              goods_num: 1,
              group_type: this.list[i].groupType !== 0 ? this.list[i].groupType : null,
              group_id: this.list[i].groupId,
              createTime: this.list[i].createTime,
              coupon_id: coupon_discount
            }
            goodsCartList.push(o)
            coupon_discount = ''
            // console.log("list........",o)
          }
          data = {goodsCartList:goodsCartList,coupon_id: ''}

          // console.log("list........",data)
          this.$axios({
            method: 'post',
            url: url,
            data: data
          })

          .then(res => {
            this.canSubmit = true
            this.allFee = res
            this.coin = res.currency
            // console.log("费用",this.allFee)

            if(res.cards !== undefined){
              this.useAmount = JSON.parse(JSON.stringify(res.cards))
            }

            this.orderTotalAmount = res.order_amount;
            this.ultimatelyPay = res.pay_amount;
            this.currency = res.currency;
            this.priceHKD = res.order_amount_HKD

            this.planDays = this.allFee.planDays

            // this.info=res.details
            // console.log("费用>>>>>>>>",this.info)
          })
          .catch(err => {
            this.canSubmit = false
            this.$toast.show(err.message)
            this.allFee = this.defaultAllFeeInfo()

            // console.log("ggg",this.allFee)
          })
        }else{
          var that = this;
          this.$toast.show(that.lang.msg10)
          var timer = setTimeout(function(){
            that.$router.replace('/cart');
            clearTimeout(timer)
          },2000)
        }
      }

    },
    // 获取地址
    getData() {
      if (this.isLogin) {
        const _this = this
        _this
          .$axios({
            method: 'get',
            url: `/web/member/address`
          })
          .then(res => {
            _this.address = ''
            _this.hasAddress = false
            // console.log("address",res.data)
            if (res && res.length > 0) {
              res.map((item, index) => {
                // console.log("item",this.queryId)
                if (this.queryId) {
                  if (
                    this.queryId === item.id ||
                    this.queryId === JSON.stringify(item.id)
                  ) {
                    _this.address = item
                    _this.hasAddress = true
                  }
                } else if (!this.queryId && item.is_default == 1) {
                  _this.address = item
                  _this.hasAddress = true
                }
              })
            }
            if (this.hasAddress) {
              // 获取相关费用
              this.getTex()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        const address = storage.get('myAdders', 0)
        if (address) {
        // console.log("address",address)
          this.hasAddress = true
          this.address = {
            // id: address.id,
            firstname: address.firstname,
            lastname: address.lastname,
            mobile_code: address.mobile_code,
            mobile: address.mobile,
            country_name: address.country_name,
            province_name: address.province_name,
            city_name: address.city_name,
            country_id: address.country_id,
            province_id: address.province_id,
            city_id: address.city_id,
            email: address.email,
            address_details: address.address_details,
            zip_code: address.zip_code
          }
        }
        // if (this.hasAddress) {
          // 获取相关费用
          this.getTex()
        // }
      }
    },
    getCode() { // 静默授权
      var local = window.location.href // 获取页面url
      // console.log("url",this.code)
      var appid = 'wx8333dcbf196b0ad3' 
      this.code = this.getUrlCode().code // 截取code
      let wxid =  localStorage.getItem('openid') 
      // localStorage.setItem('WeiXin_Code',this.code)
     if(wxid == null || wxid == '' || wxid == undefined){
      if (this.code == null || this.code === '') { // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
      } else {
        console.log("openId",wxid)  
        this.getOpenId (this.code)
      }
     }
    },
    getUrlCode() { // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
          var str = url.substr(1)
          var strs = str.split("&")
          for(var i = 0; i < strs.length; i ++) {
              theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
          }
      }
      return theRequest
    },
    getOpenId (code) { // 通过code获取 openId等用户信息
        let _this = this 
        this.$axios({ 
        method: 'get',
        url: `/web/member/wechat/user-info`,
        params: {
          code: code
        }
      })
      .then(res => {
        localStorage.setItem('openid',res.openid) 
        // this.openId = res.data
        console.log("openid",res.openid)
      })
      .catch(err => {
        this.$toast.show(err.message)
      })
    },
    // 支付
    //  已登录创建订单
    createOrder() {
      // 创建订单后删除地址
      if(this.typeIndex != 0 && this.typeIndex != 1){
        this.ifShowPop = true
        return
      }
      this.$nuxt.$loading.start()
      let pay = 0
      if(this.typeIndex == 0){
        if(this.$store.state.platform === 21){
          pay = 2
        }else {
          pay = 6
        }
      }else if(this.typeIndex == 1){
        if(this.$store.state.platform === 21){
          pay = 1
        } else{
          pay = 9
        }
      }
      if (!this.isLogin) {
          if(this.typeIndex===''){
           this.$toast.show(this.lang.toast4)
           this.$nuxt.$loading.finish()
           return
         }
        //  if(this.typeIndex == 2 || this.typeIndex == 3 || this.typeIndex == 4 || this.typeIndex == 5){
        //     this.$toast.show(this.lang.firstLogin)
        //     this.$nuxt.$loading.finish()
        //     return
        //  }
       }
      if (this.isLogin) {
        if (!this.hasAddress) {
          this.$toast.show(this.lang.toast2)
          const topC = document.getElementsByClassName('layout-main')[0];

          let timer = setInterval(() => {
            let ispeed = Math.floor(-this.scrollTop / 5)
            topC.scrollTop = this.scrollTop + ispeed
            if (this.scrollTop === 0) {
              clearInterval(timer)
            }
          }, 22)
          this.$nuxt.$loading.finish()
          return
        }

        if(this.address.platforms.indexOf(this.platform) === -1){
          this.$toast.show(this.lang.toast5)
          const topC = document.getElementsByClassName('layout-main')[0];

          let timer = setInterval(() => {
            let ispeed = Math.floor(-this.scrollTop / 5)
            topC.scrollTop = this.scrollTop + ispeed
            if (this.scrollTop === 0) {
              clearInterval(timer)
            }
          }, 22)
          this.$nuxt.$loading.finish()
          return
        }
      } else {
        if(pay!== 6){
          if (!this.hasAddress) {
            this.$toast.show(this.lang.addrTip)
            const topC = document.getElementsByClassName('layout-main')[0];
  
            let timer = setInterval(() => {
              let ispeed = Math.floor(-this.scrollTop / 5)
              topC.scrollTop = this.scrollTop + ispeed
              if (this.scrollTop === 0) {
                clearInterval(timer)
              }
            }, 22)
            this.$nuxt.$loading.finish()
            return
          }
        }
      }
      let info = {}
      if(this.kai == true){
        info = this.invoices
      }
      

      if (this.isLogin) {
        const arr = [];
        var obj = {cart_id: '', coupon_id: ''};
        for (const i in this.list) {
          arr.push({...obj})
          arr[i].cart_id = this.list[i].id;

          if(this.list[i].coupon.hasOwnProperty('discount')){
            arr[i].coupon_id = this.list[i].coupon.discount.coupon_id
          }
        }
        this.$axios({
          method: 'post',
          url: `/web/member/order/create`,
          data: {
            carts: arr,
            buyer_remark: this.userRemark,
            order_amount: this.allFee.orderAmount,
            buyer_address_id: this.address.id,
            invoice: info,
            card: this.cardList,
            coupon_id: this.couponCodeR.couponId
          }
        })
          .then(res => {
            // console.log("总额",res)
            if(res.payStatus == 1){
              this.$toast.show(this.lang.submitSuccessfully);
              this.$router.replace({
                path: '/personal/order',
              })
            }else{
              this.$router.replace({
                name: 'cart-pay',
                query: {
                  info: JSON.stringify(res),
                  code: JSON.stringify(this.code)
                }
              })
            }
          })
          .catch(err => {
            this.$nuxt.$loading.finish()
            this.$toast.show(err.message)
          })
      } else {
        if(this.$store.state.platform === 21){
          this.PayWechat()
        }else {
          const data = []
          let baseUrl=this.$store.getters.baseUrl
          for (const i in this.list) {
            let coupon_discount = ""
            if(this.list[i].coupon.hasOwnProperty('discount')){
              coupon_discount = this.list[i].coupon.discount.coupon_id;
            }
            for(var k in this.list[i].goodsAttr){
              for(var j in this.list[i].goodsAttr[k]){
                if(j == 'goodsId'){
                  this.list[i].goodsAttr[k]['goods_id'] = this.list[i].goodsAttr[k][j]
                  delete this.list[i].goodsAttr[k]['goodsId']
                }
                if(j == 'configId'){
                  this.list[i].goodsAttr[k]['config_id'] = this.list[i].goodsAttr[k][j]
                  delete  this.list[i].goodsAttr[k]['configId']
                }
                if(j == 'configAttrId'){
                  this.list[i].goodsAttr[k]['config_attr_id'] = this.list[i].goodsAttr[k][j]
                  delete  this.list[i].goodsAttr[k]['configAttrId']
                }
                if( this.list[i].goodsAttr[k]['goods_id'] == null){
                  delete this.list[i].goodsAttr[k]['goods_id']
                }
                delete this.list[i].goodsAttr[k]['configVal']
                delete this.list[i].goodsAttr[k]['configAttrIVal']
               
              }
            }
            // console.log("ddddd",this.list[i].goodsAttr)
            const o = {
              createTime: this.list[i].createTime,
              goods_num: 1,
              goodsDetailsId: this.list[i].goodsDetailsId,
              goods_id: this.list[i].goodsDetailsId,
              group_id: this.list[i].groupId,
              goods_type: this.list[i].goodsStatus,
              group_type: this.list[i].groupType !== 0 ? this.list[i].groupType : null,
              coupon_id: coupon_discount,
              goods_attr:this.list[i].goodsAttr
            }
            data.push(o)
          }
          if(data.length){
            this.$axios({
              method: 'post',
              url: `/web/member/order-tourist/create`,
              data: {
                goodsCartList:data,
                address:this.address,
                invoice: info,
                tradeType:'wap',
                payType: pay,
                coinType:this.$store.state.coin,
                returnUrl:baseUrl+'/complete/paySuccess?order_sn={order_sn}', //http://localhost:8328
                buyer_remark: this.userRemark,
              }
            })
              .then(res => {
                console.log("返回结果",res)
                if (res.config) {
                  if(pay == 9){
                    // 测试key
                    let TestKey = "pk_test_51Hh91GEg2ty3UyHNujJu3xu3nemS1rzfb14kys3CImsO1iCtpprr082i0Gfbe9EQ3cWLc5KBoKS2azrE4IIFB5Gu00GgMY0bLj"
                    // 正式key
                    let formalKey = "pk_live_51Hh91GEg2ty3UyHNGwh4IfEY1BgtJ1FHVNy0zQBoVclAfEp1YX7W8kOmpYaUvoxwKtYvfbPQ1HlOzj1wksI7sPN900zzHU8v9c"

                    let stripe = Stripe(TestKey);
                    let host = window.location.host
                    if ((/(msjew)\.com/).test(host)) {
                      stripe = Stripe(formalKey);// 正式key
                    } else if((/(msjew.bddco)\.cn/).test(host)){
                      stripe = Stripe(TestKey); // 测试key
                    }
              
                    return stripe.redirectToCheckout({ sessionId: res.config });
                  } else {

                    window.location.replace(res.config)
                  }
                } else if (!res.config){
                  this.isPay = false
                  this.$router.replace({
                    name: 'complete-paySuccess-orderId-price-coinType',
                    params: {
                      orderId: this.info.orderId,
                      price: this.info.orderAmount,
                      coinType: this.info.coinType
                    }
                  })
                }
                // this.$router.replace({
                //   name: 'cart-pay',
                //   query: {
                //     info: JSON.stringify(res)
                //   }
                // })
              })
              .catch(err => {
                this.$nuxt.$loading.finish()
                this.$toast.show(err.message)
              })
          }else{
            // console.log('')
          }
        }
      }
    },
    // 大陆微信支付
    PayWechat() {
      this.isPay = true
      console.log("aaa",this.address)
      if(this.info.coinType === 'USD'){
        if(this.typeIndex == 2){
          this.$toast.show(this.lang.NotSupportPay)
          return
        }
        if(this.typeIndex == 3){
          this.$toast.show(this.lang.NotSupportPay)
          return
        }
        if(this.typeIndex == 4){
          this.$toast.show(this.lang.NotSupportPay)
          return
        }
      }
      let pay = ""
      if(this.typeIndex == 0){
        if(this.$store.state.platform === 21){
          pay = 2
        } else {
          pay = 6
        }
      }else if(this.typeIndex == 1){
        if(this.$store.state.platform === 21){
          pay = 1
        } else{
          pay = 9
        }
      }

      let info = {}
      if(this.kai == true){
        info = this.invoices
      }
      console.log("sssswsinfo",this.order_sn)
      let baseUrl=this.$store.getters.baseUrl
      let orderId = this.info.orderId
      let tradeType = ''
      const data = []

      for (const i in this.list) {
        let coupon_discount = ""
        if(this.list[i].coupon.hasOwnProperty('discount')){
          coupon_discount = this.list[i].coupon.discount.coupon_id;
        }
        for(var k in this.list[i].goodsAttr){
          for(var j in this.list[i].goodsAttr[k]){
            if(j == 'goodsId'){
              this.list[i].goodsAttr[k]['goods_id'] = this.list[i].goodsAttr[k][j]
              delete this.list[i].goodsAttr[k]['goodsId']
            }
            if(j == 'configId'){
              this.list[i].goodsAttr[k]['config_id'] = this.list[i].goodsAttr[k][j]
              delete  this.list[i].goodsAttr[k]['configId']
            }
            if(j == 'configAttrId'){
              this.list[i].goodsAttr[k]['config_attr_id'] = this.list[i].goodsAttr[k][j]
              delete  this.list[i].goodsAttr[k]['configAttrId']
            }
            if( this.list[i].goodsAttr[k]['goods_id'] == null){
              delete this.list[i].goodsAttr[k]['goods_id']
            }
            delete this.list[i].goodsAttr[k]['configVal']
            delete this.list[i].goodsAttr[k]['configAttrIVal']
            
          }
        }
        // console.log("ddddd",this.list[i].goodsAttr)
        const o = {
          createTime: this.list[i].createTime,
          goods_num: 1,
          goodsDetailsId: this.list[i].goodsDetailsId,
          goods_id: this.list[i].goodsDetailsId,
          group_id: this.list[i].groupId,
          goods_type: this.list[i].goodsStatus,
          group_type: this.list[i].groupType !== 0 ? this.list[i].groupType : null,
          coupon_id: coupon_discount,
          goods_attr:this.list[i].goodsAttr
        }
        data.push(o)
      }
      if(pay == 1){
        let ua = window.navigator.userAgent.toLowerCase();
        if((ua.match(/MicroMessenger/i)) && !(ua.match(/wxwork/i)) ){  //企业微信客户端
          tradeType = 'js'
        }else{
          tradeType = 'mweb'
        }
      }else {
        tradeType = 'wap'
      }
      // this.getCode()
      // console.log("code",this.code) 
      const openid = localStorage.getItem('openid')
      this.$axios({ 
        method: 'post',
        url: `/web/member/order-tourist/create`,
        data: {
          goodsCartList:data,
          address:this.address,
          invoice: info,
          openid: openid,
          // orderId: orderId,
          coinType:this.$store.state.coin,
          payType: pay,
          tradeType: tradeType,
          buyer_remark: this.userRemark,
          returnUrl: baseUrl+'/complete/paySuccess?order_sn={order_sn}'
        }
      })
      .then(res => {
        // console.log("res1111111",res)
        this.order_sn = res.order_sn
        if(tradeType == 'mweb'){
          // alert(111111111111)
          window.location.replace(res.config+'&redirect_url='+encodeURIComponent(baseUrl+'/complete/paySuccess?order_sn='+this.order_sn+'&payType='+pay))
        }else if(tradeType == 'js'){
          function onBridgeReady(){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                  "appId":res.appId,     //公众号名称，由商户传入     
                  "timeStamp":res.timeStamp,         //时间戳，自1970年以来的秒数     
                  "nonceStr":res.nonceStr, //随机串     
                  "package":res.package,     
                  "signType":res.signType,         //微信签名方式：     
                  "paySign":res.paySign //微信签名 
                },
                function(url){
                  return function(res) {
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                      window.location.replace(url)
                  }
                }
            }(baseUrl+'/complete/paySuccess?order_sn='+this.order_sn+'&payType='+pay)); 
          }
          if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
          }else{
            onBridgeReady();
          }
        }else{
          if(res.config){
            window.location.replace(res.config)
          }
        }
      })
      .catch(err => {
        this.$nuxt.$loading.finish()
        console.log(err)
        this.$toast.show(err.message)
      })
    },
    gologin() {
      this.ifShowPop = true
    },
    // 关闭弹窗
    closeCardPop(k){
      this.ifShowShoppingCard = false;

      if(k != true && k != ''){
        this.cardList = k;
        sessionStorage.setItem('cardList', JSON.stringify(k))
        this.getTex(k);
        this.cardType = 2;
      }

      if(k == ''){
        this.cardType = 1;
        this.cardList = '';
        sessionStorage.removeItem('cardList')
        this.getTex();
      }
    },
    addCard(){
      if(this.isLogin){
        this.ifShowShoppingCard = true
      }else{
        this.ifShowPop = true
      }
    },
    closeCo(k) {
      this.ifShowCoupon = false
      if(k && k!=-1){
        if(k.couponId){
          this.couponCodeR.couponId = k.couponId;
          this.couponCodeR.couponPrice = k.couponCode;
        }
  
        this.getTex();
      } else if(!k){
        this.couponCodeR.couponId = '';
        this.couponCodeR.couponPrice = '';
        this.getTex();
      }
    },
    useCoupon() {
      if(this.isLogin){
        this.ifShowCoupon = true
      }else{
        this.$toast.show('登陆后才能使用优惠券');
      }
    },
    closePop() {
      this.ifShowPop = false
    }

  },
  beforeRouteLeave(to, from, next){
    if(to.path !== '/cart/invoice'){
      sessionStorage.removeItem('cardList')
    }
    next()
  }
}
</script>

<style scoped lang="less">
.point{
  width: 100%;
  text-align: right;
  color:#999;
  font-size: 12px;
}
.sure-oredr {
  .is-login {
    width: 100%;
    padding: 8px 15px;
    background: linear-gradient(
      270deg,
      rgba(242, 155, 135, 1) 0%,
      rgba(242, 155, 135, 1) 46%,
      rgba(242, 155, 135, 1) 100%
    );
    font-size: 12px;
    line-height: 16px;
    word-break: keep-all;
    text-align: left;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    .icongantanhao1 {
      font-size: 12px;
    }
    a {
      text-decoration: underline;
      color: rgba(255, 255, 255, 1);
    }
  }
  .address {
    width: 100%;
    background: #f2f2f2;
    padding: 10px 12px 0;
    .has-address {
      position: relative;
      padding: 24px 16px;
      background: #ffffff;
      text-align: left;
      border-radius: 5px 5px 0 0;
      div {
        display: flex;
        justify-content: space-between;
        text-align: center;
        span {
          font-size: 16px;
          font-weight: 400;
          line-height: 18px;
          color: rgba(51, 51, 51, 1);
        }
        span:nth-child(2) {
          width: 50px;
          height: 18px;
          background: rgba(253, 247, 245, 1);
          font-size: 12px;
          line-height: 18px;
          font-weight: 400;
          color: rgba(242, 155, 135, 1);
        }
      }
      p {
        font-size: 16px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin: 8px 0 0;
      }
      .p {
        display: inline-block;
        width: 250px;
        height: 36px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 18px;
      }
      .iconyou {
        float: right;
        font-size: 14px;
        color: #999999;
      }
      img {
        position: absolute;
        left: 0px;
        bottom: 0px;
        height: 8px;
        width: 100%;
      }
    }
    .no-address {
      display: flex;
      padding: 24px 16px;
      background: #ffffff;
      text-align: left;
      border-radius: 5px;
      justify-content: space-between;
      .iconweizhiyuyan {
        width: 26px;
        height: 26px;
        background: linear-gradient(
          180deg,
          rgba(242, 155, 135, 1) 0%,
          rgba(255, 122, 119, 1) 100%
        );
        border-radius: 50%;
        font-size: 16px;
        line-height: 26px;
        text-align: center;
        color: #ffffff;
      }
      span {
        text-align: left;
        width: 240px;
        height: 26px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        font-size: 16px;
        line-height: 26px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .iconyou {
        width: 26px;
        height: 26px;
        font-size: 16px;
        line-height: 26px;
        text-align: center;
        color: #999999;
      }
    }
  }
  .footer {
    width: 100%;
    background: #f2f2f2;
    padding: 10px 12px 10px;
    .content {
      padding: 24px 16px;
      background: #ffffff;
      text-align: left;
      border-radius: 5px 5px 0 0;
      .time {
        display: flex;
        height: 40px;
        padding-bottom: 20px;
        justify-content: space-between;
        border-bottom: 1px solid #dddddd;
        margin-bottom: 12px;
        span {
          height: 16px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
      .send {
        margin-bottom: 20px;
        b {
          display: inline-block;
          font-size: 14px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          margin-bottom: 6px;
        }
        p {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
        .btn {
          float: right;
          width: 55px;
          height: 28px;
          background: rgba(242, 155, 135, 1);
          border-radius: 14px;
          text-align: right;
          span {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin: 2px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 2px 2px 0px rgba(186, 105, 87, 0.52);
            border-radius: 50%;
          }
        }
        .active {
          background: #dcdcdc;
          text-align: left;
          span {
            box-shadow: 0px 2px 2px 0px rgba(188, 188, 188, 0.52);
          }
        }
      }
      .input-mod {
        margin-bottom: 20px;
        .tips {
          font-size: 16px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          word-break: normal;
          margin-bottom: 15px;
          span:nth-child(1) {
            color: #ea4a4a;
            padding: 0 4px;
            vertical-align: -2px;
          }
        }
      }
      .text-area {
        margin-bottom: 20px;
        position: relative;
        p {
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 12px;
        }
        textarea {
          padding: 12px 10px;
          width: 100%;
          // width: 321px;
          height: 40px;
          font-size: 14px;
          line-height: 14px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(187, 187, 187, 1);
          color: #333333;
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
        .tex-count{
          position: absolute;
          right:0;
          bottom: 50px;
        }

        .color-red{
          color: red;
        }
      }
      .coupon {
        .operate {
          display: flex;
          flex-direction: row;
          align-items: center;

          .choose {
            flex-grow: 1;
            flex-shrink: 1;
            position: relative;
            /*width: 210px;*/
            height: 40px;
            margin-right: 10px;
            padding: 0 10px;
            border: 1px solid #bbbbbb;
            box-sizing: border-box;
            display: flex;
            align-items: center;

            .coupon-code {
              flex-grow: 1;
              flex-shrink: 1;
              position: relative;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
              min-width: 0;
              overflow: hidden;

              input {
                width: 100%;
                text-align: left;
              }

              .select-coupon-info {
                width: 100%;
              }
            }

            .coupon-select {
              flex-grow: 0;
              flex-shrink: 0;
              position: relative;

              .iconfont {
                font-size: 17px;
                color: #666666;
                display: inline-block;
                transform: rotateZ(90deg);
              }

              select {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 2;
              }
            }
          }
          .exchange {
            flex-grow: 0;
            flex-shrink: 0;
            margin-right: 3px;

            button {
              width: 80px;
              height: 40px;
              background-color: #f29c88;
              text-align: center;
              font-size: 14px;
              font-weight: 400;
              color: #ffffff;
            }

            &.disabled {
              button {
                background-color: #999999;
              }
            }
          }
          .icon {
            flex-grow: 0;
            flex-shrink: 0;
            width: 14px;
            height: 14px;
            background: rgba(242, 156, 136, 1);
            border-radius: 50%;
            text-align: center;

            .icongantanhao2 {
              font-size: 10px;
              color: #ffffff;
            }
          }
        }
      }
      .price {
        .use-coupon{
          text-decoration: underline;
          color: rgba(242, 156, 136, 1);
        }
        li {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          line-height: 32px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);

          .using-coupon,
          .delete-coupon {
            font-size: 12px;
            font-weight: 400;
            color: #f29c88;
            margin-right: 5px;
          }
        }
        li:first-child {
          line-height: 40px;
          margin: 5px 0 2px;
          border-bottom: 1px solid #dddddd;
          span:first-child {
            font-size: 14px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
          span:last-child {
            font-size: 14px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        li.order-pay{
          line-height: 20px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #dddddd;
          span:last-child {
            font-size: 20px;
            font-family: twCenMt;
            font-weight: 400;
            color: rgba(242, 155, 135, 1);
          }
        }
      }
    }
  }
  .submit {
    width: 100%;
    height: 50px;
    background: #ffffff;
    border-top: 1px solid #ffffff;
    box-shadow: 0px -1px 2px 0px rgba(172, 172, 172, 0.4);

    span {
      display: inline-block;
      width: 351px;
      height: 40px;
      margin: 5px auto;
      background: rgba(51, 51, 51, 1);
      border-radius: 8px;
      font-size: 16px;
      line-height: 40px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }

    &.disabled {
      span {
        background: #ddd;
        color: #aaa;
      }
    }
  }
  .question {
    display: inline-block;
    font-size: 12px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #f29b87;
    color: white;
    text-align: center;
    line-height: 14px;
  }
}
// 发票
.invoice{
  .underline{
    text-decoration: underline;
    color:#75BEEE;
  }
  .title{
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    display: flex;
    justify-content: space-between;
  }
}
// 支付方式
.payways{
  background: #f2f2f2;
  padding: 0.266667rem 0.32rem 0;
}
.pay {
  padding-bottom: 20px;
  padding: 24px 16px;
  background: #ffffff;
  // text-align: left;
  border-radius: 5px;
  position: relative;
  .proce {
    padding: 30px 0 20px;
    font-size: 28px;
    font-family: twCenMt;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-bottom: 8px solid #f6f6f6;
    .note{
      font-size: 12px;
      color: #cac7c7;
      position: absolute;
      top:10px;
      right:25px;
      .star{
        color: red;
      }
    }
    span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .price-hkd{
      color: rgba(242, 155, 135, 1);
    }
  }
  .select-proce{
    font-size: 21px;
    padding: 8px 0 20px;
  }
  ul {
    li {
      width: 100%;
      img {
        width: 32px;
        height: 32px;
        margin: 24px 16px 0;
        float: left;
      }
      .right {
        position: relative;
        text-align: left;
        margin-left: 64px;
        padding: 10px 0px 12px;
        border-bottom: 1px solid #dddddd; /*no*/
        span {
          float: right;
          width: 20px;
          height: 20px;
          margin: 20px 12px 0 0;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(187, 187, 187, 1); /*no*/
          border-radius: 50%;
        }
        .ph {
          display: inline-block;
          float: none;
          width: 16px;
          height: 16px;
          background: rgba(242, 155, 135, 1);
          border-radius: 50%;
          font-size: 12px;
          line-height: 16px;
          color: #ffffff;
          text-align: center;
          border: none;
        }
        .icongou {
          background: rgba(242, 155, 135, 1);
          border-radius: 50%;
          font-size: 18px;
          line-height: 20px;
          color: #ffffff;
          text-align: center;
          border: 1px solid rgba(242, 155, 135, 1); /*no*/
        }
        b {
          font-size: 14px;
          line-height: 24px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        p {
          font-size: 12px;
          line-height: 20px;
          width: 86%;
          word-break: keep-all;
          font-family: PingFangHK-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  .tips {
    padding: 15px 0 20px;
    i {
      font-size: 14px;
      color: #999999;
      margin-right: 2px;
    }
    span {
      font-size: 12px;
      line-height: 14px;
      color: #999999;
    }
  }
  .btn {
    width: 345px;
    height: 40px;
    margin: 0 auto;
    background: rgba(51, 51, 51, 1);
    border-radius: 8px;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}

.color-pink{
  color: #f29b87;
}

.addShoppingCard{
  float: right;
  height: 28px;
  line-height: 26px;
  padding: 0 6px;
  border: 1px solid #f29b87;
  margin-bottom: 20px;
  color: #f29b87;
  border-radius: 4px;
}

.clf::after{
  display: block;
  height: 0;
  content: '.';
  visibility: hidden;
  clear: both;
  opacity: 0;
}

.hint-color{
  color: #f29b87 !important;
}

</style>
