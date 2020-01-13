<template>
  <div>
    <list-content v-if="defaultCondition" :default-condition="defaultCondition"></list-content>
    <sole-out v-else></sole-out>
  </div>
</template>

<script>
import ListContent from '@/pageComponents/engagement-rings/list.vue'
import SoleOut from '@/pageComponents/goods-sole-out/sole-out.vue'

// 默认条件映射
const conditionMaps = {
  all: {},

  // 款式映射
  solitaire: {
    style: 109
  },
  jump: {
    style: 110
  },
  'pave-set': {
    style: 111
  },
  classical: {
    style: 112
  },
  'channel-set': {
    style: 113
  },
  'halo-set': {
    style: 114
  },
  'three-stone': {
    style: 115
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
  },
  created() {}
}
</script>

<style lang="less" scoped></style>
