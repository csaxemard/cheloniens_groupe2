<script setup>
    import { ref, watch } from "vue";



    let exeNumber = 4;
    let exeName = "v-if, v-else, v-else-if"

    let sizes = ref(["petit", "moyen", "grand"])
    let userRights = ref(["admin", "utilisateur", "invité"])

    let formSizes = ref("grand");
    let formUserRights = ref("invité");
    watch(    // exécute un callback quand une variable réactive change
        [formSizes, formUserRights],    // Variable à surveiller
        ([newSize, newRight]) => {    // callback
        console.log(["Taille : " + newSize, "Droits : " + newRight]);
    });

</script>

<template>
    <div class="exercice" :id="`exercice${exeNumber}`">
        <!-- <button class="fold">⌄</button> -->
        <div class="exe-header">
            <h3>Exercice {{ exeNumber }} :
                <br><span>{{exeName}}</span>
            </h3>

            <div class="flexright">
                <p>[Compte
                    <span v-if="formUserRights == userRights[0]">{{ userRights[0] }}</span>
                    <span v-else-if="formUserRights == userRights[1]">{{ userRights[1] }}</span>
                    <span v-else="formUserRights == userRights[2]">{{ userRights[2] }}</span>
                    <span></span>]
                </p>

                <p>Bienvenue, voici un
                    <span v-if="formSizes == sizes[0]">{{ sizes[0] }}</span>
                    <span v-else-if="formSizes == sizes[1]">{{ sizes[1] }}</span>
                    <span v-else="formSizes == sizes[2]">{{ sizes[2] }}</span>
                    café ☕
                </p>
            </div>
        </div>

        <div class="exe-body">
            <div class="forms">
                <fieldset>
                        <label v-for="size in sizes">{{ size.charAt(0).toUpperCase() + size.slice(1) }}
                            <input type="radio" :id="size" name="formSizes" v-model="formSizes" :value="size" />
                        </label>
                </fieldset>
                <hr>
                <fieldset>
                        <label v-for="userRight in userRights">
                            <input type="radio" :id="userRight" name="formUserRights" v-model="formUserRights" :value="userRight" />
                            {{ userRight.charAt(0).toUpperCase() + userRight.slice(1) }}
                        </label>
                </fieldset>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .forms {
        display: flex;
        flex-direction: row;
        gap: 5px;

        fieldset {
            width: 150px;
            display: flex;
            flex-direction: column;
            border: none;
            gap: 2px;

            &:first-child {
                align-items: end;
            }

            label {
                display: flex;
                gap: 5px;
            }
        }

    }

    /* button.fold {
        width: 50px;
        height: 50px;
        background-color: #ffffff80;
        color: black;
        font-size: xx-large;
        border: none;
    } */
</style>