<template>
  <div class="orders">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.myOrder`) }}</div>
    </div>
    <div class="content">
      <!--      顶部导航TAB切换-->
      <div class="tabs">
        <div
          v-for="(item, index) in tabsParam"
          :key="index"
          :class="{ active: item.status === activeIndex }"
          class="li-tab"
          @click="getStatusOrders(item.status)"
        >
          {{ item.name }}({{ item.num }})
        </div>
      </div>

      <!--      列表头部-->
      <div class="list-top">
        <h4>{{ $t(`${lang}.orderList`) }}</h4>
        <div class="list-title">
          <span>{{ $t(`${lang}.productInfo`) }}</span>
          <span>{{ $t(`${lang}.productTotal`) }}</span>
          <span>{{ $t(`${lang}.productPrice`) }}</span>
        </div>
      </div>

      <!--      <Empty v-if="emptyList" type="1" />-->

      <!--      <div v-if="!emptyList" v-loading="isloading" class="wait-payment blocks">-->
      <div class="wait-payment blocks">
        <div v-for="(o, index) in listData" :key="index" class="blocks-mark">
          <div class="list-head">
            <p>{{ o.orderTime }}</p>
            <p>{{ $t(`${lang}.orderNumber`) }}：{{ o.orderNo }}</p>
            <p>
              {{ $t(`${lang}.orderStatus`) }}：
              <span :style="{ color: getStatusColor(o.orderStatus) }">{{
                getStatusText(o.orderStatus)
              }}</span>
            </p>
          </div>
          <div v-for="(d, _index) in o.details" :key="_index" class="list-body">
            <div class="left">
              <nuxt-link :to="goDetails(d)"
                ><img :src="IMG_URL + d.goodsImages"
              /></nuxt-link>
            </div>
            <div class="mid">
              <nuxt-link :to="goDetails(d)">
                <h5>{{ d.goodsName }}</h5>
                <p>SKU：{{ d.goodsCode }}</p>
                <div
                  v-for="(k, __index) in d.detailSpecs"
                  :key="__index"
                  class="desc"
                >
                  <span>{{ k.name }}: </span>
                  <span>{{ k.value }} </span>
                </div>
              </nuxt-link>
            </div>

            <div class="right">
              <span>1</span>
              {{ o.coinCode }} {{ formatMoney(d.goodsPrice) }}
            </div>
          </div>

          <!--待付款-->
          <div v-if="o.orderStatus === 1" class="list-footer">
            <nuxt-link :to="`/account/order-details?orderId=${o.id}`"
              ><button>
                {{ $t(`${lang}.orderDetail`) }}
              </button>
            </nuxt-link>
            <a
              ><button
                @click="
                  cid = o.id
                  cancelOrderStatus = true
                "
              >
                {{ $t(`${lang}.cancelOrder`) }}
              </button></a
            >
            <nuxt-link :to="goToPay(o.id, o.coinCode, o.orderAmount)"
              ><div v-if="o.payChannel !== 1" class="btn-a">
                {{ $t(`${lang}.toPay`) }}
              </div>
            </nuxt-link>
            <div
              v-if="o.payChannel === 1"
              class="btn-a"
              @click="showEftGuide()"
            >
              {{ $t(`${lang}.wireTransferGuide`) }}
            </div>
            <span
              >{{ $t(`${lang}.orderPrice`)
              }}<b>{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span
            >
          </div>

          <!--待发货-->
          <div v-if="o.orderStatus === 2" class="list-footer">
            <nuxt-link :to="`/account/order-details?orderId=${o.id}`"
              ><button>
                {{ $t(`${lang}.orderDetail`) }}
              </button>
            </nuxt-link>
            <span
              >{{ $t(`${lang}.orderPrice`)
              }}<b>{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span
            >
          </div>

          <!--待收货-->
          <div v-if="o.orderStatus === 3" class="list-footer">
            <nuxt-link :to="`/account/order-details?orderId=${o.id}`"
              ><button>
                {{ $t(`${lang}.orderDetail`) }}
              </button>
            </nuxt-link>
            <div
              class="fakeA"
              @click="
                receiveOrder = true
                rid = o.id
              "
            >
              {{ $t(`${lang}.confirmReceipt`) }}
            </div>
            <span
              >{{ $t(`${lang}.orderPrice`)
              }}<b>{{ o.coinCode }} {{ formatNumber(o.orderAmount) }}</b></span
            >
          </div>

          <!--已完成单独钻石不可评论和查看评论的-->
          <div v-if="o.orderStatus === 4" class="list-footer">
            <nuxt-link :to="`/account/order-details?orderId=${o.id}`"
              ><button>
                {{ $t(`${lang}.orderDetail`) }}
              </button>
            </nuxt-link>
            <span
              >{{ $t(`${lang}.orderPrice`)
              }}<b>{{ o.coinCode }} {{ formatNumber(o.orderAmount) }}</b></span
            >
          </div>

          <!--待评论-->
          <div v-if="o.orderStatus === 5" class="list-footer">
            <nuxt-link :to="`/account/order-details?orderId=${o.id}`"
              ><button>
                {{ $t(`${lang}.orderDetail`) }}
              </button>
            </nuxt-link>
            <div class="btn-a" @click="goToComment(o.id)">
              {{ $t(`${lang}.toEvaluate`) }}
            </div>
            <span
              >{{ $t(`${lang}.orderPrice`)
              }}<b>{{ o.coinCode }} {{ formatNumber(o.orderAmount) }}</b></span
            >
          </div>

          <!--已完成，評價完成的非单独钻石的订单-->
          <div v-if="o.orderStatus === 6" class="list-footer">
            <nuxt-link :to="`/account/order-details?orderId=${o.id}`"
              ><button>
                {{ $t(`${lang}.orderDetail`) }}
              </button>
            </nuxt-link>
            <!--            <button @click="goSeeComment()">-->
            <!--              {{ $t(`${lang}.checkEvaluate`) }}-->
            <!--            </button>-->
            <span
              >{{ $t(`${lang}.orderPrice`)
              }}<b>{{ o.coinCode }} {{ formatNumber(o.orderAmount) }}</b></span
            >
          </div>

          <!--已取消-->
          <div v-if="o.orderStatus === 10" class="list-footer">
            <nuxt-link :to="`/account/order-details?orderId=${o.id}`"
              ><button>
                {{ $t(`${lang}.orderDetail`) }}
              </button>
            </nuxt-link>
            <span
              >{{ $t(`${lang}.orderPrice`)
              }}<b style="color: #333;"
                >{{ o.coinCode }} {{ formatNumber(o.orderAmount) }}</b
              ></span
            >
          </div>
        </div>
      </div>
    </div>
    <message-box
      v-show="cancelOrderStatus"
      type="two"
      :title="$t(`${lang}.tips`)"
      :message="$t(`${lang}.confirmCancelOrder`)"
      @sure="cancelOrder()"
      @cancel="cancelOrderStatus = false"
    />
    <message-box
      v-show="receiveOrder"
      type="two"
      :title="$t(`${lang}.tips`)"
      :message="$t(`${lang}.confirmFinishOrder`)"
      @sure="receiveGoods()"
      @cancel="receiveOrder = false"
    />
    <eftGuide ref="eft-guide" />
  </div>
</template>

<script>
import moment from 'moment'
import EftGuide from '@/components/eftGuide.vue'
const lang = 'personal.userOrder'
export default {
  name: 'Orders',
  components: {
    EftGuide
  },
  data() {
    return {
      lang,
      activeIndex: 0,
      tabsParam: [
        { name: this.$t(`${lang}.allOrder`), status: 0, num: 0 },
        {
          name: this.$t(`${lang}.waitingPay`),
          status: 1,
          num: 0
        },
        {
          name: this.$t(`${lang}.waitingSend`),
          status: 2,
          num: 0
        },
        {
          name: this.$t(`${lang}.waitingReceive`),
          status: 3,
          num: 0
        },
        {
          name: this.$t(`${lang}.waitingComment`),
          status: 5,
          num: 0
        }
      ],
      listData: [],
      list: {
        //  没给钱
        ordered: [],
        //  给了钱没发货
        paid: [],
        //  发了货没收到
        send: [],
        //  订单完成了
        finished: [],
        //  收到货了没评论
        receive: [],
        //  已经评论了
        comment: [],
        //  可以申请售后退货
        apply: [],
        //  退货中
        returning: [],
        //  退货完成了
        returned: [],
        //  订单取消了
        closed: []
      },
      cancelOrderStatus: false,
      receiveOrder: false,
      cid: ``,
      rid: ``
    }
  },
  created() {
    this.getList()
    this.getStatusOrders(0)
  },
  methods: {
    getList() {
      this.$axios
        .get('/web/myOrder/listMyOrder', {
          params: { orderStatus: 0, currPage: 1, pageSize: 9999 }
        })
        .then(res => {
          // console.log(res)
          this.list = {
            //  没给钱
            ordered: [],
            //  给了钱没发货
            paid: [],
            //  发了货没收到
            send: [],
            //  订单完成了
            finished: [],
            //  收到货了没评论
            receive: [],
            //  已经评论了
            comment: [],
            //  可以申请售后退货
            apply: [],
            //  退货中
            returning: [],
            //  退货完成了
            returned: [],
            //  订单取消了
            closed: []
          }
          for (const i in res.list) {
            const o = res.list[i]
            o.orderTime = moment(o.orderTime).format('YYYY/MM/DD HH:mm:ss')
            res.list[i].details.map(obj => {
              obj.goodsImages = obj.goodsImages.split(',')[0]
              obj.detailSpecs = JSON.parse(obj.detailSpecs)
              obj.link = `132`
            })
            if (res.list[i].orderStatus === 1) {
              //  没给钱
              this.list.ordered.push(o)
            } else if (res.list[i].orderStatus === 2) {
              //  给了钱没发货
              this.list.paid.push(o)
            } else if (res.list[i].orderStatus === 3) {
              //  发了货没收到
              this.list.send.push(o)
            } else if (res.list[i].orderStatus === 4) {
              //  订单完成了
              this.list.finished.push(o)
            } else if (res.list[i].orderStatus === 5) {
              //  收到货了没评论
              this.list.receive.push(o)
            } else if (res.list[i].orderStatus === 6) {
              //  已经评论了
              this.list.comment.push(o)
            } else if (res.list[i].orderStatus === 7) {
              //  可以申请售后退货
              this.list.apply.push(o)
            } else if (res.list[i].orderStatus === 8) {
              //  退货中
              this.list.returning.push(o)
            } else if (res.list[i].orderStatus === 9) {
              //  退货完成了
              this.list.returned.push(o)
            } else if (res.list[i].orderStatus === 10) {
              //  订单取消了
              this.list.closed.push(o)
            }
          }
          // console.log(this.list.ordered)
          this.tabsParam[1].num = this.list.ordered.length
          this.tabsParam[2].num = this.list.paid.length
          this.tabsParam[3].num = this.list.send.length
          this.tabsParam[4].num = this.list.receive.length
          this.tabsParam[0].num = res.list.length
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    getStatusOrders(status) {
      this.activeIndex = status
      this.$axios
        .get('/web/myOrder/listMyOrder', {
          params: { orderStatus: status, currPage: 1, pageSize: 9999 }
        })
        .then(res => {
          // console.log(res)
          for (const i in res.list) {
            const o = res.list[i]
            o.orderTime = moment(o.orderTime).format('YYYY-MM-DD HH:mm:ss')
            res.list[i].details.map(obj => {
              obj.goodsImages = obj.goodsImages.split(',')[0]
              obj.detailSpecs = JSON.parse(obj.detailSpecs)
            })
          }
          this.listData = res.list
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
            this.listData = []
          } else {
            // console.log(err)
          }
        })
    },
    getStatusColor(status) {
      return [
        '',
        '#F29B87',
        '#F29B87',
        '#F29B87',
        '#8B766C',
        '#F29B87',
        '#8B766C',
        this.$t(`${lang}.returnApplication`),
        this.$t(`${lang}.returning`),
        this.$t(`${lang}.hadReturn`),
        '#333333'
      ][status]
    },
    getStatusText(status) {
      // 1-未付款,2-已付款,3-已发货,4-已完成,5-未评论,6-已评论,7-退货申请,8-退货中,9-已退货,10-取消交易
      return [
        '',
        this.$t(`${lang}.hadNotPay`),
        this.$t(`${lang}.hadPay`),
        this.$t(`${lang}.hadSend`),
        this.$t(`${lang}.hadFinish`),
        this.$t(`${lang}.hadNotComment`),
        this.$t(`${lang}.hadComment`),
        this.$t(`${lang}.returnApplication`),
        this.$t(`${lang}.returning`),
        this.$t(`${lang}.hadReturn`),
        this.$t(`${lang}.cancelTransaction`)
      ][status]
    },
    cancelOrder() {
      const data = this.$helpers.transformRequest(
        JSON.parse(JSON.stringify({ orderId: this.cid })),
        false
      )
      this.$axios
        .post('/web/myOrder/cancelOrder', data)
        .then(res => {
          // console.log(res)
          this.cancelOrderStatus = false
          this.getList()
          this.getStatusOrders(this.activeIndex)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    receiveGoods() {
      this.$axios
        .get('/web/myOrder/confirmReceipt', {
          params: {
            orderId: this.rid
          }
        })
        .then(res => {
          // console.log(res)
          this.receiveOrder = false
          this.getList()
          this.getStatusOrders(this.activeIndex)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    },
    goToPay(j, k, v) {
      const route = {
        path: '/payment-options',
        query: {
          coinType: k,
          orderId: j,
          price: v
        }
      }
      return this.routeDataToUrl(route)
    },
    goToComment(id) {},
    showEftGuide() {
      this.$refs[`eft-guide`].show()
    },
    goDetails(obj) {
      // console.log(obj)
      let route = {
        path: '/',
        query: {}
      }

      if (obj.groupType === 1) {
        // console.log(`对戒💍`)
        route = {
          path: `/ring/wedding-rings/${obj.goodsName.replace(/\//g, '')}`,
          query: {
            goodId: obj.groupId,
            ringType: 'pair'
          }
        }
      } else {
        // console.log(obj.data[0].simpleGoodsEntity)
        const ct = obj.categoryId
        // console.log(ct)
        if (ct === 1) {
          // console.log(`💎`)
          route = {
            path: `/diamond-details/${obj.goodsName.replace(/\//g, '')}`,
            query: {
              goodId: obj.goodsId
            }
          }
        } else if (ct === 2) {
          // console.log(`💍`)
          route = {
            path: `/ring/wedding-rings/${obj.goodsName.replace(/\//g, '')}`,
            query: {
              goodId: obj.goodsId,
              ringType: 'single'
            }
          }
        } else {
          // console.log(`饰品`)
          route = {
            path: `/jewellery/all/${obj.goodsName.replace(/\//g, '')}`,
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
div {
  box-sizing: border-box;
}
.orders {
  width: 100%;
  padding-bottom: 30px;
  .pink-title {
    display: flex;
    align-items: center;
    .pink-line {
      width: 2px;
      height: 16px;
      background: rgba(242, 155, 135, 1);
    }
    .title-name {
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(242, 155, 135, 1);
      margin-left: 28px;
    }
  }
  .content {
    .tabs {
      display: flex;
      align-items: center;
      margin-top: 20px;
      border-bottom: 1px solid #e6e6e6;
      cursor: pointer;
      div {
        font-size: 16px;
        line-height: 50px;
        color: #333333;
        padding: 0 26px;
      }
      div:first-child {
        padding-left: 0;
      }
      .active {
        color: #f29b87;
        border-bottom: 2px solid #f29b87;
      }
    }
    .list-top {
      h4 {
        font-size: 16px;
        line-height: 60px;
        color: #f29b87;
        text-align: left;
        margin-top: 8px;
      }
      .list-title {
        background: #fee6e2;
        text-align: left;
        margin-bottom: 10px;
        padding-top: 0;
        span {
          width: 500px;
          color: #333333;
          font-size: 14px;
          line-height: 34px;
          margin-left: 20px;
          display: inline-block;
        }
        span:nth-child(2) {
          width: 150px;
          text-align: center;
        }
        span:nth-child(3) {
          width: 200px;
          text-align: center;
        }
      }
    }
    .blocks {
      width: 100%;
      .blocks-mark {
        margin-bottom: 40px;
        .list-head {
          background: #f8f8f8;
          height: 40px;
          p {
            float: left;
            font-size: 14px;
            line-height: 40px;
            color: #333333;
            margin: 0 20px;
          }
          p:nth-child(3) {
            float: right;
            span {
              color: #f29b87;
            }
          }
        }
        .list-body {
          width: 100%;
          height: 110px;
          padding: 20px;
          border-top: 1px solid #e6e6e6;
          display: flex;
          .left {
            width: 70px;
            height: 70px;
            padding: 0;
            margin: 0;
            border: 1px solid #ececec;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .mid {
            width: 480px;
            height: 70px;
            padding: 0 20px;
            margin: 0;
            text-align: left;
            font-size: 12px;
            line-height: 14px;
            color: #333333;
            overflow: hidden;
            cursor: pointer;
            h5 {
              font-size: 14px;
              line-height: 18px;
              font-weight: 400;
              height: 18px;
              width: 100%;
              overflow: hidden;
              color: #666666;
            }
            p {
              line-height: 14px;
              height: 14px;
              margin: 8px 0 14px;
              color: #999999;
            }
            .desc {
              height: 70-18-8-14-14px;
              line-height: 70-18-8-14-14px;
              display: inline;
              margin-right: 5px;
              color: #999999;
            }
          }
          .right {
            width: 350px;
            height: 70px;
            padding: 0;
            margin: 0;
            min-height: 70px;
            text-align: left;
            font-size: 16px;
            line-height: 70px;
            color: #666666;
            font-family: twCenMt;
            span {
              text-align: center;
              padding: 0 36px;
              font-size: 14px;
              margin-right: 96px;
              color: #666666;
            }
          }
        }
        .list-body:nth-child(2) {
          border-top: 0;
        }
        .list-footer {
          background: #f8f8f8;
          text-align: left;
          a {
            button {
              color: #8b766c;
              font-size: 12px;
              line-height: 26px;
              border: 1px solid #8b766c;
              margin: 6px 0 6px 20px;
              padding: 0 8px;
              background: #ffffff;
              border-radius: 3px;
              outline: 0;
            }
          }
          span {
            float: right;
            font-size: 14px;
            line-height: 38px;
            color: #333333;
            margin-right: 50px;
            b {
              color: #f29b87;
              font-size: 20px;
              font-weight: 400;
              margin-left: 20px;
              font-family: twCenMt;
            }
          }
          .fakeA {
            float: right;
            font-size: 14px;
            line-height: 38px;
            text-align: center;
            color: #8b766c;
            width: 190px;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(139, 118, 108, 1);
          }
          .btn-a {
            float: right;
            font-size: 14px;
            line-height: 38px;
            text-align: center;
            width: 190px;
            color: #ffffff;
            background: #a88f82;
            border: 1px solid #a88f82;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
