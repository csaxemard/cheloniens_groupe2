<script setup>
    import Footer from '@/Components/Footer.vue';
    import Header from "@/Components/Header.vue";
    import SvgSprites from '@/Components/SvgSprites.vue';
</script>

<template>
    <div class="MainLayout">
        <Header />
        <slot></slot>
        <Footer />
        <SvgSprites />
    </div>
</template>

<style scoped>
    .MainLayout {
        height: 100vh;
        width: 100vw;

        background-color: var(--bg);

        display: flex;
        flex-direction: column;

        font-family: var(--font);
        color: var(--text);
    }
</style>

<style>
    .MainLayout {
        & > main {
            flex: 1;

            &.centeredX {
                align-self: center;
            }

            &.centeredY {
                margin: auto 0;
                flex-grow: 0;
            }

            &.offsetTop {
                margin-top: 50px;
            }
        }
    }

    body {
        overflow-x: hidden;
    }
</style>