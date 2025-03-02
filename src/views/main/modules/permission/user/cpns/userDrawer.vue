<template>
  <div class="userDrawer">
    <el-drawer v-model="drawer">
      <template #header>
        <h4>{{ config.title }}</h4>
      </template>
      <template #default>
        <el-form ref="formRef" :model="formData" label-width="auto" size="large" :rules="rules">
          <template v-for="(item, index) in config.formConfigs" :key="index">
            <el-form-item
              :label="item.label"
              :prop="item.key"
              v-if="item.showMode.includes(currentMode)"
            >
              <el-input v-model="formData[item.key]" :placeholder="item.placeholder" />
            </el-form-item>
          </template>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
const props = defineProps({
  config: {
    type: Object,
    required: true,
  },
  currentMode: {
    type: String,
  },
})
const drawer = defineModel()
const formData = defineModel('formData', {
  required: true,
})
const rules = reactive({
  name: [
    { required: true, message: '请输入用户姓名', trigger: 'blur' },
    { min: 5, message: '用户名字至少5位', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { min: 5, message: '用户昵称至少5位', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, message: '密码至少6位', trigger: 'blur' },
  ],
})
const formRef = ref()
watch(drawer, () => {
  if (drawer.value === true && !!formRef.value) {
    formRef.value.resetFields()
  }
})
const emit = defineEmits(['confirmClick'])
const confirmClick = () => {
  if (!formRef.value) return
  formRef.value.validate((vaild) => {
    if (vaild) {
      emit('confirmClick')
      drawer.value = false
    }
  })
}
</script>

<style lang="less" scoped>
.userDrawer {
}
</style>
