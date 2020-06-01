<template>
  <div class="get-coupon">
    <div class="wrap">
      <div class="title">{{ lang.getCoupon }}
        <i class="iconfont iconguanbi" @click="closeCoupon()"></i>
      </div>

      <div class="coupon-box">
        <!-- 优惠券列表 -->
        <div class="box-r">
          <div v-if="loadFinish" class="list" v-for="(item, index) in couponList" :key="index">
            <div class="list-l">
              <div class="line-box">
                <div class="point-box">
                  <i></i><i></i><i></i><i></i>
                </div>
              </div>

              <div class="price">
                <span class="price-icon">￥</span>
                <span class="price-num">{{item.money}}</span>
              </div>
              <!-- <div class="rmb">(￥{{item.money_cn}})</div> -->
              <div class="rule">{{ lang.limit1 }}{{coin}} {{item.at_least}}{{ lang.limit2 }}</div>
              <div class="text">{{ lang.limit3 }}( {{item.lineType}}) {{ lang.limit4 }}</div>
              <div class="time">{{ lang.time }}：{{changeTime(item.start_time)}} - {{changeTime(item.end_time)}}</div>
            </div>

            <div class="get" @click="getCoupon(index)">
              <div>
                <span v-if="!item.ifUse">Collect it now</span>
              </div>
            </div>

            <div class="already" v-if="item.ifUse">{{ lang.alreadyReceived }}</div>
          </div>
        </div>

        <div class="finish" @click="closeCoupon(true)">{{ lang.accomplish }}</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      moneyInfo: {
        type: [Object],
        required: false,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        lang: this.LANGUAGE.coupon,
        language: '',
        couponList: [],
        ifLoading: false,
        loadFinish: false
      }
    },
    mounted() {
      this.language = this.getCookie('language')
      this.coin = this.$store.state.coin

      if(this.moneyInfo){
        var i=0;
        for(var j in this.moneyInfo){
          this.couponList[i] = this.moneyInfo[j];
          this.couponList.ifUse = false;
          this.couponList.ifChoose = false;

          this.couponList[i].lineType = [];
          for(var k in this.moneyInfo[j].goods_type){
            this.couponList[i].lineType.push(this.moneyInfo[j].goods_type[k]);
          }

          this.couponList[i].lineType = this.couponList[i].lineType.join(',');

          i++;
        }
        this.couponList = [...this.couponList]
      }

      if(this.couponList.length != 0){
        // 可用的优惠券
        this.$nuxt.$loading.start()
        this.$axios.get('web/member/coupon/index', {
          })
          .then(res => {
            this.$nuxt.$loading.finish()
            var couponAllList = res.data;

            // 判断可用优惠券中哪些是已领取的优惠券
            for(var i=0; i<this.couponList.length; i++){
              this.couponList[i].ifUse = false;
              for(var j=0; j<couponAllList.length; j++){
                if(this.couponList[i].coupon_id == couponAllList[j].couponId && couponAllList[j].couponStatus==1){
                  this.couponList[i].ifUse = true;
                }
              }
            }

            this.loadFinish = true;
          })
          .catch(err => {
            this.loadFinish = true;
            this.$nuxt.$loading.finish()
            console.log(err)
          })
      }
    },
    methods: {
      // 获取cookie
      getCookie(cname) {
        const name = cname + '='
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
          const c = ca[i].trim()
          if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
        }
        return ''
      },
      // 关闭弹窗,获取优惠券
      closeCoupon(k) {
        if(k){
          var arr = [];
          this.couponList.forEach(o => {
            if(o.ifChoose){
              arr.push(o.coupon_id)
            }
          })
        }

        this.$emit('closeCoupon', true)
      },
      // 领取优惠券
      getCoupon(k) {
        // this.$nuxt.$loading.start()
        this.loadFinish = false;
        this.$axios.post('web/member/coupon/fetch', {
          coupon_id: this.couponList[k].coupon_id
        })
        .then(res => {
          this.couponList[k].ifUse = true;
          this.loadFinish = true;
          // this.$nuxt.$loading.finish()
          this.$toast.show(`优惠券领取成功`)
        })
        .catch(err => {
          this.loadFinish = true;
          // this.$nuxt.$loading.finish()
          this.$toast.show(`领取失败`)
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .get-coupon {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1200;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);

    .wrap {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      height: 100%;
      overflow-y: auto;

      .title {
        font-size: 20px;
        text-align: center;
        padding: 20px 0;
        position: relative;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        .iconfont {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border: 1px solid #999;
          text-align: center;
          line-height: 22px;
          border-radius: 50%;
          font-size: 10px;
          color: #999;
        }
      }

      .coupon-box {
        width: 100%;
        padding: 0 5%;
        box-sizing: border-box;

        .box-r {
          width: 100%;
          min-height: 400px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;

          .list {
            width: 100%;
            display: flex;
            align-items: center;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.31), rgba(219, 209, 209, 0.31));
            box-shadow: 0 1px 0 #9C999C, 0 2px 0 #D6D5D6, 0 3px 0 #E3E1E3, 0 4px 0 #D6D5D6, 0 5px 0 #EDECED, 0 6px 0 #F9F9F9;
            border: 1px solid rgb(205, 173, 118);
            border-bottom: 0;
            margin-bottom: 20px;
            flex-shrink: 0;
            flex-grow: 0;
            overflow: hidden;
            box-sizing: border-box;
            position: relative;

            .list-l {
              position: relative;
              width: 70%;
              color: #cdad75;
              border-radius: 5px;
              padding: 20px 10px;
              box-sizing: border-box;

              .line-box {
                width: 70%;
                height: 1px;
                background-color: #A6937C;
                margin: 4px auto 6px;
                position: relative;

                .point-box {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 60px;
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  background-color: #fff;
                  background-image: linear-gradient(to right, #fcfafb, #f9f7f8);
                  padding: 0 6px;

                  i {
                    width: 4px;
                    height: 4px;
                    background-color: #A6937C;
                    border-radius: 50%;
                  }
                }
              }

              .price {
                // height: 100px;
                width: 100%;
                display: flex;
                justify-content: center;
                margin-top: 10px;

                .price-icon {
                  font-size: 18px;
                }

                .price-num {
                  font-size: 26px;
                  color: #cdad75;
                  margin: 0px 0 0 0px;
                  padding-right: 10px;
                }
              }

              .rmb{
                font-size: 14px;
                text-align: center;
              }

              .rule {
                height: 30px;
                line-height: 30px;
                font-size: 13px;
                text-align: center;
                margin: 0 0 4px;
              }

              .btn {
                width: 190px;
                height: 28px;
                margin: 0 auto;
                background-color: #cdad75;
                font-size: 13px;
                color: #fff;
                text-align: center;
                line-height: 28px;
                border-radius: 2px;
                cursor: pointer;
              }

              .text {
                text-align: center;
                font-size: 12px;
                color: #bfb8b8;
                margin-bottom: 10px;
              }

              .time {
                font-size: 13px;
                color: #cdad75;
                text-align: center;
                margin-top: 4px;
              }

              .lose-efficacy {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 120px;
                height: 120px;
                background-color: #a0a0a0;
                border-radius: 50%;
                font-size: 25px;
                text-align: center;
                line-height: 120px;
                color: #fff;
                opacity: 0.9;
              }
            }

            .get {
              width: 30%;
              height: 70px;
              border-left: 1px solid #f00;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              color: #bd4444;
              position: relative;

              div{
                width: 100%;
                height: auto;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                line-height: 16px;

                span {
                  padding: 10px;
                  box-sizing: border-box;
                }
              }
            }
          }
        }

        .not-choose {
          margin: 30px 0;
          line-height: 22px;
          font-size: 18px;
          cursor: pointer;

          .icon-box {
            width: 20px;
            height: 20px;
            border: 1px solid red;
            margin-right: 10px;
          }
        }

        .finish {
          width: 160px;
          height: 44px;
          text-align: center;
          line-height: 44px;
          border-radius: 3px;
          margin: 40px auto;
          font-size: 16px;
          background-color: #ececec;
          border: 1px solid #333;
          cursor: pointer;
        }
      }

    }
  }

  .list:nth-child(even) {
    margin-right: 0 !important;
  }

  .list .lose-efficacy.fontSize {
    font-size: 16px;
  }

  .coupon-box::-webkit-scrollbar {
    display: none
  }

  .already{
    position: absolute;
    right: -16px;
    top: 46%;
    width: 80px;
    height: 80px;
    background: url(../../../static/subject/icon_07.png) no-repeat center;
    background-size: 100% 100%;
    font-size: 14px;
    text-align: center;
    color: #fff;
    line-height: 80px;
    box-sizing: border-box;
    letter-spacing: 2px;
    transform: translateY(-50%) rotate(-45deg);
  }
</style>
