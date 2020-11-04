<template>
  <div class="sole-out">
      <div class="sole-box">
        <div class="img">
          <img src="../../static/empty/list.png" alt="">
        </div>
        <div class="text">{{ lang.soleOut }}</div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lang: this.LANGUAGE.components.empty
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
    z-index: 5;
	min-width: 1366px;
  min-height: 600px;
  background: #fff;
  }
  .sole-box{
    position: absolute;
    top: 22%;
    left: 14%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
  }
  .sole-box .text{
    font-size: 18px;
    color:#999;
    text-align: center;
    margin-top: -10px;
  }
</style>
