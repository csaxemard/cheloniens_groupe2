<script setup>
    import { ref, reactive, inject } from "vue";
    
        

    let cookieDo = inject("cookieDo");

    function incrementCompteur() {
        compteur.value += 1;
        cookieDo.set("ex1-compteur", compteur.value)
        // document.cookie = `ex1-compteur=${compteur.value}; path=/; max-age=3600`
    }



    let exeNumber = 1;
    let exeName = "v-text"
    
    let compteur = ref(0)
    if (cookieDo.get("ex1-compteur") != null) {
        compteur.value = Number(cookieDo.get("ex1-compteur"));
    }

    let dateNow = ref(new Date().toLocaleString(`fr`))
    setInterval(() => {
        dateNow.value = new Date().toLocaleString("fr");
    }, 1000);
</script>

<template>
    <div class="exercice" :id="`exercice${exeNumber}`">
        <div class="exe-header">
            <h3>Exercice {{exeNumber }} :
                <br><span>{{exeName }}</span>
            </h3>
        </div>

        <div class="exe-body">
            <h2 v-text="dateNow"></h2>
            <button @click="incrementCompteur()">Augmenter le compteur</button>
            <p><span v-text="compteur"></span></p>
        </div>
    </div>
</template>

<style scoped>
    h2 {
        font-size: small;
    }
</style>