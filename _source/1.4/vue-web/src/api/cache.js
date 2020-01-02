import storage from 'good-storage';
import store from '@/store/index';

const TOKEN = '__TOKEN__';
const CUR_ACCOUNT = '__CUR_ACCOUNT__';
const CART_LIST = '__CART_LIST__';
const CART_NUM = '__CART_NUM__';
const CART_GOODS = '__CART_GOODS__';
const CART_LEFT_GOODS = '__CART_LEFT_GOODS__';
const WISH_LIST = '__WISH_LIST__';
const WISH_NUM = '__WISH_NUM__';
const DIAMOND_LIST = '__DIAMOND_LIST__';
const CUSTOM = '__CUSTOM__';
const TOW_CUSTOM = '__TOW_CUSTOM__';
const DIAMOND_DETAILS = '__DIAMOND_DETAILS__';
/***************************************************************/
// 退出需要执行的操作
export function logout() {
  storage.remove(TOKEN);
  deleteCookie('token');
  // clearCartList();
  // setCartNum(0);
  // clearWishList();
  // setWishNum(0);
  // clearDiamondList();
  // 清除用户所选的定制数据
  // clearCustom();
  // clearTwoCustom();
  // clearDiamondDetails();
  store.dispatch('logout');
  store.dispatch('getCartGoodsNum');
  store.dispatch('getWishGoodsNum');
}

// 设置购物车列表清单goodsCartList
export function setCartList(CartList) {
  storage.set(CART_LIST, CartList);
}
// 获取购物车列表清单goodsCartList
export function getCartList() {
  return storage.get(CART_LIST, null);
}
// 清除购物车列表清单
export function clearCartList() {
  storage.remove(CART_LIST);
}

// 设置购物车商品数量
export function setCartNum(cartNum) {
  storage.set(CART_NUM, cartNum);
  store.commit('setCartGoodsNum', cartNum);
}
// 获取购物车商品数量
export function getCartNum() {
  return storage.get(CART_NUM, 0);
}

// 设置匿名购物车带去结算的商品
export function setCartGoods(CartGoods) {
  storage.set(CART_GOODS, CartGoods);
}
// 获取匿名购物车带去结算的商品
export function getCartGoods() {
  return storage.get(CART_GOODS, null);
}
// 清除匿名购物车带去结算的商品
export function clearCartGoods() {
  storage.remove(CART_GOODS);
}

// 设置匿名购物车剩下的商品
export function setCartLeftGoods(CartLeftGoods) {
  storage.set(CART_LEFT_GOODS, CartLeftGoods);
}
// 获取匿名购物车剩下的商品
export function getCartLeftGoods() {
  return storage.get(CART_LEFT_GOODS, null);
}
// 清除匿名购物车剩下的商品
export function clearCartLeftGoods() {
  storage.remove(CART_LEFT_GOODS);
}

// 设置心愿单
export function setWishList(WishList) {
  storage.set(WISH_LIST, WishList);
}
// 获取心愿单
export function getWishList() {
  return storage.get(WISH_LIST, null);
}
// 清除心愿单
export function clearWishList() {
  storage.remove(WISH_LIST);
}
// 设置心愿单商品数量
export function setWishNum(wishNum) {
  storage.set(WISH_NUM, wishNum);
  store.commit('setWishGoodsNum', wishNum);
}
// 获取心愿单商品数量
export function getWishNum() {
  return storage.get(WISH_NUM, 0);
}

// 设置钻石对比
export function setDiamondList(DiamondList) {
  storage.set(DIAMOND_LIST, DiamondList);
}
// 获取钻石对比
export function getDiamondList() {
  return storage.get(DIAMOND_LIST, null);
}
// 清除钻石对比
export function clearDiamondList() {
  storage.remove(DIAMOND_LIST);
}

// 设置定制第一步信息
export function setCustom(Custom) {
  storage.set(CUSTOM, Custom);
}
// 获取定制第一步信息
export function getCustom() {
  return storage.get(CUSTOM, null);
}
// 清除定制第一步信息
export function clearCustom() {
  storage.remove(CUSTOM);
}

// 设置定制第二步信息
export function setTwoCustom(TwoCustom) {
  storage.set(TOW_CUSTOM, TwoCustom);
}
// 获取定制第二步信息
export function getTwoCustom() {
  return storage.get(TOW_CUSTOM, null);
}
// 清除定制第二步信息
export function clearTwoCustom() {
  storage.remove(TOW_CUSTOM);
}

// 设置定制钻石信息
export function setDiamondDetails(TwoCustom) {
  storage.set(DIAMOND_DETAILS, TwoCustom);
}
// 获取定制钻石信息
export function getDiamondDetails() {
  return storage.get(DIAMOND_DETAILS, null);
}
// 清除定制钻石信息
export function clearDiamondDetails() {
  storage.remove(DIAMOND_DETAILS);
}

// 设置token
export function setToken(token) {
  storage.set(TOKEN, token);
  setCookie('token', token);
}

// 获取token
export function getToken() {
  return getCookie('token') || storage.get(TOKEN, null);
}
// 清除token
export function clearToken() {
  storage.remove(TOKEN);
  deleteCookie('token');
}

// session
// 设置当前账号到sessionStore
export function setAccount(acount) {
  storage.session.set(CUR_ACCOUNT, acount);
}
// 获取 当前账号到sessionStore中
export function getAccount() {
  return storage.session.get(CUR_ACCOUNT);
}
// 清除 当前账号到sessionStore中
export function clearAccount() {
  storage.session.remove(CUR_ACCOUNT);
}

// 设置当前token到sessionStore
export function setSessionToken(token) {
  storage.session.set(TOKEN, token);
}
// 获取 当前token到sessionStore中
export function getSessionToken() {
  return storage.session.get(TOKEN);
}
// 清除 当前sessionStore中de token
export function clearSessionToken() {
  storage.session.remove(TOKEN);
}

// 设置cookie
export function setCookie(cname, cvalue) {
  // document.cookie = cname + '=' + cvalue;
  document.cookie = `${cname}=${cvalue}; path=/;`;
}
// 获取cookie
export function getCookie(cname) {
  let cookies = document.cookie.split(';');
  let token = '';
  for (var i = 0; i < cookies.length; i++) {
    var c = cookies[i].split('=');
    if (c[0] == cname) {
      token = c[1];
    }
  }
  return token;
}
// 删除cookie
export function deleteCookie(name, domain, path, secure) {
  setCookie(name, '', Date(0), domain, path, secure);
}

/***************************************************************/

// 封装弹窗提示
export function msgBoxing(r, self) {
  self.$refs[r].boxShowUp();
  return new Promise((resolve, reject) => {
    let el = self.$refs[r].$el;
    // console.log('el===>', el);
    let buttonSure = el.getElementsByClassName('btn-sure')[0];
    let buttonCancel = el.getElementsByClassName('btn-cancel')[0];
    // console.log(buttonSure, buttonCancel);
    buttonSure.addEventListener('click', () => {
      resolve(true);
    }, false);
    buttonCancel.addEventListener('click', () => {
      resolve(false);
    }, false);
  });
}
