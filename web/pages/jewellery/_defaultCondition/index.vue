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
  necklaces: {
    typeId:4,
    categoryId: 4
  },
  pendants: {
    typeId:4,
    categoryId: 5
  },
  'ear-stud': {
    typeId:4,
    categoryId: 6
  },
  earrings: {
    typeId:4,
    categoryId: 7
  },
  bracelets: {
    typeId:4,
    categoryId: 8
  },
  bangles: {
    typeId:4,
    categoryId: 9
  },
  decoration: {
    typeId:4,
    categoryId: 16
  },
  widgets: {
    typeId:4,
    categoryId: 17
  },
  'others': {
    typeId:4,
    categoryId: 18
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
  
}

export default {
  head() {
    return this.seoInfo || {}
  },
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
