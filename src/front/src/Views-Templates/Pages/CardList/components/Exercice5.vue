<script setup>
    let exeNumber = 5;
    let exeName = "v-for"

    let listNb = []
    for (let i = 1; i < 10; i++) {
        if (i % 2 != 0) {
            listNb.push(i);
        }
    }

    let fruits = { a: 'Pomme', b: 'Banane', c: 'Cerise' }
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
                <span v-for="i in listNb" v-text="i + ' '"></span>
            </div>
            <div>
                <span v-for="(fruit, key, index) in fruits" v-text="fruit + ' '"></span>
            </div>
            <p class="note-small" style="color: #b2b2b2">(Avec l'aimable participation de v-for)</p>
        </div>
    </div>
</template>

<style scoped>
</style>