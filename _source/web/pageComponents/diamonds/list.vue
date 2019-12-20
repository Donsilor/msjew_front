<template>
  <div class="page-content">
    <div class="search-condition">
      <!--      形状条件-->
      <div class="condition-item condition-shape">
        <h2 class="condition-name">
          <span>{{ $t(`${lang}.shape`) }}</span>
          <el-popover placement="right" trigger="hover">
            <shape-popover></shape-popover>
            <b slot="reference" class="prompt-icon">!</b>
          </el-popover>
        </h2>
        <ul class="options">
          <li
            v-for="(option, index) in shapeOptions"
            :key="index"
            :class="[
              'option-item',
              { active: option.id === searchConditions.shape }
            ]"
            @click="changeShape(option.id)"
          >
            <div class="item-icon">
              <img :src="option.icon" />
            </div>
            <div class="item-name">
              {{ option.name }}
            </div>
          </li>
        </ul>
      </div>
      <!--      价格区间选择-->
      <div class="condition-item range-slider condition-price">
        <h2 class="condition-name">
          <span>{{ $t(`${lang}.price`) }}</span>
        </h2>
        <div class="operate-area">
          <div class="range">
            <div class="range-input min-range">
              <span class="coin">{{ $store.state.coin }}</span>
              <div class="range-text">
                <span>{{ formatNumber(searchConditions.priceRange[0]) }}</span>
                <input
                  v-model="searchConditions.priceRange[0]"
                  :min="defaultPriceRange[0]"
                  :max="searchConditions.priceRange[1]"
                  @keydown.enter="
                    changeCondition('priceRange', searchConditions.priceRange)
                  "
                  @blur="
                    changeCondition('priceRange', searchConditions.priceRange)
                  "
                />
              </div>
            </div>
            <span class="to">{{ $t(`${lang}.to`) }}</span>
            <div class="range-input max-range">
              <span class="coin">{{ $store.state.coin }}</span>
              <div class="range-text">
                <span>{{ formatNumber(searchConditions.priceRange[1]) }}</span>
                <input
                  v-model="searchConditions.priceRange[1]"
                  :min="searchConditions.priceRange[0]"
                  :max="defaultPriceRange[1]"
                  @keydown.enter="
                    changeCondition('priceRange', searchConditions.priceRange)
                  "
                  @blur="
                    changeCondition('priceRange', searchConditions.priceRange)
                  "
                />
              </div>
            </div>
          </div>
          <div class="slider">
            <el-slider
              v-model="searchConditions.priceRange"
              :min="defaultPriceRange[0]"
              :max="defaultPriceRange[1]"
              range
              @change="
                changeCondition('priceRange', searchConditions.priceRange)
              "
            />
          </div>
          <div class="fast">
            <span
              v-for="(each, index) in fastPriceRanges"
              :key="index"
              class="fast-item"
              @click="changeCondition('priceRange', each)"
            >
              {{ formatMoney(each[0], 0) + '-' + formatMoney(each[1], 0) }}
            </span>
          </div>
        </div>
      </div>
      <!--      克拉区间选择-->
      <div class="condition-item range-slider condition-carat">
        <h2 class="condition-name">
          <span>{{ $t(`${lang}.carat`) }}</span>
          <el-popover placement="left" trigger="hover">
            <carat-popover></carat-popover>
            <b slot="reference" class="prompt-icon">!</b>
          </el-popover>
        </h2>
        <div class="operate-area">
          <div class="range">
            <div class="range-input min-range">
              <div class="range-text">
                <span>{{ formatNumber(searchConditions.caratRange[0]) }}</span>
                <input
                  v-model="searchConditions.caratRange[0]"
                  :min="defaultCaratRange[0]"
                  :max="searchConditions.caratRange[1]"
                  @keydown.enter="
                    changeCondition('caratRange', searchConditions.caratRange)
                  "
                  @blur="
                    changeCondition('caratRange', searchConditions.caratRange)
                  "
                />
              </div>
            </div>
            <span class="to">{{ $t(`${lang}.to`) }}</span>
            <div class="range-input max-range">
              <div class="range-text">
                <span>{{ formatNumber(searchConditions.caratRange[1]) }}</span>
                <input
                  v-model="searchConditions.caratRange[1]"
                  :min="searchConditions.caratRange[0]"
                  :max="defaultCaratRange[1]"
                  @keydown.enter="
                    changeCondition('caratRange', searchConditions.caratRange)
                  "
                  @blur="
                    changeCondition('caratRange', searchConditions.caratRange)
                  "
                />
              </div>
            </div>
          </div>
          <div class="slider">
            <el-slider
              v-model="searchConditions.caratRange"
              :step="0.01"
              :min="defaultCaratRange[0]"
              :max="defaultCaratRange[1]"
              range
              @change="
                changeCondition('caratRange', searchConditions.caratRange)
              "
            />
          </div>
          <div class="fast">
            <span
              v-for="(each, index) in fastCaratRanges"
              :key="index"
              class="fast-item"
              @click="changeCondition('caratRange', each)"
            >
              {{ each[0] + '-' + each[1] }}
              <!--              {{ formatMoney(each[0], 0) + '-' + formatMoney(each[1], 0) }}-->
            </span>
          </div>
        </div>
      </div>
      <!--      切割选择-->
      <div class="condition-item range-slider condition-cut">
        <h2 class="condition-name">
          <span>{{ $t(`${lang}.cut`) }}</span>
          <el-popover placement="right" trigger="hover">
            <cut-popover></cut-popover>
            <b slot="reference" class="prompt-icon">!</b>
          </el-popover>
        </h2>
        <div class="operate-area">
          <div class="range-options">
            <span
              v-for="(item, index) in cutOptions"
              :key="index"
              class="range-options-item"
            >
              {{ item.name }}
            </span>
          </div>
          <div class="slider">
            <el-slider
              v-model="searchConditions.cutRange"
              :step="1"
              :min="0"
              :max="cutOptions.length"
              :show-stops="true"
              :show-tooltip="false"
              range
              @change="changeCondition('cutRange', searchConditions.cutRange)"
            />
          </div>
        </div>
      </div>
      <!--      颜色选择-->
      <div class="condition-item range-slider condition-color">
        <h2 class="condition-name">
          <span>{{ $t(`${lang}.color`) }}</span>
          <el-popover placement="right" trigger="hover">
            <color-popover></color-popover>
            <b slot="reference" class="prompt-icon">!</b>
          </el-popover>
        </h2>
        <div class="operate-area">
          <div class="range-options">
            <span
              v-for="(item, index) in colorOptions"
              :key="index"
              class="range-options-item"
            >
              {{ item.name }}
            </span>
          </div>
          <div class="slider">
            <el-slider
              v-model="searchConditions.colorRange"
              :step="1"
              :min="0"
              :max="colorOptions.length"
              :show-stops="true"
              :show-tooltip="false"
              range
              @change="
                changeCondition('colorRange', searchConditions.colorRange)
              "
            />
          </div>
        </div>
      </div>
      <!--      净度选择-->
      <div class="condition-item range-slider condition-clarity">
        <h2 class="condition-name">
          <span>{{ $t(`${lang}.clarity`) }}</span>
          <el-popover placement="right" trigger="hover">
            <clarity-popover></clarity-popover>
            <b slot="reference" class="prompt-icon">!</b>
          </el-popover>
        </h2>
        <div class="operate-area">
          <div class="range-options">
            <span
              v-for="(item, index) in clarityOptions"
              :key="index"
              class="range-options-item"
            >
              {{ item.name }}
            </span>
          </div>
          <div class="slider">
            <el-slider
              v-model="searchConditions.clarityRange"
              :step="1"
              :min="0"
              :max="clarityOptions.length"
              :show-stops="true"
              :show-tooltip="false"
              range
              @change="
                changeCondition('clarityRange', searchConditions.clarityRange)
              "
            />
          </div>
        </div>
      </div>
      <!--      更多筛选条件-->
      <div class="more-condition">
        <h2 class="condition-name" @click="changeMoreConditionState">
          <span>{{ $t(`${lang}.moreFilters`) }}</span>
          <i class="iconfont iconkuozhan"></i>
        </h2>
        <ul :class="['condition-options', { active: showMoreCondition }]">
          <!--          光泽-->
          <li :class="['option']">
            <span class="option-name">{{ $t(`${lang}.polish`) }}</span>
            <div class="operate-area">
              <div class="range-options">
                <span
                  v-for="(item, index) in polishOptions"
                  :key="index"
                  class="range-options-item"
                >
                  {{ item.name }}
                </span>
              </div>
              <div class="slider">
                <el-slider
                  v-model="searchConditions.polishRange"
                  :step="1"
                  :min="0"
                  :max="polishOptions.length"
                  :show-stops="true"
                  :show-tooltip="false"
                  range
                  @change="
                    changeCondition('polishRange', searchConditions.polishRange)
                  "
                />
              </div>
            </div>
          </li>
          <!--          对称-->
          <li :class="['option']">
            <span class="option-name">{{ $t(`${lang}.symmetry`) }}</span>
            <div class="operate-area">
              <div class="range-options">
                <span
                  v-for="(item, index) in symmetryOptions"
                  :key="index"
                  class="range-options-item"
                >
                  {{ item.name }}
                </span>
              </div>
              <div class="slider">
                <el-slider
                  v-model="searchConditions.symmetryRange"
                  :step="1"
                  :min="0"
                  :max="symmetryOptions.length"
                  :show-stops="true"
                  :show-tooltip="false"
                  range
                  @change="
                    changeCondition(
                      'symmetryRange',
                      searchConditions.symmetryRange
                    )
                  "
                />
              </div>
            </div>
          </li>
          <!--          证书-->
          <li :class="['option']">
            <span class="option-name">{{ $t(`${lang}.certificate`) }}</span>
            <div class="operate-area">
              <div class="range-options">
                <span
                  v-for="(item, index) in cardOptions"
                  :key="index"
                  class="range-options-item"
                >
                  {{ item.name }}
                </span>
              </div>
              <div class="slider">
                <el-slider
                  v-model="searchConditions.cardRange"
                  :step="1"
                  :min="0"
                  :max="cardOptions.length"
                  :show-stops="true"
                  :show-tooltip="false"
                  range
                  @change="
                    changeCondition('cardRange', searchConditions.cardRange)
                  "
                />
              </div>
            </div>
          </li>
          <!--          深度-->
          <li :class="['option']">
            <span class="option-name">{{ $t(`${lang}.depth`) }}</span>
            <div class="operate-area">
              <div class="slider">
                <el-slider
                  v-model="searchConditions.depthRange"
                  :min="defaultDepthRange[0]"
                  :max="defaultDepthRange[1]"
                  range
                  @change="
                    changeCondition('depthRange', searchConditions.depthRange)
                  "
                />
              </div>
              <div class="range">
                <div class="range-input min-range">
                  <div class="range-text">
                    <span>{{ searchConditions.depthRange[0] }}%</span>
                    <input
                      v-model="searchConditions.depthRange[0]"
                      :min="defaultDepthRange[0]"
                      :max="searchConditions.depthRange[1]"
                      @keydown.enter="
                        changeCondition(
                          'depthRange',
                          searchConditions.depthRange
                        )
                      "
                      @blur="
                        changeCondition(
                          'depthRange',
                          searchConditions.depthRange
                        )
                      "
                    />
                  </div>
                </div>
                <span class="to">{{ $t(`${lang}.to`) }}</span>
                <div class="range-input max-range">
                  <div class="range-text">
                    <span>{{ searchConditions.depthRange[1] }}%</span>
                    <input
                      v-model="searchConditions.depthRange[1]"
                      :min="searchConditions.depthRange[0]"
                      :max="defaultDepthRange[1]"
                      @keydown.enter="
                        changeCondition(
                          'depthRange',
                          searchConditions.depthRange
                        )
                      "
                      @blur="
                        changeCondition(
                          'depthRange',
                          searchConditions.depthRange
                        )
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!--          石面-->
          <li :class="['option']">
            <span class="option-name">{{ $t(`${lang}.facing`) }}</span>
            <div class="operate-area">
              <div class="slider">
                <el-slider
                  v-model="searchConditions.tableRange"
                  :min="defaultTableRange[0]"
                  :max="defaultTableRange[1]"
                  range
                  @change="
                    changeCondition('tableRange', searchConditions.tableRange)
                  "
                />
              </div>
              <div class="range">
                <div class="range-input min-range">
                  <div class="range-text">
                    <span>{{ searchConditions.tableRange[0] }}%</span>
                    <input
                      v-model="searchConditions.tableRange[0]"
                      :min="defaultTableRange[0]"
                      :max="searchConditions.tableRange[1]"
                      @keydown.enter="
                        changeCondition(
                          'tableRange',
                          searchConditions.tableRange
                        )
                      "
                      @blur="
                        changeCondition(
                          'tableRange',
                          searchConditions.tableRange
                        )
                      "
                    />
                  </div>
                </div>
                <span class="to">{{ $t(`${lang}.to`) }}</span>
                <div class="range-input max-range">
                  <div class="range-text">
                    <span>{{ searchConditions.tableRange[1] }}%</span>
                    <input
                      v-model="searchConditions.tableRange[1]"
                      :min="searchConditions.tableRange[0]"
                      :max="defaultTableRange[1]"
                      @keydown.enter="
                        changeCondition(
                          'tableRange',
                          searchConditions.tableRange
                        )
                      "
                      @blur="
                        changeCondition(
                          'depthRange',
                          searchConditions.tableRange
                        )
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!--          荧光-->
          <li :class="['option']">
            <span class="option-name">{{ $t(`${lang}.fluorescence`) }}</span>
            <div class="operate-area">
              <div class="range-options">
                <span
                  v-for="(item, index) in fluorescenceOptions"
                  :key="index"
                  class="range-options-item"
                >
                  {{ item.name }}
                </span>
              </div>
              <div class="slider">
                <el-slider
                  v-model="searchConditions.fluorescenceRange"
                  :step="1"
                  :min="0"
                  :max="fluorescenceOptions.length"
                  :show-stops="true"
                  :show-tooltip="false"
                  range
                  @change="
                    changeCondition(
                      'fluorescenceRange',
                      searchConditions.fluorescenceRange
                    )
                  "
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <section class="list-title">
      <h1 class="title">
        {{ $t(`${lang}.totalCountTitle`, { totalCount }) }}
        <!--        {{-->
        <!--          totalCount-->
        <!--            ? $t(`${lang}.totalCountTitle`, { totalCount })-->
        <!--            : $t(`${lang}.title`)-->
        <!--        }}-->
      </h1>
      <h3 class="sub-title">{{ activeShapeInfo.desc }}</h3>
    </section>
    <!--    tab切换-->
    <ul class="tab">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-item', { active: activeTab === tab.key }]"
        @click="changeActiveTab(tab.key)"
      >
        <span class="item-name">{{ tab.name }}</span>
      </li>
    </ul>
    <div v-show="activeTab === 'allDiamonds'" class="diamond-tab-content">
      <ul class="list-types">
        <li
          v-for="(type, index) in listTypes"
          :key="index"
          :class="['item', { active: activeListType === type.key }]"
          @click="changeActiveListType(type.key)"
        >
          <span class="type-name">{{ type.name }}</span>
          <i :class="['iconfont', type.icon]"></i>
        </li>
      </ul>
      <section v-show="activeListType === 'visual'" class="list-content visual">
        <ul class="sort-type">
          <li
            v-for="(type, index) in sortOptions"
            :key="index"
            :class="['item', { active: sortTypeIndex === index }]"
            @click="changeSort(index)"
          >
            <span class="type-name">{{ type.name }}</span>
            <img
              :src="
                sortTypeIndex === index
                  ? sortTypeOptions[sortType].image
                  : sortTypeOptions.default.image
              "
            />
          </li>
        </ul>
        <div class="list-data visual-data">
          <div
            v-for="(item, index) in showingData"
            :key="index"
            :class="['data-item', item.itemType]"
          >
            <!--          商品数据-->
            <div v-if="item.itemType === 'product'" class="product-content">
              <nuxt-link :to="item.to">
                <div class="product-image">
                  <img class="main-image" :src="item.goodsImages[0]" />
                  <img class="sub-image" :src="item.goodsImages[0]" />
                  <div class="properties">
                    <i class="iconfont iconliebiao-gengduo1"></i>
                    <ul class="property-list">
                      <li
                        v-for="(property, propertyIndex) in item.properties"
                        :key="propertyIndex"
                        class="row-flex align-item-center item"
                      >
                        <span class="item-name fixed-flex-item">
                          {{ property.name }}:
                        </span>
                        <span class="item-value elastic-flex-item">
                          {{ property.value }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </nuxt-link>
              <div class="product-info">
                <div class="product-title">
                  {{ item.goodsName }}
                </div>
                <div class="row-flex align-item-center">
                  <div class="left-item elastic-flex-item">
                    <div class="product-price">
                      <span class="coin">{{ item.coinType }}</span>
                      <span class="price">{{
                        formatNumber(item.salePrice)
                      }}</span>
                    </div>
                    <div class="card-info">
                      <span class="type">{{ item.specsModels.card }}</span>
                      <span class="number">{{ item.specsModels.cardNo }}</span>
                    </div>
                  </div>
                  <div
                    class="right-item fixed-flex-item row-flex align-item-center"
                  >
                    <div class="compared-state">
                      <i
                        :class="[
                          'iconfont',
                          'iconliebiao-duibi',
                          { active: inCompared(item.id) }
                        ]"
                        @click="setCompared(item.id)"
                      ></i>
                    </div>
                    <div class="wish-state">
                      <i
                        v-if="inWish(item.id)"
                        class="iconfont iconxin active"
                        @click.stop.prevent="setWish(item.id)"
                      ></i>
                      <i
                        v-else
                        class="iconfont iconkongxin"
                        @click.stop.prevent="setWish(item.id)"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--          广告数据-->
            <div v-else class="ad-content">
              <el-carousel height="480px">
                <el-carousel-item
                  v-for="(ad, adIndex) in item.advertImgModelList"
                  :key="adIndex"
                >
                  <div class="ad-image">
                    <img :src="ad.image[0]" />
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </section>
      <section v-show="activeListType === 'list'" class="list-content list">
        <ul class="list-data-item list-header">
          <li class="item">
            <span>{{ $t(`${lang}.thumbnail`) }}</span>
          </li>
          <li class="item">
            <span>{{ $t(`${lang}.shape`) }}</span>
          </li>
          <li
            v-for="(sortTypeItem, index) in listSortOptions"
            :key="index"
            :class="[
              'item',
              'order-item',
              { active: sortTypeIndex === sortTypeItem.index }
            ]"
            @click="changeSort(sortTypeItem.index)"
          >
            <span>{{ sortTypeItem.name }}</span>
            <img
              :src="
                sortTypeIndex === sortTypeItem.index
                  ? sortTypeOptions[sortType].image
                  : sortTypeOptions.default.image
              "
            />
          </li>
          <li class="item">
            <span>{{ $t(`${lang}.addWish`) }}</span>
          </li>
          <li class="item">
            <span>{{ $t(`${lang}.compare`) }}</span>
          </li>
          <li class="item">
            <span>{{ $t(`${lang}.viewDetail`) }}</span>
          </li>
        </ul>
        <ul
          v-for="(data, index) in listShowingData"
          :key="index"
          class="list-data-item"
        >
          <li class="item">
            <img class="thumbnail" :src="data.goodsImages[0]" />
          </li>
          <li
            v-for="(property, propertyIndex) in data.listProperties"
            :key="propertyIndex"
            class="item"
          >
            <span>{{ property.value }}</span>
          </li>
          <li class="item">
            <div class="wish-state">
              <i
                v-if="inWish(data.id)"
                class="iconfont iconxin active"
                @click.stop.prevent="setWish(data.id)"
              ></i>
              <i
                v-else
                class="iconfont iconkongxin"
                @click.stop.prevent="setWish(data.id)"
              ></i>
            </div>
          </li>
          <li class="item">
            <div class="compared-state">
              <i
                :class="[
                  'iconfont',
                  'iconliebiao-duibi',
                  { active: inCompared(data.id) }
                ]"
                @click="setCompared(data.id)"
              ></i>
            </div>
          </li>
          <li class="item">
            <nuxt-link :to="data.to">
              <button class="detail-button">
                {{ $t(`${lang}.clickToCheck`) }}
              </button>
            </nuxt-link>
          </li>
        </ul>
      </section>
      <div v-show="showNextPageButton" class="more-list-data">
        <button
          v-loading="requestingListData"
          class="check-more"
          @click="getNextPage"
        >
          {{ $t('common.getMore') }}
        </button>
      </div>
      <no-more-data v-show="noMoreListData"></no-more-data>
      <bdd-empty v-show="noListData" type="product"></bdd-empty>
    </div>
    <div v-show="activeTab === 'compare'" class="compare-tab-content">
      <section class="compare-data">
        <div
          v-for="(compare, index) in compareData"
          :key="index"
          class="data-item"
        >
          <div class="product">
            <div class="delete-compare" @click="removeCompared(compare.goodId)">
              <i class="iconfont iconguanbi"></i>
            </div>
            <nuxt-link :to="compare.to">
              <div class="product-image">
                <img class="main-image" :src="compare.goodsImages[0]" />
              </div>
            </nuxt-link>
            <div class="product-info">
              <div class="product-title">
                {{ compare.goodsName }}
              </div>
              <div class="product-price">
                <span class="coin">{{ compare.coinType }}</span>
                <span class="price">
                  {{ formatNumber(compare.salePrice) }}
                </span>
                <button class="add-cart" @click="addCart(compare)">
                  {{ $t(`${lang}.addCart`) }}
                </button>
              </div>
              <ul class="properties">
                <li
                  v-for="(property, propertyIndex) in compare.properties"
                  :key="propertyIndex"
                  class="item"
                >
                  <span class="name">{{ property.name }}:</span>
                  <span class="value">{{ property.value }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <bdd-empty v-show="compareData.length === 0" type="compare"></bdd-empty>
    </div>
  </div>
</template>

<script>
import List from '@/mixins/list.js'
import ListPage from '@/mixins/list-page.js'
import Operate from '@/mixins/operate.js'
import ShapePopover from '@/components/diamond-popovers/shape.vue'
import CaratPopover from '@/components/diamond-popovers/carat.vue'
import CutPopover from '@/components/diamond-popovers/cut.vue'
import ColorPopover from '@/components/diamond-popovers/color.vue'
import ClarityPopover from '@/components/diamond-popovers/clarity.vue'
const defaultPriceRange = [0, 10000000]
const defaultCaratRange = [0.1, 10]
const defaultDepthRange = [0, 100]
const defaultTableRange = [0, 100]
const lang = 'diamondsList'
export default {
  components: {
    ShapePopover,
    CaratPopover,
    CutPopover,
    ColorPopover,
    ClarityPopover
  },
  mixins: [List, ListPage, Operate],
  data() {
    return {
      lang,
      listUrl: '/web/goods/searchGoods',
      pageSize: 14,
      showMoreCondition: false,

      shapeOptions: this.CONDITION_INFO.shape,
      defaultPriceRange,
      fastPriceRanges: [[1200, 15000], [15000, 30000], [30000, 50000]],
      defaultCaratRange,
      fastCaratRanges: [['0.25', '0.70'], ['0.75', '1.02'], ['1.5', '3.00']],
      cutOptions: this.CONDITION_INFO.cut,
      colorOptions: this.CONDITION_INFO.color,
      clarityOptions: this.CONDITION_INFO.clarity,

      polishOptions: this.CONDITION_INFO.diamond.polish,
      symmetryOptions: this.CONDITION_INFO.diamond.symmetry,
      cardOptions: this.CONDITION_INFO.diamond.card,
      defaultDepthRange,
      defaultTableRange,
      fluorescenceOptions: this.CONDITION_INFO.diamond.fluorescence,

      searchConditions: {
        shape: '',
        priceRange: JSON.parse(JSON.stringify(defaultPriceRange)),
        caratRange: JSON.parse(JSON.stringify(defaultCaratRange)),
        cutRange: [0, this.CONDITION_INFO.cut.length],
        colorRange: [0, this.CONDITION_INFO.color.length],
        clarityRange: [0, this.CONDITION_INFO.clarity.length],

        polishRange: [0, this.CONDITION_INFO.diamond.polish.length],
        symmetryRange: [0, this.CONDITION_INFO.diamond.symmetry.length],
        cardRange: [0, this.CONDITION_INFO.diamond.card.length],
        depthRange: JSON.parse(JSON.stringify(defaultDepthRange)),
        tableRange: JSON.parse(JSON.stringify(defaultTableRange)),
        fluorescenceRange: [0, this.CONDITION_INFO.diamond.fluorescence.length]
      },

      activeTab: 'allDiamonds',

      listTypes: [
        {
          key: 'list',
          name: this.$t(`${lang}.list`),
          icon: 'iconshijue-liebiao'
        },
        {
          key: 'visual',
          name: this.$t(`${lang}.visual`),
          icon: 'iconshijue-shitu'
        }
      ],
      activeListType: 'visual',

      sortOptions: [
        {
          key: 'sale_price',
          name: this.$t(`${lang}.price`)
        },
        {
          key: 'carat',
          name: this.$t(`${lang}.carat`)
        },
        {
          key: 'clarity',
          name: this.$t(`${lang}.clarity`)
        },
        {
          key: 'cut',
          name: this.$t(`${lang}.cut`)
        },
        {
          key: 'color',
          name: this.$t(`${lang}.color`)
        }
      ],
      sortTypeOptions: {
        default: {
          key: '',
          image: '/diamonds/sort.png'
        },
        down: {
          key: 2,
          image: '/diamonds/sort-down.png'
        },
        up: {
          key: 1,
          image: '/diamonds/sort-up.png'
        }
      },
      sortType: 'default'
    }
  },
  computed: {
    activeShapeInfo() {
      let result = ''
      const id = this.searchConditions.shape
      const shapeOptions = this.shapeOptions
      if (id === '') {
        return result
      }

      for (let n = 0, length = shapeOptions.length; n < length; n++) {
        if (shapeOptions[n].id === id) {
          result = shapeOptions[n]
          break
        }
      }
      return result
    },
    tabs() {
      return [
        {
          key: 'allDiamonds',
          name: this.totalCount
            ? `${this.$t(`${lang}.allDiamonds`)}(${this.totalCount})`
            : `${this.$t(`${lang}.allDiamonds`)}`
        },
        {
          key: 'compare',
          name:
            this.$store.state.comparedAmount !== null
              ? `${this.$t(`${lang}.compare`)}(${
                  this.$store.state.comparedAmount
                })`
              : `${this.$t(`${lang}.compare`)}`
        }
      ]
    },
    // 列表显示方式的排序类型数组
    listSortOptions() {
      const result = []
      const sortOptions = this.sortOptions
      const orderRule = ['carat', 'color', 'clarity', 'cut', 'sale_price']
      orderRule.forEach(key => {
        for (let n = 0, length = sortOptions.length; n < length; n++) {
          if (sortOptions[n].key === key) {
            result.push(
              Object.assign(
                {
                  index: n
                },
                sortOptions[n]
              )
            )
            break
          }
        }
      })
      return result
    },
    usingSortInfo() {
      const sortOptions = JSON.parse(JSON.stringify(this.sortOptions))
      const index = this.sortTypeIndex
      const result = sortOptions[index]
        ? {
            content: sortOptions[index].name,
            sortType: this.sortTypeOptions[this.sortType].key,
            sortBy: sortOptions[index].key
          }
        : {
            content: '',
            sortType: '',
            sortBy: ''
          }
      result.index = index
      return result
    },
    // 列表特定body参数
    specialDatas() {
      const _this = this
      const conditions = this.searchConditions
      console.log(conditions)
      const sortInfo = this.usingSortInfo
      const params = [
        // 形状
        {
          type: 2,
          paramName: 'shape',
          valueType: 1,
          configValues: conditions.shape === '' ? [] : [conditions.shape]
        },
        // 价格区间
        {
          type: 1,
          paramName: 'sale_price',
          valueType: 2,
          beginValue: conditions.priceRange[0],
          endValue: conditions.priceRange[1]
        },
        // 克拉区间
        {
          type: 2,
          paramName: 'carat',
          valueType: 2,
          beginValue: conditions.caratRange[0],
          endValue: conditions.caratRange[1]
        },
        // 切割区间
        {
          type: 2,
          paramName: 'cut',
          valueType: 1,
          configValues: (() => {
            const result = []
            const cutOptions = _this.cutOptions
            const cutRange = conditions.cutRange
            if (cutRange[0] === 0 && cutRange[1] === cutOptions.length) {
              return result
            }
            for (let n = cutRange[0]; n < cutRange[1]; n++) {
              result.push(cutOptions[n].id)
            }
            return result
          })()
        },
        // 颜色区间
        {
          type: 2,
          paramName: 'color',
          valueType: 1,
          configValues: (() => {
            const result = []
            const colorOptions = _this.colorOptions
            const colorRange = conditions.colorRange
            if (colorRange[0] === 0 && colorRange[1] === colorOptions.length) {
              return result
            }
            for (let n = colorRange[0]; n < colorRange[1]; n++) {
              result.push(colorOptions[n].id)
            }
            return result
          })()
        },
        // 淨度区间
        {
          type: 2,
          paramName: 'clarity',
          valueType: 1,
          configValues: (() => {
            const result = []
            const clarityOptions = _this.clarityOptions
            const clarityRange = conditions.clarityRange
            if (
              clarityRange[0] === 0 &&
              clarityRange[1] === clarityOptions.length
            ) {
              return result
            }
            for (let n = clarityRange[0]; n < clarityRange[1]; n++) {
              result.push(clarityOptions[n].id)
            }
            return result
          })()
        },
        // 光澤区间
        {
          type: 2,
          paramName: 'polish',
          valueType: 1,
          configValues: (() => {
            const result = []
            const polishOptions = _this.polishOptions
            const polishRange = conditions.polishRange
            if (
              polishRange[0] === 0 &&
              polishRange[1] === polishOptions.length
            ) {
              return result
            }
            for (let n = polishRange[0]; n < polishRange[1]; n++) {
              result.push(polishOptions[n].id)
            }
            return result
          })()
        },
        // 對稱区间
        {
          type: 2,
          paramName: 'symmetry',
          valueType: 1,
          configValues: (() => {
            const result = []
            const symmetryOptions = _this.symmetryOptions
            const symmetryRange = conditions.symmetryRange
            if (
              symmetryRange[0] === 0 &&
              symmetryRange[1] === symmetryOptions.length
            ) {
              return result
            }
            for (let n = symmetryRange[0]; n < symmetryRange[1]; n++) {
              result.push(symmetryOptions[n].id)
            }
            return result
          })()
        },
        // 证书区间
        {
          type: 2,
          paramName: 'card',
          valueType: 1,
          configValues: (() => {
            const result = []
            const cardOptions = _this.cardOptions
            const cardRange = conditions.cardRange
            if (cardRange[0] === 0 && cardRange[1] === cardOptions.length) {
              return result
            }
            for (let n = cardRange[0]; n < cardRange[1]; n++) {
              result.push(cardOptions[n].id)
            }
            return result
          })()
        },
        // 深度区间
        {
          type: 2,
          paramName: 'depth',
          valueType: 2,
          beginValue: conditions.depthRange[0],
          endValue: conditions.depthRange[1]
        },
        // 石面区间
        {
          type: 2,
          paramName: 'table',
          valueType: 2,
          beginValue: conditions.tableRange[0],
          endValue: conditions.tableRange[1]
        },
        // 熒光区间
        {
          type: 2,
          paramName: 'fluorescence',
          valueType: 1,
          configValues: (() => {
            const result = []
            const fluorescenceOptions = _this.fluorescenceOptions
            const fluorescenceRange = conditions.fluorescenceRange
            if (
              fluorescenceRange[0] === 0 &&
              fluorescenceRange[1] === fluorescenceOptions.length
            ) {
              return result
            }
            for (let n = fluorescenceRange[0]; n < fluorescenceRange[1]; n++) {
              result.push(fluorescenceOptions[n].id)
            }
            return result
          })()
        }
      ]

      const dealParams = []
      params.forEach(item => {
        if (item.configValues) {
          if (item.configValues.length > 0) {
            dealParams.push(item)
          }
        } else {
          dealParams.push(item)
        }
      })

      const data = {
        // 商品类别ID
        categoryId: 1,
        // 排序字段名
        orderParam: sortInfo.sortBy,
        // 排序类型（1:升 2:降）
        orderType: sortInfo.sortType,
        // 每页显示数量
        pageSize: this.pageSize,
        // 参数数组
        params: dealParams
      }

      // 已选商品id
      if (this.$route.query.selectGoodsId) {
        data.selectGoodsId = this.$route.query.selectGoodsId
      }
      return data
    },
    // 处理用于显示的数据
    showingData() {
      const _this = this
      const allData = JSON.parse(JSON.stringify(_this.allData))
      allData.forEach(item => {
        if (item.hasOwnProperty('dsName')) {
          // 广告
          item.itemType = 'ad-short'
          if (
            item.advertImgModelList &&
            Array.isArray(item.advertImgModelList)
          ) {
            item.advertImgModelList.forEach(ad => {
              ad.image = _this.imageStrToArray(ad.image || '')
            })
          } else {
            item.advertImgModelList = [
              {
                addres: '',
                id: item.id,
                image: _this.imageStrToArray(item.dsImg || ''),
                tbAdvertId: ''
              }
            ]
          }
        } else {
          const specsModels = item.specsModels || {}
          item.itemType = 'product'
          item.goodsImages = _this.imageStrToArray(item.goodsImages || '')
          item.properties = [
            {
              name: 'SKU',
              value: specsModels.SKU || ''
            },
            {
              name: this.$t(`${lang}.shape`),
              value: specsModels.shape || ''
            },
            {
              name: this.$t(`${lang}.carat`),
              value: specsModels.carat || ''
            },
            {
              name: this.$t(`${lang}.color`),
              value: specsModels.color || ''
            },
            {
              name: this.$t(`${lang}.clarity`),
              value: specsModels.clarity || ''
            },
            {
              name: this.$t(`${lang}.cut`),
              value: specsModels.cut || ''
            },
            {
              name: this.$t(`${lang}.polish`),
              value: specsModels.polish || ''
            },
            {
              name: this.$t(`${lang}.symmetry`),
              value: specsModels.symmetry || ''
            },
            {
              name: this.$t(`${lang}.fluorescence`),
              value: specsModels.fluorescence || ''
            },
            {
              name: this.$t(`${lang}.certificate`),
              value: specsModels.card || ''
            }
          ]
          item.listProperties = [
            {
              name: this.$t(`${lang}.shape`),
              value: specsModels.shape || ''
            },
            {
              name: this.$t(`${lang}.carat`),
              value: specsModels.carat || ''
            },
            {
              name: this.$t(`${lang}.color`),
              value: specsModels.color || ''
            },
            {
              name: this.$t(`${lang}.clarity`),
              value: specsModels.clarity || ''
            },
            {
              name: this.$t(`${lang}.cut`),
              value: specsModels.cut || ''
            },
            {
              name: this.$t(`${lang}.price`),
              value: item.salePrice || '--'
            }
          ]
          if (this.$route.query.step) {
            item.to = {
              path:
                '/build-your-own-ring/diamond-details/' +
                item.goodsName.replace(/\//g, ''),
              query: {
                step: this.$route.query.step,
                steps: this.$route.query.steps,
                goodId: item.id
              }
            }
          } else {
            item.to = {
              path: '/diamond-details/' + item.goodsName.replace(/\//g, ''),
              query: {
                goodId: item.id
              }
            }
          }
        }
      })
      return allData
    },
    listShowingData() {
      const showingData = this.showingData
      const result = []
      showingData.forEach(item => {
        if (item.itemType === 'product') {
          result.push(item)
        }
      })
      return result
    },
    compareData() {
      const _this = this
      const lang = _this.lang
      const compares =
        JSON.parse(JSON.stringify(_this.$store.state.compared)) || []
      console.log('compares===>', compares)
      const propertyMap = [
        {
          id: 191,
          name: 'GIA'
        },
        {
          id: 31,
          name: _this.$t(`${lang}.carat`)
        },
        {
          id: 34,
          name: _this.$t(`${lang}.color`)
        },
        {
          id: 35,
          name: _this.$t(`${lang}.clarity`)
        },
        {
          id: 33,
          name: _this.$t(`${lang}.cut`)
        },
        {
          id: 40,
          name: _this.$t(`${lang}.table`)
        },
        {
          id: 39,
          name: _this.$t(`${lang}.depth`)
        },
        {
          id: 32,
          name: _this.$t(`${lang}.shape`)
        },
        {
          id: 38,
          name: _this.$t(`${lang}.fluorescence`)
        }
      ]
      compares.forEach(item => {
        if (item.simpleGoodsEntity) {
          item = Object.assign(item, item.simpleGoodsEntity)
          delete item.simpleGoodsEntity
        }
        item.id = item.goodId
        item.goodsGiaImage = _this.imageStrToArray(item.goodsGiaImage || '')
        item.goodsImages = _this.imageStrToArray(item.goodsImages || '')
        item.properties = []
        const baseConfig = item.baseConfig || []
        propertyMap.forEach(map => {
          for (let n = 0, length = baseConfig.length; n < length; n++) {
            if (baseConfig[n].configId === map.id) {
              item.properties.push(
                Object.assign(
                  {
                    value: baseConfig[n].configAttrIVal
                  },
                  map
                )
              )
              break
            }
          }
        })
        item.to = {
          path: '/diamond-details/' + item.goodsName.replace(/\//g, ''),
          query: {
            goodId: item.id
          }
        }
      })
      return compares
    }
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.research()
    })
  },
  methods: {
    // 显示与隐藏更多条件
    changeMoreConditionState() {
      this.showMoreCondition = !this.showMoreCondition
    },
    // 改变tab
    changeActiveTab(key) {
      this.activeTab = key
    },
    // 改变列表显示方式
    changeActiveListType(key) {
      this.activeListType = key
    },
    // 改变形状条件
    changeShape(value) {
      const searchConditions = this.searchConditions
      if (searchConditions.shape === value) {
        this.changeCondition('shape', '')
      } else {
        this.changeCondition('shape', value)
      }
    },
    // 改变排序方式，重新搜索
    changeSort(index) {
      if (this.sortTypeIndex === index) {
        switch (this.sortType) {
          case 'down':
            this.sortType = 'up'
            break
          case 'up':
            this.sortTypeIndex = ''
            this.sortType = 'default'
        }
      } else {
        this.sortTypeIndex = index
        this.sortType = 'down'
      }
      this.research()
    },
    changeCondition(key, value) {
      const searchConditions = JSON.parse(JSON.stringify(this.searchConditions))
      searchConditions[key] = value
      this.searchConditions = searchConditions
      this.research()
    },
    addCart(productInfo) {
      const _this = this
      const goodInfo = {
        goodsCount: 1,
        goodsDetailsId: '88888888',
        goodsId: productInfo.goodsId,
        groupId: null,
        groupType: null,
        serviceId: 0,
        serviceVal: 'string'
      }
      _this.$store
        .dispatch(`addCart`, goodInfo)
        .then(data => {
          _this.$successMessage('ok')
        })
        .catch(err => {
          _this.$errorMessage(`${err.message}`)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.page-content {
  min-width: 1360px;
  max-width: 1366px;
  margin: 0 auto;
  padding: 40px 0;
}
.search-condition {
  .condition-item {
    width: 400px;
    margin-bottom: 40px;
  }

  .condition-shape {
    .options {
      list-style: none;
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .option-item {
        flex-grow: 1;
        flex-shrink: 1;
        width: calc(100% / 5);

        .item-icon {
          position: relative;
          width: 44px;
          height: 44px;
          box-sizing: border-box;
          margin: 0 auto 6px auto;

          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 26px;
            height: 26px;
          }
        }

        .item-name {
          margin-bottom: 10px;
          font-size: 12px;
          font-family: CTHeiTiSF;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          text-align: center;
        }

        &.active {
          .item-icon {
            border: 1px solid rgba(185, 126, 140, 1);
            box-shadow: 0px 3px 0px 0px rgba(217, 177, 166, 0.35);
          }
        }
      }
    }
  }

  .condition-price {
    .range {
      .range-input {
        .coin {
          flex-grow: 0;
          flex-shrink: 0;
          margin-right: 6px;
          min-width: 0;
        }
      }
    }
  }

  .more-condition {
    display: flex;
    align-items: center;

    .condition-name {
      font-size: 18px;
      font-weight: 400;
      line-height: 40px;
      color: #1b1b1b;
      cursor: pointer;
      margin-right: 10px;
    }

    .condition-options {
      list-style: none;
      height: 40px;
      background: rgba(249, 249, 249, 1);
      display: flex;
      visibility: hidden;

      &.active {
        visibility: visible;
      }

      .option {
        position: relative;

        .option-name {
          position: relative;
          padding: 0 14px;
          height: 40px;
          line-height: 40px;
          border: 1px solid transparent;
          box-sizing: border-box;
          font-size: 14px;
          font-family: CTHeiTiSF;
          font-weight: 400;
          color: rgba(17, 17, 17, 1);
          cursor: pointer;
          display: block;
          z-index: 2;
        }
        .operate-area {
          position: absolute;
          top: calc(100% - 1px);
          left: 0;
          padding: 20px;
          border: 1px solid #cccccc;
          background-color: #ffffff;
          visibility: hidden;
          z-index: 1;

          .range-options {
            display: flex;

            .range-options-item {
              width: 120px;
              text-align: center;
              font-size: 14px;
              font-family: CTHeiTiSF;
              font-weight: 400;
              color: #111111;
              white-space: nowrap;
            }
          }

          .range {
            margin-bottom: 15px;
            display: flex;
            align-items: center;

            .range-input {
              position: relative;
              flex-grow: 1;
              flex-shrink: 1;
              min-width: 0;
              padding: 9px 12px;
              box-sizing: border-box;
              border: 1px solid rgba(207, 164, 141, 1);
              font-size: 14px;
              font-family: Nunito Sans;
              font-weight: 400;
              color: rgba(27, 27, 27, 1);
              display: flex;
              align-items: center;

              &.min-range {
                width: 130px;
              }

              &.max-range {
                width: 140px;
              }

              .range-text {
                flex-grow: 1;
                flex-shrink: 1;
                min-width: 0;
                position: relative;

                input {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  font-size: 14px;
                  font-family: Nunito Sans;
                  font-weight: 400;
                  color: rgba(27, 27, 27, 1);

                  &:focus {
                    opacity: 1;
                    background-color: #ffffff;
                  }
                }
              }
            }

            .to {
              position: relative;
              flex-grow: 0;
              flex-shrink: 0;
              min-width: 0;
              margin: 0 24px;
            }
          }
        }

        &:hover {
          .option-name {
            border: 1px solid #cccccc;
            border-bottom: none;
            background-color: #ffffff;
          }
          .operate-area {
            visibility: visible;
          }
        }
      }
    }
  }
}

.list-title {
  padding-bottom: 30px;
}

.tab {
  list-style: none;
  border-bottom: 1px solid #e4e4e4;
  display: flex;

  .tab-item {
    position: relative;
    width: 200px;
    height: 40px;
    background: #f8f5f4;
    border: 1px solid transparent;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #f8f5f4;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .item-name {
      font-size: 16px;
      font-family: CTHeiTiSF;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    &:after {
      content: ' ';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translate(-50%, -50%) rotateZ(-45deg);
      width: 8px;
      height: 8px;
      background: #ffffff;
      border-top: 1px solid rgba(170, 138, 123, 1);
      border-right: 1px solid rgba(170, 138, 123, 1);
      display: none;
    }

    &:nth-of-type(1) {
      border-left: 1px solid #e4e4e4;
    }

    &:nth-last-of-type(1) {
      border-right: 1px solid #e4e4e4;
    }

    &.active {
      border: 1px solid rgba(170, 138, 123, 1);

      .item-name {
        font-size: 16px;
        font-family: CTHeiTiSF;
        font-weight: 400;
        color: rgba(170, 138, 123, 1);
      }

      &:after {
        display: block;
      }
    }
  }
}

.diamond-tab-content {
  min-height: 500px;

  .list-types {
    list-style: none;
    height: 45px;
    display: flex;
    align-items: center;

    .item {
      padding: 0 20px;
      border-right: 1px solid #dddddd;
      font-size: 14px;
      font-family: CTHeiTiSF;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      .type-name {
        margin-right: 8px;
      }
      .iconfont {
        font-size: 20px;
      }

      &:nth-last-of-type(1) {
        border-right: 1px solid transparent;
      }

      &.active {
        color: #aa8a7b;
      }
    }
  }

  .list-content {
    &.visual {
      .sort-type {
        list-style: none;
        height: 60px;
        background-color: #f8f8f8;
        display: flex;
        align-items: center;

        .item {
          padding: 0 23px;
          font-size: 16px;
          font-family: CTHeiTiSF;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);

          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          &.active {
            color: #ba7f8c;
          }
        }
      }
      .visual-data {
        .data-item {
          .product-content {
            .product-image {
              .properties {
                position: absolute;
                bottom: 10px;
                right: 13px;
                width: 22px;
                height: 11px;
                background: rgba(76, 76, 76, 0.37);
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;

                .iconliebiao-gengduo1 {
                  font-size: 12px;
                  color: #ffffff;
                }

                .property-list {
                  list-style: none;
                  position: absolute;
                  bottom: -8px;
                  right: -12px;
                  width: 190px;
                  height: 320px;
                  padding: 0 13px;
                  border: 1px solid rgba(221, 221, 221, 1);
                  box-sizing: border-box;
                  background-color: rgba(255, 255, 255, 0.8);
                  transform: translate(110%, 0);
                  transition: all 0.2s linear;

                  .item {
                    height: 32px;
                    font-size: 12px;
                    font-family: CTHeiTiSF;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);

                    .item-name {
                      text-align: left;
                    }

                    .item-value {
                      text-align: right;
                    }
                  }
                }

                &:hover {
                  .property-list {
                    transform: translate(0, 0);
                  }
                }
              }
            }
            .product-info {
              .product-title {
                margin-bottom: 13px;
                height: 48px;
                font-size: 12px;
                font-family: CTHeiTiSF;
                font-weight: 400;
                color: rgba(34, 34, 34, 1);
                line-height: 16px;
                text-align: left;
              }
              .product-price {
                margin-bottom: 5px;
                text-align: left;
                font-size: 20px;
                font-family: twCenMT;
                font-weight: 400;
                color: rgba(242, 155, 135, 1);
              }
              .card-info {
                font-size: 12px;
                font-family: CTHeiTiSF;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              .compared-state {
                cursor: pointer;
                margin-right: 10px;
                .iconfont {
                  font-size: 31px;
                  color: #aaaaaa;

                  &.active {
                    color: #d6ad97;
                  }
                }
              }
              .wish-state {
                cursor: pointer;
                .iconfont {
                  font-size: 20px;
                  color: #aaaaaa;

                  &.active {
                    color: #d6ad97;
                  }
                }
              }
            }
          }
        }
      }
    }
    &.list {
      .list-data-item {
        height: 100px;
        border-bottom: 1px solid #e4e4e4;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .item {
          flex-basis: 50px;
          flex-grow: 1;
          flex-shrink: 1;
          overflow: hidden;
          min-width: 0;
          font-size: 14px;
          font-family: CTHeiTiSF;
          font-weight: 400;
          color: #333333;
          text-align: center;

          display: flex;
          align-items: center;
          justify-content: center;

          .thumbnail {
            width: 80px;
            height: 80px;
            border-radius: 4px;
          }

          .compared-state {
            cursor: pointer;
            margin-right: 10px;
            .iconfont {
              font-size: 31px;
              color: #aaaaaa;

              &.active {
                color: #d6ad97;
              }
            }
          }
          .wish-state {
            cursor: pointer;
            .iconfont {
              font-size: 20px;
              color: #aaaaaa;

              &.active {
                color: #d6ad97;
              }
            }
          }

          .detail-button {
            height: 24px;
            padding: 0 10px;
            white-space: nowrap;
            font-size: 14px;
            font-family: CTHeiTiSF;
            font-weight: 400;
            color: rgba(168, 143, 127, 1);
            background: rgba(245, 240, 238, 1);
            cursor: pointer;
          }
        }

        &:hover {
          background-color: #f8f8f8;
        }

        &.list-header {
          height: 60px;
          border-bottom: none;
          background: rgba(248, 248, 248, 1);

          &:hover {
            background: rgba(248, 248, 248, 1);
          }

          .item {
            font-size: 16px;
            color: #656565;

            &.order-item {
              cursor: pointer;

              &.active {
                color: #ba7f8c;
              }
            }
          }
        }
      }
    }
  }
}

.compare-tab-content {
  min-height: 500px;

  .compare-data {
    min-width: 1360px;
    max-width: 1366px;
    margin: 0 auto;
    padding: 15px 0;
    display: flex;
    flex-wrap: wrap;

    .data-item {
      flex-grow: 0;
      flex-shrink: 0;
      width: 25%;
      margin-bottom: 20px;

      .product {
        position: relative;
        width: 309px;
        margin: auto;
        box-shadow: 0 0 0 0 rgba(60, 60, 60, 0.3);
        transition: all 0.2s linear;

        .delete-compare {
          position: absolute;
          top: 0;
          right: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          text-align: center;
          line-height: 26px;
          font-weight: bold;
          background: rgba(20, 20, 20, 0.4);
          transform: translate(38%, -31%);
          cursor: pointer;
          z-index: 5;
          visibility: hidden;
          opacity: 0;
          transition: all 0.2s linear;

          .iconfont {
            font-size: 14px;
            color: #ffffff;
          }
        }

        .product-image {
          position: relative;
          overflow: hidden;
          width: 309px;
          height: 309px;

          .main-image {
            width: 100%;
            height: 100%;
            display: inline-block;
          }
        }

        .product-info {
          width: 309px;
          border: 1px solid #dddddd;
          box-sizing: border-box;

          .product-title {
            margin: 12px 0;
            padding: 0 12px;
            box-sizing: border-box;
            height: 48px;
            font-size: 12px;
            font-family: CTHeiTiSF;
            font-weight: 400;
            color: rgba(34, 34, 34, 1);
            line-height: 16px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }

          .product-price {
            height: 24px;
            padding: 0 12px;
            margin-bottom: 8px;
            font-size: 20px;
            font-family: twCenMT;
            font-weight: 400;
            color: rgba(242, 155, 135, 1);
            display: flex;
            align-items: center;

            .coin {
              flex-grow: 0;
              flex-shrink: 0;
              margin-right: 6px;
            }

            .price {
              flex-grow: 1;
              flex-shrink: 1;
              min-width: 0;
              margin-right: 6px;
              overflow: hidden;
            }

            .add-cart {
              flex-grow: 0;
              flex-shrink: 0;
              height: 24px;
              padding: 0 10px;
              font-size: 12px;
              font-family: CTHeiTiSF;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              background: rgba(170, 138, 123, 1);
              cursor: pointer;
            }
          }

          .properties {
            .item {
              height: 35px;
              padding: 0 12px;
              box-sizing: border-box;
              display: flex;
              align-items: center;

              &:nth-of-type(2n - 1) {
                background-color: #f8f8f8;
              }

              .name {
                flex-basis: 100px;
                flex-grow: 0;
                flex-shrink: 0;
                font-size: 12px;
                font-family: CTHeiTiSF;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              .value {
                flex-grow: 1;
                flex-shrink: 1;
                text-align: center;
                font-size: 14px;
                font-family: CTHeiTiSF;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
            }
          }
        }

        &:hover {
          box-shadow: 0 7px 10px 0 rgba(60, 60, 60, 0.3);

          .delete-compare {
            visibility: visible;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
