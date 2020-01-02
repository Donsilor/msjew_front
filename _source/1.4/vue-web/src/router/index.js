import Vue from 'vue';
import Router from 'vue-router';

// 主页
import Main from '@/pages/main';

// 购物车
import Cart from '@/pages/cart/index';
import CartOut from '@/pages/cart/cartOut';

// 登录注册忘记密码
import Login from '@/pages/login/index';
import ForgetPassword from '@/pages/login/forgetPassword';

import Index from '@/pages/index';
// 个人中心
import Personal from '@/pages/personal/index';
import Account from '@/pages/personal/rightTaps/account';
import Comment from '@/pages/personal/rightTaps/comment';
import DiamondContrast from '@/pages/personal/rightTaps/diamondContrast';
import Footprint from '@/pages/personal/rightTaps/footprint';
import MatchRing from '@/pages/personal/rightTaps/matchRing';
import userOrder from '@/pages/personal/rightTaps/userOrder';
import Wish from '@/pages/personal/rightTaps/wish';
import Detail from '@/pages/personal/rightTaps/orderDetail';
import doComment from '@/pages/personal/rightTaps/doComment';

// 订单
import Order from '@/pages/order/index';
import OrderOut from '@/pages/order/orderOut';
import PayFailed from '@/pages/order/payFailed';
import Pay from '@/pages/order/pay';
import Finished from '@/pages/order/finished';
import EFinished from '@/pages/order/eFinished';
import FinishedOut from '@/pages/order/finishedOut';

// 搜索主页
// 钻石
import Diamond from '@/pages/content/diamond/index';
// 求婚鉆戒
import EngagementRing from '@/pages/content/engagementRing/index';
// 結婚戒指
import WeddingRing from '@/pages/content/weddingRing/index';
// 珠寶飾品
import JewelleryAccessories from '@/pages/content/jewelleryAccessories/index';
// 對戒
import RightRing from '@/pages/content/rightRing/index';

// 二级落地页
// 钻石
import DiamondDetails from '@/pages/content/diamond/details';
// 求婚鉆戒
import EngagementRingDetails from '@/pages/content/engagementRing/details';
// 結婚戒指
import WeddingRingDetails from '@/pages/content/weddingRing/details';

// 产品详情页
// 钻石
import SeleceDiamond from '@/pages/content/diamond/seleceDiamond';
// 求婚鉆戒
import SeleceEngagement from '@/pages/content/engagementRing/seleceEngagement';
// 結婚戒指
import SeleceWedding from '@/pages/content/weddingRing/seleceWedding';
// 珠寶飾品
import SeleceJewellery from '@/pages/content/jewelleryAccessories/seleceJewellery';
// 對戒
import SeleceRightRing from '@/pages/content/rightRing/seleceRightRing';

// 知識頁
import knowledgePage from '@/pages/content/knowledgePage/details';
// 訂婚戒指
import diamondHome from '@/pages/content/knowledgePage/diamondHome';
// 結婚戒指
import ringHome from '@/pages/content/knowledgePage/ringHome';
// 鑽石護理
import diamondCare from '@/pages/content/knowledgePage/diamondCare';
// 證明說明
import proof from '@/pages/content/knowledgePage/proof';
//
import diamondShape from '@/pages/content/knowledgePage/diamondShape';
import diamondCut from '@/pages/content/knowledgePage/diamondCut';
import diamondCarat from '@/pages/content/knowledgePage/diamondCarat';
import diamondCleanliness from '@/pages/content/knowledgePage/diamondCleanliness';
import diamondColor from '@/pages/content/knowledgePage/diamondColor';

// 问答
import questionPage from '@/pages/content/questionPage/details';
import returnedGoods from '@/pages/content/questionPage/returnedGoods';
import clause from '@/pages/content/questionPage/clause';
import privacyPolicy from '@/pages/content/questionPage/privacyPolicy';
import jewelryInsurance from '@/pages/content/questionPage/jewelryInsurance';
import qualityValue from '@/pages/content/questionPage/qualityValue';
import freeShipping from '@/pages/content/questionPage/freeShipping';
import deliveryPolicy from '@/pages/content/questionPage/deliveryPolicy';
import paymentMethod from '@/pages/content/questionPage/paymentMethod';
import internationalPolicy from '@/pages/content/questionPage/internationalPolicy';
import contact from '@/pages/content/questionPage/contact';
import ringSize from '@/pages/content/questionPage/ringSize';

// 搜索结果
import search from '@/pages/content/search/index';
// 定制第三步
import custom from '@/pages/content/custom';
// 品牌故事
import brandStory from '@/pages/content/brandStory';
// 活动页
import doubleEleven from '@/pages/activity/doubleEleven';
import noun from '@/pages/activity/noun';

import {getCustom, getTwoCustom, getToken} from '@/api/cache.js';
import {axiosPost, axiosGet, postJsonRequest, axiosPostAll} from '@/api/user-axios';

Vue.use(Router);

const router = new Router({
  mode: 'history', // 去掉url中的#
  savedPosition: true,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  beforeRouteLeave(to, from, next) {
    let position = document.documentElement.scrollTop;
    this.$store.commit('SAVE_POSITION', position); // 离开路由时把位置存起来
  },
  routes: [
    // 登录
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // 注册
    {
      path: '/forgetpassword',
      name: 'forgetpassword',
      component: ForgetPassword
    },
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'index',
          component: Index
        },
        {
          path: '/search/:content',
          name: 'search',
          component: search,
          meta: {
            keepAlive: true // 需要被缓存
          }
        },
        {
          path: '/searchSimilar/:goodsId/:categoryId',
          name: 'searchSimilar',
          component: search
        },
        {
          path: '/custom/:id',
          name: 'custom',
          component: custom
        },
        {
          path: '/brandStory',
          name: 'brandStory',
          component: brandStory
        },
        {
          path: '/personal',
          name: 'personal',
          component: Personal,
          children: [
            {
              path: '/',
              redirect: {
                name: 'account'
              }
            },
            {
              path: 'account',
              name: 'account',
              component: Account
            },
            {
              path: 'comment',
              name: 'comment',
              component: Comment
            },
            {
              path: 'diamondContrast',
              name: 'diamondContrast',
              component: DiamondContrast
            },
            {
              path: 'footprint',
              name: 'footprint',
              component: Footprint
            },
            {
              path: 'matchRing',
              name: 'matchRing',
              component: MatchRing
            },
            {
              path: 'user-order',
              name: 'userOrder',
              component: userOrder
            },
            {
              path: 'wish',
              name: 'wish',
              component: Wish
            },
            {
              path: 'detail/:orderId',
              name: 'detail',
              component: Detail
            },
            {
              path: 'doComment/:orderId',
              name: 'doComment',
              component: doComment
            }
          ]
        },
        {
        // 产品列表页路由
          path: '/diamond/:id/:key',
          name: 'diamond',
          component: Diamond
        //         meta: {
        //           keepAlive: true // 需要被缓存
        //         }
        },
        {
          path: '/engagementRing/:id/:key',
          name: 'engagementRing',
          component: EngagementRing
        //         meta: {
        //           keepAlive: true // 需要被缓存
        //         }
        },
        {
          path: '/weddingRing/:id/:key',
          name: 'weddingRing',
          component: WeddingRing
        //         meta: {
        //           keepAlive: true // 需要被缓存
        //         }
        },
        {
          path: '/rightRing/:id',
          name: 'rightRing',
          component: RightRing
        //         meta: {
        //           keepAlive: true // 需要被缓存
        //         }
        },
        {
          path: '/jewelleryAccessories/:id/:key',
          name: 'jewelleryAccessories',
          component: JewelleryAccessories
        //         meta: {
        //           keepAlive: true // 需要被缓存
        //         }
        },
        // 产品二级落地页
        {
          path: '/engagement',
          redirect: to => {
            return {
              name: 'engagementRingDetails'
            };
          }
        },
        {
          path: '/engagementRingDetails',
          name: 'engagementRingDetails',
          component: EngagementRingDetails
        },
        {
          path: '/marriage-ring',
          redirect: to => {
            return {
              name: 'weddingRingDetails'
            };
          }
        },
        {
          path: '/weddingRingDetails',
          name: 'weddingRingDetails',
          component: WeddingRingDetails
        },
        {
          path: '/diamondDetails',
          name: 'diamondDetails',
          component: DiamondDetails
        },
        // 产品详情页
        {
          path: '/diamond/diamonds',
          redirect: to => {
            return {
              name: 'seleceDiamond',
              params: {
                id: to.query.goodId,
                key: 2
              }
            };
          }
        },
        {
          path: '/seleceDiamond/:id/:key',
          name: 'seleceDiamond',
          component: SeleceDiamond
        },
        {
          path: '/engagement/engagement-rings',
          redirect: to => {
            return {
              name: 'seleceEngagement',
              params: {
                id: to.query.goodId,
                key: 2
              }
            };
          }
        },
        {
          path: '/seleceEngagement/:id/:key',
          name: 'seleceEngagement',
          component: SeleceEngagement
        },
        {
          path: '/marriage-ring/single-ring-detail',
          redirect: to => {
            return {
              name: 'seleceWedding',
              params: {
                id: to.query.goodId
              }
            };
          }
        },
        {
          path: '/seleceWedding/:id',
          name: 'seleceWedding',
          component: SeleceWedding
        },
        {
          path: '/accessories/accessories',
          redirect: to => {
            return {
              name: 'seleceJewellery',
              params: {
                id: to.query.goodId,
                key: 1
              }
            };
          }
        },
        {
          path: '/seleceJewellery/:id/:key',
          name: 'seleceJewellery',
          component: SeleceJewellery
        },
        {
          path: '/marriage-ring/pair-ring-detail',
          redirect: to => {
            return {
              name: 'seleceRightRing',
              params: {
                id: to.query.ringId
              }
            };
          }
        },
        {
          path: '/seleceRightRing/:id',
          name: 'seleceRightRing',
          component: SeleceRightRing
        },

        // 問答
        {
          path: '/questionPage',
          name: 'questionPage',
          component: questionPage,
          redirect: '/returnedGoods',
          children: [
          // 品質與價值
            {
              path: '/qualityValue',
              name: 'qualityValue',
              component: qualityValue
            },
            // 退换货
            {
              path: '/returnedGoods',
              name: 'returnedGoods',
              component: returnedGoods
            },
            // 珠寶保險
            {
              path: '/jewelryInsurance',
              name: 'jewelryInsurance',
              component: jewelryInsurance
            },
            // 免費送遞
            {
              path: '/freeShipping',
              name: 'freeShipping',
              component: freeShipping
            },
            // 所獲政策
            {
              path: '/deliveryPolicy',
              name: 'deliveryPolicy',
              component: deliveryPolicy
            },
            // 隱私政策
            {
              path: '/privacyPolicy',
              name: 'privacyPolicy',
              component: privacyPolicy
            },
            // 使用條款
            {
              path: '/clause',
              name: 'clause',
              component: clause
            },
            // 付款方式
            {
              path: '/paymentMethod',
              name: 'paymentMethod',
              component: paymentMethod
            },
            // 国际政策
            {
              path: '/internationalPolicy',
              name: 'internationalPolicy',
              component: internationalPolicy
            },
            // 联络我们
            {
              path: '/contact',
              name: 'contact',
              component: contact
            },
            // 找出您的戒指尺寸
            {
              path: '/ringSize',
              name: 'ringSize',
              component: ringSize
            }
          ]
        },
        // 知識頁
        {
          path: '/knowledgePage',
          name: 'knowledgePage',
          component: knowledgePage,
          redirect: '/diamondHome',
          // 訂婚戒指
          children: [
            {
              path: '/diamondHome',
              name: 'diamondHome',
              component: diamondHome
            },
            // 結婚戒指
            {
              path: '/ringHome',
              name: 'ringHome',
              component: ringHome
            },
            // 鑽石護理
            {
              path: '/diamondCare',
              name: 'diamondCare',
              component: diamondCare
            },
            { // 證明說明
              path: '/proof',
              name: 'proof',
              component: proof
            },
            { // 鑽石形狀
              path: '/diamondShape',
              name: 'diamondShape',
              component: diamondShape
            },
            { // 鑽石切工
              path: '/diamondCut',
              name: 'diamondCut',
              component: diamondCut
            },
            { // 钻石克拉重量
              path: '/diamondCarat',
              name: 'diamondCarat',
              component: diamondCarat
            },
            { // 鑽石净度
              path: '/diamondCleanliness',
              name: 'diamondCleanliness',
              component: diamondCleanliness
            },
            {
              // 鑽石顏色
              path: '/diamondColor',
              name: 'diamondColor',
              component: diamondColor
            }

          ]
        },
        {
          path: '/cart',
          name: 'Cart',
          component: Cart
        },
        {
          path: '/cartout',
          name: 'CartOut',
          component: CartOut
        },
        {
          path: '/order/:carList',
          name: 'order',
          component: Order
        },
        {
          path: '/orderout',
          name: 'orderOut',
          component: OrderOut
        },
        {
          path: '/cart/paySuccess/:orderId/:price/:coinType',
          name: 'finished',
          component: Finished
        },
        {
          path: '/efinished/:orderId/:price/:coinType',
          name: 'efinished',
          component: EFinished
        },
        {
          path: '/finished-out/:orderId/:price/:coinType',
          name: 'finishedOut',
          component: FinishedOut
        },
        {
          path: '/pay/:orderId/:price/:coinType',
          name: 'pay',
          component: Pay
        },
        {
          path: '/cart/payFailed/:orderId/:price/:coinType',
          name: 'payFailed',
          component: PayFailed
        },

        // 活动页
        {
          path: '/activity/special-1111',
          name: 'doubleEleven',
          component: doubleEleven
        },
        // 圣诞活动页
        {
          path: '/activity/christams',
          name: 'noun',
          component: noun
        }
      ]
    },
    {
      path: '*',
      redirect: {name: 'index'}
    }
  ]
});
let enterFirst = true;
router.beforeEach((to, from, next) => {
  // // 移动端详情url转化为pc端对应详情url
  // if (to.path === '/diamond/diamonds') {
  //   router.replace({
  //     path: `/seleceDiamond/${to.query.goodId}/2`
  //   });
  // } else if (to.path === '/accessories/accessories') {
  //   router.replace({
  //     path: `/seleceJewellery/${to.query.goodId}/1`
  //   });
  // } else if (to.path === '/marriage-ring/single-ring-detail') {
  //   router.replace({
  //     path: `/seleceWedding/${to.query.goodId}`
  //   });
  // } else if (to.path === '/engagement/engagement-rings') {
  //   router.replace({
  //     path: `/seleceEngagement/${to.query.goodId}/2`
  //   });
  // } else if (to.path === '/marriage-ring/pair-ring-detail') {
  //   router.replace({
  //     path: `/seleceRightRing/${to.query.ringId}`
  //   });
  // } else if (to.path === '/marriage-ring') {
  //   router.replace({
  //     path: `/weddingRingDetails`
  //   });
  // } else if (to.path === '/engagement') {
  //   router.replace({
  //     path: `/engagementRingDetails`
  //   });
  // }

  let token = getToken();
  if (to.name == 'login') {
    if (token) {
      router.replace({
        name: 'index'
      });
    }
  }
  if (to.name == 'custom') {
    let firstInfo = getCustom();
    let twoInfo = getTwoCustom();
    if (!firstInfo || !twoInfo) {
      router.replace({
        name: 'index'
      });
    }
  }

  // seo优化 设置落地页和首页TDK,//seo优化 商品详情页TDK //默认TDK
  if (to.name == 'diamondDetails' || to.name == 'weddingRingDetails' || to.name == 'engagementRingDetails' || to.name == 'index') {
    let type = 1;
    let mataExplain = '';
    let mataKeyword = '';
    let pageTitle = '';
    if (to.name == 'index') {
      type = 1;
    } else if (to.name == 'engagementRingDetails') {
      type = 2;
    } else if (to.name == 'weddingRingDetails') {
      type = 3;
    } else if (to.name == 'diamondDetails') {
      type = 4;
    } else {
      type = 5;
    }
    axiosGet('/web/WebsiteSeo/queryWebsiteSeo', {type: type}).then(res => {
      if (res.code === 200) {
        var data = res.data;
        mataExplain = res.data.mataExplain;
        mataKeyword = res.data.mataKeyword;
        pageTitle = res.data.pageTitle;
        document.title = pageTitle || '默认title';
        document.querySelector('meta[name="keywords"]').setAttribute('content', mataKeyword);
        document.querySelector('meta[name="description"]').setAttribute('content', mataExplain);
      } else {
        console.log(res.msg);
      }
    });
  } else if (to.name == 'seleceRightRing' || to.name == 'seleceWedding' || to.name == 'seleceDiamond' || to.name == 'seleceJewellery' || to.name == 'seleceEngagement') {
    let mataExplain = '';
    let mataKeyword = '';
    let pageTitle = '';
    let url = '/wap/goods/goodsSeo';
    let data = {
      goodsId: to.params.id
    };
    if (to.name == 'seleceRightRing') {
      url = '/wap/goods/ringSeo';
      data = {
        ringId: to.params.id
      };
    }
    axiosPost(url, data).then(res => {
      if (res.code === 200) {
        var data = res.data;
        mataExplain = res.data.metaDesc;
        mataKeyword = res.data.metaWord;
        pageTitle = res.data.metaTitle;
        document.title = pageTitle || '默认title';
        document.querySelector('meta[name="keywords"]').setAttribute('content', mataKeyword);
        document.querySelector('meta[name="description"]').setAttribute('content', mataExplain);
      } else {
        console.log(res.msg);
      }
    });
  } else {
    axiosGet('/web/goods/getWebsite', {}).then(res => {
      if (res.code === 200) {
        var data = res.data;
        document.getElementsByTagName('title')[0].innerHTML = data.name;
        document.getElementsByTagName('meta')[3].setAttribute('content', data.metaDesc);
        document.getElementsByTagName('meta')[4].setAttribute('content', data.metaKeyword);
      } else {
        Message.error({
          message: res.msg
        });
      }
    });
  }
  next();
});
export default router;
