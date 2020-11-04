<template>
  <div ref="layout-box" :class="['login-layout', language]">
    <nuxt />
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
.login-layout {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
