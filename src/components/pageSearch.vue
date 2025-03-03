<template>
  <div class="pageSearch">
    <el-card>
      <div class="container">
        <el-form ref="formRef" :model="formdata" label-width="auto" size="large">
          <el-form-item :label="formConfig.title" style="width: 300px" :prop="formConfig.key">
            <el-input :placeholder="formConfig.placeHolder" v-model="formdata[formConfig.key]" />
          </el-form-item>
        </el-form>
        <div class="btns">
          <el-button type="primary" @click="onSearchClick">搜索</el-button>
          <el-button type="primary" @click="onResetClick">重置</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const prop = defineProps({
  formConfig: {
    type: Object,
    required: true,
  },
})
const formdata = defineModel()
const formRef = ref()
const emit = defineEmits(['searchClick'])
const onResetClick = () => {
  formRef.value.resetFields()
}
const onSearchClick = () => {
  emit('searchClick')
}
</script>

<style lang="less" scoped>
.pageSearch {
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-form-item {
      margin: 0;
    }
  }
}
</style>
