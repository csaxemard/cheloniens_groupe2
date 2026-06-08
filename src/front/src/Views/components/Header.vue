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

<template>
    <div class="Component">
        <header :class="{headerIsHidden: headerIsHidden }">
            <RouterLink to="/" class="appName">Web Templates</RouterLink>
    
            <nav class="navbar">
                <button class="charAsIcon themeSwitch" title="Activer / Désactiver le mode sombre" type="button" role="switch" @click="switchTheme()">{{ appState.theme.value == "light" ? "🌙" : "🔆" }}</button>
    
                <div class="navDrawer-container"
                    v-for="(cat, index) in appState.categories"
                    @mouseenter="openDrawer(index)"
                    @mouseleave="closeDrawer(index)"
                    >
                    <RouterLink class="navDrawerHandle navLink"
                        :to="`/${cat.relUrl}`"
                        >
                        <span class="category">{{ cat.name }}</span><span class="charAsIcon" v-if="cat.components.length > 1"> ▿</span>
                    </RouterLink>
    
                    <Transition name="fade">
                        <ul class="navDrawer"
                            v-if="cat.components.length > 1"
                            v-show="openedDrawerIndex == index"
                            @mouseenter="openDrawer(index)"
                            >
                            <RouterLink class="navDrawerItem navLink"
                                v-for="comp in cat.components"
                                :to="`/${cat.relUrl}/${ comp.relUrl }`"
                                >
                                {{ comp.name }}.vue<span></span
                            ></RouterLink>
                        </ul>
                    </Transition>
                </div>
                <RouterLink class="navLink" to="/">Home</RouterLink>
            </nav>
        </header>
        <button class="hideHeader charAsIcon" title="Afficher / Masquer le bandeau de navigation" :class="{headerIsHidden : headerIsHidden }" @click="headerIsHidden = !headerIsHidden">{{ headerIsHidden ? "▽" : "△" }}</button>
    </div>
</template>

<style scoped>
    /* Stratégie de nesting : */
    /* Je nest par petite notion */
    /* "Quand je regarde la page, comment je pourrais regrouper les éléments" */
    /* Les éléments qui sont seuls je les nest dans leur parent */
    /* Et les éléments qui sont groupés ensemble sont nestés dans leur container */

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
            transition:var(--transitionDefaults), background-color .2s;
            
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
                transition:var(--transitionDefaults), color 0.25s;
                
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