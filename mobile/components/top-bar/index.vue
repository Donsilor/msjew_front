<template>
  <div :class="['top-bar', { fixed: fixed }]">
    <div class="left">
      <div class="icon" @click="showMenu">
        <i class="iconfont iconcebianlan"></i>
      </div>
      <!--      <div class="icon" @click="toSiteSwitch">-->
      <!--        <i class="iconfont iconweizhiyuyan"></i>-->
      <!--      </div>-->
    </div>
    <div class="center">
      <img src="/logo.png" class="logo" @click="toIndex" />
    </div>
    <div class="right">
      <div class="icon" @click="toPersonal">
        <i class="iconfont icongerenzhongxin"></i>
      </div>
      <div class="icon" @click="toCart">
        <i class="iconfont icongouwuche"></i>
        <span v-if="cartAmount > 0" class="cart-amount">{{ cartAmount }}</span>
      </div>
    </div>

    <left-menu ref="left-menu"></left-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LeftMenu from '../left-menu/index.vue'
export default {
  components: {
    LeftMenu
  },
  props: {
    fixed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    ...mapGetters(['cartAmount'])
  },
  mounted() {
    const _this = this
    _this.$nextTick(() => {
      _this.getCartAmount()
    })
  },
  methods: {
    ...mapActions(['getCartAmount']),
    showMenu() {
      this.$refs['left-menu'].show()
    },
    toSiteSwitch() {
      this.$router.push({
        name: 'site-switch',
        query: {
          redirectUri: window.location.href
        }
      })
    },
    toIndex() {
      this.$router.push({
        name: 'index'
      })
    },
    toPersonal() {
      this.$router.push({
        name: 'personal'
      })
    },
    toCart() {
      this.$router.push({
        name: 'cart'
      })
    }
  }
}
</script>

<style scoped>
.top-bar {
  position: relative;
  width: 100%;
  height: 44px;
  padding: 0 18px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(187, 187, 187, 0.35); /*no*/
  display: flex;
  align-items: stretch;
  justify-content: center;
}
.top-bar.fixed {
  position: fixed;
}
.left,
.right {
  position: relative;
  flex-basis: 50px;
  flex-grow: 1;
  flex-shrink: 1;
  /*background-color: #3b5998;*/
  display: flex;
  align-items: center;
}
.left {
  justify-content: flex-start;
}
.right {
  justify-content: flex-end;
}
.center {
  position: relative;
  flex-basis: 150px;
  flex-grow: 0;
  flex-shrink: 0;
  /*background-color: #f29b88;*/
}

.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 111px;
  max-width: 100%;
  max-height: 100%;
}
.iconfont {
  font-size: 20px;
  color: #333333;
}
.icon {
  position: relative;
}
.left .icon:nth-of-type(1) {
  margin-right: 25px;
}
.right .icon:nth-of-type(1) {
  margin-right: 33px;
}
.cart-amount {
  position: absolute;
  top: 0;
  left: 50%;
  width: 18px;
  height: 18px;
  line-height: 19px;
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
  font-size: 9px;
  font-weight: 400;
  background-color: #f29b87;
}
</style>
