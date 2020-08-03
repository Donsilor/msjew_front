<template>
  <div>
    <member v-if="$store.getters.hadLogin"></member>
    <stranger v-else @login="toLogin"></stranger>
    <login-pop v-if="ifLogin" @closeLogin="closeLogin"></login-pop>
  </div>
</template>

<script>
import stranger from './order-pay/stranger'
import member from './order-pay/member'
import loginPop from '../../pageComponents/login-pop/index'
export default {
  components: {
    stranger,
    member,
    loginPop
  },
  data() {
    return{
      ifLogin: false
    }
  },
  methods: {
    toLogin() {
      this.ifLogin = true
    },
    closeLogin() {
      this.ifLogin = false
    }
  }
}
</script>

<style scoped></style>
