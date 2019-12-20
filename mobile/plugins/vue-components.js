import Vue from 'vue'
import Input from '@/components/input'
import ConfirmBox from '@/components/confirm-box'
import ChooseEject from '@/components/choose-eject'
import Toast from '@/components/toast'
import ProgressBar from '@/components/progress-bar'
import CaratBar from '@/components/diamond-progress/carat-bar'
import ColorBar from '@/components/diamond-progress/color-bar'
import ClarityBar from '@/components/diamond-progress/clarity-bar'
import CutBar from '@/components/diamond-progress/cut-bar'
import LusterBar from '@/components/diamond-progress/luster-bar'
import SymmetryBar from '@/components/diamond-progress/symmetry-bar'
import WhiteBoard from '@/components/white-board'
import SizeBoard from '@/components/white-board/size-board'
import SiteSwitch from '@/components/white-board/site-switch'
import DiamondChoose from '@/components/white-board/diamond-choose'
import CaratChoose from '@/components/white-board/carat-choose'
import ColorChoose from '@/components/white-board/color-choose'
import ClarityChoose from '@/components/white-board/clarity-choose'
import CutChoose from '@/components/white-board/cut-choose'
import OrderExpress from '@/components/white-board/order-express'
import OrderTex from '@/components/white-board/order-tex'
import OrderSafe from '@/components/white-board/order-safe'
import Swiper from '@/components/swiper'
import SwiperTap from '@/components/swiper-tap'
import SliderVerify from '@/components/slider-verify'
import SendEmailCode from '@/components/send-email-code'
import TopBar from '@/components/top-bar'
import FooterBar from '@/components/footer-bar'
import ScrollBox from '@/components/scroll-box'
import Empty from '@/components/empty'
import Requesting from '@/components/requesting'
import NoMoreData from '@/components/no-more-data'
import LiveChat from '@/components/live-chat'
import TipMessage from '@/components/tip-message'

Vue.use(Input)
Vue.use(ConfirmBox)
Vue.use(Toast)

Vue.use(ChooseEject)

Vue.use(Swiper)

Vue.use(SliderVerify)
Vue.use(SendEmailCode)
Vue.use(TopBar)
Vue.use(FooterBar)

//  列表滑动到底加载
Vue.use(ScrollBox)

//  钻石列表筛选点问号的弹窗
Vue.use(WhiteBoard)
Vue.use(SiteSwitch)
Vue.use(DiamondChoose)
Vue.use(CaratChoose)
Vue.use(ColorChoose)
Vue.use(ClarityChoose)
Vue.use(CutChoose)
Vue.use(SizeBoard)

//  列表底部弹起滚轮（select）
Vue.use(SwiperTap)

//  列表底部弹起进度条
Vue.use(ProgressBar)
Vue.use(CaratBar)
Vue.use(ColorBar)
Vue.use(ClarityBar)
Vue.use(CutBar)
Vue.use(LusterBar)
Vue.use(SymmetryBar)
Vue.use(Empty)
Vue.use(Requesting)
Vue.use(NoMoreData)

//  订单
Vue.use(OrderExpress)
Vue.use(OrderTex)
Vue.use(OrderSafe)

Vue.use(LiveChat)
Vue.use(TipMessage)
