<template>
  <div class="pay-success">
    <div v-if="hadLogin">
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
    <div v-else>
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
          >{{ orderinfo.orderNo}}<i
            class="icon iconfont iconcopy copy-btn"
            :data-clipboard-text="orderinfo.orderNo"
            @click="copy"
          ></i
        ></span>
      </div>
      <div class="btn">
        <div class="btn-common btn-black" @click="returnBack2">
          {{ lang.payAgain }}
        </div>
        <div class="btn-common btn-gray" @click="goIndex">
          {{ lang.continue }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const storage = process.client ? require('good-storage').default : {}
import Clipboard from 'clipboard'
export default {
  name: 'Paysuccess',
  layout: 'no-bar',    
  data() {
    return {
      lang: this.LANGUAGE.cart.payFailed,
      orderId: this.$route.params.orderId,
      isLogin: !!this.$store.state.token,
      info: '',
      orderinfo:'',
      infos:{
        orderId:'',
        coinType:'',
        price:''
      },
      info2:{
        orderId:'',
        coinType:'',
        orderAmount:''
      },
      list:[]
    }
  },
  computed: {
    hadLogin() {
      return this.$store.getters.hadLogin
    }
  },
  created() {
    
    // console.log("dfsdfsdsad")

    // console.log("dfsdfsdsad",storage)
   
    // this.getinfo()
  },
  mounted(){
     this.list = JSON.parse(storage.get('myCartList', 0))
    console.log("已登录",this.isLogin)
    const _this = this
    _this.$nextTick(() => {
      if (this.isLogin){
        _this.getinfo()
      }else{

        _this.getinfo2()
      }
    })
  },
  methods: {
    goIndex() {
      this.$router.replace({
        name: 'index'
      })
    },
    getinfo() {
      this.$axios({
        url: '/web/member/order/detail',
        meth: 'get',
        params: {
          orderId: this.$route.query.orderId,
        }
      })
        .then(res => {//http://localhost:8328/cart/pay?info=%7B%22coinType%22%3A%22HKD%22,%22orderAmount%22%3A%221855.16%22,%22orderId%22%3A280%7D
          this.infos.orderId=res.id
          this.infos.coinType=res.coinCode
          this.infos.orderAmount=res.orderAmount
          console.log(res, 'e7etry')
          this.info = res
        })
        .catch(err => {
          console.log(err)
        })
    },
     // 未登录
    getinfo2() {
      this.$axios({
        url: '/web/member/order-tourist/detail',
        method: 'get',
        params: {
          order_sn: this.$route.query.orderId
        }
      })
        .then(res => {
          this.orderinfo = res
          console.log(res)
          this.getChannelType(this.orderinfo.payChannel)
         
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
      const res = this.infos
      this.$router.push({
        name: 'cart-pay',
        query: {
          info: JSON.stringify(res)
        }
      })
    },
    returnBack2() {
      const res = this.list
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
        this.$axios({
          method: 'post',
          url: `/web/member/order-tourist/create`,
          data: {
            goodsCartList:data,
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
