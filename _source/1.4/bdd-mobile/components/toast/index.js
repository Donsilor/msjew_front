import ToastComponent from './toast.vue'

const Toast = {}
Toast.install = function(Vue, options) {
  const opt = {
    defaultType: 'center',
    duration: 2000
  }

  for (const property in options) {
    opt[property] = options[property]
  }

  Vue.prototype.$toast = function(message, option) {
    let callback = null

    if (typeof option === 'object') {
      for (const property in option) {
        if (typeof option[property] === 'function') {
          callback = option[property]
          continue
        }
        opt[property] = option[property]
      }
    } else {
      opt.duration = 2000
    }

    const ToastController = Vue.extend(ToastComponent)
    const instance = new ToastController().$mount(document.createElement('div'))
    instance.message = message
    instance.visible = true
    document.body.appendChild(instance.$el)
    setTimeout(function() {
      instance.visible = false
      setTimeout(() => {
        document.body.removeChild(instance.$el)
        callback && callback()
      }, 200)
    }, opt.duration)
  }
  ;['show', 'success', 'info', 'error'].forEach(function(type) {
    Vue.prototype.$toast[type] = function(tips, option) {
      return Vue.prototype.$toast(tips, option)
    }
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Toast)
}

export default Toast
