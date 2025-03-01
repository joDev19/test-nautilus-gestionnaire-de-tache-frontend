<template>
    <AppTemplate>
        <div class="p-5 lg:w-5/6 lg:mx-auto">
            <div class="lg:flex lg:mb-3">
                <div class="sm:w-full">
                    <p class="font-bold">Taches</p>
                    <p>Toutes mes tâches</p>
                </div>
                <div class="flex w-full sm:w-auto items-center gap-3">
                    <input type="text" v-model="filterTitle" class="border-2 p-2 rounded focus:outline-none"
                        placeholder="Rechercher">
                    <RouterLink :to="{ name: 'task-create' }"
                        class="btn bg-blue-700 w-24 p-2 text-white font-bold rounded-lg text-center">
                        +
                    </RouterLink>
                </div>
            </div>
            <div class="sm:hidden h-5"></div>
            <div class="w-full flex justify-end">
                <select name="" v-model="filterSatatus" class="w-60 h-10 p-1 bg-white border border-2 rounded" id="">
                    <option value="all">Toutes les tâches</option>
                    <option value="en attente">En attente</option>
                    <option value="en cours">En cours</option>
                    <option value="terminé">Terminé</option>
                </select>
            </div>
            <div class="overflow-auto">
                <table class="w-full mt-5 mb-5">
                    <thead class="border-b-2 w-full">
                        <tr>
                            <th class="pb-3 ps-5  text-start text-xs sm:text-sm lg:text-lg min-w-auto">
                                Title
                            </th>
                            <th class="pb-3 ps-5 text-start text-xs sm:text-sm lg:text-lg min-w-auto">
                                Statut
                            </th>
                            <th class="pb-3 ps-5 text-start text-xs sm:text-sm lg:text-lg min-w-auto">
                                Date de fin
                            </th>
                        </tr>

                    </thead>
                    <tbody>
                    <template v-if="filteredTasks?.length === 0">
                        <p class="text-center">Pas encore de tâches</p>
                    </template>
                    <template v-else>
                        <tr class="border-b-2" v-for="task in filteredTasks" :key="task.id">
                            <td class="py-2 ps-5 text-xs sm:text-sm">
                                {{ task.title }}
                            </td>
                            <td class="py-2 ps-5 text-xs sm:text-sm">
                                <span v-if="task.status == 'en attente'"
                                    class="px-2 py-1 font-bold rounded-xl bg-green-100">
                                    {{ task.status }}</span>
                                <span v-if="task.status == 'en cours'"
                                    class=" px-2 py-1 font-bold rounded-xl bg-blue-100">{{ task.status }}</span>
                                <span v-if="task.status == 'terminé'"
                                    class=" px-2 py-1 font-bold rounded-xl bg-gray-100">{{ task.status }}</span>
                            </td>
                            <td class="py-2 ps-5 text-xs sm:text-sm">
                                <span v-if="task.end_date">{{ formatDate(task.end_date) }}</span>
                                <span v-else>pas renseigné</span>
                            </td>
                            <td class="py-2 ps-5 text-xs sm:text-sm text-blue-800 font-bold hover:cursor-pointer">
                                <div class="flex gap-1">
                                    <RouterLink :to="{ name: 'task-show', params: { id: task.id } }"
                                        class="border p-1 rounded bg-blue-100">Voir
                                    </RouterLink>
                                    <!-- <RouterLink :to="{name: 'task-create', params: {id: task.id}}" class="border p-1 rounded bg-yellow-100">Modifier</RouterLink>
                                    <button class="border p-1 rounded bg-red-100">Supprimer</button> -->
                                </div>
                            </td>

                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <!-- <div v-if="!useTemplateStore().mobileSideIsOpen"
                class="flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                <div class="flex flex-1 justify-between sm:hidden">
                    <a href="#"
                        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                    <a href="#"
                        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                </div>
                <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p class="text-sm text-gray-700">
                            Showing
                            <span class="font-medium">1</span>
                            to
                            <span class="font-medium">10</span>
                            of
                            <span class="font-medium">97</span>
                            results
                        </p>
                    </div>
                    <div>
                        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a href="#"
                                class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span class="sr-only">Previous</span>
                                <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                    data-slot="icon">
                                    <path fill-rule="evenodd"
                                        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                            <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" --
                            <a href="#" aria-current="page"
                                class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
                            <a href="#"
                                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                            <a href="#"
                                class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                            <span
                                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                            <a href="#"
                                class="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                            <a href="#"
                                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                            <a href="#"
                                class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                            <a href="#"
                                class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                                <span class="sr-only">Next</span>
                                <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                    data-slot="icon">
                                    <path fill-rule="evenodd"
                                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                        clip-rule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                    </div>
                </div>
            </div> -->
        </div>
    </AppTemplate>
</template>

<script setup>
import httpClient from '@/httpClient';
import AppTemplate from './Layout/Template.vue';
import { RouterLink } from 'vue-router';
import { useTemplateStore } from '@/stores/template';
import { computed, ref, } from 'vue';
import { formatDate } from '@/helper';
const tasks = ref([])
const filterSatatus = ref("")
httpClient.get('/api/tasks').then((response) => {
    tasks.value = response.data
    filterSatatus.value = "all"
})
const filterTitle = ref("")
const filterWithtaskTitle = (data, title) => {
    if (title != "")
        return data.filter(d => d.title.toLowerCase().includes(title.toLowerCase()));
    return data
}
const filteredTasks = computed(() => {
    if (filterSatatus.value == 'all') {
        return filterWithtaskTitle(tasks.value, filterTitle.value);
    } else if (filterSatatus.value == 'en attente') {
        return filterWithtaskTitle(tasks.value.filter(task => task.status === 'en attente'), filterTitle.value);
    } else if (filterSatatus.value == 'en cours') {
        return filterWithtaskTitle(tasks.value.filter(task => task.status === 'en cours'), filterTitle.value);
    } else if (filterSatatus.value == 'terminé') {
        return filterWithtaskTitle(tasks.value.filter(task => task.status === 'terminé'), filterTitle.value);
    }
});



</script>

<style lang="scss" scoped></style>