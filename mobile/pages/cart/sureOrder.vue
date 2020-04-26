<template>
  <div class="sure-oredr">
    <Header :title="lang.sureOrder" />
    <div v-if="!isLogin" class="is-login">
      <i class="icon iconfont icongantanhao1"></i>
      <a @click="gologin(1)">{{ lang.login }}</a>
      <span>{{ lang.settlement }}</span>
      <a @click="gologin">{{ lang.accont }}</a>
      <span>{{ lang.any }}</span>
    </div>
    <div class="address">
      <div v-if="hasAddress" class="has-address" @click="goAddress">
        <div>
          <span>{{ address.firstname }} {{ address.lastname }}</span
          ><span v-if="!$route.query.id">{{ lang.default }}</span>
        </div>
        <p>{{ address.mobile_code }} {{ address.mobile }}</p>
        <p class="p ow-h2">
          {{ address.country_name }}-{{ address.province_name }}-{{
            address.country_name
          }}-{{ address.address_details }}
        </p>
        <i class="icon iconfont iconyou"></i>
        <img src="~/static/cart/address.png" />
      </div>
      <div v-if="!hasAddress&&isLogin" class="no-address" @click="goAddress">
        <i class="icon iconfont iconweizhiyuyan"></i>
        <span>{{ lang.address }}</span>
        <i class="icon iconfont iconyou"></i>
      </div>
    </div>
    <!-- 支付方式 -->
    <div class="payways" v-if="!isLogin">
      <div class="pay">
        <!-- <Header :title="lang2.pay" tips="1" />
        <div class="proce">
          <span>{{ info.coinType }} </span>
          {{ formatMoney(price) }}
        </div> -->
        <ul>
          <li v-for="(item, index) in list2" :key="index">
            <!-- v-show="price > 0 || (price == 0 && item.type === 5)" -->
            <div >
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

        <!--    unionPayHide-->
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

    <CartList :list="list" />
    <div class="footer">
      <div class="content">
        <div class="time">
          <span>{{ lang.time }}</span
          ><span>{{ planDays }}{{ lang.week }}</span>
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
            maxlength="300"
            :placeholder="lang.more"
          ></textarea>
        </div>

        <!-- 添加购物卡 -->
        <div class="clf">
          <div class="addShoppingCard fr" @click="addCard()">+{{this.cardList.length == 0 ? lang.useShoppingCard : lang.editOrUnbound}}</div>
        </div>
        <!-- 开具发票 -->
        <!-- <div class="invoice" v-if="this.areaId === '1'"> -->
        <div class="invoice" v-if="'1'">
          <div class="title">
            <span>{{ lang3.invo }}</span>
            <div>
              <span class="underline" v-show="!kai" @click="show">{{ lang3.NotInvoiced }}</span>
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
            <span>{{ lang.allFee }} </span
            ><span
              >{{ coin }}
              {{ formatMoney( productAmount) }}</span
            >
          </li>
					<li v-for="item in useAmount">
					  <div>
					    <span>{{ lang.shoppingCard }}</span> <span>({{item.sn}})</span>
					  </div>
					  <span class="color-pink">-{{ coin }} {{ formatMoney(item.useAmount) }}</span>
					</li>
          <li v-show="preferFee > 0">
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
          </li>
          <li>
            <div>
              <span>{{ lang.logisticsFee }}</span>
              <span class="question" @click="showChoose(`orderExpress`)"
                >!</span
              >
            </div>
            <span>+{{ coin }} {{ formatMoney(allFee.logisticsFee) }}</span>
          </li>
          <li>
            <div>
              <span>{{ lang.taxFee }}</span>
              <span class="question" @click="showChoose(`orderTex`)">!</span>
            </div>
            <span>+{{ coin }} {{ formatMoney(allFee.taxFee) }}</span>
          </li>
          <li>
            <div>
              <span>{{ lang.safeFee }}</span
              ><span class="question" @click="showChoose(`orderSafe`)">!</span>
            </div>
            <span>+{{ coin }} {{ formatMoney(allFee.safeFee) }}</span>
          </li>
          <li class="order-pay">
            <!-- formatMoney(allFee.productAmount || productAmount) -->
            <span>{{ lang.orderAmount }}</span
            ><span>{{ coin }} {{ formatMoney(orderTotalAmount) }}</span>
          </li>
          <li class="order-pay" style="border-top: 0;margin-top: 0;">
            <span>{{ lang.NeedPay }}</span
            ><span>{{ coin }} {{ formatMoney(ultimatelyPay) }}</span>
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
    <shopping-card v-if="ifShowShoppingCard" @closePop="closeCardPop" :cardType="useAmount" :goodsLine ="goodsListLine" :currencyType="currency"></shopping-card>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import CartList from '@/components/cart/cartlist.vue'
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
    ShoppingCard
  },
  data() {
    return {
      kai:false,
      url:'',
      lang2: this.LANGUAGE.cart.pay,
      lang3: this.LANGUAGE.cart.invoice,
      coin: this.$store.state.coin,
      form: [],
      actionLink: '',
      list2: [
        {
          url: '/cart/pay.png',
          type: 6,
          title: this.LANGUAGE.cart.pay.payType0,
          des: this.LANGUAGE.cart.pay.type0Text
        },
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
        {
          url: '/cart/card.png',
          type: 81,
          title: this.LANGUAGE.cart.pay.payType1,
          des: this.LANGUAGE.cart.pay.type1Text
        }
        // {
        //   url: '/cart/paydollar.png',
        //   type: 8,
        //   title: this.LANGUAGE.cart.pay.payType3,
        //   des: this.LANGUAGE.cart.pay.type3Text
        // }
      ],
      sum: '2,120.00',
      info:'',
      price:'',
      typeIndex:0,
      // info: JSON.parse(this.$route.query.info),
      // price: JSON.parse(this.$route.query.info).orderAmount,
      // typeIndex: JSON.parse(this.$route.query.info).orderAmount === 0 ? 5 : 0,
      needtips: false,

      lang: this.LANGUAGE.cart.sureOrder,
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
      cardList: [],
      useAmount: [],
      cardType: 1,
      goodsListLine: [],
      scrollTop: 0,
      orderTotalAmount: 0,
      ultimatelyPay: 0,
      currency: ''
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
          //  console.log(11111)
           // result = this.formatMoney(this.productAmount)
           result = this.formatMoney(this.allFee.payAmount)
         } else  {
          //  console.log(22222)
           // result = this.formatMoney(this.allFee.orderAmount)
           result = this.formatMoney(this.allFee.payAmount)
         }
       } else {
         if (this.allFee.order_amount === null) {
          //  console.log(11111)
           result = this.formatMoney(this.goods_amount)
         } else  {
          //  console.log(22222)
           result = this.formatMoney(this.allFee.order_amount)
         }
       }
       this.totlePrice = result
       console.log("dddd",this.totlePrice)
      return result
    }
  },
  created(){
    // console.log("aaaa",)
    //     this.kai = this.$route.query.invoice !== ''
  },
  mounted() {
    // console.log("query",this.$route.params.invoice)
    this.$nextTick(() => {
      this.kai = typeof this.$route.params.invoice !== 'undefined' && this.$route.params.invoice.invoice_title != ''
      // console.log(this.kai)
      if (localStorage.getItem('session')) {
        this.session = localStorage.getItem('session')
      } else {
        const time = new Date().getTime().toString()
        localStorage.setItem('session', time)
        this.session = time
      }

      this.list = JSON.parse(storage.get('myCartList', 0))
      this.planDays = this.allFee.planDays
      // console.log("allFee",this.planDays)
      this.idList = []
      this.productAmount = 0
      if(this.list != 0){
        this.list.map((item, index) => {
          // console.log("sssss=====",item.id)
          this.idList.push(item.id)
          this.goodsListLine.push(item.simpleGoodsEntity.categoryId)
          // this.idList.push(item.localSn)
          //  console.log("sssss",this.productAmount)
          // this.productAmount = this.productAmount + item.salePrice   localSn
          this.productAmount = parseFloat(this.productAmount + item.salePrice)
          // console.log("productAmount",this.productAmount)
        })
      }

      this.getData() // 获取地址
      this.getCouponList() // 获取优惠券列表

      // 此为迫不得已而为之，不敢改动上一手的代码
      setTimeout(() => {
        this.productNum = document.getElementsByClassName('mod-item').length
      }, 1000)
    })
  },
  methods: {
    show(){
      this.kai = !this.kai
      this.$router.push({
        name: 'cart-invoice',
        query:{
          price:this.totlePrice,
          kai:this.kai,
          ultimatelyPay: this.ultimatelyPay
        }
      })
    },
    changeType(ind) {
      console.log("选择哪一个",ind)
      this.typeIndex = ind
      let pay = 0
      if(this.typeIndex == 0){
        pay = 6
      }else if(this.typeIndex == 1){
        pay = 2
      }

      if(pay!==6){
        this.$toast.show(this.lang.firstLogin)
      }
      if (ind === 5) {
        this.price = this.info.orderAmount * 0.985
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
    // 选择登录状态下优惠卷
    selectCupon() {
      if (this.cuponList.length > 0) {
        this.$refs.cupon.show()
      } else {
        this.$toast.show(this.lang.toast1)
      }
    },
    useCoupon() {
      if (this.isLogin) {
        this.getCouponAmount()
      } else {
        this.checkCount()
      }
    },
    // 查询匿名使用优惠卷时可以优惠的金额
    checkCount() {
      // const carts = []
      // const goodList = this.list
      // for (const i in goodList) {
      //   const o = {
      //     createTime: goodList[i].createTime || new Date().getTime(),
      //     goodsCount: 1,
      //     goodsDetailsId: goodList[i].goodsDetailsId,
      //     goodsId: goodList[i].goodsId,
      //     groupId: goodList[i].groupId,
      //     groupType: goodList[i].groupType
      //   }
      //   carts.push(o)
      // }
      // this.$axios({
      //   method: 'post',
      //   url: '/wap/order/getAnonymousCouponAmount',
      //   data: {
      //     couponCode: this.inputCouponCode.trim(),
      //     carts: carts,
      //     session: this.session
      //   }
      // })
      //   .then(data => {
      //     console.log(data)
      //     if (!(data > 0)) {
      //       return
      //     }
      //     // 优惠金额
      //     console.log('优惠金额====>', data)
      //     this.sureCoupon = true
      //     this.preferFee = data
      //     this.inputCouponInfo = {
      //       couponCode: this.inputCouponCode.trim(),
      //       discountAmount: data
      //     }
      //     this.getTex()
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     this.$toast(err.message)
      //     this.cleanAllCoupon()
      //   })
    },
    // 获取优惠券金额
    getCouponAmount() {
      // this.$axios({
      //   method: 'get',
      //   url: `/wap/order/getCouponAmount`,
      //   params: {
      //     couponCode: this.inputCouponCode,
      //     couponId: this.selectCouponId,
      //     cartIds: this.idList.join(',')
      //   }
      // })
      //   .then(data => {
      //     if (!(data > 0)) {
      //       return
      //     }
      //     this.sureCoupon = true
      //     this.preferFee = data
      //     if (this.hasAddress) {
      //       this.getTex()
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      //     this.$toast(err.message)
      //     this.cleanAllCoupon()
      //   })
    },
    // 获取登录状态下优惠卷列表
    getCouponList() {
      // if (this.isLogin && this.list.length > 0) {
      //   this.$axios({
      //     method: 'post',
      //     url: `/wap/order/getCoupons`,
      //     params: {
      //       cartIds: this.idList.join(',')
      //     }
      //   })
      //     .then(res => {
      //       if (res && res.length > 0) {
      //         // [
      //         //   {
      //         //     "couponCode": "string",
      //         //     "couponId": 0,
      //         //     "discountAmount": 0,
      //         //     "discountType": 0
      //         //   }
      //         // ]
      //         res.map(item => {
      //           const map = {
      //             1: `${item.discountAmount}% OFF`,
      //             2: `-HKD ${item.discountAmount}`
      //           }
      //           item.desc = `${item.couponCode}  ${map[item.discountType]}`
      //           return item
      //         })
      //         this.cuponList = res
      //       } else {
      //         this.cuponList = [
      //           {
      //             couponCode: '',
      //             couponId: 0,
      //             discountAmount: 0,
      //             discountType: 0,
      //             desc: '暫無可使用優惠碼'
      //           }
      //         ]
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err)
      //     })
      // }
    },
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
      const name = this.isLogin ? 'personal-address' : 'personal-editAddress'
      const id = this.isLogin ? '1' : null
      this.$router.push({
        name: name,
        query: {
          id: id
        }
      })
    },

    // // 登录下获取相关费用
    // getTex(k) {
    //   const cards = k || '';
    //   this.canSubmit = false
    //   let data = {}
    //   let url = ''
    //   if (this.isLogin) {
    //     url = `/web/member/order/tax`
    //     data = {
    //       addressId: this.address.id,
    //       cards: cards,
    //       // preferFee: this.preferFee,
    //       cartIds: this.idList.join(',')
    //     }
    //   } else {
    //     // console.log("this.list",this.list)
    //     url = `/web/member/order-tourist/tax`
    //     const goodsCartList=[]
    //     for (const i in this.list) {
    //       const o = {
    //         createTime: this.list[i].createTime,
    //         goods_num: 1,
    //         goodsDetailsId: this.list[i].goodsDetailsId,
    //         goods_id: this.list[i].goodsDetailsId,
    //         group_id: this.list[i].groupId,
    //         goods_type: this.list[i].goodsStatus,
    //         group_type:
    //           this.list[i].groupType !== 0 ? this.list[i].groupType : null
    //       }
    //       goodsCartList.push(o)
    //       // console.log("list........",o)
    //     }
    //     data = {goodsCartList:goodsCartList}
    //     // console.log("list........",data)
    //   }

    //   this.$axios({
    //     method: 'post',
    //     url: url,
    //     data: data
    //   })
    //     .then(res => {
    //       // console.log("费用",res)
    //       this.canSubmit = true
    //       this.allFee = res

    //       if(res.cards !== undefined){
    //         this.useAmount = JSON.parse(JSON.stringify(res.cards))
    //       }

    //       this.orderTotalAmount = res.orderAmount;
    //       this.ultimatelyPay = res.payAmount;
    //       this.currency = res.currency;

    //       this.planDays = this.allFee.planDays

    //       // this.info=res.details
    //       // console.log("费用>>>>>>>>",this.info)
    //     })
    //     .catch(err => {
    //       this.canSubmit = false
    //       this.$toast.show(err.message)
    //       this.allFee = this.defaultAllFeeInfo()

    //       // console.log("ggg",this.allFee)
    //     })


    // 登录下获取相关费用
    getTex(k) {
      var cards = k || '';
      var cardL = sessionStorage.getItem('cardList');

      if(cardL != null){
        this.cardList = JSON.parse(cardL);
        cards = JSON.parse(cardL);
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
            cartIds: this.idList.join(',')
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
            this.currency = res.currency;

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
      } else {
        // console.log("this.list",this.list)
        if(this.list.length){
          url = `/web/member/order-tourist/tax`
          const goodsCartList=[]
          for (const i in this.list) {
            const o = {
              createTime: this.list[i].createTime,
              goods_num: 1,
              goodsDetailsId: this.list[i].goodsDetailsId,
              goods_id: this.list[i].goodsDetailsId,
              group_id: this.list[i].groupId,
              goods_type: this.list[i].goodsStatus,
              group_type:
                this.list[i].groupType !== 0 ? this.list[i].groupType : null
            }
            goodsCartList.push(o)
            // console.log("list........",o)
          }
          data = {goodsCartList:goodsCartList}
          // console.log("list........",data)
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
              this.useAmount = JSON.parse(JSON.stringify(res.cards))
            }

            this.orderTotalAmount = res.orderAmount;
            this.ultimatelyPay = res.payAmount;
            this.currency = res.currency;

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
                // console.log("item",item)
                if (this.$route.query.id) {
                  if (
                    this.$route.query.id === item.id ||
                    this.$route.query.id === JSON.stringify(item.id)
                  ) {
                    _this.address = item
                    _this.hasAddress = true
                  }
                } else if (!this.$route.query.id && item.is_default === 1) {
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
          this.hasAddress = true
          this.address = {
            firstName: address.name,
            lastName: address.surname,
            userTelCode: address.userTelCode,
            userTel: address.phone,
            countryName: address.country,
            provinceName: address.province,
            cityName: address.city,
            countryId: address.countryId,
            provinceId: address.provinceId,
            cityId: address.cityId,
            userMail: address.mailbox,
            address: address.details
          }
        }
        // if (this.hasAddress) {
          // 获取相关费用
          this.getTex()
        // }
      }
    },
    // 支付
    //  已登录创建订单
    createOrder() {
      // if (!this.canSubmit) {
      //   return
      // }
      // console.log("aaaa",this.typeIndex)
       if (!this.isLogin) {
          if(this.typeIndex===''){
           this.$toast.show(this.lang.toast4)
           return
         }
         if(this.typeIndex!==0){
            this.$toast.show(this.lang.firstLogin)
           return
         }
       }
      if (this.isLogin) {
        if (!this.hasAddress) {
          this.$toast.show(this.lang.toast2)
          return
        }
      }
      // if (!Email.test(this.mailbox)) {
      //   this.$toast.show(this.lang.toast3)
      //   return
      // }
      let info = {}
      if(this.kai == true){
        info = this.$route.params.invoice
      }
      if (this.isLogin) {
        this.$axios({
          method: 'post',
          url: `/web/member/order/create`,
          data: {
            cart_ids: this.idList.join(','),
            // allSend: this.isSend ? 1 : 2,
            buyer_remark: this.userRemark,
            // productAmount: this.allFee.productAmount,
            order_amount: this.allFee.orderAmount,
            buyer_address_id: this.address.id,
            invoice: info,
            card: this.cardList
            // afterMail: this.mailbox,
            // recvType: 1,
            // preferId: this.selectCouponId ? this.selectCouponId : null,
            // preferCode: this.inputCouponCode ? this.inputCouponCode : null
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
                  info: JSON.stringify(res)
                }
              })
            }
          })
          .catch(err => {
            this.$toast.show(err.message)
          })
      } else {
        const data = []
        let baseUrl=this.$store.getters.baseUrl
        // console.log("未登录",this.list)
        for (const i in this.list) {
          const o = {
            createTime: this.list[i].createTime,
            goods_num: 1,
            goodsDetailsId: this.list[i].goodsDetailsId,
            goods_id: this.list[i].goodsDetailsId,
            group_id: this.list[i].groupId,
            goods_type: this.list[i].goodsStatus,
            group_type:
              this.list[i].groupType !== 0 ? this.list[i].groupType : null
          }
          data.push(o)
        }
        // console.log("data",data)
        // console.log("paytype",this.$route.query)
        if(data.length){
          this.$axios({
            method: 'post',
            url: `/web/member/order-tourist/create`,
            data: {
              goodsCartList:data,
              invoice:this.$route.params.invoice,
              tradeType:'wap',
              coinType:this.$store.state.coin,
              returnUrl:baseUrl+'/complete/paySuccess?order_sn={order_sn}' //http://localhost:8328
            }
          })
            .then(res => {
              // console.log("返回结果",res)
              // const arr = []
              // this.list.map((item, index) => {
              //   console.log(arr)
              //   arr.push(item.localSn)
              //   this.$store.dispatch('removeCart', arr)
              // })
              if (res.config) {
                window.location.replace(res.config)
              } else if (!res.config){
                // console.log(88888888)
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
              this.$toast.show(err.message)
            })
          }else{
            // console.log('')
          }
      }
    },
    gologin(type) {
      // 点击登入获取上页url
      let oldurl=window.location.pathname
      let params=window.location.search
      //如果是订单确认页面，返回到购物车
      if((/^\/cart\/sureOrder/).test(oldurl)){
          oldurl = '/cart'
          params = ''
      }
      console.log(oldurl);
      const url=oldurl+params
      localStorage.setItem('url',url)
      // setTimeout(() => {
      //   this.$router.push({
      //       path: `/login`,
      //       // query: {url}
      //   })
      // },0)
      let name = 'register'
      if (type === 1) {
        name = 'login'
      }
      this.$router.replace({
        name: name
      })
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
        var that = this;
        this.$toast.show(that.lang.PleaseLogin);

        const topC = document.getElementsByClassName('layout-main')[0];

        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          topC.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 22)
      }
    }

  },

  // watch:{
  //    $route: {
  //       handler: function(val, oldVal){
  //         console.log(val);
  //         sessionStorage.removeItem('cardList');
  //       },
  //       // 深度观察监听
  //       deep: true
  //     }
  // }

  beforeRouteLeave(to, from, next){
    if(to.path !== '/cart/invoice'){
      sessionStorage.removeItem('cardList')
    }
    next()
  }

}
</script>

<style scoped lang="less">
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
        li.order-pay, {
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
  .proce {
    padding: 30px 0 20px;
    font-size: 28px;
    font-family: twCenMt;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-bottom: 8px solid #f6f6f6;
    span {
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  ul {
    li {
      width: 100%;
      img {
        width: 32px;
        height: 32px;
        margin: 16px;
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
          margin: 12px 12px 0 0;
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
</style>
