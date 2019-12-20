<template>
  <div class="pay-success">
    <div class="top">
      <i class="icon iconfont iconicon-test2"></i>
      <h4 class="color-333 font-size-14 margin-top-10 ">
        {{ lang.title }}
      </h4>
      <p class="color-333 font-size-28 margin-top-10 margin-bottom-30">
        {{ lang.phone }}
      </p>
    </div>
    <div class="code">
      <span> {{ lang.orderNo }} </span
      ><span
        >{{ info.orderNo
        }}<i
          class="icon iconfont iconcopy copy-btn"
          :data-clipboard-text="info.orderNo"
          @click="copy"
        ></i
      ></span>
    </div>
    <div class="btn">
      <div class="btn-common btn-black" @click="returnBack">
        {{ lang.payAgain }}
      </div>
      <div class="btn-common btn-gray" @click="goIndex">
        {{ lang.continue }}
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'Paysuccess',
  layout: 'no-bar',
  data() {
    return {
      lang: this.LANGUAGE.cart.payFailed,
      orderId: this.$route.params.orderId,
      info: ''
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
    goIndex() {
      this.$router.replace({
        name: 'index'
      })
    },
    getinfo() {
      this.$axios({
        url: '/web/order/getPayOrderInfo',
        meth: 'get',
        params: {
          orderId: this.$route.params.orderId
        }
      })
        .then(res => {
          console.log(res, 'e7etry')
          this.info = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    copy() {
      const clipboard = new Clipboard('.copy-btn')
      clipboard.on('success', e => {
        this.$toast.show(this.lang.toast1)
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$toast.show(this.lang.toast2)
        clipboard.destroy()
      })
    },
    returnBack() {
      const res = {
        orderId: this.$route.params.orderId,
        orderAmount: this.$route.params.price,
        coinType: this.$route.params.coinType
      }
      this.$router.replace({
        name: 'cart-pay',
        query: {
          info: JSON.stringify(res)
        }
      })
    },
    goToFail() {
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>

<style scoped lang="less">
.pay-success {
  width: 345px;
  margin: 0 auto;
  .top {
    border-bottom: 1px solid #dddddd; /*no*/
    .iconicon-test2 {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: #6b6a7f;
      border-radius: 50%;
      font-size: 20px;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      margin: 60px auto 20px;
      font-weight: 500;
    }
    h4 {
      font-size: 16px;
      line-height: 22px;
      font-family: PingFangHK-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
    p {
      font-size: 12px;
      font-family: PingFangHK-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .code {
    display: flex;
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 240px;
    margin-top: 10px;
    justify-content: center;
    span {
      .iconcopy {
        padding: 6px;
        font-size: 18px;
        color: #a2a2ac;
        margin-left: 10px;
      }
    }
  }
  .btn {
    padding-bottom: 25px;
    .btn-more {
      display: flex;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 160px;
        margin: 0 0 15px 0;
      }
    }
  }
}
</style>
