<template>
  <div>
    <div v-if="$store.getters.hadLogin" class="failed">
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
            <span>3</span>
          </div>
          <div class="step-arrow" />
          <div class="step-title">{{ $t(`${lang}.finishPay`) }}</div>
          <div class="step-desc" />
        </div>
        <div class="step-line-one" />
        <div class="step-line-two" />
      </div>
      <div class="info-box">
        <div class="title">
          <div><img src="../../../static/order/close.png" alt="" /></div>
          <div>{{ $t(`${lang}.payFail`) }}</div>
        </div>
        <div class="tel">
          {{ $t(`${lang}.contactPhone`) }}
        </div>
        <div class="btn-two">
          <div @click="returnBack()">{{ $t(`${lang}.repay`) }}</div>
          <!-- <div @click="goToFail()">{{ $t(`${lang}.payQuestion`) }}</div> -->
        </div>
      </div>
    </div>
    <div v-else class="failed">
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
            <span>3</span>
          </div>
          <div class="step-arrow" />
          <div class="step-title">{{ $t(`${lang}.finishPay`) }}</div>
          <div class="step-desc" />
        </div>
        <div class="step-line-one" />
        <div class="step-line-two" />
      </div>
      <div class="info-box">
        <div class="title">
          <div><img src="../../../static/order/close.png" alt="" /></div>
          <div>{{ $t(`${lang}.payFail`) }}</div>
        </div>
        <div class="tel">
          {{ $t(`${lang}.contactPhone`) }}
        </div>
        <div class="btn-two">
          <div @click="returnBack2()">{{ $t(`${lang}.repay`) }}</div>
          <!-- <div @click="goToFail()">{{ $t(`${lang}.payQuestion`) }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const lang = `pay`
export default {
  name: 'Failed',
  data() {
    return {
      oid: this.$route.query.order_sn||this.$route.query.orderId,
      lang,
      good:[],
      info2:{
        orderId:'',
        coinType:'',
        orderAmount:''
      },
    }
  },
  created(){
    // this.$store.dispatch('getLocalOrder').then(res => {
    //   this.good=res
    //   console.log("vres",res)
    // })
  },
  mounted(){
    // this.$store.dispatch('getLocalOrder').then(res => {
    //   this.good = res
    //   console.log("vres",res)
    // })
    if(this.$store.getters.hadLogin){
      this.$axios
        .get('/web/member/order/detail', {
          params: {
            orderId: this.oid
          }
        })
        .then(res => {
          this.info2.orderId = res.data.id
          this.info2.coinType = res.data.coinCode
          this.info2.orderAmount = res.data.orderAmount
          console.log("wwwww",this.info2.orderId)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
      })
    }else{
      // this.$store.dispatch('getLocalCartOrder').then(v => {
      //   this.$store.dispatch('removeCart',v.split(','))
      //   console.log("v",v)
      // }) 
      // this.$axios
      //   .get('/web/member/order-tourist/detail', {
      //     params: {
      //       order_sn: this.oid
      //     }
      //   })
      //   .then(res => {
      //     // console.log("order_sn",res)
      //     // this.data2 = res.data
      //     // http://localhost:8318/complete-payment?order_sn=BDD202002254136556&success=true&paymentId=PAYID-LZKNA5Y2RG00076G1872113M&token=EC-9LP10841H1659180J&PayerID=ZMUBN8MYV9Q5N
      //     // setTimeout(() => {
      //     //   this.$router.push({path: "/"}); // 强制切换当前路由 path
      //     // }, 5000);
      //     // console.log("wwwww",this.data)
      //   })
      //   .catch(err => {
      //     if (!err.response) {
      //       this.$message.error(err.message)
      //     } else {
      //       // console.log(err)
      //     }
      // })
    }
  },
  methods: {
    returnBack() {
      this.$router.replace({
        path: '/payment-options',
        query: {
          orderId: this.info2.orderId,
          price: this.info2.orderAmount,
          coinType: this.info2.coinType
        }
      })
    },
    returnBack2() {
      this.$store.dispatch('getLocalCartOrder').then(v => {
        this.$router.replace({
          path: '/billing-address',
          query: {
            cartIds: v,
          }
        })
      })
      
    },
    goToFail() {
      this.$router.push({
        name: 'paymentMethod'
      })
    }
  }
}
</script>

<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.failed {
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
        font-style: 12px;
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
  .info-box {
    width: 1300px;
    height: 658px;
    background: rgba(255, 255, 255, 1);
    text-align: center;
    padding-top: 160px;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      div:nth-child(1) {
        width: 40px;
        height: 40px;
        margin-right: 30px;
        img {
          display: block;
          width: 40px;
          height: 40px;
        }
      }
      div:nth-child(2) {
        line-height: 24px;
        font-size: 24px;
        color: #8b766c;
      }
    }
    .tel {
      font-size: 18px;
      line-height: 18px;
      color: #999;
      margin-bottom: 40px;
    }
    .btn-two {
      width: 180+28+180px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        width: 180px;
        height: 40px;
        line-height: 40px;
        border: 1px solid rgba(139, 118, 108, 1);
        text-align: center;
        cursor: pointer;
        color: #fff;
        background: rgba(139, 118, 108, 1);
        font-size: 14px;
      }
      div:nth-child(2) {
        background-color: #ffffff;
        color: #8b766c;
      }
    }
  }
}
</style>
