<template>
  <div class="container">
    <!-- 顶部广告图 -->
    <div class="arrb">
      <img src="../../static/subject/subject_1.png" alt="">
    </div>
    <div class="tip clf">
      <div class="tip-list fl">
        <div class="tip-text fr">
          <div class="status">#正在活动中#</div>
          <div class="text1">优惠券使用规则：</div>
          <div class="text1">仅支持指定钻饰成品使用（具体商品请看商品详情）</div>
        </div>
      </div>
      <div class="tip-list fl">
        <div class="tip-coupon fl">
          <div class="card-list"></div>
        </div>
      </div>
    </div>

    <!-- 优惠商品列表 -->
    <div class="goods-list">
      <div class="list"></div>
    </div>

  </div>
</template>

<script>
</script>

<style scoped lang="less">
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
          background: url(discounts-bg.png) no-repeat center;
          background-size: 100% 100%;
        }

      }
    }
    .tip-list:last-of-type{
      border-left: 1px solid #860505;
    }
  }

</style>
