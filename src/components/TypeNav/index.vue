<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveShow">
        <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
        <!-- 过渡动画 -->
      <transition name="sort">
        <div class="sort" v-show="show">
          <div class="all-sort-list2" @click="goSearch">
            <div
              class="item"
              :class="{ cur: currentIndex == index }"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移到哪一个一级分类
      currentIndex: -1,
      show:true,
    };
  },
  computed: {
    //右侧需要的是一个函数，当使用这个计算属性时，右侧函数就会执行
    //注入一个参数state,其实即为大仓库数据
    // ...mapState({categoryList:state=>state.home.categoryList})
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    //    changeIndex(index){
    // this.currentIndex=index;

    //    },
    //throttle中不能用箭头函数，否则会有this指向问题
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // leaveIndex() {
    //     console.log(this.mounted);
    //   this.currentIndex = -1;
    // },

    goSearch(event) {
      //利用编程式导航+事件委派
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
        // console.log(element.dataset);
      if (categoryname) {
        //整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        //一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        //整理完参数，如果当前组件有param参数，也需要带上
       if(this.$route.params){
            location.params=this.$route.params
       }
        location.query = query;
        //路由跳转
        this.$router.push(location);
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow(){
this.show=true;
    },
    leaveShow(){
        this.currentIndex=-1;
        if(this.$route.path!='/home'){
        this.show=false;
        }
    }
  },
  //组件挂载完毕：可以向服务器发送请求
  mounted() {
    //   console.log(this);
      //通知Vuex发送请求，获取数据，存储与仓库中 (会进一步优化，放在APP.vue中,只需请求一次)
    // this.$store.dispatch("home/categoryList");
//判断如果是search组件，则一开始不展示商品分类列表
    if(this.$route.path!='/home'){
        this.show=false
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .cur {
          background: rgb(12, 149, 213);
        }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //     .item-list {
          //         display: block;
          //     }
          // }
        }
      }
    }
    //过渡动画开始状态
    .sort-enter{
        height: 0px;
    }
    // 过渡动画结束状态
    .sort-enter-to{
        height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active{
        transition: all .4s linear;
        overflow: hidden;
    }
  }
}
</style>