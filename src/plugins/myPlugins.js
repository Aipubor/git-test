let myPlugins={}
myPlugins.install=function(Vue,options){
//   Vue.prototype.$bus=this
  //任何组件都可以使用 
//   Vue.directive
// Vue.component
  Vue.directive(options.name,()=>{
    
  })
}
export default myPlugins