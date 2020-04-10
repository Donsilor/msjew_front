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
  all: {
    typeId:4,
    categoryId:''
  },
  necklaces: {
    typeId:4,
    categoryId: 4
  },
  pendants: {
    typeId:5,
    categoryId: 5
  },
  'ear-stud': {
    typeId:6,
    categoryId: 6
  },
  earrings: {
    typeId:7,
    categoryId: 7
  },
  bracelets: {
    typeId:8,
    categoryId: 8
  },
  bangles: {
    typeId:9,
    categoryId: 9
  },
   //导航项链
  'necklace-pendant':{
    typeId:4,
    categoryId:[4,5]
  },
  'bracelet-bangle':{
    typeId:4,
    categoryId:[8,9]
  },
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
