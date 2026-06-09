<script setup>
    import MainLayout from '@/Layouts/MainLayout.vue';
</script>

<template>
    <MainLayout>
        <main class="Error404 centeredX centeredY">
            <h1>Erreur 404 🐢</h1>
            <p class="">Cette page n'existe pas.</p>
        </main>
    </MainLayout>
</template>

<style scoped>
    .Error404 {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>