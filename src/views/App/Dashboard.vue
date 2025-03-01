<template>
    <AppTemplate>
        <div class="flex flex-col sm:flex-row gap-5 sm:justify-between">
            <div class="p-5 h-48 bg-blue-100">
                <p class="text-blue-500 text-3xl">Total de toutes les tâches: </p>
                <p class="text-blue-800 text-center text-3xl">{{ formateDateNumber(tasks.length) }}</p>
            </div>
            <div class="p-5 h-48 bg-purple-100">
                <p class="text-purple-500 text-3xl">Total des tâches en cours: </p>
                <p class="text-purple-800 text-center text-3xl">{{formateDateNumber(tasks
                    .filter(t => t.status == `en cours`).length)}}</p>

            </div>
            <div class="p-5 h-48 bg-green-100">
                <p class="text-green-500 text-3xl">Total des tâches en attentes: </p>
                <p class="text-green-800 text-center text-3xl">{{formateDateNumber(tasks.
                    filter(t => t.status == `en attente`).length)}}</p>
            </div>
            <div class="p-5 h-48 bg-pink-100">
                <p class="text-pink-500 text-3xl">Toutes les tâches terminés: </p>
                <p class="text-pink-800 text-center text-3xl">{{formateDateNumber(tasks.
                    filter(t => t.status == `terminé`).length)}}</p>
            </div>
        </div>
        <br>
        <div>
            <RouterLink :to="{ name: 'tasks' }">Voir toutes les tâches</RouterLink>
        </div>
    </AppTemplate>
</template>

<script setup>
import httpClient from '@/httpClient';
import AppTemplate from './Layout/Template.vue';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { formateDateNumber } from '@/helper';
const tasks = ref([])
httpClient.get('api/tasks').then((response) => {
    tasks.value = response.data;
})
</script>

<style lang="scss" scoped></style>