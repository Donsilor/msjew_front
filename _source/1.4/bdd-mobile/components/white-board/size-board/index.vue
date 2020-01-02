<template>
  <layout :show="active" @onClose="hide">
    <template slot="content">
      <div class="text-top">
        {{ lang.sizeTop }}
      </div>
      <div class="text-bot" @click="goToHow()">
        {{ lang.sizeBot }}
      </div>
    </template>
  </layout>
</template>

<script>
import Mixins from './mixins'
export default {
  name: 'DiamondChoose',
  mixins: [Mixins],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    goToHow() {
      this.$router.push({
        name: `help-pages-sizeGuide`
      })
    }
  }
}
</script>

<style scoped lang="less">
.text-top {
  width: 290px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  text-align: left;
  margin: 40px auto;
}
.text-bot {
  width: 290px;
  font-size: 16px;
  font-weight: 400;
  text-decoration: underline;
  color: rgba(137, 105, 93, 1);
  line-height: 18px;
  text-align: left;
  margin: 0 auto 46px;
}
</style>
