<script setup>
    defineProps({
        item: Object
    })
</script>

<template>
    <div>
        <slot :item="item" />
    </div>
</template>