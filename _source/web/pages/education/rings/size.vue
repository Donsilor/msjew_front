<template>
  <layout>
    <div class="content">
      <div class="title">{{ $t(`${lang}.header`) }}</div>
      <div class="box">
        <img src="/education/ringSize.png" />
        <div>{{ $t(`${lang}.define`) }}</div>
        <a @click="openPdf(1)">{{ $t(`${lang}.cnPage`) }}</a>
        <a @click="openPdf(2)">{{ $t(`${lang}.enPage`) }}</a>
      </div>
      <dl>
        <dt>{{ $t(`${lang}.measure`) }}</dt>
        <dd>
          {{ $t(`${lang}.tip1`) }}
          <br />
          {{ $t(`${lang}.tip2`) }}
          <br />
          {{ $t(`${lang}.tip3`) }}
          <br />
          {{ $t(`${lang}.tip4`) }}
          <br />
          {{ $t(`${lang}.tip5`) }}
        </dd>
        <dt>{{ $t(`${lang}.adjust`) }}</dt>
        <dd>
          {{ $t(`${lang}.con1`) }}
          <span>service@bddco.com</span>
          {{ $t(`${lang}.con2`) }}
          <router-link to="/returnedGoods">
            <span>{{ $t(`${lang}.link`) }}</span>
          </router-link>
          {{ $t(`${lang}.con3`) }}
        </dd>
      </dl>
    </div>
  </layout>
</template>

<script>
import Layout from '@/pageComponents/policies/layout.vue'
const lang = 'education.rings.size'
export default {
  components: {
    Layout
  },
  data() {
    return {
      lang
    }
  },
  created() {
    const _this = this
    _this.$nextTick(() => {})
  },
  methods: {
    openPdf(type) {
      window.open(
        '/education/' +
          (type === 1 ? 'ringSizeGuide-CN' : 'ringSizeGuide-EN') +
          '.pdf'
      )
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding-left: 60px;
  padding-right: 60px;
  border: 1px solid rgba(215, 215, 215, 1);
  .box {
    margin-bottom: 59px;
    overflow: auto;
    img {
      float: left;
      width: 218px;
      margin-right: 59px;
      height: 306px;
    }
    div:nth-child(2) {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 32px;
      text-align: left;
      margin-bottom: 100px;
    }
    div:nth-child(3) {
      text-align: left;
      font-size: 14px;
      color: #999999;
      line-height: 32px;
    }
    a {
      display: inline-block;
      width: 120px;
      margin-left: 260px;
      line-height: 32px;
      display: block;
      text-align: left;
      cursor: pointer;
      color: #ddb1aa;
      text-decoration: underline;
    }
  }
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
      text-decoration: underline;
      color: #ddb1aa;
    }
  }
}
</style>
