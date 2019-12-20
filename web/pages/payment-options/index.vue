<template>
  <div class="pay">
    <div class="order-step">
      <div class="one-step">
        <div class="step-img">
          <img src="../../static/order/step.png" alt="" />
          <span>1</span>
        </div>
        <div class="step-arrow">
          <img src="../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.confirmOrder`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.finishOrderInfo`) }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <img src="../../static/order/step.png" alt="" />
          <span>2</span>
        </div>
        <div class="step-arrow">
          <img src="../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.orderPay`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.payWay`) }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <span>3</span>
        </div>
        <div class="step-arrow" />
        <div class="step-title">{{ $t(`${lang}.finishPay`) }}</div>
        <div class="step-desc" />
      </div>
      <div class="step-line-one" />
      <div class="step-line-two" />
    </div>
    <div v-loading="goingPay" class="pay-ways">
      <div class="new-address-title">
        <div class="na-line" />
        <div class="na-title">{{ $t(`${lang}.orderInfo`) }}</div>
      </div>
      <div class="pay-blocks">
        <div
          :class="{ 'pay-choose': payWay === 2 }"
          class="pay-block"
          @click="payWay = 2"
        >
          <div class="pay-img">
            <img src="../../static/order/paypalpay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.PayPal`) }}</div>
          <div v-show="payWay === 2" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay === 2" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>

        <div
          :class="{ 'pay-choose': payWay === 5 }"
          class="pay-block"
          @click="payWay = 5"
        >
          <div class="pay-img">
            <img src="../../static/order/visapay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.visa`) }}</div>
          <div v-show="payWay === 5" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay === 5" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>

        <div
          :class="{ 'pay-choose': payWay === 6 }"
          class="pay-block"
          @click="payWay = 6"
        >
          <div class="pay-img">
            <img src="../../static/order/unionpay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.UnionPay`) }}</div>
          <div v-show="payWay === 6" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay === 6" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>

        <div
          :class="{ 'pay-choose': payWay === 4 }"
          class="pay-block"
          @click="payWay = 4"
        >
          <div class="pay-img">
            <img src="../../static/order/alipay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.AliPay`) }}</div>
          <div v-show="payWay === 4" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay === 4" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>

        <div
          :class="{ 'pay-choose': payWay === 3 }"
          class="pay-block"
          @click="payWay = 3"
        >
          <div class="pay-img">
            <img src="../../static/order/wechatpay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.AliPay`) }}</div>
          <div v-show="payWay === 3" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay === 3" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>

        <div
          :class="{ 'pay-choose': payWay === 1 }"
          class="pay-block"
          @click="payWay = 1"
        >
          <div class="pay-img">
            <img src="../../static/order/epay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.EPay`) }}</div>
          <div v-show="payWay === 1" class="pay-price">
            {{ coinType }} {{ formatMoney(ttPrice) }}
          </div>
          <div v-show="payWay === 1" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>

        <div class="pay-question" @click="answer = true">?</div>
      </div>
      <div class="pay-btn" @click="goPay()">{{ $t(`${lang}.pay`) }}</div>
    </div>
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
    <message-box
      v-show="answer"
      :title="$t(`${lang}.msgTitle1`)"
      :message="$t(`${lang}.msgContent1`)"
      type="one"
      @done="answer = false"
    />
    <message-box
      v-show="failedOrder"
      :title="$t(`${lang}.msgTitle2`)"
      :message="$t(`${lang}.msgContent2`)"
      type="one"
      @done="failedOrder = false"
    />
  </div>
</template>

<script>
const lang = `pay`
export default {
  data() {
    return {
      lang,
      payWay: 2,
      answer: false,
      pay: false,
      isPay: false,
      noPay: false,
      failedOrder: false,
      price: this.$route.query.price,
      coinType: this.$route.query.coinType,
      form: [],
      actionLink: '',
      goingPay: false
    }
  },
  computed: {
    ttPrice() {
      return this.price * 0.985
    }
  },
  methods: {
    goPay() {
      let pay = 0
      if (this.payWay === 1) {
        pay = 1
      } else if (this.payWay === 2 || this.payWay === 5) {
        pay = 2
      } else if (this.payWay === 6 || this.payWay === 4 || this.payWay === 3) {
        pay = 7
      }
      const data = this.$helpers.transformRequest(
        JSON.parse(
          JSON.stringify({
            orderId: this.$route.query.orderId,
            // visa付款自动转成PayPal付款
            payChannel: pay
          })
        ),
        false
      )
      this.goingPay = true
      this.$axios
        .post('/web/pay/toPay', data)
        .then(res => {
          console.log(res)
          if (res) {
            if (pay !== 7) {
              window.location.replace(res)
            } else {
              const promise = new Promise((resolve, reject) => {
                this.form = []
                const obj = JSON.parse(res)
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
          } else {
            this.$router.replace({
              path: 'complete-payment',
              query: {
                orderId: this.$route.query.orderId,
                price: this.$route.query.price,
                coinType: this.$route.query.coinType,
                type: `transfer`
              }
            })
          }
        })
        .catch(err => {
          this.goingPay = false
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.pay {
  width: 1360px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  text-align: left;
  background: rgba(248, 248, 248, 1);
  padding: 33px 30px 38px;
  .order-step {
    width: 1300px;
    height: 182px;
    background: rgba(255, 255, 255, 1);
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
        font-size: 12px;
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
      width: (250 * 2+58+20)/2px;
      height: 4px;
      background: linear-gradient(
        270deg,
        rgba(234, 186, 196, 1) 0%,
        rgba(215, 136, 155, 1) 97%
      );
      box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0);
      z-index: 0;
    }
    .step-line-two {
      position: absolute;
      top: 65px;
      left: 62%;
      transform: translateX(-50%);
      width: (250 * 2+58+20)/2px;
      height: 4px;
      background: #e1e1e1;
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
        width: 590px;
        height: 120px;
        background: rgba(248, 248, 248, 1);
        border: 1px solid rgba(205, 205, 205, 1);
        margin-bottom: 40px;
        cursor: pointer;
        padding: 17px 0 0 53px;
        .pay-img {
          width: 189px;
          height: 56px;
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
          color: #f29b87;
          position: absolute;
          right: 80px;
          top: 50px;
          line-height: 24px;
        }
        .choose-tick {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 27px;
          height: 26px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .pay-block:hover {
        box-shadow: 2px 2px 4px 0px rgba(84, 84, 84, 0.16);
      }
      .pay-choose {
        background-color: #ffffff;
        border: 1px solid rgba(186, 127, 140, 1);
        box-shadow: 2px 2px 4px 0px rgba(84, 84, 84, 0.16);
      }
      .pay-question {
        position: absolute;
        bottom: 89px;
        right: 31px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        background: rgba(220, 148, 165, 1);
        border-radius: 50%;
        text-align: center;
        color: #fff;
        cursor: pointer;
        z-index: 29;
      }
    }
    .pay-btn {
      width: 480px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: rgba(51, 51, 51, 1);
      cursor: pointer;
      margin: 0 auto;
    }
  }
}
</style>
