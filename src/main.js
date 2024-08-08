import './assets/css/main.css'

import "./assets/js/vendors/darkMode.js"
import "./assets/js/popper.min.js"
import "./assets/js/bootstrap.min.js"
import "./assets/js/simplebar.min.js"
import "./assets/js/theme.min.js"
import "./assets/js/vendors/validation.js"
import AOS from 'aos';
import 'aos/dist/aos.css';


import { createToaster } from "@meforma/vue-toaster";
window.$toast = createToaster({
    position: 'bottom'
});


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from "axios"
const app = createApp(App)

app.config.globalProperties.$API_URL = import.meta.env.VITE_API_URL
const red = "#8C3CD7"

// document.documentElement.style.setProperty('--primary-color', '#ff0000'); //Here the primary color is set to #ff0000(RED).
// document.documentElement.style.setProperty('--secondary-color', '#ff0000'); //Here the primary color is set to #ff0000(RED).

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

app.use(createPinia())
app.use(router, axios, AOS)


app.mount('#app')
