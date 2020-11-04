<template>
  <div ref="layout-box" :class="['layout-box', language]">
    <div class="top-bar">
      <top-bar :fixed="true"></top-bar>
    </div>
    <div ref="layout-main" class="layout-main">
      <nuxt />
    </div>
    <site-switch ref="site-switch"></site-switch>
    <!--    <live-chat></live-chat>-->
  </div>
</template>

<script>
import Mixin from './mixins'
export default {
  mixins: [Mixin]
}
</script>

<style scoped>
.layout-box {
  display: flex;
  flex-direction: column;
}
.top-bar {
  flex-grow: 0;
  flex-shrink: 0;
  height: 44px;
  z-index: 20;
}
.layout-main {
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
}
</style>
