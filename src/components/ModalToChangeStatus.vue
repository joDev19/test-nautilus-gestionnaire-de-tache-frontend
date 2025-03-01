<template>
    <VueFinalModal class="flex justify-center items-center"
        content-class="flex flex-col max-w-xl mx-4 p-4 bg-white rounded-lg  border drounded-lg space-y-2 w-full sm:w-1/2 lg:w-2/3">
        <form action="" @submit.prevent="handleSubmit">
            <div>
                <p class="text-blue-500 font-bold">Choisissez le nouveau status ?</p>
                <div class="flex gap-3">
                    <div class="flex gap-2">
                        <input type="radio" v-model="task.status" value="en attente" name="status" id="en attente">
                        <label for="en attente">En attente</label>
                    </div>
                    <div class="flex gap-2">
                        <input type="radio" v-model="task.status" value="en cours" name="status" id="en cours">
                        <label for="en cours">En cours</label>
                    </div>
                    <div class="flex gap-2">
                        <input type="radio" v-model="task.status" value="terminé" name="status" id="terminé">
                        <label for="terminé">Terminé</label>
                    </div>
                </div>
            </div>
            <div class="flex gap-5 justify-end">
                <button type="button" @click="emits('confirm')"
                    class="p-1 border bg-gray-500 rounded text-white font-bold">Annuler</button>
                <span class="p-1 border bg-blue-600 rounded text-white font-bold">
                    <Button type-name="submit" :loading="isLoading" text="Modifier"></Button>
                </span>
            </div>
        </form>
    </VueFinalModal>

</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal';
import Button from './Button.vue';
import router from '@/router';
import { onUnmounted, ref } from 'vue';
import httpClient from '@/httpClient';
const props = defineProps(["task"]);
const emits = defineEmits(['confirm'])
const isLoading = ref(false)
const handleSubmit = () => {
    isLoading.value = true
    httpClient.put(`api/change-status-of-task/${props.task.id}/${props.task.status}`).then((response) => {
        isLoading.value = false;
        router.push({ name: 'tasks' })
        emits('confirm')
    })
}

</script>

<style lang="css" scoped></style>