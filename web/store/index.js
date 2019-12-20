// import Vuex from 'vuex'
import Mutations from './mutations.js'
import Getters from './getters.js'
import Actions from './actions.js'

export const state = () => {
  return {
    pageInfo: {},
    lastUrl: '',
    coin: '',
    language: '',
    token: '',
    userInfo: {
      account: null,
      age: null,
      birthday: null,
      code: null,
      email: null,
      facebookAccount: null,
      gender: null,
      googleAccount: null,
      id: null,
      integral: null,
      location: null,
      marStatus: null,
      membershipLevel: null,
      mobile: null,
      name: null,
      password: null,
      registrationDate: null,
      revEmail: null,
      salt: null,
      status: null,
      surname: null
    },

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
