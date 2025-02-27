<template>
  <div class="mainAside">
    <el-menu
      active-text-color="#fff"
      background-color="#001529"
      class="el-menu-vertical"
      default-active="1"
      text-color="#959EA6"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item index="1">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon><Platform /></el-icon>
        <span>Screen</span>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Lock /></el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item index="3-1">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="3-2">
          <el-icon><Avatar /></el-icon>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="3-3">
          <el-icon><List /></el-icon>
          <span>菜单管理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4">
        <template #title>
          <el-icon><Goods /></el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item index="4-1">
          <el-icon><ShoppingCart /></el-icon>
          <span>品牌管理</span>
        </el-menu-item>
        <el-menu-item index="4-2">
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
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="less" scoped>
.mainAside {
  .el-menu-vertical {
    border: none;
  }
}
</style>
