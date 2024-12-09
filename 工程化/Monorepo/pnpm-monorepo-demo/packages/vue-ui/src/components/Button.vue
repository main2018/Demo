<template>
<button :class="type"><slot></slot></button>
</template>

<script setup>
const props = defineProps({
    type: {
        default: 'primary',
        validator: (value) => [
            'primary',
            'success',
            'warn',
            'danger'
        ].includes(value)
    }
})
</script>

<style scoped>
.primary {
    background-color: blue;
    color: #fff;
}

.success {
    background-color: green;
    color: #fff;
}

.warn {
    background-color: orange;
    color: #000;
}

.danger {
    background-color: red;
    color: #fff;
}
</style>