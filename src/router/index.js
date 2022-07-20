import Vue from "vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from "@/store";
import routes from '@/router/routes'
//先把VueRouter原型对象的push方法保存一份
let orginPush = VueRouter.prototype.push;

//重写push|replace
//第一个参数：告诉原来的push方法，你往哪里跳（传递什么参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        orginPush.call(this, location, resolve, reject)
    } else {
        orginPush.call(this, location, () => { }, () => { })
    }
}
export let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
//全局路由守卫:前置守卫(路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
    // next()
    // to and from are both route objects. must call `next`.
    //next放行函数 next()放行 next(path)跳转到指定路由
    //用户登陆了才会有token
    if (store.state.user.token) {
        //用户已经登陆了还想去login【不能去，停留在首页】
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            //如果用户名已有,存在用户信息
            if (store.state.user.userInfo.name) {
                next()
            } else {
                //没有用户信息派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('user/userInfo')
                    // 放行
                    next()
                } catch (error) {
                    //token过期失效，获取不到用户信息
                    //清除token,退出登录
                    console.log(error.massage);
                    await store.dispatch('user/userLogOut')
                    next('/login')
                }
            }
            next()
        }
    } else {
        //未登录:不能加入购物车，及交易相关页面，个人中心
       let to1=to.path
        if(to1.includes('/center')||to1.includes('/trade')||to1.includes('cart')||to1.includes('/detail')||to1.includes('/pay'))
        next('/login?redirect='+to1)
        else
        next()
    }
})