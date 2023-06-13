/* eslint-disable antfu/top-level-function */

import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import storage from '@/utils/storageUtil'

const ctgy = () => import('@/views/ctgy/index.vue')
const books = () => import('@/views/books/index.vue')
const shopcarts = () => import('@/views/shopcarts/ShopCarts.vue')
const search = () => import('@/views/search/index.vue')
const login = () => import('@/views/user/Login.vue')

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
  {
    name: 'books',
    path: '/books',
    component: books,
  },
  {
    name: 'shopcarts',
    path: '/shopcarts',
    component: shopcarts,
  },
  {
    name: 'search',
    path: '/search',
    component: search,
  },
  {
    name: 'login',
    path: '/login',
    component: login,
    beforeEnter: (to, from, next) => {
      const token = storage.get('token')
      if (token)
        next({ name: 'ctgy' })
      else
        next()
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// auth guard
router.beforeEach((to, from, next) => {
  const token = storage.get('token')
  if (token || to.name === 'login')
    next()
  else
    next({ name: 'login' })
})

export default router
