import { getUserList } from '@/services'
import { getPermissionList, getRoleList } from '@/services/modules/main/permission/role'
import { defineStore } from 'pinia'

const userMainStore = defineStore('mainStore', {
  state() {
    return {
      userList: [],
      userListTotal: 0,
      roleList: [],
      roleListTotal: 0,
      permissionList: [],
    }
  },
  actions: {
    async fetchUserList(config) {
      const res = await getUserList(config)
      this.userList = res.data.data.records
      this.userListTotal = res.data.data.total
    },
    async fetchRoleList(config) {
      const res = await getRoleList(config)
      this.roleList = res.data.data.records
      this.roleListTotal = res.data.data.total
    },
    async fetchPermissionList() {
      const res = await getPermissionList()
      this.permissionList = res.data.data
    },
  },
})

export default userMainStore
