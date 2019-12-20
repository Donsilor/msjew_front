import Vue from 'vue'
import TopBar from '@/components/topBar'
import FooterBar from '@/components/footerBar'
import MessageBox from '@/components/messageBox'
import PictureVerificationCode from '@/components/pictureVerificationCode'
import SendEmailCode from '@/components/sendEmailCode'
import Swiper from '@/components/swiper'
import NoMoreData from '@/components/no-more-data'
import Empty from '@/components/empty'
import Step from '@/components/step'

// 个人中心
import PersonalAccount from '@/components/personal/account'
import PersonalAddress from '@/components/personal/address'
import PersonalCoupon from '@/components/personal/coupon'
import PersonalPsw from '@/components/personal/password'

Vue.use(TopBar)
Vue.use(FooterBar)
Vue.use(MessageBox)
Vue.use(PictureVerificationCode)
Vue.use(SendEmailCode)
Vue.use(Swiper)
Vue.use(NoMoreData)
Vue.use(Empty)
Vue.use(Step)

// 个人中心
Vue.use(PersonalAccount)
Vue.use(PersonalAddress)
Vue.use(PersonalCoupon)
Vue.use(PersonalPsw)
