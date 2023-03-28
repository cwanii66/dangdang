<script setup lang="ts">
import { ref } from 'vue'
import getImg from '../utils/imgHandler'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <img :src="getImg('白夜行')" alt="">
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
