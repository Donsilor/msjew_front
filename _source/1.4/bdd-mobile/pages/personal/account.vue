<template>
  <div class="account">
    <Header :title="lang.header" />
    <div class="content">
      <h5>{{ lang.title }}</h5>
      <p class="email">{{ date.email }}</p>
      <div class="mod">
        <Single
          :name="lang.sex"
          :list="lang.sexList"
          :val="date.gender"
          @close="choice1"
        />
        <div class="input-mod">
          <bdd-input
            v-model="date.name"
            :placeholder="lang.name"
            @blur="textName"
          ></bdd-input>
        </div>
        <div :class="['error-message', { active: !trueName }]">
          {{ lang.nametips }}
        </div>
        <div class="input-mod">
          <bdd-input
            v-model="date.surname"
            :placeholder="lang.surname"
            @blur="textSurname"
          ></bdd-input>
        </div>
        <div :class="['error-message', { active: !trueSurname }]">
          {{ lang.surnametips }}
        </div>
        <Single
          :name="lang.marriage"
          :list="lang.marriageList"
          :val="date.marStatus"
          @close="choice2"
        />
        <div class="margin-top-20 datepicker">
          <div class="demo">
            {{ birthday ? birthday : lang.birthday }}
            <i id="time" class="icon iconfont iconriqi" @click="test"> </i>
          </div>
        </div>
        <p class="tips">{{ lang.tips }}</p>
        <div class="btn-common btn-pink btn" @click="saveInfo">
          {{ lang.saveInfo }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/personal/header.vue'
import Single from '@/components/personal/single.vue'
import moment from 'moment'
export default {
  head: {
    script: [{ src: '/Mdate.js' }, { src: '/iScroll.js' }],
    link: [{ rel: 'stylesheet', href: '/Mdate.css' }]
  },
  name: 'Account',
  layout: 'no-bar',
  components: {
    Header,
    Single
  },
  data() {
    return {
      lang: this.LANGUAGE.personal.account,
      name: '',
      surname: '',
      birthday: null,
      trueName: true,
      date: this.$route.query,
      trueSurname: true
    }
  },
  created() {
    this.getinfo()
  },
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
    test() {
      if (window.Mdate && !this.date.birthday) {
        new window.Mdate('time', {
          format: '-',
          okTxt: this.lang.okTxt,
          year: this.lang.year,
          month: this.lang.month,
          day: this.lang.day,
          cb: date => {
            this.birthday = date
          }
        })
      }
    },
    getinfo() {
      const _this = this
      _this
        .$axios({
          method: 'get',
          url: `/wap/user/me`
        })
        .then(res => {
          this.date = res
          if (this.date.birthday) {
            this.birthday =
              moment(this.date.birthday).format('YYYY') +
              '-' +
              moment(this.date.birthday).format('MM') +
              '-' +
              moment(this.date.birthday).format('DD')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    choice1(val) {
      this.date.gender = val
    },
    choice2(val) {
      console.log(val)
      this.date.marStatus = val
    },
    textSurname() {
      console.log(this.date, 'dsgdf')
      if (this.date.surname === '' || this.date.surname.length > 20) {
        this.$toast.show(this.lang.toast1)
      }
    },
    textName() {
      console.log(this.date.name, 'dsgdf')
      if (this.date.name === '' || this.date.name.length > 20) {
        this.$toast.show(this.lang.toast2)
      }
    },
    saveInfo() {
      if (this.date.surname === '' || this.date.surname.length > 20) {
        this.$toast.show(this.lang.toast1)
        return
      }
      if (this.date.name === '' || this.date.name.length > 20) {
        this.$toast.show(this.lang.toast2)
        return
      }
      if (this.birthday) {
        this.date.birthday = moment(this.birthday).format('x')
      }
      this.$axios({
        method: 'post',
        url: '/wap/myAccount/updateBaseUserInfo',
        data: {
          surname: this.date.surname,
          name: this.date.name,
          revEmail: this.date.revEmail,
          gender: this.date.gender, // 性别（0-保密，1-男，2-女）
          marStatus: this.date.marStatus, // （0-已婚，1-未婚，2-再婚）
          birthday: this.date.birthday
        }
      })
        .then(res => {
          this.$toast.show(this.lang.toast3)
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
        .catch(err => {
          this.$toast.show(err.message)
        })
    }
  }
}
</script>

<style scoped lang="less">
.account {
  .content {
    margin: 0 36px;
    h5 {
      margin-top: 40px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .email {
      margin: 10px 0 40px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
    .mod {
      .input-mod {
        display: inline-block;
        padding: 10px 0px;
        width: 100%;
      }
      .error-message {
        display: none;
        font-size: 12px;
        padding-left: 10px;
        text-align: left;
        color: #ed4949;
      }
      .active {
        display: block;
      }
      .tips {
        font-size: 12px;
        line-height: 18px;
        font-weight: 400;
        text-align: center;
        margin: 10px 0 50px;
        color: rgba(154, 141, 133, 1);
      }
      .btn {
        width: 100%;
      }
      .datepicker {
        width: 100%;
        .demo {
          width: 100%;
          height: 40px;
          padding: 0 14px;
          background: rgba(249, 249, 249, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          text-align: left;
          font-size: 14px;
          line-height: 40px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          .icon {
            float: right;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
