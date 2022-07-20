//对外暴露一个函数
//存放token
export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}
// 获取token
export const getItem=()=>{
    return localStorage.getItem('TOKEN')
}
export const removeToken=()=>{
    return localStorage.removeItem('TOKEN')
}