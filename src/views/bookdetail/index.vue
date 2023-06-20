<script setup lang="ts">
import Header from './components/Header.vue'
import { CommentService } from './service'

const { findCommentList } = CommentService

findCommentList()
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped>

</style>
