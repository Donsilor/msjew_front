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
              :style="{cursor:item.addres != ''?'pointer':'initial'}"
						>
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
        <div><img src="../../../../static/images/diamond/gia.png" >DIAMONDS</div>
        <div>{{ lang.lowerPrice }}</div>
        <div>{{ lang.GIADiamonds }}</div>
        <div @click="goDiamondIndex(1,1)">{{ lang.chooseDiamonds }}</div>
        <div @click="understandingDiamond(0)">{{ lang.knowDiamonds }}</div>
      </div>
    </div>
    <div class="title">
      <div>{{ lang.diamondshape }}</div>
      <!-- <div>{{ lang.theDiamondshape }}</div> -->
    </div>
    <div class="shape-list">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="item in this.$LANGUAGE.diamond.index.diamondTest.shape"
            class="swiper-slide"
            @click="goDiamondIndex(item.id,2)">
            <img :src="'../../../../static/images/diamond/'+item.url">
            <div>{{ item.name }}</div>
            <p>{{ item.test1 }}</p>
          </div>
        </div>
      </div>
      <div class="swiper-button-next swiper-button-black shape-next"/>
      <div class="swiper-button-prev swiper-button-black shape-prev"/>
    </div>
    <div class="nav">
      <menu>
        <li
          :class="listIndex==0?'active':''"
          @click="listIndex=0">
          <div><i class="icon iconfont">&#xe621;</i>{{ lang.diyRing }}</div>
          <!-- <div>{{ lang.engagementRings }}<span><i class="icon iconfont">&#xe652;</i></span></div> -->
        </li>
<!--        <li-->
<!--          :class="listIndex==1?'active':''"-->
<!--          @click="listIndex=1">-->
<!--          <div><i class="icon iconfont">&#xe612;</i>{{ lang.diyNecklace }}</div>-->
<!--          &lt;!&ndash; <div>{{ lang.customPendants }}<span><i class="icon iconfont">&#xe652;</i></span></div> &ndash;&gt;-->
<!--        </li>-->
<!--        <li-->
<!--          :class="listIndex==2?'active':''"-->
<!--          @click="listIndex=2">-->
<!--          <div><i class="icon iconfont">&#xe61e;</i>{{ lang.diyBracelet }}</div>-->
<!--          &lt;!&ndash; <div>{{ lang.customBracelet }}<span><i class="icon iconfont">&#xe652;</i></span></div> &ndash;&gt;-->
<!--        </li>-->
      </menu>
    </div>
    <div class="custom-area">
      <div
        v-if="list[listIndex].length>0"
        class="adv">
        <img :src="IMG_URL+(list[listIndex][slideIndex].goodsImages.split(',').length>=3?list[listIndex][slideIndex].goodsImages.split(',')[2]:list[listIndex][slideIndex].goodsImages.split(',')[0])" >
      </div>
      <div class="custom-list">
        <div class="custom-swiper-container">
          <div class="swiper-wrapper">
            <div
              v-for="(item,index) in list[listIndex]"
              v-if="index<=4"
              class="swiper-slide"
              @click="goSelece(item)">
              <div>
                <img
                  :src="IMG_URL+item.goodsImages.split(',')[0]"
                  alt
                  class="img-top">
                <div>{{ item.coinType }} {{ formatMoney(item.salePrice) }}</div>
                <p>{{ item.goodsName }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <span
            v-for="(item,index) in list[listIndex]"
            v-if="index<=5"
            :class="slideIndex==index?'active':''"
            @click="goSlideIndex(index)"/>
        </div>
        <div class="custom-next swiper-button-next swiper-button-black"/>
        <div class="custom-prev swiper-button-prev swiper-button-black"/>
      </div>
      <ul>
        <li
          v-for="(item,index) in list[listIndex]"
          v-if="index<=4"
          :class="slideIndex==index?'active':''"
          @click="goSlideIndex(index)"><img :src="IMG_URL+item.goodsImages.split(',')[0]" ></li>
      </ul>
      <div
        class="more"
        @click="more">{{ lang.more }}
        <img src="../../../../static/images/weddingRing/jiantou.png" >
      </div>
    </div>
    <div class="chose-diamond">
      <div>
        <img src="../../../../static/images/diamond/select.png" >
        <div>{{ lang.howToChooseDiamonds }}</div>
        <div>
          {{ lang.toKnowChooseDiamonds }}
        </div>
        <div @click="understandingDiamond(0)">{{ lang.knowMore }}</div>
      </div>
    </div>
    <div class="title">
      <div>{{ lang['about4C'] }}</div>
      <!-- <div>{{ lang['aboutDiamond4C'] }}</div> -->
    </div>
    <ul class="spec-list">
      <li>
        <div><img src="../../../../static/images/diamond/zu1.png" ></div>
        <div>{{ lang.carat }}</div>
        <p>{{ lang.aboutCarat }}</p>
        <label @click="understandingDiamond(0)">{{ lang.checkDetails }}</label>
      </li>
      <li>
        <div><img src="../../../../static/images/diamond/qiegong.png" ></div>
        <div>{{ lang.cut }}</div>
        <p>{{ lang.aboutCut }}</p>
        <label @click="understandingDiamond(1)">{{ lang.checkDetails }}</label>
      </li>
      <li>
        <div><img src="../../../../static/images/diamond/yanse.png" ></div>
        <div>{{ lang.color }}</div>
        <p>{{ lang.aboutColor }}</p>
        <label @click="understandingDiamond(2)">{{ lang.checkDetails }}</label>
      </li>
      <li>
        <div><img src="../../../../static/images/diamond/jingdu.png" ></div>
        <div>{{ lang.clarity }}</div>
        <p>{{ lang.aboutClarity }}</p>
        <label @click="understandingDiamond(3)">{{ lang.checkDetails }}</label>
      </li>
    </ul>
    <div class="authentication">
      <div>
        <img src="../../../../static/images/diamond/certification.png" >
        <div>{{ lang.diamondReport }}</div>
        <div>{{ lang.aboutOurDiamondReport }}</div>
        <div @click="understandingDiamond(4)">{{ lang.knowMore }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper.js';
import { formatMoney } from '@/api/filterUtil.js';
import { clearCustom, clearTwoCustom } from '@/api/cache.js';
export default {
  data() {
    return {
      lang: this.$LANGUAGE.diamond.details,
      slideIndex: 0,
      advBanner: [],
      advertIndex: 0,
      tdOpenType: 1,
      module: [{}, {}, {}, {}, {}, {}, {}, {}],
      list: [
        [],
        [],
        []
      ],
      listIndex: 0,
      swiper: null
    };
  },
  watch: {
    listIndex() {
      this.slideIndex = 0;
      setTimeout(() => {
        if (this.swiper) {
          this.swiper.destroy(false);
        }
        this.swiper = new Swiper('.custom-swiper-container', {
          slidesPerView: 1,
          loop: true,
          nextButton: '.custom-next',
          prevButton: '.custom-prev',
          onTransitionStart: (swiper) => {
            this.slideIndex = swiper.realIndex;
          }
        });
      }, 10);
    }
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
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 4,
      spaceBetween: 100,
      slidesPerGroup: 1,
      nextButton: '.shape-next',
      prevButton: '.shape-prev'
    });
  },
  created() {
    this.getModule();
    clearCustom();
    clearTwoCustom();
  },
  methods: {
    formatMoney: formatMoney,
    more() {
      if (this.listIndex == 0) {
        this.$router.push({
          name: 'engagementRing',
          params: {
            id: 0,
            key: 1
          }
        });
      } else if (this.listIndex == 1) {
        this.$router.push({
          name: 'jewelleryAccessories',
          params: {
            id: 206,
            key: 2
          }
        });
      } else {
        this.$router.push({
          name: 'jewelleryAccessories',
          params: {
            id: 210,
            key: 2
          }
        });
      }
    },
    /**
			 * 查看詳情
			 */
    goSelece(item) {
      if (item.showType === 1) {
        window.open(`/${this.listIndex === 0 ? 'seleceEngagement' : 'seleceJewellery'}/${item.id}/2`);
      } else {
        this.$router.push({
          name: this.listIndex == 0 ? 'seleceEngagement' : 'seleceJewellery',
          params: {
            id: item.id,
            key: 2
          }
        });
      }
    },
    goSlideIndex(index) {
      this.swiper.slideTo(index + 1);
    },
    /**
			 * 了解鑽石
			 */
    understandingDiamond(type) {
      var pathName = '';
      if (type == 0) {
        pathName = 'diamondCarat';
      } else if (type == 1) {
        pathName = 'diamondCut';
      } else if (type == 2) {
        pathName = 'diamondColor';
      } else if (type == 3) {
        pathName = 'diamondCleanliness';
      } else if (type == 4) {
        pathName = 'proof';
      }
      this.$router.push({
        name: pathName
      });
    },
    /**
			 * 挑選鑽石
			 */
    goDiamondIndex(id, key) {
      this.$router.push({
        name: 'diamond',
        params: {
          id: id,
          key: key
        }
      });
    },
    getModule() {
      this.$axiosGet(`/web/Website/queryWebsiteModule`, {type: 4}).then(res => {
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

        for (let i = 0, len = this.module[0].moduleGoods.length; i < len; i++) {
          this.module[0].moduleGoods[i].goods.showType = this.module[0].moduleGoods[i].showType
          this.list[this.module[0].moduleGoods[i].type - 3].push(this.module[0].moduleGoods[i].goods);
        }
        setTimeout(() => {
          this.swiper = new Swiper('.custom-swiper-container', {
            slidesPerView: 1,
            loop: true,
            nextButton: '.custom-next',
            prevButton: '.custom-prev',
            onTransitionStart: (swiper) => {
              this.slideIndex = swiper.realIndex;
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
      console.log('this.adverSwiper', this.adverSwiper);
      this.adverSwiper.slideTo(index + 1);
    }
  }

};
</script>

<style lang="less" scoped>
	.details-diamond {
		.authentication {
			height: 500px;
			width: 1360px;
			margin: 0 auto;
			margin-bottom: 50px;
			clear: both;
			background-image: url('../../../../static/images/diamond/zhengshu.png');
			>div {
				float: left;
				margin-left: 110px;
				width: 300px;
				margin-top: 55px;
				img {
					display: block;
					margin: 0 auto;
					height: 49px;
					margin-bottom: 19px;
				}
				div:nth-child(2) {
					height: 24px;
					font-size: 24px;
					color: rgba(51, 51, 51, 1);
					margin-bottom: 38px;
				}
				div:nth-child(3) {
					font-size: 12px;
					color: rgba(51, 51, 51, 1);
					line-height: 24px;
					margin-bottom: 40px;
				}
				div:nth-child(4) {
					width: 110px;
					height: 34px;
					background: rgba(201, 191, 182, 1);
					line-height: 34px;
					margin: 0 auto;
					cursor: pointer;
					color: white;
					line-height: 34px;
				}
			}
		}
		.spec-list {
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
					margin-left: 28px;
					color: #333333;
					font-size: 18px;
					margin-bottom: 20px;
					&:first-child {
						margin-left: 0px;
						height: 198px;
						overflow: hidden;
					}
					span {
						font-size: 17px;
					}
				}
				p {
					color: #666666;
					font-size: 12px;
					line-height: 18px;
					margin-left: 28px;
					margin-right: 28px;
				}
				label {
					left: 28px;
					font-size: 12px;
					text-decoration: underline;
					color: rgba(242, 155, 135, 1);
					position: absolute;
					bottom: 25px;
					cursor: pointer;
				}
			}
		}
		.chose-diamond {
			background-image: url('../../../../static/images/diamond/crad.png');
			width: 1360px;
			margin: 0 auto;
			height: 500px;
			margin-bottom: 60px;
			background-size: cover;
			>div {
				width: 539px;
				padding-top: 127px;
				float: right;
				img {
					display: block;
					margin: 0 auto;
					margin-bottom: 21px;
					height: 44px;
				}
				div:nth-child(2) {
					height: 24px;
					font-size: 24px;
					color: rgba(51, 51, 51, 1);
					line-height: 24px;
					margin-bottom: 28px;
				}
				div:nth-child(3) {
					width: 354px;
					font-size: 12px;
					color: rgba(51, 51, 51, 1);
					line-height: 24px;
					margin: 0 auto;
					margin-bottom: 44px;
				}
				div:nth-child(4) {
					width: 110px;
					height: 34px;
					line-height: 34px;
					margin: 0 auto;
					font-size: 14px;
					background: #c9bfb6;
					cursor: pointer;
					color: white;
					margin-bottom: 10px;
				}
				div:nth-child(5) {
					font-size: 12px;
					color: #999;
					text-decoration: underline;
				}
			}
		}
		.custom-area {
			width: 1360px;
			margin: 0 auto;
			position: relative;
			margin-top: 60px;
			.custom-list {
				float: right;
				width: 640px;
				padding-top: 39px;
				overflow: hidden;
				height: 500px;
				position: relative;
				.pagination {
					margin-top: 16px;
					outline: none;
					span {
						width: 14px;
						height: 14px;
						background: rgba(230, 230, 230, 1);
						border-radius: 50%;
						display: inline-block;
						cursor: pointer;
						margin-left: 12px;
						&:first-child {
							margin-left: 0px;
						}
					}
					.active {
						background: #A88F82;
					}
				}
				.swiper-button-black {
					height: 16px;
					cursor: pointer;
					position: absolute;
					outline: none;
				}
				.custom-swiper-container {
					width: 500px;
					margin: 0 auto;
					overflow: hidden;
					box-shadow: 0px 0px 10px 0px #efefef;
					.swiper-slide {
						width: 500px;
						height: 420px;
						cursor: pointer;
						>div {
							width: 360px;
							margin: 0 auto;
							img {
								height: 312px;
								width: 312px;
								display: block;
								margin: 0 auto;
								margin-bottom: 14px;
							}
							div:nth-child(2) {
								font-size: 24px;
								color: rgba(242, 155, 135, 1);
								margin-bottom: 10px;
								font-weight: 300;
								font-family: twCenMt;
							}
							div:nth-child(3) {
								font-size: 14px;
								color: #333333;
							}
						}
					}
				}
			}
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
				bottom: 132px;
				img {
					position: absolute;
					width: 40px;
					top: 12px;
					right: -20px;
				}
			}
			.adv {
				width: 720px;
				height: 500px;
				display: flex;
				align-items: center;
				float: left;
				overflow: hidden;
				img {
					width: 100%;
				}
			}
			ul {
				clear: both;
				overflow: auto;
				padding-top: 30px;
				padding-left: 5px;
				padding-bottom: 60px;
				li {
					cursor: pointer;
					float: left;
					height: 180px;
					width: 180px;
					cursor: pointer;
					margin-right: 60px;
					img {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.active {
					box-shadow: 0px 0px 10px 0px #efefef;
				}
			}
		}
		.nav {
			margin-top: 59px;
			min-width: 1360px;
			height: 120px;
			background: #f8f8f5;
			menu {
				width: 1360px;
				margin: 0 auto;
				text-align: left;
				overflow: hidden;
				padding: 0;
				.active {
					color: #A88F82;
				}
				li {
					float: left;
					list-style: none;
					height: 80px;
					width: 260px;
					text-align: center;
					border-right: 1px solid #D2D2D2;
					margin-top: 20px;
					cursor: pointer;
					color: #333333;
					&:hover {
						color: #A88F82;
					}
					div {
						&:first-child {
							font-size: 14px;
							line-height: 80px;
							i {
								height: 20px;
								line-height: 80px;
								margin-right: 19px;
								vertical-align: middle;
							}
						}
						&:nth-child(2) {
							font-size: 12px;
							letter-spacing: 1px;
							font-family: GillSansMT;
							span {
								float: right;
								margin-right: 30px;
								border-radius: 50%;
								background: white;
								border: 1px solid #999999;
								text-align: center;
								width: 20px;
								line-height: 20px;
								height: 20px;
								i {
									margin-left: 1px;
									font-size: 10px;
								}
							}
						}
					}
				}
			}
		}
		.shape-list {
			width: 1360px;
			margin: 0 auto;
			position: relative;
			.swiper-button-black {
				height: 16px;
				cursor: pointer;
				position: absolute;
				top: 60px;
				outline: none;
			}
			.swiper-container {
				width: 1020px;
				margin-top: 60px;
				color: #333333;
				.swiper-slide {
					cursor: pointer;
					img {
						height: 94px;
						margin-bottom: 39px;
					}
					div {
						font-size: 18px;
						margin-bottom: 39px;
					}
					p {
						font-size: 12px;
						line-height: 20px;
					}
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
			position: relative;
			width:100%!important;
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
				position: absolute;
				right: 200px;
				top: 150px;
				z-index: 1;
				color: #333333;
				div {
					&:first-child {
						font-size: 48px;
						height: 48px;
						line-height: 48px;
						margin-bottom: 19px;
						img {
							float: left;
							height: 48px;
							width: auto;
							margin-right: 51px;
						}
					}
					&:nth-child(2) {
						font-size: 30px;
						margin-bottom: 30px;
					}
					&:nth-child(3) {
						font-size: 18px;
					}
					&:nth-child(4) {
						width: 220px;
						height: 34px;
						background: white;
						cursor: pointer;
						color: #666666;
						box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 1);
						font-size: 14px;
						margin: 0 auto;
						line-height: 34px;
						margin-top: 60px;
						margin-bottom: 30px;
					}
					&:nth-child(5) {
						width: 220px;
						height: 34px;
						color: #666;
						cursor: pointer;
						background: white;
						box-shadow: 1px 1px 1px 0px rgba(153, 153, 153, 1);
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
