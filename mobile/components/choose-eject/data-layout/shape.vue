<template>
  <div class="option-list">
    <div v-for="(option, n) in options" :key="n" class="option-cover">
      <div
        :class="['option', { active: hadChecked(option.id) }]"
        @click="checked(option.id)"
      >
        <div class="option-image">
          <img :src="option.image" />
        </div>
        <div class="option-name">{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixin from './mixin'
export default {
  mixins: [Mixin]
}
</script>

<style scoped>
@import './style.css';
.option-list {
  padding: 20px 30px 10px 30px;
  justify-content: flex-start;
}
.option {
  width: 60px;
  height: 72px;
}
.option-cover {
  width: calc(100% / 4);
}
.option-image > img {
  max-width: 22px;
  max-height: 22px;
}
.option-name {
  width: max-content;
  margin: 0 auto;
}
</style>
