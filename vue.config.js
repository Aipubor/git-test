const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,
  devServer:{
    host: 'localhost', 
    port: 8080,
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''}
      }
    }
  }
})
