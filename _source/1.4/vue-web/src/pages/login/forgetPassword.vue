<template>
	<div class="forgetPassword">
		<NavTop />
		<Nav />
		<NavFooter/>
		<div class="content">
			<div class="main">
				<ul>
					<li class="active">
						<b>1</b>
						<p>{{ lang.showstep1 }}</p>
						<img v-show="showstep1" class="xiala" src="../../../static/images/login/xiala.png" />
					</li>
					<li :class="{active: showstep2 || showstep3 || showstep4}">
						<b>2</b>
						<p>{{ lang.showstep2 }}</p>
						<img v-show="showstep2" class="xiala" src="../../../static/images/login/xiala.png" />
					</li>
					<li :class="{active: showstep3 || showstep4}">
						<b>3</b>
						<p>{{ lang.showstep3 }}</p>
						<img v-show="showstep3" class="xiala" src="../../../static/images/login/xiala.png" />
					</li>
					<li :class="{active: showstep4}">
						<b>4</b>
						<p>{{ lang.showstep4 }}</p>
						<img v-show="showstep4" class="xiala" src="../../../static/images/login/xiala.png" />
					</li>
				</ul>
				<div class="container">
					<p class="title">{{ lang.forget }}</p>
					<div v-show="showstep1" class="step1">
						<h4>{{ lang.address }}</h4>
						<input spellcheck='false' v-model='mailbox' @keyup.enter="toStep2" />
						<p v-show="ismailbox" class="tips">{{ lang.tips1 }}<a @click="toSignIn" class="pointer">{{ lang.registration }}</a> 。</p>
						<p v-show="ismailbox2" class="tips">{{ lang.tips2 }}<a @click="toLogin" class="pointer"> {{ lang.login }}</a> 。</p>
						<button class="btn" @click="toStep2">{{ lang.next }}</button>
					</div>
					<div v-show="showstep2" class="step2">
						<img src="../../../static/images/login/email.png" />
						<p>{{ lang.p1 }}<b>{{mailbox}}</b></p>
						<p>{{ lang.p2 }}</p>
						<p class="mailbox">{{ lang.p3 }}<a @click="modifiyMailbox">{{ lang.p4 }}</a></p>
						<div class="code">
							<input v-model="code" :placeholder="lang.code" @keyup.enter="toStep3" />
						</div>
						<button class="btn" @click="toStep3">{{ lang.confirm }}</button>
					</div>
					<div v-show="showstep3" class="step3">
						<h4>{{ lang.newPassword }}</h4>
						<p class="tips">{{ lang.tips3 }}</p>
						<div class="password">
							<input @keyup="passWord" :placeholder="lang.newPassword" spellcheck='false' type="password" v-model='password' @keyup.enter="toStep4" />
							<p><img v-show = "password !== ''" :src="isPassWord?sure1:sure2" /><b v-show="isPassWord">{{tiptext1}}</b></p>
						</div>
						<div class="confirm">
							<input @keyup="confirmdPasswordChange" :placeholder="lang.confirmPassword" type="password" spellcheck='false' v-model='confirmdPassword' @keyup.enter="toStep4"  />
							<p><img v-show = "confirmdPassword !== ''" :src="isconfirmdPassword?sure1:sure2"/><b v-show="isconfirmdPassword">{{tiptext2}}</b></p>
						</div>
						<button class="btn" @click="toStep4">{{ lang.reset }}</button>
					</div>
					<div v-show="showstep4" class="step4">
						<h4>{{ lang.step4 }}</h4>
						<p>{{ lang.times0 }} {{times}} {{ lang.times }}</p>
					<router-link to='/login'>
						<a class="btn">{{ lang.nowSign}}</a>
					</router-link>
					</div>
				</div>
				<div class="footers">
					<p>{{ lang.p5 }}</p>
					<p>{{ lang.p6 }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Nav from '@/components/nav';
	import NavTop from '@/components/navTop';
	import NavFooter from '@/components/navFooter';
	import {RegPassword, Email} from '@/api/require-lee.js';
	export default {
		components: {
			Nav,
			NavTop,
			NavFooter
		},
		data() {
			return {
				lang: this.$LANGUAGE.login.forgetPassword,
				mailbox: '',
				code: '',
				showstep1: true,
				showstep2: false,
				showstep3: false,
				showstep4: false,
				sure1: require('../../../static/images/login/no.png'), //图片地址
				sure2: require('../../../static/images/login/yes.png'), //图片地址
				tiptext1: this.$LANGUAGE.login.forgetPassword.tiptext1,//密碼必需包含數字和字母
				tiptext2: this.$LANGUAGE.login.forgetPassword.tiptext2,//兩次輸入不一致
				times: 10,
				password: '',
				confirmdPassword: '',
				ismailbox: false,
				ismailbox2: false,
				isPassWord: false,
				isconfirmdPassword: false
			}
		},
		//740172136@qq.com
		methods: {
			toStep2() {
				if (!Email.test(this.mailbox)) {
					this.$message.error(this.lang.message1);
					return
					} else {
						this.$axiosPost(`web/user/resetEmail`,{email: this.mailbox}).then(res => {
							if (res.code === 200) {
								this.showstep1 = false;
								this.showstep2 = true;
								this.ismailbox = false;
								this.ismailbox2 = false;
							} else if(res.code === 501) {
								this.ismailbox = true
							} else if(res.code === 502) {
								this.ismailbox2 = true
							} else {
								this.$message.error(res.msg)
							}
					})
				}
			},
			toLogin() {
			  this.$router.replace({
			    name: 'login'
			  });
			},
			toSignIn() {
			  this.$router.push({
			    name: 'login',
					query:{id:'SignIn'}
			  });
			},
			//修改郵箱
			modifiyMailbox ()  {
				this.showstep2 = false;
				this.showstep1 = true;
			},
			//倒计时
			settime(){
				if (this.times === 0) {
					this.$router.push({
						name: 'login'
					})
				} else {
					this.times--;
					setTimeout(()=>{
					    this.settime()
					},1000)
				}
			},
			toStep3() {
				if (!this.code) {
					this.$message.error(this.lang.message2);
					return
				}
				this.$axiosPost(`web/user/compareCode`,{email: this.mailbox,code: this.code}).then(res => {
						if (res.code === 200) {
							this.showstep2 = false;
							this.showstep3 = true;
						} else {
							this.$message.error(res.msg);
						}
				})
			},
			passWord () {
				if (!RegPassword.test(this.password)) {
					this.isPassWord = true;
				} else if(this.password) {
					this.isPassWord = false;
				} else {
					this.isPassWord = '';
				}
			},
			confirmdPasswordChange () {
				if (this.confirmdPassword !== this.password) {
					this.isconfirmdPassword = true;
				} else if (this.confirmdPassword) {
					this.isconfirmdPassword = false;
				} else {
					this.isconfirmdPassword = '';
				}
			},
			toStep4() {
				if (!RegPassword.test(this.password)) {
					this.isPassWord = true;
					return
				}
				if (this.confirmdPassword !== this.password) {
					this.isconfirmdPassword = true;
					return
				}

				this.$axiosPost(`web/user/resetPwd`,{email: this.mailbox,code: this.code,password: this.password,confirmdPassword:this.confirmdPassword}).then(res => {
						if (res.code === 200) {
							this.showstep3 = false;
							this.showstep4 = true;
							this.settime()
						} else {
							this.$message.error(res.msg);
						}
				})
			}
		}
	}
</script>

<style lang="less">
	.forgetPassword {
		margin-top: 30px;

		.content {
			width: 100%;
			height: 100%;
			background-image: url("../../../static/images/login/necklace.png"), url('../../../static/images/login/bg.png');
			background-size: cover;

			.main {
				position: relative;
				width: 1360px;
				height: 930px;
				margin: 0 auto;
				padding-top: 50px;
				ul {
					height: 180px;
					overflow: hidden;
					margin-bottom: 20px;

					li {
						position: relative;
						float: left;
						width: 290px;
						height: 170px;
						margin-left: 40px;
						background: #ffffff;
						box-shadow: 0px 0px 5px #ececec;

						b {
							display: inline-block;
							width: 60px;
							height: 60px;
							margin: 30px 0 20px;
							background: #e6e6e6;
							font-size: 30px;
							line-height: 60px;
							font-weight: 400;
							color: #ffffff;
							border-radius: 30px;
						}

						p {
							font-size: 16px;
							color: #999999;
						}

						.xiala {
							position: absolute;
							top: 165px;
							left: 138px;
							width: 14px;
							height: 14px;
						}
					}

					.active {
						border: 1px solid #b97f8b;
						box-shadow: 0px 6px #e3d1cc;

						b {
							background: #ddb0aa;
						}

						p {
							color: #ddb0aa;
						}
					}

				}

				.container {
					width: 1280px;
					height: 520px;
					padding: 54px 50px;
					background: #ffffff;
					opacity: 0.9;
					margin: 0 auto;
					.title {
						padding-left: 26px;
						font-size: 20px;
						color: #a88f82;
						text-align: left;
						border-left: 2px solid #333333;
					}

					.step1 {
						h4 {
							/*width: 500px;*/
							font-size: 24px;
							color: #333333;
							line-height: 80px;
							text-align: center;
							margin: 56px auto 0;
							font-weight: 400;
						}

						input {
							width: 500px;
							height: 34px;
							font-size: 18px;
							line-height: 34px;
							color: #666666;
							border: none;
							outline: none;
							border-bottom: 1px solid #999999;
						}
						P {
							width: 500px;
							margin: 0 auto;
							font-size: 18px;
							line-height: 34px;
							color: #999999;
							text-align: left;
							a {
								color: #cdbca9;
								text-decoration: underline;
							}
						}
					}

					.btn {
						display: block;
						width: 500px;
						height: 48px;
						margin: 40px auto 0;
						font-size: 16px;
						color: #ffffff;
						background: #a88f82;
						text-align: center;
						border: none;
						outline: none;
						opacity: 1;
					}

					.step2 {
						img {
							width: 60px;
							height: 50px;
							margin: 30px auto;
						}

						p {
							font-size: 18px;
							line-height: 24px;
							color: #333333;

							b {
								color: #a88f82;
								font-weight: 400;
							}
						}

						.mailbox {
							font-size: 16px;
							line-height: 50px;
							color: #333333;

							a {
								color: #a88f82;
								margin-left: 70px;
							}
						}
						.code {
							input {
								margin-top: 20px;
								margin-right: 28px;
								width: 240px;
								height: 34px;
								font-size: 16px;
								line-height: 34px;
								color: #999999;
								border: none;
								outline: none;
								border-bottom: 1px solid #a0a0a0;
							}
							p {
								display: inline-block;
								font-size: 16px;
								line-height: 34px;
								color: #a88f82;
							}
						}
					}
					.step3 {
						.btn {
							width: 500px;
						}
						h4 {
							width: 500px;
							font-size: 18px;
							line-height: 40px;
							margin: 20px auto 10px;
							font-weight: 400;
							text-align: left;
							color:  #333333;
						}
						.tips {
							display: inline-block;
							width: 500px;
							font-size: 14px;
							line-height: 18px;
							margin: 0 auto;
							text-align: left;
							color: #cdbca9;
							margin-top: 10px;
						}
						.password, .confirm {
							margin-top: 20px;
							width: 500px;
							margin: 20px auto 0;
							text-align: left;
							border-bottom: 1px solid #a0a0a0;
							input {
								width: 220px;
								height: 34px;
								font-size: 18px;
								line-height: 34px;
								color: #999999;
								border: none;
								outline: none;
							}
							p {
								display: inline-block;
								width: 250px;
								text-align: right;
								img {
									width: 14px;
									height: 14px;
									margin: -2px 0;
								}
								b {
									margin-left: 10px;
									font-size: 18px;
									font-weight: 400;
									color: #f29b87;
								}
							}
						}
					}
					.step4 {
						h4 {
							font-size: 18px;
							line-height: 20px;
							color: #333333;
							margin-top: 110px;
							font-weight: 400;
						}
						p {
							margin-top: 20px;
							font-size: 18px;
							color: #cdbca9;
						}
						.btn {
							margin-top: 30px;
							line-height: 48px;
						}
					}
				}

				.footers {
					position: absolute;
					left: 24%;
					bottom: 20px;

					p {
						float: left;
						font-size: 12px;
						color: #666666;
					}

					P:first-child {
						margin-right: 350px;
					}
				}
			}
		}
	}
</style>
