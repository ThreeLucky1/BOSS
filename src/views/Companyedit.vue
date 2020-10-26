<template>
  <div class="container" ref="con">
    <div class="options">
      <el-input v-model="input" placeholder="请输入内容"></el-input
      ><el-button icon="el-icon-search" circle></el-button>
      <div class="full" @click="fullAction">
        <i class="el-icon-full-screen"></i>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  data() {
    return {
      input: "",
      bool: false,
    };
  },
  methods: {
    fullAction() {
      screenfull.toggle();
      if (!this.bool) {
        this.$refs.con.className = "container1";
        this.bool = true;
        return;
      }
      this.$refs.con.className = "container";
      this.bool = false;
    },
  },
};
</script>

<style scoped>
.options {
  height: 60px;
  background: rgb(248, 248, 248);
}
.el-input {
  width: 200px;
  line-height: 60px;
  padding-left: 10px;
  margin-right: 10px;
}
.el-input__inner:focus {
  color: rgb(29, 209, 202);
}
.full {
  float: right;
  line-height: 60px;
  margin-right: 20px;
  color: rgb(57, 55, 55);
  cursor: pointer;
}
.full:hover {
  color: rgb(29, 209, 202);
}
</style>
