<template>
  <div :class="['guide', { showing: showing }]">
    <div class="guide-props">
      <div class="props-bar">
        <span class="props-bar-title">{{ $t(`${lang}.title`) }}</span>
        <span class="props-bar-close" @click="hide">×</span>
      </div>
      <div class="props-content">
        <p>
          {{ $t(`${lang}.p1`) }}
        </p>
        <p class="important">
          {{ $t(`${lang}.p2`) }}<br />
          {{ $t(`${lang}.p3`) }}<br />
          {{ $t(`${lang}.p4`) }}<br />
          {{ $t(`${lang}.p5`) }}<br />
          {{ $t(`${lang}.p6`) }}
        </p>
        <p>
          {{ $t(`${lang}.p7`) }}<br />
          {{ $t(`${lang}.p8`) }}
        </p>
      </div>
      <div class="props-btn-group">
        <button @click="hide">{{ $t(`${lang}.hide`) }}</button>
      </div>
    </div>
  </div>
</template>

<script>
const lang = `components.eftGuide`
export default {
  name: 'Guide',
  data() {
    return {
      lang,
      showing: false
    }
  },
  methods: {
    show() {
      this.showing = true
    },
    hide() {
      this.showing = false
    }
  }
}
</script>

<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.guide {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.1s linear;
  z-index: 1300;
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
    color: #8b766c;
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
  }
}
</style>
