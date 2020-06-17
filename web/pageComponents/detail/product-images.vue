<template>
  <div class="product-images">
    <ul class="thumbnails">
      <li v-if="goods3ds" class="item">
        <img src="/diamonds/360.png" />
      </li>
      <li
        v-for="(item, index) in images"
        :key="index"
        :class="['item', { active: index === activeIndex }]"
        @click="changeActiveIndex(index)"
      >
        <img :src="item" />
      </li>
      <li v-if="giaNumber" class="item">
        <a
          :href="'https://www.gia.edu/report-check?reportno=' + giaNumber"
          target="_blank"
        >
          <img src="/diamonds/gia.png" />
        </a>
      </li>
    </ul>

    <div class="main-pic">
      <img :src="images[activeIndex]" />

      <!-- 活动图标 -->
      <div class="discount-icon2" v-if="this.coupon == 'money'">
        <div class="icon">{{ $t(`${lang}.discounts1`) }}</div>
      </div>

      <div class="discount-icon2" v-if="this.coupon !== 'money' && this.coupon != ''">
        <div class="icon">{{ language == 'en_US' ? discountUs(this.coupon)+'%' : discountConversion(this.coupon)}} {{ $t(`${lang}.discounts2`) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const lang = 'detail'
export default {
  props: {
    images: {
      type: Array,
      required: false,
      default() {
        return [this.ERROR_IMAGE]
      },
      validator(value) {
        return value.length > 0 ? value : [this.ERROR_IMAGE]
      }
    },
    goods3ds: {
      type: [Number, String],
      required: false,
      default() {
        return ''
      }
    },
    giaNumber: {
      type: [Number, String],
      required: false,
      default() {
        return ''
      }
    },
    coupon: {
      type: [Boolean, String, Number],
      required: false,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      lang,
      activeIndex: 0,
      language: this.$store.state.language
    }
  },
  computed: {
    activeImage() {
      return this.images[this.activeIndex] || ''
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {})

    // this.language = this.getCookie('language')
  },
  methods: {
    changeActiveIndex(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style lang="less" scoped>
.product-images {
  display: flex;

  .thumbnails {
    max-height: 500px;
    overflow: auto;
    list-style: none;
    margin-right: 33px;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }

    .item {
      flex-grow: 0;
      flex-shrink: 0;
      position: relative;
      margin-bottom: 13px;
      width: 72px;
      height: 72px;
      border: 1px solid #dddddd;
      box-sizing: border-box;
      font-size: 0;
      line-height: 0;
      overflow: hidden;
      transition: all 0.1s linear;

      &.active {
        border: 1px solid rgba(170, 138, 123, 1);
      }

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 95%;
        max-height: 95%;
      }
    }
  }

  .main-pic {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px solid #dddddd;
    box-sizing: border-box;
    font-size: 0;
    line-height: 0;
    // overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
