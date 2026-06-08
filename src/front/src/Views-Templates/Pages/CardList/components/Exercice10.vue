<script setup>
    import { ref, watch } from "vue";



    let exeNumber = 10;
    let exeName = "v-pre"
    let formule = 1+1

</script>

<template>
    <div class="exercice" :id="`exercice${exeNumber}`">
        <div class="exe-header">
            <h3>Exercice {{ exeNumber }} :
                <br><span>{{ exeName }}</span>
            </h3>

            <div class="flexright">
            </div>
        </div>
        
        <div class="exe-body">
            <div v-pre>
                <div>{{ 1 + 1 }}</div>
            </div>
            <div v-pre>
                <p>{{ 2 + 2 }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>