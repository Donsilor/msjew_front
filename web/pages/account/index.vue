<template>
  <div class="personal">
    <div class="container">
      <div class="left-box">
        <div class="userTypeImg">
          <img :src="headerImage" />
        </div>
        <div class="bddVip">
          <span>{{ $t(`${lang}.index.bddco`) }}</span>
          <img
            src="../../static/personal/edit.png"
            class="editBtn"
            @click="toPersonalAccount"
          />
        </div>
        <div class="email">{{ showEmail }}</div>
        <div class="middle-line" />
        <div class="link-box">
          <nuxt-link
            v-for="(item, index) in leftList"
            :key="index"
            :to="{ path: item.url }"
          >
            <div class="link">
              <img :src="item.img" class="link-icon" />
              <span class="link-name">{{ item.name }}</span>
            </div>
          </nuxt-link>
        </div>
        <div class="middle-line" />
      </div>
      <div class="right-box">
        <!--        <router-view v-if="token" />-->
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
const lang = 'personal'
export default {
  name: 'Index',
  middleware: 'mustLogin',
  data() {
    return {
      lang,
      token: '',
      leftList: [
        {
          img: require('../../static/personal/order.png'),
          url: '/account/orders',
          name: this.$t(`${lang}.index.order`)
        },
        {
          img: require('../../static/personal/account.png'),
          url: '/account/settings',
          name: this.$t(`${lang}.index.account`)
        },
        // {
        //   img: require('../../static/images/personal/comment.png'),
        //   url: '/account/comment',
        //   name: this.$t(`${lang}.index.comment`)
        // },
        {
          img: require('../../static/personal/wish.png'),
          url: '/account/wish-list',
          name: this.$t(`${lang}.index.wish`)
        },
        {
          img: require('../../static/personal/diamondContrast.png'),
          url: '/account/diamond-compare',
          name: this.$t(`${lang}.index.compare`)
        }
      ]
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    showEmail() {
      const hidenLength = 4
      let result = this.userInfo.email
      if (result) {
        result = result.split('@')
        if (result[0].length < hidenLength + 1) {
          let newstr = ''
          for (let n = 0; n < result[0].length; n++) {
            newstr += '*'
          }
          result[0] = newstr
        } else {
          result[0] =
            result[0].slice(0, result[0].length - hidenLength) +
            new Array(hidenLength).fill('*').join('')
        }
      } else {
        result = []
      }
      if (!result.length) {
        result = ''
      } else {
        result = result.join('@')
      }
      return result
    },
    headerImage() {
      const header = {
        1: require('../../static/personal/account/men.png'),
        2: require('../../static/personal/account/women.png')
      }
      return (
        header[this.userInfo.gender] ||
        require('../../static/personal/account/unknown.png')
      )
    }
  },
  created() {},
  mounted() {
    // if (!this.$store.getters.hadLogin) {
    //   this.$router.replace(`/login`)
    // }
  },
  methods: {
    toPersonalAccount() {
      this.$router.replace(`/account/settings`)
    }
  }
}
</script>

<style scoped lang="less">
.personal {
  width: 1360px;
  min-height: 990px;
  margin: 0 auto;
  padding: 20px 40px;
  background: #f5f3f1;
  /*border-top: 1px solid #000000;*/
  .container {
    width: 100%;
    display: flex;
    .left-box {
      width: 264px;
      height: 540px;
      background: rgba(255, 255, 255, 1);
      padding: 40px 30px 0;
      box-sizing: border-box;
      .userTypeImg {
        width: 100px;
        height: 100px;
        margin-bottom: 30px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bddVip {
        width: 100%;
        font-size: 14px;
        color: #333;
        line-height: 24px;
        display: flex;
        align-items: center;
        .editBtn {
          margin-left: 10px;
        }
      }
      .email {
        width: 100%;
        font-size: 14px;
        color: #333;
        line-height: 24px;
        margin-bottom: 29px;
      }
      .middle-line {
        width: 100%;
        height: 1px;
        background: #ccc;
        margin-bottom: 29px;
      }
      .link {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        .link-icon {
          width: 19px;
          height: 16px;
          display: block;
          margin-right: 25px;
        }
        .link-name {
          display: block;
          font-size: 16px;
          line-height: 16px;
          color: #333;
        }
      }
      .nuxt-link-active {
        .link {
          .link-name {
            color: #f29b87;
          }
        }
      }
    }
    .right-box {
      width: 1000px;
      padding: 40px 30px 20px;
      min-height: 1100px;
      background: #ffffff;
      margin-left: 16px;
    }
  }
}
</style>
