import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const image = ref(new Uint8Array())
  const history = ref([])

  function update(newImage) {
    image.value = newImage;
  }

  return { image, history, update }
})
