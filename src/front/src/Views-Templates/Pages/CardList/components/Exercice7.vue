<script setup>
    // Imports

    import { ref, inject, watch } from "vue";
    
    let confettiFromEle = inject("confettiFromEle");
    let cookieDo = inject("cookieDo");
    


    // Fonctions
    
    function resetColor() {
        color.value = "#8abdff";
    }



    // Main

    let exeNumber = 7;
    let exeName = "v-bind"

    let isDisabled = ref(false);

    let color = ref("#8abdff")
    if (cookieDo.get("ex7-color") != null) {
        color.value = cookieDo.get("ex7-color");
    }
    watch(color, (colorValue) => {
        cookieDo.set("ex7-color", colorValue)
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
            <div>
                <button @click="isDisabled = !isDisabled">{{ !isDisabled ? "Casser" : "Réparer"}} le bouton de droite</button>
                <button id="content" style="width: 50px;" v-bind:disabled="isDisabled" @click="confettiFromEle(`#content`)">{{ isDisabled ? ":(" : ":)" }}
                </button>
            </div>
            <div class="colorChoice">
                <p>Choisissez une couleur pour ce bloc</p>
                <div>
                    <button class="large reset charAsIcon" @click="resetColor()">⭯</button>
                    <input type="color" name="color" id="color" v-model="color">
                    <span class="large charAsIcon">➜</span>
                    <div class="result" :style="{backgroundColor: color}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    button {
        &:hover {
            border-color: v-bind(color);
        }
        &:disabled {
            border-color: transparent;
        }
    }

    .exe-body>div {
        display: flex;
        gap: 10px;
    }

    .exe-body .colorChoice {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #4d4d4d;
        padding: 10px;

        div {
            width: min-content;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        input {
            /* pos self */
            position: relative;
            width: 30px;
            height: 30px;
            /* prop self */
            transition: scale .2s, rotate .2s, var(--transitionDefaults);
            visibility: hidden;


            &:before {
                content: "";
                position: absolute;
                visibility: visible;
                top: 0 !important;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 50%;
                cursor: pointer;
                border: 3px dashed white;
                background-color: v-bind(color);
            }
            &:active {
                rotate: -90deg;
                scale: .92;
                transition: none;
            }
        }

        .reset {
            font-size: large;
            /* border: white 1px solid; */
            background: none;
            padding: 5px;
            width: 30px;
            height: 30px;
            /* border-radius: 50%; */
            scale: 1;
            transition: scale .3s, rotate .5s, var(--transitionDefaults);

            &:active {
                rotate: 360deg;
                scale: .8;
                transition: none;
            }
        }


        .result {
            width: 50px;
            height: 50px;

            box-shadow: #fff 1px 2px;
        }
    }
</style>