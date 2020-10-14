<template>
  <div>
    <step></step>
    <DiamondDetail v-if="info" :info="info"></DiamondDetail>
    <!-- <sole-out></sole-out> -->
  </div>
</template>

<script>
import DiamondDetail from '@/pageComponents/diamonds/detail.vue'
// import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'
export default {
  components: {
    DiamondDetail,
    // SoleOut
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
        url: '/web/goods/style/detail',
        data: {
           goodsId: route.query.goodId || ''
        },
        // params: {
        //   goodsId: route.query.goodId || ''
        // },
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
