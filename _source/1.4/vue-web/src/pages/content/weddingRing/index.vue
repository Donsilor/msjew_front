<template>
	<div class="wedding-accessories">
		<div class="wedding-content">
			<div class="wedding-top clearfix">
				<div class="search">
					<label class="title">{{ lang.title1 }}</label>
					<ul>
						<li v-for="(item, index) in weddingRing[1].list" :class="{active:wemenIndex == item.id}" @click="wemenSearch(item.id)">
							<i class="icon iconfont" v-html="item.icon"></i>
							<span>{{item.name}}</span>
						</li>
					</ul>
				</div>

				<div class="custom">
					<label class="title">{{ lang.title2 }}</label>
					<ul>
						<li v-for="(item, index) in weddingRing[2].list" :class="{active:menIndex == item.id}" @click="menSearch(item.id)">
							<i class="icon iconfont" v-html="item.icon"></i>
							<span>{{item.name}}</span>
						</li>
					</ul>
				</div>

				<div class="material">
					<label class="title">{{ lang.material }}</label>
					<ul>
						<li :class="{active:materialIndex == -1}" @click="changeMaterial(-1)">
							<i><img src="../../../../static/images/jewelleryAccessories/material-all.png" /></i>
							<span>{{ lang.materials }}</span>
						</li>
						<li v-for="(item, index) in weddingRing[3].list" :class="{active:materialIndex == item.id}" @click="changeMaterial(item.id)" v-if="index<6">
							<i class="icon iconfont">&#xe63d;</i>
							<span>{{item.name}}</span>
							<p>{{item.text}}</p>
						</li>
					</ul>
				</div>

				<div class="price">
					<label class="title">{{ lang.price }}</label>
					<div class="content">
						<div class="range">
							<div>
								<i>{{coin}}</i><input class="start" @blur="inpPriceBlur" @focus="inpPriceFocus" @change="inpPrice" v-model="priceMin" />
							</div>
							<span>{{ lang.to }}</span>
							<div>
								<i>{{coin}}</i><input class="end" type="tel" step="0.01" :min="priceRang[0]" :max="priceRang[1]" @blur="inpPriceBlur" @focus="inpPriceFocus" @change="inpPrice" v-model="priceMax" />
							</div>
						</div>
						<el-slider v-model="priceRang" range :min="searchPrice.minPrice" :max="searchPrice.maxPrice" @change="priceRangChange">
						</el-slider>
						<div class="fast">
							<span @click="priceSelcetFast('1',searchPrice.step1,searchPrice.step2)">{{formatMoney(searchPrice.step1,0)+'-'+formatMoney(searchPrice.step2,0)}}</span>
							<span @click="priceSelcetFast('2',searchPrice.step2,searchPrice.step3)">{{formatMoney(searchPrice.step2,0)+'-'+formatMoney(searchPrice.step3,0)}}</span>
							<span @click="priceSelcetFast('3',searchPrice.step3,searchPrice.step4)">{{formatMoney(searchPrice.step3,0)+'-'+formatMoney(searchPrice.step4,0)}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="m-title">
				<h5>{{ lang.totalCount1 }}  ({{page.totalCount}}  {{ lang.totalCount2 }})</h5>
				<p class="font-size-12" v-if="wemenIndex==-1 && menIndex==-1">{{ lang.defaultDesc }}</p>
				<p class="font-size-12" v-for="(item, index) in weddingRing[1].list" v-if="wemenIndex == item.id">{{item.desc}}</p>
				<p class="font-size-12" v-for="(item, index) in weddingRing[2].list" v-if="menIndex == item.id">{{item.desc}}</p>
			</div>
			<div class="wedding-list" v-loading="loading">
				<div class="sort">
					<span @click="sortShow = !sortShow">{{ lang.sortAll }}</span>
					<i @click="sortShow = !sortShow" v-show="!sortShow" class="icon iconfont">&#xe652;</i>
					<i @click="sortShow = !sortShow" v-show="sortShow" class="icon iconfont">&#xe663;</i>
					<ul class="sort-list" v-show="sortShow">
						<li :class="{active: sortIndex === 0}" @click="changeSort(0)">{{ lang.sort1 }}</li>
						<li :class="{active: sortIndex === 1}" @click="changeSort(1)">{{ lang.sort2 }}</li>
						<li :class="{active: sortIndex === 2}" @click="changeSort(2)">{{ lang.sort3 }}</li>
					</ul>
				</div>
				<ul class="list-body">
					<li class="li" v-for="(item, index) in goodsList" v-if="item.categoryId>0" @click="goSelece(item.id,$event)" @mouseenter="productMouseEnter" @mouseleave="productMouseLeave">
						<div>
							<img class="img1" v-if="item.goodsImages && item.goodsImages.split(',').length>=3" :src="IMG_URL+item.goodsImages.split(',')[2]" />
							<img class="img2" :src="IMG_URL+item.goodsImages.split(',')[0]" :alt="item.goodsName" />
							<b>{{item.coinType}} {{formatMoney(item.salePrice)}}</b>
							<p class="p">{{item.goodsName}}</p>
							<i class="icon iconfont wish" :class="item.isJoin?'is-join':''" v-if="item.isJoin" @click.stop="addWishList(item.id,index)">&#xe65b;</i>
							<i class="icon iconfont wish" v-if="!item.isJoin" @click.stop="addWishList(item.id,index)">&#xe645;</i>
						</div>
					</li>
					<li class="advert" v-else>
						<img :src="IMG_URL+(item.advertImgModelList && item.advertImgModelList[0].image?item.advertImgModelList[0].image.split(',')[0]:item.dsImg)" @click="openAddress(item.advertImgModelList?item.advertImgModelList[0].addres:'', item.tdOpenType)" />
					</li>
				</ul>
				<Empty type="0" v-if="page.totalCount<=0"></Empty>
				<div class="see-more" v-show="page.nextPage">
					<div @click="paramsData.currPage++,searchGoods(1)">{{ lang.loadingMore }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { formatMoney, removeFormatMoney, Page } from '@/api/filterUtil.js';
	import { addWish } from '@/api/func.js';
	import Empty from '@/components/empty.vue';
	import { clearCustom, clearTwoCustom } from '@/api/cache.js';
	export default {
		components: {
			Empty
		},
		data() {
			return {
				lang: this.$LANGUAGE.weddingRing.index,
				weddingRing: this.$LANGUAGE.weddingRing.index.weddingRing,
				loading: true,
				coin: localStorage.getItem('coin') || 'HKD',
				list: this.$LANGUAGE.engagementRing.index.jewelleryAccessories[3],
				status: '1',
				wemenIndex: '-1',
				menIndex: '-1',
				materialIndex: -1,
				cusomIndex: 1,
				priceRang: [200, 50000],
				priceMin: this.formatMoney(200),
				priceMax: this.formatMoney(50000),
				searchPrice: {},
				sortShow: false,
				sortIndex: null,
				goodsList: [],
				paramsData: { //请求参数
					advertType: 2,
					categoryId: 2, //商品类别ID ,
					currPage: 1, //当前页面 ,
					orderParam: null, //排序字段名 ,
					orderType: null, //排序类型（1:升 2:降） ,
					pageSize: 13, //每页显示数量 ,
					params: [] //参数数组
				},
				page: {} //分页对象
			}
		},
		created() {
			this.init()
		},
		updated() {
			var imgs = document.getElementsByClassName('advert');
			for(var i = 0, len = imgs.length; i < len; i++) {
				if(i % 2 == 0) {
					imgs[i].style.width = '25%';
				} else {
					imgs[i].style.width = '50%';
				}
			}
		},
		watch: {
			$route: {
				handler: function(val, oldVal) {
					if(val.name != 'seleceWedding' && val.name != 'custom') {
						this.init();
					}
				}
			}
		},
		methods: {
			removeFormatMoney: removeFormatMoney,
			formatMoney: formatMoney,
			openAddress(ind, type) {
				let openType = type == 1? "_blank" : "_parent";
				if(ind && ind != '' ) {
					window.open(ind.indexOf('http') == -1 ? 'http://' + ind : ind,openType)
				}
			},
			inpPriceFocus(e) {
				if(e.currentTarget.className === 'start') {
					this.priceMin = this.removeFormatMoney(this.priceMin);
				} else {
					this.priceMax = this.removeFormatMoney(this.priceMax);
				}
			},
			inpPriceBlur(e) {
				if(e.currentTarget.className === 'start') {
					this.priceMin = this.formatMoney(this.priceMin)
				} else {
					this.priceMax = this.formatMoney(this.priceMax)
				}
			},
			init() {
				clearCustom();
				clearTwoCustom();
				let key = this.$route.params.key;
				let id = this.$route.params.id;
				if(this.paramsKey != key || this.paramsId != id) {
					this.paramsKey = key;
					this.paramsId = id;
					this.wemenIndex = -1;
					this.menIndex = -1;
					if(key == '2') {
						this.wemenIndex = id
					} else if(key == '3') {
						this.menIndex = id
					} else if(key == '4') {
						this.materialIndex = id
					}
					this.$axiosGet('/web/goods/getSearchPrice', {}).then(res => {
						if(res.code === 200) {
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
					})
				}
			},
			//選擇女士戒指
			wemenSearch(val) {
				this.wemenIndex = this.wemenIndex == val ? -1 : val;
				this.menIndex = '-1'
				this.searchGoods();
			},
			//選擇男士戒指
			menSearch(val) {
				this.menIndex = this.menIndex == val ? -1 : val;
				this.wemenIndex = '-1';
				this.searchGoods();
			},
			//選擇材质
			changeMaterial(val) {
				this.materialIndex = val
				this.searchGoods();
			},
			inpPrice() {
				this.priceMax.toString().indexOf(',') > -1 & (this.priceMax = this.removeFormatMoney(this.priceMax));
				this.priceMin.toString().indexOf(',') > -1 & (this.priceMin = this.removeFormatMoney(this.priceMin));
				this.priceMax = this.priceMax > this.searchPrice.maxPrice ? this.searchPrice.maxPrice : this.priceMax
				this.priceMin = this.priceMin > this.searchPrice.maxPrice ? this.searchPrice.maxPrice : this.priceMin
				this.priceMax = this.priceMax < this.searchPrice.minPrice ? this.searchPrice.minPrice : this.priceMax
				this.priceMin = this.priceMin < this.searchPrice.minPrice ? this.searchPrice.minPrice : this.priceMin
				if(this.priceMin > this.priceMax) {
					let taps = this.priceMin;
					this.priceMin = this.priceMax
					this.priceMax = taps
				}
				this.priceRang = [parseInt(this.priceMin), parseInt(this.priceMax)]
				this.priceMin = this.formatMoney(this.priceMin)
				this.priceMax = this.formatMoney(this.priceMax)
				this.searchGoods();
			},
			//滑块价格发生改变
			priceRangChange() {
				this.priceMax = this.formatMoney(this.priceRang[1])
				this.priceMin = this.formatMoney(this.priceRang[0])
				this.searchGoods();
			},
			//快速选择价格
			priceSelcetFast(val, k1, k2) {
				this.priceFast = val
				this.priceMin = this.formatMoney(k1);
				this.priceMax = this.formatMoney(k2);
				this.priceRang = [k1, k2]
				this.searchGoods();
			},
			changeStatus(type) {
				this.status = type
			},
			//goSelece
			goSelece(id, e) {
				e.currentTarget.querySelectorAll('.wish')[0].style.opacity = 0;
				if(e.currentTarget.querySelectorAll('.img1').length > 0) {
					e.currentTarget.querySelectorAll('.img1')[0].style.opacity = 0;
				}
				this.$router.push({
					name: 'seleceWedding',
					params: {
						id: id,
						key: this.menIndex
					},
				})
			},
			/**
			 * 鼠標進入商品
			 */
			productMouseEnter(e) {
				e.currentTarget.querySelectorAll('.wish')[0].style.opacity = 1;
				if(e.currentTarget.querySelectorAll('.img1').length > 0) {
					e.currentTarget.querySelectorAll('.img1')[0].style.opacity = 1;
				}
			},
			/**
			 * 鼠標離開商品
			 */
			productMouseLeave(e) {
				e.currentTarget.querySelectorAll('.wish')[0].style.opacity = 0;
				if(e.currentTarget.querySelectorAll('.img1').length > 0) {
					e.currentTarget.querySelectorAll('.img1')[0].style.opacity = 0;
				}
			},
			/**
			 * 查詢商品列表
			 */
			searchGoods(type) {
				this.loading = true;
				if(type != 1) { //清空列表
					this.paramsData.currPage = 1;
				}
				this.paramsData.params = [];
				this.paramsData.params.push({ //价格区间
					type: 1,
					paramName: 'sale_price',
					valueType: 2,
					beginValue: this.removeFormatMoney(this.priceMin),
					endValue: this.removeFormatMoney(this.priceMax)
				});
				if(this.wemenIndex > -1) { //女款
					this.paramsData.params.push({
						type: 2,
						paramName: 'marry_style_wom',
						valueType: 1,
						configValues: [this.wemenIndex]
					});
				}
				if(this.menIndex > -1) { //男款
					this.paramsData.params.push({
						type: 2,
						paramName: 'marry_style_man',
						valueType: 1,
						configValues: [this.menIndex]
					});
				}
				if(this.menIndex == -1 && this.wemenIndex == -1) {
					this.paramsData.params.push({
						type: 2,
						paramName: 'engaged_style',
						valueType: 1,
						configValues: [-2]
					});
				}

				if(this.materialIndex > -1) { //材质
					this.paramsData.params.push({
						type: 3,
						paramName: 'material',
						valueType: 1,
						configValues: [this.materialIndex]
					})
				}
				if(this.sortIndex == 0) { //最畅销
					this.paramsData.orderParam = 'sale_volume';
					this.paramsData.orderType = 2;
				} else if(this.sortIndex > 0) { //价格
					this.paramsData.orderParam = 'sale_price';
					this.paramsData.orderType = this.sortIndex;
				}
				this.$postJsonRequest(`web/goods/searchGoods`, this.paramsData).then(res => {
					if(type != 1) { //清空列表
						this.goodsList = [];
					}
					this.loading = false;
					if(res.data.code === 200) {
						this.page = new Page(res.data.data.currPage, res.data.data.pageSize, res.data.data.totalCount);
						if(this.page.totalCount > 0) {
							for(var i = 0, len = res.data.data.list.length; i < len; i++) {
								this.goodsList.push(res.data.data.list[i]);
							};
						}
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},
			//添加心愿单
			addWishList(id, index) {
				let data = {
					goodsId: id, //商品ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
					groupId: null //组合ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
				}
				addWish(1, 1, data);
				/*this.goodsList[index].isJoin=true;*/
			},
			//改变排序条件
			changeSort(val) {
				this.sortIndex = val;
				this.sortShow = false;
				this.searchGoods();
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.wedding-accessories {
		.wedding-content {
			width: 1360px;
			margin: 0 auto;
			padding-top: 40px;
			.wedding-top {
				.search,
				.custom {
					float: left;
					width: 730px;
					label {
						float: left;
						font-size: 18px;
						line-height: 100px;
						padding: 0 30px 0 10px;
						color: #333333;
					}
					li {
						float: left;
						width: 106px;
						min-height: 106px;
						border-radius: 4px;
						margin-right: 14px;
						cursor: pointer;
						.icon {
							display: block;
							font-size: 60px;
							margin-bottom: -4px;
						}
						span {
							font-size: 14px;
							color: #333333;
						}
						&:hover {
							background: #F8F8F8;
						}
					}
					.active {
						border: 1px solid #B97E8C;
						box-shadow: 0 2px 3px #e8c7ce;
					}
				}
				.custom {
					float: left;
					width: 600px;
				}
				.material {
					float: left;
					width: 800px;
					margin-top: 30px;
					label {
						float: left;
						font-size: 18px;
						line-height: 100px;
						padding: 0 30px 0 10px;
						color: #333333;
					}
					li {
						cursor: pointer;
						float: left;
						width: 86px;
						height: 110px;
						border-radius: 4px;
						margin-right: 14px;
						border: 1px solid #ffffff;
						&:hover {
							background: #F8F8F8;
						}
						.icon {
							display: block;
							font-size: 44px;
							margin: 14px;
						}
						span {
							font-size: 12px;
							color: #333333;
						}
						img {
							width: 44px;
							height: 44px;
							margin: 14px 18px;
						}
					}
					li:nth-child(2) {
						.icon {
							color: #b7b7b7;
						}
					}
					li:nth-child(3) {
						.icon {
							color: #b7b7b7;
						}
					}
					li:nth-child(4) {
						.icon {
							color: #cfb255;
						}
					}
					li:nth-child(5) {
						.icon {
							color: #d9bd63;
						}
					}
					li:nth-child(6) {
						.icon {
							color: #cfdad9;
						}
					}
					li:nth-child(7) {
						.icon {
							color: #ffb496;
						}
					}
					.active {
						border: 1px solid #B97E8C;
						box-shadow: 0 2px 3px #e8c7ce;
					}
				}
				.price {
					float: left;
					width: 500px;
					margin-top: 50px;
					label {
						float: left;
						font-size: 18px;
						line-height: 100px;
						padding: 0 34px 0 10px;
						color: #333333;
					}
					.content {
						float: left;
						width: 400px;
						height: 100px;
						text-align: left;
					}
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
				.fast {
					margin-top: 12px;
					text-align: left;
					span {
						display: inline-block;
						width: 120px;
						height: 24px;
						margin: 0 7px 0 0;
						cursor: pointer;
						color: #333333;
						font-size: 12px;
						line-height: 24px;
						text-align: center;
						background: #F8F8F8;
						border: 1px solid #EBEBEB;
						transition: all 0.2s;
						&:hover {
							border-color: #CFABB4;
							background: #FEF8F9;
							color: #666666;
						}
					}
				}
			}
			.m-title {
				h5 {
					margin: 50px 0 20px;
					font-size: 24px;
					font-weight: 400;
					color: #333333;
				}
			}
			.wedding-list {
				.list-body {
					border-top: 1px solid #F4F2F3;
					margin-bottom: 32px;
					padding-top: 10px;
					overflow: hidden;
					.li {
						width: 25%!important;
					}
					.advert {
						height: 480px;
						position: relative;
						float: left;
						height: 480px;
						overflow: hidden;
						cursor: pointer;
						border: 10px solid white;
						img {
							display: block;
							width: 100%;
							min-height: 100%;
						}
					}
					.li {
						position: relative;
						float: left;
						width: 25%;
						height: 480px;
						cursor: pointer;
						border: 10px solid white;
						-webkit-transition: all 0.2s ease-in-out;
						-moz-transition: all 0.2s ease-in-out;
						-ms-transition: all 0.2s ease-in-out;
						transition: all 0.2s ease-in-out;
						&:hover {
							border-color: #F8F8F8;
						}
						div {
							.img1 {
								opacity: 0;
								position: absolute;
								top: 0;
								left: 0;
								width: 320px;
								height: 320px;
								-webkit-transition: all 0.2s ease-in-out;
								-moz-transition: all 0.2s ease-in-out;
								-ms-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
							}
							.img2 {
								width: 320px;
								height: 320px;
								display: block;
								-webkit-transition: all 0.2s ease-in-out;
								-moz-transition: all 0.2s ease-in-out;
								-ms-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
							}
							b {
								color: #F29B87;
								font-size: 24px;
								line-height: 40px;
								font-weight: 300;
								font-family: twCenMt;
							}
							.p {
								font-size: 14px;
								line-height: 22px;
								color: #333333;
							}
							.wish {
								color: #AAAAAA;
								position: absolute;
								top: 20px;
								left: 280px;
								font-size: 24px;
								opacity: 0;
								-webkit-transition: all 0.2s ease-in-out;
								-moz-transition: all 0.2s ease-in-out;
								-ms-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
							}
							.material-list:hover {
								overflow: visible!important;
							}
							.material-list {
								position: absolute;
								width: 120px;
								top: 400px;
								left: 10px;
								height: 24px;
								overflow: hidden;
								opacity: 0;
								-webkit-transition: all 0.2s ease-in-out;
								-moz-transition: all 0.2s ease-in-out;
								-ms-transition: all 0.2s ease-in-out;
								transition: all 0.2s ease-in-out;
								.list-icon {
									float: right;
									font-size: 14px;
									line-height: 28px;
									color: #999999;
									margin-right: 6px;
								}
								li {
									div>div:hover {
										background: #FAF5F1;
										span {
											color: #333333;
										}
									}
									.icon {
										margin: 0 6px 0 16px;
									}
									span {
										font-size: 12px;
										color: #999999;
									}
									div>div {
										height: 24px;
										line-height: 24px;
										text-align: left;
										background: #ffffff;
									}
								}
								li:nth-child(2) {
									.icon {
										color: #b7b7b7;
									}
								}
								li:nth-child(3) {
									.icon {
										color: #b7b7b7;
									}
								}
								li:nth-child(4) {
									.icon {
										color: #cfb255;
									}
								}
								li:nth-child(5) {
									.icon {
										color: #d9bd63;
									}
								}
								li:nth-child(6) {
									.icon {
										color: #cfdad9;
									}
								}
								li:nth-child(7) {
									.icon {
										color: #ffb496;
									}
								}
							}
						}
					}
				}
				.sort {
					position: relative;
					width: 80px;
					margin-left: 1280px;
					text-align: right;
					font-size: 14px;
					line-height: 34px;
					border-bottom: 1px solid #F09B9B;
					color: #F09B9B;
					span {
						padding-right: 10px;
						cursor: pointer;
					}
					.icon {
						font-size: 12px;
						cursor: pointer;
					}
					.sort-list {
						position: absolute;
						top: 32px;
						left: -90px;
						width: 182px;
						height: 96px;
						text-align: right;
						background: #ffffff;
						z-index: 10;
						li {
							width: 100%;
							height: 32px;
							padding-left: 10px;
							font-size: 14px;
							line-height: 32px;
							color: #636363;
							cursor: pointer;
						}
						.active {
							background: #F4DAD3;
							color: #FFFFFF;
						}
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
		}
	}
</style>
