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
    <div class="register">
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
        <el-form-item prop="user">
          <el-input placeholder="用户名" v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item prop="tel">
          <el-input placeholder="手机号" v-model="ruleForm.tel"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            placeholder="密码"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            placeholder="确认密码"
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >注册</el-button
          ><el-button @click="resetForm('ruleForm')">重置</el-button>
          <router-link class="loginBtn" to="/login">已有账号？</router-link>
        </el-form-item>
      </el-form>
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
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
        checkPass: "",
        user: "",
        tel: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        user: [{ validator: validateUser, trigger: "blur" }],
        tel: [{ validator: validateTel, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/register", {
              user: this.ruleForm.user,
              tel: this.ruleForm.tel,
              pass: this.ruleForm.pass,
              type: 0,
            })
            .then((info) => {
              if (info.data.code == 1) {
                this.$message({
                  message: "注册成功！",
                  type: "success",
                });
                this.$router.push("/login");
              } else {
                console.log(2);
                this.$message.error("注册失败！");
              }
            })
            .catch(() => {
              console.log(1);
              this.$message.error("注册失败！");
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.register {
  padding-top: 200px;
  padding-bottom: 50px;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}
.loginBtn {
  float: right;
  color: rgb(29, 209, 202);
  text-decoration: none;
}
</style>
