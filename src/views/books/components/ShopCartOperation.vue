<script setup lang="ts">
import ShopCartService from '../service/shopcart'
import type { ShopCartInfo } from '@/pstore/shopcart'
import type { BookInfo } from '@/pstore/books'

defineProps<{
  bookItem?: BookInfo
  shopCart?: ShopCartInfo
}>()

const { addBookToShopCart, updateFromShopCart, deleteFromShopCart, updateInShopCart, deleteInShopCart } = ShopCartService
</script>

<template>
  <div class="shopcart">
    <div v-if="bookItem">
      <div v-if="!bookItem.purchasenum" class="addbtn">
        <div class="addbtn-inner" @click="addBookToShopCart(bookItem)">
          添加到购物车
        </div>
      </div>
      <div v-else class="shopcart-operate">
        <span v-show="bookItem.purchasenum > 1" class="shopcart-operate-minus" @click="updateFromShopCart(bookItem, $event)">
          <span class="inner">-</span>
        </span>
        <span v-show="bookItem.purchasenum === 1" class="shopcart-operate-del" @click="deleteFromShopCart(bookItem)">
          <span class="inner"><i class="iconfont icon-shanchu" /></span>
        </span>
        <span class="purchasenum">{{ bookItem.purchasenum }}</span>
        <span class="shopcart-operate-plus" @click="updateFromShopCart(bookItem, $event)">
          <span class="inner">+</span>
        </span>
      </div>
    </div>
    <div v-else-if="shopCart" class="shopcart-operate">
      <span v-show="shopCart.purchasenum > 1" class="shopcart-operate-minus" @click="updateInShopCart(shopCart, $event)">
        <span class="inner">-</span>
      </span>
      <span v-show="shopCart.purchasenum === 1" class="shopcart-operate-del" @click="deleteInShopCart(shopCart)">
        <span class="inner"><i class="iconfont icon-shanchu" /></span>
      </span>
      <span class="purchasenum">{{ shopCart.purchasenum }}</span>
      <span class="shopcart-operate-plus" @click="updateInShopCart(shopCart, $event)">
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
        color: initial;
      }
    }
    .purchasenum {
      font-size: 0.2rem;
      color: initial;
    }
  }
}
</style>
