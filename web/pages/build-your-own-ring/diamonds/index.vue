<template>
  <div>
    <step></step>
    <list :seo="this.seoInfo"></list>
  </div>
</template>

<script>
import list from '@/pageComponents/diamonds/list'
export default {
  components: {
    list
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(2)
    console.log(33);
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
}
</script>

<style lang="less" scoped></style>
