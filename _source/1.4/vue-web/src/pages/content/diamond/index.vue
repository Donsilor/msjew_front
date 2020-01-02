<template>
  <div class="customDiamond clearfix">
    <Header
      :title="lang.title"
      icon="&#xe644;"
      typeId="1"
      @refresh="infoCustom()"/>
    <div class="selcet shape">
      <div class="title">
        <span class="clearfix">{{ lang.shape }}</span>
        <el-popover
          placement="right"
          width="420"
          trigger="hover">
          <div class="pop-shape clearfix">
            <ul>
              <li v-for="(item,index) in lang.diamondTest.shape">
                <img
                  :class="{img:shapeIdIndex2 === index}"
                  :src="'../../../../static/images/diamond/' + item.url"
                  @click="shape2(index)" >
                <h6 v-show="shapeIdIndex2 === index">{{ item.name }}</h6>
                <p v-if="shapeIdIndex2 === index">{{ item.test1 }}</p>
              </li>
            </ul>
            <p v-if="shapeIdIndex2==-1">{{ lang.shapeText }}</p>
          </div>
          <b slot="reference">!</b>
        </el-popover>
      </div>
      <div class="content">
        <ul>
          <li v-for="(item, index) in lang.diamond[1].list">
            <p><i
              :class="(allCanChose?'':'not-can-chose')+(shapeIdIndex == index?' active':'')"
              class="icon iconfont icon-font"
              @click="selcetShape(index)"
              v-html="item.icon"/></p>
            <span
              :class="(allCanChose?'':'not-can-chose-text')+(shapeIdIndex == index?'active-text':'')"
              class="text">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="selcet price">
      <div class="title">
        <span class="clearfix">{{ lang.price }}</span>
      </div>
      <div class="content">
        <div class="range">
          <div>
            <i>{{ coin }}</i><input
              v-model="priceMin"
              class="start"
              @blur="inpPriceBlur"
              @focus="inpPriceFocus"
              @change="inpPrice" >
          </div>
          <span>{{ lang.to }}</span>
          <div>
            <i>{{ coin }}</i><input
              :min="priceRang[0]"
              :max="priceRang[1]"
              v-model="priceMax"
              class="end"
              type="tel"
              step="0.01"
              @blur="inpPriceBlur"
              @focus="inpPriceFocus"
              @change="inpPrice" >
          </div>
        </div>
        <el-slider
          v-model="priceRang"
          :min="searchPrice.minPrice"
          :max="searchPrice.maxPrice"
          range
          @change="priceRangChange"/>
        <div class="fast">
          <span @click="priceSelcetFast('1',searchPrice.step1,searchPrice.step2)">{{ formatMoney(searchPrice.step1,0)+'-'+formatMoney(searchPrice.step2,0) }}</span>
          <span @click="priceSelcetFast('2',searchPrice.step2,searchPrice.step3)">{{ formatMoney(searchPrice.step2,0)+'-'+formatMoney(searchPrice.step3,0) }}</span>
          <span @click="priceSelcetFast('3',searchPrice.step3,searchPrice.step4)">{{ formatMoney(searchPrice.step3,0)+'-'+formatMoney(searchPrice.step4,0) }}</span>
        </div>
      </div>
    </div>
    <div
      class="selcet carat"
      style="margin-right: 0;">
      <div class="title">
        <span class="clearfix">{{ lang.carat }}</span>
        <el-popover
          placement="right"
          width="400"
          trigger="hover">
          <div class="pop-carat clearfix">
            <img :src="caratList[caratIndex].img" >
            <ul>
              <li v-for="(item,index) in caratList"><span
                :class="{active:caratIndex==index}"
                @click="caratIndex=index">{{ item.name }}</span></li>
            </ul>
            <div>
              {{ lang.caratText }}
            </div>
          </div>
          <b slot="reference">!</b>
        </el-popover>
      </div>
      <div class="content">
        <div class="range">
          <input
            v-model="caratMin"
            class="start"
            @change="inpCarat" >
          <span>{{ lang.to }}</span>
          <input
            v-model="caratMax"
            class="start"
            @change="inpCarat" >
        </div>
        <el-slider
          v-model="caratRang"
          :step="0.01"
          :min="0"
          :max="10"
          range
          @change="caratRangChange"/>
        <div class="fast">
          <span @click="caratSelcetFast('1',0.25,0.70)">0.25-0.70</span>
          <span @click="caratSelcetFast('2',0.75,1.02)">0.75-1.02</span>
          <span @click="caratSelcetFast('3',1.50,3.00)">1.50-3.00</span>
        </div>
      </div>
    </div>
    <div class="cut selcet">
      <div class="title">
        <span>{{ lang.cut }}</span>
        <el-popover
          placement="right"
          width="320"
          trigger="hover">
          <div class="pop-cut clearfix">
            <img :src="cutList[cutIndex].img" >
            <ul>
              <li v-for="(item,index) in cutList"><span
                :class="{active:cutIndex==index}"
                @click="cutIndex=index">{{ item.name }}</span></li>
            </ul>
            <div><span>{{ cutList[cutIndex].name }}：</span>{{ cutList[cutIndex].desc }}</div>
          </div>
          <b slot="reference">!</b>
        </el-popover>
      </div>
      <div class="title-rang clearfix">
        <div
          :class="{rangtitle: cutMin <= 1 }"
          @click="cutRangChange(1)">{{ lang.cut1 }}</div>
        <div
          :class="{rangtitle: cutMin <= 2 && 2 < cutMax}"
          @click="cutRangChange(2)">{{ lang.cut2 }}</div>
        <div
          :class="{rangtitle: 4 <= cutMax}"
          @click="cutRangChange(3)">{{ lang.cut3 }}</div>
      </div>
      <div class="content">
        <div class="range">
          <div class="rang-bg">
            <div
              :class="{stop1: cutMin <= 1 }"
              class="stop first-span"
              @click="cutRangChange(1)"><span v-if="cutMin == 1"><div class="img"/></span></div>
            <div
              :class="{stop2: cutMin <= 2 && 2 < cutMax}"
              class="stop"
              @click="cutRangChange(2)"><span v-if="cutMin == 2 || cutMax == 2"><div class="img"/></span></div>
            <div
              :class="{stop4: 4 <= cutMax}"
              class="stop last-span"
              @click="cutRangChange(3)">
              <span v-if="cutMin == 3 || cutMax == 3"><div class="img"/></span>
              <span
                v-if="cutMax >=4"
                class="last-span"><div class="img"/></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="color selcet">
      <div class="title">
        <span>{{ lang.color }}</span>
        <el-popover
          placement="right"
          width="320"
          trigger="hover">
          <div class="pop-color clearfix">
            <img :src="colorList[colorIndex].img" >
            <ul>
              <li v-for="(item,index) in colorList"><span
                :class="{active:colorIndex==index}"
                @click="colorIndex=index">{{ item.name }}</span></li>
            </ul>
            <div><span>{{ colorList[colorIndex].name }}：</span>{{ colorList[colorIndex].desc }}</div>
          </div>
          <b slot="reference">!</b>
        </el-popover>
      </div>
      <div class="title-rang clearfix">
        <div
          :class="{rangtitle: colorMin <= 1 }"
          @click="colorRangChange(1)">D</div>
        <div
          :class="{rangtitle: colorMin <= 2 && 2 < colorMax}"
          @click="colorRangChange(2)">E</div>
        <div
          :class="{rangtitle: colorMin <= 3 && 3 < colorMax}"
          @click="colorRangChange(3)">F</div>
        <div
          :class="{rangtitle: colorMin <= 4 && 4 < colorMax}"
          @click="colorRangChange(4)">G</div>
        <div
          :class="{rangtitle: colorMin <= 5 && 5 < colorMax}"
          @click="colorRangChange(5)">H</div>
        <div
          :class="{rangtitle: colorMin <= 6 && 6 < colorMax}"
          @click="colorRangChange(6)">I</div>
        <div
          :class="{rangtitle: 8 <= colorMax}"
          @click="colorRangChange(7)">J</div>
      </div>
      <div class="content">
        <div class="range">
          <div class="rang-bg">
            <div
              :class="{stop1: colorMin <= 1 }"
              class="stop first-span"
              @click="colorRangChange(1)"><span v-if="colorMin == 1"><div class="img"/></span></div>
            <div
              :class="{stop2: colorMin <= 2 && 2 < colorMax}"
              class="stop"
              @click="colorRangChange(2)"><span v-if="colorMin == 2 || colorMax == 2"><div class="img"/></span></div>
            <div
              :class="{stop3: colorMin <= 3 && 3 < colorMax}"
              class="stop"
              @click="colorRangChange(3)"><span v-if="colorMin == 3 || colorMax == 3"><div class="img"/></span></div>
            <div
              :class="{stop4: colorMin <= 4 && 4 < colorMax}"
              class="stop"
              @click="colorRangChange(4)"><span v-if="colorMin == 4 || colorMax == 4"><div class="img"/></span></div>
            <div
              :class="{stop5: colorMin <= 5 && 5 < colorMax}"
              class="stop"
              @click="colorRangChange(5)"><span v-if="colorMin == 5 || colorMax == 5"><div class="img"/></span></div>
            <div
              :class="{stop6: colorMin <= 6 && 6 < colorMax}"
              class="stop"
              @click="colorRangChange(6)"><span v-if="colorMin == 6 || colorMax == 6"><div class="img"/></span></div>
            <div
              :class="{stop7: 8 <= colorMax}"
              class="stop last-span"
              @click="colorRangChange(7)">
              <span v-if="colorMin == 7 || colorMax == 7"><div class="img"/></span>
              <span
                v-if="colorMax >=8"
                class="last-span"><div class="img"/></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clarity selcet">
      <div class="title">
        <span>{{ lang.clarity }}</span>
        <el-popover
          placement="right"
          width="400"
          trigger="hover">
          <div class="pop-cleanliness clearfix">
            <div>{{ lang.big }}</div>
            <img :src="cleantyList[cleantyIndex].img" >
            <ul>
              <li v-for="(item,index) in cleantyList"><span
                :class="{active:cleantyIndex==index}"
                @click="cleantyIndex=index">{{ item.name }}</span></li>
            </ul>
            <div><span>{{ cleantyList[cleantyIndex].name }}：</span>{{ cleantyList[cleantyIndex].desc }}</div>
          </div>
          <b slot="reference">!</b>
        </el-popover>
      </div>
      <div class="title-rang clearfix">
        <div
          :class="{rangtitle: clarityMin <= 1 }"
          @click="clarityRangChange(1)">SI2</div>
        <div
          :class="{rangtitle: clarityMin <= 2 && 2 < clarityMax}"
          @click="clarityRangChange(2)">SI1</div>
        <div
          :class="{rangtitle: clarityMin <= 3 && 3 < clarityMax}"
          @click="clarityRangChange(3)">VS2</div>
        <div
          :class="{rangtitle: clarityMin <= 4 && 4 < clarityMax}"
          @click="clarityRangChange(4)">VS1</div>
        <div
          :class="{rangtitle: clarityMin <= 5 && 5 < clarityMax}"
          @click="clarityRangChange(5)">VVS2</div>
        <div
          :class="{rangtitle: clarityMin <= 6 && 6 < clarityMax}"
          @click="clarityRangChange(6)">VVS1</div>
        <div
          :class="{rangtitle: clarityMin <= 7 && 7 < clarityMax}"
          @click="clarityRangChange(7)">IF</div>
        <div
          :class="{rangtitle: 9 <= clarityMax}"
          @click="clarityRangChange(8)">FL</div>
      </div>
      <div class="content">
        <div class="range">
          <div class="rang-bg">
            <div
              :class="{stop1: clarityMin <= 1 }"
              class="stop first-span"
              @click="clarityRangChange(1)"><span v-if="clarityMin == 1"><div class="img"/></span></div>
            <div
              :class="{stop2: clarityMin <= 2 && 2 < clarityMax}"
              class="stop"
              @click="clarityRangChange(2)"><span v-if="clarityMin == 2 || clarityMax == 2"><div class="img"/></span></div>
            <div
              :class="{stop3: clarityMin <= 3 && 3 < clarityMax}"
              class="stop"
              @click="clarityRangChange(3)"><span v-if="clarityMin == 3 || clarityMax == 3"><div class="img"/></span></div>
            <div
              :class="{stop4: clarityMin <= 4 && 4 < clarityMax}"
              class="stop"
              @click="clarityRangChange(4)"><span v-if="clarityMin == 4 || clarityMax == 4"><div class="img"/></span></div>
            <div
              :class="{stop5: clarityMin <= 5 && 5 < clarityMax}"
              class="stop"
              @click="clarityRangChange(5)"><span v-if="clarityMin == 5 || clarityMax == 5"><div class="img"/></span></div>
            <div
              :class="{stop6: clarityMin <= 6 && 6 < clarityMax}"
              class="stop"
              @click="clarityRangChange(6)"><span v-if="clarityMin == 6 || clarityMax == 6"><div class="img"/></span></div>
            <div
              :class="{stop6: clarityMin <= 7 && 7 < clarityMax}"
              class="stop"
              @click="clarityRangChange(7)"><span v-if="clarityMin == 7 || clarityMax == 7"><div class="img"/></span></div>
            <div
              :class="{stop7: 9 <= clarityMax}"
              class="stop last-span"
              @click="clarityRangChange(8)">
              <span v-if="clarityMin == 8 || clarityMax == 8"><div class="img"/></span>
              <span
                v-if="clarityMax >= 9"
                class="last-span"><div class="img"/></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="more-parame clearfix">
      <label @click="showMore = !showMore">{{ lang.more }}</label>
      <i
        v-show="showMore"
        class="icon iconfont">&#xe667;</i>
      <i
        v-show="!showMore"
        class="icon iconfont">&#xe666;</i>
      <ul v-show="showMore">
        <li>
          <span :class="{span:glossIndex}"/>
          <p>{{ lang.gloss }}</p>
          <div>
            <span
              :class="{active:glossIndex ===1}"
              @click="gloss(1)">{{ lang.gloss1 }}</span>
            <span
              :class="{active:glossIndex ===2}"
              @click="gloss(2)">{{ lang.gloss2 }}</span>
            <span
              :class="{active:glossIndex ===3}"
              @click="gloss(3)">{{ lang.gloss3 }}</span>
          </div>
        </li>
        <li>
          <span :class="{span:symmetricsIndex}"/>
          <p>{{ lang.symmetrics }}</p>
          <div>
            <span
              :class="{active:symmetricsIndex ===1}"
              @click="symmetrics(1)">{{ lang.gloss1 }}</span>
            <span
              :class="{active:symmetricsIndex ===2}"
              @click="symmetrics(2)">{{ lang.gloss2 }}</span>
            <span
              :class="{active:symmetricsIndex ===3}"
              @click="symmetrics(3)">{{ lang.gloss3 }}</span>
          </div>
        </li>
        <li>
          <span :class="{span:certificateIndex}"/>
          <p>{{ lang.certificate }}</p>
          <div>
            <span
              :class="{active:certificateIndex ===1}"
              @click="certificate(1)">GIA</span>
            <span
              :class="{active:certificateIndex ===2}"
              @click="certificate(2)">AGS</span>
            <span
              :class="{active:certificateIndex ===3}"
              @click="certificate(3)">IGI</span>
          </div>
        </li>
        <li>
          <span :class="{span:depthIndex[0] !=0 || depthIndex[1] !=100}"/>
          <p>{{ lang.depth }}</p>
          <div class="slider-m">
            <el-slider
              v-model="depthIndex"
              :min="0"
              :max="100"
              range
              @change="depthRangChange"/>
            <span>{{ depthIndex[0] }}%</span>
            <span class="span">{{ depthIndex[1] }}%</span>
          </div>
        </li>
        <li>
          <span :class="{span:stoneIndex[0] !=0 || stoneIndex[1] !=100}"/>
          <p>{{ lang.stone }}</p>
          <div class="slider-m">
            <el-slider
              v-model="stoneIndex"
              :min="0"
              :max="100"
              range
              @change="stoneRangChange"/>
            <span>{{ stoneIndex[0] }}%</span>
            <span class="span">{{ stoneIndex[1] }}%</span>
          </div>
        </li>
        <li>
          <span :class="{span:fluorescenceIndex}"/>
          <p>{{ lang.fluorescence }}</p>
          <div>
            <span
              :class="{active:fluorescenceIndex ===1}"
              @click="fluorescence(1)">{{ lang.fluorescence1 }}</span>
            <span
              :class="{active:fluorescenceIndex ===2}"
              @click="fluorescence(2)">{{ lang.fluorescence2 }}</span>
            <span
              :class="{active:fluorescenceIndex ===3}"
              @click="fluorescence(3)">{{ lang.fluorescence3 }}</span>
            <span
              :class="{active:fluorescenceIndex ===4}"
              @click="fluorescence(4)">{{ lang.fluorescence4 }}</span>
            <span
              :class="{active:fluorescenceIndex ===5}"
              @click="fluorescence(5)">{{ lang.fluorescence5 }}</span>
          </div>
        </li>
      </ul>
      <a
        class="clear-all"
        @click="clearAll">{{ lang.clear }}</a>
    </div>
    <div class="show-list">
      <div class="header">
        <h4>{{ lang.totalCount1 }}  ({{ page.totalCount }}  {{ lang.totalCount2 }})</h4>
        <p>{{ shapeIdIndex>=0?lang.diamondTest.shape[shapeIdIndex].test1:lang.test1 }}</p>
      </div>
      <ul class="title">
        <li
          :class="{active: titleIndex === 1}"
          @click="changeTitle(1)">{{ lang.totalCount }}({{ page.totalCount }}) <img src="../../../../static/images/diamond/arrow.png" > </li>
        <!--<li @click="changeTitle(2)" :class="{active: titleIndex === 2}">浏览足迹(18) <img src="../../../../static/images/diamond/arrow.png" /></li>-->
        <li
          :class="{active: titleIndex === 3}"
          @click="changeTitle(3)">{{ lang.contrast }}({{ contrastList && contrastList.length || '0' }}) <img src="../../../../static/images/diamond/arrow.png" ></li>
      </ul>
      <div
        v-show="titleIndex !== 3"
        class="change-viwe clearfix">
        <div
          :class="{activeviwe: viweIndex === 1}"
          class="border-r"
          @click="changeViwe(1)"><span>{{ lang.list }}</span><i class="icon iconfont">&#xe649;</i></div>
        <div
          :class="{activeviwe: viweIndex === 2}"
          @click="changeViwe(2)"><span>{{ lang.viwe }}</span><i class="icon iconfont">&#xe64a;</i></div>
      </div>
      <div v-loading="loading">
        <!-- 视觉效果 -->
        <ul
          v-show="titleIndex !== 3 && viweIndex === 2"
          class="sort clearfix">
          <li
            :class="{activeselcet: selcetIndex === 1}"
            @click="selcetViwe(1)"><span>{{ lang.price }}</span><img :src="selcetIndex !== 1 ? imgUrl:arrowUp?imgUrl1:imgUrl2" ></li>
          <li
            :class="{activeselcet: selcetIndex === 2}"
            @click="selcetViwe(2)"><span>{{ lang.carat }}</span><img :src="selcetIndex !== 2 ? imgUrl:arrowUp?imgUrl1:imgUrl2" ></li>
          <li
            :class="{activeselcet: selcetIndex === 3}"
            @click="selcetViwe(3)"><span>{{ lang.clarity }}</span><img :src="selcetIndex !== 3 ? imgUrl:arrowUp?imgUrl1:imgUrl2" ></li>
          <li
            :class="{activeselcet: selcetIndex === 4}"
            @click="selcetViwe(4)"><span>{{ lang.cut }}</span><img :src="selcetIndex !== 4 ? imgUrl:arrowUp?imgUrl1:imgUrl2" ></li>
          <li
            :class="{activeselcet: selcetIndex === 5}"
            @click="selcetViwe(5)"><span>{{ lang.color }}</span><img :src="selcetIndex !== 5 ? imgUrl:arrowUp?imgUrl1:imgUrl2" ></li>
        </ul>
        <!-- 视觉效果 -->
        <ul
          v-show="titleIndex !== 3 && viweIndex === 2"
          class="list">

          <li
            v-for="(item,index) in goodsList"
            v-if="item.categoryId>0 && item.specsModels"
            @click="goSelece(item.id)">
            <img :src="IMG_URL+item.goodsImages.split(',')[0]" >
            <div class="details">
              <p>{{ item.goodsName }}</p>
              <div class="left">
                <b>{{ item.coinType }} {{ formatMoney(item.salePrice) }}</b>
                <p v-if="item.specsModels.cardNo && item.specsModels.card">{{ item.specsModels.card }} {{ item.specsModels.cardNo }}</p>
                <p v-if="item.specsModels.cardNo && !item.specsModels.card">{{ lang.other }} {{ item.specsModels.cardNo }}</p>
              </div>
              <div class="right">
                <a
                  v-if="item.isJoin"
                  @click.stop="addWishList(1,item.id,index)"><i class="icon iconfont">&#xe65b;</i></a>
                <a
                  v-if="!item.isJoin"
                  @click.stop="addWishList(1,item.id,index)"><i class="icon iconfont">&#xe645;</i></a>
                <a @click.stop="addWishList(2,item.id)"><i class="icon iconfont big-icon">&#xe64c;</i></a>
              </div>
              <span
                class="tips"
                @mouseover="maskShow(index)"
                @mouseout="mask"><i class="icon iconfont">&#xe64d;</i></span>
              <div
                :class="{'maskShow': maskIndex === index}"
                class="mask "
                @mouseover="maskShow(index)"
                @mouseout="mask">
                <ul>
                  <li><span class="item-name">SKU：</span><span class="item-value">{{ item.specsModels?item.specsModels.SKU:'' }}</span></li>
                  <li><span class="item-name">{{ lang.shape }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.shape:'' }}</span></li>
                  <li><span class="item-name">{{ lang.carat }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.carat:'' }}</span></li>
                  <li><span class="item-name">{{ lang.color }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.color:'' }}</span></li>
                  <li><span class="item-name">{{ lang.clarity }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.clarity:'' }}</span></li>
                  <li><span class="item-name">{{ lang.cut }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.cut:'' }}</span></li>
                  <li><span class="item-name">{{ lang.gloss }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.polish:'' }}</span></li>
                  <li><span class="item-name">{{ lang.symmetrics }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.symmetry:'' }}</span></li>
                  <li><span class="item-name">{{ lang.fluorescence }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.fluorescence:'' }}</span></li>
                  <li><span class="item-name">{{ lang.certificate }}：</span><span class="item-value">{{ item.specsModels?item.specsModels.card:'' }}</span></li>
                </ul>
              </div>
            </div>
          </li>
          <li
            v-else
            class="advert">
            <img
              :src="IMG_URL+(item.advertImgModelList && item.advertImgModelList[0].image?item.advertImgModelList[0].image.split(',')[0]:item.dsImg)"
              @click="openAddress(item.advertImgModelList?item.advertImgModelList[0].addres:'', item.tdOpenType)" >
          </li>
        </ul>
        <!-- 列表效果 -->
        <ul
          v-show="titleIndex !== 3 && viweIndex === 1"
          class="list-viwe">
          <li class="list-title clearfix">
            <span>{{ lang.thumbnail }}</span>
            <span>{{ lang.shape }}</span>
            <span
              :class="{activeselcet: selcetIndex === 2}"
              @click="selcetViwe(2)">{{ lang.carat }}<img :src="selcetIndex !== 2 ? imgUrl:arrowUp?imgUrl1:imgUrl2"></span>
            <span
              :class="{activeselcet: selcetIndex === 5}"
              @click="selcetViwe(5)">{{ lang.color }}<img :src="selcetIndex !== 5 ? imgUrl:arrowUp?imgUrl1:imgUrl2"></span>
            <span
              :class="{activeselcet: selcetIndex === 3}"
              @click="selcetViwe(3)">{{ lang.clarity }}<img :src="selcetIndex !== 3 ? imgUrl:arrowUp?imgUrl1:imgUrl2"></span>
            <span
              :class="{activeselcet: selcetIndex === 4}"
              @click="selcetViwe(4)">{{ lang.cut }}<img :src="selcetIndex !== 4 ? imgUrl:arrowUp?imgUrl1:imgUrl2"></span>
            <span
              :class="{activeselcet: selcetIndex === 1}"
              @click="selcetViwe(1)">{{ lang.price }}<img :src="selcetIndex !== 1 ? imgUrl:arrowUp?imgUrl1:imgUrl2"></span>
            <span>{{ lang.addWish }}</span>
            <span>{{ lang.contrast }}</span>
            <span>{{ lang.lookDetail }}</span>
          </li>
          <li
            v-for="(item, index) in goodsList"
            v-if="item.categoryId>0 && item.specsModels"
            class="clearfix">
            <span><img
              :src="IMG_URL+item.goodsImages.split(',')[0]"
              class="img" ></span>
            <span>{{ item.specsModels.shape }}</span>
            <span>{{ item.specsModels.carat }}</span>
            <span>{{ item.specsModels.color }}</span>
            <span>{{ item.specsModels.clarity }}</span>
            <span>{{ item.specsModels.cut }}</span>
            <span>{{ formatMoney(item.salePrice) }}</span>
            <span
              v-if="item.isJoin"
              @click.stop="addWishList(1,item.id,index)"><i class="icon iconfont">&#xe65b;</i></span>
            <span
              v-if="!item.isJoin"
              @click.stop="addWishList(1,item.id,index)"><i class="icon iconfont">&#xe645;</i></span>
            <span @click.stop="addWishList(2,item.id)"><i class="icon iconfont">&#xe64c;</i></span>
            <span @click.stop="goSelece(item.id)"><label>{{ lang.clickView }}</label></span>
          </li>
        </ul>
        <!-- 鑽石对比 -->
        <ul
          v-show="titleIndex == 3"
          v-if="store.state.isLogin && contrastList"
          class="compare">
          <li
            v-for="(item, index) in contrastList"
            @click="goSelece(item.simpleGoodsEntity.goodId,1)">
            <img :src="IMG_URL+item.simpleGoodsEntity.goodsImages.split(',')[0]" >
            <div class="details">
              <p>{{ item.simpleGoodsEntity.goodsName }}</p>
              <b>{{ item.simpleGoodsEntity.coinType }} {{ formatMoney(item.simpleGoodsEntity.salePrice) }}</b>
              <a
                class="add-card"
                @click.stop="addCar(item.simpleGoodsEntity.goodId)">{{ lang.addCart }}</a>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==191"
                class="mar-t"><span>GIA:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==31"><span>{{ lang.carat }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==34"><span>{{ lang.color }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==35"><span>{{ lang.clarity }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==33"><span>{{ lang.cut }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==40"><span>{{ lang.mesa }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==39"><span>{{ lang.depth }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==32"><span>{{ lang.shape }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.simpleGoodsEntity.baseConfig"
                v-if="conf.configId==38"><span>{{ lang.fluorescence }}:</span><span>{{ conf.configAttrIVal }}</span></div>
            </div>
            <i
              class="iconfont iconicon-test1"
              @click.stop="deletePro(index,item.id)" />
          </li>
        </ul>
        <ul
          v-show="titleIndex == 3"
          v-if="!store.state.isLogin && contrastList"
          class="compare">
          <li
            v-for="(item, index) in contrastList"
            @click="goSelece(item.goodId,1)">
            <img :src="IMG_URL+item.goodsImages.split(',')[0]" >
            <div class="details">
              <p>{{ item.goodsName }}</p>
              <b>{{ item.coinType }} {{ formatMoney(item.salePrice) }}</b>
              <a
                class="add-card"
                @click.stop="addCar(item.goodId)">{{ lang.addCart }}</a>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==191"
                class="mar-t"><span>GIA:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==31"><span>{{ lang.carat }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==34"><span>{{ lang.color }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==35"><span>{{ lang.clarity }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==33"><span>{{ lang.cut }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==40"><span>{{ lang.mesa }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==39"><span>{{ lang.depth }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==32"><span>{{ lang.shape }}:</span><span>{{ conf.configAttrIVal }}</span></div>
              <div
                v-for="conf in item.baseConfig"
                v-if="conf.configId==38"><span>{{ lang.fluorescence }}:</span><span>{{ conf.configAttrIVal }}</span></div>
            </div>
            <i
              class="iconfont iconicon-test1"
              @click.stop="deletePro(index,item.goodId)" />
          </li>
        </ul>

      </div>
    </div>
    <Empty
      v-if="(!contrastList || contrastList.length<=0) && titleIndex==3"
      type="7"/>
    <Empty
      v-if="page.totalCount<=0 && titleIndex!=3"
      type="0"/>

    <div
      v-show="titleIndex === 1 && page.nextPage"
      class="see-more">
      <div @click="paramsData.currPage++,searchGoods(1)">{{ lang.loadingMore }}</div>
    </div>

  </div>
</template>
<script>
import Swiper from 'swiper';
import Header from '@/pages/content/header.vue';
import Empty from '@/components/empty.vue';
import { Page } from '@/api/filterUtil.js';
import { formatMoney, removeFormatMoney, filterFormatMoney1 } from '@/api/filterUtil.js';
import { addWish, addCard } from '@/api/func.js';
import { clearCustom, getCustom, clearTwoCustom } from '@/api/cache.js';
import store from '@/store/index';
export default {
  components: {
    Header,
    Empty
  },
  data() {
    return {
      lang: this.$LANGUAGE.diamond.index,
      loading: true,
      coin: localStorage.getItem('coin') || 'HKD',
      store: store,
      contrastList: [], // 對比
      cutIndex: 0,
      cutList: [{
        name: this.$LANGUAGE.diamond.index.cutListName1,
        desc: this.$LANGUAGE.diamond.index.cutListDesc1,
        img: '../../../static/images/knowledge/GD.png'
      }, {
        name: this.$LANGUAGE.diamond.index.cutListName2,
        desc: this.$LANGUAGE.diamond.index.cutListDesc2,
        img: '../../../static/images/knowledge/VG.png'
      }, {
        name: this.$LANGUAGE.diamond.index.cutListName3,
        desc: this.$LANGUAGE.diamond.index.cutListDesc3,
        img: '../../../static/images/knowledge/IDEAL.png'
      }],
      caratIndex: 0,
      caratList: [{
        name: '1/4',
        img: '../../../../static/images/diamond/carat/0.25-.png'
      }, {
        name: '1/3',
        img: '../../../../static/images/diamond/carat/0.3-.png'
      }, {
        name: '1/2',
        img: '../../../../static/images/diamond/carat/0.5-.png'
      }, {
        name: '3/4',
        img: '../../../../static/images/diamond/carat/0.75-.png'
      }, {
        name: '1',
        img: '../../../../static/images/diamond/carat/1-.png'
      }, {
        name: '1.5',
        img: '../../../../static/images/diamond/carat/1.5-.png'
      }, {
        name: '2',
        img: '../../../../static/images/diamond/carat/2-.png'
      }, {
        name: '3',
        img: '../../../../static/images/diamond/carat/3-.png'
      }],
      cleantyIndex: 0,
      cleantyList: [{
        name: 'SI2',
        desc: this.$LANGUAGE.diamond.index.cleantyList1,
        img: '../../../static/images/diamond/clarity/SI2.png'
      }, {
        name: 'SI1',
        desc: this.$LANGUAGE.diamond.index.cleantyList1,
        img: '../../../static/images/diamond/clarity/SI1.png'
      }, {
        name: 'VS2',
        desc: this.$LANGUAGE.diamond.index.cleantyList2,
        img: '../../../static/images/diamond/clarity/VS2.png'
      }, {
        name: 'VS1',
        desc: this.$LANGUAGE.diamond.index.cleantyList2,
        img: '../../../static/images/diamond/clarity/VS1.png'
      }, {
        name: 'VVS2',
        desc: this.$LANGUAGE.diamond.index.cleantyList3,
        img: '../../../static/images/diamond/clarity/VVS2.png'
      }, {
        name: 'VVS1',
        desc: this.$LANGUAGE.diamond.index.cleantyList3,
        img: '../../../static/images/diamond/clarity/VVS1.png'
      }, {
        name: 'IF',
        desc: this.$LANGUAGE.diamond.index.cleantyList4,
        img: '../../../static/images/diamond/clarity/IF.png'
      }, {
        name: 'FL',
        desc: this.$LANGUAGE.diamond.index.cleantyList4,
        img: '../../../static/images/diamond/clarity/FL.png'
      }],
      colorIndex: 0,
      colorList: [{
        name: 'J',
        desc: this.$LANGUAGE.diamond.index.colorList1,
        img: '../../../static/images/knowledge/J.png'
      }, {
        name: 'I',
        desc: this.$LANGUAGE.diamond.index.colorList2,
        img: '../../../static/images/knowledge/I.png'
      }, {
        name: 'H',
        desc: this.$LANGUAGE.diamond.index.colorList3,
        img: '../../../static/images/knowledge/H.png'
      }, {
        name: 'G',
        desc: this.$LANGUAGE.diamond.index.colorList4,
        img: '../../../static/images/knowledge/G.png'
      }, {
        name: 'F',
        desc: this.$LANGUAGE.diamond.index.colorList5,
        img: '../../../static/images/knowledge/F.png'
      }, {
        name: 'E',
        desc: this.$LANGUAGE.diamond.index.colorList6,
        img: '../../../static/images/knowledge/E.png'
      }, {
        name: 'D',
        desc: this.$LANGUAGE.diamond.index.colorList7,
        img: '../../../static/images/knowledge/D.png'
      }],
      allCanChose: true,
      shapeVal: '0',
      cusomIndex: -1, // 是否定制
      priceRang: [200, 10000000],
      priceMin: this.formatMoney(200),
      priceMax: this.formatMoney(10000000),
      searchPrice: {},
      caratRang: [0, 10],
      caratMin: 0,
      caratMax: 10,
      caratFast: '0',

      cutMin: 1,
      cutMax: 4,

      colorMin: 1,
      colorMax: 8,

      clarityMin: 1,
      clarityMax: 9,
      test: 2,

      titleIndex: 1,
      viweIndex: 2,
      selcetIndex: 0,
      arrowUp: false,
      imgUrl: require('../../../../static/images/diamond/order.png'),
      imgUrl1: require('../../../../static/images/diamond/order-up.png'),
      imgUrl2: require('../../../../static/images/diamond/order-down.png'),

      shapeIdIndex: -1,
      shapeIdIndex2: 0,
      showMore: false, // 跟多參數
      glossIndex: null, // 光澤
      symmetricsIndex: null, // 對稱
      certificateIndex: null, // 證書
      depthIndex: [0, 100], // 深度
      stoneIndex: [0, 100], // 石面
      fluorescenceIndex: null, // 熒光
      maskIndex: '',
      paramsData: { // 请求参数
        categoryId: 1, // 商品类别ID ,
        currPage: 1, // 当前页面 ,
        orderParam: null, // 排序字段名 ,
        orderType: null, // 排序类型（1:升 2:降） ,
        pageSize: 14, // 每页显示数量 ,
        params: [] // 参数数组
      },
      page: {},
      goodsList: []

    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.name != 'seleceDiamond' && val.name != 'custom') {
          this.init();
        }
      }

    }
  },
  created() {
    this.infoCustom();
    this.init();
  },
  methods: {
    removeFormatMoney: removeFormatMoney,
    formatMoney: formatMoney,
    // 加入购物车
    addCar(id) {
      let data = {
        goodsId: id,
        goodsDetailsId: '88888888',
        groupType: null, // (1-对戒类型,2-定制类型) ,
        groupId: null // 对戒（组id）和定制时传（自定义时间戳）
      };
      addCard(1, data);
    },
    init() {
      let key = this.$route.params.key;
      let id = this.$route.params.id;
      if (this.paramsKey != key || this.paramsId != id) {
        this.paramsKey = key;
        this.paramsId = id;
        this.allCanChose = true;
        this.shapeVal = 0;
        this.shapeIdIndex = -1;
        let firstInfo = getCustom();
        if (firstInfo && firstInfo.categoryId != 1) {
          this.$axiosPost('/web/goods/madeGoodsShape', {
            goodsId: firstInfo.goodsId
          }).then(res => {
            if (res.code === 200) {
              this.shapeVal = res.data.shape;
              this.allCanChose = false;
              for (var i = 0, len = this.lang.diamond[1].list.length; i < len; i++) {
                if (this.lang.diamond[1].list[i].id == this.shapeVal) {
                  this.shapeIdIndex = i;
                }
              }
              this.$axiosGet('/web/goods/getSearchPrice', {}).then(res => {
                if (res.code === 200) {
                  res.data.minPrice = 0
                  res.data.maxPrice = 10000000
                  this.searchPrice = res.data;
                  this.priceRang = [this.searchPrice.minPrice, this.searchPrice.maxPrice];
                  this.priceMin = this.formatMoney(this.searchPrice.minPrice);
                  this.priceMax = this.formatMoney(this.searchPrice.maxPrice);
                  this.searchGoods();
                } else {
                  Message.error({
                    message: res.msg
                  });
                }
              });
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          if (this.$route.params.key == 2 || this.$route.params.key == 1) {
            console.log('4453', this.$route.params.key);
            this.shapeVal = this.$route.params.id || 0;
            for (var i = 0, len = this.lang.diamond[1].list.length; i < len; i++) {
              if (this.lang.diamond[1].list[i].id == this.shapeVal) {
                this.shapeIdIndex = i;
                console.log(this.shapeIdIndex, '435');
              }
            }
          }
          this.$axiosGet('/web/goods/getSearchPrice', {}).then(res => {
            if (res.code === 200) {
              res.data.minPrice = 0
              res.data.maxPrice = 10000000
              this.searchPrice = res.data;
              this.priceRang = [this.searchPrice.minPrice, this.searchPrice.maxPrice];
              this.priceMin = this.formatMoney(this.searchPrice.minPrice);
              this.priceMax = this.formatMoney(this.searchPrice.maxPrice);
              this.searchGoods();
            } else {
              Message.error({
                message: res.msg
              });
            }
          });
        }
        this.geContrastList();
      }
    },
    /**
			 * 獲取對比
			 */
    geContrastList() {
      let token = localStorage.getItem('__TOKEN__') ? JSON.parse(localStorage.getItem('__TOKEN__')) : null;
      if (token) { // 已登录
        console.log('111111', this.contrastList);
        this.$axiosGet('/web/collection/list', {
          type: 2,
          currPage: 1,
          pageSize: 60
        }).then(res => {
          this.contrastList = res.data.list;
        });
      } else {
        var ids = [];
        let diamondList = localStorage.getItem('__DIAMOND_LIST__') ? JSON.parse(localStorage.getItem('__DIAMOND_LIST__')) : [];
        for (let i = 0, len = diamondList.length; i < len; i++) {
          ids.push(diamondList[i].goodsId);
          console.log('11222', this.contrastList);
        }
        if (ids.length > 0) {
          this.$axiosPost('/web/goodsCart/zhu', {
            goodsIds: ids
          }).then(res => {
            this.contrastList = res;
          });
        } else {
          console.log('111333', this.contrastList);
          this.contrastList = [];
        }
      }
      console.log('222222', this.contrastList.length);
    },
    infoCustom() {
      let firstInfo = getCustom();
      clearTwoCustom();
      if (firstInfo && firstInfo.categoryId == 1) {
        clearCustom();
      }
    },
    openAddress(ind, type) {
      let openType = type == 1 ? '_blank' : '_parent';
      if (ind && ind != '') {
        window.open(ind.indexOf('http') == -1 ? 'http://' + ind : ind, openType);
      }
    },
    // 选中的说明弹窗形状发生改变
    shape2(ind) {
      this.shapeIdIndex2 = ind;
    },
    // 选中的说明弹窗形状发生改变
    shape(ind) {
      if (this.allCanChose) {
        this.shapeIdIndex = ind;
        this.searchGoods();
      }
    },
    // 选中的形状发生改变
    selcetShape(val) {
      if (this.allCanChose) {
        this.shapeIdIndex = this.shapeIdIndex == val ? -1 : val;
        this.init();
      }
      this.searchGoods();
    },
    // 价格格式变换
    inpPriceFocus(e) {
      if (e.currentTarget.className === 'start') {
        this.priceMin = this.removeFormatMoney(this.priceMin);
      } else {
        this.priceMax = this.removeFormatMoney(this.priceMax);
      }
    },
    inpPriceBlur(e) {
      if (e.currentTarget.className === 'start') {
        this.priceMin = this.formatMoney(this.priceMin);
      } else {
        this.priceMax = this.formatMoney(this.priceMax);
      }
    },
    inpPrice() {
      this.priceMax.toString().indexOf(',') > -1 & (this.priceMax = this.removeFormatMoney(this.priceMax));
      this.priceMin.toString().indexOf(',') > -1 & (this.priceMin = this.removeFormatMoney(this.priceMin));
      this.priceMax = this.priceMax > this.searchPrice.maxPrice ? this.searchPrice.maxPrice : this.priceMax;
      this.priceMin = this.priceMin > this.searchPrice.maxPrice ? this.searchPrice.maxPrice : this.priceMin;
      this.priceMax = this.priceMax < this.searchPrice.minPrice ? this.searchPrice.minPrice : this.priceMax;
      this.priceMin = this.priceMin < this.searchPrice.minPrice ? this.searchPrice.minPrice : this.priceMin;
      if (this.priceMin > this.priceMax) {
        let taps = this.priceMin;
        this.priceMin = this.priceMax;
        this.priceMax = taps;
      }
      this.priceRang = [parseInt(this.priceMin), parseInt(this.priceMax)];
      this.priceMin = this.formatMoney(this.priceMin);
      this.priceMax = this.formatMoney(this.priceMax);
      this.searchGoods();
    },
    // 滑块价格发生改变
    priceRangChange() {
      this.priceMax = this.formatMoney(this.priceRang[1]);
      this.priceMin = this.formatMoney(this.priceRang[0]);
      this.searchGoods();
    },
    // 快速选择价格
    priceSelcetFast(val, k1, k2) {
      this.priceFast = val;
      this.priceMin = this.formatMoney(k1);
      this.priceMax = this.formatMoney(k2);
      this.priceRang = [k1, k2];
      this.searchGoods();
    },
    // 输入的克拉改变
    inpCarat() {
      this.caratMax = this.caratMax > 10 ? 10 : this.caratMax;
      this.caratMin = this.caratMin > 10 ? 10 : this.caratMin;
      this.caratMax = this.caratMax < 0 ? 0 : this.caratMax;
      this.caratMin = this.caratMin < 0 ? 0 : this.caratMin;
      if (this.caratMin > this.caratMax) {
        let taps = this.caratMin;
        this.caratMin = this.caratMax;
        this.caratMax = taps;
      }
      this.caratRang = [parseFloat(this.caratMin).toFixed(2), parseFloat(this.caratMax).toFixed(2)];
      this.searchGoods();
    },
    // 滑块克拉数发生改变
    caratRangChange() {
      this.caratMax = this.caratRang[1];
      this.caratMin = this.caratRang[0];
      this.searchGoods();
    },
    // 快速选择克拉
    caratSelcetFast(val, k1, k2) {
      this.caratFast = val;
      this.caratMin = k1;
      this.caratMax = k2;
      this.caratRang = [k1, k2];
      this.searchGoods();
    },
    // 切割发生改变
    cutRangChange(val) {
      if (val >= this.cutMax) {
        this.cutMax = val + 1;
      } else if ((this.cutMax - this.cutMin) == 2) {
        if (val == this.cutMin) {
          this.cutMax = val + 1;
        } else {
          this.cutMin = val;
        }
      } else if (val * 2 >= (this.cutMax + this.cutMin)) {
        this.cutMax = val;
      } else if (val <= this.cutMin) {
        this.cutMin = val;
      } else {
        this.cutMin = val;
      }
      this.searchGoods();
    },
    // 顏色发生改变
    colorRangChange(val) {
      if (val >= this.colorMax) {
        this.colorMax = val + 1;
      } else if ((this.colorMax - this.colorMin) == 2) {
        if (val == this.colorMin) {
          this.colorMax = val + 1;
        } else {
          this.colorMin = val;
        }
      } else if (val * 2 >= (this.colorMax + this.colorMin)) {
        this.colorMax = val;
      } else if (val <= this.colorMin) {
        this.colorMin = val;
      } else {
        this.colorMin = val;
      }
      this.searchGoods();
    },
    // 淨度发生改变
    clarityRangChange(val) {
      if (val >= this.clarityMax) {
        this.clarityMax = val + 1;
      } else if ((this.clarityMax - this.clarityMin) == 2) {
        if (val == this.clarityMin) {
          this.clarityMax = val + 1;
        } else {
          this.clarityMin = val;
        }
      } else if (val * 2 >= (this.clarityMax + this.clarityMin)) {
        this.clarityMax = val;
      } else if (val <= this.clarityMin) {
        this.clarityMin = val;
      } else {
        this.clarityMin = val;
      }
      this.searchGoods();
    },
    // 改变显示列表内容
    changeTitle(val) {
      this.titleIndex = val;
      if (val == 3) {
        this.geContrastList();
      }
    },
    // 改变列表内容
    changeViwe(val) {
      this.viweIndex = val;
    },
    // 改变视觉排序条件
    selcetViwe(val) {
      if (val === this.selcetIndex) {
        this.arrowUp = !this.arrowUp;
      } else {
        this.arrowUp = false;
      }
      this.selcetIndex = val;
      this.searchGoods();
    },
    // 更多参数显示
    maskShow(val) {
      this.maskIndex = val;
    },
    mask() {
      this.maskIndex = '';
    },
    gloss(val) {
      if (this.glossIndex == val) {
        this.glossIndex = 0;
      } else {
        this.glossIndex = val;
      }
      this.searchGoods();
    },
    symmetrics(val) {
      if (this.symmetricsIndex == val) {
        this.symmetricsIndex = 0;
      } else {
        this.symmetricsIndex = val;
      }
      this.searchGoods();
    },
    certificate(val) {
      if (this.certificateIndex == val) {
        this.certificateIndex = 0;
      } else {
        this.certificateIndex = val;
      }
      this.searchGoods();
    },
    fluorescence(val) {
      if (this.fluorescenceIndex == val) {
        this.fluorescenceIndex = 0;
      } else {
        this.fluorescenceIndex = val;
      }
      this.searchGoods();
    },
    // 深度改变
    depthRangChange() {
      this.searchGoods();
    },
    stoneRangChange() {
      this.searchGoods();
    },
    // 清空所有筛选条件
    clearAll() {
      this.glossIndex = this.symmetricsIndex = this.certificateIndex = this.fluorescenceIndex = null;
      this.depthIndex = this.stoneIndex = [0, 100];
      this.shapeVal = '0';
      this.shapeIdIndex = -1;
      this.shapeIdIndex2 = 0;
      this.caratRang = [0.1, 3];
      this.caratMax = 3;
      this.caratMin = 0.1;
      this.cutMin = this.colorMin = this.clarityMin = 1;

      this.cutMax = 4;
      this.colorMax = 8;
      this.clarityMax = 9;

      this.$axiosGet('/web/goods/getSearchPrice', {}).then(res => {
        if (res.code === 200) {
          res.data.minPrice = 0
          res.data.maxPrice = 10000000
          this.searchPrice = res.data;
          this.priceRang = [this.searchPrice.minPrice, this.searchPrice.maxPrice];
          this.priceMin = this.formatMoney(this.searchPrice.minPrice);
          this.priceMax = this.formatMoney(this.searchPrice.maxPrice);
          this.searchGoods();
        } else {
          Message.error({
            message: res.msg
          });
        }
      });

      this.searchGoods();
    },
    // 查看详情
    goSelece(id, type) {
      if (type) {
        clearCustom();
        clearTwoCustom();
      }
      this.$router.push({
        name: 'seleceDiamond',
        params: {
          id: id
        }
      });
    },
    // 添加心愿单
    addWishList(type, id, index) {
      let data = {
        goodsId: id, // 商品ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
        groupId: null // 组合ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
      };
      addWish(1, type, data);
      if (type == 2) {
        this.geContrastList();
      }
      /*	if(type==1 ){
						this.goodsList[index].isJoin=true;
						this.goodsList.splice(index,1,this.goodsList[index])
					} */
    },
    /**
			 * 查詢列表
			 */
    searchGoods(type) {
      this.loading = true;
      if (type != 1) {
        this.paramsData.currPage = 1;
      }
      if (this.selcetIndex > 0) { // 排序方式
        var orderParam = '';
        switch (this.selcetIndex) {
        case 1:
          orderParam = 'sale_price';
          break;
        case 2:
          orderParam = 'carat';
          break;
        case 3:
          orderParam = 'clarity';
          break;
        case 4:
          orderParam = 'cut';
          break;
        case 5:
          orderParam = 'color';
          break;
        case 6:
          orderParam = 'depth';
          break;
        case 7:
          orderParam = 'table';
          break;
        case 8:
          orderParam = 'card';
          break;
        }
        this.paramsData.orderParam = orderParam;
        this.paramsData.orderType = this.arrowUp ? 1 : 2;
      }
      let firstInfo = getCustom();
      if (firstInfo && firstInfo.categoryId != 1) {
        this.paramsData['selectGoodsId'] = firstInfo.goodsId;
      } else {
        delete this.paramsData.selectGoodsId;
      }

      this.paramsData.params = [];
      if (this.shapeIdIndex > -1) {
        this.paramsData.params.push({ // 形状
          type: 2,
          paramName: 'shape',
          valueType: 1,
          configValues: [this.lang.diamond[1].list[this.shapeIdIndex].id]
        });
      }
      if (this.glossIndex > 0) {
        this.paramsData.params.push({ // 光澤
          type: 2,
          paramName: 'polish',
          valueType: 1,
          configValues: [this.glossIndex + 45]
        });
      }
      if (this.symmetricsIndex > 0) {
        this.paramsData.params.push({ // 對稱
          type: 2,
          paramName: 'symmetry',
          valueType: 1,
          configValues: [this.symmetricsIndex + 48]
        });
      }
      if (this.certificateIndex > 0) {
        this.paramsData.params.push({ // 证书
          type: 2,
          paramName: 'card',
          valueType: 1,
          configValues: [this.certificateIndex + 441]
        });
      }

      if (this.fluorescenceIndex > 0) {
        this.paramsData.params.push({ // 熒光
          type: 2,
          paramName: 'fluorescence',
          valueType: 1,
          configValues: [this.fluorescenceIndex + 51]
        });
      }
      if (this.cutMin != 1 || this.cutMax != 4) {
        var cuts = [];
        for (var i = this.cutMin; i < this.cutMax; i++) {
          cuts.push(i + 27);
        }
        this.paramsData.params.push({ // 切割区间
          type: 2,
          paramName: 'cut',
          valueType: 1,
          configValues: cuts
        });
      }
      if (this.colorMin != 1 || this.colorMax != 8) {
        var colors = [];
        for (var i = this.colorMin; i < this.colorMax; i++) {
          colors.push(i + 30);
        }
        this.paramsData.params.push({ // 颜色区间
          type: 2,
          paramName: 'color',
          valueType: 1,
          configValues: colors
        });
      }

      if (this.clarityMin != 1 || this.clarityMax != 9) {
        var clarities = [];
        for (var i = this.clarityMin; i < this.clarityMax; i++) {
          clarities.push(i + 37);
        }
        this.paramsData.params.push({ // 淨度区间
          type: 2,
          paramName: 'clarity',
          valueType: 1,
          configValues: clarities
        });
      }
      if (this.depthIndex[0] != 0 || this.depthIndex[1] != 100) {
        this.paramsData.params.push({ // 深度
          type: 2,
          paramName: 'depth',
          valueType: 2,
          beginValue: this.depthIndex[0],
          endValue: this.depthIndex[1]
        });
      }
      if (this.stoneIndex[0] != 0 || this.stoneIndex[1] != 100) {
        this.paramsData.params.push({ // 石面
          type: 2,
          paramName: 'table',
          valueType: 2,
          beginValue: this.stoneIndex[0],
          endValue: this.stoneIndex[1]
        });
      }

      this.paramsData.params.push({ // 克拉区间
        type: 2,
        paramName: 'carat',
        valueType: 2,
        beginValue: this.caratMin,
        endValue: this.caratMax
      });
      this.paramsData.params.push({ // 价格区间
        type: 1,
        paramName: 'sale_price',
        valueType: 2,
        beginValue: this.removeFormatMoney(this.priceMin),
        endValue: this.removeFormatMoney(this.priceMax)
      });

      this.$postJsonRequest(`web/goods/searchGoods`, this.paramsData).then(res => {
        this.loading = false;
        if (type != 1) {
          this.goodsList = [];
        }
        if (res.data.code === 200) {
          this.page = new Page(res.data.data.currPage, res.data.data.pageSize, res.data.data.totalCount);
          if (this.page.totalCount > 0) {
            for (var i = 0, len = res.data.data.list.length; i < len; i++) {
              this.goodsList.push(res.data.data.list[i]);
            }
          }
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    // 删除
    deletePro(index, id) {
      this.contrastList.splice(index, 1);
      if (store.state.isLogin) {
        this.$axiosPost('/web/collection/delete', {
          ids: id
        });
      } else {
        let diamondList = localStorage.getItem('__DIAMOND_LIST__') ? JSON.parse(localStorage.getItem('__DIAMOND_LIST__')) : [];
        for (let i = 0, len = diamondList.length; i < len; i++) {
          if (diamondList[i].goodsId == id) {
            diamondList.splice(i, 1);
            localStorage.setItem('__DIAMOND_LIST__', JSON.stringify(diamondList));
            break;
          }
        }
        if (diamondList.length == 0) {
          localStorage.removeItem('__DIAMOND_LIST__');
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
	.pop-carat {
		img {
			display: block;
			margin: 0 auto;
			height: 135px;
			margin-bottom: 49px;
			margin-top: 24px;
		}
		ul {
			margin-left: 9px;
			margin-right: 9px;
			height: 20px;
			line-height: 20px;
			background-image: url(../../../../static/images/knowledge/bgc.png);
			background-size: 100% 100%;
			li {
				font-size: 12px;
				cursor: pointer;
				color: #333333;
				float: left;
				width: calc(100% / 8);
				text-align: center;
				.active {
					color: white;
					background: linear-gradient(90deg, rgba(234, 186, 196, 1) 0%, rgba(215, 136, 155, 1) 97%);
				}
				span {
					display: block;
					margin: 0 auto;
					margin-top: -3px;
					height: 28px;
					width: 28px;
					line-height: 28px;
					border-radius: 50%;
				}
			}
		}
		div {
			font-size: 12px;
			margin: 16px;
			span {
				margin-right: 5px;
				color: #AA8A7B;
			}
		}
	}

	.pop-cleanliness {
		div {
			&:first-child {
				margin-top: 36px;
				text-align: center;
				color: #666666;
				font-size: 12px;
			}
			&:nth-child(4) {
				font-size: 12px;
				margin: 16px;
				span {
					margin-right: 5px;
					color: #AA8A7B;
				}
			}
		}
		img {
			height: 109px;
			display: block;
			margin: 0 auto;
			margin-top: 21px;
			margin-bottom: 36px;
		}
		ul {
			margin-left: 9px;
			margin-right: 9px;
			height: 20px;
			line-height: 20px;
			margin-bottom: 20px;
			background-image: url(../../../../static/images/knowledge/bgc.png);
			background-size: 100% 100%;
			li {
				font-size: 12px;
				cursor: pointer;
				color: #333333;
				float: left;
				width: calc(100% / 8);
				text-align: center;
				.active {
					color: white;
					background: linear-gradient(90deg, rgba(234, 186, 196, 1) 0%, rgba(215, 136, 155, 1) 97%);
				}
				span {
					display: block;
					margin: 0 auto;
					line-height: 34px;
					height: 34px;
					width: 34px;
					margin-top: -8px;
					border-radius: 50%;
				}
			}
		}
	}

	.pop-cut {
		img {
			display: block;
			margin: 0 auto;
			height: 127px;
			margin-bottom: 43px;
			margin-top: 30px;
		}
		ul {
			margin-left: 9px;
			margin-right: 9px;
			height: 20px;
			line-height: 20px;
			background-image: url(../../../../static/images/knowledge/bgc.png);
			background-size: 100% 100%;
			li {
				font-size: 12px;
				cursor: pointer;
				color: #333333;
				float: left;
				width: calc(100% / 3);
				text-align: center;
				.active {
					color: white;
					background: linear-gradient(90deg, rgba(234, 186, 196, 1) 0%, rgba(215, 136, 155, 1) 97%);
				}
				span {
					display: block;
					margin: 0 auto;
					height: 34px;
					width: 34px;
					margin-top: -5px;
					line-height: 34px;
					border-radius: 50%;
				}
			}
		}
		div {
			font-size: 12px;
			margin: 16px;
			span {
				margin-right: 5px;
				color: #AA8A7B;
			}
		}
	}

	.pop-color {
		img {
			display: block;
			margin: 0 auto;
			height: 127px;
			margin-bottom: 17px;
			margin-top: 36px;
		}
		ul {
			margin-left: 9px;
			margin-right: 9px;
			height: 20px;
			line-height: 20px;
			background-image: url(../../../../static/images/knowledge/bgc.png);
			background-size: 100% 100%;
			li {
				font-size: 12px;
				cursor: pointer;
				color: #333333;
				float: left;
				width: calc(100% / 7);
				text-align: center;
				.active {
					color: white;
					background: linear-gradient(90deg, rgba(234, 186, 196, 1) 0%, rgba(215, 136, 155, 1) 97%);
				}
				span {
					display: block;
					margin: 0 auto;
					height: 20px;
					width: 20px;
					border-radius: 50%;
				}
			}
		}
		div {
			font-size: 12px;
			margin: 16px;
			span {
				margin-right: 5px;
				color: #AA8A7B;
			}
		}
	}

	.not-can-chose {
		color: #999999;
	}

	.not-can-chose-text {
		color: #999999 !important;
	}

	.pop-shape {
		position: relative;
		color: red;
		height: 340px;
		>p {
			font-size: 12px;
			color: #333333;
			line-height: 24px;
			margin-top: 20px;
			margin-left: 20px;
			margin-right: 20px;
		}
		ul {
			overflow: auto;
			padding-top: 30px;
			li {
				float: left;
				cursor: pointer;
				width: 20%;
				img {
					margin: 7px;
					padding: 3px;
					width: 56px;
					height: 56px;
					border: 1px solid #FFFFFF;
					border-radius: 2px;
				}
				.img {
					border: 1px solid #BA7F8C;
				}
				h6 {
					position: absolute;
					top: 210px;
					left: 0;
					width: 100%;
					text-align: center;
					font-size: 20px;
					color: #1B1B1B;
				}
				p {
					position: absolute;
					top: 250px;
					line-height: 24px;
					left: 0;
					width: 100%;
					font-size: 12px;
					color: #333333;
				}
			}
		}
	}

	.customDiamond {
		width: 1360px;
		margin: 0 auto;
		.selcet {
			float: left;
			width: 400px;
			height: 190px;
			margin-right: 80px;
			margin-bottom: 10px;
			.title {
				margin: 20px 0 10px;
				height: 20px;
				span {
					float: left;
					font-size: 18px;
					line-height: 18px;
					margin-right: 5px;
					color: #1B1B1B;
				}
				b {
					float: left;
					cursor: pointer;
					width: 18px;
					height: 18px;
					font-size: 14px;
					background: #debeab;
					border-radius: 9px;
					color: #FFFFFF;
				}
			}
			.content {
				.range {
					text-align: left;
					margin-bottom: 14px;
					input {
						width: 140px;
						height: 30px;
						font-size: 14px;
						font-weight: 400;
						color: #1B1B1B;
						padding-left: 10px;
						border: 1px solid #BBBBBB;
						outline: none;
					}
					input:focus {
						border: 1px solid #CFA48D;
					}
					span {
						font-size: 14px;
						line-height: 30px;
						color: #1B1B1B;
						margin: 0 10px;
					}
				}
				.fast {
					margin-top: 12px;
					text-align: left;
					span {
						display: inline-block;
						width: 123px;
						height: 24px;
						margin-right: 6px;
						color: #333333;
						font-size: 12px;
						line-height: 24px;
						text-align: center;
						background: #F8F8F8;
						cursor: pointer;
						border: 1px solid #EBEBEB;
						-webkit-transition: all 0.2s;
						-moz-transition: all 0.2s;
						-ms-transition: all 0.2s;
						transition: all 0.2s;
						&:hover {
							border-color: #CFABB4;
							background: #FEF8F9;
							color: #666666;
						}
						&:nth-child(3) {
							margin-right: 0;
						}
					}

				}
				ul {
					li {
						cursor: pointer;
						float: left;
						width: 20%;
						p {
							height: 40px;
							background: #F9F9F9;
							i {
								display: inline-block;
								width: 44px;
								height: 44px;
								font-size: 26px;
								text-align: center;
								line-height: 44px;
								margin-top: -2px;
								border: 1px solid #F9F9F9;
							}
							.active {
								border: 1px solid #B97E8C;
								box-shadow: 0px 3px 0px 0px rgba(217, 177, 166, 0.35);
								color: #333333 !important;
							}
							.active-text {
								color: #333333 !important;
							}
						}
						span {
							font-size: 12px;
							color: #333333;
							line-height: 30px;
							font-weight: 400;
						}
					}
				}
			}
		}
		.price {
			.content {
				float: left;
				width: 400px;
				height: 100px;
				text-align: left;
				.range {
					div {
						position: relative;
						display: inline-block;
					}
					i {
						font-style: normal;
						position: absolute;
						left: 10px;
						line-height: 31px;
						width: 30px;
						font-size: 14px;
						text-align: center;
					}
					input {
						width: 140px;
						height: 30px;
						font-size: 14px;
						font-weight: 400;
						color: #1B1B1B;
						padding-left: 45px;
						border: 1px solid #BBBBBB;
						outline: none;
					}
					input:focus {
						border: 1px solid #CFA48D;
					}
					span {
						font-size: 14px;
						line-height: 30px;
						color: #1B1B1B;
						margin: 0 10px;
					}
				}
			}
		}
		.cut,
		.color,
		.clarity {
			margin-bottom: 10px;
			height: 110px;
			.title {
				margin-top: 10px;
			}
			.title-rang {
				div {
					float: left;
					width: 33.33%;
					height: 30px;
					font-size: 14px;
					color: #999999;
					cursor: pointer;
				}
				.rangtitle {
					color: #111111;
				}
			}
			.content {
				.range {
					.rang-bg {
						height: 12px;
						width: 100%;
						background: #E4E4E4;
						border-radius: 6px;
						.stop {
							position: relative;
							float: left;
							height: 12px;
							width: 33.33%;
							background: #E4E4E4;
							border-right: 1px solid #FFFFFF;
							cursor: pointer;
							span {
								position: absolute;
								top: -4px;
								left: -11px;
								height: 20px;
								width: 20px;
								margin: 0;
								border-radius: 10px;
								border: 1px solid #E4E4E4;
								background-color: #FFFFFF;
								.img {
									width: 10px;
									height: 10px;
									margin: 5px;
									background: url(../../../../static/images/diamond/icon-dot.png) no-repeat;
									background-size: cover;
								}
							}
							.last-span {
								left: 116px;
							}
						}
						.first-span {
							border-radius: 6px 0 0 6px;
						}
						.last-span {
							border-radius: 0 6px 6px 0;
						}
						.stop1 {
							background: linear-gradient(to right, #f0bec8, #ebadbc);
						}
						.stop2 {
							background: linear-gradient(to right, #ebadbc, #e39bac);
						}
						.stop3 {
							background: linear-gradient(to right, #e39bac, #db8ea0);
						}
						.stop4 {
							background: linear-gradient(to right, #db8ea0, #d27c90);
						}
					}
				}
			}
		}
		.color {
			.title-rang {
				div {
					float: left;
					width: 14.2%;
				}
			}
			.content {
				.range {
					.rang-bg {
						height: 12px;
						width: 100%;
						background: #E4E4E4;
						border-radius: 6px;
						.stop {
							width: 57px;
							.last-span {
								left: 44px;
							}
						}
						.last-span {
							border: none;
						}
						.stop1 {
							background: linear-gradient(to right, #f0bec8, #ebadbc);
						}
						.stop2 {
							background: linear-gradient(to right, #ebadbc, #e8a5b5);
						}
						.stop3 {
							background: linear-gradient(to right, #e8a5b5, #e39bac);
						}
						.stop4 {
							background: linear-gradient(to right, #e39bac, #de93a5);
						}
						.stop5 {
							background: linear-gradient(to right, #de93a5, #db8ea0);
						}
						.stop6 {
							background: linear-gradient(to right, #db8ea0, #d68396);
						}
						.stop7 {
							background: linear-gradient(to right, #d68396, #d27c90);
						}
					}
				}
			}
		}
		.clarity {
			margin-right: 0;
			.title-rang {
				div {
					float: left;
					width: 12.5%;
				}
			}
			.content {
				.range {
					.rang-bg {
						height: 12px;
						width: 100%;
						background: #E4E4E4;
						border-radius: 6px;
						.stop {
							width: 12.5%;
							.last-span {
								left: 44px;
							}
						}
						.last-span {
							border: none;
						}
						.stop1 {
							background: linear-gradient(to right, #f0bec8, #ebadbc);
						}
						.stop2 {
							background: linear-gradient(to right, #ebadbc, #e8a5b5);
						}
						.stop3 {
							background: linear-gradient(to right, #e8a5b5, #e39bac);
						}
						.stop4 {
							background: linear-gradient(to right, #e39bac, #de93a5);
						}
						.stop5 {
							background: linear-gradient(to right, #de93a5, #db8ea0);
						}
						.stop6 {
							background: linear-gradient(to right, #db8ea0, #d68396);
						}
						.stop7 {
							background: linear-gradient(to right, #d68396, #d27c90);
						}
					}
				}
			}
		}
		.show-list {
			margin-bottom: 40px;
			.list {
				overflow: auto;
			}
			.header {
				h4 {
					font-size: 24px;
					line-height: 24px;
					color: #111111;
					font-weight: 400;
					margin: 20px 0 6px;
				}
				p {
					font-size: 12px;
					color: #111111;
					margin-bottom: 24px;
				}
			}
			.title {
				height: 40px;
				border-bottom: 1px solid #efefef;
				margin-bottom: 15px;
				li {
					float: left;
					width: 200px;
					height: 40px;
					font-size: 16px;
					line-height: 40px;
					font-weight: 400;
					color: #666666;
					background: #f7f7f7;
					border-top: 1px solid #efefef;
					cursor: pointer;
					img {
						display: none;
						width: 20px;
						height: 20px;
					}
				}
				li:last-child {
					border-right: 1px solid #efefef;
				}
				.active {
					position: relative;
					background: #F8F5F4;
					color: #AA8A7B;
					border: 1px solid #AA8A7B !important;
					img {
						display: inline-block;
						position: absolute;
						top: 26px;
						left: 90px;
					}
				}
			}
			.change-viwe {
				margin-bottom: 15px;
				div {
					float: left;
					width: 80px;
					height: 16px;
					margin: 8px 0;
					font-size: 14px;
					line-height: 16px;
					font-weight: 400;
					cursor: pointer;
					text-align: center;
					color: #999999;
					span {
						float: left;
						margin: 0 10px
					}
					i {
						float: left;
						font-size: 16px;
					}
				}
				.activeviwe {
					color: #AA8A7B;
				}
				.border-r {
					border-right: 2px solid #DDDDDD;
				}
			}
			.sort {
				height: 60px;
				background: #F8F8F8;
				li {
					float: left;
					height: 60px;
					margin-left: 40px;
					font-size: 16px;
					line-height: 60px;
					color: #666666;
					text-align: center;
					cursor: pointer;
					span {
						float: left;
					}
					img {
						float: left;
						height: 20px;
						margin-top: 20px
					}
				}
			}
			.list {
				.advert {
					border: none!important;
					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				li {
					&:nth-child(4n) {
						margin-right: 0px!important;
					}
					float: left;
					width: 320px;
					height: 450px;
					margin-top: 26px;
					margin-right: 26px;
					border: 1px solid #DDDDDD;
					cursor:pointer;
					img {
						height: 320px;
						width: 318px;
					}
					.details {
						position: relative;
						padding: 0 15px;
						p {
							display: inline-block;
							width: 100%;
							height: 50px;
							margin: 10px 0 12px;
							font-size: 14px;
							line-height: 22px;
							text-align: left;
							color: #222222;
							-webkit-white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
						}
						.left {
							text-align: left;
							width: 150px;
							b {
								font-size: 20px;
								line-height: 20px;
								margin-bottom: 10px;
								color: #F29B87;
								font-weight: 300;
								font-family: twCenMt;
							}
							p {
								font-size: 12px;
								line-height: 14px;
								height: 14px;
								margin: 4px 0 0 0;
								color: #999999;
							}
						}
						.right {
							a {
								color: #AAA;
								i {
									float: right;
									font-size: 20px;
									margin-top: 8px;
								}
								.big-icon {
									margin-top: 0;
									margin-right: 10px;
									font-size: 36px;
								}
							}
							.active {
								color: #EFA19F;
							}
						}
						.tips {
							position: absolute;
							top: -23px;
							left: 286px;
							width: 24px;
							height: 12px;
							background: #4C4C4C;
							border-radius: 2px;
							opacity: 0.6;
							overflow: hidden;
							cursor: pointer;
							.icon {
								display: inline-block;
								color: #FFFFFF;
								font-size: 16px;
								line-height: 16px;
								margin-top: -10px;
							}
						}
						.mask {
							position: absolute;
							top: -323px;
							right: 0;
							height: 320px;
							display: none;
							ul {
								display: inline-block;
								width: 190px;
								height: 320px;
								overflow: hidden;
								border: 1px solid #DDDDDD;
								border-top: none;
								li {
									height: 32px;
									width: 100%;
									font-size: 12px;
									margin: 0;
									border: none;
									line-height: 32px;
									color: #333333;
									background: #FFFFFF;
									opacity: 0.8;
									text-align: left;
									padding: 0 12px;
                  display: flex;
                  justify-content: center;
                  .item-name {
                    flex-grow: 1;
                    flex-shrink: 1;
                    text-align: left;
                  }
									.item-value {
                    flex-grow: 0;
                    flex-shrink: 0;
										display: inline-block;
										text-align: right;
									}
								}
							}
						}
						.maskShow {
							display: block;
						}
					}
				}
			}
			.activeselcet {
				color: #BA7F8C!important;
			}
			.list-viwe {
				li {
					border-bottom: 1px solid #E4E4E4;
					overflow: hidden;
					-webkit-transition: all 0.2s;
					-moz-transition: all 0.2s;
					-ms-transition: all 0.2s;
					transition: all 0.2s;
					&:hover {
						background: #f8f8f8;
					}
					span {
						float: left;
						width: 135px;
						font-size: 14px;
						line-height: 100px;
						height: 100px;
						color: #666666;
						.img {
							width: 80px;
							height: 80px;
							margin: 10px;
						}
						&:last-child {
							cursor: pointer;
						}
					}
					span:nth-child(8) {
						cursor: pointer;
						.icon {
							font-size: 18px;
						}
					}
					span:nth-child(9) {
						cursor: pointer;
						.icon {
							font-size: 30px;
						}
					}
					span:nth-child(10) {
						label {
							width: 80px;
							height: 24px;
							background: rgba(245, 240, 238, 1);
							display: block;
							position: relative;
							top: 50%;
							margin: 0 auto;
							margin-top: -12px;
							line-height: 24px;
							font-size: 14px;
							font-weight: 400;
							color: rgba(168, 143, 127, 1);
						}
					}
				}
				.list-title {
					border: none;
					background: #F8F8F8;
					span {
						height: 60px;
						font-size: 16px;
						line-height: 60px;
						img {
							margin-bottom: -4px;
						}
						&:nth-child(3),
						&:nth-child(4),
						&:nth-child(5),
						&:nth-child(6),
						&:nth-child(7),
						&:nth-child(8),
						&:nth-child(9),
						&:nth-child(10) {
							cursor: pointer;
						}
						&:nth-child(11),
						&:nth-child(12),
						&:nth-child(13) {
							cursor: initial;
						}
					}
				}
			}
			.compare {
				padding-top: 14px;
				overflow: auto;
				li {
					position: relative;
					float: left;
					width: 309px;
					cursor: pointer;
					margin-bottom: 34px;
					margin-right: 34px;
					&:hover {
						i {
							display: block;
						}
					}
					&:nth-child(4n) {
						margin-right: 0px;
					}
					border: 1px solid #DDDDDD;
					img {
						display: block;
						width: 100%;
						height: 309px;
					}
					>i {
						display: none;
						width: 28px;
						height: 28px;
						line-height: 28px;
						font-size: 28px;
						text-align: center;
						overflow: hidden;
						color: rgba(20, 20, 20, 0.3);
						position: absolute;
						top: -14px;
						right: -14px;
						cursor: pointer;
						z-index: 19;
					}
					.details {
						height: 393px;
						overflow: hidden;
						text-align: left;
						p {
							height: 48px;
							font-size: 14px;
							line-height: 22px;
							text-align: left;
							margin: 12px 12px 14px;
							color: #222222;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
						}
						b {
							margin-left: 12px;
							font-size: 20px;
							font-weight: 300;
							color: #F29B87;
							font-family: twCenMt;
						}
						.add-card {
							float: right;
							width: 80px;
							font-size: 12px;
							height: 24px;
							line-height: 24px;
							color: #FFFFFF;
							cursor: pointer;
							text-align: center;
							background: #AA8A7B;
							margin-right: 12px;
							margin-top: -2px;
							border-radius: 3px;
						}
						.add-carded {
							float: right;
							width: 80px;
							height: 24px;
							font-size: 12px;
							line-height: 24px;
							text-align: center;
							color: #666666;
							margin-right: 12px;
						}
						div {
							width: 100%;
							height: 32px;
							font-size: 12px;
							line-height: 32px;
							color: #333333;
							span {
								float: left;
								width: 108px;
								margin: 0 20px 0 12px;
							}
							span:nth-child(2) {
								text-align: center;
								font-size: 14px;
							}
						}
						.mar-t {
							margin-top: 11px;
						}
						div:nth-child(2n) {
							background: #F8F8F8;
						}
					}
				}
				li:nth-child(4n) {
					margin-right: 0px;
				}
			}
		}
		.more-parame {
			label {
				float: left;
				font-size: 18px;
				line-height: 40px;
				color: #1B1B1B;
			}
			.icon {
				float: left;
				font-size: 14px;
				line-height: 40px;
				margin: 0 10px 0 8px;
			}
			ul {
				float: left;
				height: 40px;
				margin: 0;
				padding-left: 4px;
				background: #F9F9F9;
				li:nth-child(4), li:nth-child(5) {
					>div{
						width: 240px;
						padding: 0 20px;
					}
				}
				li:nth-child(6){
					>div{
						width: 260px;
					}
				}
				li {
					position: relative;
					float: left;
					margin-right: 10px;
					height: 40px;
					font-size: 14px;
					line-height: 40px;
					color: #111111;
					>span {
						float: left;
						width: 12px;
						height: 12px;
						margin: 13px 5px;
						border-radius: 3px;
						cursor: pointer;
						border: 1px solid #DDDDDD;
					}
					.span {
						background: #D17B8F;
					}
					p {
						float: left;
					}
					>div {
						position: absolute;
						top: 40px;
						left: -4px;
						width: 220px;
						padding: 0 10px;
						background: #F9F9F9;
						display: none;
						span {
							display: inline-block;
							height: 20px;
							margin: 12px 10px 12px 0;
							font-size: 12px;
							line-height: 20px;
							padding: 0 5px;
							border: none;
							border-radius: 3px;
							&:hover {
								background: #eaeaea;
							}
						}
						.active {
							background: #D17B8F !important;
							color: #FFFFFF !important;
						}
					}
					.slider-m {
						padding-bottom: 10px;
						span {
							margin: 0;
							background: #FFFFFF !important;
						}
						.span {
							margin-left: 108px;
						}
					}
					&:hover {
						div {
							display: block;
						}
					}
				}
			}
			.clear-all {
				float: left;
				margin-left: 20px;
				cursor: pointer;
				font-size: 12px;
				line-height: 40px;
				color: #AA8A7B;
				text-decoration: underline;
			}
		}
		.see-more {
			height: 90px;
			background: #F4F2F3;
			margin-bottom: 60px;
			padding-top: 23px;
			div {
				margin: 0 auto;
				width: 190px;
				height: 44px;
				background: white;
				font-size: 14px;
				color: #999999;
				line-height: 44px;
				text-align: center;
				border: 1px solid #999999;
				cursor: pointer;
			}
		}
	}
</style>
