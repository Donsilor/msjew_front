<template>
  <div class="list-page order">
    <scroll-box @arrivalBottom="arrivalBottom">
      <Header :title="lang.myOrder" @back="goBack" />
      <div class="content">
        <div class="top-bar">
          <ul>
            <li
              v-for="(item, index) in statusList"
              :key="index"
              :class="{ active: orderStatus === item.code }"
              @click="barActiveChange(item.code)"
            >
              {{ item.text }}
              <span></span>
            </li>
          </ul>
        </div>
        <OrderList ref="data-list" :order-status="orderStatus" />
      </div>
    </scroll-box>
  </div>
</template>

<script>
import Header from '@/components/personal/common-header.vue'
import OrderList from '@/components/personal/orderlist.vue'

export default {
  name: 'Order',
  layout: 'no-footer-bar',
  components: {
    Header,
    OrderList
  },
  data() {
    return {
      lang: this.LANGUAGE.personal.order,
      statusList: [
        {
          code: 0,
          text: this.LANGUAGE.personal.order.all
        },
        {
          code: 1,
          text: this.LANGUAGE.personal.order.waitingPay
        },
        {
          code: 2,
          text: this.LANGUAGE.personal.order.waitingSend
        },
        {
          code: 3,
          text: this.LANGUAGE.personal.order.waitingReceive
        },
        {
          code: 5, // 传5表示待評價的订单(后端确定的逻辑)
          text: this.LANGUAGE.personal.order.waitingComment
        }
      ],
      orderStatus: 0
    }
  },
  mounted() {
    this.arrivalBottom()
  },
  methods: {
    goBack() {
      this.$router.replace({
        name: 'personal'
      })
    },
    showSelect() {
      console.log('6767')
    },
    barActiveChange(val) {
      this.orderStatus = val
    },
    arrivalBottom() {
      this.$refs['data-list'].getNextPage &&
        this.$refs['data-list'].getNextPage()
    }
  }
}
</script>

<style scoped lang="less">
.order {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;

  .content {
    .top-bar {
      background-color: #ffffff;

      ul {
        display: inline-block;
        width: 100%;
        height: 44px;
        padding: 0 14px;
        justify-content: space-around;
        li {
          position: relative;
          display: inline-block;
          width: 20%;
          height: 44px;
          font-size: 14px;
          line-height: 40px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          span {
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 1px; /*no*/
            height: 4px;
            margin-left: -28px;
            background: #ffffff;
            border-radius: 2px;
          }
        }
        .active {
          font-size: 16px;
          color: #333333;

          span {
            width: 56px;
            background: rgba(242, 155, 135, 1);
            transition: 0.1s ease-out;
          }
        }
      }
    }
  }
}
</style>
