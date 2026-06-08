<script setup>
    import { onMounted, ref } from "vue";




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

<!-- Home.vue -->
<template>
    <main class="w-full">
        <!-- BEGIN: HeroSection -->
        <section class="bg-brand-green pt-16 pb-6 px-4 rounded-b-[2rem]" data-purpose="hero-area">
            <div class="max-w-md mx-auto text-center">
                <!-- Main Title -->
                <h1 class="text-white text-4xl font-bold mb-10">Chéloniens</h1>
                <!-- Action Button -->
                <button class="bg-brand-dark-blue hover:bg-opacity-90 transition-all text-white text-2xl font-bold py-6 px-10 rounded-xl shadow-lg mb-10 w-full max-w-xs" data-purpose="observation-cta">
                    j’ai vu une tortue
                </button>
                <!-- Turtle Image Container -->
                <div class="relative overflow-hidden rounded-2xl border-4 border-emerald-900/20 shadow-xl aspect-video" data-purpose="featured-image">
                    <img alt="Sea turtle underwater" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLtLiIOWDEy4zdEN4KhbtyNdJETXk3MWEuwZa_rKjePARxsdDaCls9vmjIMu_yXpCkVU0Lzmc4fttgAV43g848xKZKpaA6i89seMr-x6VYkQg37JMZkKGHGgIhd6ngX26pNDG9Ap2jb1A9qMp41AOo-TxDXO-pkYgBtfEkZOC8xlBngFK_zoKzRwhUCuulohY4O_evN_k0JKn_Iv_SB_vAuJAbEpStOT_-eBbmO3_jtNWDJPRf0kQMbdNpU">
                </div>
            </div>
        </section>
        <!-- END: HeroSection -->

        <!-- BEGIN: LocationBrowsing -->
        <section class="py-12 px-4" data-purpose="browse-by-location">
            <div class="max-w-md mx-auto">
                <h2 class="text-center font-bold text-gray-800 mb-6">Parcourir par commune</h2>
                <!-- Pills Grid -->
                <div class="flex flex-wrap justify-center gap-3">
                    <button class="px-4 py-2 border border-gray-200 rounded-full text-xs text-gray-600 bg-white hover:bg-gray-50 shadow-sm" data-purpose="location-pill">Rivière-Salée</button>
                    <button class="px-4 py-2 border border-gray-200 rounded-full text-xs text-gray-600 bg-white hover:bg-gray-50 shadow-sm" data-purpose="location-pill">Schoelcher</button>
                    <button class="px-4 py-2 border border-gray-200 rounded-full text-xs text-gray-600 bg-white hover:bg-gray-50 shadow-sm" data-purpose="location-pill">Fort-de-France</button>
                    <button class="px-4 py-2 border border-gray-200 rounded-full text-xs text-gray-600 bg-white hover:bg-gray-50 shadow-sm" data-purpose="location-pill">Le Lamentin</button>
                    <button class="px-4 py-2 border border-gray-200 rounded-full text-xs text-gray-600 bg-white hover:bg-gray-50 shadow-sm" data-purpose="location-pill">Ducos</button>
                    <button class="px-4 py-2 border border-gray-200 rounded-full text-xs text-gray-600 bg-white hover:bg-gray-50 shadow-sm" data-purpose="location-pill">Le François</button>
                </div>
            </div>
        </section>
        <!-- END: LocationBrowsing -->
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