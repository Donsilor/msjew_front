<template>
  <layout :show="active" @onClose="hide">
    <template slot="button">
      <div class="reset" @click="clear">{{ lang.determine }}</div>
    </template>
    <template slot="content">
      <div class="swiper-box" @touchstart="touchStart">
        <div class="swiper-active-line-first" />
        <div class="swiper-active-line-second" />
        <div
          class="swiper-long"
          :style="[{ transform: `translateY(${top}%)` }]"
        >
          <div
            v-for="(l, index) in list"
            :key="index"
            class="swiper-line ow-h1"
            :class="{ 'line-active': index === activeLine }"
          >
            {{ l.content }}
          </div>
        </div>
      </div>
    </template>
  </layout>
</template>

<script>
import Mixins from './mixins'
export default {
  name: 'SwiperTap',
  mixins: [Mixins]
}
</script>

<style scoped lang="less">
.reset {
  width: 64px;
  height: 28px;
  background: rgba(242, 155, 135, 1);
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  line-height: 28px;
  display: inline-block;
}
.swiper-box {
  margin: 43-9px 0;
  height: 35 * 3px;
  box-sizing: content-box;
  overflow: hidden;
  position: relative;
  .swiper-long {
    width: 100%;
    position: absolute;
    top: 35px;
    left: 0;
    transition: all 0.2s linear;
    .swiper-line {
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      text-align: center;
    }
    .line-active {
      color: @mcPink;
    }
  }
  .swiper-active-line-first {
    width: 100%;
    height: 1px; /*no*/
    background: rgba(221, 221, 221, 1);
    position: absolute;
    top: 35px;
    left: 0;
    z-index: 3;
  }
  .swiper-active-line-second {
    width: 100%;
    height: 1px; /*no*/
    background: rgba(221, 221, 221, 1);
    position: absolute;
    top: 70px;
    left: 0;
    z-index: 3;
  }
}
</style>
