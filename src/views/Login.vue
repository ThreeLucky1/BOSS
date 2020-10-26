<template>
  <div>
    <vue-particles
      color="#1DD1CA"
      :particleOpacity="0.5"
      :particleSize="6"
      linesColor="#1DD1CA"
      :linesWidth="1"
      :lineLinked="true"
      clickMode="push"
      class="lizi"
    >
    </vue-particles>
    <div class="login">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="header">BOSS直聘后台管理</div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="tel">
          <el-input v-model="ruleForm.tel" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="delivery">
          <span class="manage">管理员登陆：</span>
          <el-switch v-model="ruleForm.bool"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          ><el-button @click="resetForm('ruleForm')">重置</el-button>
          <router-link class="registerBtn" to="/register"
            >注册账号？</router-link
          >
        </el-form-item>
      </el-form>
      <el-dialog
        title="滑动验证"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose"
      >
        <slide-verify
          :l="42"
          :r="10"
          :w="310"
          :h="155"
          @success="onSuccess"
          :slider-text="text"
        ></slide-verify>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateTel = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        tel: "",
        bool: false,
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        tel: [{ validator: validateTel, trigger: "blur" }],
      },
      text: "向右滑",
      dialogVisible: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = true;
          return;
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSuccess() {
      this.dialogVisible = false;
      this.$axios
        .post("/api/login", {
          tel: this.ruleForm.tel,
          pass: this.ruleForm.pass,
          type: 0,
          bool: this.ruleForm.bool,
        })
        .then((info) => {
          if (info.data.code == 1) {
            this.$message({
              message: "登陆成功！",
              type: "success",
            });
            this.$router.push("/admin");
          } else {
            this.$message.error("登陆失败！");
          }
        })
        .catch(() => {
          this.$message.error("登陆失败！");
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style>
.login {
  padding-top: 200px;
  padding-bottom: 50px;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}
.logo {
  text-align: center;
  padding-bottom: 20px;
}
.header {
  font-size: 26px;
  color: #666;
  margin: 0 auto 40px auto;
  text-align: center;
  font-weight: 700;
}
.el-switch {
  margin-left: 20px;
}
.manage {
  font-size: 18px;
  color: #666;
}
.el-switch.is-checked .el-switch__core {
  background: rgb(29, 209, 202);
  border-color: rgb(29, 209, 202);
}
.el-switch__core {
  top: -2px;
}
.el-form-item:nth-child(2) {
  margin-bottom: 15px;
}
.el-form-item:nth-child(3) {
  margin-bottom: 15px;
}
.el-button:nth-child(1) {
  margin-left: 54px;
  margin-right: 30px;
  background: rgb(29, 209, 202);
  border-color: rgb(29, 209, 202);
}
.registerBtn {
  float: right;
  color: rgb(29, 209, 202);
  text-decoration: none;
}
.slide-verify[data-v-b2d04a40] {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: -8px;
}
</style>
