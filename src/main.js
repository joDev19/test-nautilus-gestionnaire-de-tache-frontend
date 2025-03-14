// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'

import App from './App.vue'
import router from './router'

const vfm = createVfm()
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vfm)

app.mount('#app')
