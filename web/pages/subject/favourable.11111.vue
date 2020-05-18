<template>
  <div class="container">       <!-- 优惠券 -->
    <!-- 顶部广告图 -->
    <div class="arrb">
      <img src="../../static/subject/subject_1.png" alt="">
    </div>
    <div class="tip clf">
      <div class="tip-list fl">
        <div class="tip-text fr">
          <div class="status">#{{ $t(`${lang}.status`) }}#</div>
          <div class="text1">{{ $t(`${lang}.text1`) }}</div>
          <div class="text1">{{ $t(`${lang}.text2`) }}</div>
        </div>
      </div>
      <div class="tip-list fl">
        <div class="tip-coupon fl clf">
          <div class="card-list fl">
            <div class="price">10
              <div class="coin">
                <span>元</span>
              </div>
            </div>
            <div class="text1">{{ $t(`${lang}.discountCoupon`) }}</div>
            <div class="text2">{{ $t(`${lang}.full`) }}198{{ $t(`${lang}.use`) }}</div>
            <div class="btn">{{ $t(`${lang}.get`) }}</div>
          </div>

          <div class="card-list fl">
            <div class="price">10
              <div class="coin">
                <span>元</span>
              </div>
            </div>
            <div class="text1">{{ $t(`${lang}.discountCoupon`) }}</div>
            <div class="text2">{{ $t(`${lang}.full`) }}198{{ $t(`${lang}.use`) }}</div>
            <div class="btn" @click="showCoupon = true">{{ $t(`${lang}.get`) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 优惠商品列表 -->
    <div class="goods-list clf">
      <div class="list fl" v-for="(item, index) in discountsList" :key="index">
        <div class="child">
          <div class="goods-img">
            <img src="../../static/adt/image1564544333790.png" alt="">
          </div>
          <div class="price">
            <div class="currency">HKD</div>
            <div class="num">{{ formatMoney(item.price) }}</div>
          </div>

          <div class="name">
            <span class="icon">￥</span>
            <div class="text">{{item.text}}</div>
          </div>
        </div>

        <div class="sign">
          <div class="text">{{ $t(`${lang}.discountCoupon`) }}</div>
        </div>
      </div>
    </div>

    <!-- 获取优惠券 -->
    <get-coupon v-if="showCoupon" @closeCoupon="showCoupon = false"></get-coupon>
  </div>
</template>

<script>
	const lang = 'subject.favourable'
  export default{
    data(){
      return{
				lang,
        discountsList: [
          { price: '22222', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'},
          { price: '11111', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'},
          { price: '333333', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'},
          { price: '555', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'},
          { price: '6666', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'},
          { price: '777777', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'}
        ],
        showCoupon: false
      }
    }
  }
</script>

<style scoped lang="less">
  // @font-face {
  //   font-family: ZpixEX2;
  //   src: url('../../assets/css/ZpixEX2_EX.ttf');
  // }
  // @font-face {
  //   font-family: SourceHanSansCN-E;
  //   src: url('../../assets/css/SourceHanSansCN-ExtraLight.otf');
  // }
  // @font-face {
  //   font-family: SourceHanSansCN-R;
  //   src: url('../../assets/css/SourceHanSansCN-Regular.ttf');
  // }
  // @font-face {
  //   font-family: MicrosoftYaHeiLight;
  //   src: url('../../assets/css/MicrosoftYaHeiL.ttc');
  // }

  img{
    width: 100%;
    height: 100%;
  }
  .arrb {
    height: 540px;
    width: 100%;
  }
  .tip {
    height: 250px;
    background-color: #f0f0f0;

    .tip-list {
      width: 50%;
      height: 164px;
      margin-top: 43px;
      box-sizing: border-box;

      .tip-text{
        height: 164px;
        color: #860505;
        margin-right: 50px;

        .status{
          font-size: 24px;
          margin: 20px 0 40px;
        }

        .text1{
          font-size: 22px;
          line-height: 28px;
          padding-left: 6px;
          box-sizing: border-box;
        }
      }
      .tip-coupon{
        height: 196px;
        margin: -16px 0 0 80px;

        .card-list{
          width: 134px;
          height: 196px;
          background: url(../../static/subject/discounts-bg.png) no-repeat center;
          background-size: 100% 100%;
          text-align: center;
          color: #fff;
          padding-top: 20px;
          box-sizing: border-box;
          margin-right: 30px;

          .price{
            // font-family: ZpixEX2;
            display: inline-block;
            height: 66px;
            font-size: 62px;
            letter-spacing: -6px;
            padding-right: 14px;
            box-sizing: border-box;
            position: relative;

            .coin{
              position: absolute;
              left: 50%;
              top: 0;
              transform: translateX(-50%);
              width: 60px;
              height: 100%;
              margin: 0 auto;

              span{
                position: absolute;
                top: 12px;
                right: -6px;
                width: 26px;
                height: 26px;
                background-color: #fff;
                border-radius: 50%;
                border: 2px solid #860505;
                box-sizing: border-box;
                font-size: 12px;
                color: #730303;
                text-align: center;
                line-height: 22px;
                letter-spacing: 0;
              }
            }
          }

          .text1{
            // font-family: SourceHanSansCN-E;
            height: 34px;
            line-height: 34px;
            font-size: 27px;
          }

          .text2{
            // font-family: SourceHanSansCN-R;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
          }

          .btn{
            // font-family: SourceHanSansCN-R;
            height: 22px;
            line-height: 22px;
            padding: 0 16px;
            font-size: 14px;
            color: #730303;
            background-color: #fff;
            display: inline-block;
            border-radius: 22px;
            margin-top: 10px;
            cursor: pointer;
          }
        }

      }
    }
    .tip-list:last-of-type{
      border-left: 1px solid #860505;
    }
  }

  .goods-list{
    width: 1814px;
    min-height: 600px;
    margin: 56px auto 0;
    box-sizing: border-box;

    .list{
      position: relative;
      width: 428px;
      margin-bottom: 60px;

      .child{
        width: 422px;
        margin: 8px 0 0 6px;
        text-align: center;

        .goods-img{
          width: 422px;
          height: 500px;
          border: 1px solid #b99e97;
        }

        .price{
          height: 30px;
          line-height: 30px;
          margin: 10px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #b99e97;

          .num{
             margin-left: 10px;
          }
        }

        .name{
          // font-family: MicrosoftYaHeiLight;
          display: flex;
          justify-content: center;
          height: 44px;
          padding: 0 10px;
          box-sizing: border-box;

          .icon{
            width: 14px;
            height: 18px;
            background-color: #860505;
            text-align: center;
            line-height: 18px;
            color: #fff;
            font-size: 12px;
          }

          .text{
            font-size: 17px;
            color: #000;
            line-height: 22px;
            margin-left: 4px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }


      .sign{
        position: absolute;
        left: 0;
        top: 0;
        width: 90px;
        height: 90px;
        background: url(../../static/subject/icon_01.png) no-repeat center;
        background-size: 100% 100%;

        .text{
          // font-family: MicrosoftYaHeiLight;
          position: absolute;
          top: 5%;
          left: 5%;
          width: 90%;
          height: 90%;
          transform: rotate(-45deg);
          text-align: center;
          font-size: 20px;
          color: #fff;
          line-height: 38px;
        }
      }
    }
    .list:not(:nth-child(4n)){
      margin-right: 34px;
    }
  }

</style>
