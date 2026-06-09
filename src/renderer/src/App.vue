<script setup lang="ts">
    import { onMounted } from "vue"
    import appState, { initCssThemeVariables } from "./appState";



    onMounted(() => {
        // onMounted est appelé après la création du DOM
        initCssThemeVariables()

        const isDesktop = typeof window !== 'undefined' && 'electron' in window;
        if (isDesktop) {
            // Code spécifique à l'application de bureau Electron
            // @ts-ignore
            window.electron.ipcRenderer.send('ping');
        } else {
            // Code pour le Web ou le Mobile (ex: Plugins Capacitor)
            console.log("Running on Web/Mobile context");
        }
    })
</script>

<template>
    <div class="App" :class="appState.theme">
        <RouterView />
    </div>
</template>

<style scoped>
</style>
