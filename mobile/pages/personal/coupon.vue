<template>
  <div class="coupon">
    <!-- <div class="coupon-top">
    </div> -->

    <div class="title">
      <div class="quit" @click="quit()"></div>
      <i class="icon"></i>
      <span>{{ lang.title }}</span>
    </div>

    <div class="card-box">
      <div class="list" v-for="(item, index) in couponList" :key="index">
        <div class="line-box">
          <div class="point-box">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div class="price-box">
          <span class="sign">{{coin}}</span>
          <span class="price">{{item.moneyCn}}</span>
        </div>

        <div class="text1">满 {{coin}}{{item.atLeast}} 元使用</div>
        <div class="limit">{{ lang.limit3 }}（{{item.lineType == '' ? lang.specificProduct : item.lineType}}）{{ lang.limit4 }}</div>

        <div class="text2">{{ lang.time }}：{{changeTime(item.startTime)}}-{{changeTime(item.endTime)}}</div>

        <!-- <div class="btn">点击使用</div> -->

        <div :class="['lose-efficacy', {fontSize: language === 'en_US'}]" v-if="item.couponStatus == 2">{{ lang.alreadyApplied }}</div>
        <div :class="['lose-efficacy', {fontSize: language === 'en_US'}]" v-if="nowTime > item.endTime">{{ lang.alreadyExpired }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
	  lang: this.LANGUAGE.coupon,
      coin: '',
      couponList: [],
      language:this.$store.state.language,
      nowTime: '',
    }
  },
  mounted(){
    this.coin = this.$store.state.coin
    this.nowTime = new Date().getTime()/1000;
    this.$axios({
      method: 'get',
      url: 'web/member/coupon/index'
    })
      .then(res => {
        console.log("sss",res)
        this.couponList = res.data;

        for(var i in this.couponList){
          this.couponList.ifChoose = false;

          this.couponList[i].lineType = [];
          for(var k in this.couponList[i].GoodsType){
            this.couponList[i].lineType.push(this.couponList[i].GoodsType[k]);
          }

          this.couponList[i].lineType = this.couponList[i].lineType.join(',');
        }
        this.couponList = [...this.couponList]
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods:{
    quit(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.coupon {
  // min-height: 300px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 21;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: scroll;

  .coupon-top{
    height: 68px;
    line-height: 68px;
    text-align: center;
    position: relative;
    font-size: 16px;
    color: #666;
    border-bottom: 1px solid rgba(110,112,110,0.2);

  }
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
      background: url(../../static/addShoppingCard/back.png) no-repeat center;
      background-size: 100% 100%;
    }

    .icon{
      width: 26px;
      height: 22px;
      background: url(../../static/subject/icon_01.png) no-repeat center;
      background-size: 100% 100%;
    }

    span{
      font-size: 20px;
      color: #f29b87;
      margin-left: 10px;
    }
  }

  .card-box{
    width: 300px;
    margin: 40px auto;

    .list{
      position: relative;
      margin-bottom: 26px;
      width: 100%;
      background: url(../../static/subject/card_bg_01.png) no-repeat center;
      background-size: 100% 100%;
      border-radius: 5px;
      padding: 20px 20px 30px;
      box-sizing: border-box;
      color: #cdad76;

      .line-box{
        position: relative;
        width: 208px;
        height: 1px;
        background-color: #cdad76;
        margin: 0 auto 16px;

        .point-box{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -58%);
          z-index: 2;
          background: linear-gradient(to right, #FBFAFA, #F7F5F5);

          span{
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #cdad76;
            margin: 0 10px;
            display: inline-block;
          }
        }
      }

      .price-box{
        display: flex;
        align-items: center;
        justify-content: center;

          .sign{
            font-size: 20px;
          }
          .price{
            font-size: 40px;
          }
      }

      .text1{
        font-size: 15px;
        margin-bottom: 6px;
      }

      .text2{
        font-size: 13px;
        line-height: 20px;
      }

      .limit{
        color: #bfb8b8;
        font-size: 13px;
        height: 34px;
      }

      .btn{
        width: 200px;
        height: 26px;
        background-color: rgb(205,173,118);
        text-align: center;
        line-height: 26px;
        color: #fff;
        font-size: 15px;
        border-radius: 2px;
        margin: 10px auto 0;
      }
    }
  }

  .lose-efficacy{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90px;
    height: 90px;
    background-color: #a0a0a0;
    border-radius: 50%;
    font-size: 20px;
    text-align: center;
    line-height: 80px;
    color: #fff;
    opacity: 0.9;
  }
}
</style>
