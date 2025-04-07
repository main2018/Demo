import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

const app = createApp(App)
app.use(createPinia())
// install after pinia
app.use(PiniaColada, {
  // Optionally provide global options here for queries
  queryOptions: {
    staleTime: 5_000, // 缓存数据过期时间（毫秒） 默认5s，0表示不缓存
    gcTime: 300_000, // 缓存数据垃圾回收时间（毫秒）默认 5分钟，0表示不垃圾回收
  },
})
.mount('#app')

