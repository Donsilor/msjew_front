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
              <span class="text">{{ item.text }}<span v-if="item.num > 0" class="tip">{{ item.num }}</span></span>
              
              
              <span class="line"></span>
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
          text: this.LANGUAGE.personal.order.all,
          num:0
        },
        {
          code: 10,
          text: this.LANGUAGE.personal.order.waitingPay,
          num:0
        },
        {
          code: 30,
          text: this.LANGUAGE.personal.order.waitingSend,
          num:0
        },
        {
          code: 40,
          text: this.LANGUAGE.personal.order.waitingReceive,
          num:0
        },
        {
          code: 50, // 传5表示待評價的订单(后端确定的逻辑)
          text: this.LANGUAGE.personal.order.waitingComment,
          num:0
        }
      ],
      orderStatus: 0,
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
      }
    }
  },
  created(){
    this.$axios({
      method: 'get',
      url: `/web/member/order`
    })
    .then(res => {
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
        for (const i in res.data) {
          const o = res.data[i]
          res.data[i].details.map(obj => {
            obj.goodsImages = obj.goodsImages.split(',')[0]
            obj.detailSpecs = JSON.parse(obj.detailSpecs)
            obj.link = `132`
          })
          // console.log("llllll",res.data.data[i].orderStatus)
          if (res.data[i].orderStatus == 10) {
            //  没给钱
            this.list.ordered.push(o)
            // console.log("777777",o)
          } else if (res.data[i].orderStatus == 20||res.data[i].orderStatus == 30) {

            //  给了钱没发货
            this.list.paid.push(o)
          } else if (res.data[i].orderStatus == 40) {
            //  发了货没收到
            this.list.send.push(o)
          } else if (res.data[i].orderStatus == 50) {
            //  订单完成了
            this.list.finished.push(o)
          } else if (res.data[i].orderStatus === 5) {
            //  收到货了没评论
            this.list.receive.push(o)
          } else if (res.data[i].orderStatus === 6) {
            //  已经评论了
            this.list.comment.push(o)
          } else if (res.data[i].orderStatus === 7) {
            //  可以申请售后退货
            this.list.apply.push(o)
          } else if (res.data[i].orderStatus === 8) {
            //  退货中
            this.list.returning.push(o)
          } else if (res.data[i].orderStatus === 9) {
            //  退货完成了
            this.list.returned.push(o)
          } else if (res.data[i].orderStatus === 10) {
            //  订单取消了
            this.list.closed.push(o)
          }
        }
        this.statusList[0].num = res.total_count
        this.statusList[1].num = this.list.ordered.length
        this.statusList[2].num = this.list.paid.length
        this.statusList[3].num = this.list.send.length
        this.statusList[4].num = this.list.finished.length
      console.log("tttt",this.statusList[1])
    })
    .catch(err => {
      console.log(err)
    })
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
      // console.log('val',this.orderStatus)
    },
    arrivalBottom() {
      // console.log(3333333)
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
        height: 45px;
        line-height: 45px;
        padding: 0 14px;
        justify-content: space-around;
        li {
          position: relative;
          display: inline-block;
          width: 20%;
          height: 45px;
          font-size: 14px;
          line-height: 45px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          .text{
            position: relative;
            .tip{
              position: absolute;
              // display: block;
              top: -56%;
              left: 97%;
              width: 16px;
              height: 16px;
              line-height: 17px;
              border-radius: 100%;
              text-align: center;
              color: #ffffff;
              font-size: 10px;
              background-color: #f29b87;
              box-sizing: border-box;
              // border-radius: 15px;
              // color: #fff;
              // display: inline-block;
              // font-size: 12px;
              // height: 18px;
              // line-height: 18px;
              // padding: 0 6px;
              // text-align: center;
              // white-space: nowrap;
              // background-color: #f29b87;
            }
          }
          .line {
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
          font-size: 14px;
          color: #f29b87;

          .line {
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
