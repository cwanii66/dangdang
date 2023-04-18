import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { ImgUtil } from './utils/imgUtil'
import 'element-plus/theme-chalk/index.css'

ImgUtil.storeImgList()
const app = createApp(App)
app.use(ElementPlus, { size: 'small' })
app.mount('#app')
