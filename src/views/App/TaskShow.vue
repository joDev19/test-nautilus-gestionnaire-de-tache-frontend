<template>
    <AppTemplate>
        <span @click="router.go(-1)" class="text-blue-500 hover:cursor-pointer">Retour</span>
        <div class="p-5 w-5/6 mx-auto">
            <div v-if="isLoading" class="mx-auto flex justify-center">
                <PageSpinner />
            </div>
            <div v-else class="border rounded-lg p-4">
                <p class="font-bold">Détail de la tâche</p>
                <!-- <p class="border-b pb-2">Personal details and application.</p> -->
                <div class="border-b rounded p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Titre</p>
                    <p class="text-sm sm:w-3/5">{{ task.title }}</p>
                </div>
                <div class="border-b rounded p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Description</p>
                    <p v-if="task.description" class="text-sm sm:w-3/5">{{ task.description }}</p>
                    <p v-else><em><mark>pas renseigné</mark></em></p>
                </div>
                <div class="border-b rounded p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Date d'échéance

                    </p>
                    <p v-if="task.end_date" class="text-sm sm:w-3/5">{{ task.end_date }}</p>
                    <p v-else><em><mark>pas renseigné</mark></em></p>
                </div>
                <div class="border-b rounded p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Status

                    </p>
                    <div>
                        <p>
                            <span v-if="task.status == 'en attente'" @click="openModalToUpdateStatus"
                                class="px-2 py-1 font-bold rounded-xl hover:cursor-pointer bg-green-100">
                                {{ task.status }}</span>
                            <span v-if="task.status == 'en cours'" @click="openModalToUpdateStatus"
                                class=" px-2 py-1 font-bold rounded-xl hover:cursor-pointer bg-blue-100">{{
                                    task.status }}</span>
                            <span v-if="task.status == 'terminé'" @click="openModalToUpdateStatus"
                                class=" px-2 py-1 font-bold rounded-xl hover:cursor-pointer bg-gray-100">{{
                                    task.status }}</span>
                        </p>
                        <p class="font-bold text-sm mt-3 ms-1 text-blue-500">Cliquez sur le badge du status pour le
                            modifier</p>

                    </div>
                </div>
                <div class="border-b rounded p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">Créer le</p>
                    <p class="text-sm sm:w-3/5">{{ formatDate(task.created_at) }}</p>
                </div>
                <!-- <div class="border-b rounded p-2 my-2 sm:flex sm:items-center">
                    <p class="font-bold sm:w-2/5">About</p>
                    <p class="text-sm sm:w-3/5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dolorem
                        accusantium sapiente dolore rerum? Debitis, nostrum cupiditate aliquid earum expedita quae
                        voluptatum delectus perferendis beatae. Dolorem eius libero tempore nam.</p>
                </div> -->
                <div class="rounded p-2 my-2">
                    <p class="font-bold">Action</p>
                    <p class="">
                        <RouterLink :to="{ name: 'task-create', params: { id: task.id } }"
                            class="bg-blue-700 p-2 rounded text-white m-1 font-medium">Modifier</RouterLink>
                        <button type="button" @click="openModal"
                            class="bg-red-500 p-1 rounded text-white m-1 font-medium">Supprimer</button>
                    </p>
                </div>
            </div>
        </div>
    </AppTemplate>
</template>

<script setup>
import AppTemplate from './Layout/Template.vue';
import { RouterLink } from 'vue-router';
import Button from '@/components/Button.vue';
import { ref } from 'vue';
import PageSpinner from '@/components/PageSpiner.vue';
import router from '@/router';
import httpClient from '@/httpClient';
import { formatDate } from '@/helper';
import { useModal } from 'vue-final-modal';
import ModalToDeleteTask from '@/components/ModalToDeleteTask.vue';
import ModalToChangeStatus from '@/components/ModalToChangeStatus.vue';

const isLoading = ref(true)
const task = ref({});
const props = defineProps(['id'])
httpClient.get(`api/tasks/${props.id}`).then((response) => {
    task.value = response.data
}).finally(() => isLoading.value = false)
const manageModal = useModal({
    component: ModalToDeleteTask,
    attrs: {
        onConfirm() {
            manageModal.close()
        }
    }
})
const manageUpdateStatusModal = useModal({
    component: ModalToChangeStatus,
    attrs: {
        onConfirm() {
            manageUpdateStatusModal.close()
            
        }
    }
})
const openModal = () => {
    manageModal.options.attrs.task = task.value
    manageModal.open()
}
const openModalToUpdateStatus = () => {
    manageUpdateStatusModal.options.attrs.task = task.value
    manageUpdateStatusModal.open()
}

</script>

<style lang="scss" scoped></style>