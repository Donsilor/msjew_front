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
    styleSex: 54,
    style: 160
  },
  'womens-eternity': {
    styleSex: 54,
    style: 161
  },
  'womens-anniversary': {
    styleSex: 54,
    style: 162
  },
  'womens-diamond': {
    styleSex: 54,
    style: 163
  },
  'womens-stackable': {
    styleSex: 54,
    style: 164
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
