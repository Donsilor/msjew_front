<template>
	<div class="navFooter">
		<div id="boxFixed" :class="{'is_fixed' : isFixed}" class="box_fixed clearfix">
			<div :class="{'is_fixed2' : isFixed2}" class="fixed-content">
				<div class="fixed-top clearfix">
					<router-link to="/"><img class="pull-left" src="../../static/images/nav/logo.png"></router-link>
					<div class="right-flex">
						<div class="span-border-left" @click="gokown">
							<span class="padding-left-40">{{ lang.buy }}</span>
						</div>
						<div v-show="!isFixed" class="search">
							<input :placeholder="lang.search" v-model="searchContent" @keyup.enter="search">
							<img src="../../static/images/nav/search.png" @click="search">
						</div>
						<div v-show="isFixed" class="showFixed">
							<router-link to="/personal"><img src="../../static/images/nav/me.png"></router-link>
							<router-link to="/personal/wish"><img src="../../static/images/nav/wish.png"></router-link>
							<router-link to="/cart"><img src="../../static/images/nav/cart.png"></router-link>
						</div>
					</div>
					<ul>
						<template v-for="(item, index) in lang.list">
							<li @click="goProduct(item.url,item.key,item.id)" @mouseover="selectStyle(index)" @mouseout="outStyle">
								<span :class="{'active': navIndex === index}">{{ item.name }}</span>
							</li>
						</template>
					</ul>
				</div>
			</div>
			<div class="position-fix">
				<div v-show="navIndex === 0" class="hover-show clearfix engagementRing" @mouseover="selectStyle(0)" @mouseout="outStyle">
					<div class="main">
						<div class="container">
							<dl v-for="item in this.$LANGUAGE.engagementRing.index.engagementRing">
								<dt>{{ item.title }}</dt>
								<dd v-for="(items,index) in item.list" class="clearfix">
									<div v-show="item.key<3 || index<6" @click="goEngaement(item.key,items.id)">
										<div class="icon-div">
											<i class="icon iconfont icon-font" v-html="items.icon" />
										</div>
										<div class="text">{{ items.name }}</div>
									</div>
								</dd>
								<dt class="margin-top-50">{{ item.title1 }}</dt>
								<dd @click="goDiamond(2, 18)" v-for="items in item.list1 " class="clearfix pointer">{{ items }}</dd>
								<span class="s-top" />
								<span class="s-top" />
							</dl>
						</div>
						<div class="advert-swiper-container1 advert" v-if="advBanner1.length>0">
							<div class="swiper-wrapper">
							  <div v-for="(item,index) in advBanner1" class="swiper-slide">
							    <img @click="openAddress(item.addres, '1')" :src="IMG_URL+item.image" :style="{cursor:item.addres != ''?'pointer':'initial'}" >
							  </div>
							</div>
							<div class="swiper-pagination" v-if="advBanner1.length>1">
								<span v-for="(item,index) in advBanner1" :class="advertIndex1==index?'advert-active':''" @click.stop="goSlide(index,'1')"></span>
							</div>
						</div>
					</div>
				</div>
				<div v-show="navIndex === 1" class="hover-show weddingRing" @mouseover="selectStyle (1)" @mouseout="outStyle">
					<div class="main">
						<div class="container">
							<dl v-for="item in this.$LANGUAGE.weddingRing.index.weddingRing">
								<dt>{{ item.title }}</dt>
								<dd v-for="(items,index) in item.list" class="clearfix">
									<div v-show="item.key<3 || index<6" @click="goWedding(item.key,items.id)">
										<div class="icon-div">
											<i class="icon iconfont icon-font" v-html="items.icon" />
										</div>
										<div class="text">{{ items.name }}</div>
									</div>
								</dd>
								<span class="s-top" />
								<span class="s-top" />
							</dl>
						</div>
						<div class="advert-swiper-container2 advert" v-if="advBanner2.length>0">
							<div class="swiper-wrapper">
							  <div v-for="(item,index) in advBanner2" class="swiper-slide">
							    <img @click="openAddress(item.addres, '2')" :src="IMG_URL+item.image" :style="{cursor:item.addres != ''?'pointer':'initial'}" >
							  </div>
							</div>
							<div class="swiper-pagination" v-if="advBanner2.length>1">
								<span v-for="(item,index) in advBanner2" :class="advertIndex2==index?'advert-active':''" @click.stop="goSlide(index,'2')"></span>
							</div>
						</div>
						<!-- <div class="advert" v-if="adverts.length>0" :style="{cursor:adverts[1].ds && adverts[1].ds[0].tdAddres?'pointer':'initial'}">
							<img :src="IMG_URL+(adverts[1].ds && adverts[1].ds[0].tdImg?adverts[1].ds[0].tdImg.split(',')[0]:adverts[1].dsImg)" @click="openAdvertLink(adverts[1].ds?adverts[1].ds[0].tdAddres:'')">
						</div> -->
					</div>
				</div>
				<div v-show="navIndex === 2"  class="hover-show diamond" @mouseover="selectStyle (2)" @mouseout="outStyle">
					<div class="main">
						<div class="container">
							<dl v-for="item in this.$LANGUAGE.diamond.index.diamond">
								<dt>{{ item.title }}</dt>
								<dd v-for="items in item.list" class="clearfix">
									<div @click="goDiamond(item.key,items.id)">
										<div class="icon-div">
											<i class="icon iconfont icon-font" v-html="items.icon" />
										</div>
										<div class="text">{{ items.name }}</div>
									</div>
								</dd>
								<span class="s-top" />
								<span class="s-top" />
							</dl>
						</div>
						<div class="advert-swiper-container3 advert" v-if="advBanner3.length>0">
							<div class="swiper-wrapper">
							  <div v-for="(item,index) in advBanner3" class="swiper-slide">
							    <img @click="openAddress(item.addres, '3')" :src="IMG_URL+item.image" :style="{cursor:item.addres != ''?'pointer':'initial'}" >
							  </div>
							</div>
							<div class="swiper-pagination" v-if="advBanner3.length>1">
								<span v-for="(item,index) in advBanner3" :class="advertIndex3==index?'advert-active':''" @click.stop="goSlide(index,'3')"></span>
							</div>
						</div>
						<!-- <div class="advert" v-if="adverts.length>0" :style="{cursor:adverts[2].ds && adverts[2].ds[0].tdAddres?'pointer':'initial'}">
							<img :src="IMG_URL+(adverts[2].ds && adverts[2].ds[0].tdImg?adverts[2].ds[0].tdImg.split(',')[0]:adverts[2].dsImg)" @click="openAdvertLink(adverts[2].ds?adverts[2].ds[0].tdAddres:'')">
						</div> -->
					</div>
				</div>
				<div v-show="navIndex === 3" class="hover-show jewelleryAccessories" @mouseover="selectStyle (3)" @mouseout="outStyle">
					<div class="main">
						<div class="container">
							<dl v-for="item in this.$LANGUAGE.engagementRing.index.jewelleryAccessories">
								<dt>{{ item.title }}</dt>
								<dd v-for="items in item.list" class="clearfix">
									<div @click="goJewellery(item.key,items.id)">
										<div class="icon-div">
											<i class="icon iconfont icon-font" v-html="items.icon" />
										</div>
										<div class="text">{{ items.name }}</div>
									</div>
								</dd>
								<span class="s-top" />
								<span class="s-top" />
							</dl>
						</div>
						<div class="advert-swiper-container4 advert" v-if="advBanner4.length>0">
							<div class="swiper-wrapper">
							  <div v-for="(item,index) in advBanner4" class="swiper-slide">
							    <img @click="openAddress(item.addres, '4')" :src="IMG_URL+item.image" :style="{cursor:item.addres != ''?'pointer':'initial'}" >
							  </div>
							</div>
							<div class="swiper-pagination" v-if="advBanner4.length>1">
								<span v-for="(item,index) in advBanner4" :class="advertIndex4==index?'advert-active':''" @click.stop="goSlide(index,'4')"></span>
							</div>
						</div>
						<!-- <div class="advert" v-if="adverts.length>0" :style="{cursor:adverts[3].ds && adverts[3].ds[0].tdAddres?'pointer':'initial'}">
							<img :src="IMG_URL+(adverts[3].ds && adverts[3].ds[0].tdImg?adverts[3].ds[0].tdImg.split(',')[0]:adverts[3].dsImg)" @click="openAdvertLink(adverts[3].ds?adverts[3].ds[0].tdAddres:'')">
						</div> -->
					</div>
				</div>
			</div>
		</div>
		<div :class="{'isFill':isFixed}" class="fill" />
	</div>
</template>

<script>
	import Swiper from 'swiper/dist/js/swiper.js';
	import { clearCustom, clearTwoCustom } from '@/api/cache.js';
	import Myswiper from '@/components/myswiper.vue';
	export default {
		name: 'NavTop',
		components: {
			Myswiper
		},
		data() {
			return {
				adverts: [],
				navIndex: '',
				isFixed: false,
				isFixed2: false,
				lang: this.$LANGUAGE.components.navFooter,
				offsetTop: 0,
				searchContent: '' ,// 搜索內容,
				advAddress1: '',
				slideIndex1: 0,
				advBanner1: [],
				advertIndex1: 0,
				tdOpenType1: 1,

				advAddress2: '',
				slideIndex2: 0,
				advBanner2: [],
				advertIndex2: 0,
				tdOpenType2: 1,

				advAddress3: '',
				slideIndex3: 0,
				advBanner3: [],
				advertIndex3: 0,
				tdOpenType3: 1,

				advAddress4: '',
				slideIndex4: 0,
				advBanner4: [],
				advertIndex4: 0,
				tdOpenType4: 1,

				swiper: null,

				item1: {},
			};
		},
		created() {
			this.getAdvter();
		},
		mounted() {
			window.addEventListener('scroll', this.initHeight);
			this.$nextTick(() => {
				this.offsetTop = document.querySelector('#boxFixed').offsetTop;
			});
		},

		destroyed() {
			window.removeEventListener('scroll', this.handleScroll);
		},
		methods: {
			openAdvertLink(url) {
				if(url) {
					window.open(url.indexOf('http') > -1 ? url : 'http://' + url);
				}
			},
			getAdvter() {
				this.$axiosGet(`/web/Website/queryWebsiteModule`,{type:5}).then(res => {
					this.adverts = res.data.advert;

					this.advBanner1 = [];
					this.tdOpenType1 = res.data.advert[2].tdOpenType || null;
					if(res.data.advert[2].advertImgModelList && res.data.advert[2].advertImgModelList.length > 0) {
						this.advBanner1 = res.data.advert[2].advertImgModelList
					} else {
						const o= {
							addres: "",
							id: "",
							image: res.data.advert[2].dsImg,
							tbAdvertId: ""
						}
						this.advBanner1.push(o)
					}

					this.advBanner2 = [];
					this.tdOpenType2 = res.data.advert[3].tdOpenType || null;
					if(res.data.advert[3].advertImgModelList && res.data.advert[3].advertImgModelList.length > 0) {
						this.advBanner2 = res.data.advert[3].advertImgModelList
					} else {
						const o= {
							addres: "",
							id: "",
							image: res.data.advert[3].dsImg,
							tbAdvertId: ""
						}
						this.advBanner2.push(o)
					}

					this.advBanner3 = [];
					this.tdOpenType3 = res.data.advert[4].tdOpenType || null;
					if(res.data.advert[4].advertImgModelList && res.data.advert[4].advertImgModelList.length > 0) {
						this.advBanner3 = res.data.advert[4].advertImgModelList
					} else {
						const o= {
							addres: "",
							id: "",
							image: res.data.advert[4].dsImg,
							tbAdvertId: ""
						}
						this.advBanner3.push(o)
					}

					this.advBanner4 = [];
					this.tdOpenType4 = res.data.advert[5].tdOpenType || null;
					if(res.data.advert[5].advertImgModelList && res.data.advert[5].advertImgModelList.length > 0) {
						this.advBanner4 = res.data.advert[5].advertImgModelList
					} else {
						const o= {
							addres: "",
							id: "",
							image: res.data.advert[5].dsImg,
							tbAdvertId: ""
						}
						this.advBanner4.push(o)
					}
				});
			},
			openAddress(ind,type) {
				let openType = null;
				if (type === '1') {
					openType = this.tdOpenType1;
				} else if (type === '2') {
					openType = this.tdOpenType2;
				} else if (type === '3') {
					openType = this.tdOpenType3;
				} else if (type === '4') {
					openType = this.tdOpenType4;
				}
				let openTypes = openType == 1 ? "_blank" : "_parent";
				if(ind && ind != '' ) {
					window.open(ind.indexOf('http') == -1 ? 'http://' + ind : ind,openTypes)
				}
			},
			goSlide(index,type) {
				let adverSwiper = null;
				if (type === '1') {
					this.adverSwiper1.slideTo(index + 1);
				} else if (type === '2') {
					this.adverSwiper2.slideTo(index + 1);
				} else if (type === '3') {
					this.adverSwiper3.slideTo(index + 1);
				} else if (type === '4') {
					this.adverSwiper4.slideTo(index + 1);
				}
			},
			/**
			 * 搜索
			 */
			search() {
				clearCustom()
				clearTwoCustom()
				if(this.searchContent.trim() != '') {
					this.$router.push({
						name: 'search',
						params: {
							content: this.searchContent.trim()
						}
					});
				}
			},
			initHeight() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				this.isFixed = scrollTop > this.offsetTop;
				this.isFixed2 = scrollTop > this.offsetTop;
			},
			selectStyle(val) {
				this.navIndex = val;
				if (val === 0) {
					if(this.advBanner1.length > 1 && !this.adverSwiper1) {
						setTimeout(() => {
							this.adverSwiper1 = new Swiper(".advert-swiper-container1", {
								slidesPerView: 1,
								loop: true,
								autoplay: 5000,
								autoplayDisableOnInteraction: false,
								onTransitionStart: (swiper) => {
									this.advertIndex1 = swiper.realIndex;
								}
							});
						}, 10);
					}
				} else if (val === 1) {
					if(this.advBanner2.length > 1 && !this.adverSwiper2) {
						setTimeout(() => {
							this.adverSwiper2 = null;
							this.adverSwiper2 = new Swiper(".advert-swiper-container2", {
								slidesPerView: 1,
								loop: true,
								autoplay: 5000,
								autoplayDisableOnInteraction: false,
								onTransitionStart: (swiper) => {
									this.advertIndex2 = swiper.realIndex;
								}
							});
						}, 10);
					}
				} else if (val === 2) {
					if(this.advBanner3.length > 1 && !this.adverSwiper3) {
						setTimeout(() => {
							this.adverSwiper3 = null;
							this.adverSwiper3 = new Swiper(".advert-swiper-container3", {
								slidesPerView: 1,
								loop: true,
								autoplay: 5000,
								onTransitionStart: (swiper) => {
									this.advertIndex3 = swiper.realIndex;
								}
							});
						}, 10);
					}
				} else if (val === 3) {
					if(this.advBanner4.length > 1 && !this.adverSwiper4) {
						setTimeout(() => {
							this.adverSwiper4 = null;
							this.adverSwiper4 = new Swiper(".advert-swiper-container4", {
								slidesPerView: 1,
								loop: true,
								autoplay: 5000,
								onTransitionStart: (swiper) => {
									this.advertIndex4 = swiper.realIndex;
								}
							});
						}, 10);
					}
				}
			},
			outStyle(val) {
				this.navIndex = '';
			},

			// 跳转到产品二级界面
			goProduct(val, key, id) {
				this.navIndex = -1;
				if(key > 0) {
					this.$router.push({
						name: val,
						params: {
							id: id,
							key: key
						}
					});
				} else {
					this.$router.push({
						name: val
					});
				}
			},
			// 跳到求婚页面
			goEngaement(key, id) {
				clearCustom()
				clearTwoCustom()
				this.navIndex = -1;
				if(key === '2' || key === '3') {
					this.$router.push({
						name: 'engagementRing',
						params: {
							id: id,
							key: key
						}
					});
				} else {
					clearCustom();
					clearTwoCustom();
					if(id == 0) { // 从戒托开始
						this.$router.push({
							name: 'engagementRing',
							params: {
								id: id,
								key: key
							}
						});
					} else if(id == 1) { // 从钻石开始
						this.$router.push({
							name: 'diamond',
							params: {
								id: id,
								key: key
							}
						});
					}
				}
			},
			// 调到饰品页
			goJewellery(key, id) {
				this.navIndex = -1;
				clearCustom()
				clearTwoCustom()
				if(key === '1') {
					this.$router.push({
						name: 'jewelleryAccessories',
						params: {
							id: id,
							key: key
						}
					});
				} else if(key === '2') {
					if(id == 2) { // 定制戒指
						this.$router.push({
							name: 'engagementRing',
							params: {
								id: 0,
								key: 1
							}
						});
					} else { // 定制項鏈和手鐲
						this.$router.push({
							name: 'jewelleryAccessories',
							params: {
								id: id,
								key: key
							}
						});
					}
				} else if (key === "3") {
					if (id == 0) {
						this.$router.push({
							name: 'jewelleryAccessories',
							params: {
								id: '206',
								key: '1000'
							}
						});
					} else if (id == 1) {
						this.$router.push({
							name: 'diamondDetails',
						});
					} else if(id == 2) {
						this.$router.push({
							name: 'jewelleryAccessories',
							params: {
								id: '206',
								key: '99'
							}
						});
					}
				}
			},
			// 跳到结婚页
			goWedding(key, id) {
				clearCustom()
				clearTwoCustom()
				this.navIndex = -1;
				if(key === '2' || key === '3' || key === '4') {
					this.$router.push({
						name: 'weddingRing',
						params: {
							id: id,
							key: key
						}
					});
				} else if(key === '1') {
					this.$router.push({
						name: 'rightRing',
						params: {
							id: id
						}
					});
				}
			},
			// 跳到钻石
			goDiamond(key, id) {
				clearCustom()
				clearTwoCustom()
				this.navIndex = -1;
				if(key == 2) {
					this.$router.push({
						name: 'diamond',
						params: {
							id: id,
							key: key
						}
					});
				} else if(key == 3) {
					if(id == 2) { // 定制戒指
						this.$router.push({
							name: 'engagementRing',
							params: {
								id: 0,
								key: 1
							}
						});
					} else { // 定制項鏈和手鐲
						this.$router.push({
							name: 'jewelleryAccessories',
							params: {
								id: id,
								key: 2
							}
						});
					}
				} else {
					if(id == 0) { // 从戒托开始
						this.$router.push({
							name: 'engagementRing',
							params: {
								id: id,
								key: key
							}
						});
					} else if(id == 1) { // 从钻石开始
						this.$router.push({
							name: 'diamond',
							params: {
								id: id,
								key: key
							}
						});
					}
				}
			},
			// gokown去知识页
			gokown() {
				this.$router.push({
					name: 'diamondCarat'
				});
			}
		}
	};
</script>

<style scoped="scoped" lang="less">
	.fill {
		display: none;
	}

	.isFill {
		height: 77px;
		width: 100%;
		display: block;
	}

	.position-fix {
		width: 100%;
		min-width: 1360px;
		position: absolute;
		bottom: 0;
		transform: translateY(100%);
		z-index: 9999;
	}

	.navFooter {
		.hover-show {
			width: 100%;
			height: 440px;
			background: #ffffff;
			z-index: 2000;
			.main {
				width: 1360px;
				height: 440px;
				padding: 40px 0;
				overflow: hidden;
				margin: 0 auto;
				text-align: left;
				.container {
					float: left;
					width: 990px;
					dl {
						position: relative;
						float: left;
						width: 330px;
						height: 360px;
						padding-left: 50px;
						border-left: 1px dashed #cbcbcc;
						span {
							position: absolute;
							bottom: 0;
							left: -4px;
							width: 8px;
							height: 8px;
							border-radius: 4px;
							background: #dedcde;
						}
						span:first-of-type {
							top: 0;
						}
						dt {
							font-size: 16px;
							color: #333333;
							margin-bottom: 30px;
						}
						dd {
							display: block;
							font-size: 14px;
							line-height: 18px;
							color: #999999;
							margin-bottom: 20px;
							.icon-div {
								float: left;
								width: 40px;
								height: 18px;
								text-align: center;
								margin-right: 10px;
								.icon-font {
									font-size: 18px;
									line-height: 18px;
								}
							}
							.text {
								float: left;
								height: 18px;
								font-size: 14px;
								line-height: 18px;
								cursor: pointer;
								&:hover {
									color: #9B745C;
								}
							}
						}
					}
					dl:first-of-type {
						padding-left: 0px;
						border-left: none;
						span {
							display: none;
						}
					}
				}
				.advert {
					position: relative;
					float: right;
					margin: 0;
					width: 370px!important;
					height: 360px!important;
					overflow: hidden;
					img {
						width: 370px!important;
						height: 360px!important;
					}
					.swiper-pagination {
						position: absolute;
						width: 100%;
						bottom: 16px;
						span {
							cursor: pointer;
							width: 10px;
							margin: 0 14px;
							height: 10px;
							background: rgba(255, 255, 255, 1);
							opacity: 0.5;
							border-radius: 5px;
							display: inline-block;
						}
						.advert-active {
							opacity: 1;
						}
					}
				}
			}
		}
		.engagementRing {
			.main {
				.container {
					dl:nth-child(2) {
						dd {
							.icon-div {
								margin-right: 20px;
								.icon-font {
									font-size: 40px;
								}
							}
							.text {}
						}
					}
					dl:last-child {
						dd:nth-child(2) {
							.icon-div {
								.icon-font {
									color: #b7b7b7;
								}
							}
						}
						dd:nth-child(3) {
							.icon-div {
								.icon-font {
									color: #b7b7b7;
								}
							}
						}
						dd:nth-child(4) {
							.icon-div {
								.icon-font {
									color: #cfb255;
								}
							}
						}
						dd:nth-child(5) {
							.icon-div {
								.icon-font {
									color: #d9bd63;
								}
							}
						}
						dd:nth-child(6) {
							.icon-div {
								.icon-font {
									color: #cfdad9;
								}
							}
						}
						dd:nth-child(7) {
							.icon-div {
								.icon-font {
									color: #ffb496;
								}
							}
						}
					}
				}
			}
		}
		.weddingRing {
			.main {
				.container {
					dl {
						padding-left: 30px;
						width: 23%;
						dd {
							.icon-div {
								margin-right: 20px;
								.icon-font {
									font-size: 40px;
								}
							}
							.text {}
						}
					}
					dl:nth-child(2) {
						width: 30%;
					}
					dl:nth-child(3) {
						padding-right: 20px;
						padding-left: 5px;
						border: none;
						span {
							display: none;
						}
					}
					dl:nth-child(4) {
						dd {
							.icon-div {
								margin-right: 10px;
								.icon-font {
									font-size: 18px;
								}
							}
						}
					}
					dl:last-child {
						dd:nth-child(2) {
							.icon-div {
								.icon-font {
									color: #b7b7b7;
								}
							}
						}
						dd:nth-child(3) {
							.icon-div {
								.icon-font {
									color: #b7b7b7;
								}
							}
						}
						dd:nth-child(4) {
							.icon-div {
								.icon-font {
									color: #cfb255;
								}
							}
						}
						dd:nth-child(5) {
							.icon-div {
								.icon-font {
									color: #d9bd63;
								}
							}
						}
						dd:nth-child(6) {
							.icon-div {
								.icon-font {
									color: #cfdad9;
								}
							}
						}
						dd:nth-child(7) {
							.icon-div {
								.icon-font {
									color: #ffb496;
								}
							}
						}
					}
				}
			}
		}
		.diamond {
			.main {
				.container {
					dl {
					padding-left: 40px;
						dd {
							.icon-div {
								.icon-font {}
							}
							.text {}
						}
					}
					dl:nth-child(1) {
						width: 26%;
						dt {
							padding-right: 15px;
							line-height: 28px;
						}
					}
					dl:nth-child(2) {
						width: 48%;
						dd {
							display: inline-block;
							width: 48%;
							margin-right: 0px;
						}
					}
					dl:nth-child(3) {
						width: 26%;
						dd {
							.icon-div {
								.icon-font {
									font-size: 20px;
								}
							}
						}
					}
				}
			}
		}
		.jewelleryAccessories {
			.main {
				.container {
					width: 800px;
					margin-left: 50px;
					dl {
						dd {
							.icon-div {
								.icon-font {
									font-size: 20px;
								}
							}
						}
					}
					dl:nth-child(1) {
						width: 28%;
						margin-left: 150px;
					}
					dl:nth-child(2) {
						width: 50%;
						border-left: 0
					}
					dl:nth-child(3) {
						width: 40%;
					}
					.s-top {
						display: none;
					}
				}
				.advert {
					margin-right: 100px;
				}
			}
		}
		.box_fixed {
			width: 100%;
			background: #ffffff;
			position: relative;
			.fixed-content {
				position: relative;
				width: 1360px;
				border-bottom: 1px solid #E6E6E6;
				margin: 0 auto;
				img {
					height: 29px;
					margin: 24px 0;
				}
				ul {
					float: right;
					margin-right: 45px;
					li {
						cursor: pointer;
						float: left;
						font-size: 14px;
						line-height: 76px;
						height: 77px;
						color: #636363;
						padding: 0 40px;
						span {
							display: inline-block;
							height: 77px;
							/*padding: 28px 0;*/
						}
					}
					.active {
						color: #9b745c;
						border-bottom: 1px solid #9b745c;
					}
				}
				.right-flex {
					float: right;
					display: flex;
					align-items: center;
					height: 76px;
					.span-border-left {
						padding-right: 50px;
						span {
							cursor: pointer;
							border-left: 1px solid #636363;
							font-size: 14px;
							line-height: 76px;
							color: #636363;
						}
					}
					span {
						padding-right: 45px;
						font-size: 14px;
						line-height: 76px;
						color: #636363;
					}
					.search {
						width: 170px;
						display: inline-block;
						input {
							width: 136px;
							height: 25px;
							font-size: 14px;
							line-height: 25px;
							color: #636363;
							border: none;
							outline: none;
							padding: 0 0 2px 5px;
							border-bottom: 1px solid #666666;
							position: relative;
							top: -2px;
						}
						img {
							width: 20px;
							height: 23px;
							margin: 0;
							position: relative;
							top: 5px;
							cursor: pointer;
						}
					}
					.showFixed {
						display: inline-block;
						margin: 0px;
						width: 160px;
						a {
							display: inline-block;
							margin-right: 20px;
							img {
								width: 22px;
								height: 22px;
							}
						}
					}
				}
			}
		}
		.is_fixed2 {
			.fixed-top {
				/*border-bottom: 1px solid #666666;*/
			}
		}
		.is_fixed {
			position: fixed;
			top: 30px;
			left: 0;
			z-index: 999;
		}
	}
</style>
