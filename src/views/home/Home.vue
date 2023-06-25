<script setup lang="ts">
import Bottom from '../common/Bottom.vue'
import Header from './components/Header.vue'
import Nav from './components/Nav.vue'
import BookList from './components/BookList.vue'
</script>

<template>
  <div class="container">
    <div class="header-wrapper">
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
