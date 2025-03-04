<template>
  <div class="brandDialog">
    <el-dialog v-model="dialogFormVisible" title="添加品牌" width="800">
      <el-form :model="formData" label-width="auto" :rules="rules">
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入品牌名称" />
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-upload
            ref="upload"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="handleFileChange"
            :on-remove="handleFileRemove"
          >
            <el-icon><Plus /></el-icon>
            <template #tip>
              <div style="color: red" v-show="!isFileReady">LOGO必须上传</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onConfirmClick">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'

const dialogFormVisible = defineModel()
const formData = ref({
  name: '',
})
const rules = reactive({
  name: [
    { required: true, message: '品牌名称位数大于等于两位', trigger: 'blur' },
    { min: 2, message: '品牌名称位数大于等于两位', trigger: 'blur' },
  ],
})

const onConfirmClick = () => {
  dialogFormVisible.value = false
}

//上传组件
const upload = ref()
const handleExceed = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}
const handleFileChange = (val) => {
  if (val.name) isFileReady.value = true
}
const handleFileRemove = () => {
  isFileReady.value = false
}

const isFileReady = ref(false)
</script>

<style lang="less" scoped>
.brandDialog {
}
</style>
