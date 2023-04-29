/* eslint-disable antfu/top-level-function */

import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const ctgy = () => import('@/views/ctgy/index.vue')
const books = () => import('@/views/books/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'default',
    redirect: '/books',
  },
  {
    name: 'ctgy',
    path: '/ctgy',
    component: ctgy,
  },
  {
    name: 'books',
    path: '/books',
    component: books,
    props: route => ({ thirdctgyId: route.query.thirdctgyId }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
