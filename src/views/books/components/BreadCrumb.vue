<script setup lang="ts">
import FstToThrdCtgy from '@/views/ctgy/service'

const { getFirstCtgy, getSecondCtgy } = FstToThrdCtgy.ctgyStoreRefs
</script>

<template>
  <div class="breadcrust">
    <p> {{ getFirstCtgy.name }} </p>
    <i class="iconfont icon-xiangyoujiantou"></i>
    <p> {{ getSecondCtgy.secondgyname }} </p>
  </div>
</template>

<style lang="scss" scoped>
.breadcrust {
  display: flex;
  align-items: center;
  font-size: 0.2rem;
  padding: 0.12rem 0;
  gap: 0.1rem;
  font-weight: 400;
  text-shadow: 0 0 0.015rem rgba(24, 24, 24, 0.665);
  .iconfont::before {
    text-shadow: none;
    text-decoration: none;
  }
}
</style>
