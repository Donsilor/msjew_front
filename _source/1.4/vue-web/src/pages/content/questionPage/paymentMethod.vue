<template>
  <div class="content">
    <div class="title">{{ lang.header }}</div>
    <dl>
      <dd>
        {{ lang.advice }}
        <span @click="go">{{ lang.here }}</span>。
        <br />
        {{ lang.paypal }}
        <br />
        {{ lang.creditcard }}
        <br />
        {{ lang.remittance }}
        <ul>
          <li>
            <i></i>
            {{ lang.tip1 }}
          </li>
          <li>
            <i></i>
            {{ lang.tip2 }}
          </li>
          <li>
            <i></i>
            {{ lang.tip3 }}
          </li>
        </ul>
        {{ lang.unionpay }}
      </dd>
      <dt>{{ lang.about }}</dt>
      <dd>
        {{ lang.con2 }}
        <br />
        {{ lang.con3 }}
        <br />
        {{ lang.pro1 }}
        <br />
        {{ lang.pro2 }}
        <br />
        {{ lang.pro3 }}
        <br />
        {{ lang.know }}
        <span @click="go">www.paypal.com</span>
      </dd>
      <dt>{{ lang.use }}</dt>
      <dd>
        {{ lang.check }}
        <span>service@bddco.com。</span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: this.$LANGUAGE.questionPage.paymentMethod
    };
  },
  methods: {
    go() {
      window.open("https://www.paypal.com");
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
    i {
      float: left;
      height: 4px;
      width: 4px;
      border-radius: 50%;
      background: #999999;
      margin-right: 9px;
      margin-top: 14px;
    }
    span {
      color: #ddb1aa;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>