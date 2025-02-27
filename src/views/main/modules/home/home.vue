<template>
  <div class="home">
    <div class="top">
      <img src="@/assets/img/avator.jpg" alt="icon" class="icon" />
      <div class="content">
        <h1 class="tilte">欢迎来到后台管理系统</h1>
        <p class="subTitle">MISIDE</p>
      </div>
    </div>
    <div class="bottom">
      <img class="welcomePic" :src="picURL" alt="" />
    </div>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/homeStore'

const homeStore = useHomeStore()
const picURL = computed(() => {
  return homeStore.isDark ? '../../src/assets/img/welcome1.jpg' : '../../src/assets/img/welcome.jpg'
})
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100%;

  .top {
    display: flex;
    align-items: center;
    height: 140px;
    padding: 0 30px;
    // border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 0px 5px 5px -5px #ddd;

    .icon {
      width: 100px;
      border-radius: 50%;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100px;
      margin-left: 20px;
      padding: 10px 0;

      .subTitle {
        color: #ccc;
        font-weight: 700;
        font-style: italic;
      }
    }
  }

  .bottom {
    flex: 1;
    margin-top: 10px;
    overflow: hidden;

    .welcomePic {
      width: 100%;
      margin-top: -150px;
    }
  }
}
</style>
