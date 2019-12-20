<template>
  <div>
    <step></step>
    <Details :info="info"></Details>
  </div>
</template>

<script>
import details from '@/pageComponents/wedding-rings/single-ring/detail.vue'
export default {
  components: {
    Details: details
  },
  data() {
    return {
      info: null
    }
  },
  asyncData({ $axios, route, store }) {
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
            info: data
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
