<template>
  <div class="list-page">
    <data-list ref="data-list" @clickData="clickData" :seo = "seoInfo"></data-list>
  </div>
</template>

<script>
import DataList from '../diamond-factory/list-body.vue'
export default {
  head() {
    return this.seoInfo || {}
  },
  name: 'List',
  layout: `no-bar`,
  components: {
    DataList
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo('diamond')
    // return
    return $axios({
      method: 'get',
      url: '/wap/goods/style/web-site',
      params: {
        type: 2
      }
    })
      .then(data => {
        // console.log(444444,data)
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
    const _this = this
  
    _this.$nextTick(() => {
      this.$nuxt.$loading.start()
    })
  },
  methods: {
    getNextPage() {
      if (this.$refs[`data-list`].getNextPage) {
        this.$refs[`data-list`].getNextPage()
      }
    },
    clickData(data) {
      const melo = JSON.parse(
        this.$helpers.base64Decode(this.$route.query.melo)
      )
      melo.steps[1].page = `detail`
      this.$router.push({
        name: 'custom-made-ring-made-diamond-detail',
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(melo)),
          goodId: data.id,
          step: 2
        }
      })
    }
  }
}
</script>

<style scoped>
.list-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: white;
}
</style>
