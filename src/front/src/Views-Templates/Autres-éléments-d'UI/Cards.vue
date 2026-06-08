<script setup>
    import { ref, onMounted } from 'vue';



    function foldUnfold(cardGroupIndex) {
        const i = foldedCardGroups_indexes.value.indexOf(cardGroupIndex)

        if (i === -1) {
            foldedCardGroups_indexes.value.push(cardGroupIndex)
        } else {
            foldedCardGroups_indexes.value.splice(i, 1) // remove from list
        }
    }



    const cardsVars = {
        1: {
            hoverBgs: ["#ffffff18", "transparent", "#00000010"],
            hoverBgIndex: ref(0),
            // isTopHidden
            // isCardContainerFolded
            // element
        },
    }


    const nbOfCardGroups = 2;
    const foldedCardGroups_indexes = ref([]);

    for (let i = 1; i < nbOfCardGroups + 1; i++) {
        if (!cardsVars[i]) cardsVars[i] = {};
        cardsVars[i].isTopHidden = ref(false);
        cardsVars[i].isCardContainerFolded = ref(false);
    }

    onMounted(() => {
        document.querySelectorAll(`.cardGroup`).forEach((cardGroup) => {
            cardGroup.dataset.baseHeight = Math.round(cardGroup.getBoundingClientRect().height) + "px" // + 20 + "px"
            cardGroup.style.height = cardGroup.dataset.baseHeight
        })
    })
</script>

<template>
    <main class="View centered">
        <section class="cardGroup" v-for="cardGroupIndex in [1]" :id="`cardGroup` + cardGroupIndex"
            :style="{ height: foldedCardGroups_indexes.includes(cardGroupIndex) ? `100px` : cardsVars[cardGroupIndex].element?.dataset.baseHeight }"
            :ref="el => cardsVars[cardGroupIndex].element = el">
            <div class="top">
                <a href="https://flutter.dev/multi-platform/web" target="_blank"
                    v-show="!cardsVars[cardGroupIndex].isTopHidden.value">Inspired by
                    flutter.dev/multi-platform/web</a>

                <div class="options" v-show="!cardsVars[cardGroupIndex].isTopHidden.value">
                    <p>Card hover background :</p>
                    <label v-for="(bg, index) in cardsVars[cardGroupIndex].hoverBgs">
                        {{ bg }}
                        <input type="radio" :name="`cardGroup${cardGroupIndex}_options_hoverBgs`" :value="index"
                            v-model="cardsVars[cardGroupIndex].hoverBgIndex.value">
                    </label>
                </div>

                <div class="controlButtons">
                    <button class="hideTop charAsIcon" title="Afficher / Masquer les contrôles"
                        @click="cardsVars[cardGroupIndex].isTopHidden.value = !cardsVars[cardGroupIndex].isTopHidden.value">🧿</button>
                    <button class="hideCardContainer charAsIcon" title="Afficher / Masquer le groupe"
                        :style="{ rotate: foldedCardGroups_indexes.includes(cardGroupIndex) ? `180deg` : `360deg` }"
                        @click="foldUnfold(cardGroupIndex)">△</button>
                </div>
            </div>

            <h2>Start learning about Flutter on the web</h2>

            <div class="cards">
                <div class="card">
                    <p class="charAsIcon large">🦆</p>
                    <h3>See the samples</h3>
                    <p class="content">Reference code examples and sample applications for building Flutter web apps
                        while you learn.</p>
                </div>
                <div class="card">
                    <p class="charAsIcon large">☀️</p>
                    <h3>Watch the video</h3>
                    <p class="content">What's new in Flutter. Learn how WebAssembly works and how it makes Flutter
                        web apps faster.</p>
                </div>
                <div class="card">
                    <p class="charAsIcon large">🏅</p>
                    <h3>Get started in docs</h3>
                    <p class="content">Dig in and start building with more detailed resources for Flutter on the web
                        in docs.</p>
                </div>
                <div class="card">
                    <p class="charAsIcon large">🍃</p>
                    <h3>Learn about Wasm support</h3>
                    <p class="content">See how to deploy your app using WebAssembly and learn more about how it
                        works.</p>
                </div>
            </div>
        </section>
        <section class="cardGroup" v-for="cardGroupIndex in [2]" :id="`cardGroup` + cardGroupIndex"
            :style="{ height: foldedCardGroups_indexes.includes(cardGroupIndex) ? `100px` : cardsVars[cardGroupIndex].element?.dataset.baseHeight }"
            :ref="el => cardsVars[cardGroupIndex].element = el">
            <div class="top">
                <a href="https://flutter.dev/multi-platform/web" target="_blank"
                    v-show="!cardsVars[cardGroupIndex].isTopHidden.value">Inspired by
                    flutter.dev/multi-platform/web</a>

                <div class="options" v-show="!cardsVars[cardGroupIndex].isTopHidden.value">
                    <p>Card hover background :</p>
                    <label v-for="(bg, index) in cardsVars[cardGroupIndex].hoverBgs">
                        {{ bg }}
                        <input type="radio" :name="`cardGroup${cardGroupIndex}_options_hoverBgs`" :value="index">
                    </label>
                </div>

                <div class="controlButtons">
                    <button class="hideTop charAsIcon" title="Afficher / Masquer les contrôles"
                        @click="cardsVars[cardGroupIndex].isTopHidden.value = !cardsVars[cardGroupIndex].isTopHidden.value">🧿</button>
                    <button class="hideCardContainer charAsIcon" title="Afficher / Masquer le groupe"
                        :style="{ rotate: foldedCardGroups_indexes.includes(cardGroupIndex) ? `180deg` : `360deg` }"
                        @click="foldUnfold(cardGroupIndex)">△</button>
                </div>
            </div>

            <h2>Start learning about Flutter on the web</h2>

            <div class="cards">
                <div class="card">
                    <p class="charAsIcon large">🦆</p>
                    <h3>See the samples</h3>
                    <p class="content">Reference code examples and sample applications for building Flutter web apps
                        while you learn.</p>
                </div>
                <div class="card">
                    <p class="charAsIcon large">☀️</p>
                    <h3>Watch the video</h3>
                    <p class="content">What's new in Flutter. Learn how WebAssembly works and how it makes Flutter
                        web apps faster.</p>
                </div>
                <div class="card">
                    <p class="charAsIcon large">🏅</p>
                    <h3>Get started in docs</h3>
                    <p class="content">Dig in and start building with more detailed resources for Flutter on the web
                        in docs.</p>
                </div>
                <div class="card">
                    <p class="charAsIcon large">🍃</p>
                    <h3>Learn about Wasm support</h3>
                    <p class="content">See how to deploy your app using WebAssembly and learn more about how it
                        works.</p>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
    main {
        margin-top: 70px;

        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .cardGroup {
        position: relative;
        height: fit-content;
        padding: 50px;

        border: var(--divider);
        border-radius: 12px;
        overflow: hidden;
        transition: height .4s, var(--transitionDefaults);

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;

        .top {
            position: absolute;
            width: 100%;
            display: flex;
            justify-content: space-around;
            top: 5px;

            a {
                font-size: small;
            }

            .options {
                font-size: small;

                display: flex;
                gap: 10px;

                label {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    line-height: 1;
                }
            }

            .controlButtons {
                position: absolute;
                right: 5px;
                display: flex;
                flex-direction: column;

                .hideCardContainer {
                    background-color: transparent;
                    opacity: .5;
                    transition: rotate .3s, scale .3s, box-shadow .5s, border-color .5s, var(--transitionDefaults) !important;

                    &:hover {
                        box-shadow: #333333 0 0 5px 0;
                    }
                }

                .hideTop {
                    position: relative;
                    background-color: transparent;
                    opacity: .5;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    &::before {
                        content: "";
                        position: absolute;
                        top: 50%;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        height: 1px;

                        rotate: 20deg;
                        background-color: var(--text);
                        pointer-events: none;
                    }
                }
            }
        }

        h2 {
            font-size: 50px;
        }
    }

    .cards {
        border: var(--divider);

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 90px;
        row-gap: 50px;

        .card {
            border: var(--divider);
            width: 400px;
            min-height: 150px;
            padding: 20px;

            border-radius: 12px;

            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }

    #cardGroup1 {
        --card1-text: white;
        --card1-bgTop1: #17609a;
        --card1-bgGradient: linear-gradient(145deg, #037efe 30%, #1cdac6 90%);

        background-image: var(--card1-bgGradient);

        border: none;

        * {
            color: var(--card1-text);
            border: none;
        }

        .hideTop::before {
            content: v-bind("cardsVars[1].isTopHidden.value ? `none` : `'' `");
            background-color: var(--card1-text);
        }

        .card {
            transition: box-shadow .3s, scale .3s, var(--transitionDefaults);
            user-select: none;

            &:hover {
                cursor: pointer;
                box-shadow: var(--shadow2);
                background-color: v-bind("cardsVars[1].hoverBgs[cardsVars[1].hoverBgIndex.value]");
            }

            &:active {
                scale: .98;
                transition: box-shadow .3s, scale .1s, var(--transitionDefaults);
            }

            .charAsIcon {
                position: relative;
                align-self: start;
                width: 60px;
                height: 60px;
                z-index: 0;

                line-height: 60px;

                display: flex;
                align-items: center;
                justify-content: center;

                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    border-radius: 50%;
                    z-index: -1;

                    pointer-events: none;
                    background-color: var(--card1-bgTop1);
                }
            }
        }
    }
</style>