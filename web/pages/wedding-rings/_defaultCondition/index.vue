<template>
  <div>
    <list-content v-if="defaultCondition" :default-condition="defaultCondition" :seo="this.seoInfo"></list-content>
    <sole-out v-else></sole-out>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/wedding-rings/single-ring/list.vue'
import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'

// 默认条件映射
const conditionMaps = {
  all: {},
  // 款式
  'engagement-ring': {
    styleSex: 54,
    style: 160
  },
  'wedding-ring': {
    styleSex: 54,
    style: 161
  },
  'proposal-ring': {
    styleSex: 54,
    style: 162
  },
  'fashion-ring': {
    styleSex: 54,
    style: 163
  },
  'ring': {
    styleSex: 54,
    style: 164
  },
  'couple-ring': {
    styleSex: 54,
    style: 196
  },

  // 男款
  'mens-classic': {
    styleSex: 55,
    style: 165
  },
  'mens-carved': {
    styleSex: 55,
    style: 166
  },
  'mens-diamond': {
    styleSex: 55,
    style: 167
  },
  'mens-alternative-metals': {
    styleSex: 55,
    style: 168
  },

  // 成色
  '14k-white': {
    material: 31
  },
  '18k-white': {
    material: 28
  },
  '14k-yellow': {
    material: 32
  },
  '18k-yellow': {
    material: 29
  },
  platinum: {
    material: 34
  },
  '18k-rose-gold': {
    material: 30
  },
  'channel-set': {
    material: 35
  },

  //使用场景
  'engagement-use' :{
    scenes: 45
  },
  'wedding-use' :{
    scenes: 44
  },
  'proposal-use' :{
    scenes: 46
  },
  'valentines-day-use' :{
    scenes: 49
  },
  'birthday-present-use' :{
    scenes: 48
  },
  'anniversary-use' :{
    scenes: 47
  },
  
  // 系列
  'ring-letter-series': {
    series:288
  },

  // 材质
  'alloy': {
    material: 204
  },
  '925-silver': {
    material: 35
  },
  '9k-silver': {
    material: 272
  },
  '14k-gold': {
    material: 273
  },
  '18k-gold': {
    material: 274
  },

  // 送礼对象
  'ring-Romantic-lady':{
    object:42
  },
  'ring-distinguished-man':{
    object:41
  },

  // 镶嵌方式
  'ring-group-setting':{
    mosaic:275
  },
  'ring-single-drill':{
    mosaic:276
  },

  // 风格
  'ring-modern-simplicity':{
    manner:277
  },
  'ring-classic-retro':{
    manner:278
  },
  'ring-fun-with-personality':{
    manner:279
  },
  'ring-fashion-limited':{
    manner:280
  },
}

export default {
  components: {
    ListContent
  },
  data() {
    return {
      defaultCondition:
        conditionMaps[this.$route.params.defaultCondition || 'all'] || {}
    }
  },
  async asyncData({ $axios, route, store, app }) {
    //  console.log("sssss",route)
    let seoInfo = await app.$getSeoInfo('Rings')
    // if(route.params.defaultCondition == 'engagement-ring'){
    //   seoInfo = await app.$getSeoInfo('engagementRingList')
    // }
    // if(route.params.defaultCondition =='wedding-ring'){
    //   seoInfo = await app.$getSeoInfo('weddingRingList')
    // }
    // if(route.params.defaultCondition =='ring'){
    //   seoInfo = await app.$getSeoInfo('ringList')
    // }
    // if(route.params.defaultCondition =='fashion-ring'){
    //   seoInfo = await app.$getSeoInfo('fashionRingList')
    // }
    console.log("sssss",seoInfo)
    return $axios({
      method: 'get',
      url: '/web/goods/ring/web-site',
      params: {
        type: 3
      }
    })
      .then(res => {
        var data = res.data
        return {
          seoInfo,
          ad: data.advert,
          webSite: data.webSite
        }
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style lang="less" scoped></style>
