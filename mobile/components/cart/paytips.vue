<template>
  <div class="pay-tips">
    <div class="content">
      <div class="top">
        <i class="icon iconfont iconguanbi" @click="back"></i>
      </div>
      <p class="font-size-14 color-666 margin-top-20">
        {{ lang.wireTransferMessage }}
      </p>
      <b class="font-size-14 color-333">{{ lang.wireTransferMaterial }}：</b>
      <p class="font-size-14 color-333">
        {{ lang.accountNumber }}：016 - 494 - 475522173
      </p>
      <p class="font-size-14 color-333">
        {{ lang.payeeBank }}：DBS BANK (Hong Kong) Limited
      </p>
      <p class="font-size-14 color-333">
        {{ lang.payeeBankAddress }}：11/F, The Center, 99 Queen’s
      </p>
      <p class="font-size-14 color-333">
        Road Central, Hong Kong
      </p>
      <p class="font-size-14 color-333">
        Swift Address：DHBKHKHH
      </p>
      <p class="font-size-14 color-333 margin-top-30">
        {{ lang.orderMessage }}
      </p>
      <p class="font-size-12 color-red">
        {{ lang.attention }}
      </p>
      <p class="font-size-14 color-333 margin-bottom-30">
        {{ lang.afterPay }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.cart,
      selectIndex: true,
      num: 1
    }
  },
  methods: {
    back() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
.pay-tips {
  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    text-align: left;
    word-break: break-word;
    .top {
      font-size: 14px;
      padding: 15px 20px 10px;
      text-align: right;
    }
    p {
      padding: 0 20px;
      line-height: 24px;
    }
    .color-red {
      color: #f23128;
      margin: 8px 0 10px;
    }
    b {
      display: inline-block;
      padding: 0 20px;
      margin-top: 28px;
      line-height: 24px;
    }
  }
}
</style>
