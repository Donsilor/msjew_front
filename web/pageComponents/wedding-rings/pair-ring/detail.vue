<template>
  <div class="page-content detail-page">
    <top-nav></top-nav>
    <section class="detail">
      <!--      左侧-->
      <div class="left-detail">
        <product-images :images="thumbnails" @getIdx="getIndex" :coupon="coupons"></product-images>

		<div class="magn-box">
			<bdd-magnifying :msg="magnifying"></bdd-magnifying>
		</div>
      </div>
      <!--      右侧-->
      <div class="right-detail">
        <h2 class="product-name">
          {{ info.goodsName }}
        </h2>
        <div class="product-code">{{ $t(`${lang}.goodsId`) }}:{{ info.goodsCode }}</div>
        <!-- <div class="sku" >
          <div class="left-properties" >
            <div v-if="firstRing.materials.length > 0" class="property-item">
              <span class="item-name">
                {{ firstRing.targetUser }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <i
                    :class="[
                      'iconfont',
                      'iconmaterial-big-pt',
                      'color-icon',
                      materialColors[
                        firstRing.materials[firstRingChecked.materialIndex].id
                      ]
                    ]"
                  ></i>
                  <span class="name ow-h1">
                    {{
                      firstRing.materials[firstRingChecked.materialIndex].name
                    }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in firstRing.materials"
                    :key="index"
                    :class="[
                      'item',
                      { active: firstRingChecked.materialIndex === index }
                    ]"
                    @click="changeFirstRingChecked('materialIndex', index)"
                  >
                    <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        materialColors[item.id]
                      ]"
                    ></i>
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="firstRing.sizes.length > 0" class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.size`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ firstRing.sizes[firstRingChecked.sizeIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in firstRing.sizes"
                    :key="index"
                    :class="[
                      'item',
                      { active: firstRingChecked.sizeIndex === index }
                    ]"
                    @click="changeFirstRingChecked('sizeIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right-properties" >
            <div v-if="secondRing.materials.length > 0" class="property-item">
              <span class="item-name">
                {{ secondRing.targetUser }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <i
                    :class="[
                      'iconfont',
                      'iconmaterial-big-pt',
                      'color-icon',
                      materialColors[
                        secondRing.materials[secondRingChecked.materialIndex].id
                      ]
                    ]"
                  ></i>
                  <span class="name ow-h1">
                    {{
                      secondRing.materials[secondRingChecked.materialIndex].name
                    }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in secondRing.materials"
                    :key="index"
                    :class="[
                      'item',
                      { active: secondRingChecked.materialIndex === index }
                    ]"
                    @click="changeSecondRingChecked('materialIndex', index)"
                  >
                    <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        materialColors[item.id]
                      ]"
                    ></i>
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="secondRing.sizes.length > 0" class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.size`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ secondRing.sizes[secondRingChecked.sizeIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in secondRing.sizes"
                    :key="index"
                    :class="[
                      'item',
                      { active: secondRingChecked.sizeIndex === index }
                    ]"
                    @click="changeSecondRingChecked('sizeIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
              <div class="helper-popover">
                <span class="helper-name">
                  {{ $t(`${lang}.USEdition`) }}
                </span>
                <el-popover placement="bottom" trigger="hover">
                  <ring-size></ring-size>
                  <b slot="reference" class="prompt-icon">!</b>
                </el-popover>
              </div>
              <a href="/education/rings/size" class="choose-size">{{ $t(`${lang}.chooseSize`) }}></a>
            </div>
          </div>
        </div> -->
        <div class="sku" v-if="firstRing.carats.length == 0 && secondRing.carats.length == 0">
          <div class="left-properties" v-if="firstRing.materials.length > 0">
            <div  class="property-item">
              <span class="item-name">
                {{ firstRing.targetUser }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <i
                    :class="[
                      'iconfont',
                      'iconmaterial-big-pt',
                      'color-icon',
                      materialColors[
                        firstRing.materials[firstRingChecked.materialIndex].id
                      ]
                    ]"
                  ></i>
                  <span class="name ow-h1">
                    {{
                      firstRing.materials[firstRingChecked.materialIndex].name
                    }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in firstRing.materials"
                    :key="index"
                    :class="[
                      'item',
                      { active: firstRingChecked.materialIndex === index }
                    ]"
                    @click="changeFirstRingChecked('materialIndex', index)"
                  >
                    <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        materialColors[item.id]
                      ]"
                    ></i>
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="firstRing.sizes.length > 0" class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.size`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ firstRing.sizes[firstRingChecked.sizeIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in firstRing.sizes"
                    :key="index"
                    :class="[
                      'item',
                      { active: firstRingChecked.sizeIndex === index }
                    ]"
                    @click="changeFirstRingChecked('sizeIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right-properties" v-if="secondRing.materials.length > 0">
            <div  class="property-item">
              <span class="item-name">
                {{ secondRing.targetUser }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <i
                    :class="[
                      'iconfont',
                      'iconmaterial-big-pt',
                      'color-icon',
                      materialColors[
                        secondRing.materials[secondRingChecked.materialIndex].id
                      ]
                    ]"
                  ></i>
                  <span class="name ow-h1">
                    {{
                      secondRing.materials[secondRingChecked.materialIndex].name
                    }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in secondRing.materials"
                    :key="index"
                    :class="[
                      'item',
                      { active: secondRingChecked.materialIndex === index }
                    ]"
                    @click="changeSecondRingChecked('materialIndex', index)"
                  >
                    <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        materialColors[item.id]
                      ]"
                    ></i>
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="secondRing.sizes.length > 0" class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.size`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ secondRing.sizes[secondRingChecked.sizeIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in secondRing.sizes"
                    :key="index"
                    :class="[
                      'item',
                      { active: secondRingChecked.sizeIndex === index }
                    ]"
                    @click="changeSecondRingChecked('sizeIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
              <div class="helper-popover">
                <span class="helper-name">
                  {{ $t(`${lang}.USEdition`) }}
                </span>
                <el-popover placement="bottom" trigger="hover">
                  <ring-size></ring-size>
                  <b slot="reference" class="prompt-icon">!</b>
                </el-popover>
              </div>
              <a href="/education/rings/size" class="choose-size">{{ $t(`${lang}.chooseSize`) }}></a>
            </div>
          </div>
        </div>
        <div class="sku2" v-else>
          <div class="left-properties" v-if="firstRing.materials.length > 0">
            <div  class="property-item">
              <span class="item-name">
                {{ firstRing.targetUser }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <i
                    :class="[
                      'iconfont',
                      'iconmaterial-big-pt',
                      'color-icon',
                      materialColors[
                        firstRing.materials[firstRingChecked.materialIndex].id
                      ]
                    ]"
                  ></i>
                  <span class="name ow-h1">
                    {{
                      firstRing.materials[firstRingChecked.materialIndex].name
                    }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in firstRing.materials"
                    :key="index"
                    :class="[
                      'item',
                      { active: firstRingChecked.materialIndex === index }
                    ]"
                    @click="changeFirstRingChecked('materialIndex', index)"
                  >
                    <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        materialColors[item.id]
                      ]"
                    ></i>
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="firstRing.sizes.length > 0" class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.size`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ firstRing.sizes[firstRingChecked.sizeIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in firstRing.sizes"
                    :key="index"
                    :class="[
                      'item',
                      { active: firstRingChecked.sizeIndex === index }
                    ]"
                    @click="changeFirstRingChecked('sizeIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="firstRing.carats.length > 0" class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.carat`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ firstRing.carats[firstRingChecked.caratIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in firstRing.carats"
                    :key="index"
                    :class="[
                      'item',
                      { active: firstRingChecked.caratIndex === index }
                    ]"
                    @click="changeFirstRingChecked('caratIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="right-properties" v-if="secondRing.materials.length > 0">
            <div  class="property-item">
              <span class="item-name">
                {{ secondRing.targetUser }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <i
                    :class="[
                      'iconfont',
                      'iconmaterial-big-pt',
                      'color-icon',
                      materialColors[
                        secondRing.materials[secondRingChecked.materialIndex].id
                      ]
                    ]"
                  ></i>
                  <span class="name ow-h1">
                    {{
                      secondRing.materials[secondRingChecked.materialIndex].name
                    }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in secondRing.materials"
                    :key="index"
                    :class="[
                      'item',
                      { active: secondRingChecked.materialIndex === index }
                    ]"
                    @click="changeSecondRingChecked('materialIndex', index)"
                  >
                    <i
                      :class="[
                        'iconfont',
                        'iconmaterial-big-pt',
                        'color-icon',
                        materialColors[item.id]
                      ]"
                    ></i>
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div v-if="secondRing.sizes.length > 0" class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.size`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ secondRing.sizes[secondRingChecked.sizeIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in secondRing.sizes"
                    :key="index"
                    :class="[
                      'item',
                      { active: secondRingChecked.sizeIndex === index }
                    ]"
                    @click="changeSecondRingChecked('sizeIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
              <div class="helper-popover">
                <span class="helper-name">
                  {{ $t(`${lang}.USEdition`) }}
                </span>
                <el-popover placement="bottom" trigger="hover">
                  <ring-size></ring-size>
                  <b slot="reference" class="prompt-icon">!</b>
                </el-popover>
              </div>
              <a href="/education/rings/size" class="choose-size">{{ $t(`${lang}.chooseSize`) }}></a>
            </div>
            <div v-if="secondRing.carats.length > 0" class="property-item">
              <span class="item-name">
                {{ $t(`${lang}.carat`) }}
              </span>
              <div class="property">
                <div class="had-checked">
                  <span class="name ow-h1">
                    {{ secondRing.carats[secondRingChecked.caratIndex].name }}
                  </span>
                  <i class="iconfont iconxiala drop-down-icon"></i>
                </div>
                <ul class="options">
                  <li
                    v-for="(item, index) in secondRing.carats"
                    :key="index"
                    :class="[
                      'item',
                      { active: secondRingChecked.caratIndex === index }
                    ]"
                    @click="changeSecondRingChecked('caratIndex', index)"
                  >
                    <span class="name ow-h1">{{ item.name }}</span>
                  </li>
                </ul>
              </div>
              <!-- <div class="helper-popover">
                <span class="helper-name">
                  {{ $t(`${lang}.USEdition`) }}
                </span>
                <el-popover placement="bottom" trigger="hover">
                  <ring-size></ring-size>
                  <b slot="reference" class="prompt-icon">!</b>
                </el-popover>
              </div>
              <a href="/education/rings/size" class="choose-size">{{ $t(`${lang}.chooseSize`) }}></a> -->
            </div>
          </div>
        </div>
        <ul class="services-list" v-if=" info.goodsServicesJsons.length > 0">
          <li
            v-for="(item, index) in info.goodsServicesJsons || []"
            :key="index"
            class="item"
          >
            <div class="item-image">
              <img :src="item.img" />
            </div>
            <div class="item-content">
              <span>{{ item.name }}</span>
            </div>
          </li>
        </ul>

        <!-- 折扣活动 -->
        <div class="discount-box" v-if="info.coupon.discount">
          <div class="discount-active">
            <div>
              <span>{{ $t(`${lang}.discountsActive`) }}：</span>
              <span class="discount-icon">{{ language == 'en_US' ? discountUs(this.info.coupon.discount.discount)+'%' : discountConversion(this.info.coupon.discount.discount)}} {{ $t(`${lang}.discounts2`) }}</span>
            </div>
            <div class="time">{{ $t(`${lang}.activityTime`) }}：{{activeTime}}</div>
          </div>

          <div class="discount-price">
            <span class="old-price">{{ formatCoin(info.coinType) }} {{ formatNumber(price) }}</span>
            <span class="new-price">{{ formatCoin(info.coinType) }} {{ formatNumber(price2) }}</span>
          </div>
        </div>

        <!-- 优惠活动 -->
        <div class="favourable-box" v-if="info.coupon.money">
          <div class="discount-active">
            <div>
              <span>{{ $t(`${lang}.discounts1`) }}：</span>
              <span class="favourable-icon">￥</span>
              <span class="get" @click="getCoupon">{{ $t(`${lang}.getCoupon`) }}></span>
            </div>
            <!-- <div class="time">{{ $t(`${lang}.activityTime`) }}：{{activeTime}}</div> -->
          </div>

          <!-- <div class="discount-price">
            <span class="old-price">HKD  2,222,22</span>
            <span class="new-price">HKD  2,222,22</span>
          </div> -->
        </div>

        <div class="product-price" v-if="!info.coupon.discount">
          <span class="coin">
            {{ formatCoin(info.coinType) }}
          </span>
          <span class="price">
            {{ formatNumber(price) }}
          </span>
        </div>
        <div class="button-group">
          <button
            v-loading="orderingNow"
            :class="['add-to-cart', { actived: canAddCart }]"
            @click="orderNow"
          >
            {{ $t(`${lang}.buyNow`) }}
          </button>
          <button
            v-loading="addingCart"
            :class="['add-to-cart', { active: canAddCart }]"
            @click="addCart"
          >
            {{ $t(`${lang}.addCart`) }}
          </button>
          
        </div>
       <!-- <div class="other-info">
          <ul class="operates">
            <li class="item wish-state">
              <i
                v-if="inWish(info.id)"
                class="iconfont iconxin active"
                @click.stop.prevent="setWish(info.id)"
              ></i>
              <i
                v-else
                class="iconfont iconkongxin"
                @click.stop.prevent="setWish(info.id)"
              ></i>
              <span>
                {{ $t(`${lang}.wish`) }}
              </span>
            </li>
          </ul>
        </div> -->
      </div>
    </section>
    <!--    推荐商品-->
    <section class="list-content recommend">
      <h2 class="section-name">
        {{ $t(`${lang}.buySeparately`) }}
      </h2>
      <recommend-data :recommends="recommends"></recommend-data>
    </section>
    <!--    tab切换-->
    <!-- <ul class="tab">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="['item', { active: activeTab === item.key }]"
        @click="item.onClick"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul> -->
    <!--    商品详情-->
    <h2 class="detail-name">{{ $t(`${lang}.pairRingDetails`) }}</h2>
    <section ref="product-desc" class="desc-top">
      <div class="section-name">
        <h3>{{ $t(`${lang}.goodsId`) }}：{{ info.goodsCode }}</h3>
      </div>
      <div class="attr-group">
        <h3 class="group-name">（{{ $t(`${lang}.ring01`) }}）</h3>
        <ul class="attr-list">
          <li
            v-for="(item, index) in firstRing.specs"
            :key="index"
            class="attr-item"
          >
            <span>{{ item.configName }}:</span>
            <span>{{ item.configAttrVal || '--' }}</span>
          </li>
        </ul>
        <div class="line"></div>
      </div>
      <div class="attr-group">
        <h3 class="group-name">（{{ $t(`${lang}.ring02`) }}）</h3>
        <ul class="attr-list">
          <li
            v-for="(item, index) in secondRing.specs"
            :key="index"
            class="attr-item"
          >
            <span>{{ item.configName }}:</span>
            <span>{{ item.configAttrVal || '--' }}</span>
          </li>
        </ul>
        <div class="line"></div>
      </div>
    </section>
    <section class="desc" v-html="info.ringDesc"></section>
    <order-include></order-include>
    <comments ref="product-comments" :group-id="info.id"></comments>
    <!-- 获取优惠券 -->
    <get-coupon v-if="showCoupon" @closeCoupon="showCoupon = false" :moneyInfo="info.coupon.money"></get-coupon>
  </div>
</template>

<script>
import Detail from '@/mixins/detail.js'
import Operate from '@/mixins/operate.js'
import TopNav from '@/pageComponents/detail/top-nav.vue'
import ProductImages from '@/pageComponents/detail/product-images.vue'
import RingSize from '@/pageComponents/detail/ring-size.vue'
import OrderInclude from '@/pageComponents/detail/order-include.vue'
import Comments from '@/pageComponents/detail/comments.vue'
import RecommendData from '@/pageComponents/detail/recommend.vue'
const lang = 'detail'
export default {
  head() {
    return {
      title: this.info.goodsName,
      meta: [
        {
          name: 'title',
          content: this.info.goodsName,
        },
        {
          name: 'description',
          content: this.info.goodsName,
        },
        {
          name: 'keywords',
          content: this.info.goodsName,
        }
      ]
    }
  },
  components: {
    TopNav,
    ProductImages,
    RingSize,
    OrderInclude,
    Comments,
    RecommendData
  },
  mixins: [Detail, Operate],
  data() {
    const _this = this
    return {
      lang,
      tabs: [
        {
          key: 'desc',
          name: this.$t(`${lang}.pairRingDetails`),
          ref: '',
          onClick() {
            const targetEle = document.getElementsByClassName('layout-box')[0]
            const top = _this.$refs['product-desc'].offsetTop - 110
            _this.$scrollTopTo(targetEle, top)
          }
        },
        // {
        //   key: 'reviews',
        //   name: this.$t(`${lang}.customerReviews`),
        //   ref: '',
        //   onClick() {
        //     const targetEle = document.getElementsByClassName('layout-box')[0]
        //     const top = _this.$refs['product-comments'].$el.offsetTop - 110
        //     _this.$scrollTopTo(targetEle, top)
        //   }
        // }
      ],
      activeTab: 'desc',
      materialColors: {
        31: 'color-14k-white',
        28: 'color-18k-white',
        32: 'color-14k-yellow',
        29: 'color-18k-yellow',
        34: 'color-platinum',
        30: 'color-18k-rose-gold'
      },
      firstRingChecked: {
        materialIndex: 0,
        sizeIndex: 0,
        caratIndex: 0
      },
      secondRingChecked: {
        materialIndex: 0,
        sizeIndex: 0,
        caratIndex: 0
      },
      coupleLadyId:'',
      coupleMenId:'',
      firstRingId:'',
      secondRingId:'',
      goodsId:'',
      styleId:'',
      categoryId:'',
      stock:'',
      magnifying:'',
      showCoupon: false,
      moneyList: [],
      activeTime: '',
      language: this.$store.state.language,
      isLogin:this.$store.getters.hadLogin
    }
  },
  computed: {
    coupons() {
      var co;
      if(this.couponType(this.info.coupon) == 'discount'){
        co = this.info.coupon.discount.discount;
      }else if(this.couponType(this.info.coupon) == 'money'){
        co = 'money'
      }else{
        co = 0
      }

      return co
    },
    thumbnails() {
      return this.imageStrToArray(this.info.goodsImages || '')
    },
    firstRing() {
      return this.getRingInfo(0)
    },
    secondRing() {
      return this.getRingInfo(1)
    },
    price() {
      const _this = this
      const info = _this.info || {}
      let result = info.salePrice
      // if (_this.firstRingSimpleDetail && _this.secondRingSimpleDetail) {
      //   console.log('相加')
      //   result =
      //     _this.firstRingSimpleDetail.retailMallPrice +
      //     _this.secondRingSimpleDetail.retailMallPrice
      // } else {
      //   console.log('不相加')
      // }
      return result
    },
    price2() {
      const _this = this
      const info = _this.info || {}
      let result = info.coupon.discount.price
      return result
    },
    recommends() {
      // console.log("info2",this.info)
      const _this = this
      const allData = JSON.parse(
        JSON.stringify(_this.info.ring || [])
      )
      // console.log("info2",allData)
      allData.forEach(item => {
        // console.log("info999999",item)
        item.images = _this.imageStrToArray(item.goodsImages || '')
        item.name = item.goodsName
        item.price = item.salePrice
        item.to = _this.getRecommendProductRouteInfo(item)
      })

      return allData
    },
    firstRingSimpleDetail() {
      const _this = this
      const ring = _this.firstRing
      const details = ring.details
      const ringChecked = _this.firstRingChecked

      const material =
        ring.materials.length > 0 && ring.materials[ringChecked.materialIndex]
          ? ring.materials[ringChecked.materialIndex].id
          : null
      const size =
        ring.sizes.length > 0 && ring.sizes[ringChecked.sizeIndex]
          ? ring.sizes[ringChecked.sizeIndex].id
          : null
      const carat =
        ring.carats.length > 0 && ring.carats[ringChecked.caratIndex]
          ? ring.carats[ringChecked.caratIndex].id
          : null

      let result = null
      for (let n = 0, length = details.length; n < length; n++) {
        // {
        //   "id":1232,
        //   "categoryId":2,
        //   "goodsId":110,
        //   "goodsDetailsCode":"5786863",
        //   "warehouse":null,
        //   "barCode":null,
        //   "productNumber":null,
        //   "stock":358345,
        //   "retailPrice":null,
        //   "retailMallPrice":1350,
        //   "material":28,
        //   "size":129
        // },
        const item = details[n]
        if (item.material === material && item.size === size && item.carat === carat) {
          result = item
          break
        }
      }
      console.log('test', result);
      return result
    },
    secondRingSimpleDetail() {
      const _this = this
      const ring = _this.secondRing
      const details = ring.details
      const ringChecked = _this.secondRingChecked

      const material =
        ring.materials.length > 0 && ring.materials[ringChecked.materialIndex]
          ? ring.materials[ringChecked.materialIndex].id
          : null
      const size =
        ring.sizes.length > 0 && ring.sizes[ringChecked.sizeIndex]
          ? ring.sizes[ringChecked.sizeIndex].id
          : null
      const carat =
        ring.carats.length > 0 && ring.carats[ringChecked.caratIndex]
          ? ring.carats[ringChecked.caratIndex].id
          : null

      let result = null
      for (let n = 0, length = details.length; n < length; n++) {
        const item = details[n]
        if (item.material === material && item.size === size && item.carat === carat ) {
          result = item
          break
        }
      }
      console.log('test2', result);
      return result
    },
    // 是否在销售
    inSale() {
      return (
        this.info.goodsStatus === 2
        //  &&
        // this.firstRing.goodsStatus === 2 &&
        // this.secondRing.goodsStatus === 2
      )
    },
    // 是否有存货
    hadStock() {
      try {
        if (
          this.stock > 0
        ) {
          return true
        }
        return false
      } catch (e) {
        return false
      }
    },
    getTimestampUuid () {
      return new Date().getTime().toString()
    },
  },
  watch: {
    info(val, oldVal) {
    }
  },
  mounted() {
    // console.log("info",this.info)
    const _this = this
    if(this.info.coupon.hasOwnProperty('discount')){
      this.activeTime = this.changeTime(this.info.coupon.discount.end_time)
    }
    _this.$nextTick(() => {})

  this.magnifying = this.thumbnails[0]
  },
  methods: {
    getRecommendProductRouteInfo(product = {}) {
      return {
        path: `/ring/wedding-rings/${product.id}`,
        query: {
          goodId: product.id,
          ringType: 'single'
        }
      }
    },
    getRingInfo(index) {

      const _this = this
      const product =
        _this.info && _this.info.ring && _this.info.ring[index]
          ? JSON.parse(JSON.stringify(_this.info.ring[index]))
          : {}
      // console.log("product",product)
      return Object.assign({}, product, {
        targetUser: (() => {
          const specs = product.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === '26') {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: product.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = product.sizes || []
            sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = product.carats || []
            // carats.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: product.specs || [],
        details: product.details || [],
        goodsServicesJsons: (product.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })
    },
    changeFirstRingChecked(key, value) {
      const _this = this
      const ringChecked = JSON.parse(JSON.stringify(_this.firstRingChecked))
      ringChecked[key] = value
      _this.firstRingChecked = ringChecked

      _this.changeChecked()
    },
    changeSecondRingChecked(key, value) {
      const _this = this
      const ringChecked = JSON.parse(JSON.stringify(_this.secondRingChecked))
      ringChecked[key] = value
      _this.secondRingChecked = ringChecked

      _this.changeChecked()
    },

    //下拉框更新后触发
    changeChecked() {
      const _this = this

      const firstRing = _this.firstRingSimpleDetail
      const secondRing = _this.secondRingSimpleDetail

      if(!firstRing || !secondRing) {
        _this.coupleLadyId = ''
        _this.coupleMenId = ''
        _this.goodsId = ''
        _this.styleId = ''
        _this.categoryId = ''
        // _this.info.salePrice = ''
        _this.stock = ''
        return;
      }
      console.log(firstRing['id'], secondRing['id']);
      _this.doubleRingDetailId(firstRing['id'], secondRing['id']);
    },
    doubleRingDetailId(ladyRing, menRing) {
      const _this = this

        _this.coupleLadyId = ''
        _this.coupleMenId = ''
        _this.goodsId = ''
        _this.styleId = ''
        _this.categoryId = ''
        // _this.info.salePrice = ''
        _this.stock = ''

      this.info.details.map((item, i) => {
        if(ladyRing==item.ladyRing && menRing==item.menRing || menRing==item.ladyRing && ladyRing==item.menRing) {
          // console.log("dddd",item)
          _this.coupleLadyId = item.ladyRing
          _this.coupleMenId = item.menRing
          _this.goodsId = item.id
          _this.styleId = item.goodsId
          _this.categoryId = item.categoryId
          _this.info.salePrice = item.retailMallPrice
          if(_this.info.coupon.discount){
            _this.info.coupon.discount.price = item.coupon.discount.price
          }
          _this.stock = item.stock
          return;
        }
      })
    },
    // FirstRingDetailId() {
      // const _this = this
      // this.firstRing.details.map((item,i) => {
      //   _this.firstRingId = item.id
      // })
        // console.log("firstRingId",_this.firstRingId)
    // },
    // SecondRingDetailId(){
      // console.log(3);
      // const _this = this
      // this.secondRing.details.map((item,i) => {
      //   _this.secondRingId = item.id
      // })
        // console.log("secondRingId", _this.secondRingId)
    // },
    // 对戒独有的参数
    addWish(id) {
      const _this = this

      if (!id) {
        this.$errorMessage('no id')
        return
      }

      const goodInfo = {
        goodsId: null,
        groupId: id,
        groupType: 1,
        type: 1
      }

      _this.$store
        .dispatch('addWish', goodInfo)
        .then(data => {
          _this.$successMessage(_this.$t(`common.addWishSuccess`))
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    },
    // 加入购物车
    addCart() {
      const _this = this

      _this.changeChecked()

      if (!_this.canAddCart) {
         _this.$errorMessage(_this.$t(`common.doubleRingTip`))
        return
      }
      if (!_this.goodsId) {
         _this.$errorMessage(_this.$t(`common.doubleRingTip`))
        return
      }


      // const goodInfo = [
      //   {
      //     goods_num: 1,
      //     goodsDetailsId: _this.firstRingSimpleDetail.id,
      //     goods_id: _this.firstRingSimpleDetail.id,
      //     group_id: _this.info.id,
      //     group_type: 1,
      //     serviceId: 0,
      //     serviceVal: 'string',
      //     goods_type:2
      //   },
      //   {
      //     goods_num: 1,
      //     goodsDetailsId: _this.secondRingSimpleDetail.id,
      //     goods_id: _this.secondRingSimpleDetail.id,
      //     group_id: _this.info.id,
      //     group_type: 1,
      //     serviceId: 0,
      //     serviceVal: 'string',
      //     goods_type:2
      //   }
      // ]

      const goodInfo = [
        {
          goods_num: 1,
          goodsDetailsId: _this.goodsId,
          goods_id: _this.goodsId,
          group_id: null,
          group_type: null,
          serviceId: 0,
          serviceVal: 'string',
          goods_type:_this.categoryId
        }
      ]
      _this.$store
        .dispatch('addCart', goodInfo)
        .then(data => {
          // this.getList()
          fbq('track', 'AddToCart')
          _this.$successMessage(_this.$t(`common.addCartSuccess`))
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    },
    // 立即购买
    orderNow(){
      const _this = this

      _this.changeChecked()

      if (!_this.canAddCart) {
         _this.$errorMessage(_this.$t(`common.pleaseSelect`))
        return
      }
      if (!_this.goodsId) {
         _this.$errorMessage(_this.$t(`common.pleaseSelect`))
        return
      }

      const time = this.getTimestampUuid
      console.log("time",time)

      let goodInfo = [
        {
          goods_num: 1,
          goodsDetailsId: _this.goodsId,
          goods_id: _this.goodsId,
          group_id: null,
          group_type: null,
          serviceId: 0,
          serviceVal: 'string',
          goods_type:_this.categoryId
        }
      ]

      goodInfo = goodInfo.map(item => {
            item.createTime = time
            item.updateTime = time
            return item
        })
        // console.log("goodInfo",goodInfo)
      if(this.isLogin){
        this.$axios({
          method: 'post',
          url: 'web/member/cart/add',
          data: {
              goodsCartList: goodInfo
          }
        })
        .then(data => {
          const dataId = []
          dataId.push(data.data[0].id)
          // console.log("dddd",data)
          const cartIds = dataId.join(',')
          this.$router.push({
            path: `/billing-address`,
            query: { cartIds }
          })
        })
        .catch(err => {
            // return Promise.reject(err)
        })
      } else {
        const CART = 'cart'
        let goodInfo = [
          {
            goods_num: 1,
            goodsDetailsId: _this.goodsId,
            goods_id: _this.goodsId,
            group_id: null,
            group_type: null,
            serviceId: 0,
            serviceVal: 'string',
            goods_type:_this.categoryId
          }
        ]
        const addInfo = {
          id: time,
          createTime: time,
          updateTime: time,
          data: goodInfo
        }
        return new Promise(async (resolve, reject) => {
            try {
                let cart = JSON.parse(localStorage.getItem(CART) || '[]')
                cart = cart.concat(addInfo)
                if (cart.length > 30) {
                    return reject(new Error(lang.cartIsFull))
                }
                const dataId = []
                dataId.push(addInfo.id)
                // console.log("dddd",cart[0])
                const cartIds = dataId.join(',')
                this.$router.push({
                  path: `/billing-address`,
                  query: { cartIds }
                })
                // 本地加入购物车数据
                localStorage.setItem(CART, JSON.stringify(cart))
                return resolve()
            } catch (e) {
                return reject(e)
            }
        })
      }
    },
    getIndex(i) {
      this.magnifying = this.thumbnails[i]
    },
    // 领取优惠券
    getCoupon() {
      if(!this.$store.getters.hadLogin) {
        this.$errorMessage(this.$t(`${lang}.needLogin`))
      }else{
        this.showCoupon = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  .desc-top {
    .attr-group {
      width: 360px;

      .attr-list {
        .attr-item {
          width: 100%;
          height: 30px;
          display: flex;
          align-items: center;

          span:nth-of-type(1) {
            flex-grow: 0;
            flex-shrink: 0;
            width: 180px;
            min-width: 0;
            overflow: hidden;
          }

          span:nth-of-type(3) {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 0;
            overflow: hidden;
          }
        }
      }
    }
  }
  .sku2 {
  width: 720px;
  padding: 15px 25px;
  box-sizing: border-box;
  background: rgba(250, 250, 246, 1);
  display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;

  .left-properties {
    width: 230px;
  }
  .right-properties {
    width: 420px;
  }

  .left-properties,
  .right-properties {
    flex-grow: 0;
    flex-shrink: 0;

    .property-item {
      margin-bottom: 12px;
      display: flex;
      align-items: center;

      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }

      .item-name {
        width: 50px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .property {
        position: relative;
        width: 160px;
        height: 28px;
        margin-right: 10px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(187, 187, 187, 1);
        border-radius: 4px;
        box-sizing: border-box;

        .had-checked {
          width: 100%;
          height: 100%;
          padding: 5px 10px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          cursor: pointer;

          .color-icon {
            flex-grow: 0;
            flex-shrink: 0;
            min-width: 0;
            overflow: hidden;
            margin-right: 10px;
            font-size: 14px;
          }
          .name {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 0;
            overflow: hidden;
            margin-right: 10px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .drop-down-icon {
            flex-grow: 0;
            flex-shrink: 0;
            min-width: 0;
            overflow: hidden;

            font-size: 12px;
            color: #8b766c;
            font-weight: bold;
          }
        }

        .options {
          list-style: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 100%;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(187, 187, 187, 1);
          box-sizing: border-box;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s linear;
          z-index: 5;

          .item {
            width: 100%;
            height: 36px;
            padding: 5px 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: background-color 0.2s linear;

            &:hover {
              background-color: rgba(245, 243, 241, 1);
              color: #8b766c;
            }

            &.active {
              background-color: #cebeb0;
              color: #ffffff;
            }

            .color-icon {
              flex-grow: 0;
              flex-shrink: 0;
              min-width: 0;
              overflow: hidden;
              margin-right: 10px;
              font-size: 14px;
            }
            .name {
              flex-grow: 1;
              flex-shrink: 1;
              min-width: 0;
              overflow: hidden;
              margin-right: 10px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              white-space: nowrap;
            }
          }
        }

        &:hover {
          .options {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
  .one{
    display: flex;
  }
  // .two{
  //   display: flex;
  //   justify-content: flex-end;
  //   margin-top: 10px;
    .helper-popover {
      white-space: nowrap;

      .helper-name {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        margin: 0 6px 0 10px;
      }

      .prompt-icon {
        cursor: pointer;
        width: 16px;
        height: 16px;
        font-size: 14px;
        background: #debeab;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        display: inline-block;
        line-height: 14px;
        margin-left: -5px;
      }
    }
    .choose-size{
      text-decoration: underline;
      font-size: 12px;
      color: #aa8a7b;
      cursor: pointer;
      margin-left: 6px;
      line-height: 20px;
    }
  // }
}
}

.detail-page .desc-top .attr-group{
  width: 100%;
}
.detail-page .desc-top .attr-group:nth-of-type(3){
  margin-top: 20px;
}
.detail-page .desc-top .attr-group .group-name{
  margin: 6px 0 10px;
}
</style>
