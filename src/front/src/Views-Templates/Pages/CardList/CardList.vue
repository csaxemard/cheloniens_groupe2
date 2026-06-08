<script>
    export const config = {
        name: "Card list"
    }
</script>

<script setup>
    import { provide } from "vue";
    import confetti from 'canvas-confetti';

    let exercicesModules = import.meta.glob('./components/Exercice*.vue', { eager: true }) // Importe tous les fichiers d'un dossier




    // Utils
    let cookieDo = {
        set(nameStr, valueStr) {
            document.cookie = `${nameStr}=${valueStr}; path=/; max-age=3600`
        },

        get(name) {
            const cookies = document.cookie.split('; ').reduce((acc, c) => {
                const [key, val] = c.split('=')
                acc[key] = decodeURIComponent(val)
                return acc
            }, {})
            return cookies[name] || null
        }
    }

    function confettiFromEle(eleSelector) {
        const rect = document.querySelector(eleSelector).getBoundingClientRect()

        const x = (rect.left + rect.width / 2) / window.innerWidth
        const y = (rect.top + rect.height / 2) / window.innerHeight

        confetti({
            particleCount: 10,
            startVelocity: 15,
            angle: 90,
            spread: 135,
            origin: { x, y }
        })
    }



    // --- Main ---
    let exercices = Object.entries(exercicesModules)    // Extrait les default de chaque modules
        .map(([path, m]) => {
            const match = path.match(/Exercice(\d+)\.vue$/);
            const number = match ? Number(match[1]) : 0;

            return {
                key: path,
                comp: m.default,
                number
            };
        })
        .sort((a, b) => a.number - b.number);
    // exercices = exercices.reverse()

    provide('confettiFromEle', confettiFromEle);
    provide("cookieDo", cookieDo);
</script>

<template>
    <main class="View">
        <img class="bg" src="/dew.jpg" alt="background" />

        <h1>Bienvenue, ceci est un test de Vue 👓</h1>

        <div class="exercices">
            <!-- Affiche chaque exercices -->
            <component v-for="ex in exercices" :key="ex.key" :is="ex.comp" />
        </div>
    </main>
</template>

<style scoped>
    main.View {
        /* Dark mode only */
        --bg: #3e3e3e;
        --text: white;
        --textSub1: white;
        --link: #6fa6ff;
        
        margin: 0 !important;
        
        background-color: var(--bg);
        color: var(--text);
    
        padding: 50px;
        align-items: center;

        & * {
            border-radius: 12px;
        }
    }

    img.bg {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: -1;

        object-fit: cover;
        /* pointer-events: none; */
        opacity: 0.5;
        transition: none;
    }

    h1 {
        position: relative;
        background-color: #3c3c3c;
        border: solid 5px transparent;
        border-radius: 50px !important;
        margin-bottom: 50px;
        padding: 10px;
        text-align: center;
        font-weight: 700;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            margin: -10px;
            border-radius: inherit;
            background: linear-gradient(175deg, #ffc33e, #58c5f2);
        }
    }

    .exercices {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 50px;

        .topright {
            position: absolute;
            top: 0;
            right: 0;
            margin: 15px 15px 0 0;

            display: flex;
            flex-direction: column;
            align-items: end;
            gap: 10px;
        }

        .alert {
            color: #ff9898;
        }

        input,
        textarea {
            border-radius: 0;
            color: black;
            border: none;
            padding: 5px;
            resize: both;
        }
    }
</style>