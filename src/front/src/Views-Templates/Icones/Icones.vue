<script>
    export const config = {
        name: "Icônes"
    }
</script>

<script setup>
    import { onMounted, ref } from 'vue';

    const icons_sprites = ref(null)

    const iconsList = ref([])
    onMounted(() => {
        Object.values(icons_sprites.value.children)?.forEach(icon => {
            iconsList.value.push(icon)
        });
    })
</script>

<template>
    <main class="View centered">
        <!-- Icons -->
        <svg xmlns="http://www.w3.org/2000/svg" display="none" ref="icons_sprites">
            <symbol id="profile" viewBox="0 -960 960 960" fill="currentColor" data-source="">
                <path
                    d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </symbol>
            <!-- <symbol v-for="nb in 113" :id="`profile${nb}`" viewBox="0 -960 960 960" fill="currentColor">
                <path
                    d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </symbol> -->
        </svg>



        <h1>Icônes</h1>

        <section class="icons">
            <div class="iconContainer" v-for="icon in iconsList">
                <svg class="icon">
                    <use :href="`#${icon.id}`" />
                </svg>
                <p>{{ icon.id }}</p>
            </div>
        </section>
    </main>
</template>

<style scoped>
    .icons {
        background-color: var(--bgTop1);
        border-radius: 12px;

        padding: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        /* justify-items: center;
        gap: 20px; */


        .iconContainer {
            display: flex;
            flex-direction: column;
            align-items: center;

            .icon {
                width: 50px;
                height: 50px;
            }
        }
    }
</style>