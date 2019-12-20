<template>
  <div class="proof">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dt>{{ lang.title }}</dt>
        <dd>
          {{ lang.define }}
        </dd>
        <dt>{{ lang.choose }}</dt>
        <dd>
          {{ lang.rate }}
        </dd>
        <img
          class="gialogo"
          src="~/static/help-pages/proof-gialogo.png"
          alt=""
        />
        <dt>{{ lang.characteristic }}</dt>
        <dd>
          <p>{{ lang.report }}</p>
        </dd>
        <dt>{{ lang.certificate }}</dt>
        <dd>
          {{ lang.remind }}
        </dd>
        <img class="gia" src="~/static/help-pages/proof-gia1.png" alt="" />
        <span>{{ lang.gia1 }}</span>
        <img class="gia" src="~/static/help-pages/proof-gia2.png" alt="" />
        <span>{{ lang.gia2 }}</span>
        <img
          class="bddlogo"
          src="~/static/help-pages/proof-bddlogo.png"
          alt=""
        />
        <span>{{ lang.gia3 }}</span>
        <dd>
          <p>
            {{ lang.mail1 }}
            <a class="link" href="mailto:service@bddco.com">
              service@bddco.com
            </a>
            {{ lang.mail2 }}
          </p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'Proof',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].proof
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
.gialogo {
  width: 250px;
}
.gia {
  width: 310px;
}
.bddlogo {
  width: 168px;
}
</style>
