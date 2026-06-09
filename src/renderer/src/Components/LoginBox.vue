<script setup lang="ts">
    import { reactive, ref } from 'vue';



    function submitProfileForm(loginOrSignin: "login" | "signin") {
        const form = loginOrSignin == 'login' ? formLogin : formSignin

        formWaitMsg.value = ""
        formErrorMsg.value = ""

        // Vérification form
        for (const field of Object.values(form)) {
            if (field == "") {
                setTimeout(() => formErrorMsg.value = "Les champs ne doivent pas être vides.", 0);
                return;
            }
        }

        // Fetch

        formWaitMsg.value = "Veuillez patienter..."
        fetch("http://localhost:3000/api/hello", {
            method: "POST",
            body: "Bonjour facteur :D"
        })
            .then((res) => {
                console.log("ok : ", res.ok);
                console.log("status : ", res.status);
                res.text().then(body => console.log("body :", body));
            });



    }



    const loginBoxCurrentTab = ref<"loginform" | "signinForm">("signinForm")
    const formWaitMsg = ref("")
    const formErrorMsg = ref("")
    const formSignin = reactive({ email: "", lastName: "", firstName: "", password: "" })
    const formLogin = reactive({ email: "", password: "" })

</script>

<template>
    <div class="loginBox">
        <div class="tabs">
            <button :class="loginBoxCurrentTab != 'loginform' ? 'isCurrentTab' : ''"
                @click="loginBoxCurrentTab = 'signinForm'">Inscription</button>
            <hr>
            <button :class="loginBoxCurrentTab == 'loginform' ? 'isCurrentTab' : ''"
                @click="loginBoxCurrentTab = 'loginform'">Connexion</button>
        </div>
        <form v-if="loginBoxCurrentTab == 'signinForm'" @submit.prevent="() => submitProfileForm('signin')">
            <label>Mail<input type="email" v-model="formSignin.email"></label>
            <label>Nom<input type="text" v-model="formSignin.lastName"></label>
            <label>Prénom<input type="text" v-model="formSignin.firstName"></label>
            <label>Mot de passe<input type="text" v-model="formSignin.password"></label>
            <button type="submit">S'inscrire</button>
        </form>
        <form v-if="loginBoxCurrentTab == 'loginform'" @submit.prevent="() => submitProfileForm('login')">
            <label>Mail<input type="email" v-model="formLogin.email"></label>
            <label>Mot de passe<input type="text" v-model="formLogin.password"></label>
            <button type="submit">Se connecter</button>
        </form>
        <p class="wait" v-if="formWaitMsg">{{ formWaitMsg }}</p>
        <p class="error" v-if="formErrorMsg">{{ formErrorMsg }}</p>
    </div>

</template>

<style scoped>
    .loginBox {
        background-color: var(--bgTop1);
        border-radius: 12px;
        box-shadow: var(--shadow2);

        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .tabs {
            display: flex;
            justify-content: center;
            gap: 5px;
            /* border-bottom: solid 1px white; */
            margin-bottom: 30px;

            button {
                background-color: unset;
                font-size: 1em;
                width: stretch;

                &.isCurrentTab {
                    text-decoration: underline solid 1px;
                    text-underline-offset: 3px;
                }
            }
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 5px;

            label {
                display: flex;
                justify-content: end;
                gap: 20px;
            }

            button[type="submit"] {
                margin-top: 20px;
                align-self: flex-end;
                background-color: var(--bgTop2);
                padding: 10px 15px;
            }
        }

        p {
            text-align: center;
            word-break: break-all;
            font-size: .9em;

            &.wait {
                color: gold;
                animation: var(--animateSlowBlink);
            }

            &.error {
                animation: angryText .5s ease-out;
            }
        }
    }

</style>