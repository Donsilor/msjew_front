<template>
  <div>
    <!--    <top-bar></top-bar>-->
    <!--    <div class="not-fount">-->
    <!--      <div class="type-image">-->
    <!--        <img src="/404.png" />-->
    <!--      </div>-->
    <!--      <div class="type-description">-->
    <!--        {{ lang.notFound }}-->
    <!--      </div>-->
    <!--      <div class="operational">-->
    <!--        <button @click="backToIndex">{{ lang.toIndex }}</button>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.LANGUAGE.error
    }
  },
  created() {
    this.backToIndex()
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
.not-fount {
  .type-image {
    padding: 126px 0 20px 0;
    line-height: 0;
    font-size: 0;
    text-align: center;

    img {
      width: 138px;
    }
  }
  .type-description {
    padding-bottom: 22px;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: rgba(102, 102, 102, 1);
  }

  .operational {
    text-align: center;
    button {
      width: 160px;
      height: 36px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      background: rgba(250, 250, 250, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 8px;
    }
  }
}
</style>
