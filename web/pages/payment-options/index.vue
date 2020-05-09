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
        <!-- paypal -->
        <div
          :class="{ 'pay-choose': payWay == 6 }"
          class="pay-block"
          @click="payWay = 6"
        >
          <div class="pay-img">
            <img src="../../static/order/paypalpay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.PayPal`) }}</div>
          <div v-show="payWay == 6" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 6" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>
        <!-- vise -->
          <div
          :class="{ 'pay-choose': payWay == 61 }"
          class="pay-block"
          @click="payWay = 61"
        >
          <div class="pay-img">
            <img src="../../static/order/visa.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.visa`) }}</div>
          <div v-show="payWay === 61" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 61" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>
        <!-- 支付宝 -->
        <div
          :class="{ 'pay-choose': payWay == 82 }"
          class="pay-block"
          @click="payWay = 82"
        >
          <div class="pay-img">
            <img src="../../static/order/alipay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.AliPay`) }}</div>
          <div v-show="payWay == 82" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 82" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
          <div class="hint_pay" :class="language == 'en_US' ? 'en' : ''
          "><span>*</span> {{ $t(`${lang}.msg11`) }}</div>
        </div>
        <!-- <div
          :class="{ 'pay-choose': payWay === 8 }"
          class="pay-block"
          @click="payWay = 8"
        >
          <div class="pay-img">
            <img src="../../static/order/paydollar.jpg" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.visa`) }}</div>
          <div v-show="payWay == 8" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 8" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div> -->
        <!-- 微信 -->
        <div
          :class="{ 'pay-choose': payWay == 83 }"
          class="pay-block"
          @click="payWay = 83"
        >
          <div class="pay-img">
            <img src="../../static/order/wechatpay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.AliPay`) }}</div>
          <div v-show="payWay == 83" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 83" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
          <div class="hint_pay" :class="language == 'en_US' ? 'en' : ''
          "><span>*</span> {{ $t(`${lang}.msg11`) }}</div>
        </div>

        <!-- 信用卡 -->
        <div
          :class="{ 'pay-choose': payWay == 81 }"
          class="pay-block"
          @click="payWay = 81"
        >
          <div class="pay-img">
            <img src="../../static/order/unionpay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.UnionPay`) }}</div>
          <div v-show="payWay === 81" class="pay-price">
            {{ coinType }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 81" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
          <div class="hint_pay" :class="language == 'en_US' ? 'en' : ''
          "><span>*</span> {{ $t(`${lang}.msg11`) }}</div>
        </div>

        <!-- 电汇 -->
        <div
          :class="{ 'pay-choose': payWay == 1 }"
          class="pay-block"
          @click="payWay = 1;wire()"
        >
          <div class="pay-img">
            <img src="../../static/order/epay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.EPay`) }}</div>
          <div v-show="payWay == 1" class="pay-price">
            {{ $store.state.coin }} {{ formatMoney(ttPrice) }}
          </div>
          <div v-show="payWay == 1" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>
        <!-- <div
          :class="{ 'pay-choose': payWay == 1 }"
          class="pay-block"
          @click="payWay = 1"
        >
          <div class="pay-img">
            <img src="../../static/order/epay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.EPay`) }}</div>
          <div v-show="payWay == 1" class="pay-price">
            {{ coinType }} {{ formatMoney(ttPrice) }}
          </div>
          <div v-show="payWay == 1" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div> -->

        <!-- <div class="pay-question" @click="answer = true">?</div> -->
      </div>
      <div class="pay-btn" @click="goPay()">{{ $t(`${lang}.pay`) }}</div>
    </div>
    <!-- 电汇弹窗 -->
    <div class="wireTransfer" v-show="transfer">
      <div class="msg">
        <div class="msgbox" >
          <div class="title">
            请选择银行账户
            <img @click="closed" class="close" src="../../static/order/closed.png" alt="">
          </div>
          <div class="content">
            <div class="Amount">
              <span>需支付金额:</span>
              {{ $store.state.coin }} {{ formatMoney(ttPrice) }}
            </div>
            <div class="account-ways">
              <div :class="{ 'account-choose': payWay == 1 }" class="account-block" @click="payWay = 1">
                <div class="account">
                  <span>账户:</span>
                  <span>星展銀行(香港)有限公司</span>
                </div>
                <div class="account-num">
                  <span>户口号码:</span>
                  <span>475522173</span>
                </div>
                <div class="account-name">
                  <span>户口名称:</span>
                  <span>BDD Co. Limited</span>
                </div>
                <div v-show="payWay == 1" class="choose-tick">
                  <img src="../../static/order/tick.png" alt="" />
                </div>
              </div>

              <div :class="{ 'account-choose': payWay == 2 }" class="account-block" @click="payWay = 2">
                <div class="account">
                  <span>账户:</span>
                  <span>星展銀行(香港)有限公司</span>
                </div>
                <div class="account-num">
                  <span>户口号码:</span>
                  <span>475522173</span>
                </div>
                <div class="account-name">
                  <span>户口名称:</span>
                  <span>BDD Co. Limited</span>
                </div>
                <div v-show="payWay == 2" class="choose-tick">
                  <img src="../../static/order/tick.png" alt="" />
                </div>
              </div>
            </div>
            <div class="uploadPic">
              <div class="text">
                <span class="star">*</span>
                <span>上传支付凭证:</span>
              </div>
              <div class="upload">
                <div class="up">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                    <i class="el-icon-plus"></i>
                    <div>上传图片</div>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                  </el-upload>
                  <!-- <el-upload
                    action=""
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                  </el-upload> -->
                  <!-- <span class="up-text">上传图片</span> -->
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
                <div class="tip">
                  请确保图片上清晰显示转账日期和银码以便核实款项
                </div>
              </div>
            </div>
            <div class="transactionNum">
              <div class="text2">
                <div class="number">支付交易号</div>
                <div class="can-select">(可选填)</div>
              </div>
              <div class="num-input">
                <input type="text">
              </div>
            </div>
            <div class="btnPay">
              <div class="cancel-pay">取消付款</div>
              <div class="finish-pay">已完成付款</div>
            </div>
            <div class="prompt">
              <p>* 注：支付完成后请选择支付的银行账户，请上传凭证</p>
            </div>
          </div>
        </div>
      </div>
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
    if ( parseInt(this.$route.query.payType)===7 ) {
      this.$route.query.payType = 2
    }
    return {
      lang,
      payWay: this.$route.query.payType || 6,
      answer: false,
      pay: false,
      isPay: false,
      noPay: false,
      failedOrder: false,
      price: this.$route.query.price,
      coinType: this.$route.query.coinType,
      form: [],
      actionLink: '',
      goingPay: false,
      language:'',
      transfer:false,
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted(){
    this.language = this.getCookie('language')
  },
  computed: {
    ttPrice() {
      return this.price * 0.985
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    wire(){
      this.transfer = true
    },
    closed(){
      this.transfer = false
    },
    goPay() {
      let pay = 0
      if(this.payWay==6){
        pay = 6
      }else if(this.payWay==82){
        pay = 82
      }else if(this.payWay==83){
        pay = 83
      }else if(this.payWay==81){
        pay = 81
      }else if(this.payWay==61){
        pay = 61
      }
    console.log("方式",pay)
      // const data = this.$helpers.transformRequest(
      //   JSON.parse(
      //     JSON.stringify({
      //       orderId: this.$route.query.orderId,
      //       // // visa付款自动转成PayPal付款
      //       // payChannel: pay
      //       payType: 2,
      //       tradeType:"pc",
      //       // data:{
      //       //    orderId: this.$route.query.orderId,
      //       // }
      //     })
      //   ),
      //   false
      // )
      let baseUrl=this.$store.getters.baseUrl
      const data ={
        orderId: this.$route.query.orderId,
        coinType: this.$route.query.coinType,
        // // visa付款自动转成PayPal付款 https://www2.bddco.com   http://localhost:8318   https://www.bdd.bddia.com https://www.bddco.com/
        // payChannel: pay
        payType: pay,
        tradeType:"pc",
        returnUrl:baseUrl+'/complete-paySuccess?orderId='+this.$route.query.orderId
      }
      this.goingPay = true
      this.$axios
        .post('/web/pay/create', data)
        .then(res => {
          // console.log("url",res)
          if (res.data.config) {
            if (pay !== 7) {
              window.location.replace(res.data.config)
            } else {
              const promise = new Promise((resolve, reject) => {
                this.form = []
                const obj = JSON.parse(res.data.config)
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
              path: '/complete-paySuccess',
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
    },
    // 查询cookie
    getCookie(cname) {
      const name = cname + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return ''
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
        .support{
          position: absolute;
          right: 82px;
          top: 78px;
          font-size: 14px;
          font-family: twCenMt;
          line-height: 24px;
          color: #1d1d1d;
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

.hint_pay{
  position: absolute;
  right: 80px;
  top: 84px;
  font-family: twCenMt;
  font-size: 14px;
  color: #aaa;
  line-height: 24px;
}
.hint_pay span{
  color: #f00;
  font-size: 18px;
  opacity: 0.6;
}
.hint_pay.en{
  top: 94px;
}

.wireTransfer{
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  .msg{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    .msgbox{
      // border-radius: 8px;
      // padding: 0 30px 30px 30px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 980px;
      // height: 695px;
      // overflow-y: scroll;
      background: rgba(255, 255, 255, 1);
      .cha{
        text-align: right;
        i{
          font-size: 30px;
        }
      }
      .title{
        text-align: center;
        height: 50px;
        line-height: 50px;
        background-color: #f8f0f0;
        position: relative;
      }
      .close{
        position: absolute;
        width: 16px;
        top:16px;
        right: 16px;
      }
      .content{
        padding:30px;
        .Amount{
          color: #f29b87;
        }
        .account-ways{
          display: flex;
          justify-content: space-between;
          padding-top: 30px;
          .account-block {
            transition: 0.2s linear;
            position: relative;
            width: 47%;
            height: 120px;
            background: rgba(248, 248, 248, 1);
            border: 1px solid rgba(205, 205, 205, 1);
            margin-bottom: 40px;
            padding: 0 0 0 24px;
            .account{
              margin-left: 50px;
              line-height: 50px;
              font-weight: 600;
              color: #777777;
              font-size: 16px;
            }
            .account-num{
              margin-left: 80px;
              line-height: 28px;
              color: #777777;
              font-size: 14px;
            }
            .account-name{
              margin-left: 80px;
              line-height: 28px;
              color: #777777;
              font-size: 14px;
            }
          }
          .account-choose {
            background-color: #ffffff;
            border: 1px solid rgba(186, 127, 140, 1);
            box-shadow: 2px 2px 4px 0px rgba(84, 84, 84, 0.16);
            .account{
              color: #ba7f8c !important;
            }
            .account-num{
              color: #ba7f8c !important;
            }
            .account-name{
              color: #ba7f8c !important;
            }
          }
          
        }
        .uploadPic{
          display: flex;
          margin-bottom: 20px;
          .text{
            .star{
              color: red;
            }
            margin-right: 40px;
          }
          .upload{
            // width: 510px;
            border: solid 1px #cdcdcd;
            padding: 20px;
            background-color: #f8f8f8;
            display: flex;
            .up{
              position: relative;
            }
            .up-text{
              display: block;
              position: absolute;
              bottom: 10px;
              left: 15px;
              color: #777777;
              font-size: 14px;
            }
            .tip{
              width: 249px;
              margin-left: 20px;
              font-size: 14px;
              line-height: 25px;
              color: #ff6b6b;
            }
          }
        }
        .transactionNum{
          display: flex;
          margin-bottom: 40px;
          .text2{
            margin-right: 72px;
            .number{
              font-size: 16px;
              line-height: 24px;
            }
            .can-select{
              font-size: 16px;
              text-align: center;
              color: #999999;
            }
          }
          .num-input{
            width: 390px;
            background-color: #f8f8f8;
            border: solid 1px #cdcdcd;
            line-height: 40px;
            line-height: 40px;
            padding-left: 15px;
          }
        }
        .btnPay{
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          .cancel-pay{
            width: 160px;
            height: 40px;
            background-color: #ffffff;
            border: solid 1px #8b766c;
            line-height: 40px;
            text-align: center;
            margin-right: 50px;
            cursor: pointer;
          }
          .finish-pay{
            width: 160px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #8b766c;
            cursor: pointer;
          }
        }
        .prompt{
          font-size: 14px;
          color: #f29b87;
        }
        .account-question {
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
        .choose-tick {
          position: absolute;
          right: -1px;
          bottom: 0;
          width: 27px;
          height: 26px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  
}
</style>
<style>
.el-upload{
  width: 80px;
  height: 80px;
  border: solid 1px #cdcdcd!important;
  background-color: #ffffff;
}
.el-icon-plus{
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  line-height: 50px;
  text-align: center;
}
.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name{
  display: none;
}
 .el-upload--picture-card{
  border: solid 1px #cdcdcd!important;
  background-color: #ffffff;
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.upload .el-upload-list--picture-card .el-upload-list__item {
    width: 80px;
    height: 80px;
    line-height: 80px;
}
.el-upload-list__item.is-success .el-upload-list__item-status-label{
  display: none;
}
  /* .avatar-uploader {
    width: 80px;
    height: 80px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } */
</style>