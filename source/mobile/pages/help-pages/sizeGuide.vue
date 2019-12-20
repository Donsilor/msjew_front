<template>
  <div class="sizeGuide">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dd>{{ lang.define }}</dd>
        <dt>{{ lang.guide }}</dt>
        <dd>
          <div class="guide">
            <span
              :class="activeIndex === 0 ? 'active' : ''"
              @click="selectSize(0)"
            >
              <img src="~/static/help-pages/size-cn.png" alt />
              <em>{{ lang.cnPage }}</em>
            </span>
            <span
              :class="activeIndex === 1 ? 'active' : ''"
              @click="selectSize(1)"
            >
              <img src="~/static/help-pages/size-en.png" alt />
              <em>{{ lang.enPage }}</em>
            </span>
          </div>
          <div class="line-box">
            <button class="full-btn login">
              <span class="btn-message" @click="openPdf(activeIndex)">{{
                lang.view
              }}</span>
            </button>
          </div>
        </dd>
        <dt>{{ lang.measure }}</dt>
        <dd>
          <section class="remind">
            <p class="ol">{{ lang.tip1 }}</p>
            <p class="ol">{{ lang.tip2 }}</p>
            <p class="ol">{{ lang.tip3 }}</p>
            <p class="ol">{{ lang.tip4 }}</p>
            <p class="ol">{{ lang.tip5 }}</p>
          </section>
        </dd>
        <dt>{{ lang.adjust }}</dt>
        <dd>
          <p>{{ lang.con1 }}</p>
          <p>
            {{ lang.con2 }}
            <a class="link" href="mailto:service@bddco.com">
              service@bddco.com
            </a>
            {{ lang.con3 }}
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'SizeGuide',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].sizeGuide,
      activeIndex: 0
    }
  },
  methods: {
    selectSize(index) {
      this.activeIndex = index
    },
    openPdf(type) {
      window.open(
        '/help-pages/' +
          (type === 0 ? 'ringSizeGuide-CN' : 'ringSizeGuide-EN') +
          '.pdf'
      )
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
.guide {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
}
.guide span {
  width: 48%;
  text-align: center;
  img {
    width: 100%;
    border: #e0e0e0 1px solid;
  }
  em {
    line-height: 24px;
    font-size: 14px;
  }
}
.guide span.active {
  img {
    border: #f29b87 1px solid;
  }
}
</style>
