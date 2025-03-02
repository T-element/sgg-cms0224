import { getMenuList } from '@/services'
import { defineStore } from 'pinia'

const useHomeStore = defineStore('homeStore', {
  state() {
    return {
      menuList: [],
      isDark: false,
    }
  },
  actions: {
    async fetchMenuList() {
      const res = await getMenuList()
      this.menuList = res.data.data.menuList
    },
  },
})

export default useHomeStore
