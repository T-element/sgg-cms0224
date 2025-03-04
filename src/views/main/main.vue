<template>
  <div class="home">
    <el-container class="container">
      <el-aside :width="isCollapse ? '60px' : '200px'" class="aside">
        <div class="tilte">
          <img src="@/assets/img/logo.png" alt="logo" class="icon" />
          <div class="content">米塔后台管理系统</div>
        </div>
        <HomeAside :is-collapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="header">
          <HomeHeader @changeMenuState="handleChangeMenuState" />
        </el-header>
        <el-main class="main">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomeAside from './cpns/mainAside.vue'
import HomeHeader from './cpns/mainHeader.vue'
import { RouterView } from 'vue-router'

const isCollapse = ref(false)
function handleChangeMenuState(data) {
  isCollapse.value = data.value
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .container {
    height: 100%;
    .aside {
      background-color: #001529;
      transition: width 0.2s ease-in-out;
      overflow: hidden;

      .tilte {
        display: flex;
        align-items: center;
        width: 200px;
        padding: 10px 15px;

        .icon {
          width: 35px;
        }

        .content {
          margin-left: 10px;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
        }
      }
    }

    .header {
      padding: 0;
      border-bottom: 1px solid lightgray;
      box-shadow: 0 5px 3px -5px #ccc;
    }

    .el-main {
      // background-color: lightgray;
    }
  }
}
</style>
