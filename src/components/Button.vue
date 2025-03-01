<template>
    <button
        class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        :type="typeName">
        <template v-if="loading">
            <Spinner />
        </template>
        <template v-else>
            {{ text }}
        </template>
    </button>
</template>

<script setup>
import Spinner from './Spinner.vue';
const props = defineProps({
    typeName: String,
    loading: Boolean,
    text: String,
})
</script>

<style lang="scss" scoped></style>