<template>
  <div>
    <div class="operate-bar">
      <i class="icon iconfont iconguanbi close" @click="toIndex"></i>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  middleware: 'replaceWhenTokenCanUse',
  layout: 'login',
  head() {
    return {
      title: `BBD&Co.`
    }
  },
  methods: {
    toIndex() {
      this.$router.replace({
        name: 'index'
      })
    }
  }
}
</script>

<style scoped>
.operate-bar {
  height: 17px;
  text-align: right;
  margin-bottom: 64px;
}
.operate-bar .close {
  font-size: 17px;
  color: #333333;
}
</style>
