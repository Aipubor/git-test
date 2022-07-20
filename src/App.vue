<template>
  <div>
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
      //通知Vuex发送请求，获取数据，存储与仓库中
    this.$store.dispatch("home/categoryList");
  }
}
</script>

<style>
</style>
