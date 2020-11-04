<template>
  <div class="requesting">
    <span>{{ lang.requestingMoreData }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lang: this.LANGUAGE.components.progressBar
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.requesting {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    height: 14px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
}
</style>
