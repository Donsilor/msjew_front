<template>
  <jewellery-detail v-if="info" :info="info" :seo="this.seoInfo"></jewellery-detail>
  <sole-out v-else></sole-out>
</template>

<script>
import JewelleryDetail from '@/pageComponents/jewellery/detail.vue'
import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'
export default {
  // head() {
  //   return this.seoInfo || {}
  // },
  components: {
    JewelleryDetail,
    SoleOut
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
        url: '/web/goods/style/detail',
        data: {
          goodsId: route.query.goodId || '',
          backend: route.query.backend || ''
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
        .then(res => {
          var data = res.data;
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
      // }}，且引入莫桑石商品详情页面文件，使用query中的id调用接口获取商品数据
    })
  }
}
</script>

<style lang="less" scoped></style>
