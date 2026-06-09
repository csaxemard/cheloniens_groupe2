<script setup>
    import appState from '@/appState';

</script>

<template>
    <footer class="Component">
        <p>&copy; 2026 {{ appState.appTitle }} par l'IFREMER
            <!-- et -->
            <!-- <a target="_blank" href="https://github.com/csaxemard/cheloniens_groupe2/">ICEA Groupe 2</a> -->
        </p>
    </footer>
</template>

<style scoped>
    footer {
        margin-top: 20px;
        padding: 15px;
        width: 100%;

        background-color: var(--bg);

        p {
            font-size: small;
            color: var(--textSub1);
        }
    }
</style>