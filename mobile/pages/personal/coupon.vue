<template>
  <div class="coupon">
    <div class="coupon-top">
      <div class="quit" @click="quit()"></div>
    </div>
    
    <div class="title">
      <i class="icon"></i>
      <span>优惠券卡包</span>
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
    height: 50px;
    line-height: 50px;
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
}
</style>
