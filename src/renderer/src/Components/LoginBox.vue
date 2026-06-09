<script setup lang="ts">
    import appState from '@/appState';
    import { reactive, ref } from 'vue';



    function submitProfileForm(loginOrSignin: "login" | "signin") {
        const form = loginOrSignin === 'login' ? formLogin : formSignin
        const endpoint = loginOrSignin === 'login' ? '/api/login' : '/api/signin'

        // Reset messages
        formWaitMsg.value = ""
        formErrorMsg.value = ""
        formOkMsg.value = ""

        // Forms checks
        for (const field of Object.values(form)) {
            if (field == "") {
                setTimeout(() => formErrorMsg.value = "Les champs ne doivent pas être vides.", 0);   // Note : SetTimeout 0s waits for the nexrt render tick
                return;
            }
        }

        formWaitMsg.value = "Veuillez patienter..."

        // Send POST request to backend with username/password as JSON
        fetch(`http://localhost:3000${endpoint}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: form.username, password: form.password })
        })
            .then(async res => {
                if (res.status === 429) {
                    throw new Error('Too many attempts, wait 15 minutes')
                }
                const data = await res.json()
                if (!res.ok) throw new Error(data.error)
                return data
            })
            .then(data => {
                formWaitMsg.value = ""
                if (loginOrSignin === "signin") {
                    formOkMsg.value = "Inscription réussie. Vous pouvez vous connecter."
                    loginBoxCurrentTab.value = "loginForm"
                    formLogin.username = formSignin.username
                    // Reet fields
                    formSignin.username = ""
                    formSignin.password = ""
                } else {
                    appState.currentUser = data.user
                    formLogin.password = ""
                }
            })
            .catch(error => {
                formWaitMsg.value = ""
                console.error("Error details:", error)
                formErrorMsg.value = error
            })
    }

    function logout() {
        appState.currentUser = null
        loginBoxCurrentTab.value = "loginForm"
        formLogin.username = ""
        formLogin.password = ""
        // Small bug : LoginBox gets closed on click logout button
    }



    const loginBoxCurrentTab = ref<"loginForm" | "signinForm">("signinForm")
    const formWaitMsg = ref("")
    const formErrorMsg = ref("")
    const formOkMsg = ref("")
    const formSignin = reactive({ username: "", password: "" })
    const formLogin = reactive({ username: "", password: "" })
    // const showPassword = ref(false)   // TODO: Add eye button to show password right after label
</script>

<template>
    <div class="LoginBox">
        <div class="userIsConnectedBox" v-if="appState.currentUser != null">
            <p>Utilisateur connecté</p>
            <p>{{ appState.currentUser.username }} <span v-if="appState.currentUser.role === 'admin'"> (admin)</span>
            </p>
            <button @click="logout">Se déconnecter</button>
        </div>

        <div class="authForms" v-else>
            <div class="tabs">
                <button :class="loginBoxCurrentTab != 'loginForm' ? 'isCurrentTab' : ''"
                    @click="loginBoxCurrentTab = 'signinForm'">Inscription</button>
                <hr>
                <button :class="loginBoxCurrentTab == 'loginForm' ? 'isCurrentTab' : ''"
                    @click="loginBoxCurrentTab = 'loginForm'">Connexion</button>
            </div>

            <form v-if="loginBoxCurrentTab == 'signinForm'" @submit.prevent="() => submitProfileForm('signin')">
                <label>Identifiant<input type="text" v-model="formSignin.username"></label>
                <label>Mot de passe<input type="password" visible v-model="formSignin.password"></label>
                <button type="submit">S'inscrire</button>
            </form>

            <form v-if="loginBoxCurrentTab == 'loginForm'" @submit.prevent="() => submitProfileForm('login')">
                <label>Identifiant<input type="text" v-model="formLogin.username"></label>
                <label>Mot de passe<input type="password" visible v-model="formLogin.password"></label>
                <button type="submit">Se connecter</button>
            </form>

            <p class="formOk" v-if="formOkMsg">{{ formOkMsg }}</p>
            <p class="wait" v-if="formWaitMsg">{{ formWaitMsg }}</p>
            <p class="error" v-if="formErrorMsg">{{ formErrorMsg }}</p>
        </div>
    </div>
</template>

<style scoped>
    .LoginBox {
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

        .authForms > p {
            text-align: center;
            font-size: .9em;

            &.formOk {
                color: #4dcc4d;
            }

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