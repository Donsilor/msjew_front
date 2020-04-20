<template>
  <div class="list-page">
    <scroll-box @arrivalBottom="arrivalBottom">
      <data-list ref="data-list" @clickData="clickData"></data-list>
    </scroll-box>
  </div>
</template>

<script>
import DataList from './pair-ring-list.vue'
export default {
  head() {
    return this.seoInfo || {}
  },
  layout: `no-footer-bar`,
  components: {
    DataList
  },
  data() {
    return {}
  },
  async asyncData({ $axios, route, store, app }) {
    const seoInfo = await app.$getSeoInfo(3)

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
      // console.log('data===>', data)
      this.$router.push({
        name: 'marriage-ring-pair-ring-detail',
        query: {
          goodId: data.ringId,
          ringType : 'pair'
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.list-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>
