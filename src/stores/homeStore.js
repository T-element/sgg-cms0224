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
      console.log(res.data.data.menuList)
    },
  },
})

export default useHomeStore
