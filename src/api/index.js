//API进行统一管理
import requests from "./request";
import mockRequests from './mockAjax'

//三级联动接口
// /api/product/getBaseCategoryList   get  无参数

    //发送请求：axios发请求返回结果Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqGetBannerList=()=>mockRequests({url:'/banner',method:'get'})
export const reqGetFloorList=()=>mockRequests({url:'/floor',method:'get'})
//获取搜索模块数据
//需要携带参数
export const reqGetSearchInfo=(data)=>requests({url:'/list',method:'post',data})
//获取商品详情
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'});
//将产品添加到购物车中
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'})
export const reqShopCartList=()=>requests({url:'/cart/cartList',method:'get'})
export const reqDeleteCarById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//修改购物车商品选中状态
export const reqChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
//获取验证码
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
//注册
export const reqUserRegister=(data)=>requests({url:`/user/passport/register`,method:'post',data})
//登录
export const reqUserLogin=(data)=>requests({url:`/user/passport/login`,method:'post',data})
//获取用户信息
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
//退出登录
export const reqLogOut=()=>requests({url:'/user/passport/logout',methods:'get'})
//获取用户地址信息
export const reqUserAddress=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取商品清单
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})
//提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
//获取订单支付信息·
export const reqPayOrder=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
//获取支付订单状态
///payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
//获取个人中心数据
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})