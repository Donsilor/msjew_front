<template>
  <div
    v-loading="isPay"
    class="pay">
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
        <div class="step-title">{{ lang.confirmOrder }}</div>
        <div class="step-desc">{{ lang.finishOrderInfo }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <img
            src="../../../static/images/order/step.png"
            alt="">
          <span>2</span>
        </div>
        <div class="step-arrow">
          <img
            src="../../../static/images/order/arrow.png"
            alt="">
        </div>
        <div class="step-title">{{ lang.orderPay }}</div>
        <div class="step-desc">{{ lang.payWay }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <span>3</span>
        </div>
        <div class="step-arrow" />
        <div class="step-title">{{ lang.finishPay }}</div>
        <div class="step-desc" />
      </div>
      <div class="step-line-one" />
      <div class="step-line-two" />
    </div>
    <div class="pay-ways">
      <div class="new-address-title">
        <div class="na-line" />
        <div class="na-title">{{ lang.orderInfo }}</div>
      </div>
      <div class="pay-blocks">

        <div
          :class="{'pay-choose':payWay===2}"
          class="pay-block"
          @click="payWay = 2">
          <div class="pay-img">
            <img
              src="../../../static/images/order/paypalpay.png"
              alt="">
          </div>
          <div class="pay-desc">{{ lang.PayPal }}</div>
          <div
            v-show="payWay===2"
            class="pay-price">{{ coinType }}  {{ formatMoney(price) }}</div>
          <div
            v-show="payWay===2"
            class="choose-tick">
            <img
              src="../../../static/images/order/tick.png"
              alt="">
          </div>
        </div>

        <div
          :class="{'pay-choose':payWay===5}"
          class="pay-block"
          @click="payWay = 5">
          <div class="pay-img">
            <img
              src="../../../static/images/order/visapay.png"
              alt="">
          </div>
          <div class="pay-desc">{{ lang.visa }}</div>
          <div
            v-show="payWay===5"
            class="pay-price">{{ coinType }}  {{ formatMoney(price) }}</div>
          <div
            v-show="payWay===5"
            class="choose-tick">
            <img
              src="../../../static/images/order/tick.png"
              alt="">
          </div>
        </div>

        <div
          :class="{'pay-choose':payWay===6}"
          class="pay-block"
          @click="payWay = 6">
          <div class="pay-img">
            <img
              src="../../../static/images/order/unionpay.png"
              alt="">
          </div>
          <div class="pay-desc">{{ lang.UnionPay }}</div>
          <div
            v-show="payWay===6"
            class="pay-price">{{ coinType }}  {{ formatMoney(price) }}</div>
          <div
            v-show="payWay===6"
            class="choose-tick">
            <img
              src="../../../static/images/order/tick.png"
              alt="">
          </div>
        </div>

        <div
          :class="{'pay-choose':payWay===4}"
          class="pay-block"
          @click="payWay = 4">
          <div class="pay-img">
            <img
              src="../../../static/images/order/alipay.png"
              alt="">
          </div>
          <div class="pay-desc">{{ lang.AliPay }}</div>
          <div
            v-show="payWay===4"
            class="pay-price">{{ coinType }}  {{ formatMoney(price) }}</div>
          <div
            v-show="payWay===4"
            class="choose-tick">
            <img
              src="../../../static/images/order/tick.png"
              alt="">
          </div>
        </div>

        <div
          :class="{'pay-choose':payWay===3}"
          class="pay-block"
          @click="payWay = 3">
          <div class="pay-img">
            <img
              src="../../../static/images/order/wechatpay.png"
              alt="">
          </div>
          <div class="pay-desc">{{ lang.AliPay }}</div>
          <div
            v-show="payWay===3"
            class="pay-price">{{ coinType }}  {{ formatMoney(price) }}</div>
          <div
            v-show="payWay===3"
            class="choose-tick">
            <img
              src="../../../static/images/order/tick.png"
              alt="">
          </div>
        </div>

        <div
          :class="{'pay-choose':payWay===1}"
          class="pay-block"
          @click="payWay = 1">
          <div class="pay-img">
            <img
              src="../../../static/images/order/epay.png"
              alt="">
          </div>
          <div class="pay-desc">{{ lang.EPay }}</div>
          <div
            v-show="payWay===1"
            class="pay-price">{{ coinType }}  {{ formatMoney(ttPrice) }}</div>
          <div
            v-show="payWay===1"
            class="choose-tick">
            <img
              src="../../../static/images/order/tick.png"
              alt="">
          </div>
        </div>

        <div
          class="pay-question"
          @click="answer=true">?</div>
      </div>
      <div
        class="pay-btn"
        @click="goPay()">{{ lang.pay }}</div>
    </div>

    <!--    unionPayHide-->
    <div v-show="false">
      <form
        :action="actionLink"
        method="post">
        <div
          v-for="(f,index) in form"
          :key="index">
          <label :for="f.name">{{ f.name }}</label>
          <input
            :name="f.name"
            v-model="f.val">
        </div>
        <input
          id="unionPay"
          type="submit"
          value="akm">
      </form>
    </div>

    <MessageBox
      v-show="answer"
      :title="lang.msgTitle1"
      :message="lang.msgContent1"
      type="one"
      @done="answer = false"/>
    <MessageBox
      v-show="failedOrder"
      :title="lang.msgTitle2"
      :message="lang.msgContent2"
      type="one"
      @done="failedOrder = false"/>
  </div>
</template>

<script>
import MessageBox from '../../components/messageBox';
import { formatMoney } from '@/api/filterUtil.js';

export default {
  name: 'Pay',
  components: {
    MessageBox
  },
  data() {
    return {
      lang: this.$LANGUAGE.pay,
      payWay: 2,
      answer: false,
      pay: false,
      isPay: false,
      noPay: false,
      failedOrder: false,
      price: this.$route.params.price,
      coinType: this.$route.params.coinType,
      form: [],
      actionLink: ''
    };
  },
  computed: {
    ttPrice() {
      return this.price * 0.985;
    }
  },
  mounted() {
    console.log(this.$route);
  },
  methods: {
    formatMoney: formatMoney,
    goToSuccess() {
      // this.$router.push('/finished')
      this.$axiosGet('/web/order/getPayOrderInfo', {
        orderId: this.$route.params.orderId
      }).then(res => {
        console.log(res);
        if (!res.data) return;
        if (res.data.orderStatus === 2) {
          this.$router.replace({
            name: 'finished',
            params: {
              orderId: this.$route.params.orderId
            }
          });
        } else {
          this.goToFailed();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    goToFailed() {
      this.$router.replace({
        name: 'payFailed',
        orderId: this.$route.params.orderId
      });
    },
    goPay() {
      this.isPay = true;
      let pay = 0;
      if (this.payWay === 1) {
        pay = 1;
      } else if (this.payWay === 2 || this.payWay === 5) {
        pay = 2;
      } else if (this.payWay === 6 || this.payWay === 4 || this.payWay === 3) {
        pay = 7;
      }
      console.log(this.$route.params.orderId);
      this.$axiosPost('/web/pay/toPay', {
        orderId: this.$route.params.orderId,
        // visa付款自动转成paypal付款
        payChannel: pay
      }).then(res => {
        console.log(res);
        if (res.code === 200 && res.data) {
          if (pay !== 7) {
            // this.isPay = false
            // this.pay = true
            window.location.replace(res.data);
          } else {
            const promise = new Promise((resolve, reject) => {
              this.form = [];
              let obj = JSON.parse(res.data);
              let objKey = Object.keys(obj);
              for (let i in objKey) {
                if (objKey[i] === 'url') {
                  this.actionLink = obj[objKey[i]];
                  continue;
                }
                let o = {
                  name: objKey[i],
                  val: obj[objKey[i]]
                };
                this.form.push(o);
              }
              // console.log(this.form, this.actionLink)
              resolve();
            });
            promise.then(() => {
              setTimeout(() => {
                this.isPay = false;
                document.getElementById('unionPay').click();
              }, 2000);
            });
          }
        } else if (res.code === 200 && !res.data) {
          this.isPay = false;
          this.$router.replace({
            name: 'efinished',
            params: {
              orderId: this.$route.params.orderId,
              price: this.$route.params.price,
              coinType: this.$route.params.coinType
            }
          });
        } else {
          this.isPay = false;
          // this.failedOrder = true;
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped lang="less">
.pay {
  width: 1360px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  text-align: left;
  background:rgba(248,248,248,1);
  padding: 33px 30px 38px;
  .order-step {
    width:1300px;
    height:182px;
    background:rgba(255,255,255,1);
    display: flex;
    position: relative;
    justify-content: center;
    padding-top: 36px;
    margin-bottom: 20px;
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
        background:rgba(225,225,225,1);
        border:4px solid rgba(217,217,217,1);
        border-radius:50%;
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
    .step-line-one {
      position: absolute;
      top: 65px;
      left: 37%;
      transform: translateX(-50%);
      width: (250*2+58+20)/2px;
      height:4px;
      background:linear-gradient(270deg,rgba(234,186,196,1) 0%,rgba(215,136,155,1) 97%);
      box-shadow:0px 3px 2px 0px rgba(0, 0, 0, 0);
      z-index: 0;
    }
    .step-line-two {
      position: absolute;
      top: 65px;
      left: 62%;
      transform: translateX(-50%);
      width: (250*2+58+20)/2px;
      height: 4px;
      background: #E1E1E1;
      z-index: 0;
    }
  }
  .pay-ways {
    width: 1300px;
    background-color: #fff;
    padding: 39px 40px 40px;
    .new-address-title {
      width: 1300-51-36px;
      height: 20px;
      display: flex;
      align-items: flex-end;
      margin-bottom: 17px;
      .na-line {
        width:4px;
        height:20px;
        background:rgba(207,164,141,1);
        border-radius:2px;
        margin-right: 8px;
      }
      .na-title {
        font-size: 20px;
        color: #333;
        line-height: 20px;
        margin-right: 11px;
      }
    }
    .pay-blocks {
      position: relative;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .pay-block {
        transition: 0.2s linear;
        position: relative;
        width:590px;
        height:120px;
        background:rgba(248,248,248,1);
        border:1px solid rgba(205,205,205,1);
        margin-bottom: 40px;
        cursor: pointer;
        padding: 17px 0 0 53px;
        .pay-img {
          width:189px;
          height:56px;
          /*background-color: pink;*/
          margin-bottom: 7px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .pay-desc {
          font-size: 14px;
          color: #1d1d1d;
          line-height: 14px;
        }
        .pay-price {
          font-size: 24px;
          font-family: twCenMt;
          color: #F29B87;
          position: absolute;
          right: 80px;
          top: 50px;
          line-height: 24px;
        }
        .choose-tick {
          position: absolute;
          right: 0;
          bottom: 0;
          width:27px;
          height:26px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .pay-block:hover {
        box-shadow:2px 2px 4px 0px rgba(84,84,84,0.16);
      }
      .pay-choose {
        background-color: #FFFFFF;
        border:1px solid rgba(186,127,140,1);
        box-shadow:2px 2px 4px 0px rgba(84,84,84,0.16);
      }
      .pay-question {
        position: absolute;
        bottom: 89px;
        right: 31px;
        width:22px;
        height:22px;
        line-height: 22px;
        background:rgba(220,148,165,1);
        border-radius:50%;
        text-align: center;
        color: #fff;
        cursor: pointer;
        z-index: 29;
      }
    }
    .pay-btn {
      width:480px;
      height:40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background:rgba(51,51,51,1);
      cursor: pointer;
      margin: 0 auto;
    }
  }
}
</style>
