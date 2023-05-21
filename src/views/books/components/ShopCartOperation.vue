<script setup lang="ts">
import ShopCartService from '../service/shopcart'
import type { BookInfo } from '@/pstore/books'

defineProps<{
  bookItem: BookInfo
}>()

const { addBookToShopCart, updateShopCart, deleteShopCart } = ShopCartService
</script>

<template>
  <div class="shopcart">
    <div v-if="!bookItem.purchasenum" class="addbtn">
      <div class="addbtn-inner" @click="addBookToShopCart(bookItem)">添加到购物车</div>
    </div>
    <div v-else class="shopcart-operate">
      <span @click="updateShopCart(bookItem, $event)" v-show="bookItem.purchasenum > 1" class="shopcart-operate-minus">
        <span class="inner">-</span>
      </span>
      <span @click="deleteShopCart(bookItem)" v-show="bookItem.purchasenum === 1" class="shopcart-operate-del">
        <span class="inner"><i class="iconfont icon-shanchu" /></span>
      </span>
      <span class="purchasenum">{{ bookItem.purchasenum }}</span>
      <span @click="updateShopCart(bookItem, $event)" class="shopcart-operate-plus">
        <span class="inner">+</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shopcart {
  .addbtn {
    display: flex;
    justify-content: center;
    &-inner {
      width: 90%;
      height: 0.32rem;
      line-height: 0.32rem;
      background-color: #fef3ed;
      color: #db8441;
      text-align: center;
      padding: 0.05rem;
      border-radius: 0.25rem;
    }
  }

  &-operate {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.16rem;

    &-plus,
    &-minus {
      padding: 0.1rem;
      .inner {
        display: inline-block;
        text-align: center;
        line-height: 0.28rem;
        width: 0.3rem;
        height: 0.3rem;
        background-color: #1885f1;
        color: white;
        border-radius: 50%;
      }
    }

    &-del {
      padding: 0.1rem;
      .icon-shanchu {
        font-size: 0.3rem;
      }
    }
    .purchasenum {
      font-size: 0.2rem;
    }
  }
}
</style>
