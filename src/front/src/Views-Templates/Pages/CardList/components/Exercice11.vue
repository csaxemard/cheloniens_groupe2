<script setup>
    import { ref } from "vue";



    let exeNumber = 11;
    let exeName = "v-once"

    let modified = ref(5);
    let listeNb = ref(3)

</script>

<template>
    <div class="exercice" :id="`exercice${exeNumber}`">
        <div class="exe-header">
            <h3>Exercice {{ exeNumber }} :
                <br><span>{{ exeName }}</span>
            </h3>

            <div class="flexright">
                <div class="compteur">
                    <button @click="modified++">Augmenter le compteur</button>
                    <p class="small">Compteur (sans v-once) : {{ modified }}</p>
                    <p class="small" v-once>Compteur (avec v-once) : {{ modified }}</p>
                </div>
            </div>
        </div>

        <div class="exe-body">
            <button @click="listeNb++;">Ajouter un élément à la liste</button>
            <div class="listes-cont">
                <div>
                    <p>Sans v-once</p>
                    <ul v-once><li v-for="i in listeNb">{{ i }}</li></ul>
                </div>
                <div>
                    <p>Avec v-once</p>
                    <ul><li v-for="i in listeNb">{{ i }}</li></ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .exe-body {
        
        .listes-cont {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px;

            div {
                width: 120px;
                max-width: 120px;
                padding: 5px 10px 10px 10px;
                background-color: #4d4d4d;

                p {
                    text-decoration: underline;
                    text-underline-offset: 5px;
                    margin-bottom: 5px;
                }

                ul {
                    width: 100%;
                    max-width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    justify-content: center;
                    padding: 0;
                    list-style: none;

                    li {
                       flex: 0 0 auto;
                       min-width: 0;
                    }
                }
            }
        }
    }
    .compteur {
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 5px;
        margin-bottom: 10px;
    }
    button {
        /* font-size: 14px; */
        padding: 3px;
    }
</style>