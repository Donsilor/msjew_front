<template>
  <pair-ring-detail v-if="ringType === 'pair'" :info="info"></pair-ring-detail>
  <single-ring-detail
    v-else-if="ringType === 'single'"
    :info="info"
  ></single-ring-detail>
  <!--  <single-ring-detail v-if="true" :info="info"></single-ring-detail>-->
  <!--  <pair-ring-detail v-else :info="info"></pair-ring-detail>-->
</template>

<script>
import PairRingDetail from '@/pageComponents/wedding-rings/pair-ring/detail.vue'
import SingleRingDetail from '@/pageComponents/wedding-rings/single-ring/detail.vue'
export default {
  head() {
    return this.seoInfo || {}
  },
  components: {
    PairRingDetail,
    SingleRingDetail
  },
  data() {
    return {
      info: null
    }
  },
  asyncData({ $axios, route, store, app }) {
    const ringType = route.query.ringType
    const getPairRing = () => {
      return $axios({
        method: 'post',
        url: '/web/ring/ringDetail',
        params: {
          id: route.query.goodId || ''
        },
        transformRequest: [
          function(data) {
            let ret = ''
            for (const it in data) {
              // 过滤空元素
              if (data[it] === '' || data[it] === null) {
                continue
              }
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          return {
            info: data,
            ringType,
            seoInfo: app.$getDetailSeoInfo(data)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
    const getSingleRing = () => {
      return $axios({
        method: 'post',
        url: '/web/goods/goodsDetail',
        params: {
          goodsId: route.query.goodId || ''
        },
        transformRequest: [
          function(data) {
            let ret = ''
            for (const it in data) {
              // 过滤空元素
              if (data[it] === '' || data[it] === null) {
                continue
              }
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(data => {
          return {
            info: data,
            ringType,
            seoInfo: app.$getDetailSeoInfo(data)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    const maps = {
      pair: getPairRing,
      single: getSingleRing
    }

    return ringType ? maps[ringType]() : {}
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      // 读取路径上的参数cut：{{
      //   $route.params.productTitle
      // }}，且引入钻石商品详情页面文件，使用query中的id调用接口获取商品数据
    })
  }
}
</script>

<style lang="less" scoped></style>
