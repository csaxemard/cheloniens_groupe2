<script setup>
    import { ref, watch, inject } from "vue";
    import Exercice9Card from "./Card.vue";

    let exeNumber = 9;
    let exeName = "v-slot"
    // 1. Créer un composant Card avec un slot nommé footer pour afficher un texte
    // personnalisé dans le pied de la carte.
    // 2. Créer un composant ListItem avec un slot scoped qui reçoit une prop item et affiche
    // son nom et sa description
</script>

<template v-slot="footer">
    <div class="exercice" :id="`exercice${exeNumber}`">
        <div class="exe-header">
            <h3>Exercice {{ exeNumber }} :
                <br><span>{{ exeName }}</span>
            </h3>

            <div class="flexright">
            </div>
        </div>

        <div class="exe-body">
            <Exercice9Card>
                Contenu
                <template #footer>
                    Texte personnalisé

                </template>
            </Exercice9Card>
        </div>
    </div>
</template>

<style scoped>
    .exe-body {
        padding: 10px;
        background-color: #525252;
    }
</style>