<script setup lang="ts">
import Head from './components/Head.vue'
import OrderList from './components/OrderList.vue'
import Bottom from '@/views/common/Bottom.vue'
</script>

<template>
  <div class="order-sort-container">
    <Head />
    <OrderList />
  </div>
  <Bottom />
</template>

<style lang="scss" scoped>
.order-sort-container {
  width: 5.1rem;
  padding: 0 0.15rem;
  background-color: #f2f2f2;
}
</style>
