<template>
  <div class="coupon">
    <Header :title="lang.header" />
    <div class="content">
      <div class="top-bar">
        <ul>
          <li
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: activeTab === item.key }"
            @click="changeActiveTab(item.key)"
          >
            {{ item.name }}
            <span></span>
          </li>
        </ul>
      </div>
      <div class="mod">
        <ul class="coupons">
          <li
            v-for="(item, index) in coupons"
            v-show="['all', item.availableStatus].indexOf(activeTab) > -1"
            :key="index"
            :class="['coupon', item.availableStatus]"
          >
            <div class="bg">
              <img
                v-if="item.availableStatus === 'available'"
                src="/personal/coupon-active-bg.png"
              />
              <img v-else src="/personal/coupon-bg.png" />
            </div>
            <div class="content">
              <!--              比例-->
              <div v-if="item.discountType === 1" class="left proportion">
                <div class="type">
                  off
                </div>
                <div class="number">
                  <span>{{ item.discountAmount }}</span>
                  <span class="symbol">%</span>
                </div>
              </div>
              <!--              减去数值-->
              <div v-if="item.discountType === 2" class="left cut">
                <div class="type">
                  HKD
                </div>
                <div class="number">
                  <span>{{ item.discountAmount }}</span>
                </div>
              </div>
              <div class="right">
                <div class="info">
                  <div class="info-left">
                    <div class="code-title">
                      {{ lang.code }}
                    </div>
                    <div class="code">
                      {{ item.code }}
                    </div>
                  </div>
                  <div class="info-right">
                    <nuxt-link to="/">
                      <button class="to-use">{{ lang.goUse }}</button>
                    </nuxt-link>
                    <div class="lave">
                      {{ lang.left1 }} {{ item.canUseNum }} {{ lang.left2 }}
                    </div>
                  </div>
                </div>
                <div class="condition">
                  {{ item.condition }}
                </div>
                <div class="deadline">
                  {{ item.startTime }}-{{ item.endTime }}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <bdd-empty v-if="noListData" :type="'coupon'"></bdd-empty>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import { formatMoney } from '@/assets/js/filterUtil.js'
import Moment from 'moment'
export default {
  name: 'Coupon',
  layout: 'no-footer-bar',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE.personal.coupon,
      activeTab: 'all',
      tabs: [
        {
          key: 'all',
          name: this.LANGUAGE.personal.coupon.all
        },
        {
          key: 'available',
          name: this.LANGUAGE.personal.coupon.available
        },
        {
          key: 'unavailable',
          name: this.LANGUAGE.personal.coupon.unavailable
        }
      ],
      coin: this.$store.state.coin,
      loading: true,
      enableCoupons: [],
      disableCoupons: []
    }
  },
  computed: {
    coupons() {
      return [].concat(this.enableCoupons, this.disableCoupons)
    },
    noListData() {
      let length = 0
      if (this.activeTab === 'all') {
        length = this.coupons.length
      } else if (this.activeTab === 'available') {
        length = this.enableCoupons.length
      } else if (this.activeTab === 'unavailable') {
        length = this.disableCoupons.length
      }
      return !this.loading && length === 0
    }
  },
  created() {
    this.getCoupon()
  },
  updated() {
    const text = document.getElementsByClassName('title-ellipsis')
    for (let i = 0; i < text.length; i++) {
      this.$helpers.overflowHiddon(text[i])
    }
  },
  methods: {
    formatMoney: formatMoney,
    getCoupon() {
      const _this = this
      _this.loading = true
      _this
        .$axios({
          method: 'get',
          url: `/wap/myAccount/getCpupon`
        })
        .then(res => {
          _this.loading = false
          const dealCouponInfo = info => {
            info.couponsNum =
              typeof info.couponsNum === 'number'
                ? info.couponsNum
                : 'unlimited'
            info.usedNum = info.usedNum || 0
            info.userCouponsNum = info.userCouponsNum || 0
            info.userUsedNum = info.userUsedNum || 0

            // 转换日期格式
            info.startTime = Moment(info.startTime).format('YYYY.MM.DD HH:mm')
            info.endTime = Moment(info.endTime).format('YYYY.MM.DD HH:mm')

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
              info.condition = `${this.lang.fb1} ${info.limitAmount} ${
                this.lang.fb2
              }`
            } else if (info.limitType === 2) {
              info.condition = `${this.lang.sb1} ${info.limitAmount} ${
                this.lang.sb2
              }`
            } else {
              info.condition = `${this.lang.only} ${this.lang.unlimited} ${
                this.lang.sb2
              }`
            }
            return info
          }

          _this.enableCoupons = res.enableCoupons.map(item => {
            item = dealCouponInfo(item)
            item.availableStatus = 'available'
            return item
          })
          _this.disableCoupons = res.disableCoupons.map(item => {
            item = dealCouponInfo(item)
            item.canUseNum = 0
            item.availableStatus = 'unavailable'
            return item
          })
        })
        .catch(err => {
          _this.loading = false
          console.log(err)
        })
    },
    goIndex() {
      this.$router.push({
        name: 'index'
      })
    },
    changeActiveTab(key) {
      this.activeTab = key
    }
  }
}
</script>

<style scoped lang="less">
.coupon {
  width: 100%;
  min-height: 100%;
  background: #f2f2f2;
  .content {
    .top-bar {
      ul {
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 0 14px;
        background: #ffffff;
        justify-content: space-around;
        li {
          position: relative;
          display: inline-block;
          width: 25%;
          height: 44px;
          font-size: 14px;
          line-height: 40px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          span {
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 1px;
            height: 4px;
            margin-left: -25px;
            background: #ffffff;
            border-radius: 2px;
          }
        }
        /*li:nth-child(1) {*/
        /*  span {*/
        /*    width: 40px;*/
        /*    margin-left: -20px;*/
        /*  }*/
        /*}*/
        .active {
          font-size: 16px;
          color: #333333;
          span {
            width: 50px;
            background: rgba(242, 155, 135, 1);
            transition: 0.1s ease-out;
          }
        }
      }
    }
    .mod {
      padding: 16px;
      box-sizing: border-box;

      .coupons {
        list-style: none;

        .coupon {
          position: relative;
          margin-bottom: 16px;

          .bg {
            line-height: 0;
            font-size: 0;

            img {
              width: 100%;
            }
          }
          .content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: stretch;

            .left {
              width: 28.2%;
              height: 100%;
              padding-left: 15px;
              display: flex;
              flex-direction: column;
              align-items: stretch;
              justify-content: center;

              &.cut {
                .type {
                  font-size: 14px;
                  font-weight: 400;
                  color: #ffffff;
                  text-align: left;
                }
                .number {
                  text-align: left;
                  span {
                    font-size: 18px;
                    font-weight: 400;
                    color: #ffffff;
                  }
                }
              }

              &.proportion {
                .type {
                  font-size: 16px;
                  font-weight: 500;
                  color: #ffffff;
                  text-align: left;
                }
                .number {
                  text-align: left;
                  span {
                    font-size: 28px;
                    font-weight: 400;
                    color: #ffffff;
                  }
                  .symbol {
                    font-size: 14px;
                    font-weight: 500;
                    color: #ffffff;
                  }
                }
              }
            }
            .right {
              width: 71.8%;
              height: 100%;
              padding: 0 12px;
              display: flex;
              flex-direction: column;
              align-items: stretch;
              justify-content: center;

              .info {
                margin-bottom: 13px;
                display: flex;
                flex-direction: row;
                align-items: stretch;
                justify-content: space-between;

                .info-left {
                  .code-title {
                    margin-bottom: 3px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #333333;
                    text-align: left;
                  }
                  .code {
                    font-size: 14px;
                    font-weight: bold;
                    color: #333333;
                    text-align: left;
                  }
                }
                .info-right {
                  .to-use {
                    margin-bottom: 6px;
                    width: 65px;
                    height: 20px;
                    background: #f29b87;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: 400;
                    color: #ffffff;
                  }
                  .lave {
                    padding-right: 8px;
                    font-size: 9px;
                    font-weight: 400;
                    color: #393939;
                    text-align: right;
                  }
                }
              }

              .condition {
                margin-bottom: 2px;
                font-size: 12px;
                font-weight: 400;
                color: #999999;
                text-align: left;
              }

              .deadline {
                font-size: 12px;
                font-weight: 400;
                color: #999999;
                text-align: left;
              }
            }
          }

          &.unavailable {
            .to-use {
              visibility: hidden;
            }
          }
        }
      }
    }
  }
}
</style>
