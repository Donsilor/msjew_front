<template>
  <div class="order-detail">
    <Header :title="lang.myOrder" />
    <div class="content">
      <div class="top">
        <!--        <OrderHeader :list="statusSteps" :stepindex="step" />-->
        <div class="status-title">
          {{ statusText(info.orderStatus) }}
        </div>
        <div class="service">
          <ul>
            <li>{{ lang.orderStatus }}：{{ statusText(info.orderStatus) }}</li>
            <li>{{ lang.orderNumber }}：{{ info.orderNo }}</li>
            <li>{{ lang.orderTime }}：{{ info.orderTime }}</li>
            <template v-if="info.orderStatus > 1 && info.orderStatus !== 10">
              <li>{{ lang.payType }}：{{ info.payChannelText }}</li>
              <li>{{ lang.payTime }}：{{ info.payTime }}</li>
            </template>
          </ul>
        </div>
      </div>
      <div class="details">
        <div
          v-for="(detail, n) in details"
          :key="n"
          class="products-item"
          @click="toDetail(detail)"
        >
          <img :src="detail.image" />
          <div v-if="detail.groupType !== 0" class="group-type">
            {{ detail.groupTypeText }}
          </div>

          <!--              单品-->
          <div v-if="detail.groupType === 0" class="right">
            <h4>
              {{ detail.goodsName }}
            </h4>
            <span>x 1</span>
            <p>SKU：{{ detail.data[0].goodsCode }}</p>
            <p>{{ detail.data[0].detailSpecs }}</p>
            <b>{{ info.coinCode }} {{ detail.data[0].goodsPrice }}</b>
          </div>

          <!--              对戒-->
          <div v-if="detail.groupType === 1" class="right">
            <h4>
              {{ detail.goodsName }}
            </h4>
            <span>x 1</span>
            <p>SKU：{{ detail.data[0].goodsCode }}</p>
            <p>{{ detail.data[0].detailSpecs }}</p>
            <b>{{ info.coinCode }} {{ detail.data[0].goodsPrice }}</b>
            <p>SKU：{{ detail.data[1] && detail.data[1].goodsCode }}</p>
            <p>{{ detail.data[1] && detail.data[1].detailSpecs }}</p>
            <b
              >{{ info.coinCode }}
              {{ detail.data[1] && detail.data[1].goodsPrice }}</b
            >
          </div>

          <!--              定制-->
          <div v-if="detail.groupType === 2" class="right">
            <h4 class="order-ellipsis">
              {{ detail.data[0].goodsName }}
            </h4>
            <span>x 1</span>
            <p>SKU：{{ detail.data[0].goodsCode }}</p>
            <p>{{ detail.data[0].detailSpecs }}</p>
            <b>{{ info.coinCode }} {{ detail.data[0].goodsPrice }}</b>
            <h4 class="order-ellipsis">
              {{ detail.data[1].goodsName }}
            </h4>
            <p>SKU：{{ detail.data[1] && detail.data[1].goodsCode }}</p>
            <p>{{ detail.data[1] && detail.data[1].detailSpecs }}</p>
            <b
              >{{ info.coinCode }}
              {{ detail.data[1] && detail.data[1].goodsPrice }}</b
            >
          </div>
        </div>

        <!--        已发货商品-->
        <div v-for="(bundle, n) in outDetails" :key="n" class="bundle-item">
          <div class="bundle-info">
            <div class="bundle-status">{{ lang.hadSend }}</div>
            <div class="bundle-company">
              <span>{{ lang.logistics }}：{{ bundle.companyName }}</span>
              <span>{{ lang.checkLogistics }} ></span>
            </div>
            <div class="bundle-code">
              {{ lang.logisticsNumber }}：{{ bundle.expressNo }}
            </div>
            <div class="bundle-time">
              {{ lang.sendTime }}：{{ bundle.createTime }}
            </div>
          </div>
          <div class="bundle-details">
            <div
              v-for="(detail, m) in bundle.outOrderDetails"
              :key="m"
              class="detail-item"
              @click="toDetail(detail)"
            >
              <img :src="detail.image" />
              <div v-if="detail.groupType !== 0" class="group-type">
                {{ detail.groupTypeText }}
              </div>

              <!--              单品-->
              <div v-if="detail.groupType === 0" class="right">
                <h4>
                  {{ detail.goodsName }}
                </h4>
                <span>x 1</span>
                <p>SKU：{{ detail.data[0].goodsCode }}</p>
                <p>{{ detail.data[0].detailSpecs }}</p>
                <b>{{ info.coinCode }} {{ detail.data[0].goodsPrice }}</b>
              </div>

              <!--              对戒-->
              <div v-if="detail.groupType === 1" class="right">
                <h4>
                  {{ detail.goodsName }}
                </h4>
                <span>x 1</span>
                <p>SKU：{{ detail.data[0].goodsCode }}</p>
                <p>{{ detail.data[0].detailSpecs }}</p>
                <b>{{ info.coinCode }} {{ detail.data[0].goodsPrice }}</b>
                <p>SKU：{{ detail.data[1] && detail.data[1].goodsCode }}</p>
                <p>{{ detail.data[1] && detail.data[1].detailSpecs }}</p>
                <b
                  >{{ info.coinCode }}
                  {{ detail.data[1] && detail.data[1].goodsPrice }}</b
                >
              </div>

              <!--              定制-->
              <div v-if="detail.groupType === 2" class="right">
                <h4 class="order-ellipsis">
                  {{ detail.data[0].goodsName }}
                </h4>
                <span>x 1</span>
                <p>SKU：{{ detail.data[0].goodsCode }}</p>
                <p>{{ detail.data[0].detailSpecs }}</p>
                <b>{{ info.coinCode }} {{ detail.data[0].goodsPrice }}</b>
                <h4 class="order-ellipsis">
                  {{ detail.data[1].goodsName }}
                </h4>
                <p>SKU：{{ detail.data[1] && detail.data[1].goodsCode }}</p>
                <p>{{ detail.data[1] && detail.data[1].detailSpecs }}</p>
                <b
                  >{{ info.coinCode }}
                  {{ detail.data[1] && detail.data[1].goodsPrice }}</b
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="more">
          <div class="address">
            <i class="icon iconfont icon_shoujianxinxi"></i>
            <h6>
              {{ info.address && info.address.firstName }}
              {{ info.address && info.address.lastName }}
            </h6>
            <h6>{{ info.address && info.address.userTel }}</h6>
            <p>
              {{ info.address && info.address.countryName }}
              {{ info.address && info.address.provinceName }}
              {{ info.address && info.address.cityName }}
              {{ info.address && info.address.address }}
            </p>
            <p>{{ info.address && info.address.zipCode }}</p>
            <p>{{ info.address && info.address.userMail }}</p>
          </div>
          <div class="express">
            <i class="icon iconfont icon_songhuozhengce"></i>
            <h6 v-if="info.allSend === 1">{{ lang.sendTogether }}</h6>
            <p>
              {{ lang.shippingTime }}
              <nuxt-link :to="{ name: 'help-pages-deliveryPolicy' }">{{
                lang.checkSendPolicy
              }}</nuxt-link>
            </p>
            <p>
              {{ lang.voucherEmail }}：{{ info.afterMail && info.afterMail }}
            </p>
            <p>{{ lang.mark }}：{{ info.userRemark }}</p>
          </div>
        </div>
        <ul class="price">
          <li>
            <span>{{ lang.productsCount }}： </span
            ><span>{{ info.coinCode }} {{ productsPrice }} </span>
          </li>
          <li v-if="info.preferFee" class="active">
            <span>{{ lang.offer }}： </span
            ><span>-{{ info.coinCode }} {{ info.preferFee }} </span>
          </li>
          <li>
            <span>{{ lang.freight }}： </span
            ><span>+{{ info.coinCode }} {{ info.logisticsFee }} </span>
          </li>
          <li>
            <span>{{ lang.taxes }}： </span
            ><span>+{{ info.coinCode }} {{ info.taxFee }} </span>
          </li>
          <li>
            <span>{{ lang.insurance }}： </span
            ><span>+{{ info.coinCode }} {{ info.safeFee }} </span>
          </li>
          <li v-if="info.transPreferFee" class="active">
            <span>{{ lang.transPreferFee }}： </span
            ><span>-{{ info.coinCode }} {{ info.transPreferFee }} </span>
          </li>
          <div class="all">
            <span>{{ lang.orderCount }}</span
            ><span
              ><em>{{ info.coinCode }} </em>{{ info.orderAmount }}
            </span>
          </div>
        </ul>
        <div class="btn">
          <div
            v-if="[1].indexOf(info.orderStatus) > -1 && info.payChannel === 1"
            class="btn-block"
            @click.stop="paytips = !paytips"
          >
            {{ lang.paytips }}
          </div>
          <div
            v-if="[1].indexOf(info.orderStatus) > -1 && info.payChannel !== 1"
            class="btn-block"
            @click="goPay(info)"
          >
            {{ lang.toPay }}
          </div>
          <div
            v-if="[1].indexOf(info.orderStatus) > -1"
            class="btn-white"
            @click="cancelOrder"
          >
            {{ lang.cancelOrder }}
          </div>
        </div>
      </div>
    </div>
    <PayTips v-if="paytips" @close="paytips = !paytips" />
  </div>
</template>

<script>
import Moment from 'moment'
import Header from '@/components/personal/header.vue'
// import OrderHeader from '@/components/personal/orderheader.vue'
import PayTips from '@/components/cart/paytips.vue'

export default {
  name: 'OrderDetail',
  layout: 'no-footer-bar',
  components: {
    Header,
    // OrderHeader,
    PayTips
  },
  data() {
    return {
      lang: this.LANGUAGE.personal.orderDetail,
      info: {},
      paytips: false
    }
  },
  computed: {
    statusSteps() {
      const status = this.info.orderStatus
      const result = [
        { step: '1', title: this.lang.submit },
        { step: '2', title: this.lang.waitingPay },
        { step: '3', title: this.lang.waitingSend },
        { step: '4', title: this.lang.waitingReceive },
        { step: '5', title: this.lang.hadFinish }
      ]

      if (status >= 2) {
        result[1].title = this.lang.hadPay
      }
      if (status >= 3) {
        result[2].title = this.lang.hadSend
      }
      if (status >= 4) {
        result[3].title = this.lang.hadReceive
        result[4].title = this.lang.hadFinish
      }

      return result
    },
    step() {
      const status = this.info.orderStatus
      let result = 1
      // 1-未付款,2-已付款,3-已发货,4-已完成,5-未评论,6-已评论,7-退货申请,8-退货中,9-已退货,10-取消交易
      // if (['', null, 0, 1].indexOf(status) > -1) {
      //   result = 0
      // } else if ([2].indexOf(status) > -1) {
      //   result = 1
      // } else if ([3].indexOf(status) > -1) {
      //   result = 2
      // } else if ([4].indexOf(status) > -1) {
      //   result = 3
      // } else if ([5, 6, 7, 8, 9].indexOf(status) > -1) {
      //   result = 4
      // }

      if (status >= 2) {
        result = 2
      }
      if (status >= 3) {
        result = 3
      }
      if (status >= 4) {
        result = 4
      }
      return result
    },
    productsPrice() {
      return this.info.productAmount
      // let result = 0
      // const details = this.details || []
      // const outDetails = this.outDetails || []
      // details.forEach(item => {
      //   result += item.goodsPrice || 0
      // })
      // outDetails.forEach(item => {
      //   const orderDetails = item.outOrderDetails || []
      //   orderDetails.forEach(group => {
      //     result += group.goodsPrice || 0
      //   })
      // })
      // return result.toFixed(2)
    },
    details() {
      const data = JSON.parse(
        JSON.stringify(this.info.details ? this.info.details : [])
      )
      const result = this.dealDetailsData(data)
      return result
    },
    outDetails() {
      let data = JSON.parse(
        JSON.stringify(this.info.outDetails ? this.info.outDetails : [])
      )
      data = data.map(item => {
        if (item.outOrderDetails && item.outOrderDetails instanceof Array) {
          item.outOrderDetails = this.dealDetailsData(item.outOrderDetails)
        }
        item.createTime = Moment(item.createTime).format('YYYY/MM/DD HH:mm:ss')
        item.payTime = Moment(item.payTime).format('YYYY/MM/DD HH:mm:ss')
        return item
      })
      return data
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.getInfo()
    })
  },
  methods: {
    statusText(status) {
      const map = {
        1: this.lang.hadNotPay,
        2: this.lang.hadPay,
        3: this.lang.hadSend,
        4: this.lang.hadFinish,
        5: this.lang.hadNotComment,
        6: this.lang.hadComment,
        7: this.lang.returnApplication,
        8: this.lang.returning,
        9: this.lang.hadReturn,
        10: this.lang.cancelTransaction
      }
      return map[status]
    },
    payChannelText(payChannel) {
      const map = {
        1: '電匯',
        2: 'paypal',
        3: '微信',
        4: '支付宝',
        5: 'visa/Mastercard',
        6: '銀聯',
        7: 'paydollar'
      }
      return map[payChannel]
    },
    dealDetailsData(details = []) {
      details = JSON.parse(JSON.stringify(details || []))

      // 以joinCartTime为下标，组合对戒和定制
      const groups = {}
      const result = []

      details.map(good => {
        if (groups.hasOwnProperty(good.joinCartTime)) {
          // 将数据处理为直接可用的数据
          good.detailSpecs = JSON.parse(good.detailSpecs || '[]')
            .map(item => {
              return item.value
            })
            .join(' / ')
          groups[good.joinCartTime].goodsPrice += good.goodsPrice
          groups[good.joinCartTime].data.push(good)
        } else {
          const newGroup = {
            id: `${good.orderId}-${good.joinCartTime}`,
            image: good.goodsImages,
            groupType: good.groupType,
            groupTypeText: this.lang.singleProduct,
            goodsName: good.goodsName,
            goodsPrice: good.goodsPrice
          }

          if ([null, 0, '0'].indexOf(good.groupType) > -1) {
            // 单品
            newGroup.groupType = 0
            newGroup.groupTypeText = this.lang.singleProduct
          }
          if (good.groupType === 1) {
            // 對戒
            newGroup.groupType = 1
            newGroup.groupTypeText = this.lang.pairRing
            newGroup.goodsName = good.ringName || this.lang.defaultPairRing
            newGroup.image = good.ringImg || '/marriage-ring/default.png'
          }
          if (good.groupType === 2) {
            // 定制
            newGroup.groupType = 2
            newGroup.groupTypeText = this.lang.diy
          }

          // 将数据处理为直接可用的数据
          good.detailSpecs = JSON.parse(good.detailSpecs || '[]')
            .map(item => {
              return item.value
            })
            .join(' / ')

          newGroup.data = [good]
          newGroup.image = this.imageStrToArray(newGroup.image)[0]

          groups[good.joinCartTime] = newGroup
        }
      })

      let keys = Object.keys(groups)
      keys = keys.sort((a, b) => {
        return b - a
      })
      keys.forEach(item => {
        result.push(groups[item])
      })

      // 将定制的商品进行排序，钻石放在后面
      result.map(item => {
        console.log('item====>', item)
        if (item.groupType === 2) {
          // 定制
          const diamond = []
          const pedestal = []
          item.data.forEach(detail => {
            if (detail.categoryId === 1) {
              diamond.push(detail)
            } else {
              pedestal.push(detail)
            }
          })
          item.data = pedestal.concat(diamond)
          item.goodsName = pedestal[0].goodsName
          item.image = this.imageStrToArray(pedestal[0].goodsImages)[0]
        }
        return item
      })

      return result
    },
    getInfo() {
      this.$axios({
        method: `get`,
        url: `/wap/myOrder/getOrderDetails`,
        params: {
          orderId: this.$route.query.orderId
        }
      })
        .then(data => {
          data.orderTime = Moment(data.orderTime).format('YYYY/MM/DD HH:mm:ss')
          data.payChannelText = data.payChannel
            ? this.payChannelText(data.payChannel)
            : data.orderStatus > 1
            ? this.lang.cableTransfer
            : ''
          data.payTime = data.payTime
            ? Moment(data.payTime).format('YYYY/MM/DD HH:mm:ss')
            : ''
          this.info = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 去支付
    goPay(val) {
      const res = {
        coinType: val.coinCode, // 支付币种 ,
        orderAmount: val.orderAmount, // 支付金额 ,
        orderId: val.id // 订单ID
      }
      this.$router.push({
        name: 'cart-pay',
        query: {
          info: JSON.stringify(res)
        }
      })
      console.log(val)
    },
    // 取消订单
    cancelOrder() {
      const _this = this
      _this.$ConfirmBox({
        // title: _this.lang.caveat,
        message: _this.lang.confirmCancellationOrder,
        buttons: [
          {
            text: _this.lang.cancel,
            callback: () => {
              console.log('点击了取消')
            }
          },
          {
            text: _this.lang.clear,
            callback: () => {
              _this.$store
                .dispatch('cancelOrder', _this.info.id)
                .then(data => {
                  _this.$toast(_this.lang.canceled)
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000)
                })
                .catch(err => {
                  _this.$toast(`${err.message}`)
                })
            }
          }
        ]
      })
    },
    switchName(i) {
      const num = parseInt(i)
      switch (num) {
        case 1:
          return `diamond`
        case 2:
          return `ring`
        case 4:
          return `necklace`
        case 8:
          return `bracelet`
      }
    },
    toDetail(info) {
      // console.log('info====>', info)

      let routerName = ''
      let routerQuery = {}

      if ([null, 0, ''].indexOf(info.groupType) > -1) {
        console.log('单品')

        const goodId = info.data[0].goodsId
        const ringRouter = configAttrId => {
          // console.log('configAttrId====>', configAttrId)
          if (configAttrId === 60) {
            // 訂婚戒指
            routerName = 'engagement-engagement-rings'
            routerQuery = {
              goodId: goodId
            }
            return
          }
          if (configAttrId === 461 || configAttrId === 462) {
            // 男女戒
            routerName = 'marriage-ring-single-ring-detail'
            routerQuery = {
              goodId: goodId
            }
            return
          }
          if (configAttrId === 59) {
            // 結婚戒指
            routerName = 'marriage-ring-single-ring-detail'
            routerQuery = {
              goodId: goodId
            }
            return
          }
          if (configAttrId === 61) {
            // 裝飾戒指
            routerName = 'marriage-ring-single-ring-detail'
            routerQuery = {
              goodId: goodId
            }
            return
          }
          console.log('都不是-')
        }

        switch (info.data[0].categoryId) {
          case 1:
            // 钻石
            routerName = 'diamond-diamonds'
            routerQuery = {
              goodId: goodId
            }
            break
          case 2:
            // 戒指
            ringRouter(info.data[0].baseConfig[0].configAttrId)
            // ringRouter(info.data[0].configAttrId)
            break
          case 3:
            // 珠宝饰品
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 4:
            // 项链
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 5:
            // 吊坠
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 6:
            // 耳钉
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 7:
            // 耳环
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 8:
            // 手链
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
          case 9:
            // 手镯
            routerName = 'accessories-accessories'
            routerQuery = {
              goodId: goodId
            }
            break
        }
      }
      if ([1].indexOf(info.groupType) > -1) {
        console.log('对戒')
        console.log('info====>', info)
        routerName = 'marriage-ring-pair-ring-detail'
        routerQuery = {
          ringId: info.data[0].groupId
        }
      }
      if ([2].indexOf(info.groupType) > -1) {
        console.log('定制')
        const obj = {
          steps: [
            {
              goodsId: info.data[0].goodsId,
              goodsDetailsId: null,
              ct: info.data[0].categoryId,
              cartId: ``,
              page: `detail`
            },
            {
              goodsId: null,
              goodsDetailsId: null,
              ct: null,
              cartId: ``,
              page: `list`
            }
          ]
        }

        const typeName = this.switchName(info.data[0].categoryId)
        routerName = `custom-made-${typeName}-made-${typeName}-detail`
        routerQuery = {
          melo: this.$helpers.base64Encode(JSON.stringify(obj)),
          step: 1,
          goodId: info.data[0].goodsId
        }
      }

      this.$router.push({
        name: routerName,
        query: routerQuery
      })
    }
  }
}
</script>

<style scoped lang="less">
.order-detail {
  .content {
    background: rgba(244, 244, 244, 1);
    .top {
      padding: 10px 0 10px;
      background-color: #ffffff;
      .status-title {
        width: 345px;
        margin: auto;
        font-size: 20px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        text-align: left;
      }
      .service {
        width: 345px;
        margin: 14px auto 0;
        padding: 20px 14px;
        background: rgba(248, 244, 241, 1);
        border-radius: 5px;
        font-size: 12px;
        line-height: 22px;
        font-weight: 400;
        text-align: left;
        color: rgba(148, 116, 101, 1);
      }
    }
    .details {
      padding: 10px;
      box-sizing: border-box;
      .products-item {
        position: relative;
        padding: 24px 16px 14px 16px;
        margin-bottom: 10px;
        box-sizing: border-box;
        /*border-bottom: 1px solid #f5f5f5;*/
        border-radius: 5px;
        background-color: #ffffff;

        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }

        img {
          float: left;
          width: 75px;
          height: 75px;
        }
        .group-type {
          position: absolute;
          top: 100px;
          left: 53.5px;
          /*width: 36px;*/
          height: 16px;
          padding: 0 4px;
          text-align: center;
          background: rgba(245, 240, 236, 1);
          border: 1px solid rgba(215, 202, 196, 1); /*no*/
          border-radius: 2px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(148, 116, 101, 1);
          transform: translate(-50%, 0);
        }
        .right {
          width: 230px;
          margin-left: 90px;
          text-align: left;
          h4 {
            position: relative;
            display: inline-block;
            width: 180px;
            max-height: 36px;
            font-size: 14px;
            line-height: 18px;
            font-family: PingFangHK-Regular;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          span {
            float: right;
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
          p {
            font-size: 13px;
            line-height: 24px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
          b {
            margin-bottom: 10px;
            font-size: 17px;
            line-height: 20px;
            font-weight: 400;
            color: rgba(243, 163, 145, 1);
            font-family: twCenMt;
            display: block;
          }
          .btn-type {
            width: 36px;
            height: 16px;
            margin-left: -74px;
            text-align: center;
            background: rgba(245, 240, 236, 1);
            border: 1px solid rgba(215, 202, 196, 1); /*no*/
            border-radius: 2px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(148, 116, 101, 1);
          }
        }
      }
      .bundle-item {
        position: relative;
        padding: 24px 16px;
        margin-bottom: 10px;
        box-sizing: border-box;
        /*border-bottom: 1px solid #f5f5f5;*/
        border-radius: 5px;
        background-color: #ffffff;

        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
        .bundle-info {
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(221, 221, 221, 1);
          .bundle-status {
            margin-bottom: 12px;
            height: 14px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            text-align: left;
          }
          .bundle-company,
          .bundle-code,
          .bundle-time {
            margin-bottom: 7px;
            height: 12px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            text-align: left;

            .span:nth-of-type(2) {
              color: rgba(148, 116, 101, 1);
            }
          }
        }
        .bundle-details {
          padding-top: 24px;
          .detail-item {
            padding-bottom: 24px;
            position: relative;

            &:nth-last-of-type(1) {
              padding-bottom: 0;
            }
            img {
              float: left;
              width: 75px;
              height: 75px;
            }
            .group-type {
              position: absolute;
              top: 100px;
              left: 20px;
              width: 36px;
              height: 16px;
              text-align: center;
              background: rgba(245, 240, 236, 1);
              border: 1px solid rgba(215, 202, 196, 1);
              border-radius: 2px;
              font-size: 12px;
              font-weight: 400;
              color: rgba(148, 116, 101, 1);
            }
            .right {
              width: 230px;
              margin-left: 90px;
              text-align: left;
              h4 {
                position: relative;
                display: inline-block;
                width: 180px;
                max-height: 36px;
                font-size: 14px;
                line-height: 18px;
                font-family: PingFangHK-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              span {
                float: right;
                font-size: 14px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }
              p {
                font-size: 13px;
                line-height: 24px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              b {
                margin-bottom: 10px;
                font-size: 17px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(243, 163, 145, 1);
                font-family: twCenMt;
                display: block;
              }
              .btn-type {
                width: 36px;
                height: 16px;
                margin-left: -74px;
                text-align: center;
                background: rgba(245, 240, 236, 1);
                border: 1px solid rgba(215, 202, 196, 1);
                border-radius: 2px;
                font-size: 12px;
                font-weight: 400;
                color: rgba(148, 116, 101, 1);
              }
            }
          }
        }
      }
    }
    .footer {
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      display: inline-block;
      background: #f2f2f2;
      .more {
        width: 100%;
        padding: 20px 26px 40px;
        background: #ffffff;
        border-radius: 8px;
        .express,
        .address {
          text-align: left;
          .icon {
            font-size: 26px;
            color: #333333;
            float: left;
          }
          h6 {
            color: #333333;
            margin: 0 0 8px 54px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          p {
            color: #333333;
            margin: 0 0 6px 54px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 16px;
          }
        }
        .express {
          margin-top: 20px;
          p {
            a {
              color: #947465;
            }
          }
        }
      }
      .price {
        display: inline-block;
        width: 100%;
        margin: 10px auto;
        padding: 20px 26px 30px;
        background: #ffffff;
        border-radius: 8px;
        li {
          width: 100%;
          height: 30px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          span:nth-child(1) {
            float: left;
          }
          span:nth-child(2) {
            float: right;
          }
        }
        li:nth-child(1) {
          font-size: 14px;
        }
        .active {
          span:nth-child(2) {
            color: #947465;
          }
        }
        .all {
          border-top: 1px solid #dddddd;
          padding-top: 15px;
          span:nth-child(1) {
            float: left;
            font-size: 12px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
          span:nth-child(2) {
            float: right;
            font-size: 20px;
            font-family: twCenMt;
            color: rgba(242, 155, 135, 1);
            em {
              font-size: 12px;
            }
          }
        }
      }
      .btn {
        width: 100%;
        margin-bottom: 50px;
      }
      .btn-white {
        width: 100%;
        height: 40px;
        margin: 20px auto 0px;
        background: rgba(250, 250, 250, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        border-radius: 8px;
        font-size: 14px;
        line-height: 40px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .btn-block {
        width: 345px;
        height: 40px;
        margin: 20px auto 0px;
        background: rgba(51, 51, 51, 1);
        border-radius: 8px;
        font-size: 14px;
        line-height: 40px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
