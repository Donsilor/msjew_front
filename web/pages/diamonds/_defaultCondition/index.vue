<template>
  <div>
    <list-content v-if="defaultCondition" :default-condition="defaultCondition" :seo="this.seoInfo"></list-content>
    <sole-out v-else></sole-out>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/diamonds/list.vue'
import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'

// 默认条件映射
const conditionMaps = {
  all: {},
  // 形状
  'round-cut': {
    shape: 16
  },
  'oval-cut': {
    shape: 17
  },
  'princess-cut': {
    shape: 54
  },
  'emerald-cut': {
    shape: 55
  },
  'heart-shaped': {
    shape: 56
  },
  'marquise-cut': {
    shape: 57
  },
  'cushion-cut': {
    shape: 58
  },
  'pear-shaped': {
    shape: 59
  },
  'asscher-cut': {
    shape: 60
  },
  'radiant-cut': {
    shape: 61
  }
}

export default {
  components: {
    ListContent
  },
  data() {
    return {
      defaultCondition:
        conditionMaps[this.$route.params.defaultCondition || 'all'] || {}
    }
  },
  async asyncData({ $axios, route, store, app }) {
    // console.log("sssss",route)
    const seoInfo = await app.$getSeoInfo('diamond')

    return $axios({
      method: 'get',
      url: '/web/goods/diamond/web-site',
      params: {
        // type: 4
      }
    })
      .then(res => {
        var data = res.data;
        return {
          seoInfo,
          ad: data.advert,
          webSite: data.webSite
        }
      })
      .catch(err => {
        console.error(err)
      })
  },
}
</script>

<style lang="less" scoped></style>
