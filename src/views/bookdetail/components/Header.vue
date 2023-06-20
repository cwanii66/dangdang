<script setup lang="ts">
import { ref } from 'vue'
import { BookDetailService } from '../service'

const { headerStyle } = BookDetailService

const headerLinks = [
  { name: 'goods', from: 'comments', text: '商品' },
  { name: 'goods', from: 'comments', text: '详情' },
  { name: 'comments', from: 'goods', text: '评论' },
  { name: 'comments', from: 'goods', text: '相关' },
] as const

const activeIndex = ref<number>(0)
</script>

<template>
  <header class="header" :style="headerStyle">
    <i class="iconfont icon-zuojiantou1 left-arrow" @click="$router.back()" />
    <div class="header-wrapper">
      <span
        v-for="{ name, text }, idx in headerLinks"
        :key="idx"
        :class="{ 'link-active': activeIndex === idx }"
        @click="activeIndex = idx"
      >
        <router-link :to="{ name }" class="header-link" replace> {{ text }} </router-link>
      </span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  height: 0.6rem;
  z-index: 999;
  background-color: #fff;
  .left-arrow {
    position: absolute;
    top: 0.1rem;
    left: 0.2rem;
    font-size: 0.4rem;
  }
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5.4rem;
    height: 100%;
    gap: 0.36rem;
    font-size: 0.24rem;
    color: black;
    .header-link {
      text-decoration: none;
      color: inherit;
    }
    .link-active {
      color: red;
      border-bottom: 0.02rem solid red;
    }
  }
}
</style>
