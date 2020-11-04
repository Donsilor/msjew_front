<template>
  <div class="error-page">
    <not-found v-if="error.statusCode === 404"></not-found>
    <error v-else></error>
    <!--    <live-chat></live-chat>-->
  </div>
</template>

<script>
import NotFound from '@/components/404.vue'
import Error from '@/components/error.vue'
export default {
  components: {
    NotFound,
    Error
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout: 'no-bar',
  data() {
    return {
      lang: this.LANGUAGE.error
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    backToIndex() {
      this.$router.replace({
        name: 'index'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.error-page {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
