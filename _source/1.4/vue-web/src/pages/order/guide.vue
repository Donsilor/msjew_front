<template>
  <div :class="['guide', {'showing': showing}]">
    <div class="guide-props">
      <div class="props-bar">
        <span class="props-bar-title">{{ lang.eGuide }}</span>
        <span
          class="props-bar-close"
          @click="hide">×</span>
      </div>
      <div class="props-content">
        <p>
          {{ lang.guide1 }}
        </p>
        <p class="important">
          {{ lang.guide2 }}<br>
          {{ lang.guide3 }}<br>
          {{ lang.guide4 }}<br>
          {{ lang.guide5 }}<br>
          {{ lang.guide6 }}
        </p>
        <p>
          {{ lang.guide7 }}<br>
          {{ lang.guide8 }}
        </p>
      </div>
      <div class="props-btn-group">
        <button @click="hide">{{ lang.iKnow }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Guide',
  data() {
    return {
      showing: false,
      lang: this.$LANGUAGE.finishPay
    };
  },
  methods: {
    show() {
      this.showing = true;
    },
    hide() {
      this.showing = false;
    }
  }
};
</script>

<style lang="less" scoped>
  .guide {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.1s linear;
    z-index: 10;
    opacity: 0;
    visibility: hidden;
  }
  .guide.showing {
    opacity: 1;
    visibility: visible;
  }

  .guide-props {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 480px;
    background-color: #ffffff;
    transform: translate(-50%, -50%) scale(0, 0);
    transition: all 0.2s linear;
  }
  .showing .guide-props {
    transform: translate(-50%, -50%) scale(1, 1);
  }

  .props-bar {
    position: relative;
    height: 50px;
    padding: 0 30px;
    line-height: 50px;
    text-align: center;
    box-sizing: border-box;
    background: rgba(248, 240, 240, 1);
  }

  .props-bar-title {
    font-size: 18px;
    color: #333333;
  }

  .props-bar-close {
    position: absolute;
    right: 10px;
    font-size: 28px;
    color: #999999;
    cursor: pointer;
  }

  .props-content {
    padding: 15px 32px 10px 45px;

    p {
      color: #666666;
      font-size: 12px;
      line-height: 23px;
      padding: 10px 0;
      /*word-break: break-all;*/
    }

    p.important {
      color: #8B766C;
    }
  }

  .props-btn-group {
    text-align: center;
    padding-bottom: 28px;

    button {
      width: 240px;
      height: 40px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(139, 118, 108, 1);
      text-align: center;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(139, 118, 108, 1);
      outline: 0;
    }
  }

</style>
