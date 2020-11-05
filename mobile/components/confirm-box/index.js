import Vue from 'vue'

const Component = Vue.extend(require('./index.vue').default)

// 定义并注册组件
const Info = {
  install: function(Vue) {
    let instance
    const instances = []
    let seed = 1

    const confirmBox = function(options) {
      const id = 'confirm_' + seed++

      // 对参数进行处理
      if (typeof options === 'string') {
        options = {
          message: options
        }
      }

      options = options || {}
      options.close = function() {
        for (let n = 0; n < instances.length; n++) {
          if (instances[n].id === id) {
            instances.splice(n, 1)
            break
          }
        }
      }

      instance = new Component({
        data: options
      })
      instance.id = id
      instance.vm = instance.$mount()
      instance.vm.visible = true
      instance.dom = instance.vm.$el

      // console.log(instance);
      // console.log(instance.vm);
      // console.log(instance.dom);

      document.body.appendChild(instance.dom)

      // 添加到数组中
      instances.push(instance)
    }

    Vue.prototype.$ConfirmBox = confirmBox
  }
}

// 导出组件
export default Info
