<template>
  <div class="get-coupon">
    <div class="wrap">
      <div class="title">{{ $t(`${lang}.useCoupon`) }}
        <i class="iconfont iconguanbi" @click="closeCoupon()"></i>
      </div>

      <div class="coupon-box">
        <!-- 优惠券列表 -->
        <div class="box-r">
          <div class="list" v-for="(item, index) in couponList" :key="index">
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
              <div class="rule">{{ $t(`${lang}.limit1`) }}{{coin}} {{item.at_least}}{{ $t(`${lang}.limit2`) }}</div>
              <!-- <div class="btn">{{ $t(`${lang}.use`) }}</div> -->
              <div class="text" :class="{look:look}" @click="more">({{item.lineType}})</div>
              <div class="time">{{ $t(`${lang}.time`) }}：{{changeTime(item.start_time)}} - {{changeTime(item.end_time)}}</div>
            </div>

            <div class="get" @click="chooseCoupon(index)">
              <!-- <span>{{item.ifChoose ? $t(`${lang}.haveChoose`) : $t(`${lang}.immediatelyChoose`) }}</span> -->
              <div v-if="item.ifChoose">
                <img src="../../../static/order/ticks.png" alt="">
              </div>
              <div v-if="!item.ifChoose">
                <img src="../../../static/order/untick.png" alt="">
              </div>
            </div>

          </div>
        </div>
        <div class="btn">
          <div class="finish" @click="closeCoupon(true)">{{ $t(`${lang}.accomplish`) }}</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  const lang = 'coupon'
  export default {
    name: 'Index',
    props: {
      couponAll: {
        type: Object,
        required: false,
        default () {
          return {}
        }
      },
      couponAlready: {
        type: Array,
        required: false,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        lang,
        language: '',
        coin: '',
        couponList: [],
        ifLoading: false,
        couponInfo: {couponCode: '',couponId: ''},
        look:true
      }
    },
    mounted() {
      this.language = this.getCookie('language')
      this.coin = this.$store.state.coin

      var i=0;
      for(var j in this.couponAll){
        for(var k=0; k<this.couponAlready.length; k++){
          if(j == this.couponAlready[k]){
            this.couponList[i] = this.couponAll[j];
            this.couponList.ifUse = false;
            this.couponList.ifChoose = false;

            this.couponList[i].lineType = [];
            for(var k in this.couponAll[j].goods_type){
              this.couponList[i].lineType.push(this.couponAll[j].goods_type[k]);
            }

            this.couponList[i].lineType = this.couponList[i].lineType.join(',');

            i++;
          }
        }
      }
      this.couponList = [...this.couponList]
    },
    methods: {
      more(){
        this.look = false
      },
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
      // 关闭弹窗
      closeCoupon(k) {
        if(k){
          this.couponList.forEach((o, index) => {
            if(o.ifChoose){
              this.couponInfo.couponCode = this.couponList[index].money;
              this.couponInfo.couponId = this.couponList[index].coupon_id;
            }
          })

          if(this.couponInfo.couponId){
            this.$emit('closeCoupon', this.couponInfo)
          }else{
            this.$emit('closeCoupon')
          }

        }else{
            this.$emit('closeCoupon')
        }
      },
      // 选择优惠券
      chooseCoupon(k) {
        this.couponList.forEach(o => {
          o.ifChoose = false
        })
        this.couponList[k].ifChoose = true;
        this.couponList = [...this.couponList]
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
      height: 760px;
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
        // height: 644px;
        height: 560px;
        margin: 10px auto;
        overflow-y: auto;

        .box-r {
          width: 900px;
          min-height: 575px;
          display: flex;
          align-items: flex-start;
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
                margin: 10px auto 16px;
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

              .look{
                height: 20px;
                line-height: 16px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
              }

              .text {
                text-align: center;
                font-size: 12px;
                color: #bfb8b8;
                // height: 38px;
                // line-height: 18px;
                // overflow: hidden;
              }

              .time {
                font-size: 13px;
                color: #cdad75;
                text-align: center;
                margin-top: 4px;
                height: 34px;
                line-height: 16px;
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
              color: #f00;
              cursor: pointer;;

              span {
                padding: 10px;
                box-sizing: border-box;
              }

              &>div{
                width: 40px;
                height: 40px;
                margin: 20px auto;
                font-size: 0;

                img{
                  width: 100%;
                  height: 100%;
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

        .btn{
          position: fixed;
          bottom: 0;
          width: 90%;
        }
        
        .finish {
          width: 160px;
          height: 44px;
          text-align: center;
          line-height: 44px;
          border-radius: 3px;
          margin: 20px auto;
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
</style>
