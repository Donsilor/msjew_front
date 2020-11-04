<template>
  <div class="qualityValue">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dd>
          {{ lang.remind }}
        </dd>
        <dt>
          <img src="~/static/help-pages/quality-value.png" alt="" />
        </dt>
        <dt>{{ lang.best }}</dt>
        <dd>
          {{ lang.rate }}
        </dd>
        <dt>{{ lang.tip1 }}</dt>
        <dd>
          {{ lang.con1 }}
        </dd>
        <dt>{{ lang.tip2 }}</dt>
        <dd>
          {{ lang.con2 }}
        </dd>
        <dt>{{ lang.tip3 }}</dt>
        <dd>
          {{ lang.con3 }}
        </dd>
        <dt>{{ lang.tip4 }}</dt>
        <dd>
          <p>
            {{ lang.con4 }}
          </p>
          <p>
            {{ lang.more }}
            <a class="link" @click="jump('knowledge')">{{ lang.link }}</a>
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'QualityValue',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].qualityValue
    }
  },
  methods: {
    jump(path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
</style>
