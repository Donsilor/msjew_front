<template>
  <div :class="['eject', { active: active }]">
    <div class="bg" @click="closeEmit"></div>
    <div class="eject-box">
      <div class="top">
        <i class="iconfont iconguanbi close" @click="closeEmit"></i>
        <div class="title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <div class="button">
          <i class="iconfont iconzhongzhi" @click="resetChoose"></i>
        </div>
      </div>
      <div class="content">
        <quality-data
          v-if="type === 'quality'"
          ref="data-options"
          :multiple="multiple"
          :options="options"
          @change="chooseOption"
        ></quality-data>
        <style-data
          v-if="type === 'style'"
          ref="data-options"
          :multiple="multiple"
          :options="options"
          @change="chooseOption"
        ></style-data>
        <shape-data
          v-if="type === 'shape'"
          ref="data-options"
          :multiple="multiple"
          :options="options"
          @change="chooseOption"
        ></shape-data>
      </div>
      <div class="button-group">
        <button class="full-btn clear-btn" @click="clearChoose">
          {{ lang.checkResult }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from './mixin.js'
export default {
  mixins: [Mixins]
}
</script>

<style scoped>
.eject {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  visibility: hidden;
}
.eject.active {
  visibility: visible;
}
.bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.1s linear;
}
.eject.active .bg {
  /*background-color: rgba(0, 0, 0, 0.5);*/
}
.eject-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding: 10px 0;
  box-sizing: border-box;
  box-shadow: 0 10px 30px 1px rgba(0, 0, 0, 0); /*no*/
  border-radius: 8px 8px 0 0;
  background-color: #ffffff;
  transform: translate(0, 100%);
  transition: all 0.2s linear;
}
.eject.active .eject-box {
  transform: translate(0, 0);
  box-shadow: 0 -5px 20px 0 rgba(153, 153, 153, 0.2); /*no*/
}

/*.eject-box {*/
/*  position: fixed;*/
/*  top: 100%;*/
/*  left: 0;*/
/*  width: 100%;*/
/*  height: auto;*/
/*  padding: 10px 0;*/
/*  box-sizing: border-box;*/
/*  box-shadow: 0 10px 30px 1px rgba(0, 0, 0, 0);*/
/*  border-radius: 8px 8px 0 0;*/
/*  background-color: #ffffff;*/
/*  transform: translate(0, 0);*/
/*  transition: all 0.2s linear;*/
/*}*/
/*.eject.active .eject-box {*/
/*  transform: translate(0, -100%);*/
/*  box-shadow: 0 10px 30px 1px rgba(0, 0, 0, 0.5);*/
/*}*/

/*顶部*/
.top {
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close {
  flex-basis: 20px;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
  font-size: 18px;
  line-height: 18px;
  color: #bbbbbb;
}
.title {
  flex-basis: 220px;
  flex-grow: 0;
  flex-shrink: 0;
  text-align: center;
  font-size: 16px;
  line-height: 16px;
  color: #333333;
}
.button {
  flex-basis: 30px;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: right;
}
.button .iconfont {
  font-size: 20px;
  line-height: 20px;
  color: #bbbbbb;
}

/*内容区域*/
.content {
  max-height: 70vh;
  overflow: auto;
}
.button-group {
  padding: 0 15px;
  box-sizing: border-box;
}
.clear-btn {
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  background-color: #f29b87;
}
</style>
