<template>
  <div
    ref="layout-box"
    :class="['layout-box', language]"
    @scroll="layoutScroll"
  >
    <div class="layout-header">
      <top-bar ref="top-bar"></top-bar>
    </div>
    <div class="layout-page-content">
      <nuxt />
    </div>
    <div class="layout-footer">
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import Mixin from './mixins'
export default {
  mixins: [Mixin],
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      // _this.getSetting()
      if (!_this.$store.state.coin || !_this.$store.state.language) {
      }
    })
  },
  methods: {
    layoutScroll(e) {
      const topBar = this.$refs['top-bar']
      if (e.target.scrollTop > 0) {
        topBar.fixed(true)
      } else {
        topBar.fixed(false)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-box {
  overflow: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  .layout-header {
    flex-shrink: 0;
    flex-grow: 0;
  }

  .layout-page-content {
    flex-grow: 1;
    flex-shrink: 0;
  }

  .layout-footer {
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>
