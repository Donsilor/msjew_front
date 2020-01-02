<template>
  <div class="content">
    <div class="title">{{ lang.header }}</div>
    <dl>
      <dd>
        {{ lang.define }}
        <br />
        {{ lang.update }}
        <br />
        {{ lang.privacy }}
      </dd>
      <dt>{{ lang.tit1 }}</dt>
      <dd>
        {{ lang.tip1 }}
        <br />
        {{ lang.con1 }}
        <br />
        {{ lang.tip2 }}
        <br />
        {{ lang.con2 }}
        <br />
        {{ lang.con3 }}
        <br />
        {{ lang.tip3 }}
        <br />
        {{ lang.con4 }}
      </dd>
      <dt>{{ lang.tit2 }}</dt>
      <dd>
        {{ lang.con5 }}
        <br />
        {{ lang.con6 }}
        <br />
        {{ lang.con7 }}
        <br />
        {{ lang.con8 }}
        <br />
        {{ lang.con9 }}
        <br />
        {{ lang.con10 }}
        <br />
      </dd>
      <dt>{{ lang.tit3 }}</dt>
      <dd>{{ lang.con11 }}</dd>
      <dt>{{ lang.tit4 }}</dt>
      <dd>
        {{ lang.con12 }}
        <br />
        {{ lang.con13 }}
      </dd>
      <dt>{{ lang.tit5 }}</dt>
      <dd>{{ lang.con14 }}</dd>
      <dt>{{ lang.tit6 }}</dt>
      <dd>
        {{ lang.con15 }}
        <span>service@bddco.com</span>
        {{ lang.con16 }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.questionPage.privacyPolicy
    };
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