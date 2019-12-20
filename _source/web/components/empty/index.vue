<template>
  <div class="empty-container">
    <div class="box">
      <img :src="activeEmpty.icon" />
      <div class="desc">{{ activeEmpty.desc }}</div>
      <div class="operate-group">
        <div
          v-for="(item, index) in activeEmpty.button"
          :key="index"
          class="operate"
          @click="eventEmit(item.eventName)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const lang = 'components.empty'
export default {
  props: {
    type: {
      type: String,
      required: true,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      lang,
      maps: [
        {
          key: 'product',
          desc: this.$t(`${lang}.product`),
          icon: '/empty/product.png'
        },
        {
          key: 'order',
          desc: this.$t(`${lang}.order`),
          icon: '/empty/order.png'
        },
        {
          key: 'wish',
          desc: this.$t(`${lang}.wish`),
          icon: '/empty/wish.png',
          operate: [
            {
              text: this.$t(`${lang}.toShopping`),
              eventName: 'toShopping'
            }
          ]
        },
        {
          key: 'cart',
          desc: this.$t(`${lang}.cart`),
          icon: '/empty/cart.png',
          operate: [
            {
              text: this.$t(`${lang}.toShopping`),
              eventName: 'toShopping'
            }
          ]
        },
        {
          key: 'search',
          desc: this.$t(`${lang}.search`),
          icon: '/empty/search.png',
          operate: [
            {
              text: this.$t(`${lang}.changeKeyword`),
              eventName: 'changeKeyword'
            }
          ]
        },
        {
          key: 'comment',
          desc: this.$t(`${lang}.comment`),
          icon: '/empty/comment.png'
        },
        {
          key: 'address',
          desc: this.$t(`${lang}.address`),
          icon: '/empty/address.png'
        },
        {
          key: 'compare',
          desc: this.$t(`${lang}.compare`),
          icon: '/empty/compare.png'
        }
      ]
    }
  },
  computed: {
    activeEmpty() {
      let result = {}
      for (let n = 0, length = this.maps.length; n < length; n++) {
        if (this.maps[n].key === this.type) {
          result = this.maps[n]
          break
        }
      }
      return result
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped="scoped">
.empty-container {
  .box {
    padding-bottom: 50px;
    padding-top: 30px;
  }
  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    margin-bottom: 18px;
  }
  .desc {
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .operate-group {
    display: flex;
    align-items: center;
    justify-content: center;

    .operate {
      margin-top: 8px;
      padding: 0 20px;
      text-align: center;
      color: #e4c1bb;
      text-decoration: underline;
      cursor: pointer;
      font-size: 14px;
    }
  }
}
</style>
