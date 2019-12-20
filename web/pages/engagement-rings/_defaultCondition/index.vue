<template>
  <div>
    <list-content :default-condition="defaultCondition"></list-content>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/engagement-rings/list.vue'

// 默认条件映射
const conditionMaps = {
  all: {},

  // 款式映射
  solitaire: {
    style: 445
  },
  jump: {
    style: 446
  },
  'pave-set': {
    style: 447
  },
  classical: {
    style: 448
  },
  'channel-set': {
    style: 449
  },
  'halo-set': {
    style: 450
  },
  'three-stone': {
    style: 451
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
  },
  created() {}
}
</script>

<style lang="less" scoped></style>
