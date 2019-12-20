<template>
  <div class="orderlist">
    <ul v-if="!paytips" class="content">
      <li v-for="(order, index) in showOrderList" :key="index" class="item">
        <div class="top">
          <span>{{ lang.orderNumber }}：</span>
          <span class="order-status">{{ statusText(order.orderStatus) }}</span>
        </div>
        <div class="top">
          <span>{{ order.orderNo }}</span>
        </div>
        <div class="mod" @click="toDetail(order.id)">
          <ul>
            <li v-for="(detail, n) in order.details" :key="n">
              <img :src="detail.image" />
              <div v-if="detail.groupType !== 0" class="group-type">
                {{ detail.groupTypeText }}
              </div>

              <!--              单品-->
              <div v-if="detail.groupType === 0" class="right">
                <h4 class="ow-h2">
                  {{ detail.goodsName }}
                </h4>
                <span>x 1</span>
                <p>SKU：{{ detail.data[0].goodsCode }}</p>
                <p>{{ detail.data[0].detailSpecs }}</p>
                <b>{{ order.coinCode }} {{ order.productAmount }}</b>
              </div>

              <!--              对戒-->
              <div v-if="detail.groupType === 1" class="right">
                <h4 class="ow-h2">
                  {{ detail.goodsName }}
                </h4>
                <span>x 1</span>
                <p>SKU：{{ detail.data[0].goodsCode }}</p>
                <p>{{ detail.data[0].detailSpecs }}</p>
                <b class="display-block margin-bottom-20"
                  >{{ order.coinCode }} {{ detail.data[0].goodsPrice }}</b
                >
                <p>SKU：{{ detail.data[1] && detail.data[1].goodsCode }}</p>
                <p>{{ detail.data[1] && detail.data[1].detailSpecs }}</p>
                <b
                  >{{ order.coinCode }}
                  {{ detail.data[1] && detail.data[1].goodsPrice }}</b
                >
              </div>

              <!--              定制-->
              <div v-if="detail.groupType === 2" class="right">
                <h4 class="order-ellipsis ow-h2">
                  {{ detail.data[0] && detail.data[0].goodsName }}
                </h4>
                <span>x 1</span>
                <p>SKU：{{ detail.data[0].goodsCode }}</p>
                <p>{{ detail.data[0].detailSpecs }}</p>
                <b class="display-block margin-bottom-20"
                  >{{ order.coinCode }} {{ detail.data[0].goodsPrice }}</b
                >
                <h4 class="order-ellipsis ow-h2">
                  {{ detail.data[1] && detail.data[1].goodsName }}
                </h4>
                <p>SKU：{{ detail.data[1] && detail.data[1].goodsCode }}</p>
                <p>{{ detail.data[1] && detail.data[1].detailSpecs }}</p>
                <b
                  >{{ order.coinCode }}
                  {{ detail.data[1] && detail.data[1].goodsPrice }}</b
                >
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <div class="order">
            <span class="title">{{ lang.orderCount }}：</span>
            <div class="order-amount">
              <span class="coin-type">{{ order.coinCode }}</span>
              <span class="order-price">{{ order.orderAmount }}</span>
            </div>
          </div>
          <div class="btn">
            <span
              v-if="[1].indexOf(order.orderStatus) > -1"
              class="btn2"
              @click="cancelOrder(order.id)"
              >{{ lang.cancelOrder }}</span
            >
            <span
              v-if="
                [1].indexOf(order.orderStatus) > -1 && order.payChannel === 1
              "
              class="btn1"
              @click.stop="paytips = !paytips"
              >{{ lang.paytips }}</span
            >
            <span
              v-if="
                [1].indexOf(order.orderStatus) > -1 && order.payChannel !== 1
              "
              class="btn1"
              @click.stop="goPay(order)"
              >{{ lang.toPay }}</span
            >
            <span
              v-if="[3].indexOf(order.orderStatus) > -1"
              class="btn1"
              @click="orderSigning(order.id)"
              >{{ lang.confirmReceipt }}</span
            >
            <span
              v-if="canComment(order)"
              class="btn2"
              @click="toComment(order.id)"
              >{{ lang.toEvaluate }}</span
            >
          </div>
        </div>
      </li>
    </ul>
    <bdd-empty
      v-if="noListData"
      :type="'order'"
      @toShopping="toShopping"
    ></bdd-empty>
    <requesting v-if="requestingListData"></requesting>
    <no-more-data v-if="noMoreListData"></no-more-data>
    <PayTips v-if="paytips" @close="paytips = !paytips" />
  </div>
</template>

<script>
import List from '@/mixins/list.js'
import PayTips from '@/components/cart/paytips.vue'
export default {
  components: {
    PayTips
  },
  mixins: [List],
  props: {
    orderStatus: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.personal,
      listMethod: 'get',
      listUrl: '/wap/myOrder/listMyOrder',
      paytips: false
    }
  },
  computed: {
    // 所有已请求的页码的数据集合
    showOrderList() {
      let showData = JSON.parse(JSON.stringify(this.showData))

      showData = showData.map(order => {
        const details = order.details

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
            groups[good.joinCartTime].data.push(good)
          } else {
            const newGroup = {
              id: `${good.orderId}-${good.joinCartTime}`,
              image: good.goodsImages,
              groupType: good.groupType,
              groupTypeText: this.lang.singleProduct,
              goodsName: good.goodsName
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

        order.details = result
        return order
      })
      return showData
    },
    // 列表特定参数
    specialParams() {
      return {
        orderStatus: this.orderStatus
      }
    }
  },
  watch: {
    orderStatus(val, oldVal) {
      this.research()
    }
  },
  mounted() {
    const text = document.getElementsByClassName('order-ellipsis')
    for (let i = 0; i < text.length; i++) {
      this.$helpers.overflowHiddon(text[i])
    }
  },
  methods: {
    canComment(order) {
      console.log(order.details)
      const details = order.details
      let num = 0
      for (let n = 0, length = details.length; n < length; n++) {
        if (
          [null, 0, '0'].indexOf(details[n].groupType) > -1 &&
          details[n].data[0].categoryId === 1
        ) {
          num++
        }
      }
      return [5].indexOf(order.orderStatus) > -1 && details.length !== num
      // return [4, 5].indexOf(order.orderStatus) > -1 && details.length !== num
    },
    toShopping() {
      this.$router.push({
        name: 'index'
      })
    },
    statusText(status) {
      const map = {
        1: this.lang.unpaid,
        2: this.lang.paid,
        3: this.lang.shipped,
        4: this.lang.completed,
        5: this.lang.noComment,
        6: this.lang.commented,
        7: this.lang.returnApplication,
        8: this.lang.returning,
        9: this.lang.returned,
        10: this.lang.cancelled
      }
      return map[status]
    },
    // 跳转到详情页
    toDetail(orderId) {
      this.$router.push({
        name: 'personal-orderDetail',
        query: {
          orderId: orderId
        }
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
    // 确认收货
    orderSigning(orderId) {
      const _this = this
      _this.$ConfirmBox({
        // title: _this.lang.caveat,
        message: `${_this.lang.confirmReceipt}？`,
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
                .dispatch('orderSigning', orderId)
                .then(data => {
                  _this.$toast(_this.lang.received)
                  _this.research()
                })
                .catch(err => {
                  _this.$toast(`${err.message}`)
                })
            }
          }
        ]
      })
    },
    // 取消订单
    cancelOrder(orderId) {
      const _this = this
      _this.$ConfirmBox({
        // title: _this.lang.caveat,
        message: `${_this.lang.confirmCancellationOrder}？`,
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
                .dispatch('cancelOrder', orderId)
                .then(data => {
                  _this.$toast(_this.lang.canceled)
                  _this.research()
                })
                .catch(err => {
                  _this.$toast(`${err.message}`)
                })
            }
          }
        ]
      })
    },
    // 去评论
    toComment(orderId) {
      this.$router.push({
        name: 'personal-doComment',
        query: {
          orderId: orderId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.orderlist {
  .content {
    display: inline-block;
    width: 100%;
    background: #f2f2f2;
    .item {
      width: calc(100% - 24px);
      margin: 12px;
      padding: 20px 14px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid #ffffff; /*no*/
      border-radius: 5px;
      img {
        width: 75px;
        height: 75px;
      }
      .top {
        justify-content: flex-start;
        display: flex;
        span {
          display: inline-block;
          flex-grow: 1;
          flex-shrink: 1;
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          font-weight: 400;
          text-align: left;
          color: rgba(153, 153, 153, 1);
        }
        .order-status {
          color: #999999;
          text-align: right;
          color: rgba(234, 74, 74, 1);
          white-space: nowrap;
        }
      }
      .mod {
        margin-top: 20px;
        ul {
          li {
            position: relative;
            border-bottom: 1px solid #f5f5f5; /*no*/
            padding-bottom: 20px;
            margin-bottom: 20px;
            img {
              float: left;
              width: 75px;
              height: 75px;
            }
            .group-type {
              position: absolute;
              top: 90px;
              left: 37px;
              /*width: 36px;*/
              height: 16px;
              padding: 0 4px;
              line-height: 16px;
              text-align: center;
              border-radius: 2px;
              font-size: 12px;
              font-weight: 400;
              color: rgba(148, 116, 101, 1);
              background: rgba(245, 240, 236, 1);
              border: 1px solid rgba(215, 202, 196, 1); /*no*/
              transform: translate(-50%, 0);
            }
            .right {
              width: calc(100% - 90px);
              margin-left: 90px;
              text-align: left;
              h4 {
                position: relative;
                /*display: inline-block;*/
                width: 180px;
                max-height: 36px;
                font-size: 14px;
                line-height: 18px;
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
                line-height: 20px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              b {
                font-size: 17px;
                line-height: 24px;
                font-weight: 400;
                color: rgba(243, 163, 145, 1);
                font-family: twCenMt;
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
        }
      }
      .bottom {
        padding: 0;
        /*padding: 0px 0 24px;*/
        .order {
          margin-left: 90px;
          display: flex;
          align-items: flex-end;
          .title {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 0;
            font-size: 14px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            text-align: left;
          }
          .order-amount {
            flex-grow: 0;
            flex-shrink: 0;
            font-size: 0;
            vertical-align: bottom;
            .coin-type {
              margin-right: 7px;
              font-size: 12px;
              font-weight: 400;
              color: rgba(242, 155, 135, 1);
            }
            .order-price {
              font-size: 18px;
              font-weight: 400;
              color: rgba(242, 155, 135, 1);
            }
          }
        }
        .btn {
          text-align: right;
          span {
            display: inline-block;
            /*width: 100px;*/
            height: 32px;
            padding: 0 21px;
            border-radius: 5px;
            font-size: 14px;
            line-height: 32px;
            font-weight: 400;
            text-align: center;
            margin: 20px 0 0 30px;
          }
          .btn1 {
            background: #333333;
            color: #ffffff;
          }
          .btn2 {
            line-height: 34px;
            background: rgba(252, 252, 252, 1);
            border: 1px solid rgba(221, 221, 221, 1); /*no*/
            border-radius: 5px;
            color: #666666;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
