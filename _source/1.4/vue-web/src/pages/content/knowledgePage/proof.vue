<template>
  <div class="content">
    <div class="header-text">
      <h3 class="title">{{ lang.header }}</h3>
    </div>
    <div class="diamond-analysis">
      <h3>{{ lang.title }}</h3>
      <p>{{ lang.define }}</p>
    </div>
    <div class="diamond-analysis">
      <h3>{{ lang.choose }}</h3>
      <p>{{ lang.rate }}</p>
    </div>
    <div class="diamond-analysis">
      <h3>{{ lang.characteristic }}</h3>
      <p>{{ lang.report }}</p>
    </div>
    <div class="diamond-analysis">
      <h3>{{ lang.certificate }}</h3>
      <p>{{ lang.remind }}</p>
      <h2>{{ lang.gia1 }}</h2>
      <h2>{{ lang.gia2 }}</h2>
      <h2>{{ lang.gia3 }}</h2>
    </div>
    <div class="diamond-analysis">
      <p>
        {{ lang.mail1 }}
        <span class="link">service@bddco.com</span>
        {{ lang.mail2 }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.knowledgePage.proof
    };
  }
};
</script>

<style lang="less" scoped>
.content {
  font-size: 14px;
  font-family: "CTHeiTiSF";
  border: 1px solid rgba(215, 215, 215, 1);

  .header-text {
    margin-bottom: 55px;
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: normal;
      margin-top: 40px;
      color: #000;
    }
    .font-describe {
      width: 1035px;
      font-size: 14px;
      text-align: left;
      padding-left: 60px;
      margin-top: 38px;
      line-height: 32px;
      color: #999999;
    }
  }
  .diamond-analysis {
    font-size: 14px;
    line-height: 32px;
    margin: 0 60px 20px;
    text-align: left;
    p {
      font-size: 14px;
      color: #999;
      .link {
        cursor: pointer;
        color: #ddb1aa;
        text-decoration: underline;
      }
    }
  }
}
</style>
