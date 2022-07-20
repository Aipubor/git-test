import { reqGetCode, reqLogOut, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { getItem, setToken, removeToken } from "@/utils/token"
export default {
    namespaced: true,
    actions: {
        //获取验证码
        async getCode({ commit }, phone) {
            //获取验证码这个接口，把验证码返回，正常情况下，后台把验证码发到用户手机上（省钱）
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                commit('GETCODE', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //用户注册
        async UserRegister({ commit }, user) {
            let result = await reqUserRegister(user)

            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //用户登录
        async userLogin({ commit }, user) {
            let result = await reqUserLogin(user)
            //服务器下发token，用户唯一标识符（uuid）
            //将来经常通过token找服务器要用户信息进行展示
            console.log(result.data.token, '2');
            if (result.code == 200) {
                commit('USERLOGIN', result.data.token)
                //持久化存储token
                setToken(result.data.token)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //获取用户信息
        async userInfo({ commit }) {
            let result = await reqUserInfo()
            console.log(result, 3);
            if (result.code == 200) {
                commit('USERINFO', result.data)
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //退出登录
        async userLogOut({ commit }) {
            //只是向服务器发起一次请求，通知服务器清除token
            let result = await reqLogOut()
            //actions中不能操作state,提交mutations操作state
            if (result.code == 200) {
                commit('CLEAR')
            }else{
                return Promise.reject(new Error('faile'))
                
            }
        }
    },
    mutations: {
        GETCODE(state, code) {
            state.code = code
        },
        USERLOGIN(state, token) {
            state.token = token
        },
        USERINFO(state, userInfo) {
            state.userInfo = userInfo
        },
        CLEAR(state) {
            //本地存储数据清空
            state.token = '',
                state.userInfo = {},
                removeToken()
        }
    },
    state: {
        code: '',
        token: getItem(),
        userInfo: {}
    },
    getters: {}
}