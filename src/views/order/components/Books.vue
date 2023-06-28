<script setup lang="ts">
import { OrderService } from '../service'
import getImg from '@/utils/imgUtil'

const { setCheckedShopCartList, startIndex, isShowLeftArrow, isShowRightArrow } = OrderService
setCheckedShopCartList()
const { subCheckedShopCartList, getCheckedShopCartList } = OrderService.shopCartStoreRefs
</script>

<template>
  <div class="order-book">
    <div class="order-book-tag">
      <img :src="getImg('dangdang.png')" class="img">
      <span class="dangdang-own-business">当当自营</span>
    </div>
    <div v-if="getCheckedShopCartList.length" class="order-book-list">
      <div class="shopcart-book">
        <img
          v-for="item in subCheckedShopCartList"
          :key="item.shopcartid"
          :src="getImg(item.bookpicname)"
          class="shopcart-book-img"
        >
      </div>
      <div class="leftarrow" @click="startIndex--">
        <i v-show="isShowLeftArrow" class="iconfont icon-zuojiantou" />
      </div>
      <div class="rightarrow" @click="startIndex++">
        <i v-show="isShowRightArrow" class="iconfont icon-xiangyoujiantou" />
      </div>
    </div>
    <div v-else class="order-book-non">
      <span>您还没有选择商品哦</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-book {
  width: 5.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background-color: #fff;
  padding: 0.16rem 0;
  &-tag {
    display: flex;
    align-items: center;
    .img {
      width: 0.3rem;
      height: 0.3rem;
      object-fit: contain;
    }
    .dangdang-own-business {
      font-size: 0.2rem;
      font-weight: 500;
      color: #999;
      margin-left: 0.1rem;
    }
  }
  &-list {
    display: flex;
    align-items: center;
    justify-content: center;
    // gap: 0.1rem;
    .shopcart-book {
      display: flex;
      gap: 0.1rem;
      .shopcart-book-img {
        flex-basis: 1rem;
        width: 1rem;
        object-fit: contain;
      }
    }
    .leftarrow {
      order: -1;
      flex: 1;
      text-align: center;
      .iconfont {
        font-size: 0.2rem;
        color: black;
        font-weight: bold;
      }
    }

    .rightarrow {
      order: 1;
      flex: 1;
      text-align: center;
      .iconfont {
        font-size: 0.23rem;
        color: black;
        font-weight: bold;
      }
    }
  }
  &-non {
    text-align: center;
    font-size: 0.2rem;
    font-weight: 500;
  }
}
</style>
