import { reqCategoryList,reqGetBannerList,reqGetFloorList } from '@/api'
export default {
    namespaced: true,
    actions: {
        //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
        async categoryList({ commit }) {
            let result = await reqCategoryList();
            if (result.code === 200) {
                commit("CATEGORYLIST", result.data);
            }
        },
        async getBannerList({ commit }) {
            let result = await reqGetBannerList();
            console.log(result);
            if (result.code === 200) {
                commit("BANNERLIST", result.data);
            }
        },
        async getFloorList({ commit }) {
            let result = await reqGetFloorList();
            console.log(result);
            if (result.code === 200) {
                commit("FLOORLIST", result.data);
            }
        },
       
    },
    mutations: {
        CATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList;
        },
        BANNERLIST(state, bannerList) {
            state.bannerList = bannerList;
        },
        FLOORLIST(state,floorList){
            state.floorList=floorList;
        }
    },
    state: {
        //state中数据默认初始值别瞎写，服务器返回对象就写对象，服务器返回数组就写数组。[根据接口返回值初始化的]
        categoryList: [],
        bannerList:[],
        floorList:[]
    },
    getters: {}
}