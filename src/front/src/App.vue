<script setup>
    import {onMounted} from "vue"

    import Header from "./Views/components/Header.vue";
    import Footer from "./Views/components/Footer.vue";
    import appState, { initCssThemeVariables } from "@/appState.js";

    onMounted(() => {
        // onMounted est appelé après la création du DOM
        initCssThemeVariables()
    })
</script>

<template>
    <div id="root" :class="appState.theme.value">
        <Header></Header>
        <RouterView />
        <Footer></Footer>
    </div>
</template>

<style scoped>
    #root {
        /* self pos */
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        z-index: 0;

        /* self prop */
        background-color: var(--bg);
        overflow-x: hidden;

        /* content prop */
        color: var(--text);
        font-family: var(--font);

        & > .View {
            flex: 1;
            margin-bottom: 50px;
            z-index: 1;

            display: flex;
            flex-direction: column;
            gap: 50px;

            &.centered {
                width: 80vw;
                margin: 50px auto;
            }
        }

        & .Component {
            z-index: 2;
        }
    }
</style>
