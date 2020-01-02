<template>
  <div
    v-loading="loading"
    class="mabind">
    <div class="font-size-14 color-333 margin-bottom-20">{{ lang.faceLook }}</div>
    <img
      v-show="!userInfo.facebookAccount"
      src="../../../static/images/personal/account/facelook.png"
      alt="">
    <div
      v-show="!userInfo.facebookAccount"
      class="bind-input">
      <input
        v-model="fbemail"
        type="text">
      <span
        class="bind-btn"
        @click="checkEmail(fbemail, 2)">{{ lang.bind }}</span>
    </div>
    <div
      v-show="userInfo.facebookAccount"
      class="bind-email">
      <div>{{ showFacebookAccount }}</div>
      <div>{{ lang.alreadyBind }}</div>
    </div>
    <div class="font-size-14 color-333 margin-bottom-20">{{ lang.google }}</div>
    <img
      v-show="!userInfo.googleAccount"
      src="../../../static/images/personal/account/google.png"
      alt="">
    <div
      v-show="!userInfo.googleAccount"
      class="bind-input">
      <input
        v-model="ggmail"
        type="text">
      <span
        class="bind-btn"
        @click="checkEmail(ggmail, 1)">{{ lang.bind }}</span>
    </div>
    <div
      v-show="userInfo.googleAccount"
      class="bind-email">
      <div>{{ showGoogleAccount }}</div>
      <div>{{ lang.alreadyBind }}</div>
    </div>
  </div>
</template>

<script>
import { Email } from '../../api/require-lee';
export default {
  name: 'MyAccountBind',
  data() {
    return {
      lang: this.$LANGUAGE.personal.account,
      data: {},
      loading: true,
      fbemail: '',
      ggmail: '',
      state: {}
    };
  },
  computed: {

    userInfo() {
      console.log('userInfo====>', this.state.userInfo || {});
      return this.state.userInfo || {};
    },

    showFacebookAccount() {
      let hidenLength = 4;
      let result = this.userInfo.facebookAccount;
      if ([undefined, null].indexOf(result) > -1) {
        return result;
      }
      if (result.length < (hidenLength + 1)) {
        let newstr = '';
        for (let n = 0; n < result.length; n++) {
          newstr += '*';
        }
        result = newstr;
      } else {
        let start = Math.floor((result.length - hidenLength) / 2);
        let end = start + hidenLength;
        result = result.slice(0, start) + ((new Array(hidenLength)).fill('*')).join('') + result.slice(end, result.length);
      }
      return result;
    },
    showGoogleAccount() {
      let hidenLength = 4;
      let result = this.userInfo.googleAccount;
      if ([undefined, null].indexOf(result) > -1) {
        return result;
      }
      if (result.length < (hidenLength + 1)) {
        let newstr = '';
        for (let n = 0; n < result.length; n++) {
          newstr += '*';
        }
        result = newstr;
      } else {
        let start = Math.floor((result.length - hidenLength) / 2);
        let end = start + hidenLength;
        result = result.slice(0, start) + ((new Array(hidenLength)).fill('*')).join('') + result.slice(end, result.length);
      }
      return result;
    }
  },
  created() {
    // this.state = this.$store.state;
    // console.log(this.state.userInfo.facebookAccount, this.state.userInfo.googleAccount);
    this.getData();
  },
  methods: {
    getData() {
      this.$axiosGet('/web/user/me').then(res => {
      // console.log(res)
        if (res.code === 200) {
          this.$set(this.state, 'userInfo', res.data);
          // this.state.userInfo = res.data;
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      }).catch(err => {
        console.log(err);
      });
    },
    checkEmail(e, type) {
      if (!Email.test(e)) {
        this.$message.error(this.lang.emailGood);
        return;
      }
      this.$axiosPost('/web/myAccount/bindEmail', {
        email: e,
        type: type
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: this.lang.bindSuccess,
            type: 'success'
          });
          if (type === 1) {
            this.state.userInfo.googleAccount = e;
          } else if (type === 2) {
            this.state.userInfo.facebookAccount = e;
          }
        } else {
          this.$message.error(res.msg);
        }
        // console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>
.mabind {
  text-align: left;
}
.mabind img {
  display: block;
  width: 130px;
  height: 36px;
  cursor: pointer;
  margin-bottom: 10px;
}
.bind-input {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}
.bind-input input {
  width: 250px;
  height: 30px;
  line-height: 30px;
  -webkit-appearance: none;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: 1px solid #666;
  outline: 0;
  margin-right: 10px;
}
.bind-input span {
  cursor: pointer;
}
.bind-email {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}
.bind-email div:nth-child(1) {
  margin-right: 18px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
