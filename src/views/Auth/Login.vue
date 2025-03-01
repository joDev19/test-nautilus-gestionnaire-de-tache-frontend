<template>
    <AuthBaseTemplate>
        <template #title>Connectez vous à votre compte</template>
        <template #default>
            <p v-if="errors.result != undefined" class="text-red-500 text-sm font-semibold">{{ errors.result }}</p>
            <form class="space-y-6" action="#" method="POST" @submit.prevent="handleSubmit">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input type="email" name="email" id="email" autocomplete="email" v-model="user.email"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-10 border focus:outline-0">
                        <p v-if="errors.email != undefined" class="text-red-500 text-sm font-semibold">{{
                            errors.email[0]
                        }}</p>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password
                                ?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" autocomplete="current-password"
                            v-model="user.password"
                            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 h-10 border focus:outline-0">
                        <p v-if="errors.password != undefined" class="text-red-500 text-sm font-semibold">{{
                            errors.password[0]
                        }}</p>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-900">Vous n'avez pas de
                                compte ?</label>
                            <div class="text-sm">
                                <RouterLink :to="{ name: 'register' }"
                                    class="font-semibold text-indigo-600 hover:text-indigo-500">Créer
                                    un
                                    compte.</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <Button :loading="isLoading" :text="'Se connecter'" type-name="submit"></Button>
                </div>
            </form>
        </template>
    </AuthBaseTemplate>
</template>

<script setup>
import AuthBaseTemplate from "@/views/Auth/Layout/Template.vue"
import { RouterLink } from "vue-router";
import Button from "@/components/Button.vue";
import { ref } from "vue";
import httpClient from "@/httpClient";
import router from "@/router";
import Cookies from "js-cookie";
const isLoading = ref(false)
const errors = ref({})
const user = ref({
    email: "",
    password: "",
})
const handleSubmit = () => {
    isLoading.value = true
    errors.value = {}
    httpClient.get("sanctum/csrf-cookie").then(() => {
        httpClient.post("api/login", user.value)
            .then(res => {
                Cookies.set("gestion_des_tache_is_auth", true), { expires: 1 };
                Cookies.set("auth_name", res.data.name)
                router.push({ 'name': "dashboard" })
            })
            .catch(err => {
                if (err.status == 422) {
                    errors.value = err.response.data.errors
                } else if (err.status == 401) {
                    console.log(err)
                    errors.value.result = err.response.data.message
                }
            })
            .finally(() => isLoading.value = false)
    })

};
</script>

<style lang="scss" scoped></style>