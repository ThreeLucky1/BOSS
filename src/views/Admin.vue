<template>
  <div>
    <el-container>
      <el-header>
        <span ref="title">BOSS直聘后台管理</span>
        <div class="breadcrumb">
          <i class="el-icon-s-fold" @click="hiddenAction" ref="hidden"></i>
        </div>
      </el-header>
      <el-container>
        <el-menu
          default-active="4"
          class="el-menu-vertical-demo"
          @select="selectAction"
        >
          <el-menu-item index="4" ref="index">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="9">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">职位管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="0" ref="postedit">职位编辑</el-menu-item>
              <el-menu-item index="1" ref="postadd">职位添加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2" ref="companyedit">
            <i class="el-icon-s-claim"></i>
            <span slot="title">公司管理</span>
          </el-menu-item>
          <el-menu-item
            index="3"
            ref="useredit"
            :disabled="manage ? false : true"
          >
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
        <el-main>
          <div class="calender">
            <el-calendar v-model="value"> </el-calendar>
          </div>
          <div class="options">
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              closable
              @tab-remove="removeTab"
              @tab-click="clickTab"
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                {{ item.content }}
              </el-tab-pane>
            </el-tabs>
          </div>
          <router-view v-transition />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
      router: ["postedit", "postadd", "companyedit", "useredit", "index"],
      title: ["职位编辑", "职位添加", "公司管理", "用户管理", "首页"],
      Indexarr: ["4"],
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "首页",
          name: "4",
          path: "index",
        },
      ],
      tabIndex: 2,
      prev: null,
      value: new Date(),
    };
  },
  computed: {
    ...mapState({
      manage: (state) => state.manage,
    }),
  },
  mounted() {
    var evt = new Event("click");
    this.$refs.index.$el.dispatchEvent(evt);
  },
  methods: {
    selectAction(a) {
      this.addTab(a);
      this.$router.push("/admin/" + this.router[a]);
    },
    hiddenAction() {
      this.isCollapse = !this.isCollapse;
      this.$refs.hidden.className = this.isCollapse
        ? "el-icon-s-unfold"
        : "el-icon-s-fold";
      this.$refs.title.innerHTML = this.isCollapse
        ? "BOSS"
        : "BOSS直聘后台管理";
    },
    addTab(targetName) {
      let newTabName = targetName + "";
      if (this.Indexarr.indexOf(newTabName) == -1) {
        this.Indexarr.push(newTabName);
        this.editableTabs.push({
          title: this.title[targetName],
          name: newTabName,
          path: this.router[targetName],
        });
      }

      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      this.Indexarr = this.Indexarr.filter((index) => index !== targetName);
    },
    clickTab(target) {
      var name = this.router[target.name];
      var evt = new Event("click");
      this.$refs[name].$el.dispatchEvent(evt);
    },
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: rgb(29, 209, 202);
  color: #333;
  line-height: 60px;
  font-size: 22px;
  color: #fff;
  font-weight: 700;
}

.el-header span {
  float: left;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  margin-bottom: -9999px;
  padding-bottom: 9999px;
  overflow: hidden;
  padding: 0;
}
.breadcrumb {
  margin-left: 10px;
  height: 60px;
  width: 40%;
  float: left;
}
.el-menu-item-group__title {
  padding: 0;
}
.el-menu-item.is-active {
  color: rgb(29, 209, 202);
}
.el-breadcrumb {
  line-height: 40px;
}
.index {
  padding: 0 25px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  float: left;
}
.el-tabs__item.is-active {
  color: rgb(29, 209, 202);
}
.el-tabs__item:hover {
  color: rgb(29, 209, 202);
}
.calender {
  width: 30%;
  float: right;
  padding-top: 50px;
}
.el-calendar-table .el-calendar-day {
  height: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 694px;
}
</style>
