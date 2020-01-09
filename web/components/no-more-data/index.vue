<template>
  <div class="no-more-data" v-if="type == 1">
    <div class="no-more-img type-a">
      <img src="../../static/search/search.png" alt="">
    </div>
    <div class="no-more-row">
      <span>{{ $t(`${lang}.noMore`) }}</span>
      <span class="under-line"  @click="changeKey()">{{ $t(`${lang}.changeKeyword`) }}</span>
    </div>
  </div>

  <div class="no-more-data" v-else>
    <div class="no-goods-img">
      <img src="../../static/search/product.png" alt="">
    </div>
    <div class="no-more-row text-two">
      <span>{{ $t(`${lang}.noGoods`) }}</span>
    </div>
  </div>
</template>
<script>
const lang = 'components.noMoreData'
export default {
  data() {
    return {
      lang,
      type : 0
    }
  },
  props:['type'],
  methods:{
    changeKey(){
      this.$emit('changeFn',true)
    }
  }
}
</script>

<style lang="less" scoped="scoped">

.no-more-data {
  // height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 40px 0 20px;

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
  flex-direction: column;
  margin-top: 18px;
}
.no-more-row .under-line{
  color: #e4c1bb;
  margin-top: 8px;
  text-decoration: underline;
  cursor: pointer;
}
.no-more-img{
  text-align: center;
  width: 100%;
}

.no-goods-img{
  width: 246px;
  height: 246px;
}

.no-more-data .text-two{
  margin-top: 20px;
}
.type-a{
  margin-top: 60px;
}
</style>
