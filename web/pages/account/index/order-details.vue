<template>
  <div class="order-details">
    <div class="od-top">
      <nuxt-link to="/account/orders"
        ><div>
          <span>{{ $t(`${lang}.title`) }}</span> >>
          {{ $t(`${lang}.orderTitle`) }}
        </div></nuxt-link
      >
      <div>
        <p v-for="(step, ns) in statusSteps" :key="ns">
          <span
            :style="{
              'background-color': step.active
                ? 'rgba(242,155,135,1)'
                : '#E6E6E6'
            }"
            >{{ ns + 1 }}</span
          >
          <span
            :style="{ color: step.active ? 'rgba(242,155,135,1)' : '#999' }"
            >{{ step.title }}</span
          >
        </p>
        <div
          v-for="(step, index) in statusSteps"
          :key="index + 'what'"
          class="top-line"
        >
          <div
            :style="{
              'background-color':
                step.active &&
                statusSteps[index + 1] &&
                statusSteps[index + 1].active
                  ? 'rgba(242,155,135,1)'
                  : '#E6E6E6'
            }"
            class="top-line-line"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="data.details && data.details.length > 0" class="info-block">
      <div class="block-title">
        <div v-if="data.orderStatus !== 0 && data.wireTransferStatus !== null && data.refundStatus == 0" class="status">
          <span v-if="data.wireTransferStatus == '0'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.pending`)}}
          </span>
          <span v-else-if="data.wireTransferStatus == '1'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.hadPay`)}}
          </span>
          <span v-else-if="data.wireTransferStatus == '10'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.PayFailed`)}}
          </span>
        </div>
        <div v-else-if="data.refundStatus == 1" class="status">
          <span v-if="data.refundStatus == '1'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.hadClosed`)}}
          </span>
        </div>
        <div v-else class="status">
          <span v-if="data.orderStatus == '10'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.waitingPay`)
          }}</span>
          <span v-else-if="data.orderStatus == '20'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{ $t(`${lang_pay}.hadPay`)
          }}</span>
          <span v-else-if="data.orderStatus == '30'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.waitingSend`)
          }}</span>
          <span v-else-if="data.orderStatus == '40'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.hadSend`)
          }}</span>
          <span v-else-if="data.orderStatus == '0'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.cancelTransaction`)
          }}</span>
          <span v-else-if="data.orderStatus == '50'">
            {{$t(`${lang_pay}.orderStatus`)}}:&nbsp;&nbsp;
            {{$t(`${lang_pay}.hadFinish`)
          }}</span>
        </div>
      </div>
      <div class="addr-info">
        <div class="addr">
          <div class="block-title-line">
            <div />
            <div>{{ $t(`${lang}.address`) }}</div>
          </div>
          <div class="addr-list">
            <div class="address">
              {{ data.address.countryName }}-{{ data.address.provinceName
              }}{{ data.address.cityName }}
            </div>
            <div class="user-info">
              <div>
                {{ data.address.realName }}<span>{{ $t(`${lang}.get`) }}</span>
              </div>
              <div>
                <span>{{ data.address.userTelCode }}</span>
                <span>{{ data.address.userTel }}</span>
              </div>
            </div>
            <div class="full-address">{{ data.address.address }}</div>
            <div class="other-info">
              <span v-if="data.address.zipCode">{{ data.address.zipCode }}</span
              ><span>{{ data.address.userMail }}</span>
            </div>
          </div>
        </div>
        <div class="express" v-if="data.express">
          <div class="block-title-line">
            <div />
            <div>{{ $t(`${lang}.expressInfo`) }}</div>
          </div>
          <div class="express-title-info">
            <div>{{ $t(`${lang}.express`) }}：{{ data.express.companyName }}</div>
            <div>{{ $t(`${lang}.WaybillNumber`) }}：{{ data.express.expressNo }}</div>
            <div>&nbsp;</div>
          </div>
          <div class="express-time">
            <div>{{ $t(`${lang}.expressTime`) }}：{{ data.express.delivery_time }}</div>
          </div>
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-info-title">
          <div class="t1">{{ $t(`${lang}.goodsInfo`) }}</div>
          <div class="t2">{{ $t(`${lang}.goodsNum`) }}</div>
          <div class="t3">{{ $t(`${lang}.oldPrice`) }}</div>
          <div class="t4">{{ $t(`${lang}.newPrice`) }}</div>
        </div>
        <div v-for="(detail, _index) in data.details" :key="_index">
          <!-- 单品 -->
          <div v-if="detail.categoryId !== 19 && (detail.ring == ''|| !detail.ring)" class="detail-info single">
            <div class="goods-details">
              <nuxt-link :to="goToDetail(detail)" target="_blank">
                <div class="t1">
                  <div class="good-img">
                    <img :src="IMG_URL + detail.goodsImages" />
                  </div>
                  <div class="good-desc">
                    <div class="good-name">{{ detail.goodsName }}</div>
                    <div class="good-sku">SKU：{{ detail.goodsCode }}</div>
                    <div class="details">
                      <span v-for="(v, k) in detail.detailSpecs" :key="k"
                        >{{ v.name }}：{{ v.value }}</span
                      >
                    </div>
                  </div>
                </div>
              </nuxt-link>
              <div class="t2">1</div>
              <div class="t3" :class="{'old-price': couponType(detail.couponInfo) == 2}">
                {{ formatCoin(data.coinCode) }} {{ formatMoney(detail.goodsPrice) }}
              </div>
              <div class="t4">
                {{ formatCoin(data.coinCode) }} {{ couponType(detail.couponInfo) == 2 ? formatMoney(detail.goodsPayPrice) : formatMoney(detail.goodsPrice) }}
              </div>
            </div>
          </div>
          <!-- 对戒 -->
          <div v-else-if="detail.categoryId === 19" class="detail-info double">
            <div  class="goods-details">
              <nuxt-link :to="goToDetail(detail)" target="_blank">
                <div class="t1">
                  <div class="good-img">
                    <img :src="IMG_URL + detail.goodsImages" />
                  </div>
                  <div class="good-name">{{ detail.goodsName }}</div>
                  <div class="good-desc"> 
                    <div class="dec" v-for="(d, _index) in detail.ring" :key="_index">
                      
                      <div class="good-sku">SKU：{{ detail.goodsCode }}</div>
                      <div class="details">
                        <span v-for="(v, k) in d.lang.goods_spec" :key="k"
                          >{{ v.attr_name }}：{{ v.attr_value }}</span
                        >
                        <span class="gender" v-for="(a, b) in d.lang.goods_attr[26].value" :key="b">
                            ({{ a }})
                        </span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </nuxt-link>
              <div class="t2">1</div>
            </div>
              <!-- <div class="t3">
                {{ formatCoin(data.coinCode) }} {{ formatMoney(doubleRingGoodPrice) }} 
              </div> -->
              <div class="t3" :class="{'old-price': couponType(detail.couponInfo) == 2}">
                {{ formatCoin(data.coinCode) }} {{ formatMoney(doubleRingGoodPrice) }} 
              </div>
              <div class="t4">
                {{ formatCoin (data.coinCode) }} {{ couponType(detail.couponInfo) == 2 ? formatMoney(detail.goodsPayPrice) : formatMoney(detail.goodsPrice) }}
              </div>
          </div>
          <!-- 定制 -->
          <div v-else class="detail-info customization">
            <div class="goods-details">
              <nuxt-link :to="goToDetail(detail)" target="_blank">
                <div class="t1">
                  <div class="good-img">
                    <img :src="IMG_URL + detail.goodsImages" />
                  </div>
                  <div class="good-desc">
                    <div class="good-name">{{ detail.goodsName }}</div>
                    <div class="good-sku">SKU：{{ detail.goodsCode }}</div>
                    <div class="details">
                      <span v-for="(v, k) in detail.detailSpecs" :key="k"
                        >{{ v.name }}：{{ v.value }}</span
                      >
                    </div>
                  </div>
                </div>
              </nuxt-link>
              <div class="t2">1</div>
                <div class="t3" :class="{'old-price': couponType(detail.couponInfo) == 2}">
                  {{  formatCoin (data.coinCode) }} {{ formatMoney(detail.goodsPrice) }}
                </div>
                <div class="t4">
                  {{ formatCoin (data.coinCode) }} {{ couponType(detail.couponInfo) == 2 ? formatMoney(detail.goodsPayPrice) : formatMoney(detail.goodsPrice) }}
                </div>
              </div>
          </div>
        </div>
        <div class="goods-bot-bar" />
      </div>
    </div>

    <!--<div v-for="(detail, nb) in data.outDetails" :key="nb" class="info-block">
      <div class="block-title">{{ $t(`${lang}.deliveryInfo`) }}{{ n + 1 }}</div>
      <div class="addr-info">
        <div class="addr">
          <div class="block-title-line">
            <div />
            <div>{{ $t(`${lang}.address`) }}</div>
          </div>
          <div class="addr-list">
            <div class="address">
              {{ data.address.countryName }}-{{ data.address.provinceName
              }}{{ data.address.cityName }}
            </div>
            <div class="user-info">
              <div>
                {{ data.address.realName }}<span>{{ $t(`${lang}.get`) }}</span>
              </div>
              <div>
                <span>{{ data.address.userTelCode }}</span>
                <span>{{ data.address.userTel }}</span>
              </div>
            </div>
            <div class="full-address">{{ data.address.address }}</div>
            <div class="other-info">
              <span v-if="data.address.zipCode">{{ data.address.zipCode }}</span
              ><span>{{ data.address.userMail }}</span>
            </div>
          </div>
        </div>
        <div class="express">
          <div class="block-title-line">
            <div />
            <div>{{ $t(`${lang}.expressInfo`) }}</div>
          </div>
          <div class="express-title-info">
            <div>{{ $t(`${lang}.express`) }}：{{ detail.companyName }}</div>
            <div>{{ $t(`${lang}.WaybillNumber`) }}：{{ detail.expressNo }}</div>
            <div>&nbsp;</div>
          </div>
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-info-title">
          <div class="t1">{{ $t(`${lang}.goodsInfo`) }}</div>
          <div class="t2">{{ $t(`${lang}.goodsNum`) }}</div>
          <div class="t3">{{ $t(`${lang}.goodsPrice`) }}</div>
        </div>
        <div
          v-for="(d, __index) in detail.outOrderDetails"
          :key="__index"
          class="goods-details"
        >
          <nuxt-link :to="goToDetail(d)">
            <div class="t1">
              <div class="good-img">
                <img :src="IMG_URL + d.goodsImages.split(',')[0]" />
              </div>
              <div class="good-desc">
                <div class="good-name">{{ d.goodsName }}</div>
                <div class="good-sku">SKU：{{ d.goodsCode }}</div>
                <div class="details">
                  <span
                    v-for="(v, king) in JSON.parse(d.detailSpecs || '{}')"
                    :key="king"
                    >{{ v.name }}：{{ v.value }}</span
                  >
                </div>
              </div>
            </div>
          </nuxt-link>
          <div class="t2">1</div>
          <div class="t3">
            {{ data.coinCode }} {{ formatMoney(d.goodsPrice) }}
          </div>
        </div>
        <div class="goods-bot-bar">
          <div>{{ data.orderTime }}</div>
          <div>
            {{ $t(`${lang}.orderStatus`) }}：
            <span>{{ getStatusText(data.orderStatus) }}</span>
          </div>
        </div>
      </div>
    </div>-->

    <div class="bot-info">
      <div class="left-info" >
        <div v-show="this.invoice && this.invoice.invoiceTitle">
          <div class="new-address-title">
            <div class="na-line" />
            <div class="na-title"> {{ $t(`${lang_invoice}.InvoiceDetails`) }}</div>
          </div>
          <div class="order-infos">
            <div class="info-line">
              <div class="label"> {{ $t(`${lang_invoice}.InvoiceType`) }}</div>
              <div class="orderNo">
                {{ type }}
              </div>
            </div>
            <div class="info-line">
              <div class="label"> {{ $t(`${lang_invoice}.HeaderType`) }}</div>
              <div class="ff ">
                {{ formatCoin(headType) }}
              </div>
            </div>
            <div class="info-line">
              <div class="label"> {{ $t(`${lang_invoice}.Invoice`) }}</div>
              <div class="ff">{{ invoice.invoiceTitle }}</div>
            </div>
            <div class="info-line">
              <div class="label"> {{ $t(`${lang_invoice}.TaxID`) }}</div>
              <div class="ff">
                {{ invoice.taxNumber }}
              </div>
            </div>
            <div class="info-line" v-show="invoice.isElectronic == 1">
              <div class="label"> {{ $t(`${lang_invoice}.email`) }}</div>
              <div class="ff ">
                {{ invoice.email }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-info">
        <div class="new-address-title">
          <div class="na-line" />
          <div class="na-title">{{ $t(`${lang}.yourBuyInfo`) }}</div>
        </div>
        <div class="order-infos">
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.orderNum`) }}</div>
            <div class="orderNo">
              {{ data.orderNo }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.itemsNum`) }}</div>
            <div class="ff">{{ data.productCount }}</div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.totalNum`) }}</div>
            <div class="ff">
              {{ formatCoin(data.coinCode) }} {{ formatNumber(data.productAmount) }}
            </div>
          </div>
          <!-- <div class="info-line" v-for="item in cardList">
            <div class="label">{{ $t(`${lang_invoice}.shoppingCard`) }} （<span class="fontSize">{{ item.sn }}</span>)</div>
            <div class="ff color-pink">
              -{{ formatCoin(data.coinCode) }} {{item.useAmount}} <span class="fontSize" v-if="data.orderStatus == 0">(已解绑)</span>
            </div>
          </div> -->
          <!-- <div class="info-line">
            <div class="label">{{ $t(`${lang}.coupon`) }}</div>
            <div class="ff color-pink">
              -{{ formatCoin(data.coinCode) }} {{ formatNumber(data.preferFee) }}
            </div>
          </div> -->

          <div class="info-line">
            <div class="label">{{ $t(`${lang}.freight`) }}</div>
            <div class="ff">
              +{{ formatCoin(data.coinCode) }} {{ formatNumber(data.logisticsFee) }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.tex`) }}</div>
            <div class="ff">
              +{{ formatCoin(data.coinCode) }} {{ formatNumber(data.taxFee) }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.insurance`) }}</div>
            <div class="ff">
              +{{ formatCoin(data.coinCode) }} {{ formatNumber(data.safeFee) }}
            </div>
          </div>
          <div v-if="data.transPreferFee" class="info-line">
            <div class="label">{{ $t(`${lang}.transPreferFee`) }}</div>
            <div class="ff">
              +{{ formatCoin(data.coinCode) }} {{ formatNumber(data.transPreferFee) }}
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ $t(`${lang}.orderTotal`) }}</div>
            <div class="ff big-ff">
              <!-- {{ data.coinCode }} {{ formatNumber(data.orderAmount) }} -->
              {{ formatCoin(data.coinCode) }} {{ formatNumber(data.orderAmount) }}
            </div>
          </div>

          <!-- 折扣金额 -->
          <div class="info-line" v-if="data.discountAmount != 0">
            <div class="label">{{ $t(`${lang_invoice}.discountPrice`) }}</div>
            <div class="ff color-pink">
              -{{ formatCoin(data.coinCode) }} {{ formatNumber(data.discountAmount) }}
            </div>
          </div>

          <!-- 优惠金额 -->
          <div class="info-line" v-if="data.couponAmount != 0">
            <div class="label">{{ $t(`${lang_invoice}.coupon`) }}</div>
            <div class="ff color-pink">
              -{{ formatCoin(data.coinCode) }} {{ formatNumber(data.couponAmount) }}
            </div>
          </div>

          <!-- 购物卡 -->
          <div class="info-line" v-for="(item,index) in cardList" :key="index">
            <div class="label">{{ $t(`${lang_invoice}.shoppingCard`) }} （<span class="fontSize">{{ item.sn }}</span>)</div>
            <div class="ff color-pink">
              -{{ formatCoin(data.coinCode) }} {{item.useAmount}} <span class="fontSize" v-if="data.orderStatus == 0">({{ $t(`${lang}.Untied`) }})</span>
            </div>
          </div>

          <div class="info-line">
            <div class="label big-label">{{data.orderStatus == 0 || data.orderStatus == 10 ? $t(`${lang_invoice}.NeedPay`) : $t(`${lang_invoice}.ultimatelyPay`) }}</div>
            <div class="ff big-ff">
              {{ formatCoin(data.coinCode) }} {{ formatNumber(data.payAmount) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
const lang = 'personal.orderDetail'
const lang_pay = 'personal.userOrder'
const lang_invoice = 'invoice'
export default {
  name: 'OrderDetails',
  data() {
    return {
      lang,
      lang_pay,
      lang_invoice,
      oid: this.$route.query.orderId,
      data: {
        address: {
          countryName: '',
          provinceName: '',
          cityName: '',
          address: '',
          realName: '',
          userMail: '',
        },
      },
      orderStatus:'',
      invoice:{
        email: "",
        invoiceTitle: "",
        invoiceType: '',
        isElectronic: '',
        taxNumber: ""
      },
      type:'',
      headType:'',
      cardList: [],
      doubleRingGoodPrice:'', //对戒商品价格
      proCategoryId:''
    }
  },
  computed: {
    couponType(k) {
      return function(k) {
        var k_type=0;
        if(k.hasOwnProperty('type')){
          k_type = k.type
        }else{
          k_type = 0;
        }

        return k_type
      }
    },
    statusSteps() {
      // data.orderStatus
      const orderStatus = this.data.orderStatus
      const result = [
        {
          id: 0,
          title: this.$t(`${lang}.result`)[0],
          active: false
        },
        {
          id: 1,
          title: this.$t(`${lang}.result`)[1],
          active: false
        },
        {
          id: 2,
          title: this.$t(`${lang}.result`)[2],
          active: false
        },
        {
          id: 3,
          title: this.$t(`${lang}.result`)[3],
          active: false
        },
        {
          id: 4,
          title: this.$t(`${lang}.result`)[4],
          active: false
        }
      ]
      // 1-未付款,2-已付款,3-已发货,4-已完成,5-未评论,6-已评论,7-退货申请,8-退货中,9-已退货,10-取消交易
      if(orderStatus==0|| orderStatus==10){
        result[0].active = true
      }else if(orderStatus==20 || orderStatus==30){
        result[0].active = true
        result[1].active = true
      }else if(orderStatus==40){
        result[0].active = true
        result[1].active = true
        result[2].active = true
      }else if(orderStatus==50){
         result[0].active = true
        result[1].active = true
        result[2].active = true
        result[3].active = true
      }
      return result
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getStatusText(status) {

      var status_value =  {
          0 :this.$t(`${lang}.cancelTransaction`),
          10: this.$t(`${lang}.hadNotPay`),
          20: this.$t(`${lang}.hadPay`),
          30: this.$t(`${lang}.hadSend`),
          40: this.$t(`${lang}.hadFinish`),
        };
      // console.log("kkkk",status_value[status])
      return status_value[status];
    },
    getData() {
      var that = this;
      // console.log("id",this.oid)
      this.$axios
        .get('/web/member/order/detail', {
          params: { orderId: this.oid }
        })
        .then(res => {
          this.data = res.data
          // console.log("this.data",this.data)
          this.invoice = res.data.invoice
          this.orderStatus = res.data.orderStatus
          // console.log("data",this.orderStatus)
          this.data.orderTime = moment(this.data.orderTime).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          this.data.details.forEach(obj => {
            obj.detailSpecs = JSON.parse(obj.detailSpecs)
            obj.goodsImages = obj.goodsImages.split(',')[0]
            this.doubleRingGoodPrice = obj.goodsPrice
            this.proCategoryId = obj.categoryId
          })
          if(!this.data.invoice.isElectronic){
            this.type = this.$t(`${lang_invoice}.PaperInvoice`)
          } else {
            this.type = this.$t(`${lang_invoice}.ElectronicInvoice`)
          }
          if(this.data.invoice.invoiceType == 2){
            this.headType = this.$t(`${lang_invoice}.personal`)
          } else {
            this.headType = this.$t(`${lang_invoice}.company`)
          }

          if(res.data.cards.length != 0){
            that.cardList = res.data.cards;
          }

        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    goToDetail(obj) {
      // console.log("issssss",obj)
      let route = {
        path: '/',
        query: {}
      }
      const ct = obj.categoryId
      if (ct === 19) {
        // console.log(`对戒💍`)
        route = {
          path: `/ring/wedding-rings/${obj.goodsId.replace(/\//g, '')}`,
          query: {
            goodId: obj.goodsId,
            ringType: 'pair'
          }
        }
      } else {
        // console.log(obj.data[0].simpleGoodsEntity)
        const ct = obj.categoryId
        // console.log(ct)
        if (ct === '15') {
          // console.log(`💎`)
          route = {
            path: `/diamond-details/${obj.goodsId.replace(/\//g, '')}`,
            query: {
              goodId: obj.goodsId
            }
          }
        }else if (ct === '2' ||ct === '13' || ct === '14') { //戒指
          // console.log(`💍`)
          route = {
            path: `/ring/wedding-rings/${obj.goodsId.replace(/\//g, '')}`,
            query: {
              goodId: obj.goodsId,
              ringType: 'single'
            }
          }
        }else if (ct === '12') { //戒托
          // console.log(`💍`)
          route = {
            path: `/ring/engagement-rings/${obj.goodsId.replace(/\//g, '')}`,
            query: {
              goodId: obj.goodsId,
              ringType: 'single'
            }
          }
        }  else {
          // console.log(`饰品`)
          route = {
            path: `/jewellery/all/${obj.goodsId.replace(/\//g, '')}`,
            query: {
              goodId: obj.goodsId
            }
          }
        }
      }
      return this.routeDataToUrl(route)
    }
  }
}
</script>

<style scoped lang="less">
.status{
  text-align: right;
  span{
    margin-right: 105px;
    font-size: 14px;
  }
}
.order-details {
  width: 100%;
  text-align: left;
  .od-top {
    // width: 940px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 50px;
    div:nth-child(1) {
      height: 17px;
      line-height: 17px;
      font-size: 16px;
      color: rgba(242, 155, 135, 1);
    }
    div:nth-child(2) {
      width: 424+25+48+53+100px;
      display: flex;
      justify-content: space-between;
      position: relative;
      p {
        // width: 80px;
        text-align: center;
        span:nth-child(1) {
          display: block;
          width: 35px;
          height: 35px;
          background: rgba(242, 155, 135, 1);
          border-radius: 50%;
          color: #ffffff;
          line-height: 35px;
          margin: 0 auto 5px;
        }
        span:nth-child(2) {
          line-height: 12px;
          height: 12px;
          font-size: 15px;
          color: rgba(242, 155, 135, 1);
        }
      }
      .top-line {
        position: absolute;
        width: 112px;
        height: 2px;
        top: 16px;
        left: 50px;
        .top-line-line {
          width: 112px;
          height: 2px;
          background: rgba(242, 155, 135, 1);
          border-radius: 1px;
        }
      }
      .top-line:nth-child(7) {
        // left: 40+80+30+22+40+6px;
        left:201px
      }
      .top-line:nth-child(8) {
        // left: 40+80+30+80+35+35+56+12px;
        left:350px
      }
      .top-line:nth-child(9) {
        // left: 40+80+30+80+30+80+40+45+75+23px;
        left:502px;
        background-color: #e6e6e6;
      }
    }
  }
  .info-block {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
    .block-title {
      width: 100%;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      background: rgba(254, 230, 226, 1);
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 20px;
      text-align: center;
    }
    .addr-info {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 30px;
      .addr {
        width: 448px;
        .block-title-line {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          div:nth-child(1) {
            width: 2px;
            height: 16px;
            background: rgba(242, 155, 135, 1);
            margin-right: 17px;
          }
          div:nth-child(2) {
            line-height: 16px;
            height: 16px;
            font-size: 16px;
            color: rgba(242, 155, 135, 1);
          }
        }
        .addr-list {
          padding: 0 20px;
          .address {
            width: 100%;
            line-height: 14px;
            height: 16px;
            font-size: 14px;
            color: rgba(51, 51, 51, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .user-info {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 9px 0 5px;
            div:nth-child(1) {
              width: 468 * 0.6px;
              display: flex;
              align-items: center;
              height: 18px;
              font-size: 16px;
              color: #333;
              line-height: 18px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              span {
                font-size: 12px;
                line-height: 12px;
                margin-left: 5px;
              }
            }
            div:nth-child(2) {
              width: 468 * 0.4px;
              height: 14px;
              display: flex;
              align-items: flex-end;
              color: #333;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: right;
              justify-content: flex-end;
              span:nth-child(1) {
                display: block;
                font-size: 14px;
                height: 14px;
                line-height: 14px;
              }
              span:nth-child(2) {
                display: block;
                line-height: 14px;
                height: 14px;
                font-size: 18px;
                font-family: twCenMt;
                margin-left: 7px;
              }
            }
          }
          .full-address {
            width: 100%;
            line-height: 16px;
            max-height: 16 * 2px;
            color: #333;
            font-size: 12px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-bottom: 9px;
          }
          .other-info {
            color: #333;
            font-size: 12px;
            line-height: 12px;
            span:nth-child(1) {
              margin-right: 63px;
            }
          }
        }
      }
      .express {
        width: 936-468px;
        .block-title-line {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          div:nth-child(1) {
            width: 2px;
            height: 16px;
            background: rgba(242, 155, 135, 1);
            margin-right: 17px;
          }
          div:nth-child(2) {
            line-height: 16px;
            height: 16px;
            font-size: 16px;
            color: rgba(242, 155, 135, 1);
          }
        }
        .express-title-info {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #333;
          font-size: 14px;
          line-height: 14px;
          div:nth-child(3) {
            color: #f29b87;
            cursor: pointer;
          }
        }
        .express-time{
          margin-top:20px;
        }
      }
    }
    // .double{
      
    // }
    .goods-info {
     
      .goods-info-title {
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        background: rgba(254, 230, 226, 1);
        color: #333;
        font-size: 14px;
        display: flex;
        padding-left: 19px;
        .t1 {
          width: 520px;
        }
        .t2 {
          width: 130px;
          text-align: center;
          margin-right: 30px;
        }
        .t3 {
          width: 130px;
          text-align: center;
          margin-right: 30px;
        }
        .t4 {
          width: 130px;
          text-align: center;
          margin-right: 30px;
        }
      }
      .single{
        .goods-details {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          padding: 20px 0 20px 19px;
          border-top: 1px solid rgba(230, 230, 230, 1);
          align-items: center;
          .t1 {
            width: 510px;
            display: flex;
            align-items: center;
            .good-img {
              width: 70px;
              height: 70px;
              border: 1px solid rgba(230, 230, 230, 1);
              img {
                width: 68px;
                height: 68px;
                display: block;
              }
            }
            .good-desc {
              height: 70px;
              color: #333;
              overflow: hidden;
              margin: 0 30px 0 20px;
              .good-name {
                font-size: 16px;
                line-height: 16px;
                height: 16px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 9px;
              }
              .good-sku {
                font-size: 12px;
                line-height: 12px;
                height: 12px;
                margin-bottom: 18px;
                color: #aaa;
              }
              .details {
                font-size: 12px;
                line-height: 12px;
                height: 12px;
                width: 100%;
                color: #aaa;
                // overflow: hidden;
                text-overflow: ellipsis;
                // white-space: nowrap;
                span {
                  margin-right: 10px;
                }
              }
            }
          }
          .t2 {
            width: 130px;
            text-align: center;
            font-size: 16px;
            color: #333;
            margin-right: 30px;
          }
          .t3 {
            width: 130px;
            font-size: 20px;
            font-family: twCenMt;
            color: #f29b87;
            text-align: center;
            margin-right: 30px;
          }
          .t3.old-price{
            font-size: 14px;
            color: #b2b2b2;
            text-decoration: line-through;
          }
          .t4 {
            width: 130px;
            font-size: 20px;
            font-family: twCenMt;
            color: #f29b87;
            text-align: center;
            margin-right: 30px;
          }
        }
        .goods-details:nth-child(1) {
          border-top: 0;
        }
      }
      .double{
        position: relative;
        .t3{
          position: absolute;
          right: 164px;
          top:43%;
          color: #333;
          font-family: twCenMt;
          color: #f29b87;
          text-align: center;
          margin-right: 30px;
          font-size: 20px;
        }
        .t3.old-price{
          font-size: 14px;
          color: #b2b2b2;
          text-decoration: line-through;
        }
        .t4 {
          position: absolute;
          right: -6px;
          top:43%;
          width: 130px;
          font-size: 20px;
          font-family: twCenMt;
          color: #f29b87;
          text-align: center;
          margin-right: 30px;
        }
        .goods-details:nth-child(2) {
          border-top: 0;
          // .good-img{
          //   display: none;
          // }
        }
        .good-name {
          // margin-bottom: 15px!important;
          position: absolute;
          top: 10px;
          left: 112px;
          color: #333;
        }
        .dec{
          // margin-left: 250px;
          padding: 0px 10px 0px 22px;
        }
        .dec:last-child{
          .good-name{
            display: none;
          }
          .good-sku {
            display: none;
          }
        }
        // .good-desc{
        //   height: 100%!important;
        // }
        .good-sku {
          margin-bottom: 10px!important;
          margin-top: 5px;
        }
        .goods-details {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          padding: 30px 0 20px 19px;
          border-top: 1px solid rgba(230, 230, 230, 1);
          align-items: center;
          position: relative;
          .t1 {
            width: 936-250.5-163.5-20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .good-img {
              width: 70px;
              height: 70px;
              border: 1px solid rgba(230, 230, 230, 1);
              img {
                width: 68px;
                height: 68px;
                display: block;
              }
            }
            .good-desc {
              width: 936-250.5-163.5-20-70-20+18px;
              height: 70px;
              color: #333;
              // overflow: hidden;
              .good-name {
                font-size: 16px;
                line-height: 16px;
                height: 16px;
                width: 100%;
                // overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                // margin-bottom: 9px;
                
              }
              .good-sku {
                font-size: 12px;
                line-height: 12px;
                height: 12px;
                margin-bottom: 18px;
                color:#aaa;
              }
              .details {
                font-size: 12px;
                line-height: 20px;
                height: 20px;
                width: 100%;
                // overflow: hidden;
                text-overflow: ellipsis;
                // white-space: nowrap;
                color:#aaa;
                span {
                  margin-right: 10px;
                }
              }
            }
          }
          .t2 {
            text-align: center;
            width: 51+ (113/2)+56-23px;
            color: #333;
            font-size: 16px;
          }
          .t3 {
            text-align: center;
            width: 56+ (113/2)+138px;
            color: #333;
            font-family: twCenMt;
            font-size: 20px;
          }
          
        }
      }
      .customization{
        .goods-details {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          padding: 20px 0 20px 19px;
          border-top: 1px solid rgba(230, 230, 230, 1);
          align-items: center;
          .t1 {
            width: 510px;
            display: flex;
            align-items: center;
            .good-img {
              width: 70px;
              height: 70px;
              border: 1px solid rgba(230, 230, 230, 1);
              img {
                width: 68px;
                height: 68px;
                display: block;
              }
            }
            .good-desc {
              height: 70px;
              color: #333;
              overflow: hidden;
              margin: 0 30px 0 20px;
              .good-name {
                font-size: 16px;
                line-height: 16px;
                height: 16px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-bottom: 9px;
              }
              .good-sku {
                font-size: 12px;
                line-height: 12px;
                height: 12px;
                margin-bottom: 18px;
              }
              .details {
                font-size: 12px;
                line-height: 12px;
                height: 12px;
                width: 100%;
                // overflow: hidden;
                text-overflow: ellipsis;
                // white-space: nowrap;
                span {
                  margin-right: 10px;
                }
              }
            }
          }
          .t2 {
            width: 130px;
            text-align: center;
            font-size: 16px;
            color: #333;
            margin-right: 30px;
          }
          .t3 {
            width: 130px;
            font-size: 20px;
            font-family: twCenMt;
            color: #f29b87;
            text-align: center;
            margin-right: 30px;
          }
          .t3.old-price{
            font-size: 14px;
            color: #b2b2b2;
            text-decoration: line-through;
          }
          .t4 {
            width: 130px;
            font-size: 20px;
            font-family: twCenMt;
            color: #f29b87;
            text-align: center;
            margin-right: 30px;
          }
        }
        .goods-details:nth-child(2) {
          border-top: 0;
        }
      }
    }
    .goods-bot-bar {
      width: 100%;
      height: 40px;
      background: rgba(248, 248, 248, 1);
      padding: 0 20px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #333;
      margin-bottom: 36px;
      box-sizing: border-box;
      span {
        color: #f29b87;
      }
    }
  }
  .bot-info {
    width: 936px;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    margin-bottom: 30px;
    .right-info {
      width: 470px;
      background: rgba(255, 255, 255, 1);
      .new-address-title {
        height: 20px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 17px;
        .na-line {
          width: 4px;
          height: 20px;
          background: #000;
          border-radius: 2px;
          margin-right: 20px;
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
          height: 34px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
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
            font-size: 16px;
            color: #333;
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
            font-size: 14px;
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
          .big-label {
            font-size: 16px;
            font-weight: bold;
          }
          .big-ff {
            font-size: 20px;
            font-weight: bold;
          }
        }
        .info-line:nth-child(2n) {
          background: rgba(249, 249, 249, 1);
        }
      }
    }
    .left-info {
      width: 390px;
      background: rgba(255, 255, 255, 1);
      .orderNo{
        font-size: 16px;
      }
      .new-address-title {
        height: 20px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 17px;
        .na-line {
          width: 4px;
          height: 20px;
          background: #000;
          border-radius: 2px;
          margin-right: 20px;
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
          height: 34px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
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
            font-size: 16px;
            color: #333;
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
            font-size: 14px;
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
          .big-label {
            font-size: 16px;
            font-weight: bold;
          }
          .big-ff {
            font-size: 20px;
            font-weight: bold;
          }
        }
        .info-line:nth-child(2n) {
          background: rgba(249, 249, 249, 1);
        }
      }
    }
  }
}

.fontSize{
  font-size: 12px;
  color: #777;
}
</style>
