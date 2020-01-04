<template>
  <div class="no-more-data">
    <div class="no-more-img">
      <img src="../../static/search/search.png" alt="">
    </div>
    <div class="no-more-row">
      <i class="iconfont iconwugengduo"></i>
      <span>{{ $t(`${lang}.noMore`) }}</span>
    </div>
  </div>
</template>
<script>
const lang = 'components.noMoreData'
export default {
  data() {
    return {
      lang
    }
  }
}
</script>

<style lang="less" scoped="scoped">
 .no-more-img{
    text-align: center;
    margin-bottom: 20px;
  }
    .no-more-img{
      width: 100%;
    }
.no-more-data {
  // height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .iconfont {
    margin-right: 8px;
    font-size: 16px;
    color: rgba(153, 153, 153, 1);
  }
  span {
    height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
.no-more-row{
  display: flex;
  align-items: center;
}
</style>
