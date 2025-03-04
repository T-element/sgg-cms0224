<template>
  <div class="menu">
    <PageContent :config="contentConfig" :table-data="mianStore.permissionList" />
  </div>
</template>

<script setup>
import PageContent from '@/components/pageContent.vue'
import contentConfig from './config/contentConfig'
import userMainStore from '@/stores/mainStore'

const mianStore = userMainStore()
mianStore.fetchPermissionList()
</script>

<style lang="less" scoped></style>
