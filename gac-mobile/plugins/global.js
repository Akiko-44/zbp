// 注册全局组件、指令、过滤器
import Vue from 'vue'
import * as filters from '~/utils/filters'
import * as directives from '~/utils/directives'
import AppView from '~/components/common/view'

import echarts from 'echarts'
import clipboard from 'clipboard'

import {
  isQiniuImage
} from '~/utils/qiniu'
import {
  getToken
} from '~/utils/auth'
import {
  toFixed
} from '~/utils/shared'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

//import {
//Card,
//Cell,
//CellGroup,
//Button,
//Icon,
//Tabbar,
//Tab,
//Tabs,
//TabbarItem,
//NavBar,
//Row,
//Col,
//List,
//PullRefresh,
//Lazyload,
//Dialog,
//RadioGroup,
//Radio,
//Swipe,
//SwipeItem,
//Actionsheet,
//TreeSelect,
//Toast,
//Loading,
//Circle,
//Field,
//Picker,
//Popup,
//Rate,
//GoodsAction,
//GoodsActionBigBtn,
//GoodsActionMiniBtn,
//Sku,
//Checkbox,
//CheckboxGroup,
//Tag,
//NoticeBar,
//DatetimePicker,
//SubmitBar,
//AddressList,
//AddressEdit,
//Switch,
//Stepper,
//Badge,
//BadgeGroup,
//CouponCell,
//CouponList,
//CollapseItem,
//Collapse,
//Step,
//Steps,
//NumberKeyboard,
//Search,
//Area
//} from 'vant'
//
//import 'vant/lib/vant-css/base.css'
//import 'vant/lib/vant-css/tab.css'
//import 'vant/lib/vant-css/tabbar.css'
//import 'vant/lib/vant-css/nav-bar.css'
//import 'vant/lib/vant-css/row.css'
//import 'vant/lib/vant-css/col.css'
//import 'vant/lib/vant-css/list.css'
//import 'vant/lib/vant-css/pull-refresh.css'
//import 'vant/lib/vant-css/dialog.css'
//import 'vant/lib/vant-css/radio.css'
//import 'vant/lib/vant-css/swipe.css'
//import 'vant/lib/vant-css/actionsheet.css'
//import 'vant/lib/vant-css/tree-select.css'
//import 'vant/lib/vant-css/toast.css'
//import 'vant/lib/vant-css/circle.css'
//import 'vant/lib/vant-css/field.css'
//import 'vant/lib/vant-css/picker.css'
//import 'vant/lib/vant-css/popup.css'
//import 'vant/lib/vant-css/goods-action.css'
//import 'vant/lib/vant-css/sku.css'
//import 'vant/lib/vant-css/stepper.css'
//import 'vant/lib/vant-css/uploader.css'
//import 'vant/lib/vant-css/checkbox.css'
//import 'vant/lib/vant-css/tag.css'
//import 'vant/lib/vant-css/notice-bar.css'
//import 'vant/lib/vant-css/submit-bar.css'
//import 'vant/lib/vant-css/address-list.css'
//import 'vant/lib/vant-css/address-edit.css'
//import 'vant/lib/vant-css/switch.css'
//import 'vant/lib/vant-css/badge.css'
//import 'vant/lib/vant-css/coupon-list.css'
//import 'vant/lib/vant-css/card.css'
//import 'vant/lib/vant-css/collapse.css'
//import 'vant/lib/vant-css/steps.css'
//import 'vant/lib/vant-css/number-keyboard.css'
//import 'vant/lib/vant-css/search.css'
//
//Vue.use(Button)
//.use(Step)
//.use(Steps)
//.use(Card)
//.use(Cell)
//.use(CellGroup)
//.use(Icon)
//.use(Tabbar)
//.use(TabbarItem)
//.use(NavBar)
//.use(Row)
//.use(Col)
//.use(List)
//.use(PullRefresh)
//.use(Dialog)
//.use(Tab)
//.use(Tabs)
//.use(RadioGroup)
//.use(Radio)
//.use(Swipe)
//.use(SwipeItem)
//.use(Actionsheet)
//.use(TreeSelect)
//.use(Toast)
//.use(Loading)
//.use(Circle)
//.use(Field)
//.use(Picker)
//.use(Popup)
//.use(Rate)
//.use(GoodsAction)
//.use(GoodsActionBigBtn)
//.use(GoodsActionMiniBtn)
//.use(Sku)
//.use(Checkbox)
//.use(CheckboxGroup)
//.use(Tag)
//.use(NoticeBar)
//.use(DatetimePicker)
//.use(SubmitBar)
//.use(AddressList)
//.use(AddressEdit)
//.use(Switch)
//.use(Stepper)
//.use(Badge)
//.use(BadgeGroup)
//.use(CouponCell)
//.use(CouponList)
//.use(CollapseItem)
//.use(Collapse)
//.use(NumberKeyboard)
//.use(Search)
//.use(Area)
//.use(Lazyload, {
//  error: require('~/assets/images/broken_image.svg'),
//  attempt: 1,
//  filter: {
//    webp(listener, {
//      supportWebp
//    }) {
//      if (isQiniuImage(listener.src)) {
//        const options = supportWebp ?
//          {
//            format: 'webp'
//          } :
//          null
//        listener.src = filters.setImg(listener.src, options)
//      }
//    }
//  }
//})

Vue.component('AppView', AppView)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.prototype.$setImg = filters.setImg
Vue.prototype.$isLogin = getToken
Vue.prototype.$toFixed = toFixed
Vue.prototype.$echarts = echarts

//注册到vue原型上
Vue.prototype.clipboard = clipboard
import {Lazyload} from 'vant'
Vue.use(Lazyload)
Vue.use(Vant)
