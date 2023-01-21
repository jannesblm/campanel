import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import * as mqtt from 'mqtt/dist/mqtt'
import { useImageStore } from './stores/image'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
app.use(createPinia())
app.config.globalProperties.$mqtt = mqtt;
app.use(router)
app.mount('#app')

const authStore = useAuthStore()
const imageStore = useImageStore()

watch(() => authStore.client, (client, old) => {
    if (client === null) {
        old.end()
        return
    }
       
    client.on('connect', function () {
        authStore.setAuthenticated(true)
        client.subscribe('cam/#');
    });

    client.on('error', function (error) {
        client.end()
        authStore.setIsErrored(true)
        alert(error)
    })

    client.on('message', function (topic, message) {
        if (topic === 'cam/image') {
            imageStore.update(message)
        }
    })
})

if (authStore.username !== '' && authStore.password !== '') {
    authStore.login()
}

