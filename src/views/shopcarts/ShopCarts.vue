<script setup lang="ts">
import ShopCartService from '../books/service/shopcart'
import ShopCartOperation from '../books/components/ShopCartOperation.vue'
import EmptyShopCart from './EmptyShopCart.vue'
import getImg from '@/utils/imgUtil'

const { getShopCartList } = ShopCartService.shopCartStoreRefs
const [totalBookNum, totalBookPrice] = ShopCartService.refreshShopCartInfo()
const { isSelectAll, back, selectAll, checkEvery } = ShopCartService
checkEvery()
</script>

<template>
  <div class="shopcarts">
    <header class="header">
      <i @click="back" class="iconfont icon-xiangzuojiantou back-arrow" />
      <input type="checkbox" class="check" v-model="isSelectAll" @change="selectAll">
      <span class="label">当当网</span>
    </header>
    <div v-for="shopCart in getShopCartList" :key="shopCart.shopcartid" class="items">
      <div class="item">
        <div class="content">
          <input type="checkbox" class="check" v-model="shopCart.checked" @change="checkEvery">
          <div class="pic">
            <img :src="getImg(shopCart.bookpicname)" class="pic-image">
          </div>
          <div class="description">
            <div class="book-title">
              {{ shopCart.bookname }}
            </div>
            <div class="price">
              <span class="curprice">&yen;{{ shopCart.bookprice }}</span>
              <span class="shopcart-operate">
                <ShopCartOperation :shop-cart="shopCart" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="getShopCartList.length === 0">
      <EmptyShopCart />
    </div>
    <div class="cal">
      <span class="checkall">
        <input type="checkbox" class="check" v-model="isSelectAll" @change="selectAll">
        <span class="label">全选</span>
        <span class="total">
          合计: <span class="money">&yen;{{ totalBookPrice }}</span>
        </span>
      </span>
      <span class="settlement">去结算({{ totalBookNum }})</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shopcarts {
  padding: 0 0.13rem;
  .header {
    display: flex;
    position: fixed;
    width: 5.14rem;
    height: 0.85rem;
    align-items: center;
    gap: 0.25rem;
    background-color: white;
    z-index: 99;
    .back-arrow,
    .label {
      font-size: 0.25rem;
    }
    .check {
      width: 0.3rem;
      height: 0.22rem;
      cursor: pointer;
    }
  }
  .items {
    display: grid;
    grid-template-columns: 5.14rem;
    // grid-template-rows: repeat(auto-fill, 2.89rem);
    grid-auto-rows: 2.89rem;
    align-items: center;
    row-gap: 0.2rem;
    position: relative;
    width: 5.14rem;
    top: 0.86rem;
    bottom: 0.86rem;
    overflow-y: scroll;
    .content {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      .check {
        width: 0.3rem;
        height: 0.22rem;
        cursor: pointer;
      }
      .pic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.539rem;
        height: 2.16rem;
        .pic-image {
          width: 80%;
          height: 70%;
        }
      }
      .description {
        display: flex;
        width: 3.21rem;
        flex-direction: column;
        .book-title {
          height: 0.8rem;
          color: #272727;
          font-size: 0.2rem;
        }
        .price {
          display: flex;
          align-items: center;
          width: 100%;
          height: 1rem;
          font-size: 0.2rem;
          color: #ea5430;
          .curprice {
            flex: 1;
          }
          span {
            flex: 2;
          }
        }
      }
    }
  }
  .cal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 5.14rem;
    height: 0.85rem;
    bottom: 0;
    background-color: white;
    z-index: 99;
    .checkall {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      .check {
        width: 0.3rem;
        height: 0.22rem;
        cursor: pointer;
      }
      .label {
        font-size: 0.25rem;
      }
      .total {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.1rem;
        margin-left: 0.2rem;
        font-weight: 600;
        .money {
          font-size: 0.25rem;
          color: #ea5430;
        }
      }
    }
    .settlement {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.2rem;
      height: 0.6rem;
      background-color: #ea5430;
      border-radius: 1rem;
      color: white;
      font-size: 0.25rem;
      text-shadow: 0 0 0.01rem #3f3f3f;
    }
  }
}
</style>
