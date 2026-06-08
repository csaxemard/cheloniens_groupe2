<script setup>

</script>

<template>
    <div class="View centered">
        <h1>Boutons</h1>
        <div class="boutons">
            <button id="b1">Default</button>
            <div id="glassContainer"></div>
            <button id="b2" class="glass">Transparent <br> push</button>
            <button id="b3" class="glass">Glass <br> push</button>
            <button id="b4" class="glass">Glass tap </button>
            <button id="bTap">Tap</button>
            <button :id="`b${i}`" v-for="i in 53"></button>
        </div>
    </div>
</template>

<style scoped>
    .boutons {
        position: relative;
        
        border: var(--divider);
        border-radius: 12px;

        padding: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 2fr));
        justify-items: center;
        gap: 20px;
    }

    button {
        width: 120px;
        height: 50px;

        .small {
            color: var(--textSub1);
        }
    }

    #glassContainer {
        position: absolute;
        top: 10px;
        left: 152px;
        width: 428px;
        height: 70px;
        z-index: -1;
        transform: skewX(-10deg);
        
        background-image: linear-gradient(145deg, #037efe 30%, #1cdac6 90%);
        border-radius: 12px;
        pointer-events: none;
    }

    .glass {
        background-color: transparent;
        transition: var(--transitionDefaultsBtn), box-shadow .3s;
        color: #fff;
        
        &:hover {
            box-shadow: var(--shadow2);
        }

        &:active {
            transition: var(--transitionDefaultsBtnActive), box-shadow 3s;
            /* transition: var(--transitionDefaultsBtnActive), box-shadow 3s, scale .07s; */
        }

        &#b3 {
            &:hover {
                background-color: #ffffff18;
            }
        }
        &#b4 {
            position: relative;
            
            &:hover {
                background-color: #ffffff18;
            }
            &:active {
                scale: 1;
                background-color: #ffffff8c;
                transition-duration: .0s;
                &::after {
                    content: "clink !";
                    position: absolute;
                    top: 5px;
                    align-self: end;
                    font-size: x-small;
                }
            }
        }

        .small {
            color: #fff;
        }
    }

    #bTap {
        /* transition: var(--transitionDefaultsBtn), color 5s; */
        &:active {
            scale: 1 !important;
            transition: var(--transitionDefaultsBtnActive), background-color .1s;
        }
    }
</style>