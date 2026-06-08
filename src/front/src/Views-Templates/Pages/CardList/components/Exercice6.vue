<script setup>
    import { ref } from "vue";


    
    function onClicked() {
        compteur.value++
        
        let sparkSpot = document.querySelector(`.sparkSpot`);
        let spark = document.createElement('spark');
        spark.classList.add("spark");
        sparkSpot.appendChild(spark);

        for (var i = 0; i <= 2; i++) {
            let span = document.createElement('span');
            if (i == 0) {
                span.style.transform = 'rotate(' + (i * 45) + 'deg)' +
                ' translate(0, -5px)';
            } else if (i == 1) {
                span.style.transform = 'rotate(' + (i * 45) + 'deg)' +
                ' translate(0, -5px)';
            } else if (i == 2) {
                span.style.transform = 'rotate(' + (i * 45) + 'deg)' +
                ' translate(0, -5px)';
            }
            
            spark.appendChild(span);
        }
        setTimeout(function () { spark.remove(); }, 2000);
    }

    function onEnterPressed() {
        enterPressed.value = true;
        rFontSize.value ++;
        animKey++;
    }

    

    let exeNumber = 6;
    let exeName = "v-on"

    let compteur = ref(0)
    let enterPressed = ref(false);
    let rFontSize = ref(14)
    let animKey = 0
</script>

<template>
    <div class="exercice" :id="`exercice${exeNumber}`">
        <div class="exe-header">
            <h3>Exercice {{ exeNumber }} :
                <br><span>{{ exeName }}</span>
            </h3>

            <div class="flexright">
                <p>{{ compteur }}</p>

                <div class="sparkSpot"></div>
            </div>
        </div>

        <div class="exe-body">
            <button @click="onClicked()">Augmenter le compteur</button>
            <input type="text" @keyup.enter="onEnterPressed()" placeholder="Ne pas appuyer sur entrée..." size="22">
            <div class="note-small" style="height: 20px;">
                <p class="alert" :key="animKey" v-show="enterPressed" :style="{ fontSize: rFontSize + `px` }">Aaaah vous avez appuyé sur entrée !</p>
                <!-- Le :key force à recréer l'élément, donc ça retrigger l'animation -->
            </div>
        </div>
    </div>
</template>

<style>
    .spark {
        width: 40px;
        height: 40px;
        /* display: block; */
        background-color: red;
        /* position: absolute; */
        /* transform: translate(0 -20px); */
        /* top: -20px; */
    }

    .spark span {
        position: absolute;
        width: 2px;
        height: 10px;
        pointer-events: none;
        transform-origin: bottom;
        overflow: hidden;
    }

    .spark span::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
        animation: animate .2s ease-in-out forwards;
    }

    @keyframes animate {
        0% {
            transform: translateY(100%);
        }
        
        100% {
            transform: translateY(-100%);
        }
    }
</style>

<style scoped>
    .alert {
        animation: angryText .2s 10;
    }
    .flexright {
        position: relative;
    }
    .sparkSpot {
        position: relative;
        top: -25px;
        right: 0;
    }
</style>