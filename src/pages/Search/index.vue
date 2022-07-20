<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}<i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(p, index) in searchParams.props"
              :key="index"
            >
              {{ p.split(":")[1] }}<i @click="removeAttr">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a href="javascript:void(0)"
                    >综合<i v-show="isOne" class="iconfont" :class="isSort"></i
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a href="javascript:void(0)"
                    >价格 <i v-show="isTwo" class="iconfont" :class="isSort"></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"
                      ><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
<PageNation :pageNo='searchParams.pageNo' :pageSize='searchParams.pageSize' :totle='totle.total' :continues='5' @getPageNo='getPageNo'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //分类的名字
        categoryName: "",
        //关键字
        keyword: "",
        //排序 初始状态：综合降序
        order: "1:desc",
        //分页器用的，代表第几页
        pageNo: 1,
        //每一页展示数据个数
        pageSize: 3,
        //平台售卖属性
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters("search", ["goodsList"]),
    ...mapState("search",{totle:'searchList'}),
    isOne() {
      return this.searchParams.order.includes("1");
    },
    isTwo() {
      return this.searchParams.order.includes("2");
    },
    isSort() {
      return this.searchParams.order.includes("desc")
        ? "icon-jiantou_xiangxia"
        : "icon-jiantou_xiangshang";
    },
  },
  //向服务器发请求获取search模块数据,可多次请求（根据参数不同返回不同的数据进行展示）
  methods: {
    //删除分类名字
    removeCategory() {
      //将带给服务器的参数制空，还需要向服务器发请求
      //带给服务器参数说明可有可无的，如果属性值为空的字符串还是会把相应的字段带给服务器
      //但把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //地址栏也需要改：进行路由跳转
      //本意是删除query参数
      //判断是否存在params参数
      if (this.$route.params) {
        // console.log("存在params参数", this.$route.params);
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      this.$router.push({ name: "search", query: this.$route.query });
    },
    trademarkInfo(trademark) {
      //整理参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //发送请求
      this.getData();
    },
    //删除品牌的面包屑
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
      // this.$router.push({name:'search',params:this.$route.params,query:this.$route.query})
    },
    attrInfo(attrId, value, attrName) {
      let props = `${attrId}:${value}:${attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    //删除属性的面包屑
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    changeOrder(flag) {
      let orginOrder = this.searchParams.order;
      let orginflag = orginOrder.split(":")[0];
      let orginSort = orginOrder.split(":")[1];
      let newOrder = "";
      if (flag == orginflag) {
        newOrder = `${orginflag}:${orginSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getData()
    },
    getPageNo(page){
      this.searchParams.pageNo=page
      // console.log(this.searchParams.pageNo);
      this.getData()
    },
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
  },
  watch: {
    //监听路由的变化，如果发生变化，再次发起请求
    $route: {
      handler() {
        //将Id清空方便得知用户下次点击的的是几级标签
        console.log('路由改变');
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        this.getData();
      },
    },
  },

  beforeMount() {
    //在发请求之前，把接口需要传递的参数进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //只能发送一次请求
  mounted() {
    // this.$store.dispatch('search/getSearchList',{})
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      // .page {
      //   width: 733px;
      //   height: 66px;
      //   overflow: hidden;
      //   float: right;

      //   .sui-pagination {
      //     margin: 18px 0;

      //     ul {
      //       margin-left: 0;
      //       margin-bottom: 0;
      //       vertical-align: middle;
      //       width: 490px;
      //       float: left;

      //       li {
      //         line-height: 18px;
      //         display: inline-block;

      //         a {
      //           position: relative;
      //           float: left;
      //           line-height: 18px;
      //           text-decoration: none;
      //           background-color: #fff;
      //           border: 1px solid #e0e9ee;
      //           margin-left: -1px;
      //           font-size: 14px;
      //           padding: 9px 18px;
      //           color: #333;
      //         }

      //         &.active {
      //           a {
      //             background-color: #fff;
      //             color: #e1251b;
      //             border-color: #fff;
      //             cursor: default;
      //           }
      //         }

      //         &.prev {
      //           a {
      //             background-color: #fafafa;
      //           }
      //         }

      //         &.disabled {
      //           a {
      //             color: #999;
      //             cursor: default;
      //           }
      //         }

      //         &.dotted {
      //           span {
      //             margin-left: -1px;
      //             position: relative;
      //             float: left;
      //             line-height: 18px;
      //             text-decoration: none;
      //             background-color: #fff;
      //             font-size: 14px;
      //             border: 0;
      //             padding: 9px 18px;
      //             color: #333;
      //           }
      //         }

      //         &.next {
      //           a {
      //             background-color: #fafafa;
      //           }
      //         }
      //       }
      //     }

      //     div {
      //       color: #333;
      //       font-size: 14px;
      //       float: right;
      //       width: 241px;
      //     }
      //   }
      // }
    }
  }
}
</style>