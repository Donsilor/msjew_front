import Component from './index.vue'

// 定义并注册组件
const Info = {
  install(Vue) {
    Vue.component('send-email-code', Component)
  }
}

// 导出组件
export default Info
