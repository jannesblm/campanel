<script setup>
import { watch, ref } from 'vue';
import { useImageStore } from '../stores/image'
import { useAuthStore } from '../stores/auth'
import { useSettingsStore } from '../stores/settings'

import debounce from "lodash.debounce"

import wav from '../assets/ding.wav'
import camera from '../assets/camera.png'
import MyCanvas from '../components/MyCanvas.vue';

const imageStore = useImageStore();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const audio = new Audio(wav);
const beep = ref(true);


watch(() => imageStore.image, (image) => {
  imageStore.history.push(image)

  if (imageStore.history.length > 10) {
    imageStore.history.splice(-1)
  }

  if (beep.value) {
    audio.play();
  }
})

watch(() => imageStore.history, (history) => {

})

const updateSensitivity = debounce((newValue) => {
  settingsStore.updateSensitivity(newValue);
}, 500);

const updateDelay = debounce((newValue) => {
  settingsStore.updateDelay(newValue);
}, 500);

</script>

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">CamPanel</a>
    </div>
    <div class="flex-none">
      <button class="btn btn-ghost" @click="authStore.logout">Logout</button>
    </div>
  </div>
  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center">

      <div class="mb-4 relative">
        <MyCanvas :data="imageStore.image"></MyCanvas>
        <!-- <canvas ref="myCanvas" width="512" height="288" class="rounded-md"></canvas> -->
        <div v-if="imageStore.image.length === 0"
          class="absolute height-100 width-100 inset-0 flex items-center justify-center flex-col bg-stone-900 rounded-md">
          <img :src="camera" alt="Camera icon" />
          <p>Waiting for movement</p>
        </div>
      </div>
      <div>
        <div class="block flex justify-end">
          <label class="label-text mr-2">Play sound</label>
          <input type="checkbox" v-model="beep" class="checkbox checkbox-primary" />
        </div>
        <label>sensitivity: {{ settingsStore.sensitivity }}</label>
        <input type="range" class="range range-primary range-xs" v-model="settingsStore.sensitivity"
          @input="updateSensitivity($event.target.value)" min="1" max="30" />
        <label>delay: {{ settingsStore.delay }}</label>
        <input type="range" class="range range-primary range-xs" v-model="settingsStore.delay"
          @input="updateDelay($event.target.value)" min="1" max="20" />
      </div>

      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>

    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 bg-base-100 text-base-content">
        <li v-for="(item, index) in imageStore.history">
          <MyCanvas :data="item"/>
        </li>
      </ul>

    </div>
  </div>
</template>
