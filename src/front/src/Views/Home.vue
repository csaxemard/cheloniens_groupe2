<script setup>
    import MainLayout from "@/layouts/MainLayout.vue";
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
<<<<<<< HEAD
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
=======
    <MainLayout>
        <div class="Home">
            <h1>Suivi de Cheloniens en Martinique</h1>
            <p>🐢</p>
        </div>
    </MainLayout>

>>>>>>> 6d6c786eadbec266d582cb507d68f7c9294bd469
</template>


<style scoped>
    .Home {
        --bgResourceType: var(--bgTop1);
        --bgResource: var(--bg);

        .dark & {
            --bgResourceType: var(--bg);
            --bgResource: var(--bgSub1);
        }
    }

    main {
        flex: 1;
        
        display: flex;
        flex-direction: column;
        gap: 50px;
    }

</style>