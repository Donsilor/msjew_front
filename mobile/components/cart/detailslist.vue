<template>
  <div class="cart-list">
    <div class="content">
      <div class="mod">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <div
              v-if="
                !(index !== 0 && item.createTime === list[index - 1].createTime)
              "
              class="mod-item"
            >
              <img :src="imageStrToArray(item.goodsImages)[0]" />
              <div class="right">
                <h4 class="ow-h2">{{ item.goodsName }}</h4>
                <p>SKU：{{ item.sku }}</p>
                <p class="p">
                  {{ getconfig(item.config) }}
                </p>
                <b>{{ coin }} {{ formatMoney(item.salePrice) }}</b>
                <div v-if="item.groupType === 1" class="btn-type">
                  {{ lang.ring }}
                </div>
                <div v-if="item.groupType === 2" class="btn-type">
                  {{ lang.coustom }}
                </div>
                <div v-if="item.groupType !== 0 && index !== list.length - 1">
                  <h4 v-if="item.groupType === 2" class="ow-h2 margin-top-10">
                    {{ list[index + 1].goodsName }}
                  </h4>
                  <p :class="item.groupType === 2 ? '' : 'margin-top-10'">
                    SKU：{{ list[index + 1].sku }}
                  </p>
                  <p class="p">
                    {{ getconfig(list[index + 1].config) }}
                  </p>
                  <b>{{ coin }} {{ formatMoney(list[index + 1].salePrice) }}</b>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { formatMoney } from '@/assets/js/filterUtil.js'
export default {
  props: {
    list: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    type: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.cart.anonymousDetail,
      coin: this.$store.state.coin,
      selectIndex: true,
      tex: {
        logisticsFee: 0,
        taxFee: 0,
        safeFee: 0,
        orderAmount: 0
      },
      num: 1
    }
  },
  methods: {
    formatMoney: formatMoney,
    // 属性数值转化成字符串
    getconfig(list) {
      let text = ''
      if (list.length > 0) {
        JSON.parse(list).map((item, index) => {
          if (index === list.length - 1) {
            text = text + item.value
          } else {
            text = text + item.value + ' /  '
          }
        })
      }
      return text
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.cart-list {
  .content {
    display: inline-block;
    width: 100%;
    .mod {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      ul {
        background: #f2f2f2;
        .mod-item {
          display: inline-block;
          width: 93%;
          background: #ffffff;
          padding: 34px 3.5% 20px;
          margin: 10px 12px 0;
          border-radius: 5px;
        }
        li {
          img {
            float: left;
            width: 75px;
            height: 75px;
          }
          .right {
            margin-left: 90px;
            text-align: left;
            h4 {
              display: inline-block;
              max-height: 40px;
              font-size: 14px;
              line-height: 20px;
              font-family: PingFangHK-Regular;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
            span {
              float: right;
              font-size: 14px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
            }
            p {
              font-size: 13px;
              line-height: 22px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
            .p {
              margin-bottom: 4px;
            }
            b {
              font-size: 17px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(243, 163, 145, 1);
              font-family: twCenMt;
            }
            .btn-type {
              width: 80px;
              height: 20px;
              margin-left: -92px;
              text-align: center;
              background: rgba(245, 240, 236, 1);
              border: 1px solid rgba(215, 202, 196, 1);
              border-radius: 2px;
              font-size: 12px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(148, 116, 101, 1);
            }
          }
        }
      }
    }
  }
}
</style>
