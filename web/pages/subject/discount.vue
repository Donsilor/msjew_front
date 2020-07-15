<template>
  <div class="container">           <!-- 折扣券 -->
    <!-- 顶部广告图 -->
    <div class="arrb">
      <img src="../../static/subject/subject_1.png" alt="">
    </div>
    <div class="tip clf">
      <div class="content">
        <div class="tip-list fl">
          <div class="tip-text fr">
            <div class="status">#{{ $t(`${lang}.status`) }}#</div>
            <div class="text1 clf">
              <span class="fl text1-title">{{ $t(`${lang}.text1`) }}</span>
              <span class="fl">: {{ $t(`${lang}.text2`) }}</span>
            </div>
            <div class="text1 clf">
              <span class="fl text1-title">{{ $t(`${lang}.text3`) }}</span>
              <span class="fl">: {{ $t(`${lang}.text4`) }}</span>
            </div>
            <div class="text1 clf">
              <span class="fl text1-title">{{ $t(`${lang}.text5`) }}</span>
              <span class="fl">: {{ $t(`${lang}.text6`) }}</span>
            </div>
          </div>
        </div>
        <div class="tip-list fl">
          <div class="tip-coupon fl clf">
            <div class="card-list fl">
              <div class="card-left">{{ $t(`${lang}.discountCoupon`) }}</div>
              <div class="card-right">
                <div class="price-box">
                  <div class="price">
                    <span class="num">{{ language == 'en_US' ? discountUs(discount)+'%' : discountConversion(discount)}}</span>
                    <span class="sign">{{ $t(`${lang}.discount`) }}</span>
                  </div>
                  <div class="text">{{ $t(`${lang}.explain`) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  

    <!-- 优惠商品列表 -->
    <div class="goods-list clf">
      <div class="list fl" v-for="(item, index) in discountsList" :key="index">
        <div class="child">
          <nuxt-link :to="item.to" target="_blank">
            <div class="goods-img">
              <img class="img-a" :src="item.goodsImages[0]" alt="">
              <img class="img-b" :src="item.goodsImages[1] || item.goodsImages[0]" alt="">
            </div>
          </nuxt-link>

          <div class="price old-price">
            <div class="currency"><span>{{ $t(`${lang}.oldPrice`) }} </span>HKD</div>
            <div class="num">{{ formatMoney(item.salePrice) }}</div>
          </div>
          <div class="price">
            <div class="currency"><span>{{ $t(`${lang}.newPrice`) }} </span>HKD</div>
            <div class="num">{{ formatMoney(item.coupon.discount.price) }}</div>
          </div>

          <div class="name">
            <span class="icon">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}} {{ $t(`${lang}.discount`) }}</span>
            <div class="text">{{item.goodsName}}</div>
          </div>
        </div>

        <div class="sign">
          <div class="text">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}} {{ $t(`${lang}.discount`) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	const lang = 'subject.discount'
  export default{
    data(){
      return{
        lang,
        language: '',
        discountsList: [],
        showCoupon: false,
        discount: 0
      }
    },
    mounted() {
      this.language = this.$store.state.language;

      this.$axios({
          method: 'get',
          url: 'web/market/detail',
          params: {
            id: 16
          }
        })
        .then(data => {
          console.log(222,data.data.recommend[0])
          this.discountsList = data.data.recommend[0];
          this.discount = data.data.recommend[0][0].coupon.discount.discount;
          var path = '', href = '', a = 0, id = 0;
          var goodsline = function(a) {
            if(a == 2) {
              path = '/ring/wedding-rings/';
              href = path + id + '?goodId=' + id + '&ringType=single';
              return
            }else if(a == 4){
              path = '/jewellery/necklace/';
              href = path + id + '?goodId=' + id;
              return
            }else if(a == 5){
              path = '/jewellery/pendant/';
              href = path + id + '?goodId=' + id;
              return
            }else if(a == 6){
              path = '/jewellery/studEarring/'
              href = path + id + '?goodId=' + id;
              return
            }else if(a == 7){
              path = '/jewellery/earring/'
              href = path + id + '?goodId=' + id;
              return
            }else if(a == 8){
              path = '/jewellery/braceletLine/'
              href = path + id + '?goodId=' + id;
              return
            }else if(a == 9){
              path = '/jewellery/bracelet/'
              href = path + id + '?goodId=' + id;
              return
            }else if(a == 12){
              path = '/build-your-own-ring/setting-details/'
              href = path + id + '?goodId=' + id;
              return
            }else if(a == 15){
              path = '/build-your-own-ring/diamond-details/'
              href = path + id + '?goodId=' + id;
              return
            }else if(a == 16){

            }else if(a == 17){
              
            }else if(a == 19){
              path = '/ring/wedding-rings/'
              href = path + id + '?goodId=' + id + '&ringType=pair';
              return
            }else{
              path = '/other/'
              href = path + id + '?goodId=' + id;
              return
            }
          }

          var len = data.data.recommend[0].length,
              datas = data.data.recommend[0];

          for(var i=0; i<len; i++){
            this.discountsList[i].goodsImages = this.discountsList[i].goodsImages.split(',');

            a = datas[i].categoryId;
            id = datas[i].id;
            goodsline(a)

            this.discountsList[i].to = href
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
		  
          .text1-title{
            width: 100px;
          }
        }
      }
      .tip-coupon{
        height: 100px;
        overflow: hidden;
        margin: 12px 0 0 80px;

        .card-list{
          position: relative;
          width: 220px;
          height: 100px;
          background: url(../../static/subject/discounts-bg-02.png) no-repeat center;
          background-size: 100% 100%;
          text-align: center;
          color: #fff;
          padding-top: 16px;
          box-sizing: border-box;
          margin-right: 30px;

          .card-left{
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 48px;
            font-size: 18px;
            color: #f0f0f0;
            padding: 0 18px;
            box-sizing: border-box;
            text-align: center;
          }

          .card-right{
            position: absolute;
            top: 0;
            left: 62px;
            width: 156px;
            height: 100%;

            .price-box{
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #fff;
              width: 100%;

              .price{
                display: flex;
                justify-content: center;
                align-items: flex-end;

                .num{
                  font-size: 42px;
                  letter-spacing: -4px;
                }

                .sign{
                  font-size: 22px;
                  margin: 0 0 6px 6px;
                }
              }

              .text{
                font-size: 16px;
                margin: 4px 0 10px;
              }
            }
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
          margin-bottom: 6px;
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
          height: 26px;
          line-height: 26px;
          // margin: 10px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #b99e97;

          .num{
             margin-left: 10px;
          }
        }

        .old-price{
          font-size: 14px;
          text-decoration: line-through;
          color: #bbb;
        }

        .name{
          // font-family: MicrosoftYaHeiLight;
          display: flex;
          justify-content: center;
          height: 44px;
          padding: 0 10px;
          box-sizing: border-box;
          margin-top: 6px;

          .icon{
            // width: 14px;
            height: 20px;
            background-color: #860505;
            text-align: center;
            line-height: 18px;
            color: #fff;
            font-size: 12px;
            flex-shrink: 0;
            padding: 0 3px;
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
