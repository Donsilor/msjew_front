<template>
  <div>
    <list-content v-if="defaultCondition" :default-condition="defaultCondition" :seo="this.seoInfo"></list-content>
    <sole-out v-else></sole-out>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/jewellery/list.vue'
import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'

// 默认条件映射
const conditionMaps = {
  all: {},

  necklaces: {
    categoryId: 4
  },
  pendants: {
    categoryId: 5
  },
  'ear-stud': {
    categoryId: 6
  },
  earrings: {
    categoryId: 7
  },
  bracelets: {
    categoryId: 8
  },
  bangles: {
    categoryId: 9
  }
}

export default {
  head() {
    return this.seoInfo || {}
  },
  components: {
    ListContent,
    SoleOut
  },
  data() {
    return {
      defaultCondition:
        conditionMaps[this.$route.params.defaultCondition || 'all'] || {}
    }
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(5)
    return {
      seoInfo
    }
  }
}
</script>

<style lang="less" scoped></style>
