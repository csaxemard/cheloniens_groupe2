<script setup>
    import { reactive, inject } from 'vue';

    import "./exercices.css";
    let confettiFromEle = inject("confettiFromEle")
    let cookieDo = inject("cookieDo")
    
    
    
    function increment() {
        stateEx0.compteur++;
        cookieDo.set("ex0-compteur", stateEx0.compteur)
        if (stateEx0.compteur == 3 || stateEx0.compteur == 10) {
            confettiFromEle("#exercice0 .badge")
        }
    }
    
    function reset() {
        stateEx0.compteur = 0;
        cookieDo.set("ex0-compteur", "0")
    }
    
    
    
    let stateEx0 = reactive({ compteur: 0 })
    let exeNumber = 0;
    let exeName = "Test"

    if (cookieDo.get("ex0-compteur") != null) {
        stateEx0.compteur = Number(cookieDo.get("ex0-compteur"))
    }
</script>

<template>
    <div class="exercice" :id="`exercice${exeNumber}`">
        <div class="exe-header">
            <h3>Exercice {{exeNumber }} :
                <br><span>{{ exeName }}</span>
            </h3>
    
            <div class="flexright badge" :class="{good: stateEx0.compteur >= 3, 'very-good': stateEx0.compteur >= 10 }"> <!-- Méthode avec objet -->
            <!-- Méthodes pour insérer du code dans les attributs : (le : avant :class veut dire que son contenu est du js. (Liaison dynamique / v-bind)) -->
            <!-- <div :class="['badge', stateEx0.compteur >= 10 ? 'good' : '']"> --> <!-- Méthode avec tableau -->
            <!-- <div :class="`badge ${stateEx0.compteur >= 10 ? 'good' : ''}`"> --> <!-- Méthode avec string interpolée -->
                <p
                    :style="{
                        // Change la valeur de l'attribut selon condition
                        // fontSize: (stateEx0.compteur >= 10) ? 'xx-large' : 'initial'
                    }"
                    v-if="stateEx0.compteur >= 3 /* N'affiche cette balise que si condition*/"
                    >{{ stateEx0.compteur >= 10 ? "✨" : stateEx0.compteur >= 3 ? "😃" : ""}}
                    <!-- On peut faire le else if ici dans le contenu
                    Ou bien on peut faire le else if dans la balise suivante avec v-else-if -->
                </p>
                <!-- <p v-else-if="stateEx0.compteur >= 10">✨</p> -->
            </div>
        </div>
        
        <div class="exe-body">
            <p class="results">Compteur réactif : <span>{{ stateEx0.compteur }}</span></p>
            <button @click="increment()" :disabled="stateEx0.compteur >= 10">Augmenter le compteur</button>
            <p class="note-small">clics restants : {{ 10 - stateEx0.compteur }}</p>
        </div>
        <button class="reset" @click="reset()">Réinitialiser</button>
    </div>
</template>

<style scoped></style>