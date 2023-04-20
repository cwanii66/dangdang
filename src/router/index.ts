/* eslint-disable antfu/top-level-function */

// import required function for router
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const ctgy = () => import('@/views/ctgy/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
    redirect: '/ctgy',
  },
  {
    name: 'ctgy',
    path: '/ctgy',
    component: ctgy,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
