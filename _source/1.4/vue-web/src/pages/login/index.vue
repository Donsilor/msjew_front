<template>
  <div class="login">
    <NavTop/>
    <Nav/>
    <NavFooter/>
    <div class="content">
      <div class="main">
        <div class="body">
          <ul>
            <li
              :class="{active:!show}"
              @click="show = false">{{ lang.login }}</li>
            <li
              :class="{active:show}"
              @click="show = true">{{ lang.registration }}</li>
          </ul>
          <!-- 登錄 -->
          <div
            v-show="!show"
            class="logins">
            <input
              style="position: absolute;z-index: -1;"
              type="text" >
            <input
              style="position: absolute;z-index: -1;"
              type="password" >
            <el-input
              :class="{passactiv:flag && !mailbox}"
              v-model="mailbox"
              spellcheck="false"
              class="margin-top"
              :placeholder="lang.mailbox"
              @keyup.enter.native="submit">
              <i slot="prefix"><img
                style="width: 16px; height: 14px;margin-top:16px;margin-left: 12px;"
                src="../../../static/images/login/mailbox.png"></i>
            </el-input>
            <p
              v-show="flag && !mailbox"
              class="pass">{{ lang.mailTips }}</p>
            <el-input
              :class="{passactiv:flag && !password}"
              v-model="password"
              spellcheck="false"
              class="margin-top"
              type="password"
              :placeholder="lang.password"
              @keyup.enter.native="submit">
              <i slot="prefix"><img
                style="width: 16px; height: 16px;margin-top:16px;margin-left: 12px;"
                src="../../../static/images/login/password.png"></i>
            </el-input>
            <p
              v-show="flag && !password"
              class="pass">{{ lang.passwordTips }}</p>
            <div class="forget">
              <router-link to="/forgetpassword">
                <a class="forget-password">{{ lang.forget }}</a>
              </router-link>
            </div>
            <div class="code">
              <div class="code-input">
                <el-input
                  :class="{passactiv:flag && this.code !== this.identifyCode}"
                  v-model="code"
                  spellcheck="false"
                  class="margin-top2"
                  :placeholder="lang.code"
                  @keyup.enter.native="submit" />
              </div>
              <div
                class="verify-box"
                @click="refreshCode">
                <Sidentify :identify-code="identifyCode" />
              </div>
              <p
                v-show="flag && this.code !== this.identifyCode"
                class="pass">{{ lang.codeTips }}</p>
            </div>
            <button
              class="btn"
              @click="submit">{{ lang.login }}</button>
            <div class="footer">
              <div class="line" />
              <div class="test">{{ lang.logins }}</div>
							<div>
								 <a @click="facebookLogin"> <img src="../../../static/images/login/facebook.png"></a>
								<a @click="googleLogin"> <img src="../../../static/images/login/google.png"></a>
							</div>
            </div>
          </div>

          <!-- 註冊 -->
          <div
            v-show="show"
            class="registry">
            <input
              style="position: absolute;z-index: -1;"
              type="text" >
            <input
              style="position: absolute;z-index: -1;"
              type="password" >
            <input
              v-model="surname"
              :class="{tipsborder:flag2 && !surname}"
              spellcheck="false"
              class="margin-right-15"
              maxlength="20"
              :placeholder="lang.surname">
            <input
              v-model="name"
              :class="{tipsborder:flag2 && !name}"
              spellcheck="false"
              maxlength="20"
              :placeholder="lang.name">
            <p
              v-show="flag2 && !surname"
              class="tips tips1">{{ lang.surnameTips }}</p>
            <p
              v-show="flag2 && !name"
              class="tips tips2">{{ lang.nameTips}}</p>
            <input
              v-model="mailbox2"
              :class="{tipsborder:flag2 && !mailbox2}"
              spellcheck="false"
              class="mailbox"
              :placeholder="lang.mailbox2"
              @keyup="isMailbox">
            <p
              v-show="(flag2 && !mailbox2) || !hasMail"
              class="tips">{{ lang.mailTips }}</p>
            <input
              v-model="code2"
              :class="{tipsborder:flag2 && !code2}"
              spellcheck="false"
              class="margin-right-15"
              :placeholder="lang.code">
            <div class="get-code">
              <p
                v-if="hasCode == '2'"
                @click="getCode">{{ lang.getCode }}</p>
              <p
                v-if="hasCode !='2'"
                class="dis-code">{{ num }} {{ lang.num }}</p>
            </div>
            <p
              v-show="flag2 && !code2"
              class="tips">{{ lang.codeTips }}</p>
            <div
              :class="{tipsborder:flag2 && !password2}"
              class="pass-word">
              <input
                v-model="password2"
                :type="pwdType"
                spellcheck="false"
                class="margin-right-15"
                :placeholder="lang.pwdType">
              <img
                :src="openeye"
                alt=""
                @click="changeType()">
            </div>
            <p
              v-show="flag2 && !password2"
              class="tips tips3">{{ lang.codeTips }}</p>
            <div class="treaty-content">
              <el-checkbox v-model="checked" />
              <div class="treaty">{{ lang.checked }}
                <a>
                  <router-link to="/clause">{{ lang.rule }}</router-link>
                </a>
              </div>
            </div>
            <button
              class="btn"
              @click="submitRegistry">{{ lang.submitRegistry }}</button>
            <p
              v-show="flag2 && !checked"
              class="tips tips4">{{ lang.tips4 }}</p>
          </div>
        </div>
        <div class="footers">
          <p></p>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav';
import NavTop from '@/components/navTop';
import NavFooter from '@/components/navFooter';
import axios from 'axios';
import Sidentify from '@/components/code';
import { Email } from '@/api/require-lee.js';
import { setToken, clearToken } from '@/api/cache.js';

export default {
  components: {
    Nav,
    NavTop,
    NavFooter,
    Sidentify
  },
  data() {
    return {
			lang: this.$LANGUAGE.login.index,
      show: !!this.$route.query.id,
      flag: false,
      mailbox: '',
      password: '',
      code: '',
      identifyCode: '',

      flag2: false,
      hasCode: '2',
      hasMail: true,
      checked: true,
      surname: '',
      name: '',
      mailbox2: '',
      code2: '',
      password2: '',
      pwdType: 'password', // 密碼類型
      openeye: require('../../../static/images/login/eye.png'), // 圖片地址
      num: 60,
      isCode: true,
      auth2: '', // 谷歌登錄
      googleUser: {}
    };
  },
  created() {
		console.log(this.$LANGUAGE, 'this.$LANGUAGE.login.index')
    this.refreshCode();
  },
  methods: {
    // 新的google登陸
    googleLogin() {
      this.$axiosPost(`web/login/submitLogin`, {
        social: 'google'
      }).then(res => {
        if (res.code === 200) {
          window.location.href = res.data.redirectUrl;
        } else {
          this.isCode = true;
          this.$message.error(res.msg);
        }
      });
    },
    // 新的facebook登陸
    facebookLogin() {
      this.$axiosPost(`web/login/submitLogin`, {
        social: 'facebook'
      }).then(res => {
        if (res.code === 200) {
          window.location.href = res.data.redirectUrl;
        } else {
          this.isCode = true;
          this.$message.error(res.msg);
        }
      }, err => {
        alert(err);
      });
    },
    // 生成驗證碼
    refreshCode() {
      let library = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      this.identifyCode = '';
      for (let i = 0; i < 4; i++) {
        this.identifyCode += library[Math.floor(Math.random() * 9)];
      }
    },
    // 郵箱登錄740172136@qq.com
    submit() {
      if (!this.mailbox || !this.password || this.code !== this.identifyCode) {
        this.flag = true;
        this.refreshCode();
        return;
      }
      this.$axiosPost(`/web/login/submitLogin`, {
        account: this.mailbox,
        password: this.password,
        social: 'account'
      }).then(res => {
        if (res.code === 200) {
          clearToken();
          setToken(res.data.token);
          this.$router.replace({
            name: 'index'
          });
        } else {
          this.isCode = true;
					this.refreshCode();
          this.$message.error(res.msg);
        }
      });
    },
    // 顯示密碼
    changeType() {
      this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
      this.openeye = this.openeye == require('../../../static/images/login/eye.png') ? require('../../../static/images/login/eye-active.png') : require('../../../static/images/login/eye.png');
    },
    // 實時校驗郵箱
    isMailbox() {
      if (!Email.test(this.mailbox2)) {
        this.hasMail = false;
      } else {
        this.hasMail = true;
      }
      console.log(this.hasMail);
    },

    // 獲取驗證碼
    getCode() {
      if (!Email.test(this.mailbox2)) {
        this.hasMail = false;
        return;
      }
      if (this.isCode) {
        this.isCode = false;
        this.$axiosGet(`web/user/sendCode`, {
          email: this.mailbox2
        }).then(res => {
          console.log('權限', res);
          if (res.code == 200) {
            this.hasCode = '1';
            this.isCode = true;
            this.settime();
          } else {
            this.$message.error(res.msg);
            this.isCode = true;
          }
        });
      }
    },
    // 倒計時
    settime() {
      if (this.num === 0) {
        this.hasCode = '2';
        this.num = 60;
      } else {
        this.hasCode = '1';
        console.log(this.hasCode);
        this.num--;
        setTimeout(() => {
          this.settime();
        }, 1000);
      }
    },
    // 提交登記
    submitRegistry() {
      let data = {
        email: this.mailbox2,
        surname: this.surname,
        name: this.name,
        password: this.password2,
        code: this.code2
      };
      if (!Email.test(this.mailbox2)) {
        this.hasMail = false;
        return;
      }
      if (!this.surname || !this.name || !this.password2 || !this.code2 || !this.checked) {
        this.flag2 = true;
        return;
      }
      if (this.surname.length > 20 || this.name.length > 20) {
        this.$message.error(this.lang.message1);
        return;
      }
      this.$axiosPost(`web/user/signup`, data).then(res => {
        if (res.code === 200) {
          this.$message({
            message: this.lang.message2,
            type: 'success'
          });
          this.show = false;
          this.surname = '';
          this.name = '';
          this.mailbox2 = '';
          this.code2 = '';
          this.password2 = '';
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less">
	.login {
		margin-top: 30px;
		.content {
			width: 100%;
			height: 100%;
			background-image: url("../../../static/images/login/necklace.png"), url('../../../static/images/login/bg.png');
			background-size: cover;
			.main {
				width: 1360px;
				height: 930px;
				border-top: 1px solid #e4e0dc;
				margin: 0 auto;
				.body {
					width: 360px;
					background: #ffffff;
					margin: 110px 0 0 910px;
					padding: 30px 38px 0;
					ul {
						border-bottom: 1px solid #ececec;
						li {
							display: inline-block;
							font-size: 16px;
							line-height: 38px;
							color: #666666;
							padding: 0 8px;
							margin: 0 35px;
							cursor: pointer;
						}
						.active {
							color: #a88f82;
							border-bottom: 2px solid #a88f82;
						}
					}
					.logins {
						.pass {
							font-size: 12px;
							line-height: 16px;
							width: 100%;
							margin-bottom: -16px;
							text-align: left;
							color: #f29b87;
						}
						.el-input__inner {
							height: 46px;
							font-size: 14px;
							color: #666666;
							padding-left: 45px;
							border: 1px solid #e7e7e7;
							width: 278px;
							outline: none;
						}
						.forget {
							margin-top: 10px;
							text-align: right;
							.forget-password {
								display: inline-block;
								font-size: 12px;
								color: #999999;
								text-decoration: underline;
								text-align: right;
								cursor: pointer;
							}
						}
						.code {
							.el-input__inner {
								padding-left: 20px;
								width: 138px;
							}
						}
						.code-input {
							float: left;
							width: 140px;
							height: 48px;
						}
						.verify-box {
							float: left;
							margin: 10px 15px;
							width: 108px;
							height: 46px;
						}
						.btn {
							width: 100%;
							height: 50px;
							margin-top: 30px;
							font-size: 14px;
							line-height: 46px;
							outline: none;
							color: #8b766c;
							background: #ffffff;
							border: 1px solid #8b766c;
						}
						.footer {
							position: relative;
							.line {
								position: absolute;
								top: 28px;
								left: 0;
								width: 100%;
								margin-bottom: 4px;
								height: 2px;
								background: #ececec;
								z-index: 0;
							}
							.test {
								display: inline-block;
								position: relative;
								padding: 20px 5px 0;
								height: 34px;
								font-size: 14px;
								color: #a88f82;
								margin: 0 auto;
								background: #ffffff;
								z-index: 2;
							}
							a {
								display: inline-block;
								margin: 24px 15px;
								cursor: pointer;
								img {
									width: 36px;
									height: 36px;
								}
							}
							.status {
								display: inline-block;
								position: absolute;
								top: 34px;
								left: 90px;
								width: 30px;
								height: 20px;
								background: #282828;
								overflow: hidden;
								opacity: 0.8;
							}
						}
					}
					.margin-top {
						margin-top: 20px;
						width: 280px;
						height: 46px;
						overflow: hidden;
					}
					.margin-top2 {
						margin-top: 10px;
						height: 46px;
						width: 140px;
						overflow: hidden;
					}
					.passactiv {
						border: 1px solid #f29b87;
						border-radius: 4px;
					}
					.registry {
						text-align: left;
						padding-bottom: 80px;
						input {
							margin-top: 20px;
							width: 130px;
							height: 34px;
							font-size: 14px;
							line-height: 34px;
							color: #a0a0a0;
							border: none;
							outline: none;
							border-bottom: 1px solid #a0a0a0;
							&:focus{
								border-color: #f29b87;
							}
						}
						input::-webkit-input-placeholder {
							/* WebKit, Blink, Edge */
							color: #d0d0d0;
						}
						input:-moz-placeholder {
							/* Mozilla Firefox 4 to 18 */
							color: #d0d0d0;
						}
						input::-moz-placeholder {
							/* Mozilla Firefox 19+ */
							color: #d0d0d0;
						}
						input:-ms-input-placeholder {
							/* Internet Explorer 10-11 */
							color: #d0d0d0;
						}
						.pass-word {
							position: relative;
							margin-bottom: 40px;
							input {
								width: 100%;
							}
							img{
								position: absolute;
								right: 0px;
								cursor: pointer;
								bottom:10px ;
							}
						}
						.tipsborder {
							border-bottom: 1px solid #f29b87;
						}
						.treaty-content {
							display: flex;
							padding-left: 10px;
							justify-content: space-around;
						}
						.treaty {
							display: inline-block;
							width: 240px;
							text-align: left;
							font-size: 12px;
							color: #282828;
							a {
								cursor: pointer;
								color: #8b766c;
								text-decoration: underline;
								font-family: '微軟雅黑';
							}
						}
						.btn {
							width: 100%;
							height: 50px;
							margin-top: 10px;
							font-size: 14px;
							line-height: 46px;
							outline: none;
							color: #8b766c;
							background: #ffffff;
							border: 1px solid #8b766c;
						}
						.margin-right-15 {
							margin-right: 15px;
						}
						.mailbox {
							width: 100%;
						}
						.get-code {
							display: inline-block;
							width: 130px;
							height: 46px;
							font-size: 14px;
							line-height: 46px;
							color: #a88f82;
							border-radius: 5px;
							text-align: center;
							border: 1px solid #ececec;
							background: #f7f7f8;
							cursor: pointer;
							.dis-code {
								color: #999999;
							}
						}
						.el-checkbox {
							margin-right: 10px;
						}
						.is-checked .el-checkbox__inner {
							background-color: #cdb9b0 !important;
							border-color: #cdb9b0 !important;
						}
						.el-checkbox__input.is-focus .el-checkbox__inner {
							border-color: #cdb9b0 !important;
						}
						.tips {
							margin-bottom: -20px;
							font-size: 12px;
							line-height: 20px;
							color: #f29b87;
						}
						.tips1 {
							float: left;
						}
						.tips2 {
							float: right;
							margin-right: 34px;
						}
						.tips3 {
							margin-top: -40px;
							margin-bottom: 20px;
						}
						.tips4 {
							text-align: center;
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
