import { createApp } from 'vue'

import App from '@/App.vue'
import router from "@/router.js"
import "@/main.css"
import { initLocalStorage } from '@/appState.js'

// Init :
initLocalStorage()

// Main :
createApp(App).use(router).mount("#app")
