<template>
  <div class="returnedGoods">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dt>{{ lang.tit1 }}</dt>
        <dd>
          <p>{{ lang.con1 }}</p>
          <p>{{ lang.con2 }}</p>
        </dd>
        <dt>
          <img src="~/static/help-pages/return-goods.png" alt />
        </dt>
        <dt>{{ lang.tit2 }}</dt>
        <dd>{{ lang.con3 }}</dd>
        <dt>{{ lang.tit3 }}</dt>
        <dd>{{ lang.con4 }}</dd>
        <dt>{{ lang.tit4 }}</dt>
        <dd>
          <p>{{ lang.con5 }}</p>
          <p>{{ lang.con6 }}</p>
          <p>{{ lang.con7 }}</p>
          <p>{{ lang.con8 }}</p>
          <p>{{ lang.con9 }}</p>
          <p>{{ lang.con10 }}</p>
        </dd>
        <dt>{{ lang.tit5 }}</dt>
        <dd>
          <p>{{ lang.con11 }}</p>
          <p>{{ lang.con12 }}</p>
          <p>{{ lang.con13 }}</p>
        </dd>
        <dt>{{ lang.tit6 }}</dt>
        <dd>{{ lang.con14 }}</dd>
        <dt>{{ lang.tit7 }}</dt>
        <dd>
          <p>{{ lang.con15 }}</p>
          <p>
            <a class="link" href="mailto:service@bddco.com">
              service@bddco.com
            </a>
            {{ lang.con16 }}
          </p>
        </dd>
        <i>{{ lang.tip1 }}</i>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'ReturnedGoods',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].returnedGoods
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
</style>
