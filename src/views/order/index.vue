<script setup lang="ts">
import Header from './components/Header.vue'
import Pay from './components/Pay.vue'
import Books from './components/Books.vue'
import Bottom from './components/Bottom.vue'
</script>

<template>
  <div class="order-container">
    <Header />
    <Pay />
    <Books />
    <Bottom />
  </div>
</template>

<style lang="scss" scoped>
.order-container {
  width: 5.1rem;
  height: 100vh;
  padding: 0 0.15rem;
  background-color: #f6f6f6;
}
</style>
