<template>
  <div class="brand">
    <PageContent
      :config="contentConfig"
      :table-data="mainStore.brandList"
      :list-total="mainStore.brandListTotal"
      @pagingSizeChange="handlePagingSizeChange"
      @pagingPageChange="handlePagingPageChange"
      @btnClick="handleBtnClick"
    >
      <template #logo="scoped">
        <img :src="scoped.logoUrl" alt="品牌图标" class="logo" />
      </template>
    </PageContent>
    <BrandDialog v-model="isBrandDialogShow" />
  </div>
</template>

<script setup>
import userMainStore from '@/stores/mainStore'
import contentConfig from './config/contentConfig'
import { debounce } from 'lodash'
import BrandDialog from './cpns/brandDialog.vue'

const mainStore = userMainStore()
const pagingConfig = ref({ page: 0, limit: 10 })
mainStore.fetchBrandList({ ...pagingConfig.value })
const dbFetchBrandList = debounce(mainStore.fetchBrandList, 100)

//search模块
const isSearchRequest = false

//content模块
const isBrandDialogShow = ref(false)

const handleBtnClick = (val) => {
  switch (val.btnName) {
    case 'addBrand':
      isBrandDialogShow.value = true
      break
  }
}

//pagination模块
const handlePagingSizeChange = (size) => {
  pagingConfig.value.limit = size
  dbFetchBrandList({ ...pagingConfig.value })
}
const handlePagingPageChange = (page) => {
  if (isSearchRequest) return
  pagingConfig.value.page = page
  dbFetchBrandList({ ...pagingConfig.value })
}
</script>

<style lang="less" scoped>
.brand {
  .logo {
    width: 80px;
  }
}
</style>
