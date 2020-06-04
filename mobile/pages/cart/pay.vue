<template>
  <div class="pay">
    <div class="paylist" v-show="paylist">
      <Header :title="lang.pay" tips="1" />
      <div v-if="this.$store.state.coin == 'CNY' && this.$store.state.platform === 21" class="proce">
        <div class="note"><span class="star">*</span> {{ lang.Note3 }}</div>
        <span>{{ formatCoin(info.coinType) }} </span>
        {{ formatMoney(price) }}
        <span class="price-hkd">({{ coinHKD }} {{ formatMoney(priceHKD) }}) </span>
      </div>
      <div v-else class="proce">
        <span>{{ formatCoin(info.coinType) }} </span>
        {{ formatMoney(price) }}
      </div>
      <ul v-if="this.$store.state.platform !== 31">
        <li v-for="(item, index) in list" :key="index">
          <div v-show="price > 0 || (price == 0 && item.type === 5)">
            <img :src="item.url" />
            <div class="right">
              <span
                class="icon iconfont"
                :class="typeIndex === index ? 'icongou' : ''"
                @click="changeType(index)"
              ></span>
              <div
                class="box-a"
                >{{ item.title }}
                <span
                  v-if="item.type == '5'"
                  class="ph"
                  @click="needtips = !needtips"
                  >?</span
                >
                <div class="support" v-if="item.type == '1000' && isLogin">({{ lang.support }})</div>
              </div>

              <p>{{ item.des }}</p>
              <p v-if="item.des2">{{ item.des2 }}</p>
              <p class="hint-color" v-if="index != 0 && index != 1 && index != 3 && index != 5">({{lang.msg11}})</p>
            </div>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li v-for="(item, index) in listUs" :key="index">
          <div v-show="price > 0 || (price == 0 && item.type === 5)">
            <img :src="item.url" />
            <div class="right">
              <span
                class="icon iconfont"
                :class="typeIndex === index ? 'icongou' : ''"
                @click="changeType(index)"
              ></span>
              <div
                class="box-a"
                >{{ item.title }}
                <span
                  v-if="item.type == '5'"
                  class="ph"
                  @click="needtips = !needtips"
                  >?</span
                >
                <div class="support" v-if="item.type == '1000' && isLogin">({{ lang.support }})</div>
              </div>

              <p>{{ item.des }}</p>
              <p v-if="item.des2">{{ item.des2 }}</p>
              <p class="hint-color" v-if="index != 0 && index != 1 && index != 3 && index != 5">({{lang.msg11}})</p>
            </div>
          </div>
        </li>
      </ul>
      <div class="tips">
        <i class="icon iconfont icongantanhao1"></i><span>{{ lang.tips }}</span>
      </div>
      <div class="btn" @click="goPaySuccess">
        {{ list[typeIndex].title }}
        {{ lang.goPay }}
        {{ formatCoin(info.coinType) }}
        {{ formatMoney(price) }}
      </div>
      
      <!-- <Upload :multiple="true" :max=6 :list="imgList" ref="upload"></Upload> -->
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
    <div class="transfer" v-show="transfer"> 
      <div class="transfer-header">
        <i class="icon iconfont iconfanhuiicon-" @click="closed">{{ lang.back }}</i>
        <h4>{{ lang.pleaseSelectAccount }}</h4>
      </div>
      <Upload @cancel="closed"></Upload>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import NeedKnow from '@/components/cart/needKnow.vue'
import Upload from '@/components/wire-transfer/index.vue'
import { formatMoney } from '@/assets/js/filterUtil.js'
export default {
  name: 'Pay',
  layout: 'no-bar',
  components: {
    Header,
    NeedKnow,
    Upload
  },
  data() {
    return {
      lang: this.LANGUAGE.cart.pay,
      coin: this.$store.state.coin,
      coinHKD:"HKD",
      form: [],
      actionLink: '',
      list: [
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
          url: '/cart/up.png',
          type: 81,
          title: this.LANGUAGE.cart.pay.payType1,
          des: this.LANGUAGE.cart.pay.type1Text
        },
        {
          url: '/cart/ph.png',
          type: 84,
          title: this.LANGUAGE.cart.pay.payType5,
          des: this.LANGUAGE.cart.pay.type5Text,
        }
        // {
        //   url: '/cart/paydollar.png',
        //   type: 8,
        //   title: this.LANGUAGE.cart.pay.payType1,
        //   des: this.LANGUAGE.cart.pay.type1Text
        // }
        // {
        //   url: '/cart/up.png',
        //   type: 2,
        //   title: this.LANGUAGE.cart.pay.payType2,
        //   des: this.LANGUAGE.cart.pay.type2Text
        // },
        // {
        //   url: '/cart/ap.png',
        //   type: 2,
        //   title: this.LANGUAGE.cart.pay.payType3,
        //   des: this.LANGUAGE.cart.pay.type3Text
        // },
        // {
        //   url: '/cart/wac.png',
        //   type: 4,
        //   title: this.LANGUAGE.cart.pay.payType4,
        //   des: this.LANGUAGE.cart.pay.type4Text
        // },
        // {
        //   url: '/cart/ph.png',
        //   type: 5,
        //   title: this.LANGUAGE.cart.pay.payType5,
        //   des: this.LANGUAGE.cart.pay.type5Text,
        //   des2: this.LANGUAGE.cart.pay.type5Text2
        // }
      ],
      listUs: [
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
        }
      ], 
      sum: '2,120.00',
      info: JSON.parse(this.$route.query.info),
      price: JSON.parse(this.$route.query.info).payAmount,
      priceHKD: JSON.parse(this.$route.query.info).payAmountHKD,
      needtips: false,
      typeIndex: JSON.parse(this.$route.query.info).payAmount === 0 ? 5 : 0,
      isLogin: !!this.$store.state.token,
      picList:[],
      imgList:[],
      paylist:true,
      transfer:false
    }
  },
  created() {
    // console.log('w333', JSON.parse(this.$route.query.info))this.$refs.upload.list
  },
  methods: {
    // 关闭弹窗
    closed(){
      this.paylist = true
      this.transfer = false
      this.typeIndex = 0 
    },
    formatMoney: formatMoney,
    // 选择支付方式
    changeType(ind) {
      console.log("选择",ind)
      this.typeIndex = ind
      // if(this.info.coinType === 'USD'){
      //   if(this.typeIndex == 1){
      //     this.$toast.show(this.lang.paytip)
      //   }
      //   return
      // }
      if (ind === 5) {
        this.paylist = false
        this.transfer = true
        // this.price = this.info.payAmount * 0.985
      } else {
        this.price = this.info.payAmount
      }
    },
    goPaySuccess() {
      this.isPay = true
      console.log("aaa",this.typeIndex)
      if(this.info.coinType === 'USD'){
        if(this.typeIndex == 2){
          this.$toast.show(this.lang.paytip1)
          return
        }
        if(this.typeIndex == 3){
          this.$toast.show(this.lang.paytip2)
          return
        }
        if(this.typeIndex == 4){
          this.$toast.show(this.lang.paytip3)
          return
        }
      }
      let pay = 0
      if(this.typeIndex == 0){
        pay = 6
      }else if(this.typeIndex == 1){
        pay = 61
      }else if(this.typeIndex == 2){
        pay = 82
      }else if(this.typeIndex == 3){
        pay = 83
      }else if(this.typeIndex == 4){
        pay = 81
      }else if(this.typeIndex == 5){
        pay = 7
      }

      // if (this.typeIndex === 5) {
      //   pay = 1
      // } else if (this.typeIndex === 1 || this.typeIndex === 0) {
      //   pay = 2
      // } else if (
      //   this.typeIndex === 4 ||
      //   this.typeIndex === 3 ||
      //   this.typeIndex === 2
      // ) {
      //   pay = 7
      // }
      // console.log("paytype",pay)
      let baseUrl=this.$store.getters.baseUrl
      this.$axios({
        // http://localhost:8328/     https://www2.bddco.com   https://wap2.bddco.com/ http://wap.bdd.bddia.com https://wap.bddco.com/complete/paySuccess
        method: 'post',
        url: `/web/pay/create`,
        data: {
          orderId: this.info.orderId,
          coinType: this.info.coinType,
          payType: pay,
          tradeType:'wap',
          returnUrl:baseUrl+'/complete/paySuccess?orderId='+this.info.orderId
        }
      })
        .then(res => {

          // console.log("config",res)
          if (res.config) {
            if (pay !== 7) {
              window.location.replace(res.config)
            } else {
              const promise = new Promise((resolve, reject) => {
                this.form = []
                const obj = JSON.parse(res.config)
                const objKey = Object.keys(obj)
                for (const i in objKey) {
                  if (objKey[i] === 'url') {
                    this.actionLink = obj[objKey[i]]
                    continue
                  }
                  const o = {
                    name: objKey[i],
                    val: obj[objKey[i]]
                  }
                  this.form.push(o)
                }
                resolve()
              })
              promise.then(() => {
                setTimeout(() => {
                  this.isPay = false
                  document.getElementById('unionPay').click()
                }, 2000)
              })
            }
          } else if (!res.config){
            // console.log(88888888)
            this.isPay = false
            this.$router.replace({
              name: 'complete-paySuccess-orderId-price-coinType',
              params: {
                orderId: this.info.orderId,
                price: this.info.payAmount,
                coinType: this.info.coinType
              }
            })
          }
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          console.log(err)
          this.$toast.show(err.message)
          // this.$router.replace({
          //   name: 'cart-payFailed-orderId-price-coinType',
          //   params: {
          //     orderId: this.info.orderId,
          //     price: this.info.orderAmount,
          //     coinType: this.info.coinType
          //   }
          // })
        })
    },
    showSelect() {
      // console.log('6767')
    }
  }
}
</script>

<style scoped lang="less">
.transfer-header{
  width: 100%;
  height: 44px;
  background: #ffffff;
  i {
    float: left;
    padding-left: 15px;
    font-size: 14px;
    color: #666666;
    line-height: 44px;
  }
  h4 {
    margin: 0 50px;
    font-size: 16px;
    line-height: 44px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
}
.pay {
  padding-bottom: 20px;
  .proce {
    padding: 10px 0 20px;
    font-size: 28px;
    font-family: twCenMt;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-bottom: 8px solid #f6f6f6;
    .note{
      text-align: right; 
      margin-right: 20px;
      margin-bottom: 20px;
      font-size: 12px;
      color: #cac7c7;
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
        .support{
          position: absolute;
          top: 48%;
          left: 0;
          transform: translateY(-50%);
          margin-left: 150px;
          font-size: 10px;
          color: #333;
        }
        .icon {
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
        .box-a {
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

.hint-color{
  color: #f29b87 !important;
}
</style>
