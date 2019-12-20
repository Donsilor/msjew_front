<template>
  <div>
    <member v-if="$store.getters.hadLogin"></member>
    <stranger v-else></stranger>
  </div>
</template>

<script>
import stranger from './order-pay/stranger'
import member from './order-pay/member'
export default {
  components: {
    stranger,
    member
  }
}
</script>

<style scoped></style>
