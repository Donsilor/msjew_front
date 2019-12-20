<template>
  <jewellery-detail :info="info"></jewellery-detail>
</template>

<script>
import JewelleryDetail from '@/pageComponents/jewellery/detail.vue'
export default {
  head() {
    return this.seoInfo || {}
  },
  components: {
    JewelleryDetail
  },
  data() {
    return {
      info: null
    }
  },
  asyncData({ $axios, route, store, app }) {
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
            seoInfo: app.$getDetailSeoInfo(data)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }

    return getSingleRing()
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
