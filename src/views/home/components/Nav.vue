<script setup lang="ts">
import { navItems } from '../../common/data'
import getImg from '@/utils/imgUtil'
</script>

<template>
  <div class="nav">
    <div class="nav-item-list">
      <div v-for="(item, index) in navItems" :key="index" class="nav-item">
        <a :href="item.href" class="item-link">
          <img :src="getImg(item.img)" class="nav-item-icon">
          <div class="nav-item-title">{{ item.name }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  position: absolute;
  top: 3rem;
  width: 5.2rem;
  background-color: #fff;
  .nav-item-list {
    height: 2.3rem;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.1rem;
    .nav-item {
      .item-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      .nav-item-icon {
        width: 0.4rem;
        height: 0.4rem;
        object-fit: contain;
      }
      .nav-item-title {
        font-size: 0.15rem;
        color: #333;
        margin-top: 0.1rem;
      }
    }
  }
}
</style>
../../common/data
