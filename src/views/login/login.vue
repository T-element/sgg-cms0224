<template>
  <div class="login">
    <div class="login-panel">
      <div class="title">米塔后台管理系统</div>
      <LoginBox ref="loginBoxRef" />
      <el-button size="large" type="primary" @click="onLoginClick">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginBox from './modules/loginBox.vue'

const loginBoxRef = ref()
function onLoginClick() {
  const validate = loginBoxRef.value.getValidate()
  validate((valid) => {
    if (valid) {
      console.log('登录成功')
    } else {
      console.log('登录失败')
    }
  })
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: end;
  width: 100%;
  height: 100%;
  background: url(../../assets/img/background.jpg) no-repeat;

  .login-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 475px;
    height: 360px;
    margin: 200px 210px 0 0;
    padding: 25px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: 0px 0px 5px #333;

    .title {
      color: #fff;
      font-size: 30px;
      font-weight: 700;
    }

    .el-button {
      width: 100%;
    }
  }
}
</style>
