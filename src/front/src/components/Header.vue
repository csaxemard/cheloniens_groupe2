<script setup>
    import { ref, computed } from 'vue'
    import appState, { switchTheme } from '@/appState';

    function openDrawer(index) {
        openedDrawerIndex.value = index
    }

    function closeDrawer() {
        openedDrawerIndex.value = null
    }



    const openedDrawerIndex = ref(null)
    const headerIsHidden = ref(false)
</script>

<!-- Header.vue -->
<template>
<<<<<<< HEAD
    <header class="sticky top-0 z-50 bg-white px-4 py-2 border-b border-gray-100 shadow-sm" data-purpose="navigation-bar">
        <div class="flex items-center justify-between max-w-md mx-auto">
            <div class="flex items-center gap-1">
                <!-- Location/Logo Icon -->
                <svg class="h-4 w-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                <span class="font-extrabold text-lg text-gray-900 tracking-tight">Chéloniens</span>
            </div>
            <div class="p-1">
                <!-- Search Icon -->
                <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
            </div>
        </div>
    </header>
=======
    <div class="Component">
        <header :class="{ headerIsHidden: headerIsHidden }">
            <RouterLink to="/" class="appName">Suivi des Cheloniens</RouterLink>

            <nav class="navbar">
                <!-- <button class="charAsIcon themeSwitch" title="Activer / Désactiver le mode sombre" type="button"
                    role="switch" @click="switchTheme()">{{ appState.theme.value == "light" ? "🌙" : "🔆" }}
                </button> -->

                <!-- Catégorie : -->
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
                <RouterLink class="navLink" to="/turtlesDetails">Voir les fiches des espèces de tortues</RouterLink>
                <RouterLink class="navLink" to="/">Accueil</RouterLink>
            </nav>
        </header>
        <!-- <button class="hideHeader charAsIcon" title="Afficher / Masquer le bandeau de navigation"
            :class="{ headerIsHidden: headerIsHidden }" @click="headerIsHidden = !headerIsHidden">{{ headerIsHidden ?
                "▽" : "△" }}
        </button> -->
    </div>
>>>>>>> 6d6c786eadbec266d582cb507d68f7c9294bd469
</template>


<style scoped>

    .Component {
        /* Vars */

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

        transition: height .5s, var(--transitionDefaults);
        height: calc(var(--headerHeight) * v-bind("headerIsHidden ? 0 : 1"));
    }

    header {
        /* pos */
        width: 100%;
        height: var(--headerHeight);
        padding: 15px 24px;

        /* prop */
        background-color: var(--bg);
        box-shadow: var(--shadow);
        transition: transform .5s, opacity .2s, var(--transitionDefaults);

        /* content pos */
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
            text-decoration: underline var(--emph);
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
            /* pos */
            height: 40px;
            padding: 0 15px;

            /* prop */

            /* content pos */
            display: flex;
            align-items: center;

            /* content prop */
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
                background-color: var(--btnBgNavActiveColored);
            }

            &.navDrawerHandle:hover {
                background-color: transparent;
            }

            &.navDrawerItem {
                /* pos */
                min-height: 40px;
                padding: 10px 15px;

                /* prop */
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
                top: v-bind("appState.theme.value == `dark` ? `75px` : `45px`");
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


</style>