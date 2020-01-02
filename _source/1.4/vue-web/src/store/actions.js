import { axiosGet, postJsonRequest } from '@/api/user-axios';
import { settleList } from '@/api/func.js';
import { getToken, getCartNum, getWishNum, setToken, setCartNum, setWishNum, getCartList, clearCartList, getWishList, setCartList } from '@/api/cache.js';

const actions = {
  logout(context) {
    context.commit('unsetToken');
    // context.commit('setCartGoodsNum', 0);
    // context.commit('setWishGoodsNum', 0);
  },
  getCartGoodsNum(context) {
    let token = getToken();
    if (token) {
      axiosGet('/web/goodsCart/list')
        .then(res => {
          let goods = settleList(res);
          let num = 0;
          for (let n in goods) {
            for (let m in goods[n]) {
              num += goods[n][m].length;
            }
          }
          // context.commit('setCartGoodsNum', num);
          setCartNum(num);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      let localArr = getCartList();
      // console.log('no1===>', this.localArr);

      //  判断本地购物车列表是否为空
      if (localArr === null) {
        setCartNum(0);
        return;
      }
      //  制作获取购物车数据发送的列表
      let usingArr = [];
      let i = 0;
      localArr.forEach(obj => {
        obj.updateTime = i++;
        obj.goodsCount = 1;
        usingArr.push(obj);
      });
      postJsonRequest('/web/goodsCart/postCart', usingArr)
        .then(res => {
          if (res.data.code === 500) {
            this.$message.error(res.data.msg);
            clearCartList();
            setCartNum(0);
            return;
          }
          //  清除本地存储中购物车失效商品
          let arr = [];
          let lastArr = [];
          for (let i in res.data) {
            for (let j = i; j < localArr.length; j++) {
              if (res.data[i].localSn === localArr[j].updateTime) {
                lastArr.push(localArr[j]);
                let o = Object.assign({}, localArr[j]);
                delete o.updateTime;
                delete o.goodsCount;
                arr.push(o);
                break;
              }
            }
          }
          clearCartList();
          setCartList(arr);
          //  转换返回的数据格式
          let data = settleList(res.data);
          this.goods = data.goods;
          //  设置导航栏购物车显示数量
          let cartNum = this.goods.full.length + this.goods.single.length + this.goods.couple.length;
          setCartNum(cartNum);
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  getWishGoodsNum(context) {
    let token = getToken();
    if (token) {
      axiosGet('/web/collection/list', {
        type: 1,
        currPage: 1,
        pageSize: 60
      })
        .then(res => {
          // context.commit('setWishGoodsNum', res.data.list.length);
          setWishNum(res.data.list ? res.data.list.length : 0);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      // context.commit('setWishGoodsNum', getWishNum());
      let wl = getWishList() || [];
      setWishNum(wl.length);
    }
  }
};

export default actions;
