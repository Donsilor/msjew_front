<template>
  <list-content :default-condition="defaultCondition"></list-content>
</template>

<script>
import ListContent from '@/pageComponents/wedding-rings/pair-ring/list.vue'
export default {
  components: {
    ListContent
  },
  data() {
    return {
      defaultCondition: {
        style: 1
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
