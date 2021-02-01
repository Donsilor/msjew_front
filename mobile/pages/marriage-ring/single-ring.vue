<template>
  <div class="list-page">
    <scroll-box @arrivalBottom="arrivalBottom">
      <data-list ref="data-list" @clickData="clickData"></data-list>
    </scroll-box>
  </div>
</template>

<script>
import DataList from './single-ring-list.vue'
export default {
  head() {
    return this.seoInfo || {}
  },
  layout: 'no-footer-bar',
  components: {
    DataList
  },
  data() {
    return {}
  },
   async asyncData({ $axios, route, store, app }) {
         console.log("route",route)
    const seoInfo = await app.$getSeoInfo('Rings')

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
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    arrivalBottom() {
      this.$refs['data-list'].getNextPage()
    },
    clickData(data) {
      let ringType = ''
      if(data.categoryId == 19){
        ringType = 'pair'
        this.$router.push({
          name: 'marriage-ring-pair-ring-detail',
          query: {
            goodId: data.id,
            ringType : ringType
          }
        })
      } else if(data.categoryId == 2){
        ringType = 'single'
        this.$router.push({
          name: 'marriage-ring-single-ring-detail',
          query: {
            goodId: data.id,
            ringType : ringType
          }
        })
      }
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
