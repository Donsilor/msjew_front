<template>
  <div class="successTransfer">
    <div class="order-step">
      <div class="one-step">
        <div class="step-img">
          <img src="../../../static/order/step.png" alt="" />
          <span>1</span>
        </div>
        <div class="step-arrow">
          <img src="../../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.confirmOrder`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.finishOrderInfo`) }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <img src="../../../static/order/step.png" alt="" />
          <span>2</span>
        </div>
        <div class="step-arrow">
          <img src="../../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.orderPay`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.payWay`) }}</div>
      </div>
      <div class="one-step">
        <div class="step-img">
          <img src="../../../static/order/step.png" alt="" />
          <span>3</span>
        </div>
        <div class="step-arrow">
          <img src="../../../static/order/arrow.png" alt="" />
        </div>
        <div class="step-title">{{ $t(`${lang}.finishePay`) }}</div>
        <div class="step-desc">{{ $t(`${lang}.balabalabala`) }}</div>
      </div>
      <div class="step-line" />
    </div>
    <div
      :style="[{ width: $store.getters.hadLogin ? '100%' : '50%' }]"
      class="success-info pull-left"
    >
      <div class="diamond-img">
        <img src="../../../static/order/diamond.png" alt="" />
        <div><i class="iconfont icongou" /></div>
      </div>
      <div class="order-email">
        <span>{{ $t(`${lang}.eweWillSendTo`) }}</span
        ><span>{{ data.afterMail }}</span
        ><i class="iconfont iconzuoshangjiantou" />
      </div>
      <div class="order-send">{{ $t(`${lang}.edaysGone`) }}</div>
      <div class="order-num">
        {{ $t(`${lang}.orderCode`) }}<span>{{ data.orderNo }}</span>
      </div>
      <div class="order-guide" @click="showEftGuide">
        {{ $t(`${lang}.eGuide`) }}
      </div>
      <eftGuide ref="eft-guide" />
    </div>
    <div v-if="!$store.getters.hadLogin" class="success-login pull-left">
      <h4>{{ $t(`${lang}.registered`) }}</h4>
      <p>{{ $t(`${lang}.balabalabalaAgain`) }}</p>
      <span @click="gologin">{{ $t(`${lang}.registered`) }}</span>
    </div>
    <div class="middle-bar">
      <i class="iconfont icongantanhao" /><span>{{
        $t(`${lang}.balabalaAgain`)
      }}</span>
    </div>
    <div class="order-info">
      <div class="left-info">
        <div class="address-info">
          <div class="new-address-title">
            <div class="na-line" />
            <div class="na-title">{{ $t(`${lang}.address`) }}</div>
          </div>
          <div class="user-info">
            <div class="user-name">
              {{ data.orderAddress.lastName }}{{ data.orderAddress.firstName
              }}<span>{{ $t(`${lang}.get`) }}</span>
            </div>
            <!--            <div class="user-phone"><span>{{ data.orderAddress.userTelCode }}</span>{{ data.orderAddress.userTel }}</div>-->
          </div>
          <div class="user-address">
            {{ data.orderAddress.countryName }}-{{
              data.orderAddress.provinceName
            }}{{ data.orderAddress.cityName }}{{ data.orderAddress.address }}
          </div>
          <div class="user-phone">
            <div>{{ data.orderAddress.userTelCode }}</div>
            <div>{{ data.orderAddress.userTel }}</div>
          </div>
          <div class="post-num">{{ data.orderAddress.zipCode }}</div>
          <div class="email-address">{{ data.orderAddress.userMail }}</div>
          <!--          <div class="country-code">CHN</div>-->
          <div class="line">
            <img
              src="../../../static/personal/account/address-bar.png"
              alt=""
            />
          </div>
        </div>
        <div class="send-info">
          <div class="new-address-title">
            <div class="na-line" />
            <div class="na-title">{{ lang['fa-fo-info'] }}</div>
          </div>
          <div class="send-infos">
            <div>{{ $t(`${lang}.newinfo1`) }}</div>
            <div>{{ $t(`${lang}.newinfo2`) }} {{ data.afterMail }}</div>
            <dl>
              <dt>{{ $t(`${lang}.newinfo3`) }}</dt>
              <dd>{{ $t(`${lang}.newinfo4`) }}</dd>
              <dd>{{ $t(`${lang}.newinfo5`) }}</dd>
              <dd>{{ $t(`${lang}.newinfo6`) }}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="right-info">
        <div class="new-address-title">
          <div class="na-line" />
          <div class="na-title">{{ $t(`${lang}.orderInfo`) }}</div>
        </div>
        <div class="order-infos">
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.orderNum`) }}</div>
            <div class="clearboth">
              {{ data.orderNo }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.goodsNum`) }}</div>
            <div class="ff">{{ formatMoney(data.productCount, 0) }}</div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.goodsPrice`) }}</div>
            <div class="ff">
              {{ data.coinCode }} {{ formatMoney(data.productAmount) }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.coupon`) }}</div>
            <div class="ff color-pink">
              -{{ data.coinCode }} {{ formatMoney(data.preferFee) }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.freight`) }}</div>
            <div class="ff">
              +{{ data.coinCode }} {{ formatMoney(data.logisticsFee) }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.tex`) }}</div>
            <div class="ff">
              +{{ data.coinCode }} {{ formatMoney(data.taxFee) }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.insurance`) }}</div>
            <div class="ff">
              +{{ data.coinCode }} {{ formatMoney(data.safeFee) }}
            </div>
          </div>
          <div v-if="data.transPreferFee" class="info-line">
            <div class="label">{{ $t(`${lang}.transPreferFee`) }}</div>
            <div class="ff color-pink">
              -{{ data.coinCode }} {{ formatMoney(data.transPreferFee) }}
            </div>
          </div>
          <div class="big-info">
            <div>{{ $t(`${lang}.orderTotal`) }}</div>
            <div>{{ data.coinCode }} {{ formatMoney(data.orderAmount) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EftGuide from '@/components/eftGuide.vue'
const lang = `finishPay`
export default {
  name: 'SuccessTransfer',
  components: {
    EftGuide
  },
  data() {
    return {
      lang,
      orderId: this.$route.query.orderId,
      info: true,
      data: {
        allSend: null,
        coinCode: null,
        coinId: null,
        id: null,
        logisticsFee: null,
        orderAddress: {
          address: null,
          addressType: null,
          cityId: null,
          cityName: null,
          countryId: null,
          countryName: null,
          createTime: null,
          firstName: null,
          id: null,
          lastName: null,
          orderId: null,
          provinceId: null,
          provinceName: null,
          userAccount: null,
          userId: null,
          userMail: null,
          userTel: null,
          userTelCode: null,
          zipCode: null
        },
        orderAmount: null,
        orderNo: null,
        orderStatus: null,
        otherFee: null,
        preferFee: null,
        productAmount: null,
        productCount: null,
        recvType: null,
        safeFee: null,
        taxFee: null
      }
    }
  },
  mounted() {
    this.$axios
      .get('/web/order/getPayOrderInfo', {
        params: { orderId: this.orderId }
      })
      .then(res => {
        this.data = res
      })
      .catch(err => {
        if (!err.response) {
          this.$message.error(err.message)
        } else {
          // console.log(err)
        }
      })
  },
  methods: {
    showEftGuide() {
      this.$refs['eft-guide'].show()
    },
    gologin() {
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.successTransfer {
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
    .step-line {
      position: absolute;
      top: 65px;
      left: 50%;
      transform: translateX(-50%);
      width: 250 * 2+58+20px;
      height: 4px;
      background: linear-gradient(
        270deg,
        rgba(234, 186, 196, 1) 0%,
        rgba(215, 136, 155, 1) 97%
      );
      box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0);
      z-index: 0;
    }
  }
  .success-login {
    width: 50%;
    height: 340px;
    background: rgba(255, 255, 255, 1);
    padding-top: 59px;
    text-align: left;
    h4 {
      height: 20px;
      font-size: 20px;
      line-height: 20px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      border-left: 4px solid #cfa48d;
      border-radius: 1px;
      padding-left: 10px;
    }
    p {
      display: inline-block;
      width: 442px;
      margin: 30px 0 40px 10px;
      font-size: 14px;
      line-height: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }
    span {
      display: inline-block;
      width: 160px;
      height: 30px;
      margin-right: 200px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(139, 118, 108, 1);
      font-size: 14px;
      line-height: 30px;
      text-align: center;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(139, 118, 108, 1);
    }
  }
  .success-info {
    width: 50%;
    height: 340px;
    background: rgba(255, 255, 255, 1);
    padding-top: 59px;
    text-align: center;
    .diamond-img {
      width: 75px;
      height: 59px;
      margin: 0 auto 27px;
      position: relative;
      img {
        width: 75px;
        /*height: 59px;*/
        display: block;
      }
      div {
        position: absolute;
        width: 34px;
        height: 34px;
        background: rgba(207, 164, 141, 1);
        border-radius: 50%;
        text-align: center;
        right: -8px;
        bottom: -8px;
        i {
          display: block;
          width: 34px;
          height: 34px;
          line-height: 34px;
          color: #fff;
          font-size: 20px;
        }
      }
    }
    .order-email {
      font-size: 14px;
      color: #333;
      line-height: 14px;
      /*display: flex;*/
      /*align-items: center;*/
      /*justify-content: center;*/
      span:nth-child(2) {
        color: #aa8a7b;
        text-decoration: underline;
        cursor: pointer;
      }
      i {
        /*display: block;*/
        width: 19px;
        height: 20px;
        color: #666;
        font-size: 20px;
        line-height: 20px;
      }
    }
    .order-send {
      margin-top: 7px;
      font-size: 14px;
      color: #333;
      line-height: 14px;
    }
    .order-num {
      margin: 8px 0 30px;
      font-size: 14px;
      color: #333;
      line-height: 14px;
      span {
        color: #d9423e;
      }
    }
    .order-guide {
      width: 260px;
      height: 30px;
      line-height: 30px;
      background: rgba(176, 160, 155, 1);
      margin: 0 auto;
      color: #fff;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .middle-bar {
    font-size: 16px;
    color: #fff;
    text-align: center;
    width: 1300px;
    height: 30px;
    background: linear-gradient(
      270deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(218, 146, 163, 1) 47%,
      rgba(255, 255, 255, 1) 100%
    );
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      display: block;
      width: 24px;
      height: 19px;
      line-height: 19px;
      font-size: 28px;
      margin-right: 6px;
    }
  }
  .order-info {
    width: 1300px;
    display: flex;
    justify-content: space-between;
    .left-info {
      width: 635px;
      height: 520px;
      .address-info {
        width: 635px;
        height: 230px;
        background: rgba(255, 255, 255, 1);
        margin-bottom: 22px;
        padding: 26px 53px 0 50px;
        position: relative;
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
        .user-info {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          .user-name {
            font-size: 22px;
            color: #111;
            line-height: 22px;
            span {
              font-size: 16px;
            }
          }
        }
        .user-address {
          font-size: 12px;
          color: #666;
          width: 100%;
          height: 16 * 2px;
          line-height: 16px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 8px;
        }
        .user-phone {
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
        .post-num,
        .email-address,
        .country-code {
          font-size: 12px;
          color: #666;
          line-height: 12px;
          margin-bottom: 9px;
        }
        .line {
          position: absolute;
          width: 100%;
          height: 10px;
          bottom: 0;
          left: 0;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
      .send-info {
        width: 635px;
        height: 280px;
        background: rgba(255, 255, 255, 1);
        padding: 25px 50px;
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
        .send-infos {
          font-size: 12px;
          color: #333;
          line-height: 22px;
          span {
            color: #aa8a7b;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
    .right-info {
      width: 635px;
      height: 432px;
      background: rgba(255, 255, 255, 1);
      padding: 23px 40px 0 35px;
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
      .order-infos {
        .info-line {
          width: 100%;
          height: 36px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 11px 0 16px;
          input {
            text-align: right;
            width: 230px;
            height: 18px;
            font-size: 16px;
            line-height: 16px;
            -webkit-appearance: none;
            border: 0;
            outline: 0;
            padding: 0;
            margin: 0;
            background: white;
          }
          .ff {
            font-family: twCenMt;
            font-size: 12px;
            color: #111;
          }
          .copy-btn {
            float: right;
            width: 40px;
            height: 20px;
            line-height: 18px;
            background: rgba(245, 244, 244, 1);
            border: 1px solid rgba(174, 174, 174, 1);
            border-radius: 4px;
            text-align: center;
            cursor: pointer;
            margin-left: 10px;
            color: #666;
            font-size: 12px;
          }
          .label {
            font-size: 12px;
            color: #656565;
          }
          .color-gold {
            color: #aa8a7b;
            font-size: 16px;
            line-height: 20px;
          }
          .color-pink {
            color: #f29b87;
          }
        }
        .info-line:nth-child(2n) {
          background: rgba(249, 249, 249, 1);
        }
        .big-info {
          margin-top: 19px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 11px 0 15px;
          div:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
          }
          div:nth-child(2) {
            font-size: 20px;
            font-family: twCenMt;
            font-weight: bold;
            color: rgba(27, 27, 27, 1);
          }
        }
      }
    }
  }
}
</style>
