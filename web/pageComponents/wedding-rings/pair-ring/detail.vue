<template>
  <div class="page-content detail-page">
    <top-nav></top-nav>
    <section class="detail">
      <!--      左侧-->
      <div class="left-detail">
        <product-images :images="thumbnails"></product-images>
      </div>
      <!--      右侧-->
      <div class="right-detail">
        <h2 class="product-name">
          {{ info.name }}
        </h2>
        <div class="product-code">{{ $t(`${lang}.goodsId`) }}:{{ info.goodsCode }}</div>
        <div class="sku" >
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
        </div>
        <!-- <div class="sku" v-if="firstRing.carats.length == 0||secondRing.carats.length == 0">
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
        </div>
        <div class="sku" v-else>
          <div class="left-properties">
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
          <div class="right-properties">
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
        <ul class="services-list">
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
        <div class="product-price">
          <span class="coin">
            {{ info.coinType }}
          </span>
          <span class="price">
            {{ formatNumber(info.salePrice) }}
          </span>
        </div>
        <div class="button-group">
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
    <ul class="tab">
      <li
        v-for="(item, index) in tabs"
        :key="index"
        :class="['item', { active: activeTab === item.key }]"
        @click="item.onClick"
      >
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <!--    商品详情-->
    <section ref="product-desc" class="desc-top">
      <div class="section-name">
        <h2>{{ $t(`${lang}.pairRingDetails`) }}</h2>
        <h3>{{ $t(`${lang}.goodsId`) }}：{{ info.ringCode }}</h3>
      </div>
      <div class="attr-group">
        <h3 class="group-name">{{ $t(`${lang}.ring01`) }}</h3>
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
      </div>
      <div class="attr-group">
        <h3 class="group-name">{{ $t(`${lang}.ring02`) }}</h3>
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
      </div>
    </section>
    <section class="desc" v-html="info.ringDesc"></section>
    <order-include></order-include>
    <comments ref="product-comments" :group-id="info.id"></comments>
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
        // caratIndex: 0
      },
      secondRingChecked: {
        materialIndex: 0,
        sizeIndex: 0,
        // caratIndex: 0
      },
      coupleLadyId:'',
      coupleMenId:'',
      firstRingId:'',
      secondRingId:'',
      goodsId:'',
      styleId:'',
      categoryId:'',
      stock:''
    }
  },
  computed: {
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
    recommends() {
      // console.log("info2",this.info)
      const _this = this
      const allData = JSON.parse(
        JSON.stringify(_this.info.ring || [])
      )
      console.log("info2",allData)
      allData.forEach(item => {
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
      // const carat =
      //   ring.carats.length > 0 && ring.carats[ringChecked.caratIndex]
      //     ? ring.carats[ringChecked.caratIndex].id
      //     : null

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
        if (item.material === material && item.size === size) {
          result = item
          break
        }
      }
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
      // const carat =
      //   ring.carats.length > 0 && ring.carats[ringChecked.caratIndex]
      //     ? ring.carats[ringChecked.caratIndex].id
      //     : null

      let result = null
      for (let n = 0, length = details.length; n < length; n++) {
        const item = details[n]
        if (item.material === material && item.size === size ) {
          result = item
          break
        }
      }
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
    }
  },
  watch: {
    info(val, oldVal) {
    }
  },
  mounted() {
    // console.log("info",this.info)
    const _this = this
    _this.$nextTick(() => {})
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
        _this.info
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
        // carats:(() =>{
        //     const carats = product.carats || []
        //     // carats.unshift({id:'',name: this.$t(`personal.index.select`)})
        //     return carats;
        // })(),
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
        return;
      }
      console.log("firstRing",firstRing,secondRing)
      _this.doubleRingDetailId(firstRing['id'], secondRing['id']);
    },
    doubleRingDetailId(ladyRing, menRing) {
      const _this = this
      this.info.details.map((item, i) => {
        if(ladyRing==item.ladyRing && menRing==item.menRing || menRing==item.ladyRing && ladyRing==item.menRing) {
          _this.coupleLadyId = item.ladyRing
          _this.coupleMenId = item.menRing
          _this.goodsId = item.id
          _this.styleId = item.goodsId
          _this.categoryId = item.categoryId
          _this.info.salePrice = item.retailMallPrice
          _this.stock = item.stock
          // console.log(item)
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
      if (!_this.canAddCart) {
        return
      }
      if (!_this.firstRingSimpleDetail || !_this.secondRingSimpleDetail) {
        _this.$errorMessage('请选择')
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
          _this.$successMessage(_this.$t(`common.addCartSuccess`))
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
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

          span:nth-of-type(2) {
            flex-grow: 1;
            flex-shrink: 1;
            min-width: 0;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
