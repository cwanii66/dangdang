<script setup lang="ts">
import { ref } from 'vue'
import BookSearchBar from './components/BookSearchBar.vue'
import BreadCrumb from './components/BreadCrumb.vue'
import ThirdCtgy from './components/ThirdCtgy.vue'
import BookItem from './components/BookItem.vue'
import BookSort from './components/BookSort.vue'
import ShopCart from './components/ShopCart.vue'
import getImg from '@/utils/imgUtil'

const shopcartRef = ref<InstanceType<typeof ShopCart>>()
function ctrlShopCart(isShow: boolean) {
  shopcartRef.value?.ctrlShopCart(isShow)
}
</script>

<template>
  <BookSearchBar />
  <aside class="ad">
    <img class="ad-img" :src="getImg('2.png')">
  </aside>
  <main class="book-ctgy">
    <BreadCrumb />
    <ThirdCtgy />
    <BookSort :ctrlShopCart="ctrlShopCart" />
    <BookItem />
  </main>
  <footer>
    <ShopCart ref="shopcartRef" />
  </footer>
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
