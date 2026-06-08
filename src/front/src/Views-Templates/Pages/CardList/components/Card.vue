<script setup>
    import Exercice9ListItem from "./ListItem.vue";
</script>

<template>
    <div class="card">
        <div class="body">
            <slot />
        </div>

        <div class="footer">
            <slot name="footer">
               <Exercice9ListItem :item="{ name: 'Produit A', description: 'Description A' }">
                    <template #default="{ item }">
                        <h4>{{ item.name }}</h4>
                        <p>{{ item.description }}</p>
                    </template>
                </Exercice9ListItem>

            </slot>
        </div>
    </div>
</template>