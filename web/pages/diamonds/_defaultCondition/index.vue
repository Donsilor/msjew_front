<template>
  <div>
    <list-content :default-condition="defaultCondition"></list-content>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/diamonds/list.vue'

// 默认条件映射
const conditionMaps = {
  all: {},

  // 形状
  'round-cut': {
    shape: 16
  },
  'oval-cut': {
    shape: 17
  },
  'princess-cut': {
    shape: 54
  },
  'emerald-cut': {
    shape: 55
  },
  'heart-shaped': {
    shape: 56
  },
  'marquise-cut': {
    shape: 57
  },
  'cushion-cut': {
    shape: 58
  },
  'pear-shaped': {
    shape: 59
  },
  'asscher-cut': {
    shape: 60
  },
  'radiant-cut': {
    shape: 61
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
