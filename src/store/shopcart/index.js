import { reqChecked, reqDeleteCarById, reqShopCartList } from "@/api";
export default {
    namespaced: true,
    actions: {
        async getCartList({ commit }) {
            let result = await reqShopCartList()
            if (result.code == 200) {
                commit('GETCARTLIST', result.data)
            }
        },
        async deleteCartList({ commit }, skuId) {
            let result = await reqDeleteCarById(skuId)
            if (result.code == 200) {
                //成功
                return 'ok'
            } else {
                //失败
                return Promise.reject(new Error('faile'))
            }
        },
        //勾选请求
        async updateCheckedById({ commit }, { skuId, isChecked }) {
            let result = await reqChecked(skuId, isChecked)
            console.log(result.code);
            if (result.code == 200) {
                //成功
                return 'ok'
            } else {
                //失败
                return Promise.reject(new Error('faile'))
            }
        },
        //删除全部勾选产品
        deleteChecked({ dispatch, getters }) {
            //context:小仓库，commit,getter,dispatch,sate
            let PromiseAll = []
            //获取购物车中全部的产品
            getters.cartList.cartInfoList.forEach(item => {
                let promise = item.isChecked == 1 ? dispatch('deleteCartList', item.skuId) : ''
                //将每一个Promise放入数组
                PromiseAll.push(promise)
            });
            return Promise.all(PromiseAll)

        },
        //修改全部产品的状态
        updateAllCartIsChecked({ dispatch, state }, isChecked) {
            let PromiseAll = []
            state.cartList[0].cartInfoList.forEach(element => {
                element.isChecked = isChecked
                // console.log({ skuId: element.skuId, isChecked: element.isChecked })

                let promise = dispatch('updateCheckedById', { skuId: element.skuId, isChecked: element.isChecked })
                PromiseAll.push(promise)
            });
            console.log(PromiseAll)
            return Promise.all(PromiseAll)
        }
    },
    mutations: {
        GETCARTLIST(state, cartList) {
            state.cartList = cartList
        }
    },
    state: { cartList: [] },
    getters: {
        cartList(state) {
            return state.cartList[0] || []
        }
    }
}