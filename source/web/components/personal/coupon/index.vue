<template>
  <div class="coupon">
    <div class="pink-title">
      <div class="pink-line" />
      <div class="title-name">{{ $t(`${lang}.coupon`) }}</div>
    </div>
    <div class="available">
      <div v-for="(item, index) in enableCoupons" :key="index">
        <div
          :class="[
            'expir',
            { expired: item.status === 4 },
            { expired: item.expired === 'true' }
          ]"
        >
          <!--金额巴拉巴拉-->
          <div class="title">
            {{ discountAmount }}
            <div class="img"><span class="icon" /></div>
            <!--百分比巴拉巴拉-->
            <div v-if="item.discountType === 1" class="price-count">
              <p>
                <span>{{ item.discountAmount }}% OFF</span>
              </p>
            </div>
            <div v-if="item.discountType === 2" class="price">
              <p>HKD {{ item.discountAmount }}</p>
            </div>
          </div>

          <div class="coupon-name">
            <div class="couponTwo">
              <div class="couponCode">
                {{ $t(`${lang}.code`) }}{{ item.code }}
              </div>
              <div class="couponTime">
                {{ $t(`${lang}.left1`) }} {{ item.canUseNum }}
                {{ $t(`${lang}.left2`) }}
              </div>
            </div>
          </div>
          <div class="rule">
            <p class="p">{{ item.condition }}</p>
            <p>{{ item.startTime }} - {{ item.endTime }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-words" @click="isShow = !isShow">
      {{ $t(`${lang}.expiredCoupon`) }} {{ isShow ? `-` : `+` }}
    </div>
    <div v-show="isShow" class="unavailable">
      <div v-for="(item, index) in disableCoupons" :key="index">
        <div class="expir expired">
          <div class="title">
            <div class="img"><span class="icon" /></div>
            <div v-if="item.discountType === 1" class="price-count">
              <p>
                <span>{{ item.discountAmount }}% OFF</span>
              </p>
            </div>
            <div v-if="item.discountType === 2" class="price">
              <p>HKD {{ item.priceNum }}</p>
            </div>
          </div>

          <div class="coupon-name">
            <div class="couponTwo">
              <div class="couponCode">
                {{ $t(`${lang}.code`) }}{{ item.code }}
              </div>
              <div class="couponTime">
                {{ $t(`${lang}.left1`) }} {{ item.canUseNum }}
                {{ $t(`${lang}.left2`) }}
              </div>
            </div>
          </div>
          <div class="rule">
            <p class="p">{{ item.condition }}</p>
            <p>{{ item.startTime }} - {{ item.endTime }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
const lang = 'personal.index'
export default {
  name: 'Index',
  data() {
    return {
      lang,
      enableCoupons: [],
      disableCoupons: [],
      isShow: false,
      nowTime: new Date().getTime()
    }
  },
  created() {
    this.getCoupon()
  },
  methods: {
    getCoupon() {
      this.$axios
        .get('/web/myAccount/getCpupon')
        .then(res => {
          console.log('coupon===>', res)

          const dealCouponInfo = info => {
            info.couponsNum =
              typeof info.couponsNum === 'number'
                ? info.couponsNum
                : 'unlimited'
            info.usedNum = info.usedNum || 0
            info.userCouponsNum = info.userCouponsNum || 0
            info.userUsedNum = info.userUsedNum || 0

            // 转换日期格式
            info.startTime = moment(info.startTime).format('YYYY.MM.DD HH:mm')
            info.endTime = moment(info.endTime).format('YYYY.MM.DD HH:mm')

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
              info.surplusCouponsNum === -1 ? '∞' : info.surplusCouponsNum

            // 组合条件信息
            info.limitAmount = info.limitAmount || 0
            if (info.limitType === 1) {
              info.condition =
                this.$t(`${lang}.fb1`) +
                ' ' +
                info.limitAmount +
                ' ' +
                this.$t(`${lang}.fb2`)
            } else if (info.limitType === 2) {
              info.condition =
                this.$t(`${lang}.sb1`) +
                ' ' +
                info.limitAmount +
                ' ' +
                this.$t(`${lang}.sb2`)
            } else {
              info.condition =
                this.$t(`${lang}.only`) +
                ' ' +
                this.$t(`${lang}.unlimited`) +
                ' ' +
                this.$t(`${lang}.sb2`)
            }
            return info
          }

          this.enableCoupons = res.enableCoupons.map(item => {
            item = dealCouponInfo(item)
            item.availableStatus = 'available'
            return item
          })
          this.disableCoupons = res.disableCoupons.map(item => {
            item = dealCouponInfo(item)
            item.canUseNum = 0
            item.availableStatus = 'unavailable'
            return item
          })
          // console.log(this.enableCoupons, this.disableCoupons)
        })
        .catch(err => {
          if (!err.response) {
            this.$message.error(err.message)
          } else {
            // console.log(err)
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
.coupon {
  width: 100%;
  padding: 30px 0;
  .pink-title {
    display: flex;
    align-items: center;
    margin-bottom: 39px;
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
  .available,
  .unavailable {
    display: flex;
    flex-wrap: wrap;
    .expir {
      box-sizing: border-box;
      width: 292px;
      height: 186px;
      background-image: url('../../../static/personal/account/bg-expired.png');
      background-size: 292px 102px;
      background-repeat: no-repeat;
      border: 1px solid #f29b87;
      border-radius: 10px;
      margin-right: 30px;
      margin-bottom: 30px;
      padding: 20px 20px 0;
      overflow: hidden;

      .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .img {
          box-sizing: border-box;
          display: block;
          width: 40px;
          height: 40px;
          margin: 0;
          padding: 6px;
          background: #ffffff;
          border-radius: 20px;

          .icon {
            display: inline-block;
            width: 28px;
            height: 28px;
            background: url('../../../static/personal/account/loose-drill.png');
            background-size: cover;
          }
        }
      }

      .price {
        height: 50px;
        text-align: right;
        color: #ffffff;

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
        /*width: 250px;*/
        height: 50px;
        color: #ffffff;
        text-align: right;
        p {
          /*width: 210px;*/
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
        color: #ffffff;
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
        background: #ffffff;
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
      background-image: url('../../../static/personal/account/bg-used.png');
      background-size: 292px 102px;
      background-repeat: no-repeat;
      border: 1px solid #666666;

      .title {
        .img {
          .icon {
            background: url('../../../static/personal/account/loose-drill-used.png');
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
  .middle-words {
    font-size: 16px;
    line-height: 20px;
    color: #333333;
    margin-bottom: 30px;
    display: inline-block;
    cursor: pointer;
  }
}
</style>
