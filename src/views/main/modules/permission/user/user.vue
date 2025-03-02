<template>
  <div class="user">
    <PageSearch :form-config="searchConfig" v-model="searchData" @search-click="handleSearch" />
    <PageContent
      class="pageContent"
      :config="contentConfig"
      :table-data="mainStore.userList"
      :list-total="mainStore.userListTotal"
      @btn-click="handleBtnClick"
      @pagingSizeChange="handlePagingSizeChange"
      @pagingPageChange="handlePagingPageChange"
    />
    <AssignRoleDrawer
      v-model="isAssignRoleDrawerShow"
      :form-data="assignRoleDrawerData"
      @confirm-click="handleRoleDrawerConfirm"
    />
    <UserDrawer
      v-model="isUserDrawerShow"
      :config="userDrawerConfig"
      v-model:formData="userDrawerData"
      :current-mode="currentMode"
      @confirm-click="handleUserDrawerConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageContent from '@/components/pageContent.vue'
import PageSearch from '@/components/pageSearch.vue'
import contentConfig from './config/contentConfig'
import AssignRoleDrawer from './cpns/assignRoleDrawer.vue'
import UserDrawer from './cpns/userDrawer.vue'
import userMainStore from '@/stores/mainStore'
import { debounce } from 'lodash'
import {
  createUser,
  deleteUserById,
  getAssignRolesById,
  patchAssignRole,
  updataUser,
} from '@/services'

const mainStore = userMainStore()
const dbFetchUserList = debounce(mainStore.fetchUserList, 100)

const pagingConfig = ref({ page: 0, limit: 10 })
mainStore.fetchUserList({ ...pagingConfig.value })

const currentMode = ref('')
const handleBtnClick = (prop) => {
  console.log(prop)
  switch (prop.btnName) {
    case 'assignRole':
      assignRoleDrawerData.value.assignRoles = []
      isAssignRoleDrawerShow.value = true
      assignRoleDrawerData.value.userInfo = prop.rowData
      getAssignRolesById(prop.rowData.id).then((res) => {
        assignRoleDrawerData.value.allRolesList = res.data.data.allRolesList
        assignRoleDrawerData.value.assignRoles = res.data.data.assignRoles
      })
      break

    case 'addUser':
      currentMode.value = 'create'
      userDrawerConfig.value.title = '添加用户'
      userDrawerData.value = { ...initData }
      isUserDrawerShow.value = true
      break

    case 'edit':
      currentMode.value = 'edit'
      userDrawerConfig.value.title = '修改用户'
      userDrawerData.value = { ...prop.rowData }
      isUserDrawerShow.value = true
      break

    case 'delete':
      deleteUserById(prop.rowData.id).then((res) => {
        showExecuteStatus({ code: res.data.code, message: '删除' })
      })
      break
  }
}

const isAssignRoleDrawerShow = ref(false)
const assignRoleDrawerData = ref({})
const handleRoleDrawerConfirm = async (prop) => {
  const res = await patchAssignRole(prop)
  showExecuteStatus({ code: res.data.code, message: '分配角色' })
}

const isUserDrawerShow = ref(false)
const userDrawerConfig = ref({
  title: '添加用户',
  formConfigs: [
    {
      label: '用户姓名',
      placeholder: '请您输入用户姓名',
      key: 'username',
      showMode: ['create', 'edit'],
    },
    {
      label: '用户昵称',
      placeholder: '请您输入用户昵称',
      key: 'name',
      showMode: ['create', 'edit'],
    },
    {
      label: '用户密码',
      placeholder: '请您输入用户密码',
      key: 'password',
      showMode: ['create'],
    },
  ],
})
const initData = { name: '', username: '', password: '' }
const userDrawerData = ref({})
const handleUserDrawerConfirm = async () => {
  if (currentMode.value === 'create') {
    const res = await createUser({ ...userDrawerData.value })
    showExecuteStatus({ code: res.data.code, message: '添加' })
  } else if (currentMode.value === 'edit') {
    const { id, name, username } = userDrawerData.value
    const res = await updataUser({ id, name, username })
    showExecuteStatus({ code: res.data.code, message: '修改' })
  }
}

function showExecuteStatus(info) {
  if (info.code === 200) {
    mainStore.fetchUserList({ ...pagingConfig.value })
    ElMessage({
      message: `${info.message}成功`,
      type: 'success',
    })
  } else {
    ElMessage({
      message: `${info.message}成功`,
      type: 'error',
    })
  }
}

const handlePagingSizeChange = (size) => {
  pagingConfig.value.limit = size
  dbFetchUserList({ ...pagingConfig.value })
}
const handlePagingPageChange = (page) => {
  if (isSearchRequest) return
  pagingConfig.value.page = page
  dbFetchUserList({ ...pagingConfig.value })
}

const searchConfig = {
  title: '用户名',
  placeHolder: '请输入用户名',
}
let isSearchRequest = false
const searchData = ref({ name: '' })
const handleSearch = async () => {
  isSearchRequest = true
  await mainStore.fetchUserList({ ...pagingConfig.value, page: 0, ...searchData.value })
  isSearchRequest = false
}
</script>

<style lang="less" scoped>
.user {
  .pageContent {
    margin-top: 10px;
  }
}
</style>
