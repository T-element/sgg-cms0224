<template>
  <div class="role">
    <PageSearch :form-config="searchConfig" v-model="searchData" @search-click="handleSearch" />
    <PageContent
      class="pageContent"
      :config="contentConfig"
      :table-data="mainStore.roleList"
      :list-total="mainStore.roleListTotal"
      @btn-click="handleBtnClick"
      @pagingSizeChange="handlePagingSizeChange"
      @pagingPageChange="handlePagingPageChange"
    />
    <AssignPmsDrawer
      v-model="isAssignPmsDrawerShow"
      :checkedKeys="treeCheckedKeys"
      @confirm-click="handlePmsConfirm"
    />
    <RoleDialog
      v-model="isRoleDialogShow"
      :config="roleDialogConfig"
      v-model:formData="roleDialogData"
      @confirm-click="handleDialogConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageContent from '@/components/pageContent.vue'
import PageSearch from '@/components/pageSearch.vue'
import contentConfig from './config/contentConfig'
import AssignPmsDrawer from './cpns/assignPmsDrawer.vue'
import RoleDialog from './cpns/roleDialog.vue'
import userMainStore from '@/stores/mainStore'
import { debounce } from 'lodash'
import {
  assignPermission,
  createRole,
  deleteRoleById,
  getRolePermissionById,
  updataRole,
} from '@/services/modules/main/permission/role'

//pageSearch模块
const searchConfig = {
  title: '职位搜索',
  placeHolder: '请输入职位搜索关键字',
  key: 'roleName',
}
let isSearchRequest = false
const searchData = ref({ roleName: '' })
const handleSearch = async () => {
  isSearchRequest = true
  await mainStore.fetchRoleList({ ...pagingConfig.value, page: 0, ...searchData.value })
  isSearchRequest = false
}

//pageContent模块
const mainStore = userMainStore()
const dbFetchRoleList = debounce(mainStore.fetchRoleList, 100)

const pagingConfig = ref({ page: 0, limit: 10 })
mainStore.fetchRoleList({ ...pagingConfig.value })

const roleId = ref('')
const handleBtnClick = (prop) => {
  console.log(prop)
  switch (prop.btnName) {
    case 'assignPermission':
      treeCheckedKeys.value = []
      isAssignPmsDrawerShow.value = true
      roleId.value = prop.rowData.id
      getRolePermissionById(prop.rowData.id).then((res) => {
        treeCheckedKeys.value = getRolePermissionByArr(res.data.data)
      })
      break

    case 'addRole':
      currentMode.value = 'create'
      roleDialogConfig.value.title = '添加职位'
      roleDialogData.value = { ...initData }
      isRoleDialogShow.value = true
      break

    case 'edit':
      currentMode.value = 'edit'
      roleDialogConfig.value.title = '修改职位'
      roleDialogData.value = { ...prop.rowData }
      isRoleDialogShow.value = true
      break

    case 'delete':
      deleteRoleById(prop.rowData.id).then((res) => {
        showExecuteStatus({ code: res.data.code, message: '删除' })
        mainStore.fetchRoleList({ ...pagingConfig.value })
      })
      break
  }
}

const isAssignPmsDrawerShow = ref(false)
const treeCheckedKeys = ref([])
function getRolePermissionByArr(prop) {
  const cacheArr = []
  prop.forEach((item) => {
    if (item.select === true && item.children.length !== 0) {
      cacheArr.push(...getRolePermissionByArr(item.children))
    } else if (item.select === true && item.children.length === 0) {
      cacheArr.push(item.id)
    }
  })
  return cacheArr
}
const handlePmsConfirm = async (val) => {
  const res = await assignPermission({ roleId: roleId.value, permissionIdList: val })
  showExecuteStatus({ code: res.data.code, message: '分配权限' })
}

const isRoleDialogShow = ref(false)
const roleDialogConfig = ref({})
const initData = { roleName: '' }
const roleDialogData = ref({})
const currentMode = ref('')
const handleDialogConfirm = async () => {
  if (currentMode.value === 'create') {
    const res = await createRole({ ...roleDialogData.value })
    showExecuteStatus({ code: res.data.code, message: '添加' })
  } else if (currentMode.value === 'edit') {
    const { id, roleName } = roleDialogData.value
    const res = await updataRole({ id, roleName })
    showExecuteStatus({ code: res.data.code, message: '修改' })
  }
  mainStore.fetchRoleList({ ...pagingConfig.value })
}

const handlePagingSizeChange = (size) => {
  pagingConfig.value.limit = size
  dbFetchRoleList({ ...pagingConfig.value, ...searchData.value })
}
const handlePagingPageChange = (page) => {
  if (isSearchRequest) return
  pagingConfig.value.page = page
  dbFetchRoleList({ ...pagingConfig.value, ...searchData.value })
}

function showExecuteStatus(info) {
  if (info.code === 200) {
    mainStore.fetchRoleList({ ...pagingConfig.value })
    ElMessage({
      message: `${info.message}成功`,
      type: 'success',
    })
  } else {
    ElMessage({
      message: `${info.message}失败`,
      type: 'error',
    })
  }
}
</script>

<style lang="less" scoped>
.role {
  .pageContent {
    margin-top: 10px;
  }
}
</style>
