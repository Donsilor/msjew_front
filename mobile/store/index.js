// import Vuex from 'vuex'
import Mutations from './mutations.js'
import Getters from './getters.js'
import Actions from './actions.js'

// console.log('process.client====>', process.client)

// const createStore = () => {
//   return new Vuex.Store({
//     state: () => ({
//       coin: 'HKD',
//       token: '',
//       userInfo: {},
//
//       /**
//        * 购物车
//        */
//       cartAmount: null,
//       cart: null,
//
//       /**
//        * 心愿单
//        */
//       wishAmount: null,
//       wish: null,
//
//       /**
//        * 对比
//        */
//       comparedAmount: null,
//       compared: null
//     }),
//     mutations: Mutations,
//     actions: Actions,
//     getters: Getters,
//     // 开启严格模式，在此模式下，所有的状态改变只要不是通过mutations的都会报错
//     strict: true
//   })
// }
//
// export default createStore

export const state = () => {
  return {
    lastUrl: '',
    coin: '',
    language: '',
    token: '',
    userInfo: {},

    /**
     * 购物车
     */
    cartAmount: null,
    cart: null,

    /**
     * 心愿单
     */
    wishAmount: null,
    wish: null,

    /**
     * 对比
     */
    comparedAmount: null,
    compared: null
  }
}

export const mutations = Mutations

export const actions = Actions

export const getters = Getters
// 开启严格模式，在此模式下，所有的状态改变只要不是通过mutations的都会报错
export const strict = true
