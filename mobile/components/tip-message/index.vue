<template>
  <div v-show="showTip" class="tip-box">
    <p class="tip-message">
      {{ lang.tipMain }}
      <span class="valued">({{ lang.valued }}</span>
      <span class="coin-type">HKD</span
      ><span class="price">{{ lang.price }}</span
      >)
    </p>
    <div class="tip-close" @click="changeStatus">
      <img src="/component/tip-message/close.png" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lang: this.LANGUAGE.components.tipMessage,
      showTip: true
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    changeStatus() {
      this.showTip = !this.showTip
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.tip-box {
  width: 100%;
  padding: 7px 20px;
  box-sizing: border-box;
  background-color: #f05e9a;
  display: flex;
  align-items: center;

  .tip-message {
    flex-grow: 1;
    flex-shrink: 1;
    margin-right: 10px;

    text-align: left;
    font-size: 13px;
    line-height: 20px;
    color: #ffffff;
    word-break: break-word;

    .valued {
      margin: 0 3px 0 7px;
    }

    .coin-type {
      margin-right: 2px;
      font-size: 14px;
      font-family: twCenMt;
    }

    .price {
      font-size: 14px;
      font-family: twCenMt;
    }
  }

  .tip-close {
    flex-grow: 0;
    flex-shrink: 0;

    font-size: 0;
    line-height: 0;

    img {
      width: 12px;
    }
  }
}
</style>
