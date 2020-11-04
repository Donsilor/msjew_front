<template>
  <div class="knowLedge">
    <Header :title="lang.header" />
    <div class="View">
      <dl>
        <dd>
          <p>{{ lang.found }}</p>
        </dd>
        <img class="story1" src="~/static/help-pages/brand-story1.png" alt />
        <span>{{ lang.prove }}</span>
        <span>{{ lang.with }}</span>
        <span>
          {{ lang.moment }}
        </span>
        <img class="story2" src="~/static/help-pages/brand-story2.png" alt />
        <span>{{ lang.diffent }}</span>
        <span>{{ lang.choose }}</span>
        <span>{{ lang.understand }}</span>
        <span>{{ lang.right }}</span>
        <img class="story3" src="~/static/help-pages/brand-story3.png" alt />
        <span>
          {{ lang.dream }}
        </span>
        <span>{{ lang.summary }}</span>
        <span>{{ lang.slogan }}</span>
      </dl>
    </div>
    <div class="Show">
      <p>{{ lang.advantages }}</p>
      <div v-for="(item, index) in lang.show" :key="index">
        <label>
          <img :src="'brand-story' + item.src + '.png'" alt />
        </label>
        <label>
          <em>{{ item.tip }}</em>
          <i>{{ item.con }}</i>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
export default {
  name: 'Knowledge',
  components: {
    Header
  },
  data() {
    return {
      lang: this.LANGUAGE['help-pages'].brandStory
    }
  }
}
</script>

<style scoped lang="less">
@import url('help-page.less');
.story1 {
  width: 75%;
}
.story2 {
  width: 90%;
}
.story3 {
  width: 65%;
}
span {
  font-family: 'SimSun';
  line-height: 28px;
}
</style>
