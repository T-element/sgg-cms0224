import { getUserList } from '@/services'
import { defineStore } from 'pinia'

const userMainStore = defineStore('mainStore', {
  state() {
    return {
      userList: [],
      userListTotal: 0,
    }
  },
  actions: {
    async fetchUserList(config) {
      const res = await getUserList(config)
      console.log(res)
      this.userList = res.data.data.records
      this.userListTotal = res.data.data.total
    },
  },
})

export default userMainStore
