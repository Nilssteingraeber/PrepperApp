import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as FaIcons from 'oh-vue-icons/icons'
import { addIcons } from 'oh-vue-icons'
import VueNumberInput from '@chenfengyuan/vue-number-input'

const app = createApp(App)

const Fa = Object.values({ ...FaIcons })

app.component('VueNumberInput', VueNumberInput)
addIcons(...Fa)

app.use(router)

app.mount('#app')
