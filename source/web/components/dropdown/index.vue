<template>
  <ul class="bdd-dropdown-menu">
    <li></li>
  </ul>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped></style>
