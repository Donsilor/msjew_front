<template>
  <div>
    <list-content v-if="defaultCondition" :default-condition="defaultCondition" :seo="this.seoInfo"></list-content>
    <sole-out v-else></sole-out>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/engagement-rings/list.vue'
import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'

// 默认条件映射
const conditionMaps = {
  all: {},

  // 款式映射
  solitaire: {
    style: 109
  },
  jump: {
    style: 110
  },
  'pave-set': {
    style: 111
  },
  classical: {
    style: 112
  },
  'channel-set': {
    style: 113
  },
  'halo-set': {
    style: 114
  },
  'three-stone': {
    style: 115
  },

  // 成色
  '14k-white': {
    material: 31
  },
  '18k-white': {
    material: 28
  },
  '14k-yellow': {
    material: 32
  },
  '18k-yellow': {
    material: 29
  },
  platinum: {
    material: 34
  },
  '18k-rose-gold': {
    material: 30
  },
  'channel-set': {
    material: 35
  },
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
    const seoInfo = await app.$getSeoInfo('Rings')
    return $axios({
      method: 'get',
      url: '/web/goods/style/web-site',
      params: {
        // type: 2
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
  mounted(){
    console.log(888,this.seoInfo)
  }
}
</script>

<style lang="less" scoped></style>
