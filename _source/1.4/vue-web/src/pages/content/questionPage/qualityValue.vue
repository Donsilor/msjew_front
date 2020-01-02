<template>
  <div class="content">
    <div class="title">{{ lang.header }}</div>
    <dl>
      <dd>{{ lang.remind }}</dd>
      <dt>{{ lang.best }}</dt>
      <dd>{{ lang.rate }}</dd>
      <dt>{{ lang.tip1 }}</dt>
      <dd>{{ lang.con1 }}</dd>
      <dt>{{ lang.tip2 }}</dt>
      <dd>{{ lang.con2 }}</dd>
      <dt>{{ lang.tip3 }}</dt>
      <dd>{{ lang.con3 }}</dd>
      <dt>{{ lang.tip4 }}</dt>
      <dd>{{ lang.con4 }}</dd>
      <dd>
        {{ lang.more }}
        <span @click="go('diamondCarat')">{{ lang.link }}</span>。
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.questionPage.qualityValue
    };
  },
  methods: {
    go(url) {
      this.$router.push({
        path: url
      });
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding-left: 60px;
  padding-right: 60px;
  border: 1px solid rgba(215, 215, 215, 1);
  .title {
    font-size: 24px;
    margin: 40px 0px;
    text-align: center;
    color: #000000;
  }
  dt {
    font-weight: bold;
    font-size: 14px;
    color: #666666;
    text-align: left;
  }
  dd {
    text-align: left;
    font-size: 14px;
    color: #999999;
    margin-top: 18px;
    margin-bottom: 59px;
    line-height: 32px;
    span {
      cursor: pointer;
      color: #ddb1aa;
    }
  }
}
</style>