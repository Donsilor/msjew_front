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
        <div class="note" v-show="this.$store.state.coin == 'CNY' && this.$store.state.platform === 20"><span class="star">*</span> {{ $t(`${lang}.Note3`) }}</div>
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
            {{ formatCoin(coinType) }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 6 && this.$store.state.coin == 'CNY' && this.$store.state.platform === 20" class="pay-price-change">
            ({{ coinHKD }} {{ formatMoney(priceHKD) }})
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
            {{ formatCoin(coinType) }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay === 61 && this.$store.state.coin == 'CNY' && this.$store.state.platform === 20" class="pay-price-change">
            ({{ coinHKD }} {{ formatMoney(priceHKD) }})
          </div>
          <div v-show="payWay == 61" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
        </div>
        <!-- 支付宝 -->
        <div
          v-show="this.$store.state.platform == 20"
          :class="{ 'pay-choose': payWay == 82 }"
          class="pay-block"
          @click="payWay = 82"
        >
          <div class="pay-img">
            <img src="../../static/order/alipay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.AliPay`) }}</div>
          <div v-show="payWay == 82" class="pay-price">
            {{ formatCoin(coinType) }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 82 && this.$store.state.coin == 'CNY' && this.$store.state.platform === 20" class="pay-price-change">
            ({{ coinHKD }} {{ formatMoney(priceHKD) }})
          </div>
          <div v-show="payWay == 82" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
          <!-- <div class="hint_pay"><span>*</span> {{ $t(`${lang}.msg12`) }}</div> -->
        </div>

        <!-- 香港支付宝 -->
        <div
          v-show="this.$store.state.platform == 10"
          :class="{ 'pay-choose': payWay == 84 }"
          class="pay-block"
          @click="payWay = 84"
        >
          <div class="pay-img">
            <img src="../../static/order/alipay-HK.png" alt="" class="initial"/>
          </div>
          <div class="pay-desc">{{ $t(`${lang}.AliPay`) }}</div>
          <div v-show="payWay == 84" class="pay-price">
            {{ formatCoin(coinType) }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 84 && this.$store.state.coin == 'CNY' && this.$store.state.platform === 20" class="pay-price-change">
            ({{ coinHKD }} {{ formatMoney(priceHKD) }})
          </div>
          <div v-show="payWay == 84" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
          <!-- <div class="hint_pay"><span>*</span> {{ $t(`${lang}.msg12`) }}</div> -->
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
          v-show="this.$store.state.platform !== 30"
          :class="{ 'pay-choose': payWay == 83 }"
          class="pay-block"
          @click="payWay = 83"
        >
          <div class="pay-img">
            <img src="../../static/order/wechatpay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.AliPay`) }}</div>
          <div v-show="payWay == 83" class="pay-price">
            {{ formatCoin(coinType) }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 83 && this.$store.state.coin == 'CNY' && this.$store.state.platform === 20" class="pay-price-change">
            ({{ coinHKD }} {{ formatMoney(priceHKD) }})
          </div>
          <div v-show="payWay == 83" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
          <!-- <div class="hint_pay" :class="language == 'en_US' ? 'en' : ''
          "><span>*</span> {{ $t(`${lang}.msg11`) }}</div> -->
        </div>

        <!-- 信用卡 -->
        <div
          v-show="this.$store.state.platform !== 30"
          :class="{ 'pay-choose': payWay == 81 }"
          class="pay-block"
          @click="payWay = 81"
        >
          <div class="pay-img">
            <img src="../../static/order/unionpay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.UnionPay`) }}</div>
          <div v-show="payWay === 81" class="pay-price">
            {{ formatCoin(coinType) }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay === 81 && this.$store.state.coin == 'CNY' && this.$store.state.platform === 20" class="pay-price-change">
            ({{ coinHKD }} {{ formatMoney(priceHKD) }})
          </div>
          <div v-show="payWay == 81" class="choose-tick">
            <img src="../../static/order/tick.png" alt="" />
          </div>
          <div class="hint_pay"><span>*</span> {{ $t(`${lang}.msg12`) }}</div>
        </div>

        <!-- 电汇 -->
        <div
           v-show="this.$store.state.platform !== 30"
          :class="{ 'pay-choose': payWay == 88 }"
          class="pay-block"
          @click="payWay = 88;wire()"
        >
          <div class="pay-img">
            <img src="../../static/order/epay.png" alt="" />
          </div>
          <div class="pay-desc">{{ $t(`${lang}.EPay`) }}</div>
          <div v-show="payWay == 88" class="pay-price">
            {{ formatCoin(coinType) }} {{ formatMoney(price) }}
          </div>
          <div v-show="payWay == 88 && this.$store.state.coin == 'CNY' && this.$store.state.platform === 20" class="pay-price-change">
            ({{ coinHKD }} {{ formatMoney(priceHKD) }})
          </div>
          <div v-show="payWay == 88" class="choose-tick">
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
            {{ $t(`${lang}.pleaseSelectAccount`) }}
            <img @click="closed" class="close" src="../../static/order/closed.png" alt="">
          </div>
          <div class="content">
            <div v-if="this.$store.state.coin == 'CNY' && this.$store.state.platform === 20" class="Amount">
              <span>{{ $t(`${lang}.paidAmount`) }}</span>
              {{ formatCoin(coinType) }} {{ formatMoney(price) }}
              <span class="price-hkd">({{ coinHKD }} {{ formatMoney(priceHKD) }})</span>
            </div>
            <div v-else class="Amount">
              <span>{{ $t(`${lang}.paidAmount`) }}</span>
              {{ formatCoin(coinType) }} {{ formatMoney(price) }}
            </div>
            <div class="accounts-block">
              <div class="account-ways" v-for="(item, index) in accountlist" :key="index">
                <div :class="accountWay === index ? 'account-choose' : ''" @click="changeWay(index)" class="account-block">
                  <div class="account">
                    <span>{{ $t(`${lang}.Account`) }}</span>
                    <span>{{item.bank_name}}</span>
                  </div>
                  <div class="account-num">
                    <span>{{ $t(`${lang}.AccountNumber`) }}</span>
                    <span>{{item.account}}</span>
                  </div>
                  <div class="account-name">
                    <span>{{ $t(`${lang}.AccountName`) }}</span>
                    <span>{{item.account_name}}</span>
                  </div>
                  <div class="account-name">
                    <span>{{ $t(`${lang}.bankAddress`) }}</span>
                    <span>{{item.bank_address}}</span>
                  </div>
                  <div class="account-name">
                    <span>{{ $t(`${lang}.SwiftCode`) }}</span>
                    <span>{{item.swift_code}}</span>
                  </div>
                  <div v-show="accountWay === index" class="choose-tick">
                    <img src="../../static/order/tick.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div class="uploadPic">
              <div class="text">
                <span class="star">*</span>
                <span>{{ $t(`${lang}.UploadPayVoucher`) }}</span>
              </div>
              <div class="upload">
                <div class="up">
                  <el-upload
                    :class="{hide:hideUpload}"
                    action="#"
                    :before-upload="beforeUpload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :limit="1"
                    :on-change = "onchange"
                    >
                    <i class="el-icon-plus"></i>
                    <span class="up-text">{{ $t(`${lang}.uploadPhotos`) }}</span>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </div>
                <div class="tip">
                  {{ $t(`${lang}.Note1`) }}
                </div>
              </div>
            </div>
            <div class="transactionNum">
              <div class="text2">
                <div class="number">{{ $t(`${lang}.PayTransactionNumber`) }}</div>
                <div class="can-select">{{ $t(`${lang}.Optional`) }}</div>
              </div>
              <div class="num-input">
                <input type="text" v-model="number">
              </div>
            </div>
            <div class="btnPay">
              <div class="cancel-pay" @click="Cancel">{{ $t(`${lang}.CancelPayment`) }}</div>
              <div class="finish-pay" @click="Finished">{{ $t(`${lang}.PaymentCompleted`) }}</div>
            </div>
            <div class="prompt">
              <p>{{ $t(`${lang}.Note2`) }}</p>
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

    <div class="pop-layer" v-if="ifShowLayer"></div>
  </div>
</template>

<script>
const lang = `pay`
// const token =  this.$store.state.token
export default {
  data() {
    if ( parseInt(this.$route.query.payType)===7 ) {
      this.$route.query.payType = 2
    }
    return {
      lang,
      payWay: 6,
      answer: false,
      pay: false,
      isPay: false,
      noPay: false,
      failedOrder: false,
      price: this.$route.query.price,
      priceHKD: this.$route.query.priceHKD,
      coinType: this.$route.query.coinType,
      form: [],
      actionLink: '',
      goingPay: false,
      language:'',
      transfer:false,
      fileList: {},
      dialogImageUrl: '',
      imgs:'',
      account:'',
      number:'',
      dialogVisible: false,
      hideUpload: false,
      myHeaders: {access_token: this.$store.state.token},
      accountlist:[],
      accountWay:'',
      coinHKD:'HKD',
      ifShowLayer: false

      // myHeaders:this.$store.state.token,
      // imgDatas:[],
      // formData:new FormData(),
      // imgs: {},
      // imgLen:0, el-upload--picture-card
    }
  },
  mounted(){
    this.language = this.getCookie('language')
    let element = document.querySelector('.el-upload ')
    // console.log("44444",this.fileList)
    this.getAccount()

    fbq('track', 'InitiateCheckout');
    // if(this.dialogImageUrl.length == 1){
    //   console.log("44444")
    //   element.style.display = 'none'
    // }
  },
  computed: {
    ttPrice() {
      // return this.price * 0.985
      return this.price
    }
  },
  methods: {
    // 获取账户信息
    getAccount(){
      this.$axios
        .get('/web/pay/collection-account-info')
        .then(res => {
          this.accountlist = res.data
          console.log("ssss",res)
        })
        .catch(err => {
          this.$message.error(err.message)
      })
    },
    // 选择账户
    changeWay(ind) {
      this.account = this.accountlist[ind].account
      // console.log("选择",this.accountlist[ind].account)
      this.accountWay = ind
    },
    // 上传图片
    beforeUpload(file) {
      console.log("file2222",file)
      // jpeg,bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp
      const isJPG =
        file.type == 'image/jpeg'||
        file.type == 'image/png'||
        file.type == 'image/jpg'||
        file.type == 'image/gif'||
        file.type == 'image/tiff'||
        file.type == 'image/raw'||
        file.type == 'image/pcx'||
        file.type == 'image/tga'||
        file.type == 'image/exif'||
        file.type == 'image/fpx'||
        file.type == 'image/svg'||
        file.type == 'image/psd'||
        file.type == 'image/cdr'||
        file.type == 'image/pcd'||
        file.type == 'image/dxf'||
        file.type == 'image/ufo'||
        file.type == 'image/eps'||
        file.type == 'image/ai'||
        file.type == 'image/WMF'||
        file.type == 'image/webp'||
        file.type == 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error(this.$t(`${lang}.imgFomat`));
          return isJPG
        }
        if (!isLt2M) {
          this.$message.error(this.$t(`${lang}.imgSize`));
          return isLt2M
        }
        // return isJPG && isLt2M;
        var fd = new window.FormData();
        fd.append('file', file, file.name)
        this.$axios.post("/web/file/images",fd)
        .then(res => {
          this.imgs = res.data.url
          console.log("上传图片",this.imgs);
          //  return res.data.url
        });
        // return false // 返回false不会自动上传 imgFomat
    },
    // 取消付款
    Cancel(){
      this.payWay = 6
      this.transfer = false
    },
    // 完成付款
    Finished(){
      // console.log('a',typeof this.accountWay)
      // return
      if(this.accountWay === ''){
        this.$message.error(this.$t(`${lang}.selectAccount`))
        return
      }
      if(this.imgs === ''){
        this.$message.error(this.$t(`${lang}.selectVoucher`))
        return
      }
      const data ={
        order_id: this.$route.query.orderId,
        account:this.account,
        payment_serial_number:this.number,
        payment_voucher:this.imgs
      }
      this.$axios
        .post('/web/pay/wire-transfer',data)
        .then(res => {
          this.ifShowLayer = true
          this.$successMessage(this.$t(`${lang}.transferSuccessful`))
          this.transfer = false
          setTimeout(() => {
            this.$router.replace({
              path: '/account/orders',
            })
          }, 3000)
        })
        .catch(err => {
          this.$message.error(err.message)
      })
    },
    // 删除图片
    handleRemove(file, fileList) {
      // console.log("删除了")
      if(fileList == ''){
        setTimeout(() => {
          this.hideUpload = false
        }, 500);
      }
    },
    // 放大图片
    handlePictureCardPreview(file) {
      console.log("file",file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片是触发的方法
    onchange(fileList){
      // console.log(fileList.length)
      if(fileList !==''){
        this.hideUpload = true
      }
    },
    // 选择电汇触发打开弹窗
    wire(){
      this.transfer = true
    },
    // 关闭提交电汇信息弹窗
    closed(){
      this.payWay = 6
      this.transfer = false
    },
    goPay() {
      if(this.$store.state.coin === 'USD'){
        if(this.payWay == 82 || this.payWay == 83||this.payWay == 81||this.payWay == 84){
          this.$errorMessage(this.$t(`${lang}.NotSupportPay`))
          return
        }
      }

      let pay = ""
      if(this.payWay==6){
        pay = 6
      }else if(this.payWay==61){
        pay = 61
      }else if(this.payWay==81){
        pay = 81
      }else if(this.payWay==82){
        pay = 82
      }else if(this.payWay==83){
        pay = 83
      }else if(this.payWay==84){
        pay = 84
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
.accounts-block{
  width: 100%;
  display: flex;
    flex-wrap: wrap;
  // flex-wrap: wrap;
  // align-items: center;
  // justify-content: space-between;
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
      // width: 1300-51-36px;
       width: 48%;
      height: 20px;
      display: flex;
      align-items: flex-end;
      margin-bottom: 17px;
      position: relative;
      .note{
        position: absolute;
        font-size: 12px;
        // left:279px;
        right: 0;
        color: #cac7c7;
        .star{
          color: red;
        }
      }
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
          top: 30px;
          line-height: 24px;
        }
        .pay-price-change{
          font-size: 15px;
          font-family: twCenMt;
          color: #c6bbb9;
          position: absolute;
          right: 80px;
          top: 54px;
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
  top: 94px;
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
  z-index: 2005;
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
          font-size: 24px;
          position: relative;
          .price-hkd{
            position: absolute;
            top:5px;
            left:295px;
            color: #c6bbb9;
            font-size: 15px;
          }
        }
        .account-ways:first-child{
          padding-top: 30px;
        }
        .account-ways:nth-child(2){
          padding-top: 30px;
          padding-right: 0;
        }
        .account-ways{
          cursor: pointer;
          padding: 0px 40px 0 0;
          .account-block {
            padding: 5px;
            transition: 0.2s linear;
            position: relative;
            width: 435px;
            min-height: 190px;
            background: rgba(248, 248, 248, 1);
            border: 1px solid rgba(205, 205, 205, 1);
            margin-bottom: 40px;
            // padding: 0 0 0 24px;
            .account{
              margin-left: 40px;
              line-height: 50px;
              font-weight: 600;
              color: #777777;
              font-size: 15px;
            }
            .account-num{
              margin-left: 80px;
              line-height: 28px;
              color: #777777;
              font-size: 12px;
            }
            .account-name{
              margin-left: 80px;
              line-height: 28px;
              color: #777777;
              font-size: 12px;
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
            width: 215px;
            font-size: 15px;
            .star{
              color: red;
            }
            // margin-right: 40px;
          }
          .upload{
            // width: 510px;
            border: solid 1px #cdcdcd;
            padding: 20px;
            background-color: #f8f8f8;
            display: flex;
            .up{
              position: relative;
              width: 148px;
              height: 148px;
              background-color: #ffffff;
            }
            .up-text{
              display: block;
              width: 148px;
              text-align: center;
              position: absolute;
              bottom: -26px;
              // left: 28px;
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
            width: 215px;
            // margin-right: 72px;
            .number{
              font-size: 16px;
              line-height: 24px;
            }
            .can-select{
              font-size: 16px;
              // text-align: center;
              color: #999999;
            }
          }
          .num-input{
            input{
              width: 460px;
              background-color: #f8f8f8;
              border: solid 1px #cdcdcd;
              line-height: 40px;
              line-height: 40px;
              padding-left: 15px;
            }
          }
        }
        .btnPay{
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
          .cancel-pay{
            width: 200px;
            height: 40px;
            background-color: #ffffff;
            border: solid 1px #8b766c;
            line-height: 40px;
            text-align: center;
            margin-right: 50px;
            cursor: pointer;
            color: #777777;
          }
          .finish-pay{
            width: 200px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #8b766c;
            cursor: pointer;
            color:#fff;
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
.el-upload-list__item {
  transition: none !important;
}
.el-message{
  z-index: 2010!important;
}
.hide .el-upload--picture-card {
    display: none;
}
.el-upload{
  /* width: 200px; */
  /* height: 80px; */
  border: solid 0.5px #cdcdcd!important;
  background-color: #ffffff;
}
.el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name{
  display: none;
}
.el-upload-list__item.is-success .el-upload-list__item-status-label{
  display: none;
}

.pop-layer{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1201;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}

.initial{
	width: auto !important;
}
</style>
