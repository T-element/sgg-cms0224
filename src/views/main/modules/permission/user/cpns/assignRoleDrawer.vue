<template>
  <div class="assignRoleDrawer">
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配角色(职位)</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input disabled="disabled" v-model="formData.userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="职位列表">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange"> 全选 </el-checkbox>
            <el-checkbox-group v-model="assignRoles">
              <el-checkbox
                v-for="item in allRolesList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              >
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
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
import { ref } from 'vue'

const drawer = defineModel()
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})

const checkAll = ref(false)
const assignRoles = ref([])
const allRolesList = computed(() => {
  return props.formData.allRolesList
})
watchEffect(() => {
  assignRoles.value = props.formData.assignRoles?.map((item) => {
    return item.id
  })
})

const handleCheckAllChange = (val) => {
  const allRoles = allRolesList.value.map((item) => {
    return item.id
  })
  assignRoles.value = val ? allRoles : []
}

const emit = defineEmits(['confirmClick'])
const confirmClick = () => {
  emit('confirmClick', { userId: props.formData.userInfo.id, roleIdList: [...assignRoles.value] })
  drawer.value = false
}
</script>

<style lang="less" scoped>
.assignRoleDrawer {
  .el-form-item__content > .el-checkbox {
    width: 100%;
  }
}
</style>
