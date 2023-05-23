<script setup lang="ts">
import ShopCartService from '../service/shopcart'

const [totalBookNum, totalBookPrice] = ShopCartService.refreshShopCartInfo()
</script>

<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <i class="iconfont icon-gouwuche" :class="{ highlight: totalBookNum > 0 }" />
        <div class="purchasenum" v-show="totalBookNum > 0">
          {{ totalBookNum }}
        </div>
      </div>
      <div class="content-right">
        <div class="totalprice">
          &yen;{{ totalBookPrice }}
        </div>
        <div class="settlement">
          <span>去结算</span>
          <i class="iconfont icon-xiangyoujiantou" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: white;
  .content {
    display: flex;
    width: 100%;
    height: 0.73rem;
    align-items: center;
    justify-content: center;
    gap: 0.26rem;
    &-left {
      position: relative;
      width: 1.095rem;
      height: 0.53rem;
      line-height: 0.53rem;
      .highlight {
        color: black;
      }
      .icon-gouwuche {
        font-size: 0.4rem;
      }
      .purchasenum {
        width: 0.21rem;
        position: absolute;
        left: 0.3rem;
        top: 0;
        line-height: normal;
        text-align: center;
        color: white;
        font-size: 0.18rem;
        border-radius: 0.1rem;
        background-color: red;
      }
    }
    &-right {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.1rem;
      width: 3.5rem;
      height: 0.53rem;
      font-size: 0.28rem;
      background-color: #ffac7f;
      color: black;
      border-radius: 0.5rem;
      .totalprice {
        font-weight: 600;
      }
      .settlement {
        font-size: 0.21rem;
        .icon-xiangyoujiantou {
          font-size: 0.24rem;
        }
      }
    }
  }
}
</style>
