<template>
  <div class="error-box">
    <div class="img-box">
      <img src="../static/error/500.png" alt="">
      <div class="text">{{ $t(`${lang}.error`) }}</div>
    </div>
  </div>
</template>

<script>
  const lang = 'common'
  export default {
    data() {
      return {
        lang,
      }
    }
  }
</script>

<style>
  .error-box{
    display: flex;
    width: 100%;
    height: 100%;
  }
  .img-box{
    width: 240px;
    height: 266px;
    margin: 50px auto 0;
    position: relative;
  }
  .img-box img{
    width: 100%;
    height: 100%;
  }
  .img-box .text{
    width: 80px;
    height: 22px;
    position: absolute;
    top: 116px;
    right: 50px;
    font-size: 14px;
    color: #cf9f96;
    text-align: center;
    line-height: 22px;
  }
</style>
