<!--搜索-->
<template>
	<div class="search-accessories">
		<div class="search-content">
			<h4>{{ lang.title }}</h4>
			<div v-show="!searchSimilar" class="search-area">
				<input v-model="content" :placeholder="lang.placeholder" ref="input" @keyup.enter="searchGoods(1)">
				<div class="search-btn" @click="searchGoods(1)">{{ lang.searchGoods }}</div>
			</div>
			<div v-loading="loading" class="search-list">
				<div class="sort">
					<span @click="sortShow = !sortShow">{{ lang.sortAll }}</span>
					<i v-show="!sortShow" class="icon iconfont" @click="sortShow = !sortShow">&#xe652;</i>
					<i v-show="sortShow" class="icon iconfont" @click="sortShow = !sortShow">&#xe663;</i>
					<ul v-show="sortShow" class="sort-list">
						<li :class="{active: sortIndex === 0}" @click="changeSort(0)">{{ lang.sort1 }}</li>
						<li :class="{active: sortIndex === 1}" @click="changeSort(1)">{{ lang.sort2 }}</li>
						<li :class="{active: sortIndex === 2}" @click="changeSort(2)">{{ lang.sort3 }}</li>
					</ul>
				</div>
				<ul class="list-body">
					<li v-for="(item, index) in goodsList" class="li" @click="goSelece(item.id,item.categoryId,$event)" @mouseenter="productMouseEnter" @mouseleave="productMouseLeave">
						<div>
							<img v-if="item.goodsImages && item.goodsImages.split(',').length>=3" :src="IMG_URL+item.goodsImages.split(',')[2]" class="img1">
							<img v-if="item.goodsImages" :src="IMG_URL+item.goodsImages.split(',')[0]" :alt="item.goodsName" class="img2">
							<b>{{ item.coinType }} {{ formatMoney(item.salePrice) }}</b>
							<p>{{ item.goodsName }}</p>
							<i v-if="item.isJoin" class="icon iconfont wish">&#xe651;</i>
							<i class="icon iconfont wish" :class="item.isJoin?'is-join':''" v-if="item.isJoin" @click.stop="addWishList(item.id,index)">&#xe65b;</i>
							<i class="icon iconfont wish" v-if="!item.isJoin" @click.stop="addWishList(item.id,index)">&#xe645;</i>
						</div>
					</li>
				</ul>
				<Empty v-if="page.totalCount<=0" type="4" :click="change" />
				<div v-show="page.nextPage" class="see-more">
					<div @click="curPage++,searchGoods()">{{ lang.loadingMore }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { formatMoney, removeFormatMoney, Page } from '@/api/filterUtil.js';
	import { addWish } from '@/api/func.js';
	import { clearCustom, clearTwoCustom } from '@/api/cache.js';
	import Empty from '@/components/empty.vue';

	export default {
		components: {
			Empty
		},
		data() {
			return {
				lang: this.$LANGUAGE.search.index,
				content: this.$route.params.content,
				goodsList: [],
				sortIndex: 0,
				loading: true,
				sortShow: false,
				curPage: 1,
				page: {} // 分页对象
			};
		},
		computed: {
			searchSimilar() {
				let params = this.$route.params;
				return params.goodsId && params.categoryId;
			}
		},
		watch: {
			$route: {
				handler: function(val, oldVal) {
					var content = this.$route.params.content;
					if(content != this.content && val.name != 'seleceDiamond' && val.name != 'seleceEngagement' && val.name != 'seleceJewellery' && val.name != 'seleceRightRing' && val.name != 'seleceWedding') {
						this.content = this.$route.params.content;
						this.searchGoods(1);
					}
				}
			}
		},
		created() {
			this.searchGoods(1);
		},
		methods: {
			removeFormatMoney: removeFormatMoney,
			formatMoney: formatMoney,
			change(){
				this.content="";
				this.$refs.input.focus();
			},
			/**
			 * 查看详情
			 */
			goSelece(id, categoryId, e) {
				clearCustom();
				clearTwoCustom();
				e.currentTarget.querySelectorAll('.wish')[0].style.opacity = 0;
				if(e.currentTarget.querySelectorAll('.img1').length > 0) {
					e.currentTarget.querySelectorAll('.img1')[0].style.opacity = 0;
				}
				var urlPath = '';
				if(categoryId == 1) {
					urlPath = 'seleceDiamond';
				} else if(categoryId == 2) {
					urlPath = 'seleceEngagement';
				} else {
					urlPath = 'seleceJewellery';
				}
				this.$router.push({
					name: urlPath,
					params: {
						id: id,
						key: 0
					}
				});
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
				if(type == 1) {
					this.curPage = 1;
				}
				this.$axiosGet(`web/goods/searchAllGoods`, {
					goodsId: this.$route.params.goodsId || '',
					categoryId: this.$route.params.categoryId || '',
					currPage: this.curPage,
					pageSize: 16,
					sortType: this.sortIndex + 1,
					text: this.content
				}).then(res => {
					this.loading = false;
					if(type == 1) {
						this.goodsList = [];
					}
					if(res.code === 200) {
						this.page = new Page(res.data.currPage, res.data.pageSize, res.data.totalCount);
						if(this.page.totalCount > 0) {
							for(var i = 0, len = res.data.list.length; i < len; i++) {
								this.goodsList.push(res.data.list[i]);
							}
						}
					} else {
						this.$message.error(res.msg);
					}
				});
			},
			// 添加心愿单
			addWishList(id) {
				let data = {
					goodsId: id, // 商品ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
					groupId: null // 组合ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
				};
				addWish(1, 1, data);
			},
			// 改变排序条件
			changeSort(val) {
				this.sortIndex = val;
				this.sortShow = false;
				this.searchGoods(1);
			}
		}
	};
</script>

<style lang="less" scoped="scoped">
	.search-accessories {
		h4 {
			text-align: left;
			margin: 20px 0px;
			font-weight: normal;
			color: #000000;
			font-size: 12px;
		}
		.search-area {
			margin-bottom: 52px;
			input {
				height: 32px;
				line-height: 32px;
				width: 500px;
				border: 1px solid #DDDDDD;
				text-indent: 7px;
				font-size: 14px;
				outline: none;
				&:focus {
					border-color: rgba(193, 170, 160, 1);
				}
			}
			.search-btn {
				display: inline-block;
				width: 125px;
				height: 32px;
				background: rgba(193, 170, 160, 1);
				line-height: 32px;
				font-size: 14px;
				color: white;
				margin-left: 18px;
				cursor: pointer;
			}
		}
		.search-content {
			width: 1360px;
			margin: 0 auto;
			.search-top {
				.search {
					float: left;
					width: 100%;
					label {
						float: left;
						font-size: 18px;
						line-height: 100px;
						padding: 0 34px 0 10px;
						color: #333333;
					}
					li {
						cursor: pointer;
						float: left;
						width: 100px;
						height: 100px;
						border-radius: 4px;
						margin-right: 20px;
						border: 1px solid #FFFFFF;
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
				.material {
					float: left;
					width: 800px;
					margin-top: 30px;
					label {
						float: left;
						font-size: 18px;
						line-height: 100px;
						padding: 0 34px 0 10px;
						color: #333333;
					}
					li {
						cursor: pointer;
						float: left;
						width: 80px;
						height: 110px;
						border-radius: 4px;
						margin-right: 20px;
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
				}
				.fast {
					margin-top: 12px;
					text-align: left;
					span {
						display: inline-block;
						width: 85px;
						height: 24px;
						margin: 0 10px 0 0;
						color: #333333;
						font-size: 12px;
						line-height: 24px;
						padding: 0 10px;
						background: #F8F8F8;
						border: 1px solid #EBEBEB;
					}
					.span {
						background: #FEF8F9;
						border: 1px solid #CFABB4;
					}
				}
			}
			.search-list {
				h4 {
					font-size: 24px;
					line-height: 24px;
					color: #111111;
					font-weight: 400;
					margin: 60px 0 10px;
				}
				p {
					font-size: 12px;
					color: #111111;
					margin-bottom: 24px;
				}
				.list-body {
					margin-bottom: 32px;
					overflow: hidden;
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
								/*font-size: #333333;*/
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
								overflow: visible !important;
							}
						}
					}
				}
				.sort {
					cursor: pointer;
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
					}
					.icon {
						font-size: 12px;
						cursor: pointer;
					}
					.sort-list {
						position: absolute;
						top: 32px;
						left: -96px;
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