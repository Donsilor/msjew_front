<template>
  <div class="get-coupon">
    <div class="wrap">
      <div class="title">{{ $t(`${lang}.getCoupon`) }}
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
                <span class="price-icon">{{coin}}</span>
                <span class="price-num">{{item.money}}</span>
              </div>
              <!-- <div class="rmb">(￥{{item.money_cn}})</div> -->
              <div class="rule">{{ $t(`${lang}.limit1`) }}￥{{item.at_least_cn}}{{ $t(`${lang}.limit2`) }}</div>
              <div class="text">({{item.lineType}})</div>
              <div class="time">{{ $t(`${lang}.time`) }}：{{changeTime(item.start_time)}} - {{changeTime(item.end_time)}}</div>
            </div>

            <div class="get" @click="getCoupon(index)">
              <span v-if="!item.ifUse">{{item.ifChoose ? $t(`${lang}.alreadyReceived`) : $t(`${lang}.immediatelyReceive`) }}</span>
            </div>

            <div class="already" v-if="item.ifUse">{{ $t(`${lang}.alreadyReceived`) }}</div>
          </div>
        </div>

        <div class="finish" @click="closeCoupon(true)">{{ $t(`${lang}.accomplish`) }}</div>
      </div>
    </div>

  </div>
</template>

<script>
  const lang = 'coupon'
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
        lang,
        language: '',
        couponList: [],
        ifLoading: false,
        loadFinish: false
      }
    },
    mounted() {
      this.language = this.getCookie('language')
      this.coin = this.getCookie('coin')

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
        this.$nuxt.$loading.start()
        // 已领取的优惠券
        this.$axios.get('web/member/coupon/index', {
          })
          .then(res => {
            var couponAllList = res.data.data;

            // 判断可用优惠券中哪些是已领取的优惠券
            for(var i=0; i<this.couponList.length; i++){
              for(var j=0; j<couponAllList.length; j++){
                if(this.couponList[i].coupon_id == couponAllList[j].couponId){
                  this.couponList[i].ifUse = true;
                }
              }
            }

            this.loadFinish = true;
            this.$nuxt.$loading.finish()
          })
          .catch(err => {
            this.ifLoading = false;
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
        var that = this;
        this.$nuxt.$loading.start()
        this.loadFinish = false;
        this.$axios.post('web/member/coupon/fetch', {
          coupon_id: this.couponList[k].coupon_id
        })
        .then(res => {
          this.couponList[k].ifUse = true;
          this.loadFinish = true;
          this.$nuxt.$loading.finish()
          this.$successMessage(that.$t(`${lang}.msg1`))
        })
        .catch(err => {
          this.loadFinish = true;
          this.$nuxt.$loading.finish()
          this.$successMessage(that.$t(`${lang}.msg2`))
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
      width: 1000px;
      height: 800px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;

      .title {
        font-size: 22px;
        text-align: center;
        padding: 40px 0 30px;
        position: relative;

        .iconfont {
          position: absolute;
          right: 20px;
          top: 60%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border: 1px solid #999;
          text-align: center;
          line-height: 24px;
          border-radius: 50%;
          font-size: 10px;
          color: #999;
          cursor: pointer;
        }
      }

      .coupon-box {
        width: 900px;
        height: 700px;
        margin: 10px auto;
        overflow-y: auto;

        .box-r {
          width: 900px;
          min-height: 500px;
          display: flex;
          // align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          .list {
            display: flex;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.31), rgba(219, 209, 209, 0.31));
            box-shadow: 0 1px 0 #9C999C, 0 2px 0 #D6D5D6, 0 3px 0 #E3E1E3, 0 4px 0 #D6D5D6, 0 5px 0 #EDECED, 0 6px 0 #F9F9F9;
            border: 1px solid rgb(205, 173, 118);
            border-bottom: 0;
            margin-bottom: 30px;
            flex-shrink: 0;
            flex-grow: 0;
            height: 220px;
            position: relative;
            overflow: hidden;

            .list-l {
              position: relative;
              width: 270px;
              color: #cdad75;
              border-radius: 5px;
              padding: 20px;
              box-sizing: border-box;

              .line-box {
                width: 200px;
                height: 1px;
                background-color: #A6937C;
                margin: 10px auto 24px;
                position: relative;

                .point-box {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  width: 80px;
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  background-color: #fff;
                  background-image: linear-gradient(to right, #fcfafb, #f9f7f8);

                  i {
                    width: 6px;
                    height: 6px;
                    background-color: #A6937C;
                    border-radius: 50%;
                  }
                }
              }

              .price {
                width: 100%;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: nowrap;
                overflow: hidden;

                .price-icon {
                  font-size: 22px;
                  width: 54px;
                  flex-shrink: 0;
                }

                .price-num {
                  font-size: 40px;
                  color: #cdad75;
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
                margin-bottom: 4px;
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
                height: 38px;
                line-height: 18px;
                overflow: hidden;
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
              width: 140px;
              height: 80px;
              border-left: 1px solid #bd4444;
              line-height: 80px;
              text-align: center;
              margin: 62px auto;
              font-size: 16px;
              color: #bd4444;
              font-weight: bold;
              cursor: pointer;

              span {
                padding: 10px;
                box-sizing: border-box;
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
    right: -26px;
    top: 60px;
    width: 100px;
    height: 100px;
    background: url(../../../static/subject/icon_07.png) no-repeat center;
    background-size: 100% 100%;
    font-size: 15px;
    text-align: center;
    color: #fff;
    padding-top: 36px;
    box-sizing: border-box;
    letter-spacing: 1px;
    transform: rotate(-45deg);
  }
</style>
