
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//二级路由组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/center',
        component: Center,
        redirect: '/center/myorder',
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: myOrder,
                meta: { show: true }

            },
            {
                path: 'grouporder',
                component: groupOrder,
                meta: { show: true }

            },
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }

    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if(from.path=='/trade'){
                next()
            }else{
                //从其他路由而来，停留在当前
                next(false)
            }
        }
    

    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        //路由独享守卫
beforeEnter: (to, from, next) => {
    // 去交易页面，必须是从购物车而来
    if(from.path=='/shopcart'){
        next()
    }else{
        //从其他路由而来，停留在当前
        next(false)
    }
}
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }

    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }

    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/home',
        //路由懒加载，当跳转到该路由时路由组件才会被引入加载
        component: ()=>import('../pages/Home'),
        meta: { show: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import('../pages/Search'),
        meta: { show: false }

    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false },
    }
]