<template>
  <div class="page">
    <div class="bg"></div>
    <div class="content">
      <div class="row-flex justify-around align-item-stretch tabs">
        <span
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab-item', { active: activeTab === tab.key }]"
          @click="changeActiveTab(tab)"
          >{{ tab.name }}</span
        >
      </div>
      <div class="tab-content">
        <!--        登录模块-->
        <login v-if="activeTab === 'login'" @typeK = "loginTy"></login>

        <!--        注册模块-->
        <register v-if="activeTab === 'register'"></register>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/mixins/input.js'
import Login from '@/pageComponents/login/login.vue'
import Register from '@/pageComponents/login/register.vue'
const lang = 'login'
export default {
  components: {
    Login,
    Register
  },
  mixins: [Input],
  data() {
    return {
      lang,
      activeTab: this.$route.query.type || '',
      tabs: [
        {
          key: 'login',
          name: this.$t(`${lang}.login`)
        },
        {
          key: 'register',
          name: this.$t(`${lang}.registration`)
        }
      ],
      language: '',
      loginType: 1 || this.$route.query.loginType
    }
  },
  computed: {},
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    const _this = this
    _this.activeTab = to.query.type || 'login'
    next()
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.activeTab = _this.$route.query.type || 'login'
    })

    this.language = this.getCookie('language')

    var loginT = sessionStorage.getItem('loginT');
    
    if(loginT){
      this.loginType = loginT
    }else{
      // 大陆站点 登录方式为手机登录
      if(this.$store.state.platform == 20){
        this.loginType = 1;
      }else{
        if(this.language == "zh_CN"){
          this.loginType = 1
        }else{
          this.loginType = 2;
        }
      }

      sessionStorage.setItem('loginT', this.loginType)
    }

  },
  methods: {
    // 查询cookie
    getCookie(cname) {
      const name = cname + '='
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return ''
    },
    // 切换tab
    changeActiveTab(tab) {
      // console.log(this.loginType)
      // return
      this.$router.replace({
        path: '/login',
        query: {
          type: tab.key,
          loginType: this.loginType
        }
      })
    },
    loginTy(r) {
      this.loginType = r;
      sessionStorage.setItem('loginT', this.loginType)
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem('loginT')
  }
}
</script>

<style scoped lang="less">
.page {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 90vh;

  .bg {
    width: 100%;
    // height: 550px;  necklace  bg
    height: 100%;
    min-height: 90vh;
    background-image: url('/login/necklace.png'), url('/login/bg.png');
    background-repeat: no-repeat, no-repeat;
    background-size: cover, cover;
  }

  .content {
    position: absolute;
    top: 110px;
    right: 140px;
    width: 360px;
    background-color: #ffffff;
    padding: 12px 40px 0 40px;
    box-sizing: border-box;

    .tabs {
      height: 45px;
      border-bottom: 1px solid rgba(236, 236, 236, 1);

      .tab-item {
        cursor: pointer;
        padding: 0 9px;
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        line-height: 45px;
        box-sizing: border-box;

        &.active {
          color: #a88f82;
          border-bottom: 2px solid #a88f82;
        }
      }
    }

    .tab-content {
    }
  }
}
</style>
