<template>
  <div class="order">
    <div class="header-title">
      <img src="../../../../static/images/personal/order.png" >
      <h3>{{ lang.myOrder }}</h3>
    </div>
    <div class="content">

      <!--      顶部导航TAB切换-->
      <ul class="tabs clearfix">
        <li
          v-for="(item,index) in tabsParam"
          :key="index"
          :class="{active:item.status===nowIndex}"
          class="li-tab"
          @click="getStatusOrders(item.status)">{{ item.name }}({{ item.num }})
        </li>
      </ul>

      <!--      列表头部-->
      <div class="list-top">
        <h4>{{ lang.orderList }}</h4>
        <div class="list-title">
          <span>{{ lang.productInfo }}</span>
          <span>{{ lang.productTotal }}</span>
          <span>{{ lang.productPrice }}</span>
        </div>
      </div>

      <Empty
        v-if="emptyList"
        type="1"/>

      <div
        v-loading="isloading"
        v-if="!emptyList"
        class="wait-payment blocks">
        <ul>
          <li
            v-for="(o,index) in listData"
            :key="index">
            <div class="list-head clearfix">
              <p>{{ o.orderTime }}</p>
              <p>{{ lang.orderNumber }}：{{ o.orderNo }}</p>
              <p>
                {{ lang.orderStatus }}：
                <span :style="{color: getStatusColor(o.orderStatus)}">{{ getStatusText(o.orderStatus) }}</span>
              </p>
            </div>
            <div
              v-for="(d,_index) in o.details"
              :key="_index"
              class="list-body">
              <div
                class="left"
                @click="goToDetails(d)"><img :src="IMG_URL + d.goodsImages" ></div>
              <div
                class="mid"
                @click="goToDetails(d)">
                <h5>{{ d.goodsName }}</h5>
                <p>SKU：{{ d.goodsCode }}</p>
                <div
                  v-for="(k,__index) in d.detailSpecs"
                  :key="__index"
                  class="desc">
                  <span>{{ k.name }}: </span>
                  <span>{{ k.value }} </span>
                </div>
              </div>
              <div class="right">
                <span>1</span>
                {{ o.coinCode }} {{ formatMoney(d.goodsPrice) }}
              </div>
            </div>

            <!--待付款-->
            <div
              v-if="o.orderStatus === 1"
              class="list-footer">
              <button @click="goDetail(o.id)">{{ lang.orderDetail }}</button>
              <button @click="cid = o.id;cancelod = true">{{ lang.cancelOrder }}</button>
              <div
                v-if="o.payChannel !== 1"
                class="btn-a"
                @click="goToPay(o.id, o.coinCode, o.orderAmount)">{{ lang.toPay }}</div>
              <div
                v-if="o.payChannel === 1"
                class="btn-a"
                @click="showEftGuide()">{{ lang.wireTransferGuide }}</div>
              <span>{{ lang.orderPrice }}<b>{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span>
            </div>

            <!--待发货-->
            <div
              v-if="o.orderStatus === 2"
              class="list-footer">
              <button @click="goDetail(o.id)">{{ lang.orderDetail }}</button>
              <span>{{ lang.orderPrice }}<b>{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span>
            </div>

            <!--待收货-->
            <div
              v-if="o.orderStatus === 3"
              class="list-footer">
              <button @click="goDetail(o.id)">{{ lang.orderDetail }}</button>
              <a @click="receiveod = true;rid = o.id">{{ lang.confirmReceipt }}</a>
              <span>{{ lang.orderPrice }}<b>{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span>
            </div>

            <!--已完成单独钻石不可评论和查看评论的-->
            <div
              v-if="o.orderStatus === 4"
              class="list-footer">
              <button @click="goDetail(o.id)">{{ lang.orderDetail }}</button>
              <span>{{ lang.orderPrice }}<b>{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span>
            </div>

            <!--待评论-->
            <div
              v-if="o.orderStatus === 5"
              class="list-footer">
              <button @click="goDetail(o.id)">{{ lang.orderDetail }}</button>
              <div
                class="btn-a"
                @click="goToComment(o.id)">{{ lang.toEvaluate }}</div>
              <span>{{ lang.orderPrice }}<b>{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span>
            </div>

            <!--已完成，評價完成的非单独钻石的订单-->
            <div
              v-if="o.orderStatus === 6"
              class="list-footer">
              <button @click="goDetail(o.id)">{{ lang.orderDetail }}</button>
              <button @click="goSeeComment()">{{ lang.checkEvaluate }}</button>
              <span>{{ lang.orderPrice }}<b>{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span>
            </div>

            <!--已取消-->
            <div
              v-if="o.orderStatus === 10"
              class="list-footer">
              <button @click="goDetail(o.id)">{{ lang.orderDetail }}</button>
              <span>{{ lang.orderPrice }}<b style="color: #333;">{{ o.coinCode }} {{ formatMoney(o.orderAmount) }}</b></span>
            </div>

          </li>
        </ul>
      </div>

      <!--      售后服务-->
      <!--      <div class="after-sale blocks" v-show="nowIndex===5 || nowIndex ===0">-->
      <!--        <div v-show="nowIndex ===5" class="list-top">-->
      <!--          <h4>售後記錄</h4>-->
      <!--          <div class="list-title">-->
      <!--            <span>記錄時間</span>-->
      <!--            <span>售後類型</span>-->
      <!--            <span>處理人</span>-->
      <!--            <span>處理記錄</span>-->
      <!--          </div>-->
      <!--          <ul>-->
      <!--            <li>-->
      <!--              <p>2019 / 01 / 12  03:56</p>-->
      <!--              <p>售後類型</p>-->
      <!--              <p>隔壁老王</p>-->
      <!--              <p>-->
      <!--                <span>維修單已完成</span>-->
      <!--                <span>快遞單號：2512222222222222222    請您注意查收</span>-->
      <!--              </p>-->
      <!--            </li>-->
      <!--            <li>-->
      <!--              <p>2019 / 01 / 12  03:56</p>-->
      <!--              <p>售後類型</p>-->
      <!--              <p>隔壁老王</p>-->
      <!--              <p>-->
      <!--                <span>維修單已完成</span>-->
      <!--                <span>快遞單號：2512222222222222222    請您注意查收</span>-->
      <!--              </p>-->
      <!--            </li>-->
      <!--          </ul>-->
      <!--        </div>-->
      <!--      </div>-->

    </div>
    <MessageBox
      v-show="cancelod"
      type="two"
      :title="lang.tips"
      :message="lang.confirmCancelOrder"
      @sure="cancelOrder()"
      @cancel="cancelod = false"/>
    <MessageBox
      v-show="receiveod"
      type="two"
      :title="lang.tips"
      :message="lang.confirmFinishOrder"
      @sure="receiveGoods()"
      @cancel="receiveod = false"/>
    <EftGuide ref="eft-guide" />

  </div>
</template>

<script>
import moment from 'moment';
import MessageBox from '@/components/messageBox';
import EftGuide from '@/components/eftGuide';
import Empty from '@/components/empty.vue';
import { formatMoney } from '@/api/filterUtil.js';
export default {
  components: { MessageBox, EftGuide, Empty },
  data() {
    return {
      lang: this.$LANGUAGE.personal.userOrder,
      isloading: true,
      nowIndex: 0,
      tabsParam: [
        {name: this.$LANGUAGE.personal.userOrder.allOrder, status: 0, num: 0},
        {name: this.$LANGUAGE.personal.userOrder.waitingPay, status: 1, num: 0},
        {name: this.$LANGUAGE.personal.userOrder.waitingSend, status: 2, num: 0},
        {name: this.$LANGUAGE.personal.userOrder.waitingReceive, status: 3, num: 0},
        {name: this.$LANGUAGE.personal.userOrder.waitingComment, status: 5, num: 0}
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
      cancelod: false,
      cid: 0,
      receiveod: false,
      rid: 0
    };
  },
  computed: {
    emptyList() {
      if (this.isloading) {
        return false;
      }
      if (this.listData.length > 0) {
        return false;
      }
      return true;
    }
  },
  created() {
    this.getList();
    this.getStatusOrders(0);
  },
  methods: {
    formatMoney: formatMoney,
    getList() {
      this.$axiosGet('/web/myOrder/listMyOrder', {
        orderStatus: 0,
        currPage: 1,
        pageSize: 9999
      }).then(res => {
        // console.log(res)
        if (res.data) {
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
          };
          for (let i in res.data.list) {
            let o = res.data.list[i];
            o.orderTime = moment(o.orderTime).format('YYYY/MM/DD HH:mm:ss');
            res.data.list[i].details.map(obj => {
              obj.goodsImages = obj.goodsImages.split(',')[0];
              obj.detailSpecs = JSON.parse(obj.detailSpecs);
            });
            if (res.data.list[i].orderStatus === 1) {
              //  没给钱
              this.list.ordered.push(o);
            } else if (res.data.list[i].orderStatus === 2) {
              //  给了钱没发货
              this.list.paid.push(o);
            } else if (res.data.list[i].orderStatus === 3) {
              //  发了货没收到
              this.list.send.push(o);
            } else if (res.data.list[i].orderStatus === 4) {
              //  订单完成了
              this.list.finished.push(o);
            } else if (res.data.list[i].orderStatus === 5) {
              //  收到货了没评论
              this.list.receive.push(o);
            } else if (res.data.list[i].orderStatus === 6) {
              //  已经评论了
              this.list.comment.push(o);
            } else if (res.data.list[i].orderStatus === 7) {
              //  可以申请售后退货
              this.list.apply.push(o);
            } else if (res.data.list[i].orderStatus === 8) {
              //  退货中
              this.list.returning.push(o);
            } else if (res.data.list[i].orderStatus === 9) {
              //  退货完成了
              this.list.returned.push(o);
            } else if (res.data.list[i].orderStatus === 10) {
              //  订单取消了
              this.list.closed.push(o);
            }
          }
          // console.log(this.list.ordered)
          this.tabsParam[1].num = this.list.ordered.length;
          this.tabsParam[2].num = this.list.paid.length;
          this.tabsParam[3].num = this.list.send.length;
          this.tabsParam[4].num = this.list.receive.length;
          this.tabsParam[0].num = res.data.list.length;
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getStatusOrders(status) {
      this.isloading = true;
      this.nowIndex = status;
      this.$axiosGet('/web/myOrder/listMyOrder', {
        orderStatus: status,
        currPage: 1,
        pageSize: 9999
      }).then(res => {
        // console.log(res)
        this.isloading = false;
        if (res.data && res.data.list) {
          for (let i in res.data.list) {
            let o = res.data.list[i];
            o.orderTime = moment(o.orderTime).format('YYYY-MM-DD HH:mm:ss');
            res.data.list[i].details.map(obj => {
              obj.goodsImages = obj.goodsImages.split(',')[0];
              obj.detailSpecs = JSON.parse(obj.detailSpecs);
            });
          }
          this.listData = res.data.list;
        } else {
          this.listData = [];
        }
      }).catch(err => {
        console.log(err);
        this.isloading = false;
      });
    },
    getStatusText(status) {
      // 1-未付款,2-已付款,3-已发货,4-已完成,5-未评论,6-已评论,7-退货申请,8-退货中,9-已退货,10-取消交易
      return ['', this.lang.hadNotPay, this.lang.hadPay, this.lang.hadSend, this.lang.hadFinish, this.lang.hadNotComment, this.lang.hadComment, this.lang.returnApplication, this.lang.returning, this.lang.hadReturn, this.lang.cancelTransaction][status];
    },
    getStatusColor(status) {
      return ['', '#F29B87', '#F29B87', '#F29B87', '#8B766C', '#F29B87', '#8B766C', this.lang.returnApplication, this.lang.returning, this.lang.hadReturn, '#333333'][status];
    },
    cancelOrder() {
      this.$axiosPost('/web/myOrder/cancelOrder', {
        orderId: this.cid
      }).then(res => {
        console.log(res);
        if (res.data) {
          this.cancelod = false;
          this.getList();
          this.getStatusOrders(this.nowIndex);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    receiveGoods() {
      this.$axiosGet('/web/myOrder/confirmReceipt', {
        orderId: this.rid
      }).then(res => {
        console.log(res);
        if (res.data) {
          this.receiveod = false;
          this.getList();
          this.getStatusOrders(this.nowIndex);
        } else {
          this.$message.error(res.data);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    goDetail(id) {
      this.$router.push({
        name: 'detail',
        params: {
          orderId: id
        }
      });
    },
    goToPay(j, k, v) {
      console.log(j, k, v);
      this.$router.push({
        name: 'pay',
        params: {
          coinType: k,
          orderId: j,
          price: v
        }
      });
    },
    goToComment(id) {
      this.$router.push({
        name: 'doComment',
        params: {
          orderId: id
        }
      });
    },
    goSeeComment() {
      this.$router.push({
        name: 'comment'
      });
    },
    showEftGuide() {
      this.$refs['eft-guide'].show();
    },
    goToDetails(obj) {
      console.log(obj);
      if (obj.groupType === 1) {
        console.log('对戒');
        this.$router.push({
          name: 'seleceRightRing',
          params: {
            id: obj.groupId
          }
        });
      } else {
        if (obj.categoryId === 1) {
          console.log('是个钻石💎');
          this.$router.push({
            name: 'seleceDiamond',
            params: {
              id: obj.goodsId,
              key: 2
            }
          });
        } else if (obj.categoryId === 2) {
          console.log('是个戒指💍');
          if (obj.baseConfig[0].configAttrId === 59) {
            console.log('还是个結婚戒指💍');
            this.$router.push({
              name: 'seleceWedding',
              params: {
                id: obj.goodsId
              }
            });
          } else if (obj.baseConfig[0].configAttrId === 60) {
            console.log('还是个訂婚戒指💍');
            this.$router.push({
              name: 'seleceEngagement',
              params: {
                id: obj.goodsId,
                key: 2
              }
            });
          }
        } else {
          this.$router.push({
            name: 'seleceJewellery',
            params: {
              id: obj.goodsId,
              key: 2
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.order {
  .content {
    .tabs {
      margin-top: 20px;
      border-bottom: 1px solid #e6e6e6;
      cursor: pointer;
      li {
        float: left;
        font-size: 16px;
        line-height: 50px;
        color: #333333;
        padding: 0 26px;

      }
      li:first-child {
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
      ul {
        li {
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
            .left {
              display: inline-block;
              width: 70px;
              height: 70px;
              padding: 0;
              margin: 0;
              border: 1px solid #ECECEC;
              img {
                width: 68px;
                height: 68px;
              }
            }
            .mid {
              display: inline-block;
              width: 480px;
              height: 70px;
              padding: 0 20px;
              margin: 0;
              text-align: left;
              font-size: 12px;
              line-height: 14px;
              color: #333333;
              overflow: hidden;
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
              display: inline-block;
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
            button {
              color: #8B766C;
              font-size: 12px;
              line-height: 26px;
              border: 1px solid #8b766c;
              margin: 6px 0 6px 20px;
              padding: 0 8px;
              background: #FFFFFF;
              border-radius: 3px;
              outline: 0;
            }
            span {
              float: right;
              font-size: 14px;
              line-height: 38px;
              color: #333333;
              margin-right: 50px;
              b {
                color: #F29B87;
                font-size: 20px;
                font-weight: 400;
                margin-left: 20px;
                font-family: twCenMt;
              }
            }
            a {
              float: right;
              font-size: 14px;
              line-height: 38px;
              text-align: center;
              color: #8B766C;
              width: 190px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(139,118,108,1);
            }
            .btn-a {
              float: right;
              font-size: 14px;
              line-height: 38px;
              text-align: center;
              width: 190px;
              color: #ffffff;
              background:#A88F82;
              border:1px solid #A88F82;
              cursor: pointer;
              /*color: #8B766C;*/
              /*background:rgba(255,255,255,1);*/
              /*border:1px solid rgba(139,118,108,1);*/
            }
          }
        }
      }
    }
    .after-sale {
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
          span {
            color: #333333;
            font-size: 14px;
            line-height: 34px;
            margin-left: 20px;
            margin-right: 120px;
          }
        }
      }
      ul {
        li {
          text-align: left;
          padding: 40px 20px 70px;
          border-top: 1px solid #E6E6E6;
          border-bottom: 1px solid #E6E6E6;
          margin-bottom: 20px;
          p {
            display: inline-block;
            float: left;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            color: #333333;
            width: 195px;
            margin: 0;
          }
          p:nth-child(3) {
            width: 185px;
          }
          p:nth-child(4) {
            width: 300px;
            line-height: 15px;
            span {
              display: inline-block;
              font-size: 12px;
              line-height: 14px;
              color: #333333;
              font-weight: 300;
            }
          }
        }
      }
    }
  }
}
</style>
