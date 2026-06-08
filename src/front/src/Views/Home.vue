<script setup>
    import { onMounted, ref } from "vue";

    import resourceTypes from "@/resources.js";



    function formatUrl(ref) {
        try {
            const normalized = ref.startsWith("http") ? ref : "https://" + ref

            const url = new URL(normalized)

            const href = url.href;
            let hostname
            let path;
            if (url.hostname == "www.youtube.com") {
                if (url.pathname.includes("@")) {
                    hostname = url.pathname.substring(1);
                    path = "";
                }
            } else {
                const parts = url.hostname.split(".")
                const hostname_min = parts.slice(-2).join(".")
                hostname = hostname_min.replace(/^./, hostname_min[0].toUpperCase());
                path = url.pathname.replace(/\/$/, "");
            }

            return { href, hostname, path }
        } catch (error) {
            console.log(error)
            return { hostname: ref, path: "" }
        }
    }

    function foldUnfold(index) {
        const i = foldedIndexes.value.indexOf(index)

        if (i === -1) {
            foldedIndexes.value.push(index)
        } else {
            foldedIndexes.value.splice(i, 1)
        }
    }

    function addRemoveFoldButtonHover(id) {
        document.querySelector(`#${id} .foldButton`).classList.toggle("hover")
    }

    function getFavicon(ref) {
        return `https://s2.googleusercontent.com/s2/favicons?domain=${ref}&sz=64`
    }

    function getResourcesHeight(id) {
        const height = document.querySelector(`#${id} .resources`)?.dataset.baseHeight || "auto";
        return height;
    }



    const foldedIndexes = ref([])

    onMounted(() => {
        document.querySelectorAll(`.resources`).forEach((res) => {
            res.dataset.baseHeight = Math.round(res.getBoundingClientRect().height) + 20 + "px"
            res.style.height = res.dataset.baseHeight
        })
    })
</script>

<template>
    <main class="View centered">
        <div>
            <h1>Bienvenue sur Web Templates</h1>
            <p>Ce site regroupe mes designs personnalisés favoris</p>
        </div>

        <div class="resourceTypes">
            <section class="resourceType" v-for="(resourceType, key, index) in resourceTypes" :key="index"
                :id="key">
                <h2 @click="foldUnfold(index)" @mouseenter="addRemoveFoldButtonHover(key)"
                    @mouseleave="addRemoveFoldButtonHover(key)">
                    {{ resourceType.name }}
                    <button class="foldButton charAsIcon" title="Afficher / Masquer le groupe"
                        :style="{ rotate: foldedIndexes.includes(index) ? `180deg` : `360deg` }">△</button>
                </h2>
                <p class="small textSub1">{{ resourceType.comment }}</p>

                <div class="resources"
                    :style="{ height: foldedIndexes.includes(index) ? `0` : getResourcesHeight(key) }">
                    <div class="resource" v-for="(resource, index) in resourceType.resources" :key="index">
                        <a :href="formatUrl(resource[0]).href" target="_blank" rel="noopener noreferrer">
                            <img :src="getFavicon(resource[0])" alt="Logo resource">

                            <div>
                                <span class="hostname">{{ formatUrl(resource[0]).hostname }}</span>
                                <br>
                                <span class="path">{{ formatUrl(resource[0]).path }}</span>
                            </div>
                        </a>
                        <p class="comment" v-if="resource[1]">{{ resource[1] }}</p>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<style scoped>
    .View {
        --bgResourceType: var(--bgTop1);
        --bgResource: var(--bg);

        .dark & {
            --bgResourceType: var(--bg);
            --bgResource: var(--bgSub1);
        }
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .resourceTypes {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

    .resourceType {
        border: var(--divider);
        background-color: var(--bgResourceType);
        position: relative;
        height: fit-content;
        padding: 20px;
        border-radius: 12px;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        h2 {
            position: relative;
            display: flex;
            align-items: center;

            .foldButton {
                /* position: absolute; */
                margin-left: 20px;
                top: 3px;
                width: 22px;
                height: 22px;
                background-color: transparent;
                color: var(--textSub2);
                transition: rotate .3s, scale .3s, box-shadow .5s, border-color .5s, var(--transitionDefaults);

                &:hover {
                    box-shadow: var(--shadowUniform);
                }

                &.hover {
                    box-shadow: var(--shadowUniform);
                }
            }
        }

        .resources {
            margin-top: 30px;

            overflow: hidden;
            transition: height .3s;

            display: flex;
            flex-wrap: wrap;
            gap: 50px;

            .resource {
                position: relative;
                max-width: 300px;
                height: fit-content;
                overflow: hidden;
                display: flex;
                flex-direction: column;

                /* background-color: var(--bgTop1); */
                background-color: var(--bgResource);
                border-radius: 12px;
                border: var(--divider);

                a {
                    flex: 1;
                    padding: 20px;

                    display: flex;
                    align-items: center;
                    z-index: 5;

                    &::after {
                        /* Open in new tab icon */
                        position: absolute;
                        top: 10px;
                        right: 10px;
                    }

                    img {
                        flex: 0;
                        max-width: 30px;
                        margin-right: 10px;
                        border-radius: 50px;
                        object-fit: contain;
                    }

                    .path {
                        /* margin-left: 35px; */
                        text-align: right;
                        border: red;
                        font-size: small;
                        color: var(--textSub1);
                    }
                }

                .comment {
                    padding: 20px;
                    border-top: var(--divider);

                    font-size: 13px;
                    white-space: pre-line;
                }
            }
        }
    }

</style>