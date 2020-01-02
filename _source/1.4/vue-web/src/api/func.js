import {
  setCartList,
  getCartList,
  setCartNum,
  getCartNum,
  setWishList,
  getWishList,
  setWishNum,
  getWishNum,
  setDiamondList,
  getDiamondList
} from '@/api/cache.js';
import {axiosPost, axiosGet, postJsonRequest} from '@/api/user-axios';
import store from '@/store/index';
import zh_TW from '@/assets/lang/zh_TW.json';
import en_US from '@/assets/lang/en_US.json';
import {Loading, Message} from 'element-ui';
const lang = localStorage.getItem('locale') === 'en_US' ? en_US.func : zh_TW.func;

// ===========用户模块
// 添加购物车
export const addCard = (type, item, item2) => {
	console.log('888', lang)
//  goodsId: this.detail.goodsId, //对戒（组id）和定制为数组
//  goodsDetailsId: this.detail.id,//对戒（组id）和定制为数组
// groupType: null, //(1-对戒类型,2-定制类型) ,
//  groupId: null//对戒（组id）和定制时传（自定义时间戳）
  let data = {
    addType: type, // 类别1:普通批量添加,2:登录批量添加 ,
    goodsCartList: [item] // item为对象
  };
  if (item2) {
    data.goodsCartList = item2;
  }
  // 登录添加至数据库
  if (store.state.isLogin) {
    postJsonRequest(`web/goodsCart/add`, data).then(res => {
      if (res.data.code === 200) {
        if (type !== 2) {
          Message.success({
            message: lang.addCart
          });
          store.commit('setCartGoodsNum', store.getters.cartGoodsNum + 1);
        } else {
          store.dispatch('getCartGoodsNum');
        }
      } else {
        if (type !== 2) {
          Message.error({
            message: res.data.msg
          });
        }
      }
    });
  } else { // 未登录添加到本地
    let cartList = getCartList();
    let cartNum = getCartNum();
    if (cartList) {
      if (cartNum >= 30) {
        Message.error({
          message: lang.cartFull
        });
      } else {
        cartList.unshift(data.goodsCartList[0]);
        if (data.goodsCartList.length === 2) {
          cartList.unshift(data.goodsCartList[1]);
        }
        setCartList(cartList);
        let cartGoodsNum = store.getters.cartGoodsNum + 1;
        setCartNum(cartGoodsNum);
        Message.success({
          message: lang.addCart
        });
      }
    } else {
      setCartList(data.goodsCartList);
      let cartGoodsNum = 1;
      setCartNum(cartGoodsNum);
      Message.success({
        message: lang.addCart
      });
    }
  }
};

export const addWish = (addType, type, userCollectionList) => {
  //  userCollectionList:[
  //  goodsId (integer, optional): 商品ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
  //  groupId (integer, optional): 组合ID 注意：goodsId 和 groupId 是互斥的,只能同时一个值不为null ,
  //  id (integer, optional): 主键 ,
  //  ]

  let data = {
    addType: addType, // 类别(1:普通批量添加,2:登录批量添加 ,,
    type: type, // 类别(1:心愿单 2:钻石对比 3:对戒匹配(wu)) ,
    userCollectionList: [userCollectionList]
  };
  if (addType == 2) {
    data.userCollectionList = userCollectionList;
  }
  // 登录添加至数据库
  if (store.state.isLogin) {
    postJsonRequest(`web/collection/addList`, data).then(res => {
      if (res.data.code === 200) {
        if (addType !== 2) {
          Message.success({
            message: lang.Added
          });
          // setWishNum(getWishNum() + 1);
          store.commit('setWishGoodsNum', store.getters.wishGoodsNum + 1);
        } else {
          store.dispatch('getWishGoodsNum');
        }
      } else {
        if (addType !== 2) {
          Message.error({
            message: res.data.msg
          });
        }
      }
    });
  } else { // 未登录添加到本地
    let createTime = new Date().getTime();
    data.userCollectionList[0]['createTime'] = createTime;
    if (data.userCollectionList.length == 2) {
      data.userCollectionList['createTime'] = createTime;
    }
    if (data.type === 1) {
      let wistList = getWishList();
      if (wistList && wistList.length > 0) {
        for (let i = 0; i < wistList.length; i++) {
          if ((data.userCollectionList[0].groupId && (data.userCollectionList[0].groupId === wistList[i].groupId)) || (data.userCollectionList[0].goodsId && (data.userCollectionList[0].goodsId === wistList[i].goodsId))) {
            Message.error({
              message: lang.existed
            });
            return;
          }
        }
        if (wistList.length >= 30) {
          Message.error({
            message: lang.StorageFull
          });
        } else {
          wistList.unshift(data.userCollectionList[0]);
          if (data.userCollectionList.length == 2) {
            wistList.unshift(data.userCollectionList[1]);
          }
          setWishList(wistList);
          setWishNum(getWishNum() + 1);
          Message.success({
            message: lang.Added
          });
        }
      } else {
        setWishList(data.userCollectionList);
        setWishNum(getWishNum() + 1);
        Message.success({
          message: lang.Added
        });
      }
    } else if (type === 2) {
      let diamondList = getDiamondList();
      if (diamondList && diamondList.length > 0) {
        for (let i = 0; i < diamondList.length; i++) {
          if ((data.userCollectionList[0].groupId && (data.userCollectionList[0].groupId === diamondList[i].groupId)) || (data.userCollectionList[0].goodsId && (data.userCollectionList[0].goodsId === diamondList[i].goodsId))) {
            Message.error({
              message: lang.existed
            });
            return;
          }
        }
        if (diamondList.length >= 10) {
          Message.error({
            message: lang.StorageFull
          });
        } else {
          diamondList.unshift(data.userCollectionList[0]);
          if (data.userCollectionList.length == 2) {
            diamondList.unshift(data.userCollectionList[1]);
          }
          setDiamondList(diamondList);
          Message.success({
            message: lang.Added
          });
        }
      } else {
        setDiamondList(data.userCollectionList);
        Message.success({
          message: lang.Added
        });
      }
    }
  }
};
// 获取用户登录信息

// 列表数据归类
export const settleList = (res) => {
  let loseGoods = {
    full: [],
    single: [],
    couple: []
  };
  let goods = {
    full: [],
    single: [],
    couple: []
  };
  if (res === null || res.length === 0) return {goods: goods, loseGoods: loseGoods};
  for (let i in res) {
    // 判断商品属性，groupType为1时是对戒
    if (res[i].groupType === 1) {
      // 通过循环在当前商品往后的商品里寻找groupId相同的商品，组成对，存入数组。（往后找就能做到去重，因为前面把后面找到了，后面的再往后找就没有了）
      let k = parseInt(i) + 1;
      for (let j = k; j < res.length; j++) {
        //  判断相同的组ID
        if (res[j].groupId === res[i].groupId) {
          //  判断是否是同一对对戒
          if (res[j].createTime === res[i].createTime) {
            // 定义一个新对象用做v-for
            let o = {
              tick: false,
              price: 0,
              data: {
                first: res[i],
                second: res[j]
              },
              loading: false,
              type: ''
            };
            o.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.goodsImages = o.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.goodsImages.split(',')[0];
            o.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.goodsImages = o.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.goodsImages.split(',')[0];
            o.price = parseFloat(o.data.first.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice) + parseFloat(o.data.second.ringsSimpleGoodsEntity.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice);
            o.type = 3;
            // 判断商品是否失效，ringsSimpleGoodsEntity.status为1是有效
            if (res[i].ringsSimpleGoodsEntity.status === 1 && res[i].ringsSimpleGoodsEntity.simpleGoodsEntity.goodsStatus === 2 && res[j].ringsSimpleGoodsEntity.simpleGoodsEntity.goodsStatus) {
              goods.couple.push(o);
            } else {
              loseGoods.couple.push(o);
            }
            break;
          }
        }
      }
    } else if (res[i].groupType === 2) {
      // 判断商品属性，groupType为2时是定制
      let k = parseInt(i) + 1;
      for (let j = k; j < res.length; j++) {
        // 通过循环在当前商品往后的商品里寻找groupId相同的商品，组成对，存入数组。（往后找就能做到去重，因为前面把后面找到了，后面的再往后找就没有了）
        if (res[j].groupId === res[i].groupId) {
          // 定义一个新对象用做v-for
          let o = {
            tick: false,
            price: 0,
            data: {
              first: res[i].simpleGoodsEntity.categoryId === 1 ? res[j] : res[i],
              second: res[j].simpleGoodsEntity.categoryId === 1 ? res[j] : res[i]
            },
            loading: false,
            type: ''
          };
          o.data.first.simpleGoodsEntity.goodsImages = o.data.first.simpleGoodsEntity.goodsImages.split(',')[0];
          o.data.second.simpleGoodsEntity.goodsImages = o.data.second.simpleGoodsEntity.goodsImages.split(',')[0];
          o.price = parseFloat(o.data.first.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice || 0) + parseFloat(o.data.second.simpleGoodsEntity.simpleGoodsDetails.retailMallPrice || 0);
          o.type = 2;
          if (res[i].simpleGoodsEntity.goodsStatus === 2 && res[j].simpleGoodsEntity.goodsStatus === 2) {
            goods.single.push(o);
          } else {
            loseGoods.single.push(o);
          }
        }
      }
    } else {
      // 判断商品属性，groupType为其他情况时是成品
      // 定义一个新对象用做v-for
      let o = {
        tick: false,
        price: 0,
        data: res[i],
        loading: false,
        type: ''
      };
      o.data.simpleGoodsEntity.goodsImages = o.data.simpleGoodsEntity.goodsImages.split(',')[0];
      o.price = parseFloat(res[i].simpleGoodsEntity.simpleGoodsDetails.retailMallPrice);
      o.type = 1;
      if (res[i].simpleGoodsEntity.goodsStatus === 2) {
        goods.full.push(o);
      } else {
        loseGoods.full.push(o);
      }
    }
  }
  return {goods: goods, loseGoods: loseGoods};
};
