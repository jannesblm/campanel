import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

export const useSettingsStore = defineStore('settings', () => {
  const authStore = useAuthStore()

  const sensitivity = ref(8)
  const delay = ref(3)
  
  function updateSensitivity(newValue) {
    sensitivity.value = newValue
    console.log(31 - newValue);
    authStore.client.publish("cam/settings/sensitivity", (31 - newValue).toString())
  }

  function updateDelay(newValue) {
    delay.value = newValue
    authStore.client.publish("cam/settings/delay", newValue)
  }

  return { sensitivity, delay, updateSensitivity, updateDelay }
})
