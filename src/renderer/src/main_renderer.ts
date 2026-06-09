import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './assets/main.css'

// Entry point for the renderer. Keep this file minimal:
// - The router is created in `router.ts` and mounted here to allow unit
//   testing `App` without side effects.
// - Importing CSS here ensures the styles are bundled with the renderer.
createApp(App).use(router).mount('#app')
