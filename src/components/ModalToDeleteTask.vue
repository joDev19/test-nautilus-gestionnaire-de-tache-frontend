<template>
    <VueFinalModal class="flex justify-center items-center"
        content-class="flex flex-col max-w-xl mx-4 p-4 bg-white rounded-lg  border drounded-lg space-y-2 w-full sm:w-1/2 lg:w-2/3">
        <div>
            <p class="text-red-500 font-bold">Etes vous sur de vouloir supprimmer cette tâche ?</p>
            Titre: {{ task.title }} <br>
            Status: {{ task.status }}
        </div>
        <div class="flex gap-5 justify-end">
            <button type="button" @click="emits('confirm')"  class="p-1 border bg-gray-500 rounded text-white font-bold">Annuler</button>
            <button class="p-1 border bg-blue-500 rounded text-white font-bold" @click="handleDelete">Supprimer</button>
        </div>
    </VueFinalModal>

</template>

<script setup>
import httpClient from '@/httpClient';
import { VueFinalModal } from 'vue-final-modal';
import router from '@/router';
const props = defineProps(["task"]);
const emits = defineEmits(['confirm'])
const handleDelete = () => {
    httpClient.delete(`api/tasks/${props.task.id}`).then(res => {
        router.push({name: 'tasks'})
    })
}
</script>

<style lang="css" scoped>

</style>