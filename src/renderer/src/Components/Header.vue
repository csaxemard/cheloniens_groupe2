<script setup lang="ts">
    import { ref } from 'vue'
    import appState from '@/appState';
import LoginBox from './LoginBox.vue';

    // function openDrawer(index) {
    //     openedDrawerIndex.value = index
    // }

    // function closeDrawer() {
    //     openedDrawerIndex.value = null
    // }

    function showLoginBox() {
        if (!isLoginBoxShown.value) {
            isLoginBoxShown.value = true
            setTimeout(() => document.addEventListener("click", closeLoginBox), 0)
        } else closeLoginBox()
    }

    function closeLoginBox(e?: MouseEvent) {
        if (e) {
            const target = e.target as HTMLElement
            if (target.closest(".LoginBox") || target.closest(".profile")) return
        }
        isLoginBoxShown.value = false
        document.removeEventListener("click", closeLoginBox)
    }





    // const openedDrawerIndex = ref(null)
    const headerIsHidden = ref(false)

    // About loginBox and forms
    const isLoginBoxShown = ref(false)


</script>

<template>
    <div class="Header">
        <header :class="{ headerIsHidden: headerIsHidden }">
            <RouterLink to="/" class="appName">{{ appState.appTitle }}</RouterLink>

            <nav class="navbar">
                <!-- <button class="charAsIcon themeSwitch" title="Activer / Désactiver le mode sombre" type="button"
                    role="switch" @click="switchTheme()">{{ appState.theme.value == "light" ? "🌙" : "🔆" }}
                </button> -->

                <!-- Catégorie avec drawer -->
                <!-- <div class="navDrawer-container" @mouseenter="openDrawer(1)" @mouseleave="closeDrawer(1)">
                    <RouterLink class="navDrawerHandle navLink" :to="`/subPage`">
                        <span class="category">Nom Categorie</span>
                        <span class="charAsIcon"> ▿</span>
                    </RouterLink>

                    <Transition name="fade">
                        <ul class="navDrawer" v-show="openedDrawerIndex == 1" @mouseenter="openDrawer(1)">
                            <RouterLink class="navDrawerItem navLink" :to="`/categorie/page`">Nom de la page
                            </RouterLink>
                        </ul>
                    </Transition>
                </div> -->

                <RouterLink class="navLink" to="/sawTurtle">J'ai vu une tortue !</RouterLink>
                <RouterLink class="navLink" to="/">Accueil</RouterLink>

                <button class="profile" title="S'inscrire / Se connecter" @click="showLoginBox">
                    <svg class="icon">
                        <use href="#profile" />
                    </svg>
                </button>
            </nav>

            <!-- LoginBox -->
            <Transition name="slideOut">
                <div v-if="isLoginBoxShown" class="loginBox-Container">
                    <LoginBox />
                </div>
            </Transition>

        </header>
        <!-- <button class="hideHeader charAsIcon" title="Afficher / Masquer le bandeau de navigation"
            :class="{ headerIsHidden: headerIsHidden }" @click="headerIsHidden = !headerIsHidden">{{ headerIsHidden ?
                "▽" : "△" }}
        </button> -->
    </div>
</template>

<style scoped>

    /* Vars */
    .Header {
        --headerHeight: 70px;

        /* Color vars */

        --navDrawerBorder: transparent;

        --linkNav: var(--textSub1);
        --linkNavHover: #3876d9;
        --linkNavDrawerHover: #3876d9;
        --linkNavCurrent: #3876d9;

        --btnBgNavHoverColored: #ecf2fc;
        --btnBgNavActiveColored: #bdd6ff;

        .dark & {
            --navDrawerBorder: var(--dividerColor);

            --linkNav: #e6e6e6;
            --linkNavHover: #42b883;
            --linkNavCurrent: #42b883;
            --linkNavDrawerHover: #42b883;

            --btnBgNavHoverColored: var(--bgTop2);
            --btnBgNavActiveColored: #757575;
        }
    }

    .Header {
        transition: height .5s, var(--transitionDefaults);
        height: calc(var(--headerHeight) * v-bind("headerIsHidden ? 0 : 1"));
    }

    header {
        width: 100%;
        height: var(--headerHeight);
        padding: 15px 24px;

        background-color: var(--bg);
        box-shadow: var(--shadow);
        transition: transform .5s, opacity .2s, var(--transitionDefaults);

        display: flex;
        justify-content: space-between;
        align-items: center;

        &.headerIsHidden {
            transform: translateY(-100%);
            opacity: 0;
        }

        .appName {
            font-size: 1.5em;
            color: var(--textSub1);
            text-decoration: underline seagreen;
            text-underline-offset: 3px;
        }
    }

    .themeSwitch {
        font-size: large;
        background-color: transparent;
        transition: rotate .5s ease-out, var(--transitionDefaults);
        filter: grayscale();

        &:active {
            rotate: 360deg;
            transition: rotate 0s, var(--transitionDefaults);
        }
    }

    .navbar {
        display: flex;
        gap: 5px;

        .navLink {
            height: 40px;
            padding: 0 15px;

            display: flex;
            align-items: center;

            color: var(--linkNav);
            font-size: var(--linkNavFontSize);
            text-decoration: none;
            border-radius: 50px;
            transition: var(--transitionDefaults), background-color .2s;

            &:hover {
                color: var(--linkNavHover);
                background-color: var(--btnBgNavHoverColored);
                cursor: pointer;
            }

            &:active {
                transition: var(--transitionDefaults), background-color 0s;
                background-color: var(--btnBgNavActiveColored);
            }

            &.navDrawerHandle:hover {
                background-color: transparent;
            }

            &.navDrawerItem {
                min-height: 40px;
                padding: 10px 15px;

                transition: var(--transitionDefaults), color 0.25s;

                &:hover {
                    background-color: transparent;
                    color: var(--linkNavDrawerHover);
                }
            }
        }

        .navDrawer-container:has(.router-link-active) .category,
        .navDrawer-container:has(.router-link-active) .navDrawerItem.router-link-active {
            color: var(--linkNavCurrent);
            /* Souligne le lien de la page actuelle */
            /* text-decoration: underline var(--emph) !important; */
        }

        .navDrawer-container {
            position: relative;
            z-index: 5;
            display: flex;
            flex-direction: column;
            align-items: center;

            &:before {
                /* Marge extérieure pour garder le drawer ouvert */
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: -1;
                /* background-color: rgba(0, 0, 0, 0.083); */
            }

            .navDrawer {
                /* pos */
                position: absolute;
                top: v-bind("appState.theme == `dark` ? `75px` : `45px`");
                padding: 10px 0;
                width: max-content;
                max-width: 300px;
                z-index: 5;

                /* prop */
                background-color: var(--bg);
                border: 1px solid var(--navDrawerBorder);
                border-radius: 12px;
                box-shadow: var(--shadow2);

                /* content pos */
                display: flex;
                flex-direction: column;
                transition-duration: 2s;

                overflow-wrap: break-word;

                &:before {
                    /* Marge extérieure pour garder le drawer ouvert */
                    content: "";
                    position: absolute;
                    top: -5px;
                    right: -20px;
                    bottom: -20px;
                    left: -20px;
                    z-index: -1;
                    /* background-color: rgba(0, 0, 0, 0.066); */
                }

                &::after {
                    /* Triangle */
                    position: absolute;
                    content: '';
                    bottom: 100%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    margin-left: -10px;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 10px solid var(--navDrawerBorder);
                }
            }
        }
    }

    .profile {
        background-color: transparent;

        .icon {
            width: 30px;
            height: 30px;
            color: var(--linkNav);
        }
    }

    .loginBox-Container {
        position: absolute;
        top: calc(var(--headerHeight) + 10px);
        right: 30px;
        /* width: 35%; */
        max-width: 35%;
        z-index: 100;
    }

    button.hideHeader {
        /* pos */
        position: absolute;
        top: calc(var(--headerHeight) + 10px);
        right: 10px;
        width: 30px;
        height: 20px;
        padding-top: calc(2px * v-bind("headerIsHidden ? 2.5 : 1"));

        /* prop */
        background-color: var(--bgTop1);
        transition: scale .3s, top .5s, var(--transitionDefaults);

        &.headerIsHidden {
            top: 10px;
        }

        &:active {
            transition: scale .1s, top .5s, var(--transitionDefaults);
        }

        &:hover {
            background-color: var(--bgTop2);
        }
    }



    .slideOut-enter-from,
    .slideOut-leave-to {
        opacity: 0;
        translate: 0 -10px;
    }

    .slideOut-enter-active,
    .slideOut-leave-active {
        transition: all .5s ease;
    }

    @keyframes Header-loginBoxSlide {
        0% {
            translate: 0 -20px;
            opacity: 0;
        }

        100% {
            translate: 0 0;
            opacity: 1;
        }
    }
</style>