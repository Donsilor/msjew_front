<!-- 用戶評價	-->

<template>
	<div class="evaluate-body">
		<div class="title">{{ lang.title }}（{{page.totalCount}}{{ lang.num }}）</div>
		<div class="score">
			<span>{{avgLevel}}</span>
			<i class="ifon iconfont">{{avgLevel>=1?'&#xe64e;':'&#xe64f;'}}</i>
			<i class="ifon iconfont">{{avgLevel>=2?'&#xe64e;':'&#xe64f;'}}</i>
			<i class="ifon iconfont">{{avgLevel>=3?'&#xe64e;':'&#xe64f;'}}</i>
			<i class="ifon iconfont">{{avgLevel>=4?'&#xe64e;':'&#xe64f;'}}</i>
			<i class="ifon iconfont">{{avgLevel>=5?'&#xe64e;':'&#xe64f;'}}</i>
		</div>
		<div class="filter">
			<!--<select>
				<option value="0">默認</option>
				<option value="1">最新</option>
			</select>-->
			<label @click="shouType=1">
				<input type="radio" name="evaType" :checked="shouType==1"/>
				{{ lang.allEval }}
			</label>
			<!--	<label>
				<input type="radio" name="evaType" />含圖片
			</label>-->
			<label @click="shouType=2">
				<input type="radio" name="evaType" :checked="shouType==2"/>
				{{ lang.eval5 }}
			</label>
		</div>
		<ul>
			<li v-for="(item,index) in list">
				<div>
					<div class="content">{{item.commentsDesc}}</div>
					<!--<div class="images">
						<img class="img2" src="../../static/images/diamond/can.png" />
						<img class="img2" src="../../static/images/diamond/can.png" />
						<img class="img2" src="../../static/images/diamond/can.png" />
						<img class="img2" src="../../static/images/diamond/can.png" />
						<img class="img2" src="../../static/images/diamond/can.png" />
					</div>-->

					<p>{{filterFormatDate(item.createTime,'yyyy.MM.dd')}}</p>
					<div class="reply" v-if="item.commentsReplyDesc">
						BDD回復：{{item.commentsReplyDesc}}
					</div>
				</div>
				<div>
					<i class="ifon iconfont">{{item.commentsLevel>=1?'&#xe64e;':'&#xe64f;'}}</i>
					<i class="ifon iconfont">{{item.commentsLevel>=2?'&#xe64e;':'&#xe64f;'}}</i>
					<i class="ifon iconfont">{{item.commentsLevel>=3?'&#xe64e;':'&#xe64f;'}}</i>
					<i class="ifon iconfont">{{item.commentsLevel>=4?'&#xe64e;':'&#xe64f;'}}</i>
					<i class="ifon iconfont">{{item.commentsLevel>=5?'&#xe64e;':'&#xe64f;'}}</i>
					<div>{{item.userAccount}}</div>
				</div>
			</li>
		</ul>
		<Empty type="5" v-if="page.totalCount<=0"></Empty>
		<div class="see-more" v-show="page.nextPage">
			<div @click="curPage++,getGoodsComments()">{{ lang.loadingMore }}</div>
		</div>
	</div>
</template>

<script>
	import Empty from '@/components/empty.vue';
	import { Page } from '@/api/filterUtil.js';
	import { filterFormatDate } from '@/api/filterUtil.js';
	export default {
		components: {
			Empty
		},
		name: 'evaluate',
		props: {
			'type': [String]
		},
		data() {
			return {
				lang: this.$LANGUAGE.components.evaluate,
				list: [],
				curPage: 1,
				goodsId: this.$route.params.id, //商品編號
				shouType: 1, //類型（1：全部，2：有圖）
				page: {},
				avgLevel: '5.0' //平均分
			}
		},
		created() {
			var params = this.type == 1 ? {
				groupId: this.goodsId
			} : {
				goodsId: this.goodsId,
			};
			this.$axiosGet('/web/goodsComments/getAvgLevel',params).then(res => {
				if(res.code == 200) {
					this.avgLevel = res.data.avgLevel || '5.0';
				} else {
					this.$message.error(res.msg);
				}
			})
			this.getGoodsComments();
		},
		watch: {
			shouType() {
				this.getGoodsComments(1);
			},
			$route: {
				handler: function(val, oldVal) {
					this.getGoodsComments();
					}
			}
		},
		methods: {
			filterFormatDate: filterFormatDate,
			/**
			 * 查询评论
			 */
			getGoodsComments(type) {
				if(type == 1) {
					this.curPage = 1;
					this.list = [];
				}
				var _this = this;
				var params=this.type==1?{
					groupId: this.goodsId,
					currPage: this.curPage,
					pageSize: 20,
					shouType: this.shouType
				}:{
					goodsId: this.goodsId,
					currPage: this.curPage,
					pageSize: 20,
					shouType: this.shouType
				};
				this.$axiosGet('/web/goodsComments/getGoodsComments', params).then(res => {
					_this.list = [];
					if(res.code == 200) {
						_this.page = new Page(res.data.currPage, res.data.pageSize, res.data.totalCount);
						if(_this.page.totalCount > 0) {
							for(var i = 0, len = res.data.list.length; i < len; i++) {
								var eva=res.data.list[i];
								var index=eva.userAccount.indexOf('@');
								eva.userAccount=eva.userAccount.substr(0,index-6)+'***'+eva.userAccount.substr(index-3,eva.userAccount.length);
								_this.list.push(eva);
							}
						}
					} else {
						this.$message.error(res.msg);
					}
				})
			}
		}

	}
</script>

<style lang="less" scoped>
	.evaluate-body {
		text-align: left;
		.title {
			font-size: 24px;
			text-align: left;
			margin-left: 29px;
			color: #333333;
		}
		.score {
			margin-left: 31px;
			font-size: 18px;
			margin-top: 9px;
			text-align: left;
			overflow: hidden;
			span {
				float: left;
				margin-right: 14px;
			}
			i {
				margin-right: 6px;
				float: left;
				color: #F29B87;
				font-size: 20px;
			}
		}
		.filter {
			height: 60px;
			line-height: 60px;
			background: #F8F8F8;
			margin-top: 23px;
			font-size: 14px;
			color: #333333;
			select {
				width: 150px;
				height: 25px;
				border: 1px solid #F29B87;
				margin-left: 31px;
				margin-right: 6px;
			}
			label {
				margin-left: 34px;
				input[type=radio] {
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
					position: relative;
					display: inline-block;
					top: -2px;
					margin-right: 6px;
					vertical-align: middle;
					width: 14px;
					height: 14px;
					border: 1px solid #BBBBBB;
					outline: none;
					cursor: pointer;
					border-radius: 50%;
				}
				input[type=radio]:after {
					content: '';
					position: absolute;
					width: 8px;
					height: 8px;
					display: block;
					left: 2px;
					top: 2px;
					margin: auto;
					background: #F29B87;
					border-radius: 50%;
					-webkit-transform: scale(0);
					-moz-transform: scale(0);
					transform: scale(0);
					-webkit-transition: all 0.2s;
					-moz-transition: all 0.2s;
					transition: all 0.2s;
				}
				input[type=radio]:checked:after {
					-webkit-transform: scale(1);
					-moz-transform: scale(1);
					transform: scale(1);
				}
			}
		}
		ul {
			li {
				padding-left: 33px;
				border-bottom: 1px solid #E6E6E6;
				overflow: hidden;
				position: relative;
				margin-top: 29px;
				padding-bottom: 20px;
				min-height: 85px;
				>div:first-child {
					float: left;
					width: 826px;
					.content {
						font-size: 12px;
						color: #333333;
						line-height: 20px;
						margin-bottom: 20px;
					}
					.images {
						overflow: hidden;
						min-height: 70px;
						margin-bottom: 10px;
						img {
							float: left;
							margin-right: 18px;
							width: 70px;
							height: 70px;
						}
					}
					p {
						font-size: 12px;
						color: #999999;
					}
					.reply {
						color: #8B766C;
						font-size: 12px;
						margin-top: 19px;
					}
				}
				>div:nth-child(2) {
					right: 0px;
					width: 332px;
					border-left: 1px solid #999999;
					padding-left: 78px;
					height: 60px;
					position: absolute;
					top: 50%;
					margin-top: -44px;
					i {
						color: #F29B87;
						font-size: 20px;
						float: left;
						margin-right: 5px;
						margin-bottom: 14px;
					}
					div {
						clear: both;
						color: #666666;
					}
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
</style>