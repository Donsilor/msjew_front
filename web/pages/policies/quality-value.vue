<template>
  <layout>
    <div class="content">
      <div class="title">{{ $t(`${lang}.header`) }}</div>
      <dl>
        <dd>{{ $t(`${lang}.remind`) }}</dd>
        <dt>{{ $t(`${lang}.best`) }}</dt>
        <dd>{{ $t(`${lang}.rate`) }}</dd>
        <dt>{{ $t(`${lang}.tip1`) }}</dt>
        <dd>{{ $t(`${lang}.con1`) }}</dd>
        <dt>{{ $t(`${lang}.tip2`) }}</dt>
        <dd>{{ $t(`${lang}.con2`) }}</dd>
        <dt>{{ $t(`${lang}.tip3`) }}</dt>
        <dd>{{ $t(`${lang}.con3`) }}</dd>
        <dt>{{ $t(`${lang}.tip4`) }}</dt>
        <dd>{{ $t(`${lang}.con4`) }}</dd>
        <dd>
          {{ $t(`${lang}.more`) }}
          <span @click="go('diamondCarat')">{{ $t(`${lang}.link`) }}</span
          >。
        </dd>
      </dl>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/policies/layout.vue'
const lang = 'policies.qualityValue'
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
      color: #ddb1aa;
    }
  }
}
</style>
