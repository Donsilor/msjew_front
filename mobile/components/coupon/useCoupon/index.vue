<template>
  <div class="get-coupon">
    <div class="wrap">
      <div class="title">
        <div class="quit" @click="closeCoupon()"></div>
        <span>{{ lang.useCoupon }}</span>
      </div>

      <div class="coupon-box">
        <!-- 优惠券列表 -->
        <div class="box-r">
          <div v-if="1" class="list" v-for="(item, index) in couponList" :key="index" @click="chooseCoupon(index,true)">
            <div class="list-l">
              <div class="line-box">
                <div class="point-box">
                  <i></i><i></i><i></i><i></i>
                </div>
              </div>

              <div class="price">
                <span class="price-icon">{{formatCoin(coin)}}</span>
                <span class="price-num">{{item.money}}</span>
              </div>
              <!-- <div class="rmb">(￥{{item.money_cn}})</div> -->
              <div class="rule">{{ lang.limit1 }}{{formatCoin(coin)}}{{item.at_least}}{{ lang.limit2 }}</div>
              <div class="text" :class="{look:look}" @click="more">({{item.lineType == '' ? lang.specificProduct : item.lineType}})</div>
              <div class="time">{{ lang.time }}：{{changeTime(item.start_time)}} - {{changeTime(item.end_time)}}</div>
            </div>

            <div class="get" >
              <!-- <div> -->
                <!-- <span>{{item.ifChoose ? lang.haveChoose : lang.immediatelyChoose}}</span> -->
                <i
                  class="icon iconfont"
                  :class="item.ifChoose ? 'icongou' : ''"
                ></i>
              <!-- </div> -->
            </div>
          </div>
        </div>

        <!-- <div class="finish" @click="closeCoupon(true)">{{ lang.accomplish }}</div> -->
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      couponAll: {
        type: [Object],
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
      },
      useC: {
        type: Object,
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
        couponInfo: {couponCode: '',couponId: ''},
        look:true
      }
    },
    mounted() {
      this.language = this.$store.state.language
      this.coin = this.$store.state.coin

      var i=0;
      for(var j in this.couponAll){
        for(var k=0; k<this.couponAlready.length; k++){
          if(j == this.couponAlready[k]){
            this.couponList[i] = this.couponAll[j];
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

      for(var l=0,len=this.couponList.length; l<len; l++){
        if(this.useC.couponId == this.couponList[l].coupon_id){
          this.couponList[l].ifChoose = true
        }
      }
    },
    methods: {
      more(){
        this.look = false
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
        }

        this.$emit('closeCoupon', this.couponInfo)
      },
      // 选择优惠券
      chooseCoupon(k,g) {
        let flag = this.couponList[k].ifChoose
        this.couponList.forEach(o => {
          o.ifChoose = false
        })

        if(flag){
          this.couponList[k].ifChoose = false;
        }else {
          this.couponList[k].ifChoose = true;
        }
        this.couponList = [...this.couponList]

        if(g){
          this.couponList.forEach((o, index) => {
            if(o.ifChoose){
              this.couponInfo.couponCode = this.couponList[index].money;
              this.couponInfo.couponId = this.couponList[index].coupon_id;
            }
          })

          if(this.couponInfo.couponId){
            setTimeout(() => {
              this.$emit('closeCoupon', this.couponInfo)
            }, 1000)   
          }else{
            this.$emit('closeCoupon')
          }

        } else {
          this.$emit('closeCoupon',-1)
        }
        // setTimeout(() => {
        //   this.$emit('closeCoupon', this.couponInfo)
        // }, 1000)   

      }
    }
  }
</script>

<style scoped lang="less">
  .get-coupon {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);

    .wrap {
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      height: 100%;
      overflow-y: auto;

      .title{
        position: relative;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid rgb(210,210,210, 0.5);

        .quit{
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background: url(../../../static/addShoppingCard/back.png) no-repeat center;
          background-size: 100% 100%;
        }

        span{
          font-size: 20px;
          color: #f29b87;
          margin-left: 10px;
        }
      }

      .coupon-box {
        width: 100%;
        padding: 0 5%;
        margin-top: 20px;
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
                align-items: center;
                margin-top: 10px;

                .price-icon {
                  font-size: 18px;
                }

                .price-num {
                  font-size: 26px;
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

              .look{
                height: 20px;
                text-overflow:ellipsis;
                white-space: nowrap;
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
              width: 30%;
              height: 70px;
              border-left: 1px solid #f00;
              text-align: center;
              font-size: 16px;
              color: #f00;
              position: relative;

              div{
                position: absolute;
                width: 100%;
                left: 0;
                top: 50%;
                width: 100%;
                transform: translateY(-50%);
                line-height: 16px;
                text-align: center;
              }

              span {
                padding: 10px;
                box-sizing: border-box;
                position: relative;
              }
              
              i {
                position: absolute;
                right:40%;
                top:25px;
                width: 20px;
                height: 20px;
                // margin: 20px 12px 0 0;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(187, 187, 187, 1); /*no*/
                border-radius: 50%;
              }

              .icongou {
                background: rgba(242, 155, 135, 1);
                border-radius: 50%;
                font-size: 18px;
                line-height: 20px;
                color: #ffffff;
                text-align: center;
                border: 1px solid rgba(242, 155, 135, 1); /*no*/
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
