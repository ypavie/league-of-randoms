import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { CURRENT_PATCH } from './globals.js'

const app = createApp(App)
app.config.globalProperties.$CURRENT_PATCH = CURRENT_PATCH
app.mount('#app')
