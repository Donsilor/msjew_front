<template>
  <div>
    <single-ring-detail v-if="info" :info="info"></single-ring-detail>
    <sole-out v-else></sole-out>
  </div>
</template>

<script>
import SingleRingDetail from '@/pageComponents/engagement-rings/detail.vue'
import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'
export default {
  head() {
    return this.seoInfo || {}
  },
  components: {
    SingleRingDetail,
    SoleOut
  },
  data() {
    return {
      info: null,
      ifHaveGoods: true,
    }
  },
  asyncData({ $axios, route, store, app }) {
    const getSingleRing = () => {
      return $axios({
        method: 'post',
        url: '/web/goods/style/detail',
        data: {
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
        .then(res => {
          var data = res.data;
          console.log(3333333,data);
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
