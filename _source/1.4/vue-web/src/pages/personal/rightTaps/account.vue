<template>
  <div class="account">
    <div class="header-title">
      <img src="../../../../static/images/personal/order.png" >
      <h3>{{ lang.title }}</h3>
    </div>
    <div class="content">
      <ul class="tabs clearfix">
        <li
          v-for="(item,index) in tabsParam"
          :class="{active:index===nowIndex}"
          class="li-tab"
          @click="toggleTabs(index)">{{ item }}
        </li>
      </ul>
      <div
        v-show="nowIndex ===0"
        class="my-info">
        <h4>{{ lang.base }}</h4>
        <MyAccountBase />
        <h4>{{ lang.link }}</h4>
        <MyAccountBind />
      </div>
      <div
        v-show="nowIndex ===1"
        class="my-info">
        <h4>{{ lang.address }}</h4>
        <MyAddressList />
      </div>
      <div
        v-show="nowIndex ===2"
        class="my-info coupon">
        <h4>{{ lang.coupon }}</h4>
        <MyCoupon />
      </div>
      <div
        v-loading="psw"
        v-show="nowIndex ===3"
        class="my-info modify-password">
        <h4>{{ lang.psw1 }}</h4>
        <div class="pass-word">
          <ul>
            <input
              type="password"
              style="display: none;">
            <li><span>{{ lang.psw2 }}</span><input
              v-model="oldPsw"
              :placeholder="lang.psw5"
              autocomplete = "new-password"
              type="password"></li>
            <li><span>{{ lang.psw3 }}</span><input
              v-model="newPsw"
              :placeholder="lang.psw6"
              type="password"></li>
            <li><span>{{ lang.psw4 }}</span><input
              v-model="agaPsw"
              :placeholder="lang.psw7"
              type="password"></li>
          </ul>
        </div>
        <a @click="submit">{{ lang.save }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccountBase from '../../../components/personal/myAccountBase';
import MyAccountBind from '../../../components/personal/myAccountBind';
import MyAddressList from '../../../components/personal/myAddressList';
import MyCoupon from '../../../components/personal/myAccountCoupon';
import { RegPassword } from '../../../api/require-lee';
import { logout } from '@/api/cache.js';

export default {
  components: {
    MyAccountBase, MyAccountBind, MyAddressList, MyCoupon
  },
  data() {
    return {
      lang: this.$LANGUAGE.personal.account,
      nowIndex: 0,
      tabsParam: [this.$LANGUAGE.personal.account.info, this.$LANGUAGE.personal.account.address, this.$LANGUAGE.personal.account.coupon, this.$LANGUAGE.personal.account.psw1],
      oldPsw: '',
      newPsw: '',
      agaPsw: '',
      psw: false
    };
  },
  created() {
  },
  methods: {
    // 切换tab项
    toggleTabs(index) {
      this.nowIndex = index;
    },
    submit() {
      // console.log('提交')
      if (this.oldPsw === '') {
        this.$message.error(this.lang.psw5);
        return;
      }
      if (this.newPsw !== this.agaPsw) {
        this.$message.error(this.lang.psw8);
        return;
      }
      if (!RegPassword.test(this.newPsw)) {
        this.$message.error(this.lang.psw9);
        return;
      }
      this.psw = true;
      this.$axiosPost('/web/myAccount/updateUserPassword', {
        oldPassword: this.oldPsw,
        newPassword: this.newPsw
      }).then(res => {
        // console.log(res)
        if (res.code === 500) {
          this.psw = false;
          this.$message.error(res.msg);
        } else if (res.code === 200) {
          this.psw = false;
          this.$message({
            message: this.lang.success,
            type: 'success'
          });
          setTimeout(() => {
            logout();
            this.$router.push({
              name: 'login'
            });
          }, 1000);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.account{
	.content {
		.tabs {
			margin-top: 20px;
			border-bottom: 1px solid #e6e6e6;
			li {
				float: left;
				font-size: 16px;
				line-height: 50px;
				color: #333333;
				padding: 0 26px;
				cursor: pointer;

			}
			li:first-child {
				padding-left: 0;
			}
			.active {
				color: #f29b87;
				border-bottom: 2px solid #f29b87;
			}
		}
		.my-info{
			h4 {
				font-size: 16px;
				line-height: 60px;
				color: #f29b87;
				text-align: left;
				margin-top: 8px;
			}
		}
		.modify-password {
			text-align: left;
			.pass-word {
				ul {
					text-align: left;
					li {
						margin-top: 20px;
						span {
							display: inline-block;
							width: 150px;
							/*width: 100px;*/
							font-size: 14px;
							line-height: 36px;
							color: #333333;
						}
						input {
							width: 340px;
							height: 31px;
							font-size: 14px;
							line-height: 36px;
							color: #999999;
							border: none;
							outline: none;
							border-bottom: 1px solid #999999;
						}
					}
				}
			}
			a {
				display: inline-block;
				width: 190px;
				height: 40px;
				margin-top: 40px;
				font-size: 14px;
				line-height: 40px;
				color: #8b766c;
				text-align: center;
				border: 1px solid #8b766c;
			}
		}
	}
}
</style>
