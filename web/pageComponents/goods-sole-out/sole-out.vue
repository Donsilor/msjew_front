<template>
  <div class="sole-out">
      <div class="sole-box">
        <div class="img">
          <img src="../../static/empty/sold-out.png" alt="">
        </div>
        <div class="text">{{ $t(`${lang}.soleOut`) }}</div>
      </div>
  </div>
</template>

<script>
  const lang = 'common'
  export default {
    data() {
      return {
        lang
      }
    }
  }
</script>

<style>
  .sole-out{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
	  min-width: 1200px;
    min-height: 600px;
  }
  .sole-box{
    position: absolute;
    top: 22%;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
  }
  .sole-box .text{
    text-align: center;
    margin-top: -10px;
  }
</style>
