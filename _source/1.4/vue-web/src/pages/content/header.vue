<template>
	<div class="select-header">
		<!-- 购物 -->
		<div class="spot clearfix">
			<div class="btn stop1" :class="[{stopActive:step1},{stop3:step2},{lookstep21:lookstep2},{lookstep11:lookstep1}]">
				<div class="title">
					<span class="num">1</span>
					<div>
						<span>{{ lang.select }}</span>
						<h4 v-if="!step1">{{title}}</h4>
						<h4 v-if="step1"> {{firstdata && getTitle(firstdata.categoryId)}}</h4>
					</div>
				</div>
				<div class="details">
					<div v-if="step1">
						<span>{{coinType}} {{firstdata && formatMoney(firstdata.retailMallPrice)}}</span>
						<div>
							<a @click="lookMore(111)">{{ lang.look }}</a>
							<a @click="removeMore(1)">{{ lang.remove }}</a>
						</div>
					</div>
					<div class="icon-div">
						<i v-if="!step1" class="icon iconfont" v-html="icon"></i>
						<i v-if="step1" class="icon iconfont"  v-html="getIcon(firstdata.categoryId)"></i>
					</div>
				</div>
				<img class="img" :src="imgUrl1" />
			</div>
			<div class="btn stop2" :class="[{stopActive2:step1&&!step2},{stopActive3:step1&&step2},{lookstep22:lookstep2},,{lookstep12:lookstep1}]">
				<div class="title">
					<span class="num">2</span>
					<div>
						<span>{{ lang.select }}</span>
						<h4 v-if="!step2 && !step1 && typeId != 1">{{ lang.diamond }}</h4>
						<h4 v-if="!step2 && !step1 && typeId == 1">{{ lang.mosaic }}</h4>
						<h4 v-if="!step2 && step1">{{title}}</h4>
						<h4 v-if="step2"> {{twodata && getTitle(twodata.categoryId)}}</h4>
					</div>
				</div>
				<div class="details">
					<div v-if="step2" class="action">
						<span>{{coinType}} {{twodata && formatMoney(twodata.retailMallPrice)}}</span>
						<div>
							<a @click="lookMore(222)">{{ lang.look }}</a>
							<a @click="removeMore(2)">{{ lang.remove }}</a>
						</div>
					</div>
					<div class="icon-div">
						<i v-if="!step2 && !step1 && typeId != 1" class="icon iconfont">&#xe644;</i>
						<i v-if="!step2 && !step1 && typeId == 1" class="icon iconfont">&#xe621;</i>
						<i v-if="!step2 && step1" class="icon iconfont"  v-html="icon"></i>
						<i v-if="step2" class="icon iconfont" v-html="getIcon(twodata.categoryId)"></i>
					</div>
				</div>
				<img class="img" :src="imgUrl2" />
			</div>
			<div class="btn stop3" :class="[{stopActive2:step1&&step2},{lookstep23:lookstep2},{lookstep13:lookstep1&&step1&&step2}]">
				<div class="title">
					<span class="num">3</span>
					<div>
						<span>{{ lang.review }}</span>
						<h4>{{ lang.custom }}</h4>
					</div>
				</div>
				<div class="details">
					<div >
						
					</div>
					<div class="icon-div"><i class="icon iconfont">&#xe618;</i></div>
				</div>
			 </div>
		</div>
	</div>
</template>

<script>
import { getCustom, clearCustom, setCustom, setTwoCustom, getTwoCustom, clearTwoCustom } from '@/api/cache.js';
import { formatMoney } from '@/api/filterUtil.js';
export default {
	data () {
		return {
			lang: this.$LANGUAGE.custom.header,
			lang2: this.$LANGUAGE.custom,
			status: '1',
			activeIndex: 1,
			firstdata: null,
			twodata: null,
			step1: false,
			step2: false,
			coinType: localStorage.getItem('coin') || 'HKD',
			imgUrl1: require('../../../static/images/header/step1-1.png'),
			imgUrl2: require('../../../static/images/header/step2-1.png'),
			lookstep1: false,
			lookstep2: false
		}
	},
	props: {
	  title: {
		type: [String],
		default: function () {
		  return ''
		}
	  },
	  icon: {
	  		type: [String],
	  		default: function () {
	  		  return ''
	  		}
	  },
	  typeId: {
	  		type: [String],
	  		default: function () {
	  		  return ''
	  		}
	  }
	},
	created() {
		this.info()
	},
	watch: {
		$route() {
			this.info()
		}
	},
		
	methods: {
		formatMoney: formatMoney,
		changeStatus (type) {
			this.status = type
		},
		info () {
			this.step1= false;
			this.step2= false;
			this.lookstep1= false;
			this.lookstep2= false;
			let firstInfo = getCustom()
			let twoInfo = getTwoCustom()
			if(firstInfo) {
				this.step1 = true,
				this.activeIndex = 2,
				this.firstdata = firstInfo
			} else {
				this.step1 = false,
				this.firstdata = null
			}
			if(twoInfo) {
				this.step2 = true,
				this.activeIndex = 3,
				this.twodata = twoInfo
			} else {
				this.step2 = false,
				this.twodata = null
			}
			if (this.step1 && !this.step2) {
				this.imgUrl1 = require('../../../static/images/header/step1-2.png')
				this.imgUrl2 = require('../../../static/images/header/step1-1.png')
			} else if (this.step1 && this.step2) {
				this.imgUrl1 = require('../../../static/images/header/step1-3.png')
				this.imgUrl2 = require('../../../static/images/header/step1-2.png')
			} else {
				this.imgUrl1 = require('../../../static/images/header/step1-1.png')
				this.imgUrl2 = require('../../../static/images/header/step2-1.png')
			}
			
			if (this.$route.params.key == 'look2') {
				this.lookstep2 = true
				this.lookstep1 = false
				this.imgUrl1 = require('../../../static/images/header/step1-2.png')
				this.imgUrl2 = require('../../../static/images/header/step2-2.png')
				
			} else if (this.$route.params.key == 'look1') {
				this.lookstep1 = true
				this.lookstep2 = false
				this.imgUrl1 = require('../../../static/images/header/step2-2.png')
				this.imgUrl2 = require('../../../static/images/header/step1-3.png')
			}
			
			if (this.$route.params.key == 'look2' && !this.step1 && !this.step2 ) {
				this.imgUrl1 = require('../../../static/images/header/step1-2.png')
				this.imgUrl2 = require('../../../static/images/header/step2-2.png')
				
			} else if (this.$route.params.key == 'look1' && !this.step1 && !this.step2 ) {
				
				this.imgUrl1 = require('../../../static/images/header/step1-1.png')
				this.imgUrl2 = require('../../../static/images/header/step2-1.png')
			}
			
		},
		getTitle (ind) {
			switch (ind) {
				case 1:
					return this.lang2.title1
				break;
				case 2:
					return this.lang2.title2
				break;
				case 4:
					return this.lang2.title4
				break;
				case 5:
					return this.lang2.title5
				break;
				case 6:
					return this.lang2.title6
				break;
				case 7:
					return this.lang2.title7
				break;
				case 8:
					return this.lang2.title8
				break;
				case 9:
					return this.lang2.title9
				break;
				default:
					return this.lang2.title0
			}
		},
		getIcon (ind) {
			switch (ind) {
				case 1:
					return '&#xe644;'
				break;
				case 2:
					return '&#xe621;'
				break;
				case 4:
					return '&#xe62c;'
				break;
				case 5:
					return '&#xe612;'
				break;
				case 6:
					return '&#xe631;'
				break;
				case 7:
					return '&#xe614;'
				break;
				case 8:
					return '&#xe61f;'
				break;
				case 9:
					return '&#xe668;'
				break;
				default:
					return '&#xe644;'
			}
		},
		lookMore(step) {
			let typeId = step === 111 ? this.firstdata.categoryId:this.twodata.categoryId;
			let id = step === 111 ? this.firstdata.goodsId:this.twodata.goodsId;
			let name = null;
			let key = null;
			if (this.step1 && !this.step2) {
				clearCustom();
				this.info();
			}
			if(step === 111) {
				key = 'look1'
			} else if(step === 222) {
				key = 'look2'
			}
			switch(typeId){
				case 1:
				  name = 'seleceDiamond';
				  break;
				case 2:
				  name = 'seleceEngagement';
				  break;
				default:
				  name = 'seleceJewellery'
				}
			this.$router.push({
				name: name,
				params: {
					id: id,
					key: key,
				},
				
			})
		},
		
		removeMore(step) {
			if (step == 1) {
				let firstInfo = getTwoCustom()
				if (firstInfo) {
					setCustom(firstInfo)
					clearTwoCustom()
				} else {
					clearCustom()
				}
				let name = '';
				let id = '';
				let key = '';
				switch(this.firstdata.categoryId){
					case 1:
					  name = 'diamond';
					  key = 1;
					  id = 1;
					  break;
					case 2:
					  name = 'engagementRing';
					  key = 1;
					  id = 0;
					  break;
					case 4:
					  name = 'jewelleryAccessories';
					  key = 2;
					  id = 206;
					  break;
					case 8:
					  name = 'jewelleryAccessories';
					  key = 2;
					  id = 210;
					break;
					default:
					  name = 'jewelleryAccessories';
					  key = 1;
					  id = 206;
					}
				this.$router.push({
					name: name,
					params: {
						id: id,
						key: key
					},
				})
				
			}
			if (step == 2) {
				clearTwoCustom()
				let name = '';
				let id = '';
				let key = '';
				switch(this.twodata.categoryId){
					case 1:
					  name = 'diamond';
					  key = 1;
					  id = 1;
					  break;
					case 2:
					  name = 'engagementRing';
					  key = 1;
					  id = 0;
					  break;
					case 4:
					  name = 'jewelleryAccessories';
					  key = 2;
					  id = 206;
					  break;
					case 8:
					  name = 'jewelleryAccessories';
					  key = 2;
					  id = 210;
					break;
					default:
					  name = 'jewelleryAccessories';
					  key = 1;
					  id = 206;
					}
				this.$router.push({
					name: name,
					params: {
						id: id,
						key: key
					},
				})
			}
			this.info()
		}
	}
}
</script>

<style lang="less">
.select-header{
	.spot{
	    width: 1360px;
	    height: 90px;
		margin: 0 auto;
		.btn{
			position: relative;
			float: left;
			width: 465px;
		    height: 80px;
			border: 1px solid #DDDDDD;
			text-align: left;
			background: #F9F9F9;
			padding-left: 30px;
			.title {
				float: left;
				width: 150px;
				height: 80px;
				margin: 0;
				padding: 18px 0 0 24px;
				.num {
					color: #666666;
					font-size: 44px;
					font-family: twCenMt;
				}
				div {
					display: inline-block;
					margin: 0;
					span {
						font-size: 14px;
						line-height: 16px;
						color: #666666;
					}
					h4 {
						font-size: 22px;
						font-weight: 400;
						color: #666666;
					}
				}
			}
			.details {
				float: right;
				width: 240px;
				height: 82px;
				margin: 0 10px 0 0;
				padding-top: 18px;
				text-align: left;
				div {
					float: right;
					span {
						display: block;
						font-size: 16px;
						line-height: 26px;
						color: #333333;
						font-family: twCenMt;
					}
					div {
						width: 100%;
						a {
							font-size: 14px;
							color: #7f7e7d;
							text-decoration: underline;
							cursor: pointer;
							&:first-child {
								color: #ddb1aa;
								margin-right: 5px;
							}
						}
						
					}
				}
				.icon-div {
					width: 40px;
					height: 40px;
					margin: 4px 10px 0 0;
					text-align: center;
					background: #d1d1d1;
					border-radius: 20px;
					.iconfont {
						font-size: 24px;
						color: #FFFFFF;
						line-height: 40px;
					}
				}
			}
			.img {
				position: absolute;
				top: -1px;
				right: -40px;
				height: 92px;
				width: 40px;
				z-index: 10;
			}
		}
		.stop1 {
			border: 1px solid #f7b5a1;
			width: 430px;
			padding-left: 0;
			box-shadow:2px 4px 0px #fadfd7;
			background: #FFFFFF;
			height:  88px;
			z-index: 10;
			.title {
				.num {
					color: #333333;
				}
				div {
					span {
						color: #333333;
					}
					h4 {
						color: #333333;
					}
				}
			}
			.details {
				.icon-div {
					background: #ddb1aa;
				}
			}
		}
		.stop2 {
			.img {
				height: 80px;
				width: 40px;
				z-index: 9;
			}
		}
		.stopActive {
			height: 80px;
			background: #fff9f6;
			box-shadow: none;
			.img {
				height: 92px;
			}
		}
		.stop3 {
			.title{
				width: 210px;
			}
			.details {
				width: 200px;
			}
			.img {
				height: 80px;
				width: 40px;
				z-index: 10;
			}
		}
		.stopActive2 {
			height: 88px;
			background: #FFFFFF;
			border: 1px solid #f7b5a1;
			box-shadow:2px 4px 0px #fadfd7;
			.img {
				height: 92px;
			}
			.title {
				.num {
					color: #333333;
				}
				div {
					span {
						color: #333333;
					}
					h4 {
						color: #333333;
					}
				}
			}
			.details {
				.icon-div {
					background: #ddb1aa;
				}
			}
		}
		.stopActive3 {
			height: 80px;
			background: #fff9f6;
			border: 1px solid #f7b5a1;
			box-shadow: none;
			.img {
				height: 92px;
			}
			.title {
				.num {
					color: #333333;
				}
				div {
					span {
						color: #333333;
					}
					h4 {
						color: #333333;
					}
				}
			}
			.details {
				.icon-div {
					background: #ddb1aa;
				}
			}
		}
		.lookstep11 {
			height: 88px;
			background: #FFFFFF;
			box-shadow:2px 4px 0px #fadfd7;
			.img {
				height: 92px;
			}
			
		}
		.lookstep12 {
			.img {
				height: 80px;
			}
		}
		.lookstep13 {
			height: 80px;
			background: #fff9f6;
			box-shadow:none;
		}
		.lookstep21 {
			.img {
				height: 92px;
			}
		}
		.lookstep22 {
			height: 88px;
			background: #FFFFFF;
			box-shadow:2px 4px 0px #fadfd7;
			.img {
				height: 92px;
			}
		}
		.lookstep23 {
			height: 80px;
			background: #fff9f6;
			box-shadow:none;
		}
		
	}
}
</style>