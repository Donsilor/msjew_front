<template>
  <layout>
    <div class="content">
      <div class="title">{{ $t(`${lang}.header`) }}</div>
      <dl>
        <dd>
          {{ $t(`${lang}.advice`) }}
          <span @click="go">{{ $t(`${lang}.here`) }}</span
          >。
          <br />
          {{ $t(`${lang}.paypal`) }}
          <br />
          {{ $t(`${lang}.creditcard`) }}
          <br />
          {{ $t(`${lang}.remittance`) }}
          <ul>
            <li>
              <i></i>
              {{ $t(`${lang}.tip1`) }}
            </li>
            <li>
              <i></i>
              {{ $t(`${lang}.tip2`) }}
            </li>
            <li>
              <i></i>
              {{ $t(`${lang}.tip3`) }}
            </li>
          </ul>
          {{ $t(`${lang}.unionpay`) }}
        </dd>
        <dt>{{ $t(`${lang}.about`) }}</dt>
        <dd>
          {{ $t(`${lang}.con2`) }}
          <br />
          {{ $t(`${lang}.con3`) }}
          <br />
          {{ $t(`${lang}.pro1`) }}
          <br />
          {{ $t(`${lang}.pro2`) }}
          <br />
          {{ $t(`${lang}.pro3`) }}
          <br />
          {{ $t(`${lang}.know`) }}
          <span @click="go">www.paypal.com</span>
        </dd>
        <dt>{{ $t(`${lang}.use`) }}</dt>
        <dd>
          {{ $t(`${lang}.check`) }}
          <span>service@bddco.com。</span>
        </dd>
      </dl>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/policies/layout.vue'
const lang = 'policies.paymentMethods'
export default {
  components: {
    Layout
  },
  data() {
    return {
      lang
    }
  },
  methods: {
    go() {
      window.open('https://www.paypal.com')
    }
  }
}
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
