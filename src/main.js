import Vue from 'vue'
import App from './App.vue'
//引入路由
import {router} from './router'
//测试
// import { reCategoryList } from './api'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import store from '@/store'
import'@/mock/mockServe'

//引入swiper样式
import 'swiper/css/swiper.css'
import Carousel from '@/components/Carousel'
Vue.config.productionTip = false

//第一个参数：全局组件的名字 第二个参数：哪个组件
Vue.component(TypeNav.name,TypeNav)

//轮播图组件
Vue.component(Carousel.name,Carousel)

//分页器组件
import PageNation from '@/components/PageNation'
Vue.component(PageNation.name,PageNation)

//引入图标
import './assets/iconfont/iconfont.css'
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api'

//引入需要的elementUI组件
import {MessageBox} from 'element-ui'
//注册全局组件
// Vue.component(MessageBox.name,MessageBox)
//还有一种注册方法是挂载到原型上
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$alert=MessageBox.alert

//懒加载
import VueLazyload from 'vue-lazyload'
import xiaomao from '@/assets/xiaomao.webp'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: errorimage,
  //懒加载默认图片
  loading: xiaomao,
  attempt: 1
})


//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})

//引入表单校验插件
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  //注册路由信息：当这里书写router时，组件身上都有$router和$route属性
  router,
  //注册仓库：组件实例中会多一个$store属性
  store,

beforeCreate(){
  Vue.prototype.$bus=this,
  Vue.prototype.$API=API

},
}).$mount('#app')
