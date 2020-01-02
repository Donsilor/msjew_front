<template>
  <div class="details-diamond">
    <!-- 廣告圖 -->
    <div class="advert">
      <div
        v-if="advBanner.length>0"
        class="advert-swiper-container"
      >
        <div class="swiper-wrapper" @click.stop="openAddress">
          <div
            v-for="(item,index) in advBanner"
            class="swiper-slide">
            <img
              :src="IMG_URL+item.image"
              :style="{cursor:item.addres != ''?'pointer':'initial'}" >
          </div>
        </div>
        <div
          v-if="advBanner.length>1"
          class="swiper-pagination">
          <span
            v-for="(item,index) in advBanner"
            :class="advertIndex==index?'advert-active':''"
            @click.stop="goSlide(index)"/>
        </div>
      </div>
      <div class="box">
        <div>{{ lang.engagementRings }}</div>
        <div><!-- {{ lang.engagementRing }} --></div>
        <div>{{ lang.designPromptFirstLine }}<br>{{ lang.designPromptSecondLine }}</div>
        <div>
          <span>
            <i class="icon iconfont">&#xe621;</i>
          </span>
          <label>+</label>
          <span>
            <i class="icon iconfont">&#xe644;</i>
          </span>
          <label>=</label>
          <span>
            <i class="icon iconfont">&#xe617;</i>
          </span>
        </div>
        <div @click="chose(1)">{{ lang.choiceFirst }}</div>
        <div @click="chose(2)">{{ lang.diamondFirst }}</div>
      </div>
    </div>
    <div class="title">
      <div>{{ lang.howToDesignEngagementRing }}</div>
      <!-- <div>{{ lang.howToDesignAnEngagementRing }}</div> -->
    </div>
    <!--設計區域-->
    <div class="design-area">
      <div class="box">
        <i
          class="icon iconfont"
          @click="swiperPrev(0)">&#xe663;</i>
        <div class="ring-swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="../../../../static/images/diamond/ring1.png" >
            </div>
            <div class="swiper-slide">
              <img src="../../../../static/images/diamond/ring2.png" >
            </div>
            <div class="swiper-slide">
              <img src="../../../../static/images/diamond/ring3.png" >
            </div>
          </div>
        </div>
        <i
          class="icon iconfont"
          @click="swiperNext(0)">&#xe652;</i>
      </div>
      <span>&</span>
      <div class="box">
        <i
          class="icon iconfont"
          @click="swiperPrev(1)">&#xe663;</i>
        <div class="diamond-swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="../../../../static/images/diamond/diamond1.jpg" >
            </div>
            <div class="swiper-slide">
              <img src="../../../../static/images/diamond/diamond2.jpg" >
            </div>
            <div class="swiper-slide">
              <img src="../../../../static/images/diamond/diamond3.jpg" >
            </div>
          </div>
        </div>
        <i
          class="icon iconfont"
          @click="swiperNext(1)">&#xe652;</i>
      </div>
      <span>=</span>
      <div class="box">
        <img
          :src="addmeile"
          @click="more" >
      </div>
    </div>

    <div class="carousel-area">
      <div class="title">
				<div>{{ module[0].moduleTitle }}</div>
        <!-- <div>{{ module[0].moduleTitleZhTw }}</div>
        <div>{{ module[0].moduleTitleEnUs }}</div> -->
      </div>
      <div class="carousel-box">
        <div id="certify">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div
                v-for="(item,index) in module[0].moduleGoods"
                class="swiper-slide">
                <img :src="IMG_URL+item.goods.goodsImages.split(',')[0]" >
                <div>{{ item.goods.coinType }} {{ formatMoney(item.goods.salePrice) }}</div>
                <div>{{ item.goods.goodsName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="more"
          @click="more">{{ lang.more }}
          <img src="../../../../static/images/weddingRing/jiantou.png" >
        </div>
      </div>
    </div>

 <!--   <div class="title">
      <div>{{ module[1].moduleTitleZhTw }}</div>
      <div>{{ module[1].moduleTitleEnUs }}</div>
    </div>
    <div class="product-series">
      <ul>
        <li
          v-for="(item,index) in module[1].moduleActivity"
          v-if="index<=3"
          @click="jupmWebUrl(item.wapUrl)">
          <div><img :src="IMG_URL+item.pcImage" ></div>
          <div><span/><span/><span>{{ item.recommendInfo }}</span></div>
          <img :src="'../../../../static/images/engagementRing/classify-'+(index+1)+'.png'" >
        </li>
      </ul>
    </div>

    <div class="title">
      <div>在BDD里遇見幸福</div>
      <div>ENCOUNTER HAPPINESS</div>
    </div>
    <div class="happiness">
      <ul>
        <li>
          <div class="date">
            <div>2018</div>
            <div>DEC</div>
            <div>29</div>
          </div>
          <div class="content">
            <div>
              <img src="../../../../static/images/engagementRing/copy.png" >
              <div>Jack & Rose</div>
            </div>
            <div>
              <div>我們在一起了</div>
              <div>
                <img src="../../../../static/images/engagementRing/zhoubiao.png" >
                <span>洪都拉斯-萨莫拉诺</span>
              </div>
              <div>
                在她的房間里給她留了一張紙條，帶着一些指示 - 穿上她最喜歡的靴子，然後在我鄰居的院子里等我，就在那天早上我擺出的輪胎擺動。然後，當她在輪胎擺動等待時，我到達了一輛1952年的GMC紅色卡車，上面放着一束鮮花和戒指。 我讓她嫁給我她說是的！ 只有在那之後，她才意識到她的全家也在那裡。 對我們來說，這是美好而美好的一天！
              </div>
              <div>MORE</div>
              <div><img
                src="../../../../static/images/engagementRing/jiezhi.png"
                @click="goIndex" ></div>
              <div>
                <a
                  class="a4"
                  @click="share"><i class="icon iconfont">&#xe655;</i></a>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="date">
            <div>2018</div>
            <div>DEC</div>
            <div>04</div>
          </div>
          <div class="content">
            <div>
              <img src="../../../../static/images/engagementRing/copy2.png" >
              <div>Roy & Marla</div>
            </div>
            <div>
              <div>這是我們的故事，在阿爾卑斯的故事</div>
              <div>
                <img src="../../../../static/images/engagementRing/zhoubiao.png" >
                <span>阿爾卑斯</span>
              </div>
              <div>
                在她的房間里給她留了一張紙條，帶着一些指示 - 穿上她最喜歡的靴子，然後在我鄰居的院子里等我，就在那天早上我擺出的輪胎擺動。然後，當她在輪胎擺動等待時，我到達了一輛1952年的GMC紅色卡車，上面放着一束鮮花和戒指。 我讓她嫁給我她說是的！ 只有在那之後，她才意識到她的全家也在那裡。對我們來說，這是美好而美好的一天！
              </div>
              <div>MORE</div>
              <div>
                <img
                  src="../../../../static/images/engagementRing/jiezhi.png"
                  @click="goIndex" >
              </div>
              <div>
                <a
                  class="a4"
                  @click="share"><i class="icon iconfont">&#xe655;</i></a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div> -->
    <div class="title">
      <div>{{ lang.whyBelieveBdd }}</div>
     <!-- <div>{{ lang.whyTrustBdd }}</div> -->
    </div>
    <!--信賴BBD-->
    <ul class="trust-list">
      <li>
        <div><img src="../../../../static/images/engagementRing/zhengshu.png" ></div>
        <div>{{ lang.profession }}</div>
        <p>{{ lang.professionDesc }}</p>
        <label @click="jump('diamondCarat')">{{ lang.moreProfessionInfo }}</label>
      </li>
      <li>
        <div><img src="../../../../static/images/engagementRing/xingjiabi.png" ></div>
        <div>{{ lang.valueForMoney }}</div>
        <p>{{ lang.valueForMoneyDesc }}</p>
        <label @click="jump('contact')">{{ lang.moreValueForMoneyInfo }}</label>
      </li>
      <li>
        <div><img src="../../../../static/images/engagementRing/baozhi.png" ></div>
        <div>{{ lang.warranty }}</div>
        <p>{{ lang.warrantyDesc }}</p>
        <label @click="jump('qualityValue')">{{ lang.moreWarrantyInfo }}</label>
      </li>
      <li>
        <div><img src="../../../../static/images/engagementRing/shouh.png" ></div>
        <div>{{ lang.afterSale }}</div>
        <p>{{ lang.afterSaleDesc }}</p>
        <label @click="jump('returnedGoods')">{{ lang.moreAfterSaleInfo }}</label>
      </li>
    </ul>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.js';
import { formatMoney } from '@/api/filterUtil.js';
import { clearCustom, clearTwoCustom } from '@/api/cache.js';

export default {
  data() {
    return {
      lang: this.$LANGUAGE.engagementRing.details,
      advBanner: [],
      advertIndex: 0,
			tdOpenType: 1,
      module: [{}, {}, {}, {}, {}, {}, {}, {}],
      addmeile: require('../../../../static/images/diamond/add2.jpg'),
      addmeiles: [require('../../../../static/images/diamond/add1.jpg'), require('../../../../static/images/diamond/add2.jpg'), require('../../../../static/images/diamond/add3.jpg')]
    };
  },
  watch: {

  },
  mounted() {
    var width = document.documentElement.clientWidth < 1360 ? 1360 : document.documentElement.clientWidth;
    document.getElementsByClassName('box')[0].style.zoom = width / 1920;
    document.getElementsByClassName('box')[0].style.MozTransform = 'scale(' + width / 1920 + ')';
    document.getElementsByClassName('box')[0].style.MozTransformOrigin = 'top right';
    window.onresize = function () {
      if (document.getElementsByClassName('box').length > 0) {
        width = document.documentElement.clientWidth < 1360 ? 1360 : document.documentElement.clientWidth;
        document.getElementsByClassName('box')[0].style.MozTransform = 'scale(' + width / 1920 + ')';
        document.getElementsByClassName('box')[0].style.MozTransformOrigin = 'top right';
        document.getElementsByClassName('box')[0].style.zoom = width / 1920;
      }
    };
    let that = this;
    this.ringSwiper = new Swiper('.ring-swiper-container', {
      direction: 'vertical',
      mousewheelControl: true,
      mousewheelInvert: true,
      slidesPerView: 3,
      loop: true,
      onSetTransition: function (swiper) { // 监听滚动
        that.addmeile = that.addmeiles[swiper.realIndex + 1 > 2 ? 0 : swiper.realIndex + 1];
        console.log(swiper.realIndex);
        for (var i = 0; i < swiper.slides.length; i++) {
          var slide = swiper.slides.eq(i);
          if (i == swiper.activeIndex + 1) {
            slide[0].getElementsByTagName('img')[0].style.height = '144px';
            slide[0].getElementsByTagName('img')[0].style.marginTop = '0px';
          } else {
            slide[0].getElementsByTagName('img')[0].style.height = '90px';
            slide[0].getElementsByTagName('img')[0].style.marginTop = '22px';
          }
        }
      }
    });

    this.diamondSwiper = new Swiper('.diamond-swiper-container', {
      direction: 'vertical',
      mousewheelControl: true,
      mousewheelInvert: true,
      slidesPerView: 3,
      loop: true,
      onSetTransition: function (swiper) { // 监听滚动
        for (var i = 0; i < swiper.slides.length; i++) {
          var slide = swiper.slides.eq(i);
          if (i == swiper.activeIndex + 1) {
            slide[0].getElementsByTagName('img')[0].style.height = '144px';
            slide[0].getElementsByTagName('img')[0].style.marginTop = '0px';
          } else {
            slide[0].getElementsByTagName('img')[0].style.height = '90px';
            slide[0].getElementsByTagName('img')[0].style.marginTop = '22px';
          }
        }
      }
    });
  },
  created() {
    // this.getAdvter();
    this.getModule();
    clearCustom();
    clearTwoCustom();
  },
  methods: {
    formatMoney: formatMoney,
    swiperPrev(type) {
      if (type == 0) {
        this.ringSwiper.slideTo(this.ringSwiper.activeIndex - 1);
      } else {
        this.diamondSwiper.slideTo(this.diamondSwiper.activeIndex - 1);
      }
    },
    swiperNext(type) {
      if (type == 0) {
        this.ringSwiper.slideTo(this.ringSwiper.activeIndex + 1);
      } else {
        this.diamondSwiper.slideTo(this.diamondSwiper.activeIndex + 1);
      }
    },
    goIndex() {
      this.$router.push({
        name: 'engagementRing',
        params: {
          id: 0,
          key: 1
        }
      });
    },
    // 分享
    share() {
      window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(location.href), 'newWindow', 'width=1000, height=800', 'center');
    },
    jump(path) {
      this.$router.push({
        path: path
      });
    },
    // 打開外鏈
    jupmWebUrl(url) {
      if (url) {
        window.open(url.indexOf('http') > -1 ? url : 'http://' + url);
      }
    },
    chose(type) {
      if (type == 1) {
        this.$router.push({
          name: 'engagementRing',
          params: {
            id: 0,
            key: 1
          }
        });
      } else {
        this.$router.push({
          name: 'diamond',
          params: {
            id: 1,
            key: 1
          }
        });
      }
    },
    getModule() {
      this.$axiosGet(`/web/Website/queryWebsiteModule`, {type: 2}).then(res => {
        res.data.webSite.map(item => {
          if (item.hasOwnProperty('moduleGoods')) {
            item.moduleGoods.map(good => {
              if (!good.hasOwnProperty('showType')) {
                good.showType = item.showType;
              }
              return good
            })
          }
          if (item.hasOwnProperty('moduleActivity')) {
            item.moduleActivity.map(good => {
              if (!good.hasOwnProperty('showType')) {
                good.showType = item.showType;
              }
              return good
            })
          }
        })
        this.module = res.data.webSite;
        var isChange = false;
				this.advBanner = [];
				this.tdOpenType = res.data.advert[0].tdOpenType || null;
				if(res.data.advert[0].advertImgModelList && res.data.advert[0].advertImgModelList.length > 0) {
					this.advBanner = res.data.advert[0].advertImgModelList
				} else {
					const o= {
						addres: "",
						id: "",
						image: res.data.advert[0].dsImg,
						tbAdvertId: ""
					}
					this.advBanner.push(o)
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

        setTimeout(() => {
          // 初始化轮播
          var index = 0;
          var certifySwiper = new Swiper('.swiper-container', {
            watchSlidesProgress: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            slideToClickedSlide: true,
            onSlideChangeStart: function (swiper) {
              isChange = true;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides.eq(i);
                if (swiper.activeIndex == i) {
                  index = swiper.activeIndex;
                  slide[0].children[1].style.opacity = 1;
                  slide[0].children[2].style.opacity = 1;
                } else {
                  slide[0].children[1].style.opacity = 0;
                  slide[0].children[2].style.opacity = 0;
                }
              }
            },
            onSlideChangeEnd: function (swiper) {
              isChange = false;
            },
            onTap: (swiper) => { // 获取点击事件
              setTimeout(() => {
                if (!isChange && swiper.clickedSlide) {
                  if (this.module[0].moduleGoods[swiper.realIndex].showType === 1) {
                    window.open(`/seleceEngagement/${this.module[0].moduleGoods[swiper.realIndex].goods.id}/2`);
                  } else {
                    this.$router.push({
                      name: 'seleceEngagement',
                      params: {
                        id: this.module[0].moduleGoods[swiper.realIndex].goods.id,
                        key: 2
                      }
                    });
                  }
                }
              }, 10);
            },
            onProgress: function (swiper) { // 监听滚动
              for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides.eq(i);
                var slideProgress = swiper.slides[i].progress;
                var modify = 1;
                if (Math.abs(slideProgress) > 1) {
                  modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                }
                var translateY = slideProgress * 70;
                translateY = translateY > 0 ? -translateY : translateY;

                var translate = slideProgress * modify * 200 + 'px';
                var scale = 1 - Math.abs(slideProgress) / 5;
                var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform('translateX(' + translate + ') translateY(' + translateY + 'px) scale(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                if (Math.abs(slideProgress) > 3) {
                  slide.css('opacity', 0);
                  slide[0].children[0].style.opacity = 0;
                } else {
                  var opacity = scale;
                  if (opacity == 0.8) {
                    opacity = 0.6;
                  } else if (opacity == 0.6) {
                    opacity = 0.5;
                  }
                  slide[0].children[0].style.opacity = opacity;
                }
              }
              for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides.eq(i);
                if (swiper.activeIndex == i) {
                  slide[0].children[1].style.opacity = 1;
                  slide[0].children[2].style.opacity = 1;
                } else {
                  slide[0].children[1].style.opacity = 0;
                  slide[0].children[2].style.opacity = 0;
                }
              }
            },
            onSetTransition: function (swiper, transition) {
              for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides.eq(i);
                slide.transition(transition);
              }
            }
          });
        }, 10);
      });
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
    more() {
      this.$router.push({
        name: 'engagementRing',
        params: {
          id: 0,
          key: 1
        }
      });
    }
  }

};
</script>

<style lang="less" scoped>
	.details-diamond {
		.more {
			width: 152px;
			height: 34px;
			border: 1px solid rgba(183, 178, 170, 1);
			height: 34px;
			background: #FAFAF4;
			line-height: 34px;
			position: absolute;
			color: #B2ACA4;
			font-size: 14px;
			z-index: 1;
			cursor: pointer;
			right: 0px;
			bottom: 94px;
			img {
				position: absolute;
				width: 40px;
				top: 12px;
				right: -20px;
			}
		}
		.design-area {
			.box {
				position: relative;
				i {
					position: absolute;
					left: 40px;
					cursor: pointer;
					color: #656565;
					z-index: 11;
					font-size: 12px;
				}
				i:first-child {
					top: 70px;
				}
				i:last-child {
					bottom: 70px;
				}
			}
			.box:nth-child(3) {
				i {
					left: initial;
					right: 40px;
				}
			}
			img {
				-webkit-transition: all 0.3s;
				-moz-transition: all 0.3s;
				-ms-transition: all 0.3s;
				transition: all 0.3s;
			}
			margin: 0 auto;
			margin-top: 40px;
			margin-bottom: 77px;
			width: 1360px;
			.ring-swiper-container,
			.diamond-swiper-container {
				height: 420px;
				overflow: hidden;
				position: relative;
				cursor: pointer;
				&:before {
					content: '';
					height: 1px;
					position: absolute;
					width: 244px;
					left: 58px;
					top: 130px;
					z-index: 1;
					box-shadow: 0px -3px 7px #D0D0D0;
				}
				&:after {
					content: '';
					height: 1px;
					position: absolute;
					width: 244px;
					left: 58px;
					top: 290px;
					z-index: 1;
					box-shadow: 0px 3px 7px #D0D0D0;
				}
			}
			>div {
				width: 360px;
				height: 420px;
				box-shadow: 0 1px 5px #ddd;
				display: inline-block;
				vertical-align: top;
				&:nth-child(5) {
					img {
						cursor: pointer;
						height: 420px;
					}
				}
			}
			>span {
				height: 420px;
				font-size: 51px;
				color: #D6D2C3;
				font-family: twCenMt;
				display: inline-block;
				vertical-align: top;
				line-height: 420px;
				margin-left: 45px;
				margin-right: 45px;
			}
		}
		.carousel-area {
			background: #FAFAF4;
			margin-top: 77px;
			margin-bottom: 60px;
			position: relative;
			padding-top: 60px;
			.carousel-box {
				width: 1360px;
				position: relative;
				margin: 0 auto;
				#certify {
					position: relative;
					width: 1360px;
					margin: 0 auto;
					.swiper-container {
						padding-top: 60px;
						padding-bottom: 57px;
					}
					.swiper-slide {
						width: 520px;
						height: 420px;
						background: #fff;
						box-shadow: 0 1px 10px #ddd;
						cursor: pointer;
						img {
							display: block;
							margin: 0 auto;
							height: 289px;
							margin-top: 45px;
						}
						div {
							&:nth-child(2) {
								color: #F29B87;
								font-size: 24px;
								font-weight: 300;
								margin-bottom: 15px;
								font-family: twCenMt;
								-webkit-transition: all 0.2s ease-in-out;
								-moz-transition: all 0.2s ease-in-out;
								-ms-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
							}
							&:nth-child(3) {
								color: #333333;
								font-size: 14px;
								-webkit-transition: all 0.2s ease-in-out;
								-moz-transition: all 0.2s ease-in-out;
								-ms-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
							}
						}
					}
				}
			}
		}
		.product-series {
			width: 1360px;
			margin: 0 auto;
			margin-top: 40px;
			ul {
				overflow: auto;
				padding-bottom: 60px;
				li {
					width: 300px;
					height: 400px;
					float: left;
					cursor: pointer;
					position: relative;
					margin-right: 53px;
					&:first-child {
						>img {
							top: 119px;
							height: 65px;
							left: 68px;
						}
					}
					&:nth-child(2) {
						>img {
							top: 124px;
							height: 56px;
							left: 59px;
						}
					}
					&:nth-child(3) {
						>img {
							top: 108px;
							height: 87px;
							left: 71px;
						}
					}
					&:nth-child(4) {
						>img {
							top: 130px;
							height: 44px;
							left: 46px;
						}
					}
					&:hover {
						div {
							&:nth-child(2) {
								opacity: 1;
							}
							&:nth-child(1) {
								height: 400px;
							}
							&:nth-child(2) {
								span {
									&:first-child {
										-webkit-transform: rotate(15deg);
										-moz-transform: rotate(15deg);
										-ms-transform: rotate(15deg);
										transform: rotate(15deg);
									}
									&:nth-child(2) {
										-webkit-transform: rotate(330deg);
										-moz-transform: rotate(330deg);
										-ms-transform: rotate(330deg);
										transform: rotate(330deg);
									}
									&:last-child {
										top: 0px;
									}
								}
							}
						}
					}
					&:nth-child(4) {
						margin-right: 0px;
					}
					>img {
						position: absolute;
					}
					div {
						&:nth-child(1) {
							height: 320px;
							-webkit-transition: all 0.2s ease-in-out;
							-moz-transition: all 0.2s ease-in-out;
							-ms-transition: all 0.2s ease-in-out;
							transition: all 0.2s ease-in-out;
							overflow: hidden;
							img {
								display: block;
								width: 100%;
								min-height: 400px;
							}
						}
						&:nth-child(2) {
							opacity: 0;
							padding-top: 152px;
							text-align: left;
							line-height: 20px;
							font-size: 12px;
							padding-left: 45px;
							padding-right: 45px;
							width: 100%;
							height: 273px;
							position: absolute;
							color: white;
							-webkit-transition: all 0.2s ease-in-out;
							-moz-transition: all 0.2s ease-in-out;
							-ms-transition: all 0.2s ease-in-out;
							transition: all 0.2s ease-in-out;
							overflow: hidden;
							bottom: 0px;
							span {
								-webkit-transition: all 0.2s ease-in-out;
								-moz-transition: all 0.2s ease-in-out;
								-ms-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
								&:first-child {
									position: absolute;
									background: rgba(230, 160, 150, 0.5);
									height: 500px;
									width: 300px;
									top: 90px;
									left: -20px;
								}
								&:nth-child(2) {
									position: absolute;
									background: rgba(230, 160, 150, 0.5);
									height: 500px;
									width: 300px;
									top: 40px;
									left: 80px;
									-webkit-transform: rotate(360deg);
									-moz-transform: rotate(360deg);
									-ms-transform: rotate(360deg);
									transform: rotate(360deg);
								}
								&:last-child {
									z-index: 1;
									position: relative;
									top: 10px;
								}
							}
						}
					}
				}
			}
		}
		.happiness {
			width: 1360px;
			margin: 0 auto;
			margin-top: 40px;
			text-align: left;
			li {
				margin-bottom: 60px;
				.date {
					float: left;
					width: 180px;
					text-align: left;
					div {
						color: #AAB2BD;
						font-size: 36px;
						font-weight: 400;
						line-height: 36px;
						height: 36px;
						&:nth-child(2) {
							margin-top: 9px;
							margin-bottom: 20px;
						}
						&:nth-child(3) {
							font-size: 84px;
							height: 84px;
							line-height: 84px;
						}
					}
				}
				.content {
					box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
					margin-left: 180px;
					padding-bottom: 1px;
					>div {
						position: relative;
						&:nth-child(1) {
							img {
								display: block;
								width: 100%;
							}
							div {
								position: absolute;
								bottom: 29px;
								right: 40px;
								font-size: 24px;
								color: white;
							}
						}
						&:nth-child(2) {
							margin: 40px;
							>div {
								&:nth-child(1) {
									font-size: 24px;
									color: #333333;
									margin-bottom: 20px;
								}
								&:nth-child(2) {
									color: #999999;
									margin-bottom: 30px;
									font-size: 12px;
									height: 16px;
									line-height: 16px;
									span {
										margin-left: 10px;
									}
									img {
										float: left;
										margin-top: 1px;
									}
								}
								&:nth-child(3) {
									margin-right: 260px;
									font-size: 12px;
									color: rgba(153, 153, 153, 1);
									line-height: 24px;
									margin-bottom: 28px;
								}
								&:nth-child(4) {
									width: 140px;
									height: 45px;
									background: rgba(252, 185, 185, 1);
									cursor: pointer;
									text-align: center;
									line-height: 45px;
									font-size: 14px;
									color: white;
									display: none;
								}
								&:nth-child(5) {
									position: absolute;
									right: 0px;
									top: 0px;
									cursor: pointer;
									height: 100px;
									width: 100px;
									border-radius: 8px;
									overflow: hidden;
									img {
										display: block;
										width: 100%;
										min-height: 100%;
									}
								}
								&:nth-child(6) {
									position: absolute;
									bottom: 0px;
									right: 0px;
									span {
										display: inline-block;
										height: 18px;
										width: 1px;
										background: #d1d1d1;
										margin-left: 10px;
										margin-right: 10px;
										vertical-align: middle;
									}
									img {
										cursor: pointer;
										display: inline-block;
										vertical-align: middle;
										height: 30px;
										width: 30px;
										margin: 0 30px;
									}
									a {
										cursor: pointer;
									}
									i {
										cursor: pointer;
										font-size: 40px;
										color: #FCB9B9;
										display: inline-block;
										vertical-align: middle;
										margin: 0 30px;
									}
								}
							}
						}
					}
				}
			}
		}
		.trust-list {
			width: 1360px;
			margin: 0 auto;
			margin-top: 40px;
			li {
				float: left;
				margin-bottom: 60px;
				width: 300px;
				position: relative;
				margin-right: 53px;
				text-align: left;
				height: 420px;
				position: relative;
				box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
				&:hover {
					img {
						-webkit-transform: scale(1.2);
						-moz-transform: scale(1.2);
						-ms-transform: scale(1.2);
						transform: scale(1.2);
					}
				}
				&:last-child {
					margin-right: 0px;
				}
				img {
					display: block;
					width: 100%;
					-webkit-transition: all 0.2s ease-in-out;
					-moz-transition: all 0.2s ease-in-out;
					-ms-transition: all 0.2s ease-in-out;
					transition: all 0.2s ease-in-out;
				}
				div {
					margin-left: 24px;
					color: #333333;
					font-size: 18px;
					margin-bottom: 19px;
					&:first-child {
						margin-left: 0px;
						height: 200px;
						overflow: hidden;
					}
				}
				p {
					color: #666666;
					font-size: 12px;
					line-height: 18px;
					margin-left: 24px;
					margin-right: 24px;
				}
				label {
					left: 24px;
					font-size: 12px;
					text-decoration: underline;
					color: rgba(242, 155, 135, 1);
					position: absolute;
					bottom: 20px;
					cursor: pointer;
				}
			}
		}
		.title {
			margin: 0 auto;
			width: 1360px;
			div {
				&:first-child {
					font-size: 24px;
					margin-bottom: 9px;
				}
				&:nth-child(2) {
					font-size: 12px;
					position: relative;
					&:after {
						content: '';
						height: 1px;
						width: 100px;
						background: #999999;
						display: block;
						margin: 0 auto;
						margin-top: 20px;
					}
				}
			}
		}
		.advert {
			.advert-swiper-container {
				overflow: hidden;
			}
			width:100%!important;
			position: relative;
			min-width: 1360px;
			min-height: 453px;
			margin-bottom: 60px;
			.swiper-pagination {
				position: absolute;
				width: 100%;
				bottom: 40px;
				span {
					cursor: pointer;
					width: 12px;
					margin: 0 14px;
					height: 12px;
					background: rgba(255, 255, 255, 1);
					opacity: 0.5;
					border-radius: 50%;
					display: inline-block;
				}
				.advert-active {
					opacity: 1;
				}
			}
			img {
				display: block;
				width: 100%;
			}
			.box {
				z-index: 1;
				position: absolute;
				right: 300px;
				top: 130px;
				color: #410F06;
				div {
					&:first-child {
						font-size: 48px;
						margin-bottom: 20px;
					}
					&:nth-child(2) {
						font-size: 30px;
						margin-bottom: 30px;
					}
					&:nth-child(3) {
						font-size: 14px;
					}
					&:nth-child(4) {
						margin-top: 32px;
						span {
							display: inline-block;
							width: 33px;
							height: 33px;
							border-radius: 50%;
							background: white;
							vertical-align: middle;
							i {
								color: #EDBBB5;
								font-size: 17px;
								position: relative;
								top: 25%;
							}
						}
						label {
							cursor: inherit;
							color: white;
							margin-left: 2px;
							margin-right: 2px;
							height: 33px;
							vertical-align: middle;
							line-height: 33px;
							display: inline-block;
							font-size: 20px;
							font-weight: bold;
						}
					}
					&:nth-child(5) {
						width: 220px;
						height: 34px;
						background: white;
						cursor: pointer;
						color: #410F06;
						box-shadow: 0px 2px 0px 0px rgba(243, 224, 219, 1);
						font-size: 16px;
						margin: 0 auto;
						line-height: 34px;
						margin-top: 30px;
						margin-bottom: 30px;
					}
					&:nth-child(6) {
						width: 220px;
						height: 34px;
						color: #410F06;
						cursor: pointer;
						background: white;
						box-shadow: 0px 2px 0px 0px rgba(243, 224, 219, 1);
						font-size: 16px;
						margin: 0 auto;
						line-height: 34px;
					}
				}
			}
		}
	}
</style>
