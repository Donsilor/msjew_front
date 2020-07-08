<template>
  <div class="list-page">
    <scroll-box @arrivalBottom="arrivalBottom">
      <data-list ref="data-list" @clickData="clickData"></data-list>
    </scroll-box>
  </div>
</template>

<script>
import DataList from './list-body.vue'
export default {
  head() {
    return this.seoInfo || {}
  },
  name: 'List',
  layout: `no-footer-bar`,
  components: {
    DataList
  },
  data() {
    return {}
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo('Diamond')

    return $axios({
      method: 'get',
      url: '/wap/goods/ring/web-site',
      params: {
        // type: 3
      }
    })
      .then(data => {
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
  methods: {
    arrivalBottom() {
      this.$refs['data-list'].getNextPage()
    },
    clickData(data) {
      this.$router.push({
        name: 'diamond-diamonds',
        query: {
          goodId: data.id
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
