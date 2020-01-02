// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import router from './router';
import App from './App.vue';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import store from '@/store/index';
import {axiosPost, axiosGet, postJsonRequest, axiosPostAll} from '@/api/user-axios';
import { IMG_URL } from '@/api/paramsConfig.js';
import { msgBoxing } from '@/api/cache.js';
import zh_TW from '@/assets/lang/zh_TW.json';
import en_US from '@/assets/lang/en_US.json';
import '@/common/style/base.css';
import '@/common/style/common.css';
import '@/common/iconfont/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css';

import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification
} from 'element-ui';

Vue.use(ElementUI);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.use(ColorPicker);
Vue.use(Transfer);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.config.productionTip = false;
Vue.prototype.$axiosPost = axiosPost;
Vue.prototype.$axiosGet = axiosGet;
Vue.prototype.$postJsonRequest = postJsonRequest;
Vue.prototype.$axiosPostAll = axiosPostAll;
Vue.prototype.IMG_URL = IMG_URL;
Vue.prototype.$msgBoxing = msgBoxing;
Vue.prototype.$LANGUAGE = localStorage.getItem('locale') === 'en_US' ? en_US : zh_TW;
Vue.prototype.$imageStrToArray = str => {
  const ERROR_IMAGE = '';
  if (!str) {
    return [ERROR_IMAGE];
  }
  if (str.length > 0) {
    if (str.indexOf(',') > -1) {
      const images = str.split(',').map(item => {
        return item.indexOf('/') === 0 ? item : `${IMG_URL}${item}`;
      });
      return images.length > 0 ? images : [ERROR_IMAGE];
    } else {
      return [str.indexOf('/') === 0 ? str : `${IMG_URL}${str}`];
    }
  } else {
    return [ERROR_IMAGE];
  }
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  created() {
  },
  template: '<App/>'
});
