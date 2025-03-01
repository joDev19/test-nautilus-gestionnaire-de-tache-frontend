<template>
    <AppTemplate>
        <span @click="router.go(-1)" class="text-blue-500 hover:cursor-pointer">Retour</span>
        <div class="w-full lg:w-1/2 lg:mx-auto">
            <p v-if="!isUpdate" class="my-5 text-blue-500 text-3xl font-bold">Ajouter une nouvelle tâche</p>
            <p v-else class="my-5 text-blue-500 text-3xl font-bold">Modifier la tâche: {{ task.title }}</p>
            <div v-if="isPageLoading" class="flex justify-center">
                <PageSpiner />
            </div>
            <form v-else class="space-y-6" action="#" method="POST" @submit.prevent="handleSubmit">
                <div>
                    <label for="title" class="block text-sm/6 font-medium text-gray-900">Titre</label>
                    <div class="mt-2">
                        <input type="text" name="title" id="title" autocomplete="title" v-model="task.title"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-10 border focus:outline-0">
                        <p v-if="errors.title != undefined" class="text-red-500 text-sm font-semibold">{{
                            errors.title[0]
                        }}</p>

                    </div>
                </div>
                <div>
                    <label for="description" class="block text-sm/6 font-medium text-gray-900">Description
                        (facultative)</label>
                    <div class="mt-2">
                        <textarea type="text" name="description" id="description" autocomplete="description"
                            v-model="task.description"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-20 border focus:outline-0"></textarea>

                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="date" class="block text-sm/6 font-medium text-gray-900">Date d'échéance
                            (facultative)</label>

                    </div>
                    <div class="mt-2">
                        <input type="date" name="date" id="date" autocomplete="date" v-model="task.end_date"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-10 border focus:outline-0">

                    </div>
                </div>
                <!-- <template v-if="isUpdate">
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="date" class="block text-sm/6 font-medium text-gray-900">Status</label>

                        </div>
                        <div class="mt-2">
                            <select name="date" id="date" autocomplete="date" v-model="task.status"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-10 border focus:outline-0">
                                <option value="en attente">En attente</option>
                                <option value="en cours">En cours</option>
                                <option value="termine">Terminé</option>
                            </select>

                        </div>
                    </div>
                </template> -->
                <p v-if="!isUpdate" class="text-sm">Les status des tâches crées sont par défaut: <strong><em>en
                            attente</em></strong></p>
                <div>
                    <Button v-if="!isUpdate" :loading="isLoading" :text="'Ajouter une tâche'"
                        type-name="submit"></Button>
                    <Button v-else :loading="isLoading" :text="'Modifier'" type-name="submit"></Button>
                </div>
            </form>
        </div>
    </AppTemplate>
</template>

<script setup>
import AppTemplate from './Layout/Template.vue';
import PageSpiner from '@/components/PageSpiner.vue';
import { RouterLink } from 'vue-router';
import Button from '@/components/Button.vue';
import { ref } from 'vue';
import httpClient from '@/httpClient';
import router from '@/router';

const isUpdate = ref(false)
const isLoading = ref(false)
const isPageLoading = ref(false)
const errors = ref({})
const task = ref({
    title: "",
    end_date: '',
    description: '',
    status: null,
});
const props = defineProps(['id'])
if (props.id) {
    isUpdate.value = true;
    isPageLoading.value = true
    httpClient.get(`api/tasks/${props.id}`).then((response) => {
        task.value = response.data
    }).finally(() => {
        isPageLoading.value = false
    })
}
const handleSubmit = () => {
    isLoading.value = true
    if (!isUpdate.value) {
        httpClient.post("api/tasks", task.value).then(() => {
            router.push({ name: 'tasks' })
        }).catch((error) => {
            errors.value = error.response.data.errors
        })

    } else {
        httpClient.put(`api/tasks/${task.value.id}`, { ...task.value, id: undefined }).then(() => {
            router.push({ name: 'tasks' })
        }).catch((error) => {
            errors.value = error.response.data.errors
        })
    }
    isLoading.value = false

}
</script>

<style lang="scss" scoped></style>