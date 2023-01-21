<script>
import { ref, inject } from 'vue';
import { useAuthStore } from '../stores/auth';
import logo from '../assets/logo.png'

export default {
    setup() {
        const username = ref('')
        const password = ref('')
        const authStore = useAuthStore()

        function login() {
            authStore.setAuthData(username.value, password.value)
            authStore.login()
        }

        return { username, password, login, logo }
    }
}
</script>

<template>
    <div class="container mx-auto flex justify-center items-center h-screen">
        <div class="w-1/4">
            <img :src="logo" class="w-2/3 mx-auto mb-4"/>
            <form class="block" v-on:submit.prevent="login">
                <input type="text" class="input input-bordered input-sm w-full py-px px-2 mb-2" v-model="username" placeholder="User" autofocus>
                <input type="password" class="input input-bordered input-sm w-full py-px px-2 mb-2" v-model="password" placeholder="Password">
                <button type="submit" class="btn btn-sm float-right" @click="login">Login</button>
            </form>
        </div>
    </div>
</template>