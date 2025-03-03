<template>
  <div class="mainHeader">
    <div class="left">
      <el-button text @click="onChangeMenuState">
        <el-icon size="20">
          <component :is="isCollapse ? 'expand' : 'fold'"></component>
        </el-icon>
      </el-button>
    </div>
    <div class="right">
      <el-button size="small" circle @click="onRefreshClick">
        <el-icon><Refresh /></el-icon>
      </el-button>
      <el-button size="small" circle @click="onFullScreenClick">
        <el-icon><FullScreen /></el-icon>
      </el-button>
      <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
        <template #reference>
          <el-button size="small" circle>
            <el-icon><Setting /></el-icon>
          </el-button>
        </template>
        <template #default>
          <el-form label-width="auto">
            <el-form-item label="主题颜色">
              <el-color-picker
                size="small"
                v-model="color"
                show-alpha
                :predefine="predefineColors"
                :teleported="false"
              />
            </el-form-item>
            <el-form-item label="暗黑模式" @click="onChangeMode">
              <el-switch v-model="isDark" inline-prompt active-icon="Moon" inactive-icon="Sunny" />
            </el-form-item>
          </el-form>
        </template>
      </el-popover>
      <div class="userInfo">
        <img src="@/assets/img/avator.jpg" alt="icon" class="icon" />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}
            <el-icon>
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="onExitSystem">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import useHomeStore from '@/stores/homeStore'
import { ref } from 'vue'

const homeStore = useHomeStore()

const isCollapse = ref(false)
const emit = defineEmits(['changeMenuState'])
function onChangeMenuState() {
  isCollapse.value === false ? (isCollapse.value = true) : (isCollapse.value = false)
  emit('changeMenuState', isCollapse)
}

const username = localStorage.getItem('username')
const isDark = ref(false)
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const onRefreshClick = () => {
  location.reload()
}
const onFullScreenClick = () => {
  const docEl = document.documentElement
  if (docEl.offsetWidth === window.screen.width && docEl.offsetHeight === window.screen.height) {
    document.exitFullscreen()
  } else {
    docEl.requestFullscreen()
  }
}
const onChangeMode = () => {
  const htmlEL = document.documentElement
  htmlEL.classList.toggle('dark')
  homeStore.isDark = !homeStore.isDark
}
const onExitSystem = () => {
  router.push('/login')
}
</script>

<style lang="less" scoped>
.mainHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;

  .left {
    .el-button {
      padding: 5px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .userInfo {
      display: flex;
      align-items: center;

      .icon {
        width: 23px;
        margin: 0 10px;
        border-radius: 50%;
      }

      .el-dropdown-link {
        cursor: pointer;
      }
    }
  }
}
</style>
