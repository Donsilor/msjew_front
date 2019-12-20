<template>
  <layout>
    <div class="content">
      <div class="title">{{ $t(`${lang}.header`) }}</div>
      <dl>
        <dd>
          {{ $t(`${lang}.define1`) }}
          <br />
          {{ $t(`${lang}.define2`) }}
        </dd>
        <dt>{{ $t(`${lang}.tit1`) }}</dt>
        <dd>
          {{ $t(`${lang}.con1`) }}
          <br />
          {{ $t(`${lang}.con2`) }}
        </dd>
        <dt>{{ $t(`${lang}.tit2`) }}</dt>
        <dd>{{ $t(`${lang}.con3`) }}</dd>
        <dt>{{ $t(`${lang}.tit3`) }}</dt>
        <dd>{{ $t(`${lang}.con4`) }}</dd>
        <dt>{{ $t(`${lang}.tit4`) }}</dt>
        <dd>
          {{ $t(`${lang}.con5`) }}
          <br />
          {{ $t(`${lang}.con6`) }}
          <br />
          {{ $t(`${lang}.con7`) }}
          <br />
          {{ $t(`${lang}.con8`) }}
        </dd>
        <dt>{{ $t(`${lang}.tit5`) }}</dt>
        <dd>{{ $t(`${lang}.con9`) }}</dd>
        <dt>{{ $t(`${lang}.tit6`) }}</dt>
        <dd>
          {{ $t(`${lang}.con10`) }}
          <span @click="go('privacyPolicy')">{{ $t(`${lang}.link1`) }}</span>
        </dd>

        <dt>{{ $t(`${lang}.tit7`) }}</dt>
        <dd>{{ $t(`${lang}.con11`) }}</dd>
        <dt>{{ $t(`${lang}.tit8`) }}</dt>
        <dd>{{ $t(`${lang}.con12`) }}</dd>
        <dt>{{ $t(`${lang}.tit9`) }}</dt>
        <dd>{{ $t(`${lang}.con13`) }}</dd>
        <dt>{{ $t(`${lang}.tit10`) }}</dt>
        <dd>{{ $t(`${lang}.con14`) }}</dd>
        <dt>{{ $t(`${lang}.tit11`) }}</dt>
        <dd>{{ $t(`${lang}.con15`) }}</dd>
        <dt>{{ $t(`${lang}.tit12`) }}</dt>
        <dd>{{ $t(`${lang}.con15`) }}</dd>
        <dt>{{ $t(`${lang}.tit13`) }}</dt>
        <dd>{{ $t(`${lang}.con17`) }}</dd>

        <dt>{{ $t(`${lang}.tit14`) }}</dt>
        <dd>{{ $t(`${lang}.con18`) }}</dd>
        <dt>{{ $t(`${lang}.tit15`) }}</dt>
        <dd>{{ $t(`${lang}.con19`) }}</dd>
        <dt>{{ $t(`${lang}.tit16`) }}</dt>
        <dd>{{ $t(`${lang}.con20`) }}</dd>
        <dt>{{ $t(`${lang}.tit17`) }}</dt>
        <dd>{{ $t(`${lang}.con21`) }}</dd>
        <dt>{{ $t(`${lang}.tit18`) }}</dt>
        <dd>{{ $t(`${lang}.con22`) }}</dd>
        <dt>{{ $t(`${lang}.tit19`) }}</dt>
        <dd>{{ $t(`${lang}.con23`) }}</dd>
        <dt>{{ $t(`${lang}.tit20`) }}</dt>
        <dd>{{ $t(`${lang}.con24`) }}</dd>
        <dt>{{ $t(`${lang}.tit21`) }}</dt>
        <dd>{{ $t(`${lang}.con25`) }}</dd>
      </dl>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/policies/layout.vue'
const lang = 'policies.termsAndConditions'
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
      cursor: pointer;
      color: #2370b8;
    }
  }
}
</style>
