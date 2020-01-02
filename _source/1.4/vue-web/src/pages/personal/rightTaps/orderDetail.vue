<template>
  <div
    v-loading="loading"
    class="order-detail">
    <div class="od-top">
      <div><span @click="goBack()">{{ lang.title }}</span> >> {{ lang.orderTitle }}</div>
      <div>
        <p v-for="(step, n) in statusSteps">
          <span :style="{'background-color': step.active ? 'rgba(242,155,135,1)' : '#E6E6E6'}">{{ n + 1 }}</span>
          <span :style="{'color': step.active ? 'rgba(242,155,135,1)' : '#999'}">{{ step.title }}</span>
        </p>
        <div
          v-for="(step, n) in statusSteps"
          v-if="n < 4"
          :style="{'background-color': (step.active && statusSteps[n + 1] && statusSteps[n + 1].active) ? 'rgba(242,155,135,1)' : '#E6E6E6'}"
          class="top-line" />

          <!--        <p>-->
          <!--          <span>1</span>-->
          <!--          <span>拍下商品</span>-->
          <!--        </p>-->
          <!--        <p>-->
          <!--          <span>2</span>-->
          <!--          <span>已付款</span>-->
          <!--        </p>-->
          <!--        <p>-->
          <!--          <span>3</span>-->
          <!--          <span>已發貨</span>-->
          <!--        </p>-->
          <!--        <p>-->
          <!--          <span>4</span>-->
          <!--          <span>確認收貨</span>-->
          <!--        </p>-->
          <!--        <p>-->
          <!--          <span style="background-color: #E6E6E6;">5</span>-->
          <!--          <span style="color: #999;">評價</span>-->
          <!--        </p>-->
          <!--        <div class="top-line" />-->
          <!--        <div class="top-line" />-->
          <!--        <div class="top-line" />-->
          <!--        <div class="top-line" />-->
      </div>
    </div>

    <div
      v-if="data.details && data.details.length > 0"
      class="info-block">
      <div class="block-title">
        <span v-if="data.orderStatus===1">{{ lang.pendingPayment }}</span>
        <span v-else-if="data.orderStatus===10">{{ lang.closed }}</span>
        <span v-else>{{ lang.toBbeDelivered }}</span>
      </div>
      <div class="addr-info">
        <div class="addr">
          <div class="block-title-line">
            <div />
            <div>{{ lang.address }}</div>
          </div>
          <div class="addr-list">
            <div class="address">{{ data.address.countryName }}-{{ data.address.provinceName }}{{ data.address.cityName }}</div>
            <div class="user-info">
              <div>{{ data.address.firstName }} {{ data.address.lastName }}<span>{{ lang.get }}</span></div>
              <div>
                <span>{{ data.address.userTelCode }}</span>
                <span>{{ data.address.userTel }}</span>
              </div>
            </div>
            <div class="full-address">{{ data.address.address }}</div>
            <div class="other-info">
              <span v-if="data.address.zipCode">{{ data.address.zipCode }}</span><span>{{ data.address.userMail }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-info-title">
          <div class="t1">{{ lang.goodsInfo }}</div>
          <div class="t2">{{ lang.goodsNum }}</div>
          <div class="t3">{{ lang.goodsPrice }}</div>
        </div>
        <div
          v-for="(d,_index) in data.details"
          :key="_index"
          class="goods-details">
          <div
            class="t1"
            @click="goToDetail(d)">
            <div class="good-img">
              <img
                :src="IMG_URL + d.goodsImages"
                alt="">
            </div>
            <div class="good-desc">
              <div class="good-name">{{ d.goodsName }}</div>
              <div class="good-sku">SKU：{{ d.goodsCode }}</div>
              <div class="details">
                <span
                  v-for="(v,k) in d.detailSpecs"
                  :key="k">{{ v.name }}：{{ v.value }}</span>
              </div>
            </div>
          </div>
          <div class="t2">1</div>
          <div class="t3">{{ data.coinCode }}  {{ d.goodsPrice }}</div>
        </div>
        <div class="goods-bot-bar"/>
      </div>
    </div>

    <div
      v-for="(detail, n) in data.outDetails"
      class="info-block">
      <div class="block-title">{{ lang.deliveryInfo }}{{ n + 1 }}</div>
      <div class="addr-info">
        <div class="addr">
          <div class="block-title-line">
            <div />
            <div>{{ lang.address }}</div>
          </div>
          <div class="addr-list">
            <div class="address">{{ data.address.countryName }}-{{ data.address.provinceName }}{{ data.address.cityName }}</div>
            <div class="user-info">
              <div>{{ data.address.firstName }} {{ data.address.lastName }}<span>{{ lang.get }}</span></div>
              <div>
                <span>{{ data.address.userTelCode }}</span>
                <span>{{ data.address.userTel }}</span>
              </div>
            </div>
            <div class="full-address">{{ data.address.address }}</div>
            <div class="other-info">
              <span v-if="data.address.zipCode">{{ data.address.zipCode }}</span><span>{{ data.address.userMail }}</span>
            </div>
          </div>
        </div>
        <div class="express">
          <div class="block-title-line">
            <div />
            <div>{{ lang.expressInfo }}</div>
          </div>
          <div class="express-title-info">
            <div>{{ lang.express }}：{{ detail.companyName }}</div>
            <div>{{ lang.WaybillNumber }}：{{ detail.expressNo }}</div>
            <div>&nbsp;</div>
          </div>
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-info-title">
          <div class="t1">{{ lang.goodsInfo }}</div>
          <div class="t2">{{ lang.goodsNum }}</div>
          <div class="t3">{{ lang.goodsPrice }}</div>
        </div>
        <div
          v-for="(d,_index) in detail.outOrderDetails"
          :key="_index"
          class="goods-details">
          <div
            class="t1"
            @click="goToDetail(d)">
            <div class="good-img">
              <img
                :src="IMG_URL + d.goodsImages.split(',')[0]"
                alt="">
            </div>
            <div class="good-desc">
              <div class="good-name">{{ d.goodsName }}</div>
              <div class="good-sku">SKU：{{ d.goodsCode }}</div>
              <div class="details">
                <span
                  v-for="(v,k) in JSON.parse(d.detailSpecs || '{}')"
                  :key="k">{{ v.name }}：{{ v.value }}</span>
              </div>
            </div>
          </div>
          <div class="t2">1</div>
          <div class="t3">{{ data.coinCode }}  {{ formatMoney(d.goodsPrice) }}</div>
        </div>
        <div class="goods-bot-bar">
          <div>{{ data.orderTime }}</div>
          <div>
            {{ lang.orderStatus }}：
            <span>{{ getStatusText(data.orderStatus) }}</span>
            <!--            <span v-if="data.orderStatus === 1">待付款</span>-->
            <!--            <span v-else-if="data.orderStatus === 2">待發貨</span>-->
            <!--            <span v-else-if="data.orderStatus === 3">待收貨</span>-->
            <!--            <span v-else-if="data.orderStatus === 5">待評價</span>-->
            <!--            <span v-else-if="data.orderStatus === 6">已完成</span>-->
            <!--            <span v-else-if="data.orderStatus === 4">已完成</span>-->
            <!--            <span v-else-if="data.orderStatus === 10">已關閉</span>-->
          </div>
        </div>
      </div>
    </div>

    <div class="bot-info">
      <div class="left-info" />
      <div class="right-info">
        <div class="new-address-title">
          <div class="na-line" />
          <div class="na-title">{{ lang.yourBuyInfo }}</div>
        </div>
        <div class="order-infos">
          <div class="info-line">
            <div class="label">{{ lang.orderNum }}</div>
            <div class="clearboth">
              {{ data.orderNo }}
              <!--              <input-->
              <!--                id="copyInp"-->
              <!--                :value="data.orderNo"-->
              <!--                class="color-gold ff"-->
              <!--                disabled-->
              <!--                type="text">-->
              <!--              <div-->
              <!--                class="copy-btn"-->
              <!--                @click="copyText">複製</div>-->
            </div>
          </div>
          <div class="info-line">
            <div class="label">{{ lang.itemsNum }}</div>
            <div class="ff">{{ formatMoney(data.productCount, 0) }}</div>
          </div>
          <div class="info-line">
            <div class="label">{{ lang.totalNum }}</div>
            <div class="ff">{{ data.coinCode }} {{ formatMoney(data.productAmount) }}</div>
          </div>
          <div class="info-line">
            <div class="label">{{ lang.coupon }}</div>
            <div class="ff color-pink">-{{ data.coinCode }} {{ formatMoney(data.preferFee) }}</div>
          </div>
          <div class="info-line">
            <div class="label">{{ lang.freight }}</div>
            <div class="ff">+{{ data.coinCode }} {{ formatMoney(data.logisticsFee) }}</div>
          </div>
          <div class="info-line">
            <div class="label">{{ lang.tex }}</div>
            <div class="ff">+{{ data.coinCode }} {{ formatMoney(data.taxFee) }}</div>
          </div>
          <div class="info-line">
            <div class="label">{{ lang.insurance }}</div>
            <div class="ff">+{{ data.coinCode }} {{ formatMoney(data.safeFee) }}</div>
          </div>
          <div
            v-if="data.transPreferFee"
            class="info-line">
            <div class="label">{{ lang.transPreferFee }}</div>
            <div class="ff">+{{ data.coinCode }} {{ formatMoney(data.transPreferFee) }}</div>
          </div>
          <div class="info-line">
            <div class="label big-label">{{ lang.orderTotal }}</div>
            <div class="ff big-ff">{{ data.coinCode }} {{ formatMoney(data.orderAmount) }}</div>
          </div>
        </div>
      </div>

    </div>
</div></template>

<script>
import moment from 'moment';
import { formatMoney } from '@/api/filterUtil.js';

export default {
  name: 'OrderDetail',
  data() {
    return {
      lang: this.$LANGUAGE.personal.orderDetail,
      oid: this.$route.params.orderId,
      data: {
        address: {
          countryName: '',
          provinceName: '',
          cityName: '',
          address: '',
          firstName: '',
          lastName: '',
          userMail: ''
        }
      },
      loading: true
    };
  },
  computed: {
    statusSteps() {
      // data.orderStatus
      let orderStatus = this.data.orderStatus;
      let result = [
        {
          title: this.lang.result[0],
          active: false
        },
        {
          title: this.lang.result[1],
          active: false
        },
        {
          title: this.lang.result[2],
          active: false
        },
        {
          title: this.lang.result[3],
          active: false
        },
        {
          title: this.lang.result[4],
          active: false
        }
      ];
      // 1-未付款,2-已付款,3-已发货,4-已完成,5-未评论,6-已评论,7-退货申请,8-退货中,9-已退货,10-取消交易
      if (['', 1, 10].indexOf(orderStatus) > -1) {
        result[0].active = true;
      } else if ([2].indexOf(orderStatus) > -1) {
        result[0].active = true;
        result[1].active = true;
      } else if ([3].indexOf(orderStatus) > -1) {
        result[0].active = true;
        result[1].active = true;
        result[2].active = true;
      } else if ([4, 5].indexOf(orderStatus) > -1) {
        result[0].active = true;
        result[1].active = true;
        result[2].active = true;
        result[3].active = true;
      } else if ([6, 7, 8, 9].indexOf(orderStatus) > -1) {
        result[0].active = true;
        result[1].active = true;
        result[2].active = true;
        result[3].active = true;
        result[4].active = true;
      }
      return result;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    formatMoney: formatMoney,
    getStatusText(status) {
      // 1-未付款,2-已付款,3-已发货,4-已完成,5-未评论,6-已评论,7-退货申请,8-退货中,9-已退货,10-取消交易
      return ['', this.lang.status[0], this.lang.status[1], this.lang.status[2], this.lang.status[3], this.lang.status[4], this.lang.status[5], this.lang.status[6], this.lang.status[7], this.lang.status[8], this.lang.status[9]][status];
    },
    getData() {
      this.$axiosGet('/web/myOrder/getOrderDetails', {
        orderId: this.oid
      }).then(res => {
        console.log(res);
        this.loading = false;
        if (res.code === 200) {
          this.data = res.data;
          this.data.orderTime = moment(this.data.orderTime).format('YYYY-MM-DD HH:mm:ss');
          this.data.details.forEach(obj => {
            obj.detailSpecs = JSON.parse(obj.detailSpecs);
            obj.goodsImages = obj.goodsImages.split(',')[0];
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
    goBack() {
      this.$router.push({
        name: 'userOrder'
      });
    },
    copyText() {
      try {
        const inp = document.getElementById('copyInp');
        let range = document.createRange();
        range.selectNode(inp);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        this.$message({
          message: this.lang.copySuccess,
          type: 'success'
        });
      } catch (e) {
        this.$message.error(this.lang.copyFail);
      }
    },
    goToDetail(obj) {
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
.order-detail {
  width: 936px;
  text-align: left;
  .od-top {
    width: 940px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 22px;
    div:nth-child(1) {
      height:17px;
      line-height:17px;
      font-size:16px;
      color:rgba(242,155,135,1);
    }
    div:nth-child(2) {
      width: 424+25+48px;
      display: flex;
      justify-content: space-between;
      position: relative;
      p {
        width: 48px;
        text-align: center;
        span:nth-child(1) {
          display: block;
          width:16px;
          height:16px;
          background:rgba(242,155,135,1);
          border-radius:50%;
          color: #ffffff;
          line-height: 16px;
          margin: 0 auto 5px;
        }
        span:nth-child(2) {
          line-height: 12px;
          height:12px;
          font-size:12px;
          color:rgba(242,155,135,1);
        }
      }
      .top-line {
        position: absolute;
        width:80px;
        height:2px;
        background:rgba(242,155,135,1);
        border-radius:1px;
        top: 8px;
        left: 40px;
      }
      .top-line:nth-child(7) {
        left: 40+80+30px;
      }
      .top-line:nth-child(8) {
        left: 40+80+30+80+35px;
      }
      .top-line:nth-child(9) {
        left: 40+80+30+80+30+80+40px;
        background-color: #E6E6E6;
      }
    }
  }
  .info-block {
    width:936px;
    margin-bottom: 10px;
    .block-title {
      width:936px;
      height:40px;
      line-height: 40px;
      background:rgba(254,230,226,1);
      font-size:16px;
      color:rgba(51,51,51,1);
      margin-bottom: 20px;
      text-align: center;
    }
    .addr-info {
      width: 936px;
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
            width:2px;
            height:16px;
            background:rgba(242,155,135,1);
            margin-right: 17px;
          }
          div:nth-child(2) {
            line-height: 16px;
            height:16px;
            font-size:16px;
            color:rgba(242,155,135,1);
          }
        }
        .addr-list {
          padding: 0 20px;
          .address {
            width: 100%;
            line-height: 14px;
            height:16px;
            font-size:14px;
            color:rgba(51,51,51,1);
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          }
          .user-info {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 9px 0 5px;
            div:nth-child(1) {
              width: 468*0.6px;
              display: flex;
              align-items: center;
              height:18px;
              font-size:16px;
              color: #333;
              line-height: 18px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              span {
                font-size: 12px;
                line-height: 12px;
                margin-left: 5px;
              }
            }
            div:nth-child(2) {
              width: 468*0.4px;
              height: 14px;
              display: flex;
              align-items: flex-end;
              color: #333;
              overflow: hidden;
              text-overflow:ellipsis;
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
                font-size:18px;
                font-family:twCenMt;
                margin-left: 7px;
              }
            }
          }
          .full-address {
            width: 100%;
            line-height: 16px;
            max-height: 16*2px;
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
            width:2px;
            height:16px;
            background:rgba(242,155,135,1);
            margin-right: 17px;
          }
          div:nth-child(2) {
            line-height: 16px;
            height:16px;
            font-size:16px;
            color:rgba(242,155,135,1);
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
            color: #F29B87;
            cursor: pointer;
          }
        }
      }
    }
    .goods-info {
      .goods-info-title {
        width: 936px;
        height:40px;
        line-height: 40px;
        background:rgba(254,230,226,1);
        color: #333;
        font-size: 14px;
        display: flex;
        padding-left: 19px;
        .t1 {
          width: 936-250.5-163.5-20px;
        }
        .t2 {
          text-align: center;
          width: 51+(113/2)+56px;
        }
        .t3 {
          text-align: center;
          width: 56+(113/2)+138px;
        }
      }
      .goods-details {
        width: 936px;
        display: flex;
        padding: 20px 0 20px 19px;
        border-top: 1px solid rgba(230,230,230,1);
        align-items: center;
        .t1 {
          width: 936-250.5-163.5-20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .good-img {
            width: 70px;
            height: 70px;
            border: 1px solid rgba(230,230,230,1);
            img {
              width: 68px;
              height: 68px;
              display: block;
            }
          }
          .good-desc {
            width: 936-250.5-163.5-20-70-20px;
            height: 70px;
            color: #333;
            overflow: hidden;
            .good-name {
              font-size: 16px;
              line-height: 16px;
              height: 16px;
              width: 100%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              margin-bottom: 9px;
            }
            .good-sku {
              font-size: 12px;
              line-height: 12px;
              height:12px;
              margin-bottom: 18px;
            }
            .details {
              font-size: 12px;
              line-height: 12px;
              height: 12px;
              width: 100%;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              span {
                margin-right: 10px;
              }
            }
          }
        }
        .t2 {
          text-align: center;
          width: 51+(113/2)+56px;
          color: #333;
          font-size: 16px;
        }
        .t3 {
          text-align: center;
          width: 56+(113/2)+138px;
          color: #333;
          font-family: twCenMt;
          font-size: 20px;
        }
      }
      .goods-details:nth-child(2) {
        border-top: 0;
      }
    }
    .goods-bot-bar {
      width:936px;
      height:40px;
      background:rgba(248,248,248,1);
      padding: 0 20px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #333;
      margin-bottom: 36px;
      span {
        color: #F29B87;
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
      width:470px;
      background:rgba(255,255,255,1);
      .new-address-title {
        height: 20px;
        display: flex;
        align-items: flex-end;
        margin-bottom: 17px;
        .na-line {
          width:4px;
          height:20px;
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
            width:40px;
            height:20px;
            line-height: 18px;
            background:rgba(245,244,244,1);
            border:1px solid rgba(174,174,174,1);
            border-radius:4px;
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
            color: #AA8A7B;
            font-size: 16px;
            line-height: 20px;
          }
          .color-pink {
            color: #F29B87;
          }
          .big-label {
            font-size: 16px;
            font-weight:bold;
          }
          .big-ff {
            font-size: 20px;
            font-weight:bold;
          }
        }
        .info-line:nth-child(2n) {
          background:rgba(249,249,249,1);
        }
      }
    }
  }

}
</style>
