<template>
  <div class="container">       <!-- 优惠券 -->
    <!-- 顶部广告图 -->
    <div class="arrb">
      <img src="../../static/subject/subject_1.png" alt="">
    </div>
    <div class="tip clf">
      <div class="content">
        <!-- 活动文字说明 -->
        <div class="tip-list fl">
          <div class="tip-text fr">
            <div class="status">#{{ $t(`${lang}.status`) }}#</div>
            <div class="text1">{{ $t(`${lang}.text1`) }}</div>
            <div class="text1">{{ $t(`${lang}.text2`) }}</div>
          </div>
        </div>

        <!-- 优惠券列表 -->
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
    </div>

    <!-- 优惠商品列表 -->
    <div class="goods-list clf">
      <div class="list fl" v-for="(item, index) in discountsList" :key="index">
        <div class="child">
          <!-- <nuxt-link :to="item.to" class="goods-img" target="_blank"> -->
          <div class="goods-img" :class="{'bg-color' : item.categoryId == 15}">
            <img class="img-a" :src="item.goodsImages[0]" alt="">
            <img class="img-b" :src="item.goodsImages[1] || item.goodsImages[0]" alt="">
          </div>
          <!-- </nuxt-link> -->
          <div class="price">
            <div class="currency">HKD</div>
            <div class="num">{{ formatMoney(item.salePrice) }}</div>
          </div>

          <div class="name">
            <span class="icon">￥</span>
            <div class="text">{{item.goodsName}}</div>
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
        discountsList: [],
        showCoupon: false,
        coupons: {16:123, 17:564, 20:153}
      }
    },
    mounted() {
      this.$axios({
          method: 'get',
          url: 'web/market/detail',
          params: {
            id: 13
          }
        })
        .then(data => {
          console.log(222,data)
          this.discountsList = data.data.recommend[0];

          var len = data.data.recommend[0].length,
              datas = data.data.recommend[0];

          for(var i=0; i<len; i++){
            this.discountsList[i].goodsImages = this.discountsList[i].goodsImages.split(',');

            if(datas[i].coupon.hasOwnProperty('money')){
              var couponList = datas[i].coupon.money;
              for(var j in couponList){
                var flag = true; 
                for(var k in this.coupons){
                  if(j != k){}
                }
              }
            }
          }
          // this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
</script>

<style scoped lang="less">
  .arrb {
    height: 200px;
    width: 100%;
    overflow: hidden;
    text-align: center;

    img{
      width: 100%;
      height: 100%;
    }
  }
  .tip {
    height: 180px;
    background-color: #f0f0f0;

    .content{
      max-width: 1360px;
      min-width: 1200px;
      height: 100%;
      margin: 0 auto;
    }

    .tip-list {
      width: 50%;
      height: 110px;
      margin-top: 28px;
      box-sizing: border-box;

      .tip-text{
        color: #860505;
        margin-right: 50px;

        .status{
          font-size: 18px;
          margin: 10px 0 15px;
        }

        .text1{
          font-size: 14px;
          line-height: 28px;
          padding-left: 14px;
          box-sizing: border-box;
        }
      }
      .tip-coupon{
        height: 86px;
        overflow: hidden;
        margin: 12px 0 0 80px;

        .card-list{
          width: 70px;
          height: 86px;
          background: url(../../static/subject/discounts-bg.png) no-repeat center;
          background-size: 100% 100%;
          text-align: center;
          color: #fff;
          padding-top: 12px;
          box-sizing: border-box;
          margin-right: 30px;

          .price{
            // font-family: ZpixEX2;
            display: inline-block;
            height: 20px;
            font-size: 16px;
            box-sizing: border-box;
            text-align: center;
            position: relative;

            .coin{
              position: absolute;
              left: 100%;
              top: 0;
              width: 20px;
              height: 20px;
              transform: scale(0.5) translateX(-8px);

              span{
                position: absolute;
                top: 0;
                right: 0;
                width: 20px;
                height: 20px;
                background-color: #fff;
                border-radius: 50%;
                border: 2px solid #860505;
                box-sizing: border-box;
                font-size: 12px;
                color: #730303;
                text-align: center;
                line-height: 20px;
              }
            }
          }

          .text1,
          .text2{
            line-height: 12px;
            font-size: 12px;
            transform: scale(0.7);
          }

          .btn{
            // font-family: SourceHanSansCN-R;
            width: 120%;
            height: 22px;
            line-height: 22px;
            text-align: center;
            font-size: 12px;
            color: #730303;
            background-color: #fff;
            border-radius: 22px;
            margin-left: -10%;
            cursor: pointer;
            transform: scale(0.7);
          }
        }

      }
    }
    .tip-list:last-of-type{
      border-left: 1px solid #860505;
    }
  }

  .goods-list{
    max-width: 1360px;
    min-width: 1200px;
    min-height: 600px;
    margin: 40px auto 0;
    box-sizing: border-box;
    overflow: hidden;

    .list{
      position: relative;
      width: 23%;
      margin-bottom: 20px;

      .child{
        margin: 5px 0 0 4px;
        text-align: center;

        .goods-img{
          position: relative;
          height: 300px;
          border: 1px solid #b99e97;
          overflow: hidden;
          img{
            width: 80%;
            height: 80%;
          }

          .img-a{
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 0;
            max-width: 100%;
            max-height: 100%;
            transform: translate(-50%, -50%);
          }

          .img-b{
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 0;
            max-width: 100%;
            max-height: 100%;
            transform: translate(-50%, -50%);
            display: none;
          }

        }
        .goods-img:hover .img-b{
          display: block;
        }
        .goods-img.bg-color{
          background-color: #EEEEF8;
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
        width: 70px;
        height: 70px;
        background: url(../../static/subject/icon_01.png) no-repeat center;
        background-size: 100% 100%;

        .text{
          // font-family: MicrosoftYaHeiLight;
          position: absolute;
          top: 3%;
          left: 3%;
          width: 90%;
          height: 90%;
          transform: rotate(-45deg);
          text-align: center;
          font-size: 14px;
          color: #fff;
          line-height: 30px;
        }
      }
    }
    .list:not(:nth-child(4n)){
      margin-right: 2.6%;
    }
  }

</style>
