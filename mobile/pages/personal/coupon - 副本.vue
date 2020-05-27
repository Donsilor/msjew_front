<template>
  <div class="coupon">
    <!-- <div class="coupon-top">
    </div> -->

    <div class="title">
      <div class="quit" @click="quit()"></div>
      <i class="icon"></i>
      <span>优惠券卡包</span>
    </div>

    <div class="card-box">
      <div class="list" v-for="(item, index) in couponList" :key="index">
        <div class="line-box">
          <div class="point-box">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div class="card-mid">
          <div class="card-mid-l">
            <span class="sign">￥</span>
            <span class="price">{{item.moneyCn}}</span>
          </div>
          <div class="card-mid-r">
            <span class="text1">满{{item.atLeast}}元使用</span>
            <span class="text2">使用时间：</span>
            <span class="text2">{{changeTime(item.startTime)}}-{{changeTime(item.endTime)}}</span>
          </div>
        </div>

        <div class="limit">限用于（{{item.lineType}}）</div>

        <div class="btn">点击使用</div>
      </div>

      <!-- <div class="list lose-efficacy ">
        左上角三角
        <div class="square"><span></span></div>

        <div class="line-box">
          <div class="point-box">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div class="card-mid">
          <div class="card-mid-l">
            <span class="sign">￥</span>
            <span class="price">5</span>
          </div>
          <div class="card-mid-r">
            <span class="text1">满100元使用</span>
            <span class="text2">使用时间：</span>
            <span class="text2">2020.2.1-2020.2.2</span>
          </div>
        </div>

        <div class="limit">限用于（项链）</div>

        <div class="btn">点击使用</div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      couponList: []
    }
  },
  mounted(){
    this.$axios({
      method: 'get',
      url: 'web/member/coupon/index'
    })
      .then(res => {
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
  .coupon-top{
    height: 68px;
    line-height: 68px;
    text-align: center;
    position: relative;
    font-size: 16px;
    color: #666;
    border-bottom: 1px solid rgba(110,112,110,0.2);
  }
  .title .quit{
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: url(../../static/addShoppingCard/back.png) no-repeat center;
    background-size: 100% 100%;
  }
  .title{
    position: relative;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgb(210,210,210, 0.5);

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
      // background: linear-gradient(to right, rgba(255,255,255,0.31), rgba(219,209,209,0.31));
      // border: 1px solid rgba(205,173,118, 0.5);
      background: url(../../static/subject/card_bg_01.png) no-repeat center;
      background-size: 100% 100%;
      border-radius: 5px;
      padding: 20px 0 30px;

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

      .card-mid{
        display: flex;
        align-items: center;
        justify-content: center;
        color: #cdad76;

        .sign{
          font-size: 27px;
          margin-top: 6px;
        }
        .price{
          font-size: 67px;
        }

        .card-mid-l{
          display: flex;
        }

        .card-mid-r{
          display: flex;
          flex-direction: column;
          margin-left: 20px;

          .text1{
            font-size: 15px;
            margin-bottom: 6px;
          }
          .text2{
            font-size: 13px;
            line-height: 20px;
          }
        }

      }

      .limit{
        color: #f00;
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

      .square{
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 25px 0 25px 0;
        border-color: #D3D3D3 0 #D3D3D3 #D3D3D3;
      }
    }

    .list.lose-efficacy{
      background-image: url(../../static/subject/card_bg_02.png);

      .line-box{
        position: relative;
        background-color: #D2D2D2;

        .point-box{
          background: linear-gradient(to right, #FBFAFA, #F7F5F5);

          span{
            background-color: #D2D2D2;
          }
        }
      }

      .card-mid{
        color: #D2D2D2;
      }

      .limit{
        color: #D2D2D2;
      }

      .btn{
        background-color: #D2D2D2;
      }
    }
  }


}
</style>
