import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { ImgUtil } from './utils/imgHandler'

ImgUtil.storeImgList()

createApp(App).mount('#app')
