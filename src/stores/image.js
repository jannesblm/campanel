import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import * as CircularBuffer from 'circular-buffer'

export const useImageStore = defineStore('image', () => {
  const image = ref(new Uint8Array())
  const history = ref(new CircularBuffer(10))

  const historyArray = computed(() => history.value.toarray());

  function update(newImage) {
    image.value = newImage;
  }

  return { image, history, historyArray, update }
})
