import { reqGoodsInfo } from "@/api"
import { reqAddOrUpdateShopCart } from "@/api"
//封装游客身份的模块uuid---》生成一个随机的字符串
import {getUUID} from '@/utils/uuid_token'
export default {
    namespaced: true,
    actions: {
        async getGoodsInfo({ commit }, skuId) {
            let result = await reqGoodsInfo(skuId)
            if (result.code == 200) {
                commit('GETGOODSINFO', result)
            }
        },
        async addShopCart({commit},{skuId,skuNum}){
            //加入购物车返回的解构
            //加入购物车后，发请求，前台将参数带给服务器
            //服务器写入数据成功，并没有返回其他数据，只是返回code==200代表操作成功
            //因为服务器没有返回其余数据，因此咱们不需要三连环存储数据(服务器存储数据)
            let result=await reqAddOrUpdateShopCart(skuId,skuNum)
            //当前函数如果执行返回Promise
            if(result.code==200){
                //成功
                return 'ok'
            }else{
                //失败
                return Promise.reject(new Error('faile'))
            }
        }
    },
    mutations: {
        GETGOODSINFO(state, goodsInfo) {
            state.goodsInfo = goodsInfo
        },
        
    },
    state: {
        goodsInfo: {},
        //游客临时身份
        uuid_token:getUUID()
       
    },
    getters: {
        categoryView(state) {
            return state.goodsInfo.data.categoryView||{}
        },
        skuInfo(state){
            return state.goodsInfo.data.skuInfo||{}
        },
        //产品售卖属性
        spuSaleAttrList(state){
            return state.goodsInfo.data.spuSaleAttrList||[]
        }
    }
}