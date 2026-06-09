<script setup>
    import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
    <MainLayout>
        <main class="Home centeredX offsetTop">
            <h1>Suivi de Cheloniens en Martinique</h1>
            <img src="@/assets/image1.jpg" style="width: 100px; height: auto;" alt="Photo de tortue">
            <p>🐢</p>
        </main>
    </MainLayout>
</template>

<style scoped>
    .Home {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }
</style>