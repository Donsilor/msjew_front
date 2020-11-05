<template>
  <div class="need-know">
    <div class="content">
      <h4>{{ lang.mustKnow }}</h4>
      <p class="test-1">{{ lang.mustKnowContent }}</p>
      <p>{{ lang.shippingInsuranceContent }}</p>
      <div class="btn" @click="back">{{ lang.iKnowIt }}</div>
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
.need-know {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  text-align: left;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 345px;
    height: 492px;
    overflow: auto;
    margin: -256px -172px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    h4 {
      font-size: 18px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      margin: 30px 0 20px;
      text-align: center;
    }
    p {
      display: block;
      width: 289px;
      max-height: 240px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 24px;
      margin: 0 auto;
      overflow: auto;
    }
    .test-1::-webkit-scrollbar {
      background: #f29b87;
    }
    .test-1::-webkit-scrollbar-thumb {
      background: #dddddd;
    }
    .test-1::-webkit-scrollbar-track {
      background: #efefef;
    }
    b {
      display: block;
      width: 289px;
      font-size: 14px;
      font-weight: 400;
      color: #947465;
      margin: 0 auto;
      line-height: 32px;
    }
    .btn {
      width: 220px;
      height: 40px;
      margin: 18px auto 30px;
      background: rgba(242, 155, 135, 1);
      border-radius: 8px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>
