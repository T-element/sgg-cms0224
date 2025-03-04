<template>
  <div class="mainAside">
    <el-menu
      active-text-color="#409EFF"
      background-color="#001529"
      class="el-menu-vertical"
      :default-active="activeIndex"
      text-color="#959EA6"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <template v-for="(item, index) in menuList" :key="index">
        <el-menu-item v-if="!item.hasChildren" @click="onItemClick(item.route)" :index="`${index}`">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
        <el-sub-menu :index="`${index}`" v-if="item.hasChildren">
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="(iten, indey) in item.children" :key="indey">
            <el-menu-item :index="`${index}-${indey}`" @click="onItemClick(iten.route)">
              <el-icon><component :is="iten.icon" /></el-icon>
              <span>{{ iten.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import router from '@/router'
import { useRoute } from 'vue-router'

const menuList = [
  {
    title: '首页',
    icon: 'HomeFilled',
    hasChildren: false,
    route: '/main/home',
  },
  {
    title: '数据大屏',
    icon: 'Platform',
    hasChildren: false,
    route: '/main/screen',
  },
  {
    title: '权限管理',
    icon: 'Lock',
    hasChildren: true,
    route: '/main/permission',
    children: [
      {
        title: '用户管理',
        icon: 'User',
        route: '/main/permission/user',
      },
      {
        title: '角色管理',
        icon: 'Avatar',
        route: '/main/permission/role',
      },
      {
        title: '菜单管理',
        icon: 'List',
        route: '/main/permission/menu',
      },
    ],
  },
  {
    title: '商品管理',
    icon: 'Goods',
    hasChildren: true,
    route: '/main/goods',
    children: [
      {
        title: '品牌管理',
        icon: 'ShoppingCart',
        route: '/main/goods/brand',
      },
    ],
  },
]

const route = useRoute()
const activeIndex = ref('0')
watch(
  route,
  () => {
    const activeArr = []
    for (let i = 0; i < menuList; i++) {
      if (route.path.includes(menuList[i].route)) {
        activeArr[0] = i
      }
    }
    menuList.forEach((item, index) => {
      if (route.path.includes(item.route)) activeArr[0] = index
      if (item.hasChildren)
        item.children.forEach((iten, indey) => {
          if (route.path.includes(iten.route)) activeArr[1] = indey
        })
    })
    activeIndex.value = activeArr.join('-')
    console.log(activeIndex.value)
  },
  { immediate: true },
)

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const onItemClick = (url) => {
  if (!url) return
  router.push(url)
}
</script>

<style lang="less" scoped>
.mainAside {
  .el-menu-vertical {
    border: none;
  }
}
</style>
