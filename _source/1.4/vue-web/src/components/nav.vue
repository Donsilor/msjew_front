<template>
	<div class="nav">
		<ul class="navLeft">
			<!-- <li class="bg padding-x-5"><img src="../../static/images/nav/chat.png">
        <p>0/0</p>
      </li>-->
			<li class="padding-x-10">
				<i class="icon iconfont color-666">&#xe66a;</i>
				<p>(852) 2165 3905</p>
			</li>
			<li>
				<!--<p class="fistp">7天24小時服務</p>-->
			</li>
		</ul>

		<ul class="navRight">
			<li>
				<img src="../../static/images/nav/me.png">
				<router-link to="/login">
					<p v-if="!this.$store.state.isLogin">{{ lang.login }}</p>
				</router-link>

				<div v-if="this.$store.state.isLogin" class="nav-login" @mouseenter="showLoginOut=1" @mouseleave="showLoginOut=0">{{ this.$store.state.userInfo.name }} {{ this.$store.state.userInfo.surname }}
					<!--	<div class="loginOut">
						<span @click="loginOut">退出登入</span>
					</div>-->
					<ol v-show="showLoginOut==1">
						<li>
							<router-link to="/personal/user-order">{{ lang.order }}</router-link>
						</li>
						<li>
							<router-link to="/personal/account">{{ lang.account }}</router-link>
						</li>
						<li @click="loginOut">{{ lang.loginOut }}</li>
					</ol>
				</div>
			</li>

			<li>
				<router-link to="/personal/wish"><img src="../../static/images/nav/wish.png">
					<p>{{ lang.wish }}（{{ wishGoodsNum }}）</p>
				</router-link>
			</li>
			<li>
				<router-link to="/cart"><img src="../../static/images/nav/cart.png">
					<p>{{ lang.cart }}（{{ cartGoodsNum }}）</p>
				</router-link>
			</li>
			<!-- <li>
				<p class="nav-shiftLang" @click="switchLang">{{ shiftLang }}</p>
			</li> -->
			<li>
				<p class="unit" @mouseenter="showLang=1" @mouseleave="showLang=0">
					{{ shiftLang }}
					<i class="icon iconfont">&#xe652;</i>
					<ol v-show="showLang==1">
						<li v-for="item in list" @click="switchLang(item)">{{item.label}}</li>
					</ol>
				</p>
			</li>
			<li>
				<p class="unit" @mouseenter="showCoin=1" @mouseleave="showCoin=0">
					{{currencyType}}
					<i class="icon iconfont">&#xe652;</i>
					<ol v-show="showCoin==1">
						<li v-for="item in options" @click="switchCurrency(item.label)">{{item.label}}</li>
					</ol>
				</p>
			</li>
		</ul>
		<!-- 首页头部品牌故事图片隐藏 -->
		<!-- <router-link to="/brandStory" class="navImg"><img src="../../static/images/nav/story.png"></router-link> -->
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';
	import { getSessionToken, clearSessionToken, getToken, logout, clearCustom, clearTwoCustom } from '@/api/cache.js';
	export default {
		name: 'Nav',
		data() {
			return {
				lang: this.$LANGUAGE.components.nav,
				showLoginOut: 0,
				showCoin: 0,
				showLang: 0,
				shiftLang: localStorage.getItem('locale') == 'en_US' ? 'English':'繁體中文',
				currencyType: localStorage.getItem('coin') || 'HKD',
				info: '',
				list: [{
					value: 'zh_TW',
					label: '繁體中文'
				}, {
					value: 'en_US',
					label: 'English'
				}],
				options: [{
					value: '1',
					label: 'HKD'
				}, {
					value: '2',
					label: 'USD'
				}, {
					value: '3',
					label: 'CNY'
				}]
			};
		},
		computed: {
			...mapGetters([
				'cartGoodsNum',
				'wishGoodsNum'
			])
		},
		created() {
			this.getCartGoodsNum();
			this.getWishGoodsNum();
			console.log('000', this.$LANGUAGE)
		},
		mounted() {},
		methods: {
			...mapActions([
				'getCartGoodsNum',
				'getWishGoodsNum'
			]),
			// 判断是否登录
			//     hasLogin() {
			//       let token = getToken();
			//       if (token) {
			//         // 在cookie存在token的话，获取用户信息，改变用户状态
			//         this.$axiosGet(`web/user/me`).then(res => {
			//           if (res.code === 200) {
			//             let info = res.data;
			//             this.$store.commit('setToken', res.data, token);
			//           } else {
			//           }
			//         });
			//       } else {
			//         this.$store.commit('unsetToken');
			//       }
			//     },
			// 退出登录，清除cookie
			loginOut(val) {
				this.showLoginOut=0;
				logout();
				this.$router.push({
					name: 'index',
				})
				// this.$store.commit('unsetToken');
			},
			switchLang(val) {
				this.$store.commit('switchLang', val.value);
				localStorage.setItem('locale', val.value);
				clearCustom()
				clearTwoCustom()
				location.reload();
			},
			switchCurrency(val) {
				this.$store.commit('switchCurrency', val);
				localStorage.setItem('coin', val);
				clearCustom()
				clearTwoCustom()
				location.reload();
			}

		}

	};
</script>

<style lang="less">
	.nav {
		position: relative;
		width: 100%;
		min-width: 1360px;
		height: 44px;
		padding: 0 20px 3px;
		background: #ffffff;
		border-bottom: 1px solid #ececec;
		ol {
			position: absolute;
			background: white;
			left: -25px;
			z-index: 999;
			top: 40px;
			padding-top: 6px;
			padding-bottom: 6px;
			border: 1px solid rgba(221, 221, 221, 1);
			box-shadow: 0px 2px 4px 0px rgba(123, 123, 123, 0.23);
			border-radius: 4px;
			font-size: 12px;
			text-align: center;
			li {
				width: 78px;
				line-height: 35px;
				height: 35px;
				color: #999999;
				&:hover {
					color: #8B766C;
					background: #F5F3F1;
				}
				a {
					width: 100%;
					color: #999999;
					font-size: 12px;
					height: 100%;
					display: block;
					&:hover {
						color: #8B766C;
					}
				}
			}
			&:after {
				content: '';
				width: 0;
				height: 0;
				border-width: 0 6px 6px;
				border-style: solid;
				border-color: transparent transparent white;
				position: absolute;
				top: -6px;
				left: 34px;
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
				left: 32px;
			}
		}
		.nav-shiftLang {
			margin-left: 25px!important;
			cursor: pointer;
		}
		.unit {
			margin-left: 25px!important;
			margin-right: 15px;
			cursor: pointer;
			position: relative;
			i {
				margin-left: 3px;
				font-size: 12px;
			}
		}
		.navLeft {
			float: left;
			height: 40px;
			>li {
				float: left;
				height: 40px;
				padding: 8px 0;
				&.padding-x-5 {
					padding-right: 5px;
					padding-left: 5px;
					img {
						float: left;
						width: 28px;
					}
					p {
						font-size: 12px;
					}
				}
				&.padding-x-10 {
					padding-right: 10px;
					padding-left: 10px;
					i {
						float: left;
						font-size: 23px;
						margin-left: 2px;
					}
				}
				p {
					float: left;
					margin-left: 11px;
					font-size: 16px;
					line-height: 24px;
					color: #838383;
				}
				.fistp {
					color: #98989b;
					margin: 0;
					padding-left: 11px;
					font-size: 12px;
					height: 14px;
					line-height: 14px;
					margin-top: 6px;
					border-left: 1px solid #bbbbbb;
				}
			}
		}
		.navImg {
			float: right;
			height: 35px;
			margin-top: 7px;
		}
		.navRight {
			float: right;
			height: 44px;
			>li {
				float: left;
				&:first-child {
					img {
						margin-left: 15px;
					}
				}
				img {
					float: left;
					margin-left: 35px;
					height: 22px;
					margin-top: 11px;
				}
				p {
					float: right;
					margin-left: 10px;
					font-size: 12px;
					line-height: 44px;
					color: #838383;
				}
				.nav-login {
					cursor: pointer;
					position: relative;
					float: right;
					margin-left: 10px;
					font-size: 12px;
					color: #838383;
					line-height: 44px;
					position: relative;
					ol {
						text-align: left;
						text-indent: 13px;
					}
				}
			}
		}
	}
</style>
