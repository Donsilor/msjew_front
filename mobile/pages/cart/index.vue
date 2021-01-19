<template>
  <div class="address">
    <Header :title="`${lang.order}(${num})`" />
    <div v-if="!noData" class="content">
      <div class="mod">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
          >
            <div
              v-if="
                !(
                  index !== 0 &&
                  item.createTime === list[index - 1].createTime &&
                  item.groupType !== 0
                )
              "
              class="mod-item"
            >
              <!-- 单品 -->
              <div v-if="item.groupType === 0 && Number(item.goodsType) !== 19" class="single">
                <div @click="godetails(item, index)">
                  <div class="left-box" :class="[{on: item.coupon.discount || item.coupon.money},{marginTop: item.groupType === 2}]" >
                    <img :src="imageStrToArray(item.goodsImages)[0]" />

                    <div class="activity-sign" v-if="(item.coupon.discount || item.coupon.money) && item.groupType != 2">
                      <div class="triangle" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
                      <div class="triangle" v-if="item.coupon.money">{{ lang.discounts1 }}</div>
                    </div>
                  </div>
                  <span v-if="!getStatus(item, index)" class="failed">
                    {{ lang.failed }}
                  </span>
                  <div class="right">
                    <h4 class="ow-h2">
                      <i class="discount-icon" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                      <i class="discount-icon padding" v-if="item.coupon.money">￥</i>

                      {{ item.goodsName }}
                    </h4>
                    <p>SKU：{{ item.sku }}</p>
                    <p class="p">
                      {{
                        getconfig(item.config, item.simpleGoodsEntity.specs,item.goodsAttr,item.lettering)
                      }}
                      <span class="edit" @click.stop="showEdit(item, index, 'single')"></span>
                    </p>
                    <b v-if="!item.coupon.discount">{{  formatCoin(coin) }} {{ formatMoney(item.salePrice) }}</b>
                    <div class="discount-price" v-else>
                      <div class="old-price">{{formatCoin(coin) }} {{ formatNumber(item.salePrice) }}</div>
                      <b>{{ formatCoin(coin) }} {{ formatNumber(item.coupon.discount.price) }}</b>
                    </div>
                    
                    <div v-if="item.groupType === 1" class="btn-type">
                      {{ lang.ring }}
                    </div>
                    <div v-if="item.groupType === 2" class="btn-type" :class="{marginTop: item.groupType === 2}">
                      {{ lang.coustom }}
                    </div>
                    <div v-if="item.groupType !== 0 && index !== list.length - 1">
                      <h4 v-if="item.groupType === 2" class="ow-h2 margin-top-20">
                        <i class="discount-icon" v-if="list[index + 1].coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                        <i class="discount-icon padding" v-if="list[index + 1].coupon.money">￥</i>

                        {{ list[index + 1].goodsName }}
                      </h4>
                      <p :class="item.groupType === 2 ? '' : 'margin-top-10'">
                        SKU：{{ list[index + 1].sku }}
                      </p>
                      <p>
                        {{
                          getconfig(
                            list[index + 1].config,
                            list[index + 1].simpleGoodsEntity.specs
                          )
                        }}
                      </p>
                      <b v-if="!list[index + 1].coupon.discount">{{ formatCoin(coin) }} {{ formatMoney(list[index + 1].salePrice) }}</b>
                      
                      <div class="discount-price" v-else>
                        <div class="old-price">{{ formatCoin(coin) }} {{ formatNumber(list[index + 1].salePrice) }}</div>
                        <b>{{ formatCoin(coin) }} {{ formatNumber(list[index + 1].coupon.discount.price) }}</b>
                      </div>

                      <!-- <p v-if="item.groupType === 1">
                        <br/>
                        <b>{{ formatCoin(coin) }} {{ formatMoney(item.totalPrice) }}</b>
                      </p> -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- 对戒 -->
              <div v-if="item.goodsType == '19'" class="double">
                <div @click="godetails(item, index)">
                  <div class="left-box" :class="[{on: item.coupon.discount || item.coupon.money},{marginTop: item.groupType === 2}]" >
                    <img :src="imageStrToArray(item.goodsImages)[0]" />

                    <div class="activity-sign" v-if="(item.coupon.discount || item.coupon.money) && item.groupType != 2">
                      <div class="triangle" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
                      <div class="triangle" v-if="item.coupon.money">{{ lang.discounts1 }}</div>
                    </div>
                  </div>
                  <span v-if="!getStatus(item, index)" class="failed">
                    {{ lang.failed }}
                  </span>
                  <h4 class="ow-h2">
                    <i class="discount-icon" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                    <i class="discount-icon padding" v-if="item.coupon.money">￥</i>

                    {{ item.goodsName }}
                  </h4>
                  <p class="sku">SKU：{{ item.simpleGoodsEntity.goodsCode }}</p> 
                  <div class="right" v-for="(ring, _index) in item.sku" :key="_index">
                    
                    <p class="p">
                      {{
                        getDubleConfig(ring.lang.goods_spec,ring.lang.goods_attr[26].value,ring,item.goodsAttr)
                      }}
                    </p>
                    
                    <div v-if="item.goodsType == '19'" class="btn-type">
                      {{ lang.ring }}
                    </div>
                    <div v-if="item.groupType == 1" class="btn-type">
                      {{ lang.coustom }}
                    </div>
                    <!-- <div v-if="item.groupType !== 0 && index !== list.length - 1">
                      <h4 v-if="item.goodsType == 2" class="ow-h2 margin-top-20">
                        {{ list[index + 1].goodsName }}
                      </h4>
                      <p :class="item.groupType === 2 ? '' : 'margin-top-10'">
                        SKU：{{ list[index + 1].sku }}
                      </p>
                      <p>
                        {{
                          getconfig(
                            list[index + 1].config,
                            list[index + 1].simpleGoodsEntity.specs
                          )
                        }}
                      </p>
                      <b>{{ coin }} {{ formatMoney(list[index + 1].salePrice) }}</b>


                      <p v-if="item.groupType === 1">
                        <br/>
                        <b>{{ coin }} {{ formatMoney(item.totalPrice) }}</b>
                      </p>
                    </div> -->
                  </div>
                  <div class="double-ring-price" v-if="!item.coupon.discount">
                    <b  >{{ formatCoin(coin) }} {{ formatMoney(item.salePrice) }}</b>
                  </div>
                  <div class="discount-price" v-else>
                    <div class="old-price">{{ formatCoin(coin) }} {{ formatNumber(item.salePrice) }}</div>
                    <div class="now-price">
                      {{ formatCoin(coin) }} {{ formatNumber(item.coupon.discount.price) }}
                    </div>
                    <!-- <b>{{ formatCoin(coin) }} {{ formatNumber(item.coupon.discount.price) }}</b> -->
                  </div>
                  <div class="cut-line"></div>
                </div>
              </div>
              <!-- 定制 -->
              <div v-if="item.groupType === 2" class="single customization">
                <div @click="godetails(item, index)">
                  <div class="left-box" :class="[{on: item.coupon.discount || item.coupon.money},{marginTop: item.groupType === 2}]" >
                    <img :src="imageStrToArray(item.goodsImages)[0]" />

                    <div class="activity-sign" v-if="(item.coupon.discount || item.coupon.money) && item.groupType != 2">
                      <div class="triangle" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
                      <div class="triangle" v-if="item.coupon.money">{{ lang.discounts1 }}</div>
                    </div>
                  </div>
                  <span v-if="!getStatus(item, index)" class="failed">
                    {{ lang.failed }}
                  </span>
                  <div class="right">
                    <h4 class="ow-h2">
                      <i class="discount-icon" v-if="item.coupon.discount">{{ language == 'en_US' ? discountUs(item.coupon.discount.discount)+'%' : discountConversion(item.coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                      <i class="discount-icon padding" v-if="item.coupon.money">￥</i>

                      {{ item.goodsName }}
                    </h4>
                    <p>SKU：{{ item.sku }}</p>
                    <p class="p">
                      {{
                        getMadeConfig(item.config, item.simpleGoodsEntity.detailConfig)
                      }}
                    </p>
                    <b v-if="!item.coupon.discount">{{ formatCoin(coin) }} {{ formatMoney(item.salePrice) }}</b>
                    <div class="discount-price" v-else>
                      <div class="old-price">{{ formatCoin(coin) }} {{ formatNumber(item.salePrice) }}</div>
                      <b>{{ formatCoin(coin)}} {{ formatNumber(item.coupon.discount.price) }}</b>
                    </div>

                    <div v-if="item.groupType === 1" class="btn-type">
                      {{ lang.ring }}
                    </div>
                    <div v-if="item.groupType === 2" class="btn-type">
                      {{ lang.coustom }}
                    </div>
                    <div v-if="item.groupType !== 0 && index !== list.length - 1">
                      <h4 v-if="item.groupType === 2" class="ow-h2 margin-top-20">
                        <i class="discount-icon" v-if="list[index + 1].coupon.discount">{{ language == 'en_US' ? discountUs(list[index + 1].coupon.discount.discount)+'%' : discountConversion(list[index + 1].coupon.discount.discount)}}{{ lang.discounts2 }}</i>
                        <i class="discount-icon padding" v-if="list[index + 1].coupon.money">￥</i>
                        {{ list[index + 1].goodsName }}
                      </h4>
                      <p :class="item.groupType === 2 ? '' : 'margin-top-10'">
                        SKU：{{ list[index + 1].sku }}
                      </p>
                      <p>
                        {{
                          getMadeConfig(
                            list[index + 1].config,
                            list[index + 1].simpleGoodsEntity.detailConfig
                          )
                        }}
                      </p>

                      <b v-if="!list[index + 1].coupon.discount">{{ formatCoin(coin) }} {{ formatMoney(list[index + 1].salePrice) }}</b>

                      <div class="discount-price" v-else>
                        <div class="old-price">{{ formatCoin(coin) }} {{ formatNumber(list[index + 1].salePrice) }}</div>
                        <b>{{ formatCoin(coin) }} {{ formatNumber(list[index + 1].coupon.discount.price) }}</b>
                      </div>

                      <!-- 合并前 -->
                      <!-- <b>{{ coin }} {{ formatMoney(list[index + 1].salePrice) }}</b>

                      <p v-if="item.groupType === 1">
                        <br/>
                        <b>{{ formatCoin(coin) }} {{ formatMoney(item.totalPrice) }}</b>
                      </p> -->
                    </div> 
                  </div>
                </div>
              </div>
              <div class="domore">
                <div
                  class="select-icon"
                  @click.stop="isSelect(item, index)"
                  v-if="getStatus(item, index)"
                >
                  <i class="icon iconfont" :class="{ icongou: item.isSelect }"></i>
                </div>

                <!-- <a
                  v-if="!getStatus(item, index)"
                  class="similar"
                  @click.stop="
                    goMore(item.simpleGoodsEntity.categoryId, item.goodsId)
                  "
                  ><span v-if="item.groupType === 0"
                    >{{ lang.similar }}
                  </span></a
                > -->
                <a v-if="!getStatus(item, index)" href="" class="similar"></a>
                <span class="remove" @click.stop="remove(item, index)"
                  ><i class="icon iconfont iconicon-test2"></i>
                  {{ lang.remove }}</span
                >
                <span class="num">{{ lang.number }} *1</span>
              </div>
              <div class="findsimilar">
                <a
                  v-if="!getStatus(item, index)"
                  class="similar"
                  @click.stop="
                    goMore(item.simpleGoodsEntity.categoryId, item.goodsId)
                  "
                  ><span v-if="item.groupType === 0"
                    >{{ lang.similar }}
                  </span></a
                >
              </div>
            </div>
          </li>
        </ul>
        <div v-if="list.length > 0" class="bottom">
          <i
            class="icon iconfont"
            :class="{ icongou: selectAll }"
            @click="selectAlls"
          ></i>
          <span>{{ lang.all }}</span>
          <div class="order">
            <span>{{ lang.total }}</span>
            <span class="small"
              >{{ formatCoin(coin) }} {{ formatMoney(sumPrice.toFixed(2)) }}</span
            >
          </div>
          <span class="btn" @click="goPay">{{ lang.goPay }}({{ sumNum }})</span>
        </div>
      </div>
    </div>

    <div v-if="ifShowEditPopup && showAttr" class="edit-popup">
      <div class="edit-box">
        <div class="edit-info">
          <div class="quit" @click="ifShowEditPopup = false, resetData()">x</div>
          <div class="info-top">
            <div class="goods-img">
              <img :src="goods.url" alt="">
            </div>
            <div class="goods-price">
              <span>{{ formatCoin(goods.coin) }}</span>
              <span>{{ formatMoney(goods.price) }}</span>
            </div>
          </div>
          
          <!-- 单品属性 -->
          <div v-if="type == 'single'">
            <!-- 主石大小 -->
            <div v-if="carats.length" class="attr-list">
              <div class="attr-text">{{ caratsText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == selected.caratIndex}" v-for="(item, index) in carats" :key="index" @click="chooseAttr('carats', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 成色 -->
            <div v-if="materials.length" class="attr-list">
              <div class="attr-text">{{ materialsText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == selected.materialIndex}" v-for="(item, index) in materials" :key="index" @click="chooseAttr('materials', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 尺寸 -->
            <div v-if="sizes.length" class="attr-list sizes">
              <div class="attr-text">{{ sizesText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == selected.sizeIndex}" v-for="(item, index) in sizes" :key="index" @click="chooseAttr('size', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 主石色彩 -->
            <div v-if="colorDetail.length" class="attr-list colors">
              <div class="attr-text">{{ colorText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == selected.colorIndex}" v-for="(item, index) in colorDetail" :key="index" @click="chooseAttr('color', index)">{{ item.name }}</div>
              </div>
            </div>
          </div>

          <!-- 对戒一属性 -->
          <div v-if="type == 'doubleA'">
            <!-- 主石大小 -->
            <div v-if="caratsA.length" class="attr-list">
              <div class="attr-text">{{ caratsText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == doubleSelectedA.caratIndex}" v-for="(item, index) in caratsA" :key="index" @click="chooseAttr('carats', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 成色 -->
            <div v-if="materialsA.length" class="attr-list">
              <div class="attr-text">{{ materialsText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == doubleSelectedA.materialIndex}" v-for="(item, index) in materialsA" :key="index" @click="chooseAttr('materials', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 尺寸 -->
            <div v-if="sizesA.length" class="attr-list sizes">
              <div class="attr-text">{{ sizesText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == doubleSelectedA.sizeIndex}" v-for="(item, index) in sizesA" :key="index" @click="chooseAttr('size', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 主石色彩 -->
            <div v-if="firstRingColorDetail.length" class="attr-list colors">
              <div class="attr-text">{{ colorText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == doubleSelectedA.colorIndex}" v-for="(item, index) in firstRingColorDetail" :key="index" @click="chooseAttr('color', index)">{{ item.name }}</div>
              </div>
            </div>
          </div>

          <!-- 对戒二属性 -->
          <div v-if="type == 'doubleB'">
            <!-- 主石大小 -->
            <div v-if="caratsB.length" class="attr-list">
              <div class="attr-text">{{ caratsText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == doubleSelectedB.caratIndex}" v-for="(item, index) in caratsB" :key="index" @click="chooseAttr('carats', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 成色 -->
            <div v-if="materialsB.length" class="attr-list">
              <div class="attr-text">{{ materialsText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == doubleSelectedB.materialIndex}" v-for="(item, index) in materialsB" :key="index" @click="chooseAttr('materials', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 尺寸 -->
            <div v-if="sizesB.length" class="attr-list sizes">
              <div class="attr-text">{{ sizesText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == doubleSelectedB.sizeIndex}" v-for="(item, index) in sizesB" :key="index" @click="chooseAttr('size', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 主石色彩 -->
            <div v-if="secondRingColorDetail.length" class="attr-list colors">
              <div class="attr-text">{{ colorText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == doubleSelectedB.colorIndex}" v-for="(item, index) in secondRingColorDetail" :key="index" @click="chooseAttr('color', index)">{{ item.name }}</div>
              </div>
            </div>
          </div>

          <!-- 定制戒托属性 -->
          <div v-if="type == 'madeUpB'">
            <!-- 主石大小 -->
            <div v-if="caratsB.length" class="attr-list">
              <div class="attr-text">{{ caratsText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == madeUpSelectedB.caratIndex}" v-for="(item, index) in caratsB" :key="index" @click="chooseAttr('carats', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 成色 -->
            <div v-if="materialsB.length" class="attr-list">
              <div class="attr-text">{{ materialsText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == madeUpSelectedB.materialIndex}" v-for="(item, index) in materialsB" :key="index" @click="chooseAttr('materials', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 尺寸 -->
            <div v-if="sizesB.length" class="attr-list sizes">
              <div class="attr-text">{{ sizesText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == madeUpSelectedB.sizeIndex}" v-for="(item, index) in sizesB" :key="index" @click="chooseAttr('size', index)">{{ item.name }}</div>
              </div>
            </div>

            <!-- 主石色彩 -->
            <div v-if="secondRingColorDetail.length" class="attr-list colors">
              <div class="attr-text">{{ colorText }}</div>
              <div class="attr-box">
                <div class="attr-child" :class="{'active': index == madeUpSelectedB.colorIndex}" v-for="(item, index) in secondRingColorDetail" :key="index" @click="chooseAttr('color', index)">{{ item.name }}</div>
              </div>
            </div>
          </div>

          <div class="confirm" @click="confirmAttr()">{{ lang.confirm }}</div>
        </div>
      </div>
    </div>

     <div v-if="list.length == 0">
      <bdd-empty
        v-if="(list.length <= 0 && this.isLoading !=='' && isLogin) || (list.length <= 0 && !isLogin)"
        :type="'cart'"
        @toShopping="toShopping"
      ></bdd-empty>
      <!--猜你彩泥喜欢商品列表 -->
      <div class="product-list" v-if="showData.length > 0">
        <div class="list-part" >
          <div class="title" v-show="pageInfo && pageInfo.total_count">
            {{lang.guessLike}}
          </div>
          <div class="list">
            <div v-for="(each, n) in getRandomArray(showData,10)" :key="n" @click="toDetail(each)">
              <div class="info-image">
                <img
                  :src="imageStrToArray(each.goodsImages)[0] || '/luanlai.jpg'"
                  :alt="each.goodsName"
                  @error="imageError"
                />

                <!-- 折扣 -->
                <div class="discount-a-icon" v-if="couponType(each.coupon) == 'discount'">
                  <div>{{ language == 'en_US' ? discountUs(each.coupon.discount.discount)+'%' : discountConversion(each.coupon.discount.discount)}}{{ lang.discounts2 }}</div>
                </div>

                <!-- 优惠券 -->
                <div class="discount-a-icon" v-if="couponType(each.coupon) == 'money'">
                  <div>{{ lang.discounts1 }}</div>
                </div>

              </div>

              <!-- 折扣 -->
              <div class="info-title ow-h2" v-if="couponType(each.coupon) == 'discount'">
                <span class="discount-a-icon2">{{ language == 'en_US' ? discountUs(each.coupon.discount.discount)+'%' : discountConversion(each.coupon.discount.discount)}}{{ lang.discounts2 }}</span>
                {{ each.goodsName }}
              </div>

              <!-- 优惠券 -->
              <div class="info-title ow-h2" v-else-if="couponType(each.coupon) == 'money'">
                <span class="discount-b-icon2">￥</span>
                {{ each.goodsName }}
              </div>

              <div v-else class="info-title ow-h2">
                {{ each.goodsName }}
              </div>

              <div class="product-price">
                <div class="list-discount-price" v-if="couponType(each.coupon) !== 'discount'">
                  <div class="info-price">
                    <span class="coin">{{ formatCoin(each.coinType) }}</span>
                    <span class="price">{{ formatNumber(each.salePrice) }}</span>
                  </div>
                </div>
              
                <!-- 折扣 -->
                <div class="list-discount-price" v-if="couponType(each.coupon) == 'discount'">
                  <div class="info-price old-price-2">
                    <span class="coin">{{ formatCoin(each.coinType) }}</span>
                    <span class="price">{{ formatNumber(each.salePrice) }}</span>
                  </div>
                  <div class="info-price">
                    <span class="coin">{{ formatCoin(each.coinType) }}</span>
                    <span class="price">{{ formatNumber(each.coupon.discount.price) }}</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div class="look_more" @click="goRing"><span>{{lang.lookMore}}</span></div>
      </div>
    </div>
    <login-pop v-if="ifShowPop" @closePop="closePop"></login-pop>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import { formatMoney } from '@/assets/js/filterUtil.js'
import List from '@/mixins/list.js'
import GoodListProps from '@/mixins/good-search-list-props.js'
const storage = process.client ? require('good-storage').default : {}
export default {
  name: 'Cart',
  layout: 'no-footer-bar',
  components: {
    Header
  },
  mixins: [List,GoodListProps], 
  data() {
    return {
      coin: this.$store.state.coin,
      list: [],
      selectAll: false,
      sumPrice: 0,
      noData: true,
      isLogin: !!this.$store.getters.hadLogin,
      cartList: [],
      sumNum: 0,
      lang: this.LANGUAGE.cart.index,
      num: 0,
      timer: null ,
      soudout:'',
      language: this.$store.state.language,
      isLoading:'',
      ifShowPop: false,
      ifShowEditPopup: false,
      goods: {
        url: '',
        coin: '',
        price: 0,
      },
      goodsId: -1,
      info: {},
      type: '',
      selectIndex: -1,

      // 单品
      productData: {},
      selected: {
        materialIndex: -1,
        caratIndex: -1,
        sizeIndex: -1,
        colorIndex: -1,
      },
      colorAttrs: [
        {
          config_id:'',
          config_attr_id:''
        }
      ],
      materialsText: '',
      caratsText: '',
      sizesText: '',
      colorText: '',
      cartEditId: '',

      // 对戒
      productDataA: {},
      productDataB: {},
      doubleSelectedA: {
        materialIndex: -1,
        caratIndex: -1,
        sizeIndex: -1,
        colorIndex: -1,
      },
      doubleSelectedB: {
        materialIndex: -1,
        caratIndex: -1,
        sizeIndex: -1,
        colorIndex: -1,
      },
      firstRingColorAttrs: [
        {
          goods_id:'',
          config_id:'',
          config_attr_id:''
        }
      ],
      secondRingColorAttrs: [
        {
          goods_id:'',
          config_id:'',
          config_attr_id:''
        }
      ],
      categoryId: '',
      goodsDetailsId: '',

      // 定制
      madeUpSelectedA: {
        materialIndex: -1,
        caratIndex: -1,
        sizeIndex: -1,
        colorIndex: -1,
      },
      madeUpSelectedB: {
        materialIndex: -1,
        caratIndex: -1,
        sizeIndex: -1,
        colorIndex: -1,
      },
      madeUpColorAttrs: [
        {
          config_id:'',
          config_attr_id:''
        }
      ],
      diamondPrice: 0,
      diamondGoodInfo: {
        goodsDetailsId: '',
        goods_id: '',
        goods_type: '',
      },
      similarGoodsId: '',
    }
  },
  computed: {
    // -------------------单品------------------
    // 成色
    materials() {
      if(this.productData.materials){
        return this.productData.materials
      }else{
        return []
      }
    },
    // 主石大小
    carats() {
      if(this.productData.carats){
        return this.productData.carats
      }else{
        return []
      }
    },
    // 尺寸
    sizes() {
      if(this.productData.sizes){
        return this.productData.sizes
      }else{
        return []
      }
    },
    //色彩  start
    colorDetail(){
      const Spec = this.productData.specs

      let colors = []
      let colorSpec = ''
      let colorId = ''
      // let configId = ''
      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            colorSpec = item.configAttrVal
            colorId = item.configAttrId
            this.configId = item.configId
          }
          if((colorId && colorSpec)!== ""){
            let ids = colorId.split("|")
            let specs = colorSpec.split("|")
            if((ids && specs) !== ''){
              colors = ids.map((id,i) => ({
                id, 
                name: specs[i]
              }));
            }
          }
        })
        return colors
      }else{
        return []
      }
    },
    goodsAttrs(){
      const _this = this
      const ringChecked = _this.selected.colorIndex
      const colorDetail = _this.colorDetail

      const color =
        colorDetail.length > 0 && colorDetail[ringChecked]
          ? colorDetail[ringChecked].id
          : null
      _this.colorAttrs[0].config_id = _this.configId
      _this.colorAttrs[0].config_attr_id = color

      return _this.colorAttrs
    },
    simpleDetail() {
      const _this = this
      const productData = _this.productData
      const details = productData.details

      const material =
        productData.materials.length > 0 &&
        productData.materials[this.selected.materialIndex]
          ? productData.materials[this.selected.materialIndex].id
          : null
      const size =
        productData.sizes.length > 0 &&
        productData.sizes[this.selected.sizeIndex]
          ? productData.sizes[this.selected.sizeIndex].id
          : null
      const carat =
        productData.carats.length > 0 &&
        productData.carats[this.selected.caratIndex]
          ? productData.carats[this.selected.caratIndex].id
          : null

      let result = null

      for (let n = 0, length = details.length; n < length; n++) {
        const item = details[n]
        if (item.material === material && item.size === size && item.carat === carat) {
          result = item
          break
        }
      }

      return result
    },

    // -------------------对戒------------------
    // 成色
    materialsA() {
      if(this.productDataA.materials){
        return this.productDataA.materials
      }else{
        return []
      }
    },
    materialsB() {
      if(this.productDataB.materials){
        return this.productDataB.materials
      }else{
        return []
      }
    },
    // 主石大小
    caratsA() {
      if(this.productDataA.carats){
        return this.productDataA.carats
      }else{
        return []
      }
    },
    caratsB() {
      if(this.productDataB.carats){
        return this.productDataB.carats
      }else{
        return []
      }
    },
    // 尺寸
    sizesA() {
      if(this.productDataA.sizes){
        return this.productDataA.sizes
      }else{
        return []
      }
    },
    sizesB() {
      if(this.productDataB.sizes){
        return this.productDataB.sizes
      }else{
        return []
      }
    },
    // 色彩  start
    firstRingColorDetail(){
      const Spec = this.productDataA.specs
      let colors = []
      let colorSpec = ''
      let colorId = ''

      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            colorSpec = item.configAttrVal
            colorId = item.configAttrId
            this.configId = item.configId
          }
          if((colorId && colorSpec)!== ""){
            let ids = colorId.split("|")
            let specs = colorSpec.split("|")
            if((ids && specs) !== ''){
              colors = ids.map((id,i) => ({
                id, 
                name: specs[i]
              }));
            }
          }
        })
      }
      return colors
    },
    secondRingColorDetail(){
      const Spec = this.productDataB.specs
      let colors = []
      let colorSpec = ''
      let colorId = ''

      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            colorSpec = item.configAttrVal
            colorId = item.configAttrId
            this.configId = item.configId
          }
          if((colorId && colorSpec)!== ""){
            let ids = colorId.split("|")
            let specs = colorSpec.split("|")
            if((ids && specs) !== ''){
              colors = ids.map((id,i) => ({
                id, 
                name: specs[i]
              }));
            }
          }
        })
      }
      return colors
    },
    firstRingGoodsAttrs(){
      const _this = this
      const ringChecked = _this.doubleSelectedA
      const firstRingColorDetail = _this.firstRingColorDetail

      const color =
        firstRingColorDetail.length > 0 && firstRingColorDetail[ringChecked.colorIndex]
          ? firstRingColorDetail[ringChecked.colorIndex].id
          : null

      // _this.firstRingColorAttrs[0].goods_id = _this.firstRingGoodsId
      _this.firstRingColorAttrs[0].config_id = _this.configId
      _this.firstRingColorAttrs[0].config_attr_id = color
      // console.log('rrrrrrrrrrrr1',_this.firstRingColorAttrs)
      return _this.firstRingColorAttrs
    },
    secondRingGoodsAttrs(){
      const _this = this
      const ringChecked = _this.doubleSelectedB
      const secondRingColorDetail = _this.secondRingColorDetail

      const color =
        secondRingColorDetail.length > 0 && secondRingColorDetail[ringChecked.colorIndex]
          ? secondRingColorDetail[ringChecked.colorIndex].id
          : null

      // _this.secondRingColorAttrs[0].goods_id = _this.secondRingGoodsId
      _this.secondRingColorAttrs[0].config_id = _this.configId
      _this.secondRingColorAttrs[0].config_attr_id = color
      // console.log('rrrrrrrrrrrr2',_this.secondRingColorAttrs)
      return _this.secondRingColorAttrs
    },
    doubleRingGoodsAttrs(){
      this.doubleRingColorAttrs = this.firstRingGoodsAttrs.concat(this.secondRingGoodsAttrs)
      let arr = this.doubleRingColorAttrs.filter(item=>item.goods_id !== ''&&item.config_id !== ''&&item.config_attr_id !== '')
      // console.log('mmmmm',arr)
      return arr
    },
    // 色彩  end

    // -------------------定制------------------
    //色彩  start
    colorDetailB(){
      const Spec = this.productDataB.specs

      let colors = []
      let colorSpec = ''
      let colorId = ''
      // let configId = ''
      if(Spec){
        Spec.forEach(item => {
          if (item.configId === '63') {
            colorSpec = item.configAttrVal
            colorId = item.configAttrId
            this.configId = item.configId
          }
          if((colorId && colorSpec)!== ""){
            let ids = colorId.split("|")
            let specs = colorSpec.split("|")
            if((ids && specs) !== ''){
              colors = ids.map((id,i) => ({
                id, 
                name: specs[i]
              }));
            }
          }
        })
        return colors
      }else{
        return []
      }
    },
    madeUpDetailB() {
      const _this = this
      const productDataB = _this.productDataB
      const details = productDataB.details

      const material =
        productDataB.materials.length > 0 &&
        productDataB.materials[this.madeUpSelectedB.materialIndex]
          ? productDataB.materials[this.madeUpSelectedB.materialIndex].id
          : null
      const size =
        productDataB.sizes.length > 0 &&
        productDataB.sizes[this.madeUpSelectedB.sizeIndex]
          ? productDataB.sizes[this.madeUpSelectedB.sizeIndex].id
          : null
      const carat =
        productDataB.carats.length > 0 &&
        productDataB.carats[this.madeUpSelectedB.caratIndex]
          ? productDataB.carats[this.madeUpSelectedB.caratIndex].id
          : null

      let result = null

      for (let n = 0, length = details.length; n < length; n++) {
        const item = details[n]
        if (item.material === material && item.size === size && item.carat === carat) {
          result = item
          break
        }
      }

      return result
    },
    showAttr() {
      var res = false;
      if(this.type == 'single'){
        if(this.carats.length || this.materials.length || this.sizes.length || this.colorDetail.length){
          res = true
        }else{
          res = false
        }
      }else if(this.type == 'doubleA'){
        if(this.caratsA.length || this.materialsA.length || this.sizesA.length || this.firstRingColorDetail.length){
          res = true
        }else{
          res = false
        }
      }else if(this.type == 'doubleB' || this.type == 'madeUpB'){
        if(this.caratsB.length || this.materialsB.length || this.sizesB.length || this.secondRingColorDetail.length){
          res = true
        }else{
          res = false
        }
      }

      return res
    },
    // 列表特定query参数
    specialParams() {
      // console.log("dssada",this.showData) 
      // this.list = this.showData
      return {
        categoryId: this.categoryId,
        similarGoodsId: this.similarGoodsId
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.query) {
        this.keyword = this.$helpers.base64Decode(
          this.$route.query.keyword || ''
        )
      }
      this.research()
      if(this.list.length > 0){
        this.$nuxt.$loading.start()
      }
      localStorage.setItem('loading', 'yes');
      if (this.isLogin) {
        this.getList()
      } else {
        this.getLocalCart()
      }
    })
  },
  methods: {
    goRing() {
      this.$router.replace({
        path: '/marriage-ring/single-ring'
      })
    },
    /* 随机获取数组中的数据*/
    getRandomArray(arr,num){
      // console.log(111111111,this.num)
      //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
      var temp_array = new Array();
      for (var index in arr) {
        if(arr[index].goodsImages !== '?x-oss-process=style/400X400' && (parseInt(arr[index].categoryId) !== 15)&& (parseInt(arr[index].categoryId) !== 12)&& (parseInt(arr[index].categoryId) !== 20)){
          // console.log(111111111,arr[index])
            temp_array.push(arr[index]);
        }
      }
      //取出的数值项,保存在此数组
      var return_array = new Array();
      for (var i = 0; i<num; i++) {
          //判断如果数组还有可以取出的元素,以防下标越界
          if (temp_array.length>0) {
              //在数组中产生一个随机索引
              var arrIndex = Math.floor(Math.random()*temp_array.length);
              //将此随机索引的对应的数组元素值复制出来
              return_array[i] = temp_array[arrIndex];
              //然后删掉此索引的数组元素,这时候temp_array变为新的数组
              temp_array.splice(arrIndex, 1);
          } else {
              //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
              break;
          }
      }
      console.log("Dsdas",return_array) 
      return return_array;
    },
    toDetail(info) {
      let routerName = ''
      switch (info.categoryId) {
        case 15:
          // 钻石
          routerName = 'diamond-diamonds'
          break
        case 2:
          // 戒指
          routerName = 'marriage-ring-single-ring-detail'
          break
        case 3:
          // 珠宝饰品
          routerName = 'accessories-accessories'
          break
        case 4:
          // 项链
          routerName = 'accessories-accessories'
          break
        case 5:
          // 吊坠
          routerName = 'accessories-accessories'
          break
        case 6:
          // 耳钉
          routerName = 'accessories-accessories'
          break
        case 7:
          // 耳环
          routerName = 'accessories-accessories'
          break
        case 8:
          // 手链
          routerName = 'accessories-accessories'
          break
        case 9:
          // 手镯
          routerName = 'accessories-accessories'
          break
        case 17:
          // 手镯
          routerName = 'accessories-accessories'
          break
        case 18:
          // 手镯
          routerName = 'accessories-accessories'
          break
        case 16:
          // 手镯
          routerName = 'accessories-accessories'
          break
        case 12:
          routerName = 'engagement-engagement-rings'
          break
        // 对戒
        case 19:
          routerName = 'marriage-ring-pair-ring-detail'
          break
      }

      if(info.categoryId == 2){
          this.$router.push({
            name: routerName,
            query: {
              goodId: info.goodsId || info.id,
              ringType : 'single'
            }
          })
      }else if(info.categoryId == -1){
        this.$router.push({
          name: routerName,
          query: {
            goodId: info.goodsId || info.id,
            ringType : 'pair'
          }
        })
      }else{
        this.$router.push({
          name: routerName,
          query: {
            goodId: info.goodsId || info.id,
          }
        })
      }

    },
    formatMoney: formatMoney,
    toShopping() {
      this.$router.push({
        path: '/marriage-ring/single-ring'
      })
    },
    // 去找类似
    goMore(val, val2) {
      this.$router.push({
        name: 'search-result',
        query: {
          similarGoodsId: val2,
          categoryId: val
        }
      })
    },
    goPay() {
      // if(!this.isLogin && this.$store.state.platform == 21){
      //   this.ifShowPop = true
      //   return
      // }

      const arr = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].isSelect) {
          arr.push(this.list[i])
        }
      }

      if (arr.length <= 0) {
        this.$toast.show(this.lang.toast1)
      } else if (arr.length > 0) {
        // console.log("arr",arr)
        storage && storage.set('myCartList', JSON.stringify(arr))
        this.$router.push({
          name: 'cart-sureOrder'
        })
      }
    },
    // 判断是否失效
    getStatus(item, ind) {
      // console.log(item)
      let status = false
      if (item.groupType === 2) {
        if (item.goodsStatus === 2 && this.list[ind + 1].goodsStatus === 2) {
          status = true
        }
      } else if (item.groupType === 1) {
        if (
          // item.goodsStatus === 2 &&
          // this.list[ind + 1].goodsStatus === 2 &&
          item.status === '1'
        ) {
          status = true
        }
      } else if (item.goodsStatus === 2) {
        status = true
      }
      return status
    },
    // 默认全选
    defaultAll(){
      if(!this.isLogin){
        this.selectAll = !this.selectAll
        // console.log("全选",this.list)
        for (let i = 0; i < this.list.length; i++) {
          this.soudout = this.list[i].goodsStatus
          // console.log("所有",this.list[i].goodsStatus)
          if (this.list[i].goodsStatus === 2) {
            //  console.log("所有")
            this.list[i].isSelect = this.selectAll
          } else {
            // console.log("否则")
            this.list[i].isSelect = false
          }
        }
        // console.log(this.selectAll)
        this.getNum()
        if(this.list.length == 1 && this.soudout !== 2){
          this.selectAll = false
        }
      }
    },
    // 全选与反选
    selectAlls() {
      this.selectAll = !this.selectAll
      // console.log("全选", this.list)
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].goodsStatus === 2) {
          //  console.log("所有")
          this.list[i].isSelect = this.selectAll
        } else {
          // console.log("否则")
          this.list[i].isSelect = false
        }
      }
      console.log(this.selectAll)
      this.getNum()
    },
    // 选择商品
    isSelect(data, index) {
      if (data.groupType !== 0 && index < this.list.length - 1) {
        this.list[index].isSelect = !this.list[index].isSelect
        this.list[index + 1].isSelect = !this.list[index + 1].isSelect
      } else {
        this.list[index].isSelect = !this.list[index].isSelect
      }
      this.getNum()
    },
    // 计数和选择计数汇总，价格汇总
    getNum() {
      this.selectAll = true
      let newPrice = 0
      this.sumNum = 0
      for (let i = 0; i < this.list.length; i++) {
        // 购物车总数汇总
        this.num = 0
        this.list.map((item, index) => {
          if (item.groupType === 0) {
            this.num = this.num + 1
          } else {
            this.num = this.num + 0.5
          }
        })
        // 价格汇总
        if (this.list[i].isSelect) {
          // console.log(i, 'iiii')

          if(this.list[i].coupon.discount){
            newPrice = newPrice + parseFloat(this.list[i].coupon.discount.price)
          }else{
            newPrice = newPrice + parseFloat(this.list[i].salePrice)
          }

          // // 合并前,怕出问题留作参考
          // if (this.list[i].groupType === 1) {
          //    newPrice = newPrice + parseFloat(this.list[i].totalPrice) * 0.5
          //  //对戒
          // }else{
          //     newPrice = newPrice + parseFloat(this.list[i].salePrice)
          //  //对戒
          // }

          // console.log("price",newPrice)
          // 数量汇总
          if (this.list[i].groupType === 0) {
            this.sumNum = this.sumNum + 1
          } else {
            this.sumNum = this.sumNum + 0.5
          }
        }
        // 反选
        if (this.list[i].goodsStatus === 2) {
          if (!this.list[i].isSelect) {
            this.selectAll = false
          }
        }
      }
      this.sumPrice = newPrice
      // console.log("价格",this.sumPrice)
    },
    // 删除商品
    remove(item, index) {
      if (!this.isLogin) {
        // console.log('item', item)
        let arr = null
        if (item.groupType === 0) {
          arr = item.localSn
        } else {
          arr = [item.localSn, this.list[index + 1].localSn]
        }
        this.$store.dispatch('removeCart', arr).then(res => {
          this.getLocalCart()
          this.$toast.show(this.lang.toast2)
        })
      } else if (this.isLogin) {
        let arr2 = null
        if (item.groupType === 0) {
          arr2 = [item.id]
        } else {
          arr2 = [item.id, this.list[index + 1].id]
        }
        this.$axios({
          method: 'post',
          url: '/web/member/cart/del',
          data: {
            id: arr2.join(',')
          }
        })
          .then(res => {
            this.$toast.show(this.lang.toast2)
            this.getList()
            this.$store.dispatch('getCart')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    // 属性数值转化成字符串
    getconfig(list, list2, attr,lettering) {
      let config = []
      if(attr){
        config = list.concat(attr)
      }
      let text = ''
      
      if (config.length > 0) {
        config.map((item, index) => {
          if (index === config.length - 1) {
            text = text + item.configAttrIVal
          } else {
            text = text + item.configAttrIVal + ' /  '
          }
        })
      }

      if (list2 &&  list2.length > 0) {
        list2.map((item, index) => {
          if (item.configId === 196) {
            // console.log(list2, '9999', item)
            text = text + ' /  ' + item.configAttrIVal
          }
        })
      }

      // 刻字
      if(lettering){
         text = text + ' /  ' + lettering
        console.log('text', text)
      }
      
      return text
    },
    getMadeConfig(list,list2,attr){
      let text = ''
      if(this.isLogin){
        if (list2.length > 0) {
          list2.map((item, index) => {
            // console.log("itemlist2",item)
            if (index === list2.length - 1) {
              text = text + item.configAttrIVal
            } else {
              text = text + item.configAttrIVal + ' /  '
            }
          })
        }
      }else {
        if (list2.length > 0) {
          list2.map((item, index) => {
             console.log("itemlist2",item)
            if (index === list2.length - 1) {
              text = text + item.configAttrIVal
            } else {
              text = text + item.configAttrIVal + ' /  '
            }
          })
        }
      }
      return text
    },
    // 属性数值转化成字符串
    getDubleConfig(good_spec,goods_attr,ring,attr) {
      // console.log('9999',ring.id)
      let attrs = []
     
      ring.lang.goods_spec.forEach((item,a) => {
        attrs.push(item)
      })
      attr.forEach((i,a) => {
        // console.log('9999',ring.id,i)
        if (ring.id == i.goodsId) {
          // i.attr_name = i.configVal
          i.attr_value = i.configAttrIVal
          attrs.push(i)
        }
      })
      let text = ''
      if (attrs.length > 0) {
        attrs.map((item, index) => {

          if (index === attrs.length - 1) {
            text = text + item.attr_value
          } else {
            text = text + item.attr_value + ' /  '
          }
        }) 
      }
     if (goods_attr) {
       for (let i in goods_attr) {
      //  console.log("good_spec",goods_attr[i])
        text = text + ' /  '+goods_attr[i] 
      }
        // goods_attr.map((item, index) => {

        //   if (index === goods_attr.length - 1) {
        //     text = text + item
        //   } else {
        //     text = text + item + ' /  '
        //   }
        // }) 
      }
      //  console.log("good_spec",text)
      return text
    },

    // 获取本地数据
    getLocalList(list) {
      this.$axios({
        method: 'post',
        url: `/web/member/cart/local`,
        data: {
          goodsCartList:list
        }
      })
        .then(res => {
          // console.log("本地",res)
          this.$nuxt.$loading.finish()
          localStorage.removeItem('loading');
          this.isLoading = localStorage.getItem('loading')
          this.doFormat(res)
          this.defaultAll()
        })
        .catch(err => {
          localStorage.removeItem('loading');
          this.$nuxt.$loading.finish()
          console.log('err:', err)
        })
    },
    // 获取本地local列表
    getLocalCart() {
      this.$store.dispatch('getLocalCart').then(res => {
        // console.log("djkashdkasjdklasj",res)
        if (res.length > 0) {
          this.noData = false
          this.cartList = []
          res.map((item, index) => {
            console.log("item",item)
            item.data.map((val, ind) => {
              // Status 商品状态(1-仓库,2-上架,3-下架,4-删除)   goods_id  goods_type  goods_num  group_type  group_id  createTime
              // 定制
              // createTime: 1560497513455  //对戒时才有用为必传 切为一致 其他情况可传可以不传
              // goodsCount: 1   //都为一
              // goodsDetailsId: 1865  //都为详情DetailsId
              // goodsId: 304   //都为商品类Id
              // groupId: 1560497551424 //定制为前端生成的时间挫，精确到秒，单品为null，对戒为商品groupId，
              // groupType: 2 // 单品为空，对戒为1 ， 定制2
              // updateTime: 0 // 创建本地购物车时间id
              const o = {
                createTime: item.createTime,
                goods_num: val.goodsCount,
                goodsDetailsId: val.goodsDetailsId,
                goods_id: val.goodsDetailsId,
                goods_type:val.goodsType,
                group_id:
                  val.goodsType == 19
                    ? val.goodsId
                    : val.groupType === 2
                    ? item.id
                    : null,
                group_type: val.groupType,
                goods_attr:val.goods_attr,
                lettering:val.lettering,
                updateTime: item.id // 这里改了啊，大佬！！！！！！！！！！！！！！！！！！！！！
              }
              // console.log("ooooo>>>",val)
              this.cartList.push(o)
            })
          })
          this.cartList.reverse()
          console.log("this.cartList",this.cartList)
          this.getLocalList(this.cartList)
        } else {
          this.num = 0
          this.list = []
        }
      })
    },
    // 获取登录列表数据
    getList() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/web/member/cart`
        })
        .then(res => {
          // console.log("线上llll",res)
          this.$nuxt.$loading.finish()
          localStorage.removeItem('loading');
          this.isLoading = localStorage.getItem('loading')
          const result = []
          let keys = Object.keys(res)
          keys = keys.sort((a, b) => {
            return b - a
          })
          keys.forEach(item => {
            result.push(res[item])
          })
          // console.log("线上llll",result)
          this.doFormat(result)
          // this.doFormat(res)
        })
        .catch(err => {
          this.$nuxt.$loading.finish()
          localStorage.removeItem('loading');
          console.log('err:', err)
        })
    },
    // 格式化数据列表
    doFormat(res) {
      // console.log("res",res)
      this.list = []
      if (res && res.length > 0) {
        this.noData = false
        res.map((item, index) => {
          // console.log("dddd",item) 
          this.coin = item.simpleGoodsEntity.coinType
          const o = {
            isSelect: false,
            goodsImages: item.simpleGoodsEntity.goodsImages,
              // item.goodsType === 19
              //   ? item.simpleGoodsEntity.goodsImages
              //   : item.simpleGoodsEntity.goodsImages,
            goodsName:item.simpleGoodsEntity.goodsName,
              // item.goodsType === 19
              //   ? item.ringsSimpleGoodsEntity.name
              //   : item.simpleGoodsEntity.goodsName,
            config:
              item.goodsType == 19
                ? item.ring
                : item.simpleGoodsEntity.categoryId === 20
                ? item.simpleGoodsEntity.detailConfig
                : item.simpleGoodsEntity.detailConfig,
            goodsAttr:item.goodsAttr,
            lettering:item.lettering,
            sku:
              item.goodsType == 19
                ? item.ring
                : item.simpleGoodsEntity.simpleGoodsDetails.goodsDetailsCode,
            salePrice: item.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice,
              // item.goodsType == 19
              //   ? item.simpleGoodsEntity
              //       .simpleGoodsDetails.retailMallPrice
              //   : item.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice,
            totalPrice:item.goodsType == 19
                ? item.simpleGoodsEntity.salePrice
                : item.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice,
            groupType: item.groupType || 0,
            goodsType: item.simpleGoodsEntity.categoryId,
            createTime:
              item.goodsType == 19
                ? item.createTime
                : item.groupId
                ? item.groupId
                : item.goodsId,
            goodsId: item.goodsId,
            goodsDetailsId: item.goodsDetailsId,
            id: item.id,
            localSn: item.localSn,
            groupId: item.groupId || null,
             simpleGoodsEntity: item.simpleGoodsEntity,
            // simpleGoodsEntity:
            //   item.goodsType == 19
            //     ? item.ringsSimpleGoodsEntity.simpleGoodsEntity
            //     : item.simpleGoodsEntity,
            status:item.goodsType,
              // item.goodsType === 19 ? item.ringsSimpleGoodsEntity.status : 1,
            goodsStatus:item.simpleGoodsEntity.goodsStatus,
              // item.goodsType === 19
              //   ? item.ringsSimpleGoodsEntity.simpleGoodsEntity.goodsStatus
              //   : item.simpleGoodsEntity.goodsStatus
            coupon:
            item.coupon ? item.coupon : {}
          }
          this.list.push(o)
          // console.log("this.list",this.list)
        })
        for (let i = 0; i < this.list.length - 1; i++) {
          if (
            this.list[i].simpleGoodsEntity.categoryId === 20 &&
            this.list[i].createTime === this.list[i + 1].createTime
          ) {
            const tamp = this.list[i]
            this.list[i] = this.list[i + 1]
            this.list[i + 1] = tamp
          }
        }
        this.getNum()
      } else {
        this.noData = true
        this.num = 0
      }
    },
    switchName(i) {
      const num = parseInt(i)
      switch (num) {
        case 15:
          return `diamond`
        case 12:
          return `ring`
        case 4:
          return `necklace`
        case 8:
          return `bracelet`
      }
    },
    godetails(item, index) {
      // console.log("itemdetail",item)
      // 去定制详情
      if (item.groupType === 2) {
      // console.log("去定制详情",item,this.list)
        const ct1 = this.isLogin ? item.id : item.localSn
        const ct2 = this.isLogin
          ? this.list[index + 1].id
          : this.list[index + 1].localSn
        this.goToMade(
          item.simpleGoodsEntity.categoryId,
          item.goodsId,
          item.goodsDetailsId,
          ct1,
          this.list[index + 1].simpleGoodsEntity.categoryId,
          this.list[index + 1].goodsId,
          this.list[index + 1].goodsDetailsId,
          ct2
        )
      }
      // 去对戒详情
      else if (item.goodsType == '19') {
        this.$router.push({
          name: 'marriage-ring-pair-ring-detail',
          query: {
            goodId: item.goodsId,
            ct: this.isLogin ? item.id : item.localSn,
            // dt1: item.goodsDetailsId,
            // dt2: this.list[index + 1].goodsDetailsId,
            ringType : 'pair'
          }
        })
      }
      // 去单品详情
      else if(item.groupType === 0) {
        if (item.simpleGoodsEntity.categoryId === 20) {
          // 是个莫桑石💎
          this.$router.push({
            name: 'diamond-diamonds',
            query: {
              goodId: item.goodsId,
              cartId: this.isLogin ? item.id : item.localSn
            }
          })
        } else if (parseInt(item.simpleGoodsEntity.categoryId) === 2) {
          //  console.log('还是个結婚戒指💍')
            this.$router.push({
              name: 'marriage-ring-single-ring-detail',
              query: {
                goodId: item.goodsId,
                cartId: this.isLogin ? item.id : item.localSn,
                ringType : 'single'

              }
            })
        }else if (parseInt(item.simpleGoodsEntity.categoryId) === 12) {
          // console.log('还是个訂婚戒指💍')
            this.$router.push({
              name: 'engagement-engagement-rings',
              query: {
                goodId: item.goodsId,
                cartId: this.isLogin ? item.id : item.localSn
              }
            })
        } else {
          // 饰品
          this.$router.push({
            name: 'accessories-accessories',
            query: {
              goodId: item.goodsId,
              cartId: this.isLogin ? item.id : item.localSn
            }
          })
        }
      }
    },
    goToMade(ct1, gs1, gd1, ci1, ct2, gs2, gd2, ci2) {
      // console.log('11', ct1, gs1, gd1, ci1, ct2, gs2, gd2, ci2)
      const obj = {
        steps: [
          {
            goodsId: gs1,
            goodsDetailsId: gd1,
            ct: ct1 === 15 ? 1 : 2,
            goodsType: ct1,
            cartId: ci1,
            page: `detail`
          },
          {
            goodsId: gs2,
            goodsDetailsId: gd2,
            ct: ct2 === 15 ? 1 : 2,
            goodsType: ct2,
            cartId: ci2,
            page: `detail`
          }
        ]
      }
      // console.log("obj",obj,gs2)
      this.$router.push({
        name: `custom-made-${this.switchName(ct1)}-made-${this.switchName(
          ct2
        )}-detail`,
        query: {
          melo: this.$helpers.base64Encode(JSON.stringify(obj)),
          step: 3,
          goodId: gs2
        }
      })
    },
    closePop() {
      this.ifShowPop = false
    },
    // 编辑商品属性
    showEdit(attr, i, type, typeB=null) {
      this.ifShowEditPopup = true;
      this.goods.url = attr.goodsImages;
      this.goods.coin = this.$store.state.coin;
      this.goods.price = attr.salePrice;
      this.goodsId = attr.goodsId;

      if(typeB != null){
          this.type = typeB == 0 ? 'doubleA' : 'doubleB'
      }else{
        this.type = type
      }

      this.selectIndex = i;

      this.cartEditId = attr.id;

      if(this.goodsId != -1){
        this.getAttrData()
      }
    },
    // 获取商品属性
    getAttrData() {
      this.$axios({
        method: 'post',
        url: '/web/goods/style/detail',
        data: {
          goodsId: this.goodsId || '',
          backend: ''
        },
        transformRequest: [
          function(data) {
            let ret = ''
            for (const it in data) {
              // 过滤空元素
              if (data[it] === '' || data[it] === null) {
                continue
              }
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.info = res;
          if(this.type == 'single'){
            this.getRingInfo()
          }else if(this.type == 'doubleA' || this.type == 'doubleB'){
            this.getDoubleInfoA()
            this.getDoubleInfoB()
          }else if(this.type == 'madeUpA'){
            this.getMakeUpInfoA()
          }else if(this.type == 'madeUpB'){
            this.getMakeUpInfoB()
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    getRingInfo() {
      const _this = this;
      let product = this.info ? JSON.parse(JSON.stringify(this.info)) : {};

      this.productData = Object.assign({}, product, {
        targetUser: (() => {
          const specs = product.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 26) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: product.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = product.sizes || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = product.carats || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: product.specs || [],
        details: product.details || [],
        goodsServicesJsons: (product.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })

      var attrs = this.list[this.selectIndex].simpleGoodsEntity.detailConfig,
          attrCarats = this.productData.carats,
          attrMaterials = this.productData.materials,
          attrSizes = this.productData.sizes;

      for(let n=0; n<attrCarats.length; n++){
        for(let o=0; o<attrs.length; o++){
          if(attrs[o].configId == 59 && attrCarats[n].id == attrs[o].configAttrId){
            this.selected.caratIndex = n;
            this.caratsText = attrs[o].configVal;
            break;
          }
        }
      }
        
      for(let i=0; i<attrMaterials.length; i++){
        for(let j=0; j<attrs.length; j++){
          if(attrs[j].configId == 10 && attrMaterials[i].id == attrs[j].configAttrId){
            this.selected.materialIndex = i;
            this.materialsText = attrs[j].configVal;
            break;
          }
        }
      }
        
      for(let k=0; k<attrSizes.length; k++){
        for(let l=0; l<attrs.length; l++){
          if(attrs[l].configId == 38 && attrSizes[k].id == attrs[l].configAttrId){
            this.selected.sizeIndex = k;
            this.sizesText = attrs[l].configVal;
            break;
          }
        }
      }

      if(this.colorDetail.length){
        var attrColorId = this.list[this.selectIndex].goodsAttr[0].configAttrId;

        for(let m=0; m<this.colorDetail.length; m++){
          if(this.colorDetail[m].id == attrColorId){
            this.selected.colorIndex = m;
            this.colorText = this.list[this.selectIndex].goodsAttr[0].configVal;
            break;
          }
        }
      }
    },
    getDoubleInfoA() {
      const _this = this;
      let productA = _this.info && _this.info.ring && _this.info.ring[0]
      ? JSON.parse(JSON.stringify(_this.info.ring[0])) : {};

      this.productDataA = Object.assign({}, productA, {
        targetUser: (() => {
          const specs = productA.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 26) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: productA.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = productA.sizes || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = productA.carats || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: productA.specs || [],
        details: productA.details || [],
        goodsServicesJsons: (productA.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })

      var attrs = this.list[this.selectIndex].sku[0].lang.goods_spec,
          attrCarats = this.productDataA.carats,
          attrMaterials = this.productDataA.materials,
          attrSizes = this.productDataA.sizes;

      for(let n=0; n<attrCarats.length; n++){
        for(let o=0; o<attrs.length; o++){
          if(attrs[o].attr_id == 59 && attrCarats[n].id == attrs[o].value_id){
            this.doubleSelectedA.caratIndex = n;
            break;
          }
        }
      }
        
      for(let i=0; i<attrMaterials.length; i++){
        for(let j=0; j<attrs.length; j++){
          if(attrs[j].attr_id == 10 && attrMaterials[i].id == attrs[j].value_id){
            this.doubleSelectedA.materialIndex = i;
            break;
          }
        }
      }
        
      for(let k=0; k<attrSizes.length; k++){
        for(let l=0; l<attrs.length; l++){
          if(attrs[l].attr_id == 38 && attrSizes[k].id == attrs[l].value_id){
            this.doubleSelectedA.sizeIndex = k;
            break;
          }
        }
      }

      if(this.firstRingColorDetail.length){
        var attrColorId = this.list[this.selectIndex].goodsAttr[0].configAttrId;

        for(let m=0; m<this.firstRingColorDetail.length; m++){
          if(this.firstRingColorDetail[m].id == attrColorId){
            this.doubleSelectedA.colorIndex = m;
            break;
          }
        }
      }
    },
    getDoubleInfoB() {
      const _this = this;
      let productB = _this.info && _this.info.ring && _this.info.ring[1]
       ? JSON.parse(JSON.stringify(_this.info.ring[1])) : {};

      this.productDataB = Object.assign({}, productB, {
        targetUser: (() => {
          const specs = productB.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 26) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: productB.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = productB.sizes || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = productB.carats || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: productB.specs || [],
        details: productB.details || [],
        goodsServicesJsons: (productB.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })

      var attrs = this.list[this.selectIndex].sku[1].lang.goods_spec,
          attrCarats = this.productDataB.carats,
          attrMaterials = this.productDataB.materials,
          attrSizes = this.productDataB.sizes;

      for(let n=0; n<attrCarats.length; n++){
        for(let o=0; o<attrs.length; o++){
          if(attrs[o].attr_id == 59 && attrCarats[n].id == attrs[o].value_id){
            this.doubleSelectedB.caratIndex = n;
            break;
          }
        }
      }
      
      for(let i=0; i<attrMaterials.length; i++){
        for(let j=0; j<attrs.length; j++){
          if(attrs[j].attr_id == 10 && attrMaterials[i].id == attrs[j].value_id){
            this.doubleSelectedB.materialIndex = i;
            break;
          }
        }
      }
        
      for(let k=0; k<attrSizes.length; k++){
        for(let l=0; l<attrs.length; l++){
          if(attrs[l].attr_id == 38 && attrSizes[k].id == attrs[l].value_id){
            this.doubleSelectedB.sizeIndex = k;
            break;
          }
        }
      }

      if(this.secondRingColorDetail.length){
        var attrColorId = this.list[this.selectIndex].goodsAttr[1].configAttrId;

        for(let n=0; n<this.secondRingColorDetail.length; n++){
          if(this.secondRingColorDetail[n].id == attrColorId){
            this.doubleSelectedB.colorIndex = n;
            break;
          }
        }
      }
    },
    getMakeUpInfoA() {
      // const _this = this;
      // let productA = this.info ? JSON.parse(JSON.stringify(this.info)) : {};

      // this.productDataA = Object.assign({}, productA, {
      //   targetUser: (() => {
      //     const specs = productA.specs || []
      //     let result = '--'
      //     specs.forEach(item => {
      //       if (item.configId === 26) {
      //         result = item.configAttrVal
      //       }
      //     })
      //     return result
      //   })(),
      //   materials: productA.materials || [],
      //   // sizes: product.sizes || [],
      //   sizes:(() =>{
      //       const sizes = productA.sizes || []
      //       // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
      //       return sizes;
      //   })(),
      //   carats:(() =>{
      //       const carats = productA.carats || []
      //       // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
      //       return carats;
      //   })(),
      //   specs: productA.specs || [],
      //   details: productA.details || [],
      //   goodsServicesJsons: (productA.goodsServicesJsons || []).map(item => {
      //     item.img = _this.imageStrToArray(item.img)
      //     return item
      //   })
      // })

      // var attrs = this.good[this.index].data[1].simpleGoodsEntity.detailConfig,
      // attrCarats = this.productDataA.carats,
      // attrMaterials = this.productDataA.materials,
      // attrSizes = this.productDataA.sizes;

      // for(let n=0; n<attrCarats.length; n++){
      //   for(let o=0; o<attrs.length; o++){
      //     if(attrs[o].configId == 59 && attrCarats[n].id == attrs[o].configAttrId){
      //       this.madeUpSelectedA.caratIndex = n;
      //       break;
      //     }
      //   }
      // }
        
      // for(let i=0; i<attrMaterials.length; i++){
      //   for(let j=0; j<attrs.length; j++){
      //     if(attrs[j].configId == 10 && attrMaterials[i].id == attrs[j].configAttrId){
      //       this.madeUpSelectedA.materialIndex = i;
      //       break;
      //     }
      //   }
      // }
        
      // for(let k=0; k<attrSizes.length; k++){
      //   for(let l=0; l<attrs.length; l++){
      //     if(attrs[l].configId == 38 && attrSizes[k].id == attrs[l].configAttrId){
      //       this.madeUpSelectedA.sizeIndex = k;
      //       break;
      //     }
      //   }
      // }

      // if(this.colorDetailA.length){
      //   var attrColorId = this.good[this.index].data[0].goodsAttr[0].configAttrId;

      //   for(let m=0; m<this.colorDetailA.length; m++){
      //     if(this.colorDetailA[m].id == attrColorId){
      //       this.madeUpSelectedA.colorIndex = m;
      //       break;
      //     }
      //   }
      // }
    },
    getMakeUpInfoB() {
      const _this = this;
      let productB = this.info ? JSON.parse(JSON.stringify(this.info)) : {};

      this.productDataB = Object.assign({}, productB, {
        targetUser: (() => {
          const specs = productB.specs || []
          let result = '--'
          specs.forEach(item => {
            if (item.configId === 26) {
              result = item.configAttrVal
            }
          })
          return result
        })(),
        materials: productB.materials || [],
        // sizes: product.sizes || [],
        sizes:(() =>{
            const sizes = productB.sizes || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return sizes;
        })(),
        carats:(() =>{
            const carats = productB.carats || []
            // sizes.unshift({id:'',name: this.$t(`personal.index.select`)})
            return carats;
        })(),
        specs: productB.specs || [],
        details: productB.details || [],
        goodsServicesJsons: (productB.goodsServicesJsons || []).map(item => {
          item.img = _this.imageStrToArray(item.img)
          return item
        })
      })


      var attrs = this.list[this.selectIndex].simpleGoodsEntity.detailConfig,
      attrCarats = this.productDataB.carats,
      attrMaterials = this.productDataB.materials,
      attrSizes = this.productDataB.sizes;

      for(let n=0; n<attrCarats.length; n++){
        for(let o=0; o<attrs.length; o++){
          if(attrs[o].configId == 59 && attrCarats[n].id == attrs[o].configAttrId){
            this.madeUpSelectedB.caratIndex = n;
            break;
          }
        }
      }
        
      for(let i=0; i<attrMaterials.length; i++){
        for(let j=0; j<attrs.length; j++){
          if(attrs[j].configId == 10 && attrMaterials[i].id == attrs[j].configAttrId){
            this.madeUpSelectedB.materialIndex = i;
            break;
          }
        }
      }
        
      for(let k=0; k<attrSizes.length; k++){
        for(let l=0; l<attrs.length; l++){
          if(attrs[l].configId == 38 && attrSizes[k].id == attrs[l].configAttrId){
            this.madeUpSelectedB.sizeIndex = k;
            break;
          }
        }
      }

      if(this.colorDetailB.length){
        var attrColorId = this.list[this.selectIndex].goodsAttr[0].configAttrId;

        for(let m=0; m<this.colorDetailB.length; m++){
          if(this.colorDetailB[m].id == attrColorId){
            this.madeUpSelectedB.colorIndex = m;
            break;
          }
        }
      }

      this.goodsId = this.list[this.selectIndex].goodsId;

      this.$axios({
        method: 'post',
        url: '/web/goods/style/detail',
        data: {
          goodsId: this.goodsId || '',
          backend: ''
        },
        transformRequest: [
          function(data) {
            let ret = ''
            for (const it in data) {
              // 过滤空元素
              if (data[it] === '' || data[it] === null) {
                continue
              }
              ret +=
                encodeURIComponent(it) +
                '=' +
                encodeURIComponent(data[it]) +
                '&'
            }
            return ret
          }
        ],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.info = res;
          this.diamondPrice = res.salePrice
          this.diamondGoodInfo.goodsDetailsId = res.details[0].id,
          this.diamondGoodInfo.goods_id = res.details[0].goodsId,
          this.diamondGoodInfo.goods_type = res.details[0].categoryId
        })
        .catch(err => {
          console.error(err)
        })
    },
    // 选择成色
    chooseAttr(type, i) {
      if(this.type == 'single'){
        switch (type) {
          case 'carats':
            this.selected.caratIndex = i;
            break;
          case 'materials':
            this.selected.materialIndex = i;
            break;
          case 'size':
            this.selected.sizeIndex = i;
            break;
          case 'color':
            this.selected.colorIndex = i;
            break;
          default:
            break;
        }

        this.goods.price = this.simpleDetail.retailMallPrice
      }else if(this.type == 'doubleA'){
        switch (type) {
          case 'carats':
            this.doubleSelectedA.caratIndex = i;
            break;
          case 'materials':
            this.doubleSelectedA.materialIndex = i;
            break;
          case 'size':
            this.doubleSelectedA.sizeIndex = i;
            break;
          case 'color':
            this.doubleSelectedA.colorIndex = i;
            break;
          default:
            break;
        }

        this.getCategoryId()
      }else if(this.type == 'doubleB'){
        switch (type) {
          case 'carats':
            this.doubleSelectedB.caratIndex = i;
            break;
          case 'materials':
            this.doubleSelectedB.materialIndex = i;
            break;
          case 'size':
            this.doubleSelectedB.sizeIndex = i;
            break;
          case 'color':
            this.doubleSelectedB.colorIndex = i;
            break;
          default:
            break;
        }

        this.getCategoryId()
      }else if(this.type == 'madeUpB'){
        switch (type) {
          case 'carats':
            this.madeUpSelectedB.caratIndex = i;
            break;
          case 'materials':
            this.madeUpSelectedB.materialIndex = i;
            break;
          case 'size':
            this.madeUpSelectedB.sizeIndex = i;
            break;
          case 'color':
            this.madeUpSelectedB.colorIndex = i;
            break;
          default:
            break;
        }

        this.goods.price = this.madeUpDetailB.retailMallPrice
      }
    },
    // 获取对戒ID
    getCategoryId() {
      var goosIdA = -1, goosIdB = -1;

      let lenA = this.productDataA.details.length;
      for(let o=0; o<lenA; o++){
        if(this.caratsA[this.doubleSelectedA.caratIndex].id == this.productDataA.details[o].carat &&
          this.materialsA[this.doubleSelectedA.materialIndex].id == this.productDataA.details[o].material &&
          this.sizesA[this.doubleSelectedA.sizeIndex].id == this.productDataA.details[o].size)
        {
          goosIdA = this.productDataA.details[o].id;
          this.firstRingColorAttrs[0].goods_id = this.productDataA.details[o].id;
          break
        }
      }

      let lenB = this.productDataB.details.length;
      for(let p=0; p<lenA; p++){
        if(this.caratsB[this.doubleSelectedB.caratIndex].id == this.productDataB.details[p].carat &&
          this.materialsB[this.doubleSelectedB.materialIndex].id == this.productDataB.details[p].material &&
          this.sizesB[this.doubleSelectedB.sizeIndex].id == this.productDataB.details[p].size)
        {
          goosIdB = this.productDataB.details[p].id;
          this.secondRingColorAttrs[0].goods_id = this.productDataB.details[p].id;
          break
        }
      }
      
      let lenC = this.info.details.length;
      for(let q=0; q<lenC; q++){
        if(this.info.details[q].ladyRing == goosIdA && this.info.details[q].menRing == goosIdB || 
          this.info.details[q].ladyRing == goosIdB && this.info.details[q].menRing == goosIdA)
        {
          this.categoryId = this.info.details[q].categoryId;
          this.goodsDetailsId = this.info.details[q].id;
          this.goods.price = this.info.details[q].retailMallPrice;
          break
        }
      }
    },
    // 重置数据
    resetData() {
      this.type = '';
      this.productData = {}
      this.productDataA = {}
      this.productDataB = {}
      this.selected = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.doubleSelectedA = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.doubleSelectedB = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.madeUpSelectedA = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.madeUpSelectedB = {
        caratIndex : -1,
        materialIndex : -1,
        sizeIndex : -1,
        colorIndex : -1
      }
      this.colorAttrs = [
        {
          config_id:'',
          config_attr_id:''
        }
      ]
      this.firstRingColorAttrs = [
        {
          goods_id:'',
          config_id:'',
          config_attr_id:''
        }
      ]
      this.secondRingColorAttrs = [
        {
          goods_id:'',
          config_id:'',
          config_attr_id:''
        }
      ]
      this.madeUpColorAttrs = [
        {
          config_id:'',
          config_attr_id:''
        }
      ]
    },
    // 确认选择属性
    confirmAttr() {
      var _this = this;
      var goodInfo = [];

      if(this.type == 'single'){
        let colorArr = this.goodsAttrs.filter(item=>item.config_id !== null && item.config_attr_id !== null)   //筛选色彩中为空的对象

        goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId: _this.simpleDetail.id,
            goodsId: _this.goodsId,
            groupId: null,
            groupType: null,
            goodsType:_this.simpleDetail.categoryId,
            serviceId: 0,
            serviceVal: 'string',
            goods_attr: colorArr,   //色彩
            id: this.cartEditId
          }
        ]
      }else if(this.type == 'doubleA' || this.type == 'doubleB'){
        goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId: _this.goodsDetailsId,
            goodsId: _this.goodsDetailsId,
            groupId: null,
            groupType: null,
            serviceId: 0,
            serviceVal: 'string',
            goodsType: _this.categoryId,
            goods_attr: _this.doubleRingGoodsAttrs,  //色彩
            id: this.cartEditId
          }
        ]
      }else if(this.type == 'madeUpB'){
        const timeSock = new Date().getTime()
        goodInfo = [
          {
            goodsCount: 1,
            goodsDetailsId: this.diamondGoodInfo.goodsDetailsId,
            goodsId: this.diamondGoodInfo.goods_id,
            goodsType: this.diamondGoodInfo.goods_type,
            groupId: timeSock,
            groupType: 2,
            serviceId: 0,
            serviceVal: 'string',
            id: this.cartEditId
          },
          {
            goodsCount: 1,
            goodsDetailsId: _this.madeUpDetailB.id,
            goodsId: _this.madeUpDetailB.id,
            goodsType:_this.madeUpDetailB.categoryId,
            groupId: timeSock,
            groupType: 2,
            serviceId: 0,
            serviceVal: 'string',
            id: this.cartEditId
          }
        ]
      }

      let goodsIndex = _this.selectIndex;
      _this.$store
        .dispatch('editCart', [goodInfo,goodsIndex])
        .then(data => {
          _this.$toast.show(this.lang.changeAttrSuccess)
          _this.ifShowEditPopup = false;
          _this.resetData()
          if(_this.isLogin){
            _this.getList()
          }else{
            _this.getLocalCart()
          }
        })
        .catch(err => {
          _this.ifShowEditPopup = false;
          _this.resetData()
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">
.address {
  min-height: 100vh;
  background: #f5f5f5;
  .content {
    display: inline-block;
    width: 100%;
    .mod {
      width: 100%;
      background: rgba(255, 255, 255, 1);
      ul {
        background: #f2f2f2;
        margin-bottom: 50px;
        li {
          position: relative;
          .mod-item {
            display: inline-block;
            width: 100%;
            background: #ffffff;
            padding: 34px 14px 20px;
            margin-top: 8px;
          }
          .left-box{
            position: relative;
            float: left;
            width: 125px;
            height: 125px;

            .activity-sign{
              width: 60px;
              height: 60px;
              bottom: -5px;
              right: -3px;

              .triangle{
                padding-top: 34px;
                padding-left: 4px;
                font-size: 13px;
              }
            }
          }
          .left-box.on{
            border: 1px solid red;
          }
          .left-box.marginTop{
            margin-top: 50px;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .failed {
            position: absolute;
            top: 42px;
            left: 14px;
            width: 125px;
            height: 125px;
            font-size: 14px;
            font-family: PingFangHK-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 125px;
            background: rgba(51, 51, 51, 0.2);
          }
          .single{
            .right {
              margin-left: 140px;
              padding-bottom: 24px;
              border-bottom: 1px solid #f5f5f5;
              text-align: left;
              min-height: 125px;
              .cut-line{
                height:1px;
                display:inline-block;
                background:#f5f5f5;
                width:50%;
              }
              h4 {
                display: inline-block;
                max-height: 40px;
                font-size: 14px;
                line-height: 20px;
                font-family: PingFangHK-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              p {
                font-size: 13px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
              .p {
                margin-bottom: 4px;
              }
              b {
                font-size: 17px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(243, 163, 145, 1);
                font-family: twCenMt;
              }
              .btn-type {
                position: absolute;
                top: 230px;
                left: 34px;
                width: 80px;
                height: 26px;
                text-align: center;
                background: rgba(245, 240, 236, 1);
                border: 1px solid rgba(215, 202, 196, 1);
                border-radius: 4px;
                font-size: 12px;
                line-height: 26px;
                font-weight: 400;
                color: rgba(148, 116, 101, 1);
              }
            }
          }
          .double{
            .old-price{
              margin-left: 140px;
              text-align: left;
            }
            b{
              font-size: 17px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(243, 163, 145, 1);
              font-family: twCenMt;
              // margin-left: 15px;
            }
            .double-ring-price{
              font-size: 17px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(243, 163, 145, 1);
              font-family: twCenMt;
              text-align: left;
              margin-left: 140px;
              // margin-right:20px;
              // margin-left: 65px;
              margin-top: 10px;
            }
            .now-price{
              font-size: 17px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(243, 163, 145, 1);
              font-family: twCenMt;
              margin-left: 140px;
            }
            .cut-line{
              height:1px;
              display:inline-block;
              background:#f5f5f5;
              width: 57%;
              margin-left: 136px;
            }
            h4 {
              display: inline-block;
              width: 60%;
              text-align: left;
              padding-left: 10px;
                max-height: 40px;
                font-size: 14px;
                line-height: 20px;
                font-family: PingFangHK-Regular;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                // margin-right: 100px;
              // max-height: 40px;
              // font-size: 14px;
              // line-height: 20px;
              // font-family: PingFangHK-Regular;
              // font-weight: 400;
              // color: rgba(51, 51, 51, 1);
              // text-align: left;
              // padding-left: 15px;
            }
            p {
              font-size: 13px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
            .p {
              // margin-bottom: 4px;
            }
            .sku{
              margin-bottom: 10px;
              text-align: left;
              margin-left: 140px;
            }
            .right {
              margin-left: 140px;
              padding-bottom: 5px;
              // border-bottom: 1px solid #f5f5f5;
              text-align: left;
              // min-height: 65px; 
              .cut-line{
                height:1px;
                display:inline-block;
                background:#f5f5f5;
                width:50%;
              }
              
              b {
                font-size: 17px;
                line-height: 20px;
                font-weight: 400;
                color: rgba(243, 163, 145, 1);
                font-family: twCenMt;
              }
              
              .btn-type {
                position: absolute;
                top: 174px;
                left: 34px;
                width: 80px;
                height: 26px;
                text-align: center;
                background: rgba(245, 240, 236, 1);
                border: 1px solid rgba(215, 202, 196, 1);
                border-radius: 4px;
                font-size: 12px;
                line-height: 26px;
                font-weight: 400;
                color: rgba(148, 116, 101, 1);
              }
              
            }
            .right:last-child {
              // padding-bottom: 15px;
              border-bottom: 1px solid #f5f5f5;
              .ow-h2{
                display: none;
              }
              .sku{
                display: none;
              }
            }
            .btn-type.marginTop{
              margin-top: 60px;
            }
          }

          .customization{
            .left-box.marginTop{
              margin-top: 30px;
            }
            .right{
              .btn-type {
                position: absolute;
                top: 210px;
                left: 34px;
                width: 80px;
                height: 26px;
                text-align: center;
                background: rgba(245, 240, 236, 1);
                border: 1px solid rgba(215, 202, 196, 1);
                border-radius: 4px;
                font-size: 12px;
                line-height: 26px;
                font-weight: 400;
                color: rgba(148, 116, 101, 1);
              }
            }
          }
          
          .domore {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 20px;
            margin-top: 16px;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
            text-align: right;
            color: rgba(153, 153, 153, 1);
            .select-icon {
              width: 40px;
              height: 40px;
              text-align: center;
              margin: 0px 0 0 40px;
              cursor: pointer;
            }
            .remove{
              margin-top: 10px;
            }
            .num{
              margin-top: 10px;
            }
              i{
                width: 18px;
                height: 18px;
                text-align: center;
                font-size: 18px;
                line-height: 18px;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(153, 153, 153, 1);
                border-radius: 50%;
                margin: 11px auto 0;
                display: block;
              }
              .icongou {
                background: rgba(242, 155, 135, 1);
                color: #ffffff;
                border: 1px solid rgba(242, 155, 135, 1);
              }
            .iconicon-test2 {
              float: left;
              margin: 0;
              border: none;
            }
            .similar {
              width: 75px;
              text-align: center;
            }
            .remove {
              cursor: pointer;
            }
            .num {
              color: rgba(102, 102, 102, 1);
            }
            a {
              text-decoration: underline;
              color: rgba(206, 163, 160, 1);
              cursor: pointer;
            }
          }
          .findsimilar{
            text-align: right;
            margin-top: 15px;
            font-size: 14px;
            .similar {
              width: 125px;
            }
            a{
              text-decoration: underline;
              color: rgba(206, 163, 160, 1);
              cursor: pointer;
            }
          }
        }
      }
    }
    .bottom {
      position: fixed;
      left: 0px;
      bottom: 0px;
      z-index: 2;
      width: 100%;
      height: 50px;
      background: #ffffff;
      font-size: 14px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      text-align: left;
      box-shadow: 0px -1px 6px 0px rgba(172, 172, 172, 0.59);
      i {
        float: left;
        width: 18px;
        height: 18px;
        text-align: center;
        font-size: 18px;
        line-height: 18px;
        margin: 14px 5px 0 12px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 50%;
        cursor: pointer;
      }
      .icongou {
        background: rgba(242, 155, 135, 1);
        color: #ffffff;
        border: 1px solid rgba(242, 155, 135, 1);
      }
      span {
        float: left;
        font-size: 14px;
        line-height: 50px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .order {
        float: left;
        height: 50px;
        width: 160px;
        padding: 5px 0 5px 18px;
        font-size: 14px;
        line-height: 20px;
        color: rgba(51, 51, 51, 1);
        text-align: left;
        span {
          display: inline-block;
          width: 100%;
          font-size: 14px;
          line-height: 18px;
        }
        .small {
          font-size: 18px;
          line-height: 22px;
          font-family: twCenMt;
          font-weight: 400;
          color: #f29b87;
        }
      }
      .btn {
        float: right;
        height: 50px;
        padding: 0 10px;
        background: rgba(242, 155, 135, 1);
        font-size: 16px;
        text-align: center;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  .old-price{
    font-size: 12px;
    margin-bottom: 6px;
  }

  .discount-price{
    padding: 0;
  }

  i{
    font-style: normal;
  }

  .edit-popup{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 22;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    .edit-box{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      padding: 20px 20px 12px;

      .quit{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        font-size: 18px;
      }

      .edit-info{
        width: 100%;
        height: 100%;

        .info-top{
          height: 80px;
          display: flex;
          align-items: flex-end;

          .goods-img{
            width: 80px;
            height: 80px;
            overflow: hidden;

            img{
              width: 100%;
              height: 100%;
            }
          }

          .goods-price{
            font-size: 18px;
            font-weight: bold;
            margin-left: 20px;
          }
        }

        .attr-list{
          margin-top: 20px;
          .attr-text{
            text-align: left;
            margin-bottom: 14px;
          }
          .attr-box{
            display: flex;
            flex-wrap: wrap;

            .attr-child{
              width: 80px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              border: 1px solid #ccc;
              border-radius: 2px;
              color: #555;
              margin: 0 10px 20px 0;
              padding: 0 2px;
              box-sizing: border-box;
              white-space: nowrap;
              overflow: hidden;
            }

            .active{
              background-color: #f29b87;
              border-color: #f29b87;
              color: #fff;
            }
          }
        }

        .sizes{
          .attr-child{
            width: 36px !important;
            height: 30px;
          }
        }

        .colors{
          .attr-child{
            width: 46px !important;
            height: 30px;
          }

        }

        .confirm{
          width: 100%;
          height: 40px;
          background-color: #ff6900;
          line-height: 40px;
          text-align: center;
          color: #fff;
          border-radius: 4px;
          margin-top: 30px;
        }
      }
    }
  }
}

.edit{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(/icon/edit.png) no-repeat center;
  background-size: 100% 100%;
  margin-left: 20px;
  vertical-align: sub;
}

.product-list{
  margin-top: 50px;
  background: #fff;
  .list-part{
    background: #fff;
    .list{
      background: #f5f5f5;
      padding: 5px;
    }
    .title{
      text-align: center;
      display: block!important;
      font-size:14px;
      padding: 5px!important;
    }
  }
  .look_more{
    margin: 6px 0;
    span{
      color:#FF6900;
      text-decoration: underline;
      font-size: 14px;
    }
  }
}
.list-part {
  @listPart();
}
</style>
