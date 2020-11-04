<template>
  <div>
    <list-content :seo="this.seoInfo"></list-content>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/search/list.vue'
export default {
  head() {
    return this.seoInfo || {}
  },
  components: {
    ListContent
  },
  async asyncData({ $axios, route, store, app }) {
    let seoInfo = await app.$getSeoInfo('Jewellery')
    // console.log("sssss",seoInfo)
    return {
      seoInfo
    }
  }
}
</script>

<style lang="less" scoped></style>
