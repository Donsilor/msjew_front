<template>
  <div class="coupon">
    <ul class="clearfix">
      <li
        v-for="(item,index) in enableCoupons"
        :key="index">
        <div :class="['expir', {'expired': item.status === 4}, {expired: item.expired === 'true'}]">
          <!--金额巴拉巴拉-->
          <div class="title">
            <div class="img"><span class="icon"/></div>
          </div>
          <!--百分比巴拉巴拉-->
          <div
            v-if="item.discountType === 1"
            class="price-count">
            <p>
              <span>{{ item.discountAmount }}% OFF</span>
            </p>
          </div>
          <div
            v-if="item.discountType === 2"
            class="price">
            <p>HKD {{ item.discountAmount }}</p>
          </div>

          <div class="coupon-name">
            <div class="couponTwo">
              <div class="couponCode">{{ lang.code }}{{ item.code }}</div>
              <div class="couponTime">{{ lang.left1 }} {{ item.canUseNum }} {{ lang.left2 }}</div>
            </div>

          </div>
          <div class="rule">
            <p class="p">{{ item.condition }}</p>
            <p>{{ item.startTime }} - {{ item.endTime }}</p>
          </div>
        </div>
      </li>
    </ul>

    <div class="used">
      <p
        class="used-p"
        @click="used = !used">{{ lang.expiredCoupon }} <i
          v-show="!used"
          class="icon iconfont">&#xe633;</i><i
            v-show="used"
            class="icon iconfont">&#xe632;</i></p>
      <ul v-show="used">
        <li
          v-for="(item,index) in disableCoupons"
          :key="index">
          <div class="expir expired">
            <div class="title">
              <div class="img"><span class="icon"/></div>
            </div>
            <div
              v-if="item.discountType === 1"
              class="price-count">
              <p>
                <span>{{ item.discountAmount }}% OFF</span>
              </p>
            </div>
            <div
              v-if="item.discountType === 2"
              class="price">
              <p>HKD {{ item.priceNum }}</p>
            </div>

            <div class="coupon-name">
              <div class="couponTwo">
                <div class="couponCode">{{ lang.code }}{{ item.code }}</div>
                <div class="couponTime">{{ lang.left1 }} {{ item.canUseNum }} {{ lang.left2 }}</div>
              </div>

            </div>
            <div class="rule">
              <p class="p">{{ item.condition }}</p>
              <p>{{ item.startTime }} - {{ item.endTime }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'MyAccountCoupon',
  data() {
    return {
      lang: this.$LANGUAGE.personal.account,
      enableCoupons: [],
      disableCoupons: [],
      used: false,
      nowTime: new Date().getTime()
    };
  },
  created() {
    this.getCoupon();
  },
  methods: {
    getCoupon() {
      this.$axiosGet('/web/myAccount/getCpupon')
        .then(res => {
          console.log('coupon===>', res);
          // if (res.data) {
          //   let arrActive = [];
          //   let arrDie = [];
          //   for (let i in res.data) {
          //     res.data[i].priceNum = `${this.$store.state.currencyType} ${res.data[i].discountAmount}`;
          //     res.data[i].time = moment(res.data[i].startTime).format('YYYY/MM/DD') + ' - ' + moment(res.data[i].endTime).format('YYYY/MM/DD');
          //     res.data[i].rule = res.data[i].totalSum ? `${this.lang.full}${this.$store.state.currencyType} ${res.data[i].totalSum}${this.lang.use}` : `${this.lang.useAnyway}`;
          //     if (res.data[i].status === 3) {
          //       res.data[i].price = `${this.$store.state.currencyType} ${res.data[i].discountAmount}`;
          //       this.loseList.push(res.data[i]);
          //     } else if (res.data[i].status === 4) {
          //       arrDie.push(res.data[i]);
          //     } else if (res.data[i].status) {
          //       arrActive.push(res.data[i]);
          //     }
          //   }
          //   for (let i in arrActive) {
          //     this.list.push(arrActive[i]);
          //   }
          //   for (let i in arrDie) {
          //     this.list.push(arrDie[i]);
          //   }
          // }

          const dealCouponInfo = info => {
            info.couponsNum =
              typeof info.couponsNum === 'number'
                ? info.couponsNum
                : 'unlimited';
            info.usedNum = info.usedNum || 0;
            info.userCouponsNum = info.userCouponsNum || 0;
            info.userUsedNum = info.userUsedNum || 0;

            // 转换日期格式
            info.startTime = moment(info.startTime).format('YYYY.MM.DD HH:mm');
            info.endTime = moment(info.endTime).format('YYYY.MM.DD HH:mm');

            // // 用户可用剩余次数
            // const userLaveNum = info.userCouponsNum - info.userUsedNum
            //
            // // 判断优惠码总数是否为无限次
            // if (info.couponsNum === 'unlimited') {
            //   info.canUseNum = userLaveNum
            // } else {
            //   // 优惠券总剩余次数
            //   const laveNum = info.couponsNum - info.usedNum
            //   info.canUseNum = Math.min(laveNum, userLaveNum)
            // }
            info.canUseNum =
              info.surplusCouponsNum === -1 ? '∞' : info.surplusCouponsNum;

            // 组合条件信息
            info.limitAmount = info.limitAmount || 0;
            if (info.limitType === 1) {
              info.condition = `${this.lang.fb1} ${info.limitAmount} ${
                this.lang.fb2
              }`;
            } else if (info.limitType === 2) {
              info.condition = `${this.lang.sb1} ${info.limitAmount} ${
                this.lang.sb2
              }`;
            } else {
              info.condition = `${this.lang.only} ${this.lang.unlimited} ${
                this.lang.sb2
              }`;
            }
            return info;
          };

          this.enableCoupons = res.data.enableCoupons.map(item => {
            item = dealCouponInfo(item);
            item.availableStatus = 'available';
            return item;
          });
          this.disableCoupons = res.data.disableCoupons.map(item => {
            item = dealCouponInfo(item);
            item.canUseNum = 0;
            item.availableStatus = 'unavailable';
            return item;
          });
          console.log(this.enableCoupons, this.disableCoupons);
        }).catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="less">
  .coupon {
    .used {
      .used-p {
        font-size: 16px;
        line-height: 20px;
        text-align: left;
        color: #333333;
        margin-bottom: 30px;

        i {
          font-size: 12px;
          line-height: 20px;
          cursor: pointer;
        }
      }
    }

    ul {
      li {
        .expir {
          position: relative;
          float: left;
          width: 292px;
          height: 186px;
          background-image: url('../../../static/images/personal/account/bg-expired.png');
          background-size: 292px 102px;
          background-repeat: no-repeat;
          border: 1px solid #f29b87;
          border-radius: 10px;
          margin-right: 30px;
          margin-bottom: 30px;
          padding: 20px 20px 0;
          overflow: hidden;

          .title {
            .img {
              float: left;
              width: 40px;
              height: 40px;
              margin: 0;
              padding: 6px;
              background: #FFFFFF;
              border-radius: 20px;

              .icon {
                display: inline-block;
                width: 28px;
                height: 28px;
                background: url('../../../static/images/personal/account/loose-drill.png');
                background-size: cover;
              }
            }
          }

          .price {
            height: 50px;
            text-align: right;
            color: #FFFFFF;

            p {
              font-size: 24px;
              line-height: 24px;
              font-family: twCenMt;
            }

            span {
              font-size: 14px;
              line-height: 28px;
            }
          }

          .price-count {
            width: 250px;
            height: 50px;
            color: #FFFFFF;
            text-align: right;
            p {
              width: 210px;
              height: 50-14px;
              font-size: 50-14px;
              line-height: 50-14px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              img {
                display: block;
                height: 50-14px;
              }
            }
            div {
              font-size: 14px;
              line-height: 14px;
            }
          }

          .couponTwo {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .coupon-name {
            height: 30px;
            color: #FFFFFF;
            font-size: 14px;
            line-height: 14px;
            text-align: left;
          }

          .rule {
            text-align: left;
            padding-top: 10px;

            p {
              font-size: 12px;
              line-height: 14px;
              color: #f19b87;
            }

            .p {
              font-size: 14px;
              margin: 12px 0 8px;
            }
          }

          .time {
            position: absolute;
            top: 10px;
            left: 160px;
            width: 100px;
            height: 28px;
            background: #FFFFFF;
            color: #282828;
            font-size: 18px;
            line-height: 28px;
            text-align: center;
            padding: 5px 50px;
            transform: rotate(45deg);
            opacity: 0.9;
          }
        }

        .expired {
          background-image: url('../../../static/images/personal/account/bg-used.png');
          background-size: 292px 102px;
          background-repeat: no-repeat;
          border: 1px solid #666666;

          .title {
            .img {
              .icon {
                background: url('../../../static/images/personal/account/loose-drill-used.png');
              }
            }
          }

          .rule {
            p {
              color: #333333;
            }
          }
        }
      }

      li:nth-child(3n) {
        .expir {
          margin-right: 0;
        }
      }
    }
  }
</style>
