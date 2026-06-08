<script setup>
    import Footer from '@/components/Footer.vue';
    import Header from '@/components/Header.vue';
</script>

<template>
    <div class="MainLayout">
        <Header />

        <main class="View centered">
            <slot></slot>
        </main>

        <Footer />
    </div>
</template>

<style scoped></style>