import { createRouter, createWebHistory } from 'vue-router'
import CameraView from '../views/CameraView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CameraView',
      component: CameraView
    },
  ]
})

export default router
