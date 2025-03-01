<template>
    <div class="w-screen h-screen sm:lg sm:flex">
        <div class="sm:w-1/2 h-full hidden bg-blue-500 lg:flex items-center justify-center">
            <h1 class="text-6xl text-center text-white font-bold ">Gérer vos tâche pour plus de productivité.</h1>
        </div>
        <div class="mx-auto lg:w-1/2 h-full">
            <div class="flex h-full flex-col justify-center px-6 py-12 lg:px-8 flex">
                <div class="border border-2 rounded-lg p-3 shadow-lg sm:mx-auto sm:w-full sm:max-w-sm">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img class="mx-auto h-10 w-auto"
                            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company">
                        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            <slot name="title" />
                        </h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

</script>

<style lang="scss" scoped></style>