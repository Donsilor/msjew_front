<template>
  <layout>
    <div class="content">
      <div class="title">{{ $t(`${lang}.header`) }}</div>
      <dl>
        <dt>{{ $t(`${lang}.tit1`) }}</dt>
        <dd>
          {{ $t(`${lang}.con1`) }}
          <br />
          {{ $t(`${lang}.con2`) }}
        </dd>
        <dt>{{ $t(`${lang}.tit2`) }}</dt>
        <dd>{{ $t(`${lang}.con3`) }}</dd>
        <dt>{{ $t(`${lang}.tit3`) }}</dt>
        <dd>
          {{ $t(`${lang}.con4`) }}
          <br />
          {{ $t(`${lang}.con5`) }}
          <br />
          {{ $t(`${lang}.con6`) }}
          <br />
          {{ $t(`${lang}.con7`) }}
          <br />
          {{ $t(`${lang}.con8`) }}
          <br />
          {{ $t(`${lang}.con9`) }}
          <br />
          {{ $t(`${lang}.con10`) }}
          <br />
          {{ $t(`${lang}.con11`) }}
          <span>service@bddco.com</span>
          {{ $t(`${lang}.con12`) }}
          <span>888.884.2424</span>。
        </dd>
        <dt>{{ $t(`${lang}.tit4`) }}</dt>
        <dd>
          {{ $t(`${lang}.con13`) }}
          <br />
          {{ $t(`${lang}.con14`) }}
          <label>{{ $t(`${lang}.link1`) }}</label>
          {{ $t(`${lang}.con15`) }}
        </dd>
      </dl>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/policies/layout.vue'
const lang = 'policies.jewelryInsurance'
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
    go(url) {
      this.$router.push({
        path: url
      })
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
    span {
      color: #ddb1aa;
    }
    label {
      text-decoration: underline;
      cursor: pointer;
      color: #ddb1aa;
    }
  }
}
</style>
