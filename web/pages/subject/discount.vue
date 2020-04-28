<template>
  <div class="container">       <!-- 折扣券 -->
    <!-- 顶部广告图 -->
    <div class="arrb">
      <img src="../../static/subject/subject_1.png" alt="">
    </div>
    <div class="tip clf">
      <div class="tip-list fl">
        <div class="tip-text fr">
          <div class="status">#正在活动中#</div>
          <div class="text1">仅支持   ：此专题内商品使用  （具体请看商品详情）</div>
          <div class="text1">活动时间：2020.2.14 - 2020.2.24    (过期恢复原价)</div>
          <div class="text1">活动地区：中国大陆、中国香港 (其他地区暂不参与)</div>
        </div>
      </div>
      <div class="tip-list fl">
        <div class="tip-coupon fl clf">
          <div class="card-list fl">
            <div class="card-left">折扣券</div>
            <div class="card-right">
              <div class="price-box">
                <div class="price">
                  <span class="num">7.5</span>
                  <span class="sign">折</span>
                </div>
                <div class="text">活动专场商品</div>
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
          <div class="goods-img">
            <img src="../../static/adt/image1564544333790.png" alt="">
          </div>
          <div class="price old-price">
            <div class="currency"><span>原价</span>HKD</div>
            <div class="num">{{ formatMoney(item.price) }}</div>
          </div>
          <div class="price">
            <div class="currency"><span>折后加</span>HKD</div>
            <div class="num">{{ formatMoney(item.price) }}</div>
          </div>

          <div class="name">
            <span class="icon">7.5折</span>
            <div class="text">{{item.text}}</div>
          </div>
        </div>

        <div class="sign">
          <div class="text">7.5折</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        discountsList: [
          { price: '22222', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'},
          { price: '11111', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'},
          { price: '333333', text: '18K白金钻石项链(0.13克拉(0.13克拉总重量)'},
          { price: '555', text: '18K白金钻量)'},
          { price: '6666', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'},
          { price: '777777', text: '18K白金钻石项链(0.13克拉总重量)项链(0.13克拉总重量)项链(0.13克拉总重量)'}
        ]
      }
    }
  }
</script>

<style scoped lang="less">
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
          margin: 20px 0 24px;
        }

        .text1{
          font-size: 20px;
          line-height: 28px;
          padding-left: 6px;
          box-sizing: border-box;
        }
      }
      .tip-coupon{
        height: 134px;
        margin: 15px 0 0 80px;

        .card-list{
          position: relative;
          width: 284px;
          height: 134px;
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
            width: 62px;
            font-size: 25px;
            color: #f0f0f0;
            padding: 0 20px;
            box-sizing: border-box;
            text-align: center;
          }

          .card-right{
            position: absolute;
            top: 0;
            left: 62px;
            width: 220px;
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
                  font-size: 75px;
                  letter-spacing: -4px;
                }

                .sign{
                  font-size: 25px;
                  margin: 0 0 6px 6px;
                }
              }

              .text{
                font-size: 16px;
                margin-bottom: 10px;
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
          margin-bottom: 14px;
        }

        .price{
          height: 30px;
          line-height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #860505;

          .num{
             margin-left: 10px;
          }
        }

        .price.old-price{
          color: #a3a3a3;
          text-decoration: line-through;
        }

        .name{
          display: flex;
          justify-content: center;
          height: 44px;
          padding: 0 10px;
          box-sizing: border-box;
          margin-top: 10px;

          .icon{
            width: 62px;
            height: 26px;
            background: url(../../static/subject/icon_03.png) no-repeat center;
            background-size: 100% 100%;
            text-align: center;
            line-height: 26px;
            color: #fff;
            font-size: 12px;
            flex-shrink: 0;
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
