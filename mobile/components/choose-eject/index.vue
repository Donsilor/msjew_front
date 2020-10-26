<template>
  <div :class="['eject', { active: active }]">
    <div class="bg" @click="closeEmit"></div>
    <div class="eject-box">
      <div class="top">
        <div class="title">
          <slot name="title">
            {{ title }}
          </slot>
        </div>
        <i class="iconfont iconguanbi close" @click="closeEmit"></i>
      </div>
      <div class="content">
        <quality-data
          v-if="type === 'quality'"
          ref="data-options"
          :required="required"
          :multiple="multiple"
          :options="options"
          @change="chooseOption"
        ></quality-data>
        <series-data
          v-if="type === 'series'"
          ref="data-options"
          :required="required"
          :multiple="multiple"
          :options="options"
          @change="chooseOption"
        ></series-data>
        <style-data
          v-if="type === 'style'"
          ref="data-options"
          :required="required"
          :multiple="multiple"
          :options="options"
          @change="chooseOption"
        ></style-data>
        <mosaic-data
          v-if="type === 'mosaic'"
          ref="data-options"
          :multiple="multiple"
          :options="options"
          @change="chooseOption"
        ></mosaic-data>
        <object-data
          v-if="type === 'object'"
          ref="data-options"
          :multiple="multiple"
          :options="options"
          @change="chooseOption"
        ></object-data>
      </div>
      <div class="button">
        <button class="clear-btn" @click="clearChoose">
          {{ lang.clear }}
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
  z-index: 22;
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
  background-color: rgba(0, 0, 0, 0.6);
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
  box-shadow: 0 -5px 20px 0 rgba(153, 153, 153, 0.2);
}

/*顶部*/
.top {
  height: 40px;
  line-height: 30px;
  padding: 0 15px;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid #f6f6f6;
  box-sizing:border-box;
  color: #000;
}
.close {
  position: absolute;
  top: 6px;
  right: 20px;
  width: 20px;
  height: 20px;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #d2d2d2;
}
.title {
  text-align: center;
  font-size: 16px;
  color: #333333;
  box-sizing: border-box;
}
.clear-btn {
  width: 90%;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  border-radius: 16px;
  background-color: #f29b87;
}

/*内容区域*/
.content {
  max-height: 70vh;
  overflow: auto;
}

</style>
