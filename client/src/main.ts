import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as FaIcons from 'oh-vue-icons/icons'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import VueNumberInput from '@chenfengyuan/vue-number-input'
import "./store"
import store from './store'
import VueSelect from 'vue3-select-component'

const app = createApp(App)

app.component('VueNumberInput', VueNumberInput)

// Icons
const Fa = Object.values({ ...FaIcons })
addIcons(...Fa)


app.use(store)
app.use(router)

app.component("v-select", VueSelect)
app.mount('#app')
