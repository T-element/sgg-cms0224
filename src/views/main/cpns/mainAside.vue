<template>
  <div class="mainAside">
    <el-menu
      active-text-color="#409EFF"
      background-color="#001529"
      class="el-menu-vertical"
      default-active="1"
      text-color="#959EA6"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item index="1" @click="onItemClick('/main/home')">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><Platform /></el-icon>
        <span>数据大屏</span>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Lock /></el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item index="3-1" @click="onItemClick('/main/permission/user')">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="3-2" @click="onItemClick('/main/permission/role')">
          <el-icon><Avatar /></el-icon>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="3-3" @click="onItemClick('/main/permission/menu')">
          <el-icon><List /></el-icon>
          <span>菜单管理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><Goods /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item index="4-1" @click="onItemClick('/main/goods/brand')">
          <el-icon><ShoppingCart /></el-icon>
          <span>品牌管理</span>
        </el-menu-item>
        <!-- <el-menu-item index="4-2">
          <el-icon><Management /></el-icon>
          <span>属性管理</span>
        </el-menu-item>
        <el-menu-item index="4-3">
          <el-icon><SetUp /></el-icon>
          <span>Spu</span>
        </el-menu-item>
        <el-menu-item index="4-4">
          <el-icon><ScaleToOriginal /></el-icon>
          <span>Sku</span>
        </el-menu-item> -->
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import router from '@/router'

defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const onItemClick = (url) => {
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
