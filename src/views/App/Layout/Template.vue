<template>
    <div class="h-screen w-screen">
        <Navbar />
        <Sidebar />
        <div class="h-16"></div>
        <div class="px-5 py-8 min-h-96 lg:flex lg:w-full">
            <div class="lg:w-1/5"></div>
            <div class=" lg:w-4/5 p-1">
                <slot></slot>
            </div>
        </div>
        <ModalsContainer />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import { useTemplateStore } from '@/stores/template';
import { ModalsContainer } from 'vue-final-modal';
onMounted(() => {
    let body = document.querySelector('body')
    let userIcon = document.getElementById("userIcon")
    let userSetting = document.getElementById("userSetting")

    let menuIcon = document.getElementById("menuIcon")
    let sideBar = document.getElementById("sideBar")
    let closeSideBar = document.getElementById("closeSideBar")
    let partCloseSide = document.getElementById("partCloseSide")
    let userIconDrop = document.getElementById("userIconDrop")



    userIcon.addEventListener('click', (e) => {
        e.stopPropagation()
        userSetting.classList.toggle('hidden')

    })
    userIconDrop.addEventListener('click', (e) => {
        e.stopPropagation()
        userSetting.classList.toggle('hidden')

    })
    userSetting.addEventListener('click', (e) => {
        e.stopPropagation()
    })
    body.addEventListener('click', (e) => {
        if (!userSetting.classList.contains('hidden')) {

            userSetting.classList.add('hidden')

        }
    })

    menuIcon.addEventListener("click", () => {
        sideBar.classList.toggle("hidden")
        useTemplateStore().mobileSideIsOpen = true;
    })
    closeSideBar.addEventListener("click", () => {
        useTemplateStore().mobileSideIsOpen = false;
        sideBar.classList.add("hidden")
    })
    partCloseSide.addEventListener("click", (e) => {
        e.stopPropagation()
        if (!sideBar.classList.contains("hidden")) {
            sideBar.classList.add("hidden")
            useTemplateStore().mobileSideIsOpen = false;
        }
    })
})
</script>

<style lang="scss" scoped></style>