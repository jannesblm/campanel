import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  const image = ref([])
  function update(newImage) {
    image.value = newImage;
  }

  return { image, update }
})
