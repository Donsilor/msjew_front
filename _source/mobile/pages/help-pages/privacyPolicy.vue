<template>
  <div class="privacyPolicy">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dd>{{ lang.define }}</dd>
        <dt>{{ lang.tit1 }}</dt>
        <dd>
          <p>{{ lang.tip1 }}</p>
          <p>{{ lang.con1 }}</p>
          <p>{{ lang.tip2 }}</p>
          <p>{{ lang.con2 }}</p>
          <p>{{ lang.con3 }}</p>
          <p>{{ lang.tip3 }}</p>
          <p>{{ lang.con4 }}</p>
        </dd>
        <dt>{{ lang.tit2 }}</dt>
        <dd>
          <p>{{ lang.con5 }}</p>
          <p>{{ lang.con6 }}</p>
          <p>{{ lang.con7 }}</p>
          <p>{{ lang.con8 }}</p>
          <p>{{ lang.con9 }}</p>
          <p>{{ lang.con10 }}</p>
        </dd>
        <dt>{{ lang.tit3 }}</dt>
        <dd>
          <p>{{ lang.con11 }}</p>
        </dd>
        <dt>{{ lang.tit4 }}</dt>
        <dd>
          <p>{{ lang.con12 }}</p>
          <p>{{ lang.con13 }}</p>
        </dd>
        <dt>{{ lang.tit5 }}</dt>
        <dd>{{ lang.con14 }}</dd>
        <dt>{{ lang.tit6 }}</dt>
        <dd>
          {{ lang.con15 }}
          <a class="link" href="mailto:service@bddco.com">service@bddco.com</a>
          {{ lang.con16 }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'PrivacyPolicy',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].privacyPolicy
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
</style>
