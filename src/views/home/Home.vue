<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { onMounted } from 'vue'
import Bottom from '../common/Bottom.vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import BookList from './components/BookList.vue'
import { HomeService } from './service'

const { headerScroll, init } = HomeService
const { headerRef, headerOpacity } = HomeService.bookStoreRefs

onMounted(() => {
  init()
})
useEventListener('scroll', headerScroll)
</script>

<template>
  <div class="container">
    <div
      ref="headerRef"
      class="header-wrapper"
      :style="headerOpacity"
    >
      <Header />
    </div>
    <Nav />
    <BookList />
  </div>
  <Bottom />
</template>

<style lang="scss" scoped>
.container {
  width: 5.2rem;
  padding: 0 0.1rem;
  .header-wrapper {
    width: 5.2rem;
    position: fixed;
    background-color: #fff;
    z-index: 999;
  }
}
</style>
