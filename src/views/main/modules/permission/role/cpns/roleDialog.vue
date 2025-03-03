<template>
  <div class="roleDialog">
    <el-dialog
      v-model="dialogVisible"
      :title="config?.title"
      width="800"
      :close-on-press-escape="false"
    >
      <el-form ref="formRef" :model="formData" :rules="rules">
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model="formData.roleName" placeholder="请输入职位名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirmClick">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dialogVisible = defineModel()
const formData = defineModel('formData')
defineProps(['config'])
const formRef = ref()
watch(dialogVisible, () => {
  if (dialogVisible.value === true && !!formRef.value) {
    formRef.value.resetFields()
  }
})

const rules = reactive({
  roleName: [
    { required: true, message: '职位名称最低为两位', trigger: 'blur' },
    { min: 2, message: '职位名称最低为两位', trigger: 'blur' },
  ],
})

const emit = defineEmits(['confirmClick'])
const onConfirmClick = () => {
  emit('confirmClick')
  dialogVisible.value = false
}
</script>

<style lang="less" scoped>
.roleDialog {
}
</style>
