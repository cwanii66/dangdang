<script setup lang="ts">
import BookSearchBar from './components/BookSearchBar.vue'
import BreadCrumb from './components/BreadCrumb.vue'
import ThirdCtgy from './components/ThirdCtgy.vue'
import BookItem from './components/BookItem.vue'
import getImg from '@/utils/imgUtil'
</script>

<template>
  <BookSearchBar />
  <div class="ad">
    <img class="ad-img" :src="getImg('2')" />
  </div>
  <div class="book-ctgy">
    <BreadCrumb />
    <ThirdCtgy />
    <BookItem />
  </div>
</template>

<style lang="scss" scoped>
.ad {
  position: absolute;
  top: 0.86rem;
  margin: 0.18rem;
  width: 5.04rem;
  height: 1.62rem;

  &-img {
    width: 100%;
    height: 100%;
    border-radius: 0.1rem;
    object-fit: contain;
  }
}

.book-ctgy {
  position: absolute;
  top: 2.7rem;
  width: 5.04rem;
  margin: 0.18rem;
}
</style>
