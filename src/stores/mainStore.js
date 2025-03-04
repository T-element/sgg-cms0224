import { getBrandList, getUserList } from '@/services'
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
      brandList: [],
      brandListTotal: 0,
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
    async fetchBrandList(config) {
      const res = await getBrandList(config)
      this.brandList = res.data.data.records
      this.brandListTotal = res.data.data.total
    },
  },
})

export default userMainStore
