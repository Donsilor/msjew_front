<template>
  <div class="details-diamond">
    <!-- 廣告圖 -->
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
            @click.stop="goSlide(index)"/>
        </div>
      </div>
      <div class="box">
        <div>{{ lang.weddingRings }}</div>
        <div><!-- {{ lang.weddingRing }} --></div>
        <div>{{ lang.weddingRingContent }}</div>
        <div @click="goIWeddingRingndex">{{ lang.myWeddingRing }}</div>
        <div @click="goRingtRing">{{ lang.ourWeddingRing }}</div>
      </div>
    </div>
    <!--對戒-->
    <div class="right-ring-area">
      <div class="title">
        <div>{{ module[0].moduleTitle }}</div>
        <!-- <div>{{module[0].moduleTitleZhTw}}</div>
				<div>{{module[0].moduleTitleEnUs}}</div> -->
      </div>
      <ul v-if="module[0].moduleGoods">
        <li
          v-for="item in module[0].moduleGoods"
          @click="goProduct(1,item)">
          <div><img :src="IMG_URL+item.ring.ringImg.split(',')[0]" ></div>
          <div>{{ item.ring.coinType }} {{ formatMoney(item.ring.salePrice) }}</div>
          <div>{{ item.ring.name }}</div>
        </li>
      </ul>
      <div
        class="more"
        @click="goRingtRing">{{ lang.morePairRings }}</div>
    </div>
    <!--女士戒指-->
    <div class="woman-ring-area">
      <div class="title">
        <div>{{ module[1].moduleTitle }}</div>
        <!-- <div>{{module[1].moduleTitleZhTw}}</div>
				<div>{{module[1].moduleTitleEnUs}}</div> -->
      </div>
      <div>
        <div class="box">
          <img src="../../../../static/images/weddingRing/women.png" >
          <div>{{ module[1].title }}</div>
          <!-- <div>{{module[1].titleZhTw}}</div> -->
          <div>{{ module[1].recommendInfo }}</div>
        </div>
        <ul>
          <li
            v-for="item in module[1].moduleGoods"
            @click="goProduct(0,item)">
            <img :src="IMG_URL+item.goods.goodsImages.split(',')[0]" >
          </li>
        </ul>
        <div
          class="more"
          @click="more(452,2)">{{ lang.more }}
          <img src="../../../../static/images/weddingRing/jiantou.png" >
        </div>
      </div>
    </div>
    <!--男士戒指-->
    <div class="man-ring-area">
      <div class="box">
        <img src="../../../../static/images/weddingRing/men.png" >
        <div>{{ module[2].title }}</div>
        <div>{{ module[2].recommendInfo }}</div>
      </div>
      <ul v-if="module[2].moduleGoods">
        <li
          v-for="item in module[2].moduleGoods"
          @click="goProduct(0,item)">
          <img :src="IMG_URL+item.goods.goodsImages.split(',')[0]" >
        </li>
      </ul>
      <div
        class="more"
        @click="more(457,3)">{{ lang.more }}
        <img src="../../../../static/images/weddingRing/jiantou.png" >
      </div>
    </div>
    <div class="guide">
      <div>
        <img src="../../../../static/images/weddingRing/weddingRings.png" >
        <div>{{ lang.pairRingGuide }}</div>
        <div>
          {{ lang.howToChoosePairRing }}<br > {{ lang.howToMatchPairRing }}
        </div>
        <div @click="ringHome">{{ lang.knowMore }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatMoney } from '@/api/filterUtil.js';
import Swiper from 'swiper/dist/js/swiper.js';
import { clearCustom, clearTwoCustom } from '@/api/cache.js';
export default {
  name: 'Index',
  data() {
    return {
      lang: this.$LANGUAGE.weddingRing.details,
      advAddress: '',
      advBanner: [],
      advertIndex: 0,
      tdOpenType: 1,
      module: [{}, {}, {}, {}, {}, {}, {}, {}],
      rightList: [],
      womanList: []
    };
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
  },
  created() {
    this.getModule();
    clearCustom();
    clearTwoCustom();
  },
  methods: {
    formatMoney: formatMoney,
    more(id, key) {
      this.$router.push({
        name: 'weddingRing',
        params: {
          id: id,
          key: key
        }
      });
    },
    ringHome() {
      this.$router.push({
        path: '/ringHome'
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
    getModule() {
      this.$axiosGet(`/web/Website/queryWebsiteModule`, {type: 3}).then(res => {
				  console.log('res.data.webSite====>', res.data.webSite);
        res.data.webSite.map(item => {
          if (item.hasOwnProperty('moduleGoods')) {
            item.moduleGoods.map(good => {
              if (!good.hasOwnProperty('showType')) {
                good.showType = item.showType;
              }
              return good;
            });
          }
          if (item.hasOwnProperty('moduleActivity')) {
            item.moduleActivity.map(good => {
              if (!good.hasOwnProperty('showType')) {
                good.showType = item.showType;
              }
              return good;
            });
          }
        });
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
      });
    },
    goIWeddingRingndex() {
      this.$router.push({
        name: 'weddingRing',
        params: {
          id: -1,
          key: 4
        }
      });
    },
    goRingtRing() {
      this.$router.push({
        name: 'rightRing',
        params: {
          id: 0
        }
      });
    },
    goProduct(type, item) {
      if (item.showType === 1) {
        window.open(`/${type === 0 ? 'seleceWedding' : 'seleceRightRing'}/${type === 0 ? item.goods.id : item.ring.id}`);
      } else {
        this.$router.push({
          name: type === 0 ? 'seleceWedding' : 'seleceRightRing',
          params: {
            id: type === 0 ? item.goods.id : item.ring.id
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
	.details-diamond {
		margin: 0 auto;
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
					letter-spacing: 3px;
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
		.guide {
			margin: 0 auto;
			margin-top: 154px;
			width: 1360px;
			background-image: url('../../../../static/images/weddingRing/jiehunzhinan.png');
			height: 500px;
			margin-bottom: 50px;
			>div {
				width: 539px;
				margin-left: 821px;
				img {
					margin-top: 129px;
					margin-bottom: 19px;
				}
				div {
					&:nth-child(2) {
						height: 24px;
						font-size: 24px;
						line-height: 18px;
						margin-bottom: 29px;
					}
					&:nth-child(3) {
						font-size: 12px;
						line-height: 24px;
						margin-bottom: 44px;
					}
					&:nth-child(4) {
						width: 110px;
						height: 34px;
						line-height: 34px;
						background: rgba(208, 204, 198, 1);
						color: white;
						cursor: pointer;
						margin: 0 auto;
						font-size: 14px;
						margin-bottom: 10px;
					}
					&:nth-child(5) {
						color: #999999;
						font-size: 12px;
						cursor: pointer;
						text-decoration: underline;
					}
				}
			}
		}
		.man-ring-area {
			width: 1360px;
			margin: 0 auto;
			margin-top: 134px;
			background-image: url('../../../../static/images/weddingRing/nan.png');
			height: 480px;
			position: relative;
			.more {
				width: 98px;
				height: 34px;
				background: rgba(255, 255, 255, 1);
				border: 1px solid rgba(178, 172, 164, 1);
				line-height: 34px;
				position: absolute;
				color: #B2ACA4;
				font-size: 14px;
				cursor: pointer;
				left: 940px;
				bottom: -74px;
				img {
					position: absolute;
					width: 40px;
					top: 12px;
					right: -20px;
				}
			}
			ul {
				position: absolute;
				left: 110px;
				bottom: -124px;
				li {
					float: left;
					width: 240px;
					height: 280px;
					background: white;
					box-shadow: 0px 0px 10px 0px #EFEFEF;
					overflow: hidden;
					margin-left: 30px;
					cursor: pointer;
					padding-top: 20px;
					-webkit-transition: all 0.2s ease-in-out;
					-moz-transition: all 0.2s ease-in-out;
					-ms-transition: all 0.2s ease-in-out;
					transition: all 0.2s ease-in-out;
					&:hover {
						margin-top: -30px;
					}
					img {
						display: block;
						width: 100%;
						height: 240px;
					}
				}
			}
			.box {
				width: 396px;
				padding-top: 83px;
				margin-left: 332px;
				img {
					margin-bottom: 19px;
				}
				div {
					&:nth-child(2) {
						font-size: 24px;
						margin-bottom: 29px;
					}
					&:nth-child(3) {
						font-size: 12px;
						line-height: 24px;
					}
				}
			}
		}
		.woman-ring-area {
			width: 1360px;
			margin: 0 auto;
			margin-top: 53px;
			>div {
				&:nth-child(2) {
					background-image: url('../../../../static/images/weddingRing/xuegao.png');
					height: 480px;
					position: relative;
					margin-top: 37px;
					.more {
						width: 98px;
						height: 34px;
						background: rgba(255, 255, 255, 1);
						border: 1px solid rgba(178, 172, 164, 1);
						line-height: 34px;
						position: absolute;
						color: #B2ACA4;
						font-size: 14px;
						cursor: pointer;
						right: 22px;
						bottom: -74px;
						img {
							position: absolute;
							width: 40px;
							top: 12px;
							right: -20px;
						}
					}
					ul {
						position: absolute;
						right: 141px;
						bottom: -104px;
						li {
							float: left;
							width: 240px;
							height: 280px;
							background: white;
							box-shadow: 0px 0px 10px 0px #EFEFEF;
							overflow: hidden;
							margin-left: 30px;
							cursor: pointer;
							padding-top: 20px;
							-webkit-transition: all 0.2s ease-in-out;
							-moz-transition: all 0.2s ease-in-out;
							-ms-transition: all 0.2s ease-in-out;
							transition: all 0.2s ease-in-out;
							&:hover {
								margin-top: -30px;
							}
							img {
								display: block;
								width: 100%;
								height: 240px;
							}
						}
					}
					.box {
						width: 396px;
						padding-top: 73px;
						margin-left: 627px;
						img {
							margin-bottom: 19px;
						}
						div {
							&:nth-child(2) {
								font-size: 24px;
								margin-bottom: 29px;
							}
							&:nth-child(3) {
								font-size: 12px;
								line-height: 24px;
							}
						}
					}
				}
			}
		}
		.right-ring-area {
			min-width: 1360px;
			background: #FEFBF6;
			padding-top: 55px;
			overflow: hidden;
			padding-bottom: 34px;
			.more {
				width: 152px;
				height: 34px;
				background: rgba(198, 192, 182, 1);
				text-align: center;
				line-height: 34px;
				margin: 0 auto;
				font-size: 14px;
				color: white;
				cursor: pointer;
			}
			ul {
				width: 1360px;
				margin: 30px auto 46px auto;
				li {
					width: 320px;
					height: 408px;
					display: inline-block;
					background: white;
					box-shadow: 0px 0px 10px 0px #EFEFEF;
					margin-right: 16px;
					cursor: pointer;
					position: relative;
					&:after {
						content: '';
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0px;
						left: 0px;
						border: 0px solid #f3eeec;
						-webkit-transition: all 0.2s ease-in-out;
						-moz-transition: all 0.2s ease-in-out;
						-ms-transition: all 0.2s ease-in-out;
						transition: all 0.2s ease-in-out;
					}
					&:hover:after {
						border-width: 16px;
						top: -16px;
						left: -16px;
					}
					&:hover {
						div {
							&:nth-child(1) {
								img {
									-webkit-transform: scale(1.2);
									-moz-transform: scale(1.2);
									-ms-transform: scale(1.2);
									transform: scale(1.2);
								}
							}
						}
					}
					&:last-child {
						margin-right: 0px;
					}
					div {
						&:nth-child(1) {
							height: 320px;
							width: 320px;
							margin-bottom: 14px;
							overflow: hidden;
							img {
								-webkit-transition: all 0.2s ease-in-out;
								-moz-transition: all 0.2s ease-in-out;
								-ms-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
								height: 320px;
								width: 320px;
								display: block;
								margin-bottom: 14px;
							}
						}
						&:nth-child(2) {
							height: 24px;
							line-height: 24px;
							font-size: 24px;
							color: #ba9c90;
							font-weight: 300;
							font-family: twCenMt;
							margin-bottom: 9px;
						}
						&:nth-child(3) {
							height: 15px;
							line-height: 15px;
							font-size: 14px;
							color: #333333;
						}
					}
				}
			}
		}
		.advert {
			.advert-swiper-container {
				overflow: hidden;
			}
			position: relative;
			min-width: 1360px;
			width:100%!important;
			min-height: 453px;
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
				position: absolute;
				left: 482px;
				top: 192px;
				z-index: 1;
				color: #725050;
				div {
					&:first-child {
						font-size: 48px;
						letter-spacing: 2px;
						margin-bottom: 18px;
					}
					&:nth-child(2) {
						font-size: 30px;
						margin-bottom: 29px;
					}
					&:nth-child(3) {
						font-size: 14px;
						line-height: 24px;
						width: 600px;
					}
					&:nth-child(4) {
						width: 220px;
						height: 34px;
						background: white;
						cursor: pointer;
						box-shadow: 0px 2px 0px 0px rgba(243, 224, 219, 1);
						font-size: 14px;
						margin: 0 auto;
						line-height: 34px;
						margin-top: 60px;
						margin-bottom: 30px;
					}
					&:nth-child(5) {
						width: 220px;
						height: 34px;
						cursor: pointer;
						background: white;
						box-shadow: 0px 2px 0px 0px rgba(243, 224, 219, 1);
						font-size: 14px;
						margin: 0 auto;
						line-height: 34px;
						margin-bottom: 30px;
					}
				}
			}
		}
	}
</style>
