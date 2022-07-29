<template>
  <div>
      <!-- 三级联动全局组件 -->
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="list in floorList" :key="list.id" :floor="list"/>
      <Brand/>
  </div>
</template>

<script>
//引入其他组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'
export default {
name:'Home',
components:{
ListContainer,
Recommend,
Rank,
Like,
Floor,
Brand
},
computed:{
...mapState('home',['floorList']),
},
mounted(){
    this.$store.dispatch('home/getFloorList')
}，
//123
}
</script>

<style>

</style>