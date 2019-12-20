<template>
  <div class="list-data">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      :class="['data-item', 'product']"
    >
      <!--          商品数据-->
      <nuxt-link :to="item.to || { path: '/' }">
        <div class="product-content">
          <div class="product-image">
            <img class="main-image" :src="item.images[0]" />
            <img class="sub-image" :src="item.images[1] || item.images[0]" />
            <div class="wish-state">
              <i
                v-if="inWish(item.id)"
                class="iconfont iconxin"
                @click.stop.prevent="setWish(item.id)"
              ></i>
              <i
                v-else
                class="iconfont iconkongxin"
                @click.stop.prevent="setWish(item.id)"
              ></i>
            </div>
          </div>
          <div class="product-info">
            <div class="product-price">
              <span class="coin">{{ item.coinType }}</span>
              <span class="price">{{ formatNumber(item.price) }}</span>
            </div>
            <div class="product-title">
              {{ item.name }}
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="empty">
      <bdd-empty v-show="recommends.length === 0" type="product"></bdd-empty>
    </div>
  </div>
</template>

<script>
import Operate from '@/mixins/operate.js'
export default {
  mixins: [Operate],
  props: {
    recommends: {
      type: Array,
      required: false,
      default() {
        return [
          // {
          //   id: 110,
          //   categoryId: 2,
          //   name: '18k白金-结婚戒指-女-渾身鑲嵌介01',
          //   images: ['http://www.baidu.com/logo.png']
          //   price: 1350,
          //   coinType: 'HKD',
          //   isJoin: null,
          //   specsModels: null
          // }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-data {
  flex-wrap: nowrap;
  overflow: auto;

  .empty {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
  }
}
</style>
