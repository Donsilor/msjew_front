<template>
  <div class="anonymous-detail">
    <div class="content">
      <div class="top">
        <i class="icon iconfont iconguanbi" @click="goCart"></i>
        <h4>{{ lang.titlte }}</h4>
        <div>
          <p>{{ lang.tips1 }}</p>
          <p>{{ lang.tips2 }}</p>
          <p>{{ lang.tips3 }}</p>
        </div>
      </div>
      <CartList :list="list" type="1" />
      <div class="footer">
        <div class="more">
          <div class="address">
            <i class="icon iconfont icon_songhuozhengce"></i>
            <h6>
              {{ info.orderAddress.firstName }} {{ info.orderAddress.lastName }}
            </h6>
            <h6>
              {{ info.orderAddress.userTelCode }}
              {{ info.orderAddress.userTel }}
            </h6>
            <p>
              {{ info.orderAddress.countryName }}-{{
                info.orderAddress.provinceName
              }}-{{ info.orderAddress.cityName }}-{{
                info.orderAddress.address
              }}
            </p>
            <p>{{ info.orderAddress.zipCode }}</p>
            <p>{{ info.orderAddress.userMail }}</p>
          </div>
          <div class="express">
            <i class="icon iconfont icon_shoujianxinxi"></i>
            <h6 v-if="info.allSend === 1">{{ lang.send }}</h6>
            <p>
              {{ lang.send }}
              <a @click="goDeliveryPolicy">{{ lang.look }}</a>
            </p>
            <p>{{ lang.afterMail }}{{ info.afterMail }}</p>
            <p>{{ lang.remark }}{{ info.userRemark }}</p>
          </div>
        </div>
        <ul class="price">
          <li>
            <span>{{ lang.allFee }} </span
            ><span
              >{{ info.coinType }}{{ formatMoney(info.productAmount) }}</span
            >
          </li>
          <!--          <li v-if="info.taxFee">-->
          <!--            <span>{{ lang.preferFee }}</span-->
          <!--            ><span class="active"-->
          <!--              >-{{ info.coinType }}{{ formatMoney(info.preferFee) }}</span-->
          <!--            >-->
          <!--          </li>-->
          <li>
            <span>{{ lang.logisticsFee }}</span
            ><span
              >+{{ info.coinType }}{{ formatMoney(info.logisticsFee) }}</span
            >
          </li>
          <li>
            <span>{{ lang.taxFee }} </span
            ><span>+{{ info.coinType }}{{ formatMoney(info.taxFee) }}</span>
          </li>
          <li>
            <span>{{ lang.safeFee }}</span
            ><span>+{{ info.coinType }}{{ formatMoney(info.safeFee) }}</span>
          </li>
          <li>
            <span>{{ lang.transPreferFee }}</span
            ><span class="active"
              >-{{ info.coinType }}{{ formatMoney(info.transPreferFee) }}</span
            >
          </li>
          <div class="all">
            <span>{{ lang.orderAmount }}</span
            ><span
              ><em>+{{ info.coinType }} </em>{{ formatMoney(info.orderAmount) }}
            </span>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { formatMoney } from '@/assets/js/filterUtil.js'
import CartList from '@/components/cart/detailslist.vue'
export default {
  name: 'AnonymousDetail',
  layout: 'no-bar',
  components: {
    CartList
  },
  data() {
    return {
      lang: this.LANGUAGE.cart.anonymousDetail,
      list: [],
      info: JSON.parse(this.$route.query.info),
      barIndex: 0
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    formatMoney: formatMoney,
    getInfo() {
      this.$axios({
        method: `get`,
        url: `/wap/myOrder/getOrderDetails`,
        params: {
          orderId: this.info.orderAddress.orderId
        }
      })
        .then(data => {
          console.log('data====>', data)
          this.doFormat(data.details)
        })
        .catch(err => {
          console.log(err)
        })
    },
    goCart() {
      this.$router.replace({
        name: 'index'
      })
    },
    goDeliveryPolicy() {
      this.$router.push({
        name: 'help-pages-deliveryPolicy'
      })
    },
    // 格式化数据列表
    doFormat(res) {
      console.log('res', res)
      this.list = []
      if (res && res.length > 0) {
        res.map((item, index) => {
          const o = {
            isSelect: false,
            goodsImages: item.goodsImages,
            goodsName: item.goodsName,
            config: item.detailSpecs,
            sku: item.goodsCode,
            salePrice: item.goodsPrice,
            groupType: item.groupType || 0,
            createTime: item.joinCartTime,
            goodsId: item.goodsId,
            goodsDetailsId: item.goodsDetailsId,
            id: item.id,
            localSn: item.localSn,
            groupId: item.groupType === 1 ? item.groupId : null,
            goodsStatus: 2
          }
          this.list.push(o)
        })
        console.log('list>', this.list)
      } else {
      }
    },
    barIndexChange(val) {
      this.barIndex = val
    }
  }
}
</script>

<style scoped lang="less">
.anonymous-detail {
  .content {
    .top {
      text-align: right;
      padding: 18px 15px 20px;
      .iconguanbi {
        color: #666666;
      }
      h4 {
        font-size: 16px;
        line-height: 16px;
        text-align: center;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin: 14px 0 20px;
      }
      div {
        width: 100%;
        background: rgba(248, 244, 241, 1);
        border-radius: 5px;
        font-size: 12px;
        font-weight: 400;
        word-break: keep-all;
        color: rgba(148, 116, 101, 1);
        line-height: 20px;
        padding: 10px 12px;
        text-align: left;
      }
    }
    .footer {
      width: 100%;
      display: inline-block;
      background: #f2f2f2;

      .more {
        width: 93%;
        margin: 10px 3.5% 0;
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
            a {
              margin-left: 5px;
              text-decoration: underline;
              color: rgba(148, 116, 101, 1);
            }
          }
        }

        .express {
          margin-top: 20px;
        }
      }

      .price {
        display: inline-block;
        width: 93%;
        margin: 10px 3.5%;
        padding: 20px 26px 30px;
        background: #ffffff;
        border-radius: 8px;

        li {
          width: 100%;
          height: 30px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          .active {
            color: #947465;
          }
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
          border-top: 1px solid #dddddd; /*no*/
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
    }
  }
}
</style>
