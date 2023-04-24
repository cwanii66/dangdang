<script setup lang="ts">
import type { ThirdCtgy } from '@/store/state'

defineProps<{
  thirdctgys: ThirdCtgy[]
}>()

function displayClass(index: number, length: number) {
  return (index % 3 !== 0 && index !== length) ? '' : 'hidden'
}
</script>

<template>
  <ul class="thirdctgy">
    <li class="thirdctgy-item" v-for="({ thirdctgyId, thirdname }, index) in thirdctgys" :key="thirdctgyId">
      <span class="thirdname">{{ thirdname }}</span>
      <i class="iconfont icon-shuxian" :class="displayClass(index + 1, thirdctgys.length)"></i>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.thirdctgy {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  padding: 0 0.05rem 0 0.1rem;

  &-item {
    display: flex;
    padding: 0.2rem 0;

    .thirdname {
      flex: 1;
    }
  }
}

/* resolve the problem of the last line of the third category */
.hidden::before {
  visibility: hidden;
  pointer-events: none;
}
</style>
