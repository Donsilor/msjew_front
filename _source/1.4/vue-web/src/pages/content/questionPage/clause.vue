<template>
  <div class="content">
    <div class="title">{{ lang.header }}</div>
    <dl>
      <dd>
        {{ lang.define1 }}
        <br />
        {{ lang.define2 }}
      </dd>
      <dt>{{ lang.tit1 }}</dt>
      <dd>
        {{ lang.con1 }}
        <br />
        {{ lang.con2 }}
      </dd>
      <dt>{{ lang.tit2 }}</dt>
      <dd>{{ lang.con3 }}</dd>
      <dt>{{ lang.tit3 }}</dt>
      <dd>{{ lang.con4 }}</dd>
      <dt>{{ lang.tit4 }}</dt>
      <dd>
        {{ lang.con5 }}
        <br />
        {{ lang.con6 }}
        <br />
        {{ lang.con7 }}
        <br />
        {{ lang.con8 }}
      </dd>
      <dt>{{ lang.tit5 }}</dt>
      <dd>{{ lang.con9 }}</dd>
      <dt>{{ lang.tit6 }}</dt>
      <dd>
        {{ lang.con10 }}
        <span @click="go('privacyPolicy')">{{ lang.link1 }}</span>
      </dd>

      <dt>{{ lang.tit7 }}</dt>
      <dd>{{ lang.con11 }}</dd>
      <dt>{{ lang.tit8 }}</dt>
      <dd>{{ lang.con12 }}</dd>
      <dt>{{ lang.tit9 }}</dt>
      <dd>{{ lang.con13 }}</dd>
      <dt>{{ lang.tit10 }}</dt>
      <dd>{{ lang.con14 }}</dd>
      <dt>{{ lang.tit11 }}</dt>
      <dd>{{ lang.con15 }}</dd>
      <dt>{{ lang.tit12 }}</dt>
      <dd>{{ lang.con15 }}</dd>
      <dt>{{ lang.tit13 }}</dt>
      <dd>{{ lang.con17 }}</dd>

      <dt>{{ lang.tit14 }}</dt>
      <dd>{{ lang.con18 }}</dd>
      <dt>{{ lang.tit15 }}</dt>
      <dd>{{ lang.con19 }}</dd>
      <dt>{{ lang.tit16 }}</dt>
      <dd>{{ lang.con20 }}</dd>
      <dt>{{ lang.tit17 }}</dt>
      <dd>{{ lang.con21 }}</dd>
      <dt>{{ lang.tit18 }}</dt>
      <dd>{{ lang.con22 }}</dd>
      <dt>{{ lang.tit19 }}</dt>
      <dd>{{ lang.con23 }}</dd>
      <dt>{{ lang.tit20 }}</dt>
      <dd>{{ lang.con24 }}</dd>
      <dt>{{ lang.tit21 }}</dt>
      <dd>{{ lang.con25 }}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.questionPage.clause
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
      color: #2370b8;
    }
  }
}
</style>