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
import LoginBox from './cpns/loginBox.vue'
import { loginRequest } from '@/services'
import router from '@/router'
import dayjs from 'dayjs'

const loginBoxRef = ref()
function onLoginClick() {
  const formData = loginBoxRef.value.getFormData()
  const validate = loginBoxRef.value.getValidate()
  validate(async (valid) => {
    if (valid) {
      const res = await loginRequest(formData)
      if (res.data.ok !== true) {
        ElNotification({
          message: '账号或密码错误',
          type: 'error',
        })
      } else {
        console.log('登录成功')
        localStorage.setItem('token', res.data.data, {
          center: true,
        })
        localStorage.setItem('username', formData.username)
        localStorage.setItem('password', formData.password)

        const currentHour = dayjs().hour()
        let welcomeTime = ''
        if (currentHour > 6 && currentHour < 10) {
          welcomeTime = '早上好'
        } else if (currentHour > 10 && currentHour < 14) {
          welcomeTime = '中午好'
        } else if (currentHour > 14 && currentHour < 19) {
          welcomeTime = '下午好'
        } else {
          welcomeTime = '晚上好'
        }

        ElNotification({
          title: `Hi, ${welcomeTime}`,
          message: '登录成功',
          type: 'success',
        })
        router.push('/main')
      }
    } else {
      ElNotification({
        message: '账号或密码错误',
        type: 'error',
      })
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

  :global(.el-message-box__content) {
    margin: 10px 0;
    font-size: 15px;
  }
}
</style>
