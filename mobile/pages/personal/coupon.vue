<template>
  <div class="coupon">
    <div class="coupon-top">
      <div class="quit" @click="quit()"></div>
    </div>

    <div class="title">
      <i class="icon"></i>
      <span>优惠券卡包</span>
    </div>

    <div class="card-box">
      <div class="list">
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

        <div class="btn">点击使用</div>
      </div>

      <div class="list lose-efficacy ">
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

        <div class="btn">点击使用</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    quit(){

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
  .coupon-top .quit{
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
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgb(210,210,210, 0.5);

    .icon{
      width: 26px;
      height: 22px;
      border: 1px solid red;
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
      margin-bottom: 26px;
      width: 100%;
      background: linear-gradient(to right, rgba(255,255,255,0.31), rgba(219,209,209,0.31));
      border: 1px solid rgba(205,173,118, 0.5);
      border-radius: 5px;
      padding-bottom: 16px;

      .line-box{
        position: relative;
        width: 208px;
        height: 1px;
        background-color: #cdad76;
        margin: 16px auto;

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

    .list.lose-efficacy{
      background: linear-gradient(to right, rgba(255,255,255,0.31), rgba(219,209,209,0.31));
      border: 1px solid #fff;

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

      .btn{
        background-color: #D2D2D2;
      }
    }
  }


}
</style>
