<template>
  <list-content :default-condition="defaultCondition" :seo="this.seoInfo"></list-content>
</template>

<script>
import ListContent from '@/pageComponents/wedding-rings/pair-ring/list.vue'
export default {
  components: {
    ListContent
  },
  data() {
    return {
      defaultCondition: {
        style: null
      }
    }
  },
  async asyncData({ $axios, route, store, app }) {
    // console.log("sssss",route)
    let seoInfo = await app.$getSeoInfo('Rings')
    if(route.name  =='wedding-rings-classic-series'){
      seoInfo = await app.$getSeoInfo('classicSeriesList')
    }
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
  }
}
</script>

<style lang="less" scoped></style>
