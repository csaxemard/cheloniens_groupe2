<script setup>
    import { ref, watch, inject } from "vue";

    let cookieDo = inject("cookieDo");



    let exeNumber = 8;
    let exeName = "v-model"

    let username = ref("")
    if (cookieDo.get("ex8-username") != null) {
        username.value = cookieDo.get("ex8-username");
    }
    let bio = ref("");
    if (cookieDo.get("ex8-bio") != null) {
        bio.value = cookieDo.get("ex8-bio");
    }

    watch([username, bio], ([usernameValue, bioValue]) => {
        cookieDo.set("ex8-username", usernameValue);
        cookieDo.set("ex8-bio", bioValue);
    })
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
                <input type="text" name="username" id="name" v-model="username" placeholder="Nom d'utilisateur" size="30" value="Edith Piaf">
                <p>
                    <span>Username : {{ username }}</span>
                </p>
                <textarea name="bio" id="bio" v-model="bio" placeholder="Votre bio..."></textarea>
                <p>Nombre de caractères : {{ bio.trim().length }}</p>
        </div>
    </div>
</template>

<style scoped>
    .exe-body {
        width: fit-content;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 10px;

        input {
            text-align: center;
        }
        textarea {
            margin-top: 10px;
            width: 100%;
        }
    }
</style>