<script setup>
import { watch, ref, computed, toRaw } from 'vue';
import { useImageStore } from '../stores/image'
import { useAuthStore } from '../stores/auth'
import { useSettingsStore } from '../stores/settings'

import debounce from "lodash.debounce"

import wav from '../assets/ding.wav'
import camera from '../assets/camera.png'
import MyCanvas from '../components/MyCanvas.vue';

const imageStore = useImageStore()
const settingsStore = useSettingsStore()
const authStore = useAuthStore()
const audio = new Audio(wav)
const doBeep = ref(true)
const showModal = ref(false)
const modalData = ref(new Uint8Array)
const modelDate = ref(new Date())

watch(() => imageStore.image, (image) => {
  imageStore.history.enq({
    image: image,
    time: new Date(),
  })

  if (doBeep.value) {
    audio.play();
  }
})

function showDetail(item) {
  item = toRaw(item);

  modalData.value = item.image;
  modelDate.value = item.time;
  showModal.value = true;
}

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
        <MyCanvas :data="imageStore.image" width="512" height="288"></MyCanvas>
        <div v-if="imageStore.image.length === 0"
          class="absolute height-100 width-100 inset-0 flex items-center justify-center flex-col bg-stone-900 rounded-md">
          <img :src="camera" alt="Camera icon" />
          <p>Waiting for movement</p>
        </div>
      </div>
      <div>
        <div class="block flex justify-end">
          <label class="label-text mr-2">Play sound</label>
          <input type="checkbox" v-model="doBeep" class="checkbox checkbox-primary" />
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
        <li v-for="(item, index) in imageStore.historyArray">
          <MyCanvas :data="item.image" class="w-auto" @click="showDetail(item)"/>
        </li>
      </ul>
    </div>
  </div>

  <input type="checkbox" v-model="showModal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="font-bold text-lg">Snapshot</h3>
      <p class="my-4">{{ modelDate.toString() }}</p>
      <MyCanvas :data="modalData" width="512" height="288" class="w-full"/>
      <div class="modal-action">
        <label for="my-modal-5" class="btn" @click="showModal = false">Close</label>
      </div>
    </div>
  </div>
</template>
