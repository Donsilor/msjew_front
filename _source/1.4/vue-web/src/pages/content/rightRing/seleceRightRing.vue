<!-- 選擇飾品 -->

<template>
	<div class="selece-engagement">
		<div class="d-header clearfix">
			<h4 @click="back">
				{{ lang.back }}
			</h4>
			<div class="r-img">
				<div  v-if="goods.ringImg" :class="imgIndex==index?'img':''" v-for="(item,index) in goods.ringImg.split(',')"><img  :src="IMG_URL+item" @click="imgIndex=index" /></div>
			</div>
			<div class="m-img">
				<div>
					<img   v-if="goods.ringImg" :src="IMG_URL+goods.ringImg.split(',')[imgIndex]" />
				</div>
			</div>
			<div class="r-title">
				<h3>{{goods.name}}</h3>
				<p class="sku">{{ lang.goodsCode }}{{goods.ringCode}}</p>
				<div class="spec" v-if="goods.goodsModels">
					<div>
						<label v-for="item in goods.goodsModels[0].specs" v-if="item.configId==196">{{item.configAttrVal}}</label>
						<ul style="z-index: 1;" @mouseenter="specEnter" @mouseleave="specLeave">
							<li>{{goods.goodsModels && goods.goodsModels[0].materials[womanMaterialIndex].name}}</li>
							<li v-for="(item,index) in goods.goodsModels[0].materials" v-if="womanMaterialIndex!=index" @click="choseMaterial(index,0,$event)">{{item.name}}</li>
							<i class="icon iconfont">&#xe652;</i>
						</ul>
					</div>
					<div>
						<label v-for="item in goods.goodsModels[1].specs" v-if="item.configId==196">{{item.configAttrVal}}</label>
						<ul style="z-index: 1;" @mouseenter="specEnter" @mouseleave="specLeave">
							<li>{{goods.goodsModels && goods.goodsModels[1].materials[manMaterialIndex].name}}</li>
							<li v-for="(item,index) in goods.goodsModels[1].materials" v-if="manMaterialIndex!=index" @click="choseMaterial(index,1,$event)">{{item.name}}</li>
							<i class="icon iconfont">&#xe652;</i>
						</ul>
					</div>
					<div class="size-container">
						{{ lang.USEdition }}
						<div @mouseenter="showSizeBox=1" @mouseleave="showSizeBox=0">
							<div class="size-box" v-show="showSizeBox==1">
								<div>
									{{ lang.showUS }}
								</div>
								<div>
									{{ lang.showOther }}
								</div>
								<a href="/ringSize" target="_blank">{{ lang.ringNumber }}</a>
							</div>
							<b>!</b>
						</div>
						<a href="/ringSize" target="_blank">{{ lang.getRingNumber }}</a>
					</div>
					<div>
						<label>{{ lang.size }}</label>
						<ul @mouseenter="specEnter" @mouseleave="specLeave">
							<li>{{womanSizeIndex==-1?lang.pleaseChoose:(goods.goodsModels && goods.goodsModels[0].sizes[womanSizeIndex].name)}}</li>
							<li v-for="(item,index) in goods.goodsModels[0].sizes" v-if="womanSizeIndex!=index" @click="choseSize(index,0,$event)">{{item.name}}</li>
							<i class="icon iconfont">&#xe652;</i>
						</ul>
					</div>
					<div>
						<label>{{ lang.size }}</label>
						<ul @mouseenter="specEnter" @mouseleave="specLeave">
							<li>{{manSizeIndex==-1?lang.pleaseChoose:(goods.goodsModels && goods.goodsModels[1].sizes[manSizeIndex].name)}}</li>
							<li v-for="(item,index) in goods.goodsModels[1].sizes" v-if="manSizeIndex!=index" @click="choseSize(index,1,$event)">{{item.name}}</li>
							<i class="icon iconfont">&#xe652;</i>
						</ul>
					</div>
				</div>
				<ul class="four-c">
					<li v-if="goods.goodsServicesJsons" v-for="item in goods.goodsServicesJsons">
						<img :src="IMG_URL+item.img"/>
						<em>{{item.name}}</em>
					</li>
				</ul>
				<b class="price">{{goods.coinType}} {{manSizeIndex==-1 || womanSizeIndex==-1?formatMoney(goods.salePrice):(womanDetail && manDetail?formatMoney(womanDetail.retailMallPrice+manDetail.retailMallPrice):'0.00')}}</b>
				<div class="btn" v-if="goods.goodsModels && goods.goodsModels[0].goodsStatus==2 && goods.goodsModels[1].goodsStatus==2">
					<a v-if="isAdd" class="add-card" @click="addCardList">{{ lang.addCard }}</a>
					<a v-else class="add-card no-card">{{ lang.addCard }}</a>
				</div>
				<div class="btn" v-if="!goods.goodsModels || goods.goodsModels[0].goodsStatus!=2 || goods.goodsModels[1].goodsStatus!=2">
					<a class="add-card no-card">{{ lang.removed }}</a>
				</div>
				<div class="more clearfix">
					<a class="a1" @click="addWishList($route.params.id)" v-if="goods.isJoin"><i class="icon iconfont">&#xe65b;</i><span>{{ lang.wish }}</span></a>
					<a class="a1" @click="addWishList($route.params.id)" v-if="!goods.isJoin"><i class="icon iconfont">&#xe645;</i><span>{{ lang.wish }}</span></a>
					<a @click="share" class="a4"><i class="icon iconfont">&#xe655;</i></a>
				</div>
			</div>
		</div>
		<div class="m-title">
			{{ lang.recommend }}
			<!--<span>更多選擇&nbsp;》</span>-->
		</div>
		<ul class="recommend-list">
			<li class="li" v-for="(item, index) in goods.searchGoodsModels" @mouseenter="productMouseEnter" @mouseleave="productMouseLeave" @click="goSelece(item.id)">
				<div>
					<img class="img1" v-if="item.goodsImages && item.goodsImages.split(',').length>=3" :src="IMG_URL+item.goodsImages.split(',')[2]" />
					<img class="img2" :src="IMG_URL+item.goodsImages.split(',')[0]" />
					<b>{{item.coinType}} {{formatMoney(item.salePrice)}}</b>
					<p>{{item.goodsName}}</p>
					<i class="icon iconfont wish" :class="item.isJoin?'is-join':''" v-if="item.isJoin"  @click.stop="addWishList(item.id,index)">&#xe65b;</i>
					<i class="icon iconfont wish" v-if="!item.isJoin" @click.stop="addWishList(item.id,index)">&#xe645;</i>
				</div>
			</li>
		</ul>
		<menu>
			<li @click="toScroll(0)">{{ lang.goodsDetails }}</li>
			<li @click="toScroll(2)">{{ lang.customerReviews }}</li>
			<!--<li :class="anchorPoint==1?'active':''" @click="toScroll(1)">售後保障</li>-->
		</menu>
		<div class="d-footer">
			<div class="details clearfix scroll-title">
				<div class="clearfix">
					<div class="d1 d">
						<h5>{{ lang.goodsDetails }}</h5>
						<p>{{lang.goodsCode}}{{goods.ringCode}}</p>
					</div>
					<div class="d2 d">
						<p>{{ lang.ring01 }}</p>
						<ul v-if="goods.goodsModels">
							<li v-for="item in goods.goodsModels[0].specs"><span>{{item.configName}}:</span><span>{{item.configAttrName || item.configAttrVal}}</span></li>
						</ul>
					</div>
					<div class="d2 d">
						<p>{{ lang.ring02 }}</p>
						<ul v-if="goods.goodsModels">
							<li v-for="item in goods.goodsModels[1].specs"><span>{{item.configName}}:</span><span>{{item.configAttrName || item.configAttrVal}}</span></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="detilas-content" v-html="goods.ringDesc">
		</div>
		<div class="bg-foot scroll-title">
			<div>{{ lang.service }}</div>
					<ul>
						<li>- {{ lang.service1 }}</li>
						<li>- {{ lang.service2 }}</li>
						<li>- {{ lang.service3 }}</li>
						<li>- {{ lang.service4 }}</li>
						<li>- {{ lang.service5 }}</li>
						<li>- {{ lang.service6 }}</li>
					</ul>
		</div>
		<div class="scroll-title">
			<evaluate type="1"></evaluate>
		</div>
	</div>
</template>
<script>
	import Header from '@/pages/content/header.vue';
	import evaluate from '@/components/evaluate.vue';
	import { formatMoney } from '@/api/filterUtil.js';
	import { setCartList, getCartList, clearCustom, clearTwoCustom } from '@/api/cache.js';
	import { addCard, addWish } from '@/api/func.js';
	export default {
		components: {
			evaluate,
			Header
		},
		data() {
			return {
				lang: this.$LANGUAGE.rightRing.seleceRightRing,
				showSizeBox:0,
				anchorPoint: 0, //锚点索引
				imgIndex: 0, //图片索引
				pullIcon: true,
				womanSizeIndex: -1,
				manSizeIndex: -1,
				womanMaterialIndex: 0,
				manMaterialIndex: 0,
				womanDetail: null, //女戒詳情
				manDetail: null, //男戒詳情
				isAdd: false, //是否可以加入购物车
				canAddCart: true,
				goods: {
					ringImg: ''
				} //产品
			}
		},
		created() {
			this.womanSizeIndex=-1;
			this.manSizeIndex=-1;
			this.init();
		},
		watch: {
			$route() {
				this.imgIndex = 0;
			}
		},
		updated() {
			var eles = document.getElementsByClassName('detilas-content')[0].querySelectorAll('img');
			for(var i = 0; i < eles.length; i++) {
				eles[i].style.width = '100%';
				eles[i].style.display = 'block';
			}
		},
		methods: {
			formatMoney: formatMoney,
			init() {
				clearCustom();
				clearTwoCustom();
				this.$axiosPost('/web/ring/ringDetail', {
					id: this.$route.params.id
				}).then(res => {
					if(res.code === 200) {
						this.goods = res.data;
						this.searchDetail();
					} else {
						this.$message.error(res.msg);
					}
				})
			},
			//分享
			share(){
				window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(location.href), 'newWindow', 'width=1000, height=800','center')
			},
			/**
			 * 返回上一頁
			 */
			back() {
				history.back();
			},
			moreDetails(ind) {
				this.moreIndex = ind
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
			specEnter(e){
				e.target.className="spec-hover";
			},
			specLeave(e){
				e.target.className="";
			},
			/**
			 * 选择材质
			 */
			choseMaterial(index, type,e) {
				var ele = e.target.parentNode;
				ele.className="";
				if(type == 0) {
					this.womanMaterialIndex = index;
				} else {
					this.manMaterialIndex = index;
				}
				this.searchDetail();
			},
			/**
			 * 选择子圈号
			 */
			choseSize(index, type,e) {
				var ele = e.target.parentNode;
				ele.className="";
				if(type == 0) {
					this.womanSizeIndex = index;
				} else {
					this.manSizeIndex = index;
				}
				this.searchDetail();
			},
			//查看详情
			goSelece(id) {
				clearCustom();
				clearTwoCustom();
				document.documentElement.scrollTop = 0;
				let {href} = this.$router.resolve({
					path: `/seleceWedding/${id}`
				})
				window.open(href, '_blank');
			},
			/**
			 * 根据子圈号和材质匹配详情
			 */
			searchDetail() {
				this.isAdd = false;
				this.womanDetail = null;
				this.manDetail = null;
				if(this.manSizeIndex>-1 && this.womanSizeIndex>-1){
					if(this.goods.goodsModels[0].details) {
						for(var i = 0, len = this.goods.goodsModels[0].details.length; i < len; i++) {
							var detail = this.goods.goodsModels[0].details[i];
							if(detail.material == this.goods.goodsModels[0].materials[this.womanMaterialIndex].id && detail.size == this.goods.goodsModels[0].sizes[this.womanSizeIndex].id) {
								this.womanDetail = detail;
								//this.isAdd = true;
							}
						}
					}
					if(this.goods.goodsModels[1].details) {
						for(var i = 0, len = this.goods.goodsModels[1].details.length; i < len; i++) {
							var detail = this.goods.goodsModels[1].details[i];
							if(detail.material == this.goods.goodsModels[1].materials[this.manMaterialIndex].id && detail.size == this.goods.goodsModels[1].sizes[this.manSizeIndex].id) {
								this.manDetail = detail;
								//this.isAdd = true;
							}
						}
					}
					if(this.womanDetail && this.manDetail) {
						if(this.womanDetail.stock>0 && this.manDetail.stock>0){
									this.isAdd = true;
						}
					}
				}
			},
			/**
			 * 平滑滾動锚点
			 */
			toScroll(index) {
				this.anchorPoint = index;
				let jump = document.querySelectorAll(".scroll-title");
				let scrollContent = document.documentElement.scrollTop?document.documentElement:document.body;
				let total = jump[index].offsetTop - 110; //去除頂部高度
				let distance = scrollContent.scrollTop //获取需要滚动的距离
				// 平滑滚动，时长300ms，每10ms一跳，共30跳
				let step = total / 30;
				if(total > distance) {
					smoothDown();
				} else {
					let newTotal = distance - total;
					step = newTotal / 30;
					smoothUp()
				}

				function smoothDown() {
					if(distance < total) {
						distance += step;　　　　　　　
						scrollContent.scrollTop = distance;
						setTimeout(smoothDown, 10);
					} else {
						scrollContent.scrollTop = total;
					}
				}

				function smoothUp() {
					if(distance > total) {
						distance -= step;　　　　　　
						scrollContent.scrollTop = distance;
						setTimeout(smoothUp, 10);
					} else {
						scrollContent.scrollTop = total;
					}
				}
			},
			//加入购物车
			addCardList() {
				if(this.canAddCart) {
					this.canAddCart = false;
					setTimeout(() => {
						this.canAddCart = true;
					}, 1000)
					var dateStr = new Date().getTime();
					let data = [{
							goodsId: this.manDetail.goodsId,
							goodsDetailsId: this.manDetail.id,
							groupId: this.$route.params.id,
							groupType: 1,
							createTime: dateStr
						},
						{
							goodsId: this.womanDetail.goodsId,
							goodsDetailsId: this.womanDetail.id,
							groupId: this.$route.params.id,
							groupType: 1,
							createTime: dateStr
						}
					]
					addCard(1, data, data)
				}

			},
			//添加心愿单
			addWishList(val,index) {
				let data = {
					goodsId: null, //商品ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
					groupId: val //组合ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
				}
				if (index) {
					data = {
						goodsId: val, //商品ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
						groupId: null //组合ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
					}
				}
				addWish(1, 1, data)
				/*if(index>=0){
					this.goods.searchGoodsModels[index].isJoin=true;
				}else{
					this.goods.isJoin=true;
					this.goods= Object.assign({},this.goods,this.goods);
				}*/
			}
		}
	}
</script>
<style lang="less" scoped>
	.selece-engagement {
		width: 1360px;
		margin: 0 auto;
		.d-header {
			h4 {
				font-size: 12px;
				color: #666666;
				text-align: left;
				margin: 20px 0 20px;
				font-weight: normal;
				cursor: pointer;
			}
			.r-img {
				float: left;
				width: 72px;
				height: 500px;
				margin-right: 20px;
				div{
					border: 1px solid #DDDDDD;
					margin-bottom: 14px;
					width: 72px;
					height: 72px;
					border-radius: 2px;
					img {
						cursor: pointer;
						width: 100%;
						height: 100%;
					}
				}
				.img {
					border-color: #DDB1AB;
				}
			}
			.m-img {
				float: left;
				width: 500px;
				overflow: hidden;
				height: 500px;
				border: 1px solid #DDDDDD;
				img {
					width: 100%;
					height: 100%;
					display: block;
				}
			}
			.r-title {
				float: left;
				width: 740px;
				margin-left: 26px;
				.spec {
					width: 720px;
					background: #FAFAF6;
					padding-top: 15px;
					padding-bottom: 15px;
					text-align: left;
					padding-left: 25px;
					font-size: 14px;
					margin-bottom: 18px;
					color: #333333;
					>div {
						display: inline-block;
						width: 210px;
						&:nth-child(2) {
							margin-bottom:13px ;
							margin-left: 34px;
							margin-right: 14px;
						}
						&:nth-child(5) {
							margin-left: 34px;
						}
					}
					.size-container {
						color: #666666;
						font-size: 12px;
						line-height: 30px;
						>div{
							height: 30px;
							display: inline-block;
							position: relative;
						}
						b {
							width: 14px;
							height: 14px;
							background: rgba(207, 164, 141, 1);
							border-radius: 50%;
							color: white;
							display: inline-block;
							cursor: pointer;
							line-height: 14px;
							text-align: center;
							margin-left: 5px;
							margin-right: 12px;
						}
						a {
							text-decoration: underline;
							font-size: 12px;
							color: #AA8A7B;
							cursor: pointer;
						}
						.size-box {
							padding-left: 15px;
							padding-right: 15px;
							position: absolute;
							background: white;
							border: 1px solid rgba(222, 222, 222, 1);
							box-shadow: 0px 3px 6px 0px rgba(68, 68, 68, 0.17);
							width: 250px;
							top: 35px;
							left: -27px;
							padding-top: 26px;
							padding-bottom: 26px;
							z-index: 1;
							&:after {
								content: '';
								width: 0;
								height: 0;
								border-width: 0 6px 6px;
								border-style: solid;
								border-color: transparent transparent white;
								position: absolute;
								top: -6px;
								left: 32px;
								z-index: 1;
							}
							&:before {
								content: '';
								width: 0;
								z-index: 1;
								height: 0;
								border-width: 0 8px 8px;
								border-style: solid;
								border-color: transparent transparent #DDDDDD;
								position: absolute;
								top: -8px;
								left: 30px;
							}
							div {
								&:first-child {
									color: #666666;
									font-size: 12px;
									margin-bottom: 12px;
								}
								&:nth-child(2) {
									font-size: 10px;
									color: #666666;
									line-height: 17px;
									margin-bottom: 9px;
								}
							}
							a {
								font-size: 12px;
								text-decoration: underline;
								color: rgba(170, 138, 123, 1);
								cursor: pointer;
							}
						}
					}
					.spec-hover:hover{
						border-color: #AA8A7B;
						height: auto;
						i {
							transform: rotate(180deg);
							-ms-transform: rotate(180deg);
							-moz-transform: rotate(180deg);
							-webkit-transform: rotate(180deg);
						}
					}
					label {
						line-height: 30px;
						margin-right: 21px;
					}
					ul {
						cursor: pointer;
						display: inline-block;
						vertical-align: top;
						position: absolute;
						overflow: hidden;
						height: 30px;
						width: 160px;
						background: rgba(255, 255, 255, 1);
						border: 1px solid rgba(187, 187, 187, 1);
						border-radius: 4px;
						li {
							height: 28px;
							font-size: 14px;
							color: #1B1B1B;
							line-height: 28px;
							text-indent: 10px;
							i {
								color: #9D9D9D;
								margin-left: 10px;
								margin-right: 9px;
							}
							&:not(:first-child) {
								font-size: 12px;
								color: #666666;
								background: #F8F8F8;
							}
							&:not(:first-child):hover {
								background: #F6F1EE;
								color: #333333;
							}
						}
						>i {
							position: absolute;
							top: 7px;
							right: 9px;
							font-size: 10px;
							-webkit-transition: all 0.2s;
							-ms-transition: all 0.2s;
							-moz-transition: all 0.2s;
							transition: all 0.2s;
						}
					}
				}
				h3 {
					text-align: left;
					font-size: 24px;
					line-height: 30px;
					color: #333333;
					font-weight: 400;
					margin-bottom: 40px;
				}
				.sku {
					font-size: 18px;
					color: #AAAAAA;
					margin-bottom: 14px;
					text-align: left;
				}
				.four-c {
					height: 50px;
					li {
						font-size: 12px;
						color: #999999;
						line-height: 16px;
						margin-top: 8px;
						display: flex;
						justify-content: start;
						img {
							width: 16px;
							height: 16px;
							float: left;
							margin-right: 4px;
						}
					}
				}
				.price {
					display: block;
					margin: 100px 0 10px;
					font-size: 30px;
					text-align: left;
					color: #F29B87;
					font-weight: 300;
					font-family: twCenMt;
				}
				.btn {
					float: left;
					width: 100%;
					height: 40px;
					.add-card {
						float: left;
						width: 340px;
						height: 40px;
						margin-right: 20px;
						font-size: 18px;
						line-height: 40px;
						color: #FFFFFF;
						text-align: center;
						cursor: pointer;
						background: #AA8A7B;
					}
					.no-card {
						background: #DDDDDD;
						color: #AAAAAA;
					}
					.add-card-more {
						background: #ffffff;
						border: 1px solid #AA8A7B;
						color: #AA8A7B;
						margin-right: 0;
					}
				}
				.more {
					display: block;
					margin-top: 70px;
					height: 20px;
					text-align: left;
					.a1 {
						float: left;
						height: 20px;
						overflow: hidden;
						font-size: 14px;
						line-height: 20px;
						padding-right: 20px;
						cursor: pointer;
						color: #666666;
						.icon {
							color: #aaa;
							float: left;
							margin-right: 4px;
							font-size: 20px;
						}
						span {
							float: left;
						}
					}
					.a3 {
						display: inline-block;
						padding-right: 8px;
						cursor: pointer;
						height: 20px;
						float: left;
						margin-left: 168px;
						border-right: 1px dashed #D1D1D1;
						.icon {
							padding-right: 2px;
							margin-top: -10px;
							display: inline-block;
							font-size: 36px;
							color: #d1a18f;
						}
					}
					.a4 {
						cursor: pointer;
						float: left;
						margin-left: 10px;
						.icon {
							margin-top: -10px;
							display: inline-block;
							font-size: 36px;
							color: #d1a18f;
						}
					}
				}
			}
		}
		.m-title {
			margin-top: 58px;
			padding-left: 27px;
			padding-bottom: 21px;
			font-size: 26px;
			color: #1B1B1B;
			border-bottom: 1px solid #E6E6E6;
			text-align: left;
			span {
				float: right;
				font-size: 12px;
				color: #666666;
				margin-top: 10px;
				cursor: pointer;
			}
		}
		.recommend-list {
			padding-top: 30px;
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
				margin-bottom: 30px;
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
						height: 320px;
						width: 320px;
						margin-bottom: 14px;
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
						font-size: #333333;
						color: #333333;
					}
					.wish {
						position: absolute;
						top: 20px;
						left: 280px;
						font-size: 24px;
						opacity: 0;
						color: #AAAAAA;
						-webkit-transition: all 0.2s ease-in-out;
						-moz-transition: all 0.2s ease-in-out;
						-ms-transition: all 0.2s ease-in-out;
						transition: all 0.2s ease-in-out;
					}
					.material-list:hover {
						overflow: visible!important;
					}
					.material-list {
						background: white;
						z-index: 11;
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
		menu {
			text-align: center;
			clear: both;
			margin: 0;
			padding-bottom: 20px;
			li {
				display: inline-block;
				list-style: none;
				width: 202px;
				height: 19px;
				line-height: 19px;
				color: #999999;
				font-size: 16px;
				cursor: pointer;
				position: relative;
			}
			li:not(:last-child) {
				border-right: 1px solid #E8E8E8;
			}
			.active {
				color: #333333;
			}
			.active:after {
				content: '';
				height: 2px;
				background: #000000;
				width: 100%;
				position: absolute;
				left: 0px;
				bottom: -20px;
			}
		}
		.d-footer {
			display: block;
			width: 100%;
			clear: both;
			padding-top: 60px;
			border-top: 1px solid #E6E6E6;
			.details {
				.d {
					float: left;
					width: 300px;
					padding-bottom: 110px;
				}
				.d1 {
					margin-left: 30px;
					text-align: left;
					h5 {
						font-size: 26px;
						color: #333333;
						font-weight: normal;
						text-align: left;
						margin-bottom: 13px;
					}
					p {
						display: inline-block;
						width: 180px;
						height: 50px;
						font-size: 12px;
						line-height: 16px;
						color: #333333
					}
					a {
						display: block;
						font-size: 12px;
						text-decoration: underline;
						color: #AA8A7B;
						margin-top: 150px;
					}
				}
				.d2,
				.d3 {
					width: 400px;
					display: inline-block;
					margin-right: 20px;
					font-size: 12px;
					line-height: 20px;
					color: #333333;
					text-align: left;
					p {
						margin-bottom: 17px;
					}
					ul {
						li {
							cursor: pointer;
							color: #1b1b1b;
							margin-bottom: 10px;
							span {
								display: inline-block;
								width: 50%;
							}
						}
						.active {
							color: #CFA48D;
							background: #F9EAE7;
						}
					}
				}
				.d4 {
					font-size: 12px;
					line-height: 20px;
					color: #333333;
					text-align: left;
					p {
						margin-bottom: 30px;
					}
					.text {
						width: 230px;
						height: 220px;
						padding: 18px 20px;
						font-size: 14px;
						line-height: 20px;
						color: #333333;
						background: #FFF7F5;
						border: 1px solid #F9EAE7;
						border-radius: 10px;
					}
				}
			}
		}
		.detilas-content {
			text-align: left;
			margin-bottom: 60px;
			img {
				width: 100%;
				display: block;
			}
		}
		.bg-foot {
			margin-bottom: 60px;
			width: 1360px;
			height: 460px;
			text-align: left;
			background-image: url('../../../../static/images/diamond/pack.png');
			background-size: cover;
			padding-left: 89px;
			padding-top: 143px;
			div {
				font-size: 26px;
				margin-bottom: 33px;
				color: #333333;
			}
			ul {
				overflow: auto;
				width: 740px;
				li {
					width: 270px;
					height: 16px;
					font-size: 16px;
					float: left;
					margin-bottom: 16px;
					line-height: 16px;
					color: #333333;
				}
			}
		}
	}
</style>
