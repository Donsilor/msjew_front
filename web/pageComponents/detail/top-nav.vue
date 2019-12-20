<template>
  <div class="top">
    <span class="to-list" @click="goBack($router)">
      << {{ $t(`${lang}.back`) }}
    </span>
  </div>
</template>

<script>
const lang = 'detail'
export default {
  data() {
    return {
      lang
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})
  }
}
</script>

<style lang="less" scoped>
.top {
  height: 56px;
  display: flex;
  align-items: center;

  .to-list {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    cursor: pointer;
  }
}
</style>
