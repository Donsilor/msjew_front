<template>
  <div class="get-coupon">
    <div class="wrap">
      <div class="title">使用优惠券
        <i class="iconfont iconguanbi" @click="closeCoupon"></i>
      </div>

      <div class="coupon-box">
        <!-- 优惠券列表 -->
        <div class="list" v-for="(item, index) in couponList" :key="index">
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

           <div class="rule">满100元使用</div>
           <!-- <div class="btn">{{ $t(`${lang}.use`) }}</div> -->
           <div class="text">(限项链使用)</div>
           <div class="time">{{ $t(`${lang}.time`) }}：2020.2.1- 2020.2.2</div>
          </div>

          <div class="get">
            <!-- <span @click="chooseCoupon(index)">选择</span> -->
            <div class="icon-box">
              <div class="icon-bg"></div>
              <div class="icon-a"></div>
            </div>

          </div>

        </div>

        <div class="finish" @click="closeCoupon">完成</div>
      </div>
    </div>

  </div>
</template>

<script>
const lang = 'coupon'
export default {
  name: 'Index',
  props:{
    moneyInfo: {
      type: [Object],
      required: false,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      lang,
	  language: '',
      couponList: [],
      ifLoading: false
    }
  },
  mounted(){
	  this.language = this.getCookie('language')

    // 获取优惠券
    this.$axios.get('web/member/coupon/index', {
      })
      .then(res => {
        this.ifLoading = false;
        this.couponList = res.data.data
      })
      .catch(err => {
        this.ifLoading = false;
      })
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
    // 关闭弹窗
    closeCoupon() {
      this.$emit('closeCoupon', true)
    },
    // 选择优惠券
    chooseCoupon(k) {

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
  .wrap{
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
      padding: 20px 0;
      position: relative;

      .iconfont{
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow-y: auto;

      .list{
        position: relative;
        display: flex;
          background-image: linear-gradient(to right, rgba(255,255,255,0.31), rgba(219,209,209,0.31));
          box-shadow: 0 1px 0 #9C999C,0 2px 0 #D6D5D6,0 3px 0 #E3E1E3,0 4px 0 #D6D5D6,0 5px 0 #EDECED,0 6px 0 #F9F9F9;
          border: 1px solid rgb(205,173,118);
          border-bottom: 0;
          margin-bottom: 30px;

        .list-l{
          position: relative;
          width: 270px;
          color: #cdad75;
          border-radius: 5px;

          .line-box{
            width: 200px;
            height: 1px;
            background-color: #A6937C;
            margin: 30px auto 24px;
            position: relative;

            .point-box{
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

              i{
                width: 6px;
                height: 6px;
                background-color: #A6937C;
                border-radius: 50%;
              }
            }
          }
          .price{
            // height: 100px;
            width: 100%;
            display: flex;
            justify-content: center;

            .price-icon{
              font-size: 27px;
            }

            .price-num{
              font-size: 56px;
              color: #cdad75;
              margin: -9px 0 0 -4px;
              padding-right: 10px;
            }
          }
          .rule{
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            text-align: center;
            margin: 0 0 4px;
          }
          .btn{
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

          .text{
            text-align: center;
            font-size: 12px;
            color: #f00;
            margin-bottom: 10px;
          }

          .time{
            font-size: 13px;
            color: #cdad75;
            text-align: center;
            margin-top: 4px;
          }

          .lose-efficacy{
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
        .get{
          width: 140px;
          height: 80px;
          border-left: 1px solid #f00;
          line-height: 80px;
          text-align: center;
          margin: 62px auto;
          font-size: 16px;
          color: #f00;
          cursor: pointer;

          span{
            padding: 10px;
            box-sizing: border-box;
          }
        }
        .icon-box{
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          border-radius: 4px;

          .icon-bg{
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 30px;
            border-color: #ccc #ccc transparent transparent;
          }

          .icon-a{
            position: absolute;
            top: 7px;
            right: 7px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #fff;
          }
        }
      }

      .finish{
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
.list:nth-child(even){
  margin-right: 0 !important;
}

.list .lose-efficacy.fontSize{
	font-size: 16px;
}

.coupon-box::-webkit-scrollbar {display:none}
</style>
