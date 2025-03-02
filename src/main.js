import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'normalize.css'
import './assets/css/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

//全局引入elemet-plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//国际化
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(createPinia())
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn,
})

app.mount('#app')
