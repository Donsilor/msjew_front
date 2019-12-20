<template>
  <div class="account-container">
    <div class="settings-tabs">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        :class="[`settings-tabs-tab`, { active: index === activeIndex }]"
      >
        <span class="tab-name" @click="activeIndex = index">{{ item }}</span>
      </div>
    </div>
    <personal-account v-if="activeIndex === 0" />
    <personal-address v-if="activeIndex === 1" />
    <personal-coupon v-if="activeIndex === 2" />
    <personal-psw v-if="activeIndex === 3" />
  </div>
</template>

<script>
const lang = 'personal.account'
export default {
  name: 'Settings',
  data() {
    return {
      lang,
      activeIndex: 0,
      tabs: [
        this.$t(`${lang}.info`),
        this.$t(`${lang}.address`),
        this.$t(`${lang}.coupon`),
        this.$t(`${lang}.psw1`)
      ]
    }
  }
}
</script>

<style scoped lang="less">
.account-container {
  width: 100%;
  margin-top: -20px;
  .settings-tabs {
    width: 100%;
    height: 16+40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    .settings-tabs-tab {
      font-size: 16px;
      line-height: 16+40-2px;
      margin-right: 49px;
      .tab-name {
        cursor: pointer;
      }
    }
    .active {
      color: #f29b87;
      border-bottom: 1px solid #f29b87;
    }
  }
}
</style>
