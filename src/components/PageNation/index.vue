<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>

    <button
      v-if="startNumAndendNum.startNum > 1"
      @click="$emit('getPageNo', 1)"
    >
      1
    </button>

    <button v-if="startNumAndendNum.startNum > 2">···</button>
    <template v-for="page in startNumAndendNum.endNum">
      <button
        :key="page"
        v-if="page >= startNumAndendNum.startNum"
        @click="changePageNo(page)"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </template>
    <button v-show="startNumAndendNum.endNum < totlePage - 1">···</button>

    <button
      v-show="startNumAndendNum.endNum < totlePage"
      @click="$emit('getPageNo', totlePage)"
    >
      {{ totlePage }}
    </button>

    <button
      :disabled="pageNo == totlePage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <input
      maxlength="5"
      v-model="value"
      @change="limitValue"
      onkeyup="this.value=this.value.replace(/\D/g,'')"
      onafterpaste="this.value=this.value.replace(/\D/g,'')"
    />
    <button @click="$emit('getPageNo', value)">跳转</button>

    <button style="margin-left: 30px">共 {{ totlePage }} 页</button>
  </div>
</template>

<script>
export default {
  name: "PageNation",
  props: ["pageNo", "pageSize", "continues", "totle"],
  data() {
    return {
      value: '',
    };
  },
  computed: {
    totlePage() {
      return Math.ceil(this.totle / this.pageSize)<1?1: Math.ceil(this.totle / this.pageSize);
    },

    startNumAndendNum() {
      let startNum;
      let endNum;
      if (this.continues < this.totlePage) {
        startNum =
          this.pageNo - Math.floor(this.continues / 2) < 1
            ? 1
            : this.pageNo - Math.floor(this.continues / 2);
        endNum =
          this.pageNo + Math.floor(this.continues / 2) > this.totlePage
            ? this.totlePage
            : startNum + this.continues - 1;
        if (this.pageNo + Math.floor(this.continues / 2) > this.totlePage) {
          startNum = this.totlePage - this.continues + 1;
        }
      } else {
        startNum = 1;
        endNum = this.totlePage;
      }
      return { startNum, endNum };
    },
  },
  methods: {
    changePageNo(page) {
      this.$emit("getPageNo", page);
    },
    limitValue(e) {
      this.value = parseInt(e.target.value)
    },
  },
};
</script>

<style lang='less' scoped>
.pagination {
  text-align: center;
  input {
    outline: none;
    width: 35px;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>