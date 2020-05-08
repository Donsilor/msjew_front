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
            <!-- <div class="wish-state">
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
            </div> -->

            <!-- 折扣 -->
            <div class="list-discount-icon1" v-if="couponType(item.coupon) == 'discount'">
              <span>{{ discountConversion(item.coupon.discount.discount) }}折</span>
            </div>

            <!-- 优惠券 -->
            <div class="list-discount-icon1" v-if="couponType(item.coupon) == 'money'">
              <span>优惠券</span>
            </div>
          </div>
          <div class="product-info">
            <div class="product-price">
             <div v-if="couponType(item.coupon) !== 'discount'">
                <span class="coin">{{ item.coinType }}</span>
                <span class="price">{{ formatNumber(item.salePrice) }}</span>
              </div>
            
              <!-- 折扣 -->
              <div class="list-discount-price" v-if="couponType(item.coupon) == 'discount'">
                <div>
                  <span class="coin">{{ item.coinType }}</span>
                  <span class="price">{{ formatNumber(item.salePrice) }}</span>
                </div>
                <div>
                  <span class="coin">{{ item.coinType }}</span>
                  <span class="price">{{ formatNumber(item.coupon.discount.price) }}</span>
                </div>
              </div>
            </div>

            <div class="product-title">
              <!-- 优惠券 -->
              <span class="list-discount-icon2 padding" v-if="couponType(item.coupon) == 'money'">￥</span>
              <!-- 折扣 -->
              <span class="list-discount-icon2" v-if="couponType(item.coupon) == 'discount'">{{ discountConversion(item.coupon.discount.discount) }}折</span>
              {{ item.goodsName }}
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
    <!-- <div class="empty">
      <bdd-empty v-show="recommends.length === 0" type="product"></bdd-empty>
    </div> -->
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
    },
    coupon: {
      type: [Boolean, String, Number],
      required: false,
      default() {
        return ''
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
