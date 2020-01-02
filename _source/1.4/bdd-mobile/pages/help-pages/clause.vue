<template>
  <div class="clause">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dd>
          <p>
            {{ lang.define1 }}
          </p>
          <p>
            {{ lang.define2 }}
          </p>
        </dd>
        <dt>{{ lang.tit1 }}</dt>
        <dd>
          <p>
            {{ lang.con1 }}
          </p>
          <p>
            {{ lang.con2 }}
          </p>
        </dd>
        <dt>{{ lang.tit2 }}</dt>
        <dd>
          {{ lang.con3 }}
        </dd>
        <dt>{{ lang.tit3 }}</dt>
        <dd>
          {{ lang.con4 }}
        </dd>
        <dt>{{ lang.tit4 }}</dt>
        <dd>
          <p>
            {{ lang.con5 }}
          </p>
          <p>
            {{ lang.con6 }}
          </p>
          <p>
            {{ lang.con7 }}
          </p>
          <p>
            {{ lang.con8 }}
          </p>
        </dd>
        <dt>{{ lang.tit5 }}</dt>
        <dd>
          {{ lang.con9 }}
        </dd>
        <dt>{{ lang.tit6 }}</dt>
        <dd>
          {{ lang.con10 }}
          <a class="link" @click="jump('privacyPolicy')">{{ lang.link1 }}</a>
        </dd>
        <dt>{{ lang.tit7 }}</dt>
        <dd>
          {{ lang.con11 }}
        </dd>
        <dt>{{ lang.tit8 }}</dt>
        <dd>
          {{ lang.con12 }}
        </dd>
        <dt>{{ lang.tit9 }}</dt>
        <dd>
          {{ lang.con13 }}
        </dd>
        <dt>{{ lang.tit10 }}</dt>
        <dd>
          {{ lang.con14 }}
        </dd>
        <dt>{{ lang.tit11 }}</dt>
        <dd>
          {{ lang.con15 }}
        </dd>
        <dt>{{ lang.tit12 }}</dt>
        <dd>
          {{ lang.con16 }}
        </dd>
        <dt>{{ lang.tit13 }}</dt>
        <dd>
          {{ lang.con17 }}
        </dd>
        <dt>{{ lang.tit14 }}</dt>
        <dd>
          {{ lang.con18 }}
        </dd>
        <dt>{{ lang.tit15 }}</dt>
        <dd>
          {{ lang.con19 }}
        </dd>
        <dt>{{ lang.tit16 }}</dt>
        <dd>
          {{ lang.con20 }}
        </dd>
        <dt>{{ lang.tit17 }}</dt>
        <dd>
          {{ lang.con21 }}
        </dd>
        <dt>{{ lang.tit18 }}</dt>
        <dd>
          {{ lang.con22 }}
        </dd>
        <dt>{{ lang.tit19 }}</dt>
        <dd>
          {{ lang.con23 }}
        </dd>
        <dt>{{ lang.tit20 }}</dt>
        <dd>
          {{ lang.con24 }}
        </dd>
        <dt>{{ lang.tit21 }}</dt>
        <dd>
          {{ lang.con25 }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'Clause',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].clause
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
