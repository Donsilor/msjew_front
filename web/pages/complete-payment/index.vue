<template>
  <div>
    <failed v-if="type === `failed`"></failed>
    <successTransfer v-else-if="type === `transfer`"></successTransfer>
    <success v-else></success>
  </div>
</template>

<script>
import failed from './state/failed'
import success from './state/success'
import successTransfer from './state/successTransfer'
export default {
  components: {
    failed,
    success,
    successTransfer
  },
  data() {
    return {
      type: this.$route.query.type
    }
  }
}
</script>

<style lang="less" scoped></style>
