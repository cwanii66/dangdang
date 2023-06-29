<script setup lang="ts">
import { OrderService } from '../service'

const { calcCheckedPrice, submitOrder } = OrderService
const { getCheckedShopCartList } = OrderService.shopCartStoreRefs
const checkedBookPrice = calcCheckedPrice()
</script>

<template>
  <div v-show="getCheckedShopCartList.length" class="submitto">
    <div class="payable">
      <span class="tag">实付：</span>
      <span class="money">&yen;{{ checkedBookPrice }}</span>
    </div>
    <div class="submitto-order" @click="submitOrder()">
      <span>提交订单</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.submitto {
  width: 5.1rem;
  height: 0.8rem;
  position: fixed;
  bottom: 3rem;
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
  .payable {
    flex: 3;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c4c4c4;
    border-radius: 0.4rem 0 0 0.4rem;
    .tag {
      font-size: 0.18rem;
    }
    .money {
      font-size: 0.24rem;
      font-weight: 500;
    }
  }
  .submitto-order {
    flex: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    border-radius: 0 0.4rem 0.4rem 0;
    font-size: 0.24rem;
    color: #fff;
  }
}
</style>
