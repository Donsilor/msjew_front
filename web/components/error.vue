<template>
  <div class="error">
    {{ lang.somethingError }}
  </div>
</template>

<script>
export default {
  layout: 'top-bar',
  data() {
    return {
      lang: this.LANGUAGE.error
    }
  }
}
</script>

<style lang="less" scoped></style>
