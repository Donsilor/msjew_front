<template>
  <div>
    <list-content :default-condition="defaultCondition"></list-content>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/wedding-rings/single-ring/list.vue'

// 默认条件映射
const conditionMaps = {
  all: {},

  // 女款
  'womens-classic': {
    styleSex: 20,
    style: 452
  },
  'womens-eternity': {
    styleSex: 20,
    style: 453
  },
  'womens-anniversary': {
    styleSex: 20,
    style: 454
  },
  'womens-diamond': {
    styleSex: 20,
    style: 455
  },
  'womens-stackable': {
    styleSex: 20,
    style: 456
  },

  // 男款
  'mens-classic': {
    styleSex: 10,
    style: 457
  },
  'mens-carved': {
    styleSex: 10,
    style: 458
  },
  'mens-diamond': {
    styleSex: 10,
    style: 459
  },
  'mens-alternative-metals': {
    styleSex: 10,
    style: 460
  },

  // 成色
  '14k-white': {
    material: 120
  },
  '18k-white': {
    material: 121
  },
  '14k-yellow': {
    material: 122
  },
  '18k-yellow': {
    material: 123
  },
  platinum: {
    material: 126
  },
  '18k-rose-gold': {
    material: 125
  }
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
  }
}
</script>

<style lang="less" scoped></style>
