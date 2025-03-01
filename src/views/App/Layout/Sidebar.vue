<template>
    <div class="w-full h-screen flex fixed top-0 flex hidden lg:block lg:w-1/5" id="sideBar">
        <div class="w-5/6 sm:w-96 h-full bg-blue-600 lg:w-full">
            <div class="p-5 h-1/8">
                <!-- <img src="" alt="Logo"> -->
                <p class="text-xl text-white font-bold">Logo</p>
            </div>
            <div class="p-5 min-h-6/8">
                <ul>
                    <li class="my-1">
                        <RouterLink :to="{name: 'dashboard'}" class="flex items-center justify-start gap-3 p-2 rounded-lg"
                            :class="{ 'bg-blue-700': router.currentRoute.value.meta.activeName == 'dashboard' }">
                            <i class="fa-solid fa-home w-1/8" style="color:#fff;"></i>
                            <p class="w-1/8 text-white text-lg font-semibold">Dashboard</p>
                        </RouterLink>
                    </li>
                    <li class="my-1">
                        <RouterLink :to="{ name: 'tasks' }" class="flex items-center justify-start gap-3 p-2 rounded-lg"
                            :class="{ 'bg-blue-700': router.currentRoute.value.meta.activeName == 'tasks' }">
                            <i class="fa-solid fa-list w-1/8" style="color:#fff;"></i>
                            <p class="w-1/8 text-white text-lg font-semibold">Gérer les tâches</p>
                        </RouterLink>
                    </li>
                    <!-- <li class="my-1">
                        <div class="flex items-center justify-start gap-3 p-2 rounded-lg">
                            <i class="fa-solid fa-people-group w-1/8" style="color:#fff;"></i>
                            <p class="w-1/8 text-white text-lg font-semibold">Taches</p>
                        </div>
                    </li> -->
                    <!-- <li class="my-1">
                        <div class="flex items-center justify-start gap-3 p-2 rounded-lg">
                            <i class="fa-solid fa-folder w-1/8" style="color:#fff;"></i>
                            <p class="w-1/8 text-white text-lg font-semibold">Project</p>
                        </div>
                    </li>
                    <li class="my-1">
                        <div class="flex items-center justify-start gap-3 p-2 rounded-lg">
                            <i class="fa-solid fa-file w-1/8" style="color:#fff;"></i>
                            <p class="w-1/8 text-white text-lg font-semibold">Document</p>
                        </div>
                    </li> -->
                </ul>
            </div>
            <!-- <div class="p-5 min-h-1/8 relative top-1/3 w-full">
                <div class="flex items-center justify-start gap-3 p-2 rounded-lg bg-blue-700">
                    <i class="fa-solid fa-gear w-1/8" style="color:#fff;"></i>
                    <p class="w-1/8 text-white text-lg font-semibold">Setting</p>
                </div>
            </div> -->
        </div>
        <div class="w-1/6 sm:w-full h-full flex justify-start bg-black opacity-65 lg:hidden" id="partCloseSide">
            <div class="p-1  opacity-100 rounded-full w-10 h-10 mt-3 flex justify-center items-center"
                id="closeSideBar">
                <i class="fa-solid fa-xmark fa-xl" style="color:#fff;"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from '@/router';

</script>

<style lang="scss" scoped></style>