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
    shape: 18
  },
  'oval-cut': {
    shape: 25
  },
  'princess-cut': {
    shape: 19
  },
  'emerald-cut': {
    shape: 20
  },
  'heart-shaped': {
    shape: 27
  },
  'marquise-cut': {
    shape: 23
  },
  'cushion-cut': {
    shape: 22
  },
  'pear-shaped': {
    shape: 26
  },
  'asscher-cut': {
    shape: 21
  },
  'radiant-cut': {
    shape: 24
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
