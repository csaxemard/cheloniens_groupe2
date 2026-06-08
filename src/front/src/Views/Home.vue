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

<template>
    <MainLayout>
        <div class="Home">
            <h1>Suivi de Cheloniens en Martinique</h1>
            <p>🐢</p>
        </div>
    </MainLayout>

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