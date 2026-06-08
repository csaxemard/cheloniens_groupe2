<script setup>
    let exeNumber = 2;
    let exeName = "v-html"

    let msg_html = `
        <em>Mon site n'est pas sécurisé :)</em>
    `
    let htmlList = `
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    `
</script>

<template>
    <div class="exercice" :id="`exercice${exeNumber}`">
        <div class="exe-header">
            <h3>Exercice {{exeNumber }} :
                <br><span>{{exeName }}</span>
            </h3>
        </div>

        <div class="exe-body">
            <div v-html="htmlList"></div>
            <div v-html="msg_html"></div>
        </div>
    </div>
</template>

<style scoped>

</style>