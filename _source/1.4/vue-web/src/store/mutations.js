const mutations = {
  switchLang(state, info) {
    state.switchLang = info;
  },
  switchCurrency(state, type) {
    state.currencyType = type;
  },
  setToken(state, val, token) {
    state.userInfo = val;
    state.token = token;
    state.isLogin = true;
  },
  unsetToken(state, val) {
    state.userInfo = '';
    state.token = '';
    state.isLogin = false;
  },
  setCartGoodsNum(state, val) {
    state.cartGoodsNum = val;
  },
  setWishGoodsNum(state, val) {
    state.wishGoodsNum = val;
  }
};

export default mutations;
