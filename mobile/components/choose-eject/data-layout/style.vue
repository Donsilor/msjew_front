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
  padding: 20px 20px 10px 20px;
}
.option {
  width: 80px;
  height: 72px;
}
.option-image > img {
  max-width: 80%;
  max-height: 68%;
}
</style>
