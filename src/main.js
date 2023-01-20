import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import * as mqtt from 'mqtt/dist/mqtt'
import { useImageStore } from './stores/image'

let client = mqtt.connect("ws://localhost:9001")

client.on('connect', function () {
    client.subscribe('cam/image', function (err) {
        if (!err) {
            
        }
    })
})
  
client.on('message', function (topic, message) {
    const store = useImageStore();

    //console.log(topic, message.toString());

    if (topic === 'cam/image') {
        store.update(message);
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
