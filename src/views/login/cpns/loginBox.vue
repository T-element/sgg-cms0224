<template>
  <div class="loginBox">
    <el-form ref="formRef" :model="formData" size="large" :rules="rules" show-message status-icon>
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="请输入账号">
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码" show-password>
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="dentify">
        <el-input v-model="formData.dentify" placeholder="请输入验证码">
          <template #prefix>
            <el-icon><Warning /></el-icon>
          </template>
          <template #append>
            <Dentify class="dentify" :identifyCode="identifyCode" @click="refreshCode"></Dentify>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Dentify from './dentify.vue'
import useDentify from '@/hooks/useDentify'

const formData = ref({
  username: localStorage.getItem('username') ?? '',
  password: localStorage.getItem('password') ?? '',
  dentify: undefined,
})
const { identifyCode, refreshCode } = useDentify()
refreshCode()

const formRef = ref()
//表单验证规则
const rules = reactive({
  username: [{ validator: usernamePass, trigger: 'blur' }],
  password: [{ validator: passwordPass, trigger: 'blur' }],
  dentify: [{ validator: checkDentify, trigger: 'blur' }],
})

//username验证函数
function usernamePass(rule, value, cb) {
  if (!value) return cb(new Error('请输入帐号'))
  const usernameReg = new RegExp(/^[A-Za-z0-9]{5,20}$/)
  if (!usernameReg.test(value.trim())) {
    return cb(new Error('请输入5~20位的字母或数字'))
  } else {
    return cb()
  }
}

//password验证函数
function passwordPass(rule, value, cb) {
  if (!value) return cb(new Error('请输入密码'))
  const passwordReg = new RegExp(/^[A-Za-z0-9]{3,}$/)
  if (!passwordReg.test(value.trim())) {
    return cb(new Error('请输入3位以上的字母或数字'))
  } else {
    return cb()
  }
}

//dentify验证函数
function checkDentify(rule, value, cb) {
  // if (!value) return cb(new Error('请输入验证码'))
  if (false) {
    // if (identifyCode.value !== value) {
    return cb(new Error('请输入正确的验证码'))
  } else {
    return cb()
  }
}

defineExpose({
  getValidate: () => formRef.value.validate,
  getFormData: () => ({ ...formData.value }),
})
</script>

<style lang="less" scoped>
.loginBox {
  width: 100%;
  margin-top: 25px;

  :deep(.el-input-group__append) {
    padding: 0 !important;
  }

  :deep(.el-input__validateIcon) {
    color: green;
  }

  :deep(.el-form-item.is-error) {
    .el-input__validateIcon {
      color: var(--el-color-danger);
    }
  }

  .dentify {
    height: 38px;
  }
}
</style>
