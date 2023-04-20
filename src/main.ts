import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { ImgUtil } from './utils/imgUtil'
import 'element-plus/theme-chalk/index.css'
import router from './router'
import store from './store'

ImgUtil.storeImgList()

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { size: 'small' })
app.mount('#app')
