<template>
  <div class="container" ref="con">
    <div class="options">
      <el-input v-model="input" placeholder="请输入内容"></el-input
      ><el-button icon="el-icon-search" circle></el-button>
      <div class="full" @click="fullAction">
        <i class="el-icon-full-screen"></i>
      </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="companyName" label="公司名称"> </el-table-column>
      <el-table-column prop="postName" label="职位名称"> </el-table-column>
      <el-table-column prop="postCity" label="职位地点"> </el-table-column>
      <el-table-column label="操作" width="120"
        ><template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button type="text" size="small">删除</el-button>
        </template></el-table-column
      >
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="changepageAction"
    >
    </el-pagination>
  </div>
</template>

<script>
import screenfull from "screenfull";
export default {
  data() {
    return {
      input: "",
      bool: false,
      tableData: [],
      total: 40,
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
    handleClick(row) {
      console.log(row);
    },
    changepageAction(nowPage) {
      this.$axios
        .get("/api/admins/list", { params: { page: nowPage } })
        .then((infos) => {
          this.tableData = infos.data.infos;
          this.total = infos.data.total;
        });
    },
  },
  mounted() {
    this.$axios
      .get("/api/admins/list", { params: { page: 1 } })
      .then((infos) => {
        this.tableData = infos.data.infos;
        this.total = infos.data.total;
      });
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
.el-table .cell {
  text-align: center;
}
.el-table {
  margin: 10px 0 10px;
}
.el-pagination {
  position: absolute;
  bottom: 10px;
  left: 44%;
  transform: translateX(-50%);
}
</style>
