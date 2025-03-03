<template>
  <div class="assignPmsDrawer">
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配菜单与按钮的权限</h4>
      </template>
      <template #default>
        <el-tree
          ref="treeRef"
          :data="mainStore.permissionList"
          :props="treeProps"
          :default-expanded-keys="[1]"
          node-key="id"
          show-checkbox
          auto-expand-parent
        />
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
import userMainStore from '@/stores/mainStore'

const mainStore = userMainStore()
mainStore.fetchPermissionList()
const drawer = defineModel()
const props = defineProps(['checkedKeys'])

const treeProps = {
  children: 'children',
  label: 'name',
}
const treeRef = ref()
watch(
  () => props.checkedKeys,
  (newValue) => {
    if (!treeRef.value) return
    treeRef.value.setCheckedKeys(newValue)
  },
)

const emit = defineEmits(['confirmClick'])
const confirmClick = () => {
  emit('confirmClick', [...treeRef.value.getHalfCheckedKeys(), ...treeRef.value.getCheckedKeys()])
  drawer.value = false
}
</script>

<style lang="less" scoped>
.assignPmsDrawer {
}
</style>
