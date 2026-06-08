<script setup>
    import { ref } from "vue";


    let exeNumber = 3;
    let exeName = "v-show"

    let showDiv = ref(true)
    let warning = ref(showDiv);
</script>

<template>
    <div class="exercice" :id="`exercice${exeNumber}`">
        <div class="exe-header">
            <h3>Exercice {{exeNumber }} :
                <br><span>{{exeName }}</span>
            </h3>
    
            <div class="flexright">
                <p v-show="showDiv">Mode sombre activé</p>
                <p class="alert" v-show="warning">Attention ⚠️ Le mode sombre est vraiment activé !</p>
            </div>
        </div>

        <div class="exe-body">
            <button
                @click="showDiv = !showDiv"
                >
                {{ (showDiv ? "Désa" : "A") + "ctiver le mode sombre" }}
            </button>

        </div>
    </div>
</template>

<style scoped>
</style>