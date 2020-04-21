// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import i18n from '@/lang'
import store from './store'
import 'font-awesome/css/font-awesome.css'
import VueParticles from 'vue-particles'
import * as libs from '@/utils/libs.js'
Vue.use(VueParticles)

import {
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
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
  DatePicker,
  Tooltip,
  Tabs,
  TabPane,
  Tag,
  Table,
  TableColumn,
  Slider,
  Icon,
  Row,
  Col,
  Progress,
  Steps,
  Step,
  ColorPicker,
  Transfer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Form,
  FormItem,
  Alert,
} from 'element-ui'

// 引入两国语言包和本地化对象
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

// locale.use(zhLocale)
// 设置语言
if (localStorage.lang) {
  if (localStorage.lang === 'ch') {
    locale.use(zhLocale)
  } else {
    locale.use(enLocale)
  }
} else {
  locale.use(zhLocale)
}


Vue.use(Dialog)
Vue.use(Autocomplete)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(DatePicker)
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Tag)
Vue.use(Slider)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Progress)
Vue.use(Steps)
Vue.use(Step)
Vue.use(ColorPicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading.directive)
Vue.use(Alert)

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 允许携带cookie
axios.defaults.withCredentials = true

// Add a request interceptor
axios.interceptors.request.use(function(config) {
  // 所有请求添加语言标识
  config.headers.lang = localStorage.lang || 'ch'
  return config;
}, function(error) {
  return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
