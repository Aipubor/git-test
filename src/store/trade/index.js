import { reqOrderInfo, reqUserAddress } from "@/api";
export default {
    namespaced: true,
    actions: {
        async getUserAddress({ commit }) {
            let result = await reqUserAddress()
            if (result.code == 200) {
                commit('GETUSERADDRESS', result.data)
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //获取商品清单数据
        async getOrderInfo({ commit }) {
            let result = await reqOrderInfo()
            if (result.code == 200) {
                commit('GETOEDERINFO', result.data)
            }
        }
    },
    mutations: {
        GETUSERADDRESS(state, address) {
            state.address = address
        },
        GETOEDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo
        }
    },
    state: {
        address: [],
        orderInfo: {}
    },
    getters: {}
}