<template>
  <div class="empty-container">
    <div class="empty-image">
      <img :src="showingInfo.image" />
    </div>
    <div class="empty-message">
      {{ showingInfo.message }}
    </div>
    <div
      v-if="showingInfo.operate && showingInfo.operate.length > 0"
      class="empty-operate"
    >
      <span
        v-for="(each, n) in showingInfo.operate"
        :key="n"
        @click="emitEvent(each.eventName)"
        >{{ each.text }}</span
      >
    </div>
    <div
      v-if="showingInfo.button && showingInfo.button.length > 0"
      class="empty-button"
    >
      <button
        v-for="(each, n) in showingInfo.button"
        :key="n"
        @click="emitEvent(each.eventName)"
      >
        {{ each.text }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'default'
    }
  },
  data() {
    return {
      lang: this.LANGUAGE.components.empty,
      typeMap: {
        default: {
          image: '/empty/search.png',
          message: this.LANGUAGE.components.empty.defaultMessage
        },
        list: {
          image: '/empty/list.png',
          message: this.LANGUAGE.components.empty.listMessage
        },
        cart: {
          image: '/empty/list.png',
          message: this.LANGUAGE.components.empty.cartMessage,
          button: [
            {
              text: this.LANGUAGE.components.empty.toShopping,
              eventName: 'toShopping'
            }
          ]
        },
        wish: {
          image: '/empty/list.png',
          message: this.LANGUAGE.components.empty.listMessage,
          operate: [
            {
              text: this.LANGUAGE.components.empty.toShopping,
              eventName: 'toShopping'
            }
          ]
        },
        comment: {
          image: '/empty/comment.png',
          message: this.LANGUAGE.components.empty.commentMessage,
          operate: [
            {
              text: this.LANGUAGE.components.empty.toShopping,
              eventName: 'toShopping'
            }
          ]
        },
        search: {
          image: '/empty/search.png',
          message: this.LANGUAGE.components.empty.searchMessage,
          operate: [
            {
              text: this.LANGUAGE.components.empty.searchAgain,
              eventName: 'searchAgain'
            }
          ]
        },
        order: {
          image: '/empty/order.png',
          message: this.LANGUAGE.components.empty.orderMessage,
          operate: [
            {
              text: this.LANGUAGE.components.empty.toShopping,
              eventName: 'toShopping'
            }
          ]
        },
        signal: {
          image: '/empty/signal.png',
          message: this.LANGUAGE.components.empty.signalMessage,
          operate: [
            {
              text: this.LANGUAGE.components.empty.refresh,
              eventName: 'refreshRetry'
            }
          ]
        },
        coupon: {
          image: '/empty/coupon.png',
          message: this.LANGUAGE.components.empty.couponMessage
        },
        address: {
          image: '/empty/address.png',
          message: this.LANGUAGE.components.empty.addressMessage
        },
        chooseDiamondContrast: {
          image: '/empty/chooseDiamond.png',
          message: this.LANGUAGE.components.empty.chooseDiamondContrast
        },
        diamondContrast: {
          image: '/empty/list.png',
          message: this.LANGUAGE.components.empty.listMessage,
          operate: [
            {
              text: this.LANGUAGE.components.empty.toShopping,
              eventName: 'toShopping'
            }
          ]
        }
      }
    }
  },
  computed: {
    showingInfo() {
      return this.typeMap[this.type || 'default'] || this.typeMap.default
    }
  },
  created() {},
  mounted() {},
  methods: {
    emitEvent(type) {
      if (!type || !(typeof type === 'string')) {
        return
      }
      this.$emit(type)
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.empty-container {
  padding-top: 100px;

  .empty-image {
    img {
      max-width: 20%;
    }
  }
  .empty-message {
    margin-top: 11px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;
  }
  .empty-operate {
    margin-top: 22px;
    font-size: 14px;
    font-weight: 400;
    text-decoration: underline;
    color: rgba(242, 155, 135, 1);
  }
  .empty-button {
    margin-top: 22px;
    font-size: 14px;
    font-weight: 400;
    text-decoration: underline;
    color: rgba(242, 155, 135, 1);

    button {
      width: 120px;
      height: 36px;
      background: rgba(250, 250, 250, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 5px;

      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
