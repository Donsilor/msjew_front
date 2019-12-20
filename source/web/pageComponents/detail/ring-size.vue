<template>
  <section class="popover-content">
    <h3 class="title">
      {{ $t(`${lang}.isUSSizeNow`) }}
    </h3>
    <p class="content">
      {{ $t(`${lang}.needHelpForRingSize`) }}
    </p>
    <nuxt-link class="to-helper" :to="{ path: '/' }">
      {{ $t(`${lang}.checkMyRingSize`) }}
    </nuxt-link>
  </section>
</template>

<script>
const lang = 'detail'
export default {
  data() {
    return {
      lang
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  }
}
</script>

<style lang="less" scoped>
.popover-content {
  width: 300px;
  padding: 20px 20px;

  .title {
    color: #666;
    font-size: 12px;
    margin-bottom: 12px;
  }

  .content {
    font-size: 10px;
    color: #666;
    line-height: 17px;
    margin-bottom: 9px;
    word-break: break-word;
  }

  .to-helper {
    font-size: 12px;
    text-decoration: underline;
    color: #aa8a7b;
    cursor: pointer;
  }
}
</style>
