<template>
  <div>
    <step></step>
    <DiamondDetail :info="info"></DiamondDetail>
  </div>
</template>

<script>
import DiamondDetail from '@/pageComponents/diamonds/detail.vue'
export default {
  components: {
    DiamondDetail
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
  }
}
</script>

<style lang="less" scoped></style>
