<template>
  <div class="warp">
    <!--<div class="fixShow">{{num}}</div>-->
    <div class="advert">
      <div
        v-if="advBanner.length>0"
        class="advert-swiper-container">
        <div class="swiper-wrapper" @click.stop="openAddress">
          <div
            v-for="(item,index) in advBanner"
            class="swiper-slide">
            <img
              :src="IMG_URL+item.image"
              :style="{cursor:item.addres != ''?'pointer':'initial'}">
          </div>
        </div>
        <div
          v-if="advBanner.length>1"
          class="swiper-pagination">
          <span
            v-for="(item,index) in advBanner"
            :class="advertIndex==index?'advert-active':''"
            @click.stop="goSlide(index)" />
        </div>
      </div>
    </div>
    <div class="middle-design">
      <div
        :style="{height:!showVideo?'950px':'1050px'}"
        class="design-word">
        <span>   <!-- 不包括單顆的鑽石、寶石或設計師收藏系列。不能與任何其他報價合並。 --></span>
        <div class="design-title">{{ lang.designYourEngagementRing }}</div>
        <!-- <div class="design-middle">
          {{ lang.designYourOwnEngagementRing }}
				</div> -->
        <label>{{ lang.startFromDiamond }}</label>
        <div
          v-show="!showVideo"
          class="card-container">
          <img
            src="../../static/images/index/card-1.png"
            class="card-img">
          <img
            src="../../static/images/index/card-2.png"
            class="card-img">
          <img
            src="../../static/images/index/card-3.png"
            class="card-img">
          <img
            src="../../static/images/index/card-4.png"
            class="card-img">
          <div class="card-box" />
        </div>
        <video
          v-show="showVideo"
          src="../../static/video/mv.mp4" />
      </div>
      <div class="design-logo">
        <div class="design-three">
          <div @click="goDetails(1)">
            <img
              src="../../static/images/index/ring02.png"
              alt="">
            <div class="image-cover"></div>
            <div class="design-message">
              {{ lang.engagementRings }}
              <div class="border-r" />
              <div class="border-l" />
              <div class="border-t" />
              <div class="border-b" />
            </div>
          </div>
          <div @click="goDetails(2)">
            <img
              src="../../static/images/index/ring01.png"
              alt="">
            <div class="image-cover"></div>
            <div class="design-message">
              <div>{{ lang.weddingAnd }}</div>
              <div>{{ lang.anniversary }}</div>
              <div class="border-r" />
              <div class="border-l" />
              <div class="border-t" />
              <div class="border-b" />
            </div>
          </div>
          <div @click="goList(4)">
            <img
              src="../../static/images/index/ring03.png"
              alt="">
            <div class="image-cover"></div>
            <div class="design-message">
              {{ lang.fineJewelry }}
              <div class="border-r" />
              <div class="border-l" />
              <div class="border-t" />
              <div class="border-b" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hot-sale">
      <div class="hot-sale-title">
        <div class="font-size-30">{{ moduleTitle }}</div>
        <!-- <div class="font-size-30">{{ moduleTitleZhTw }}</div>
				<div class="font-size-12">{{ moduleTitleEnUs }}</div> -->
        <div class="hot-sale-line" />
      </div>
      <div class="rings-swiper">
        <div class="swiper-box">
          <div
            v-if="swiperInit"
            class="swiper-container1">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <!-- Slides -->
              <div
                v-for="(img,index) in ringImg"
                :key="index"
                class="swiper-slide">
                <img
                  :src="IMG_URL + img.img"
                  alt=""
                  class="swiper-img">
              </div>
            </div>
          </div>
          <div class="swiper-switch">
            <div
              class="arrow"
              @click="swiperTop.slidePrev()">
              <img src="../../static/images/index/arrow-left.png">
            </div>
            <div>
              <div class="font-size-24 text-title color-333">{{ msgTop }}</div>
              <!--              <div class="font-size-18 color-333">{{ goodsCode }}</div>-->
            </div>
            <div
              class="arrow"
              @click="swiperTop.slideNext()">
              <img src="../../static/images/index/arrow-right.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="middle-gia">
      <img
        src="../../static/images/index/middle-gia.png"
        alt="">
      <div class="gia-content">
        <div class="font-size-24 color-333 margin-bottom-30"><!-- 實時交互 --></div>
        <div class="font-size-36 color-000 margin-bottom-50">{{ lang.haveProfessionalCertificate }}</div>
        <div class="font-size-16 color-333">
          {{ lang.professionalCertificateInfo }}
        </div>
        <div
          class="font-size-14 color-fff"
          @click="goProof">{{ lang.startYourDiamondCheck }}
        </div>
      </div>
    </div>
    <div class="diamond-choose">
      <div class="font-size-30 color-000 margin-bottom-20">{{ lang.chooseYourDiamond }}</div>
      <!-- <div class="font-size-12 color-333">{{ lang.experienceTheDiamondRevolution }}</div> -->
      <!-- <div class="diamond-line" /> -->
      <div class="font-size-18 color-333">{{ lang['360DiamondInfo'] }}</div>
      <div class="rings-swiper">
        <div class="swiper-box">
          <div
            v-if="swiperInit"
            class="swiper-container2">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <!-- Slides -->
              <div
                v-for="(d,index) in diamondImg"
                :key="index"
                class="swiper-slide">
                <img
                  :src="d.img"
                  alt=""
                  class="swiper-img">
              </div>
            </div>
          </div>
          <div class="swiper-switch">
            <div
              class="arrow"
              @click="swiperBot.slidePrev()">
              <img src="../../static/images/index/arrow-left.png">
            </div>
            <div>
              <div class="font-size-24 color-333">{{ msgBot.name }}</div>
              <div class="font-size-18 color-333">{{ msgBot.desc }}</div>
            </div>
            <div
              class="arrow"
              @click="swiperBot.slideNext()">
              <img src="../../static/images/index/arrow-right.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="jewelry">
      <img
        class="jewelry-bg"
        src="../../static/images/index/jewelry-bg.png"
        alt="">
      <div class="jewelry-title">
        <div class="font-size-30 color-333 margin-bottom-20">{{ lang.jewelry }}</div>
        <div
          class="font-size-12 color-333"
          style="display: none">{{ lang.findYourSparkle }}</div>
        <div class="diamond-line" />
        <div class="font-size-18 color-333">{{ lang.goodForYouEverywhere }}
        </div>
      </div>
      <div style="position: relative;">
        <div class="jewelry-box box1">
          <div class="content-cover">
            <span
              :style="{transform: `translate(0, ${jewelryBoxTranslate[0].bgText}px)`}"
              class="bg-text">{{ lang.eternityRingsSlow }}</span>
          </div>
          <div class="content-cover">
            <div
              :style="{transform: `translate(0, ${jewelryBoxTranslate[0].content}px)`}"
              class="jewelry-box-content"
              @click="goList(1)">
              <div class="font-size-24 color-333 margin-bottom-30">{{ lang.eternalRing }}</div>
              <!-- <div class="font-size-12 color-000 margin-bottom-30">{{ lang.eternityRings }}</div> -->
              <div class="font-size-12 color-333 line-height-30">{{ lang.eternityRingsInfo }}</div>
              <div class="font-size-16 color-fff box-btn">{{ lang.explore }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="position: relative;">
        <div class="jewelry-box box2">
          <div class="content-cover">
            <span
              :style="{transform: `translate(0, ${jewelryBoxTranslate[1].bgText}px)`}"
              class="bg-text">{{ lang.menWedding }}</span>
          </div>
          <div class="content-cover">
            <div
              :style="{transform: `translate(0, ${jewelryBoxTranslate[1].content}px)`}"
              class="jewelry-box-content"
              @click="goList(2)">
              <div class="font-size-24 color-333 margin-bottom-30">{{ lang.menWeddingRings }}</div>
              <!-- <div class="font-size-12 color-000 margin-bottom-30">{{ lang.menWeddingRingsCapital }}</div> -->
              <div class="font-size-12 color-333 line-height-30">{{ lang.menWeddingRingsInfo }}</div>
              <div class="font-size-16 color-fff box-btn">{{ lang.discover }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="position: relative;">
        <div class="jewelry-box box3">
          <div class="content-cover">
            <span
              :style="{transform: `translate(0, ${jewelryBoxTranslate[2].bgText}px)`}"
              class="bg-text">{{ lang.diamondStuds }}</span>
          </div>
          <div class="content-cover">
            <div
              :style="{transform: `translate(0, ${jewelryBoxTranslate[2].content}px)`}"
              class="jewelry-box-content"
              @click="goList(3)">
              <div class="font-size-24 color-333 margin-bottom-30">{{ lang.diamondStudEarrings }}</div>
              <!-- <div class="font-size-12 color-000 margin-bottom-30">{{ lang.diamondStuds }}</div> -->
              <div class="font-size-12 color-333 line-height-30">{{ lang.diamondStudsInfo }}</div>
              <div class="font-size-16 color-fff box-btn">{{ lang.browse }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shop">
      <div class="font-size-30 color-333">{{ lang.yourDiamondWaiting }}</div>
      <!--      <div class="font-size-12 color-333">DIAMOND CONCIERGE AWAITS...</div>-->
      <!-- <div class="font-size-12 color-333">{{ lang.yourPersonalDiamondConciergeAwaits }}</div>
			<div class="diamond-line" /> -->
      <div class="shop-two">
        <div>
          <img
            src="../../static/images/index/shop-left.png"
            alt="">
          <div class="shop-word-l">
            <div class="font-size-24 color-333">{{ lang.understand }}</div>
            <div class="font-size-30 color-333 margin-bottom-10">{{ lang.brandStory }}</div>
            <div>{{ lang.witnessContentFirstLine }}<br>{{ lang.witnessContentSecondLine }}<br>{{ lang.witnessContentThirdLine }}</div>
            <div
              class="shop-btn-l pointer"
              @click="goQualityValue">{{ lang.scheduleAppointment }}
            </div>
          </div>
        </div>
        <div>
          <img
            src="../../static/images/index/shop-right.png"
            alt="">
          <div class="shop-word-r">
            <div class="font-size-24 color-333">{{ lang.expertLevel }}</div>
            <div class="font-size-30 color-333 margin-bottom-10">{{ lang.customerService }}</div>
            <div>{{ lang.customerServiceInfo }}</div>
            <div
              class="shop-btn-r pointer"
              @click="goContact">{{ lang.contactUs }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="bot-help">
			<div class="bot-help-line" />
		</div> -->
    <!-- <div class="bot-picture">
			<div class="font-size-30 color-333">源自內心的性情表達</div>
			<div class="font-size-12 color-333">TEMPERAMENT EXPRESSION!</div>
			<div class="diamond-line" />
			<div class="many-model">
				<div class="many-l">
					<img src="../../static/images/index/many-insert.png" alt="">
					<div class="many-bord" />
				</div>
				<div class="many-m">
					<div>
						<div>
							<img src="../../static/images/index/many-m-1.png" alt="">
							<div class="many-bord" />
						</div>
						<div>
							<img src="../../static/images/index/many-m-2.png" alt="">
							<div class="many-bord" />
						</div>
					</div>
					<div>
						<div>
							<img src="../../static/images/index/many-m-3.png" alt="">
							<div class="many-bord" />
						</div>
						<div>
							<img src="../../static/images/index/many-m-4.png" alt="">
							<div class="many-bord" />
						</div>
					</div>
				</div>
				<div class="many-r">
					<div>
						<img src="../../static/images/index/many-r-1.png" alt="">
						<div class="many-bord" />
					</div>
					<div>
						<img src="../../static/images/index/many-r-2.png" alt="">
						<div class="many-bord" />
					</div>
				</div>
			</div>
		</div> -->
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.js';
import { getToken, clearCustom, clearTwoCustom } from '@/api/cache.js';
export default {
  name: 'Index',
  data() {
    return {
      lang: this.$LANGUAGE.index,
      showVideo: false,
      advAddress: '',
      advBanner: [],
      tdOpenType: 1,
      advertIndex: 0,
      rings: [],
      ringImg: [],
      diamondImg: [{
        name: this.$LANGUAGE.index.round,
        id: '18',
        desc: this.$LANGUAGE.index.roundDesc,
        img: require('../../static/images/index/round.png')
      }, {
        name: this.$LANGUAGE.index.princessSquare,
        id: '19',
        desc: this.$LANGUAGE.index.princessSquareDesc,
        img: require('../../static/images/index/pincess.png')
      }, {
        name: this.$LANGUAGE.index.octagonalTrapezoid,
        id: '20',
        desc: this.$LANGUAGE.index.octagonalTrapezoidDesc,
        img: require('../../static/images/index/emerald.png')
      }, {
        name: this.$LANGUAGE.index.laserSquare,
        id: '21',
        desc: this.$LANGUAGE.index.laserSquareDesc,
        img: require('../../static/images/index/asscher.png')
      }, {
        name: this.$LANGUAGE.index.pincushion,
        id: '22',
        desc: this.$LANGUAGE.index.pincushionDesc,
        img: require('../../static/images/index/cushion.png')
      }, {
        name: this.$LANGUAGE.index.marquise,
        id: '23',
        desc: this.$LANGUAGE.index.marquiseDesc,
        img: require('../../static/images/index/marquise.png')
      }, {
        name: this.$LANGUAGE.index.octagonalLaser,
        id: '24',
        desc: this.$LANGUAGE.index.octagonalLaserDesc,
        img: require('../../static/images/index/radiant.png')
      }, {
        name: this.$LANGUAGE.index.oval,
        id: '25',
        desc: this.$LANGUAGE.index.ovalDesc,
        img: require('../../static/images/index/oval.png')
      }, {
        name: this.$LANGUAGE.index.dropShape,
        id: '26',
        desc: this.$LANGUAGE.index.dropShapeDesc,
        img: require('../../static/images/index/pear.png')
      }, {
        name: this.$LANGUAGE.index.heartShaped,
        id: '27',
        desc: this.$LANGUAGE.index.heartShapedDesc,
        img: require('../../static/images/index/heart.png')
      }],
      swiperTop: null,
      swiperBot: null,
      num: 0,
      swiperInit: false,
      moduleTitle: '',
      msgTop: '',
      goodsCode: '',
      msgBot: {
        title: '',
        desc: ''
      },
      jewelryBoxTranslate: {
        0: {
          content: 0,
          bgText: 0
        },
        1: {
          content: 0,
          bgText: 0
        },
        2: {
          content: 0,
          bgText: 0
        }
      }
    };
  },
  created() {
    let token = getToken();
    if (token) {
      // 在cookie存在token的话，获取用户信息，改变用户状态
      this.$axiosGet(`web/user/me`).then(res => {
        if (res.code === 200) {
          this.$store.commit('setToken', res.data, token);
        } else {}
      });
    } else {
      this.$store.commit('unsetToken');
    }
    this.getRings();
    clearCustom();
    clearTwoCustom();
  },
  mounted() {
    // this.initSwiper()
    window.addEventListener('scroll', this.showHeight);

    var eles = document.getElementsByClassName('card-img');
    for (var i = 0; i < eles.length; i++) {
      this.initMouse(eles[i], i);
    }
  },
  beforeDestory() {
    window.removeEventListener('scroll', this.showHeight);
  },
  methods: {
    initSwiper() {
      let that = this;
      this.swiperTop = new Swiper('.swiper-container1', {
        loop: true,
        slidesPerView: 5,
        centeredSlides: true,
        observer: true,
        loopAdditionalSlides: 100,
        observeParents: true,
        onSlideChangeEnd(swiper) {
          // console.log(this.realIndex)
          that.msgTop = that.ringImg[swiper.realIndex].name;
          that.goodsCode = that.ringImg[swiper.realIndex].title;
        },
        onTap: function (swiper) { // 获取点击事件
          let Index = swiper.clickedSlide.getAttribute('data-swiper-slide-index');
          if (swiper.clickedSlide) {
            if (that.ringImg[Index].showType === 1) {
              window.open(`/seleceEngagement/${that.ringImg[Index].goodsId}/2`);
            } else {
              that.$router.push({
                name: 'seleceEngagement',
                params: {
                  id: that.ringImg[Index].goodsId,
                  key: 2
                }
              });
            }
          }
        }
      });
      this.swiperBot = new Swiper('.swiper-container2', {
        loop: true,
        centeredSlides: true,
        loopAdditionalSlides: 100,
        slidesPerView: 5,
        onSlideChangeEnd(swiper) {
          that.msgBot = that.diamondImg[swiper.realIndex];
        },
        onTap: function (swiper) { // 获取点击事件
          let Index = swiper.clickedSlide.getAttribute('data-swiper-slide-index');
          if (swiper.clickedSlide) {
            that.$router.push({
              name: 'diamond',
              params: {
                id: that.diamondImg[Index].id,
                key: 2
              }
            });
          }
        }
      });
    },
    showHeight(e) {
      requestAnimationFrame(() => {
        let jewelryBoxContents = document.getElementsByClassName('jewelry-box-content');
        for (let n = 0, length = jewelryBoxContents.length; n < length; n++) {
          let parentRect = jewelryBoxContents[n].parentNode.getBoundingClientRect();
          let clientRect = jewelryBoxContents[n].getBoundingClientRect();

          if ((parentRect.top < window.screen.height) && ((parentRect.top + parentRect.height) > 100)) {
            // console.log('coming');
            let proportion = 1 - (clientRect.top / window.screen.height);
            this.jewelryBoxTranslate[n].content = `${(parentRect.height - clientRect.height - 20) * proportion}`;
            this.jewelryBoxTranslate[n].bgText = `${100 * proportion}`;
          } else {
            // console.log('can not see');
          }
        }
      });
      // console.info(document.documentElement.scrollTop)

      // 展开和收起卡牌
      if (document.getElementsByClassName('card-container').length > 0) {
        var eles = document.getElementsByClassName('card-img');
        var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var offsetTop = document.getElementsByClassName('card-container')[0].offsetTop;
        if (scrollTop >= offsetTop - 400 && scrollTop <= offsetTop + 200) {
          for (var i = 0; i < eles.length; i++) {
            eles[i].className = 'card-img open';
          }
        } else {
          for (var i = 0; i < eles.length; i++) {
            eles[i].className = 'card-img';
          }
        }
      }
    },
    // 去刷选页 0从戒托开始 1从钻石开始
    goSelect(id) {
      if (id == 0) { // 从戒托开始
        this.$router.push({
          name: 'engagementRing',
          params: {
            id: 0,
            key: 1
          }
        });
      } else if (id == 1) { // 从钻石开始
        this.$router.push({
          name: 'diamond',
          params: {
            id: 1,
            key: 1
          }
        });
      }
    },
    // 去落地页1订婚2结婚2钻石
    goDetails(type) {
      let name = '';
      if (type == 1) {
        name = 'engagementRingDetails';
      } else if (type == 2) {
        name = 'weddingRingDetails';
      } else {
        name = 'diamondDetails';
      }
      this.$router.push({
        name: name
      });
    },
    // 去钻石证书
    goProof() {
      this.$router.push({
        name: 'proof'
      });
    },

    // 去品牌故事
    goBrandStory() {
      this.$router.push({
        name: 'brandStory'
      });
    },

    // 去品质与价值
    goQualityValue() {
      this.$router.push({
        name: 'qualityValue'
      });
    },
    // 联系我们contact
    goContact() {
      this.$router.push({
        name: 'contact'
      });
    },
    // 去列表
    goList(type, id) {
      if (type == 1) {
        this.$router.push({
          name: 'engagementRing',
          params: {
            id: 0,
            key: 1
          }
        });
      }
      if (type == 2) {
        this.$router.push({
          name: 'weddingRing',
          params: {
            id: 457,
            key: 3
          }
        });
      }
      if (type == 3) {
        this.$router.push({
          name: 'jewelleryAccessories',
          params: {
            id: 208,
            key: 1
          }
        });
      }
      if (type == 4) {
        this.$router.push({
          name: 'jewelleryAccessories',
          params: {
            id: 206,
            key: 1
          }
        });
      }
    },
    openAddress() {
			let ind = this.advBanner[this.advertIndex].addres
      let openType = this.tdOpenType == 1 ? '_blank' : '_parent';
      if (ind && ind != '') {
        window.open(ind.indexOf('http') == -1 ? 'http://' + ind : ind, openType);
      }
    },
    goSlide(index) {
      this.adverSwiper.slideTo(index + 1);
    },
    getRings() {
      this.$axiosGet(`/web/Website/queryWebsiteModule`, {type: 1}).then(res => {
        this.module = res.data.webSite;
        this.advBanner = [];
        this.tdOpenType = res.data.advert[0].tdOpenType || null;
        if (res.data.advert[0].advertImgModelList && res.data.advert[0].advertImgModelList.length > 0) {
          this.advBanner = res.data.advert[0].advertImgModelList;
        } else {
          const o = {
            addres: '',
            id: '',
            image: res.data.advert[0].dsImg,
            tbAdvertId: ''
          };
          this.advBanner.push(o);
        }
        if (this.advBanner.length > 1) {
          setTimeout(() => {
            this.adverSwiper = new Swiper('.advert-swiper-container', {
              slidesPerView: 1,
              loop: true,
              autoplay: 5000,
              autoplayDisableOnInteraction: false,
              onTransitionStart: (swiper) => {
                this.advertIndex = swiper.realIndex;
              }
            });
          }, 10);
        }
        // console.log(res)
        res.data.webSite.forEach((v) => {
          if (v.id === 1) {
            this.rings = v.moduleGoods ? v.moduleGoods.map(item => {
              if (!item.hasOwnProperty('showType')) {
                item.showType = v.showType;
              }
              return item;
            }) : [];
            this.moduleTitle = v.moduleTitle;
          }
        });
        for (let i in this.rings) {
          // console.log(this.rings[i].goods[0].goodsImages)
          if (!this.rings[i].goods.goodsImages) {
            continue;
          }
          let arr = this.rings[i].goods.goodsImages.split(',');
          let o = {
            name: this.rings[i].goods.goodsName,
            title: this.rings[i].goods.goodsCode,
            goodsId: this.rings[i].goodsId,
            img: arr[0],
            showType: this.rings[i].showType
          };
          this.ringImg.push(o);
        }
        this.swiperInit = true;
        setTimeout(() => {
          this.initSwiper();
        }, 500);
      }).catch(err => {
        console.log(err);
      });
    },
    // 初始化鼠标移动
    initMouse(drag, index) {
      var _this = this;
      var box = document.getElementsByClassName('card-box')[0];
      var container = document.getElementsByClassName('card-container')[0];
      // 原始位置状态
      var rotate = drag.style.transform;
      var left = drag.style.left;
      var top = drag.style.top;

      /**
				 * 盒子位置
				 */
      var boxTop = box.offsetTop,
        boxLeft = box.offsetLeft;
      drag.onmousedown = function (e) { // 鼠标按下
        if (drag.className.indexOf('open') == -1) {
          return;
        }
        var e = e || window.event;
        e.stopPropagation();
        e.preventDefault();

        // 设置初始位置
        var initTop = (container.offsetTop - (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + drag.offsetTop + 30);
        var initLeft = container.offsetLeft + drag.offsetLeft + 'px';

        drag.style.transition = 'none';
        drag.style.position = 'fixed';
        drag.style.zIndex = 11111;
        drag.style.transform = 'rotate(0deg)';
        drag.style.top = `${initTop}px`;
        drag.style.left = initLeft;

        var diffX = e.clientX - drag.offsetLeft;
        var diffY = e.clientY - drag.offsetTop;
        if (typeof drag.setCapture !== 'undefined') {
          drag.setCapture();
        }

        document.onmousemove = function (e) { // 鼠标移动
          e.stopPropagation();
          e.preventDefault();
          var e = e || window.event;
          var left = e.clientX - diffX;
          var top = e.clientY - diffY;

          if (left < 0) {
            left = 0;
          } else if (left > window.innerWidth - drag.offsetWidth) {
            left = window.innerWidth - drag.offsetWidth;
          }
          if (top < 0) {
            top = 0;
          } else
          if (top > window.innerHeight - drag.offsetHeight) {
            top = window.innerHeight - drag.offsetHeight;
          }
          drag.style.left = `${left}px`;
          drag.style.top = `${top}px`;
        };

        document.onmouseup = function (e) { // 松开鼠标
          var isEnter = false;
          setTimeout(() => {
            if (isEnter) {
              this.onmousedown = null;
              drag.style.left = (boxLeft - 14) + 'px';
              drag.style.top = (boxTop - 10) + 'px';
              _this.showVideo = true;
              var video = document.getElementsByTagName('video')[0];
              video.play();
              video.onended = function () {
                _this.showVideo = false;
                drag.style.left = left;
                drag.style.top = top;
                drag.style.zIndex = 1;
                drag.style.transform = rotate;
                var eles = document.getElementsByClassName('card-img');
                for (var i = 0; i < eles.length; i++) {
                  eles[i].className = 'card-img open';
                }
              };
              setTimeout(() => {
                if (document.documentElement.scrollTop) {
                  document.documentElement.scrollTop = video.offsetTop - 80;
                } else {
                  document.body.scrollTop = video.offsetTop - 80;
                }
              }, 10);
            } else {
              drag.style.left = left;
              drag.style.top = top;
            }
            drag.style.transition = 'none';
            drag.style.position = 'absolute';
            setTimeout(() => {
              drag.style.transition = 'all 0.8s';
            }, 100);
          }, 400);

          var dragTop = drag.offsetTop,
            dragLeft = drag.offsetLeft;

          drag.style.transition = 'all 0.3s';
          var boxETop = container.offsetTop - (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + 176;
          var boxELeft = container.offsetLeft + 700;
          if (dragTop >= boxETop - 298 &&
							dragTop <= boxETop + 298 &&
							dragLeft >= boxELeft - 182 &&
							dragLeft <= boxELeft + 182
          ) { // 進入盒子
            isEnter = true;
            drag.style.left = (boxELeft + 45) + 'px';
            drag.style.top = (boxETop + 20) + 'px';
          } else { // 未進入，返回起點
            isEnter = false;
            drag.style.left = initLeft;
            drag.style.top = (initTop + 76) + 'px';
            drag.style.zIndex = 1;
            drag.style.transform = rotate;
          }
          this.onmousemove = null;
          this.onmouseup = null;
          if (typeof drag.releaseCapture !== 'undefined') {
            drag.releaseCapture();
          }
        };
      };
    }
  }
};
</script>

<style lang="less" scoped>
	.advert {
		position: relative;
		min-width: 1360px;
		min-height: 453px;
		width: 100% !important;
	}

	.swiper-pagination {
		position: absolute;
		width: 100%;
		bottom: 40px;
	}

	.advert-swiper-container img {
		display: block;
		width: 100%;
	}

	.advert-swiper-container {
		overflow: hidden;
	}

	.swiper-pagination span {
		width: 12px;
		margin: 0 14px;
		height: 12px;
		cursor: pointer;
		background: rgba(255, 255, 255, 1);
		opacity: 0.5;
		border-radius: 50%;
		display: inline-block;
	}

	.swiper-pagination .advert-active {
		opacity: 1;
	}

	.fixShow {
		position: fixed;
		z-index: 999;
		background: pink;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.warp {
		max-width: 1920px;
		min-width: 1525px;
		margin: 0 auto;
	}

	.warp .adv-banner {
		width: 100%;
		max-height: 640px;
		overflow: hidden;
		margin-bottom: 58px;
	}

	.warp .adv-banner img {
		display: block;
		width: 100%;
		margin-bottom: 11px;
	}

	.warp .adv-banner .img-help {
		width: 100%;
		margin-bottom: 11px;
		background-color: pink;
	}

	.warp .adv-banner span {
		font-size: 14px;
	}

	.middle-design {
		width: 100%;
	}

	.design-logo {
		width: 79%;
		margin: 0 auto;
	}

	.design-logo>img {
		display: block;
		width: 100%;
		margin-bottom: 58px;
	}

	.design-word {
		background: #FFFCF7;
		padding-top: 11px;
		margin-bottom: 50px;
		height: 1110px;
	}

	.design-word>span {
		color: #000000;
		font-size: 14px;
	}

	.design-word>label {
		color: #666666;
		font-size: 14px;
		margin-top: 20px;
		cursor: initial;
	}

	.design-title {
		font-size: 36px;
		color: #666;
		margin-bottom: 9px;
		margin-top: 60px;
		text-align: center;
	}

	.design-middle {
		font-size: 12px;
		color: #666666;
		margin-bottom: 20px;
		text-align: center;
	}

	.card-container {
		margin: 0 auto;
		margin-top: 41px;
		width: 1520px;
		position: relative;
		background-image: url(../../static/images/index/card-bg.png);
		background-size: 100% 100%;
		height: 660px;
	}

	video {
		position: relative;
		display: block;
		width: 1360px;
		margin: 0 auto;
		margin-top: 40px;
	}

	.card-box {
		width: 220px;
		height: 308px;
		border: 3px dashed rgba(221, 177, 170, 1);
		position: absolute;
		left: 759px;
		top: 176px;
	}

	.card-img {
		cursor: pointer;
		position: absolute;
		z-index: 1;
		transition: all 0.8s;
	}

	.card-img {
		transform: rotate(-30deg);
		top: 310px;
		left: 65px;
	}

	.card-container .open:first-child {
		transform: rotate(-30deg);
		top: 310px;
	}

	.card-container .open:first-child:hover {
		top: 234px;
		z-index: 2!important;
	}

	.card-container .open:nth-child(2) {
		transform: rotate(-10deg);
		left: 120px;
		top: 290px;
	}

	.card-container .open:nth-child(2):hover {
		top: 204px;
		z-index: 2!important;
	}

	.card-container .open:nth-child(3) {
		transform: rotate(10deg);
		left: 177px;
		top: 290px;
	}

	.card-container .open:nth-child(3):hover {
		top: 204px;
		z-index: 2!important;
	}

	.card-container .open:nth-child(4) {
		transform: rotate(30deg);
		left: 237px;
		top: 310px;
	}

	.card-container .open:nth-child(4):hover {
		top: 234px;
		z-index: 2!important;
	}

	.design-content {
		width: 486px;
		font-size: 14px;
		color: #333;
		text-align: left;
		margin-bottom: 42px;
		line-height: 30px;
	}

	.design-two-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 506px;
		font-size: 16px;
		color: #333;
		margin-bottom: 21px;
	}

	.design-btn {
		width: 220px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		color: #fff;
		background: #CFC3BD;
		cursor: pointer;
	}

	.design-btn:nth-child(3) {
		width: 233px;
	}

	.design-little {
		width: max-content;
		font-size: 14px;
		color: #333;
		text-align: left;
		margin-bottom: 165px;
	}

	.design-little span:nth-child(2) {
		color: #F09595;
		text-decoration: underline;
	}

	.design-three {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 60px;
	}

	.design-three>div {
		width: 32.145%;
		height: max-content;
		background-color: #ffffff;
		/*background-color: pink;*/
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}

	.design-three>div img {
		width: 100%;
		display: block;
		opacity: 1;
		transition: all 0.2s linear;
	}

	.design-three>div:hover img {
		/*opacity: 0.6;*/
		transform: scale(1.1, 1.1);
	}

	.design-three>div>.image-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    z-index: 2;
    transition: all 0.2s linear;
  }
	.design-three>div:hover>.image-cover {
    background-color: rgba(0, 0, 0, 0.18);
  }
	.design-three>div>.design-message {
		width: 89.5%;
		height: 190px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		font-size: 48px;
		/*font-weight: bold;*/
		color: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
    z-index: 10;
	}

	.design-three>div>.design-message .border-r {
		position: absolute;
		bottom: 0;
		left: 100%;
		height: 0;
		width: 1px;
		background: #FFFFFF;
		transition: all 0.3s ease-in;
	}

	.design-three>div:hover>.design-message .border-r {
		height: 100%;
	}

	.design-three>div>.design-message .border-l {
		position: absolute;
		top: 0;
		left: 0;
		height: 0;
		width: 1px;
		background: #FFFFFF;
		transition: all 0.3s ease-in;
	}

	.design-three>div:hover>.design-message .border-l {
		height: 100%;
	}

	.design-three>div>.design-message .border-t {
		position: absolute;
		top: 0;
		right: 0;
		height: 1px;
		width: 0;
		background: #FFFFFF;
		transition: all 0.3s ease-in;
	}

	.design-three>div:hover>.design-message .border-t {
		width: 100%;
	}

	.design-three>div>.design-message .border-b {
		position: absolute;
		top: 100%;
		left: 0;
		height: 1px;
		width: 0;
		background: #FFFFFF;
		transition: all 0.3s ease-in;
	}

	.design-three>div:hover>.design-message .border-b {
		width: 100%;
	}

	.hot-sale {
		width: 100%;
		margin-bottom: 60px;
	}

	.hot-sale-title {
		position: relative;
		width: 100%;
		height: 102px;
		background-color: #FBF8F3;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		color: #333;
	}

	.hot-sale-line {
		width: 100px;
		height: 1px;
		background-color: #999;
		position: absolute;
		bottom: -20px;
		z-index: 99;
	}

	.rings-swiper {
		width: 100%;
		padding-top: 80px;
		overflow: hidden;
	}

	.swiper-box {
		width: 100%;
		height: max-content;
		position: relative;
	}

	.swiper-container1,
	.swiper-container2 {
		width: 100%;
		height: 100%;
		padding: 40px 0 10px 0;
	}

	.swiper-slide {
		cursor: pointer;
	}

	.swiper-container1 .swiper-slide-active,
	.swiper-container2 .swiper-slide-active {
		transform: scale(1.7);
	}

	.swiper-slide-active {
		z-index: 2;
	}

	.swiper-slide {
		width: 100%;
		height: 100%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
		transition: 0.3s linear;
	}

	.swiper-img {
		display: block;
		/*min-width: 252px;*/
		/*max-width: 300px;*/
		/*width: 100%;*/
		width: 252px;
	}

	.swiper-switch {
		display: flex;
		width: 604px;
		align-items: center;
		justify-content: space-between;
		margin: 80px auto 0;
		/*z-index: 9999;*/
		position: relative;
	}

	.arrow {
		width: 64px;
		height: 13px;
	}
	.text-title {
		max-width: 460px;
		line-height: 36px;
	}
	.arrow img {
		width: 100%;
		transition: 0.2s linear;
	}

	.arrow img:hover {
		transform: scale(1.3);
	}

	.middle-gia {
		width: 100%;
		position: relative;
		margin-bottom: 70px;
	}

	.middle-gia img {
		width: 100%;
		display: block;
	}

	.gia-content {
		position: absolute;
		top: 202px;
		right: 17%;
		width: 33%;
		text-align: left;
	}

	.gia-content div:nth-child(3) {
		line-height: 30px;
	}

	.gia-content div:nth-child(4) {
		width: 360px;
		height: 42px;
		line-height: 42px;
		background-color: #CFC3BD;
		margin-top: 60px;
		text-align: center;
		cursor: pointer;
	}

	.diamond-line {
		width: 100px;
		height: 1px;
		margin: 20px auto 0;
		background-color: #999;
		position: relative;
		z-index: 99;
	}

	.diamond-choose div:nth-child(4),
	.jewelry-title div:nth-child(4) {
		width: 36%;
		margin: 14px auto 0;
	}

	.jewelry {
		position: relative;
		overflow: hidden;
		margin-bottom: 66px;
		padding-bottom: 105px;
	}

	.jewelry img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.jewelry-bg {
		position: absolute;
	}

	.jewelry-title {
		position: relative;
		/*top: 170px;*/
		left: 0;
		right: 0;
		margin: 0 auto;
		padding-top: 170px;
		padding-bottom: 130px;
	}

	.jewelry-box {
		position: relative;
		width: 35%;
		/*height: auto;*/
	}

	.jewelry-box>img {
		width: 100%;
		height: auto;
		max-width: 100%;
		max-height: 100%;
		/*background-color: #795da3;*/
		/*box-shadow: 0 10px 20px 7px #cccccc;*/
		transition: all 0.5s linear;
	}

	.content-cover {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		.bg-text {
			position: absolute;
			font-size: 130px;
			line-height: 100px;
			color: #F4EEEA;
			font-weight: lighter;
			white-space: nowrap;
			display: block;
			transition: all 0.3s linear;
		}
	}

	.content-cover:nth-of-type(2) {
		box-shadow: 0px 21px 43px 0px #bfbeba;
	}

	.jewelry-box-content {
		position: absolute;
		top: 0;
		/*left: -38%;*/
		/*width: 66%;*/
		/*height: 76%;*/
		background-color: rgba(255, 255, 255, 0.7);
		/*padding: 52px 49px 26px 49px;*/
		text-align: left;
		transition: all 0.5s linear;
	}

	.jewelry-box.box1 {
		left: 20%;
		height: 477px;
		.content-cover:nth-of-type(2) {
			background-image: url("../../static/images/index/jewelry-1.png");
		}
		.content-cover {
			.bg-text {
				top: 258px;
				left: -381px;
			}
			.jewelry-box-content {
				width: 441px;
				height: 361px;
				left: -194px;
				padding: 52px 49px 26px 84px;
			}
		}
	}

	.jewelry-box.box2 {
		left: 55%;
		height: 526px;
		.content-cover:nth-of-type(2) {
			background-image: url("../../static/images/index/jewelry-2.png");
		}
		.content-cover {
			.bg-text {
				top: 450px;
				/*top: 507px;*/
				left: 175px;
			}
			.jewelry-box-content {
				width: 500px;
				height: 328px;
				left: -213px;
				padding: 52px 81px 26px 50px;
			}
		}
	}

	.jewelry-box.box3 {
		left: 20%;
		height: 521px;
		.content-cover:nth-of-type(2) {
			background-image: url("../../static/images/index/jewelry-3.png");
		}
		.content-cover {
			.bg-text {
				top: 420px;
				left: -314px;
			}
			.jewelry-box-content {
				width: 440px;
				height: 328px;
				left: -180px;
				padding: 52px 49px 26px 83px;
			}
		}
	}

	.box-btn {
		width: 113px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		background-color: #D4BFB5;
		/*margin-top: 60px;*/
		position: absolute;
		bottom: 26px;
		cursor: pointer;
	}

	.shop-two {
		margin: 76px auto 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 79.4%;
	}

	.shop-two>div {
		width: 49%;
		height: max-content;
		position: relative;
		overflow: hidden;
	}

	.shop-two>div:nth-child(1) {
		background-color: #F0E2DA;
		text-align: right;
	}

	.shop-two>div:nth-child(2) {
		background-color: #F4EADE;
		text-align: left;
	}

	.shop-two>div:nth-child(1)>img {
		display: block;
		width: 43%;
		float: left;
		position: relative;
		z-index: 99;
	}

	.shop-two>div:nth-child(2)>img {
		display: block;
		width: 43%;
		float: right;
		position: relative;
		z-index: 99;
	}

	.shop-word-l {
		height: 78%;
		position: absolute;
		top: 11.3%;
		right: 3%;
		border: 1px solid #fff;
		padding-right: 4%;
		padding-top: 6%;
		padding-left: 46%;
	}

	.shop-word-l div:nth-child(3),
	.shop-word-r div:nth-child(3) {
		font-size: 14px;
		line-height: 26px;
	}

	.shop-btn-l {
		width: 224px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		color: #fff;
		background-color: #D4B5B5;
		position: absolute;
		bottom: 10%;
		right: 4%;
	}

	.shop-word-r {
		height: 78%;
		position: absolute;
		top: 11.3%;
		left: 3%;
		border: 1px solid #fff;
		padding-left: 4%;
		padding-top: 6%;
		padding-right: 46%;
	}

	.shop-btn-r {
		width: 142px;
		height: 42px;
		line-height: 42px;
		text-align: center;
		color: #fff;
		background-color: #D4BFB5;
		position: absolute;
		bottom: 10%;
		left: 4%;
	}

	.bot-help {
		width: 100%;
		height: 76px;
		background-color: #FBF8F3;
		padding-top: 23px;
	}

	.bot-help-line {
		width: 3px;
		height: 29px;
		background-color: #FFFFFF;
		margin: 0 auto;
	}

	.many-model {
		width: 79.27%;
		height: max-content;
		margin: 50px auto 60px;
		display: flex;
		justify-content: space-between;
	}

	.many-model img {
		width: 100%;
		display: block;
	}

	.many-l {
		width: 18.1%;
		position: relative;
	}

	.many-m {
		width: 44.3%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	.many-m>div {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.many-m>div>div {
		position: relative;
	}

	.many-m>div:nth-child(1)>div:nth-child(1) {
		width: 48.88888%;
		display: block;
	}

	.many-m>div:nth-child(1)>div:nth-child(2) {
		width: 48.148%;
		display: block;
	}

	.many-m>div:nth-child(2)>div:nth-child(1) {
		width: 53%;
		display: block;
	}

	.many-m>div:nth-child(2)>div:nth-child(2) {
		width: 44.148%;
		display: block;
	}

	.many-r {
		width: 34.888%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		position: relative;
	}

	.many-r>div {
		position: relative;
	}

	.many-bord {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		opacity: 0;
		transition: 0.2s linear;
	}

	.many-bord:hover {
		opacity: 0.6;
	}
</style>
