<template>
  <div>
    <list-content v-if="defaultCondition" :default-condition="defaultCondition" :seo="this.seoInfo"></list-content>
    <sole-out v-else></sole-out>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/jewellery/list.vue'
import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'

// 默认条件映射
const conditionMaps = {
  all: {
    typeId:4,
    categoryId:''
  },
  // 项链
  necklaces: {
    typeId:4,
    categoryId: 4
  },
  // 吊坠
  pendants: {
    typeId:4,
    categoryId: 5
  },
  // 耳钉  
  earStud: {
    typeId:4,
    categoryId: 6
  },
  // 饰品-耳环
  earrings: {
    typeId:4,
    categoryId: 7
  },
  // 饰品-手链
  bracelets: {
    typeId:4,
    categoryId: 8
  },
  // 饰品-手镯
  bangles: {
    typeId:4,
    categoryId: 9
  },
  // 饰品-摆件
  decoration: {
    typeId:4,
    categoryId: 16
  },
  // 饰品-挂件
  widgets: {
    typeId:4,
    categoryId: 17
  },
  // 饰品-其他
  'others': {
    typeId:4,
    categoryId: 18
  },
  // 耳饰
  Earring: {
    typeId:4,
    // categoryId: [21]
    categoryId: [6,21,22,23,24]
  },
  // 耳饰-耳环
  Earrings: {
    typeId:4,
    categoryId: 22
  },
  // 耳饰-耳线
  EarLine: {
    typeId:4,
    categoryId: 23
  },
  // 耳饰-耳坠
  EarDrop: {
    typeId:4,
    categoryId: 24
  },
   //导航
  'necklace-pendant':{
    typeId:4,
    categoryId:[4,5]
  },
  'bracelet-bangle':{
    typeId:4,
    categoryId:[8,9]
  },
  'earrings-stud':{
    typeId:4,
    categoryId:[6,7]
  },
  'decoration-widgets':{
    typeId:4,
    categoryId:[16,17]
  },




  //项链-成色
  'necklace-pendant-18k-white':{
    typeId:4,
    categoryId:[4,5],
    materialIndex : 0
  },
  'necklace-pendant-18K-yellow':{
    typeId:4,
    categoryId:[4,5],
    materialIndex : 1
  },
  'necklace-pendan-18k-rose-gold':{
    typeId:4,
    categoryId:[4,5],
    materialIndex : 2
  },
  'necklace-pendant-platinum':{
    typeId:4,
    categoryId:[4,5],
    materialIndex : 3
  },
  'necklace-pendant-fineSilver':{
    typeId:4,
    categoryId:[4,5],
    materialIndex : 4
  },


  //手链-成色
  'bracelet-bangle-18k-white':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 0
  },
  'bracelet-bangle-18K-yellow':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 1
  },
  'bracelet-bangle-18k-rose-gold':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 2
  },
  'bracelet-bangle-platinum':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 3
  },
  'bracelet-bangle-fineSilver':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 4
  },



   //项链使用场景
  'necklace-pendant-valentines-day' :{
    typeId:4,
    categoryId:[4,5],
    scenes: 197
  },
  'necklace-pendant-mothers-day' :{
    typeId:4,
    categoryId:[4,5],
    scenes: 198
  },
  'necklace-pendant-birthday-present' :{
    typeId:4,
    categoryId:[4,5],
    scenes: 199
  },
  'necklace-pendant-christmas-gift' :{
    typeId:4,
    categoryId:[4,5],
    scenes: 200
  },
  'necklace-pendant-halloween-gift' :{
    typeId:4,
    categoryId:[4,5],
    scenes: 201
  },



  //手链使用场景
  'bracelet-bangle-valentines-day' :{
    typeId:4,
    categoryId:[8,9],
    scenes: 197
  },
  'bracelet-bangle-mothers-day' :{
    typeId:4,
    categoryId:[8,9],
    scenes: 198
  },
  'bracelet-bangle-birthday-present' :{
    typeId:4,
    categoryId:[8,9],
    scenes: 199
  },
  'bracelet-bangle-christmas-gift' :{
    typeId:4,
    categoryId:[8,9],
    scenes: 200
  },
  'bracelet-bangle-halloween-gift' :{
    typeId:4,
    categoryId:[8,9],
    scenes: 201
  },

  //主题使用场景
  'valentines-day' :{
    scenes: 197
  },
  'mothers-day' :{
    scenes: 198
  },
  'birthday-present' :{
    scenes: 199
  },
  'christmas-gift' :{
    scenes: 200
  },
  'halloween-gift' :{
    scenes: 201
  },
  



   // 项链-系列
  'necklace-letter-series': {
    typeId:4,
    categoryId:[4,5],
    series:288
  },

  // 手链-系列
  'bracelet-letter-series': {
    typeId:4,
    categoryId:[8,9],
    series:288
  },

  // 耳饰-系列
  'earring-letter-series': {
    typeId:4,
    categoryId:[6],
    series:288
  },


  // 项链-材质
  'necklace-alloy': {
    typeId:4,
    categoryId:[4,5],
    materialIndex : 0
  },
  'necklace-925-silver': {
    typeId:4,
    categoryId:[4,5],
    materialIndex : 1
  },
  'necklace-9k-gold': {
    typeId:4,
    categoryId:[4,5],
    materialIndex : 2
  },
  'necklace-14k-gold': {
    typeId:4,
    categoryId:[4,5],
    materialIndex : 3
  },
  'necklace-18k-gold': {
    typeId:4,
    categoryId:[4,5],
    materialIndex : 4
  },

  //手链-材质
  'bracelet-alloy':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 0
  },
  'bracelet-925-silver':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 1
  },
  'bracelet-9k-gold':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 2
  },
  'bracelet-14k-gold':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 3
  },
  'bracelet-18k-gold':{
    typeId:4,
    categoryId:[8,9],
    materialIndex : 4
  },

  //耳饰-材质
  'earring-alloy':{
    typeId:4,
    categoryId:[6],
    materialIndex : 0
  },
  'earring-925-silver':{
    typeId:4,
    categoryId:[6],
    materialIndex : 1
  },
  'earring-9k-gold':{
    typeId:4,
    categoryId:[6],
    materialIndex : 2
  },
  'earring-14k-gold':{
    typeId:4,
    categoryId:[6],
    materialIndex : 3
  },
  'earring-18k-gold':{
    typeId:4,
    categoryId:[6],
    materialIndex : 4
  },

  //吊坠-材质
  'pendants-alloy':{
    typeId:4,
    categoryId:[5],
    materialIndex : 0
  },
  'pendants-925-silver':{
    typeId:4,
    categoryId:[5],
    materialIndex : 1
  },
  'pendants-9k-gold':{
    typeId:4,
    categoryId:[5],
    materialIndex : 2
  },
  'pendants-14k-gold':{
    typeId:4,
    categoryId:[5],
    materialIndex : 3
  },
  'pendants-18k-gold':{
    typeId:4,
    categoryId:[5],
    materialIndex : 4
  },

  //手镯-材质
  'bangles-alloy':{
    typeId:4,
    categoryId:[9],
    materialIndex : 0
  },
  'bangles-925-silver':{
    typeId:4,
    categoryId:[9],
    materialIndex : 1
  },
  'bangles-9k-gold':{
    typeId:4,
    categoryId:[9],
    materialIndex : 2
  },
  'bangles-14k-gold':{
    typeId:4,
    categoryId:[9],
    materialIndex : 3
  },
  'bangles-18k-gold':{
    typeId:4,
    categoryId:[9],
    materialIndex : 4
  },

  // 项链送礼对象
  'necklace-Romantic-lady':{
    typeId:4,
    categoryId:[4,5],
    object:42
  },
  'necklace-distinguished-man':{
    typeId:4,
    categoryId:[4,5],
    object:41
  },

  // 手链送礼对象
  'bracelet-Romantic-lady':{
    typeId:4,
    categoryId:[8,9],
    object:42
  },
  'bracelet-distinguished-man':{
    typeId:4,
    categoryId:[8,9],
    object:41
  },

  // 耳饰送礼对象
  'earring-Romantic-lady':{
    typeId:4,
    categoryId:[6],
    object:42
  },
  'earring-distinguished-man':{
    typeId:4,
    categoryId:[6],
    object:41
  },

  // 项链镶嵌方式
  'necklace-group-setting':{
    typeId:4,
    categoryId:[4,5],
    mosaic:275
  },
  'necklace-single-drill':{
    typeId:4,
    categoryId:[4,5],
    mosaic:276
  },

  // 手链镶嵌方式
  'bracelet-group-setting':{
    typeId:4,
    categoryId:[8,9],
    mosaic:275
  },
  'bracelet-single-drill':{
    typeId:4,
    categoryId:[8,9],
    mosaic:276
  },

  // 耳饰镶嵌方式
  'earring-group-setting':{
    typeId:4,
    categoryId:[6],
    mosaic:275
  },
  'earring-single-drill':{
    typeId:4,
    categoryId:[6],
    mosaic:276
  },

  // 项链风格
  'necklace-modern-simplicity':{
    typeId:4,
    categoryId:[4,5],
    style1:277
  },
  'necklace-classic-retro':{
    typeId:4,
    categoryId:[4,5],
    style1:278
  },
  'necklace-fun-with-personality':{
    typeId:4,
    categoryId:[4,5],
    style1:279
  },
  'necklace-fashion-limited':{
    typeId:4,
    categoryId:[4,5],
    style1:280
  },

  // 手链风格
  'bracelet-Simple-and-stylish':{
    typeId:4,
    categoryId:[8,9],
    style2:284
  },
  'bracelet-workplace-commute':{
    typeId:4,
    categoryId:[8,9],
    style2:285
  },
  'bracelet-fun-with-personality':{
    typeId:4,
    categoryId:[8,9],
    style2:286
  },
  'bracelet-Trend-classic':{
    typeId:4,
    categoryId:[8,9],
    style2:287
  },

  // 耳饰风格
  'earring-Simple-and-stylish':{
    typeId:4,
    categoryId:[6],
    style2:284
  },
  'earring-workplace-commute':{
    typeId:4,
    categoryId:[6],
    style2:285
  },
  'earring-fun-with-personality':{
    typeId:4,
    categoryId:[6],
    style2:286
  },
  'earring-Trend-classic':{
    typeId:4,
    categoryId:[6],
    style2:287
  }
}

export default {
  // head() {
  //   return this.seoInfo || {}
  // },
  components: {
    ListContent,
    SoleOut
  },
  data() {
    return {
      defaultCondition:
        conditionMaps[this.$route.params.defaultCondition || 'all'] || {}
    }
  },
  async asyncData({ $axios, route, store, app }) {
    // console.log("sssss",route)
    let seoInfo = {}
     if(route.params.defaultCondition == 'necklaces'){
       seoInfo = await app.$getSeoInfo('necklaces')
     }else if(route.params.defaultCondition =='pendants'){
       seoInfo = await app.$getSeoInfo('pendants')
     }else if(route.params.defaultCondition =='bracelets'){
       seoInfo = await app.$getSeoInfo('bracelets')
     }else if(route.params.defaultCondition =='bangles'){
       seoInfo = await app.$getSeoInfo('bangles')
     }else{
       seoInfo = await app.$getSeoInfo('Jewellery')
     }
    return $axios({
      method: 'get',
      url: '/web/goods/style/web-site',
      params: {
        // type: 2
      }
    })
      .then(res => {
        var data = res.data;
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
//   async asyncData({ $axios, route, store, app }) {
//     let seoInfo = await app.$getSeoInfo('necklaces')
//     // let seoInfo = {}
//     // if(route.params.defaultCondition == 'necklaces'){
//     //   seoInfo = await app.$getSeoInfo('necklaces')
//     // }else if(route.params.defaultCondition =='pendants'){
//     //   seoInfo = await app.$getSeoInfo('pendants')
//     // }else if(route.params.defaultCondition =='bracelets'){
//     //   seoInfo = await app.$getSeoInfo('bracelets')
//     // }else if(route.params.defaultCondition =='bangles'){
//     //   seoInfo = await app.$getSeoInfo('bangles')
//     // }else{
//     //   seoInfo = await app.$getSeoInfo('Jewellery')
//     // }
//     console.log("sssss",seoInfo)
//     return {
//       seoInfo
//     }
//   }
// }
</script>

<style lang="less" scoped></style>
