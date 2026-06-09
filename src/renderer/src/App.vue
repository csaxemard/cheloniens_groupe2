<script setup lang="ts">
    import { onMounted } from "vue"
    import appState, { initCssThemeVariables } from "./appState";



    onMounted(() => {
        // onMounted est appelé après la création du DOM
        initCssThemeVariables()
    })
</script>

<template>
    <div class="App" :class="appState.theme">
        <RouterView />
    </div>
</template>

<style scoped>
</style>
