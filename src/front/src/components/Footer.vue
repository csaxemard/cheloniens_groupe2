<script setup>
    import appState from '@/appState.js';

</script>

<template>
    <footer class="Component">
        <p>&copy; 2026 {{ appState.titleDefault }} par IFREMER 
            <!-- et -->
            <!-- <a target="_blank" href="https://github.com/csaxemard/cheloniens_groupe2/">ICEA Groupe 2</a> -->
        </p>
    </footer>
</template>

<style scoped>
    footer {
        /* pos */
        margin-top: 20px;
        padding: 15px;
        width: 100%;

        /* prop */
        background-color: var(--bg);

        p {
            font-size: small;
            color: var(--textSub1);
        }
    }
</style>