<script setup lang="ts">
import CommentLevel from './components/CommentLevel.vue'
import CommentList from './components/CommentList.vue'
</script>

<template>
  <div class="container">
    <CommentLevel />
    <CommentList />
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0.6rem;
  left: 0.4rem;
  width: 4.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
</style>
