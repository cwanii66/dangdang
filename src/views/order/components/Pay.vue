<script setup lang="ts">
import getImg from '@/utils/imgUtil'
</script>

<template>
  <div class="pay-method">
    <span class="pay-txt">支付方式</span>
    <span class="pay-type">
      <img class="pay-type-img" :src="getImg('zhifubao.png')">
      <span class="pay-type-txt">支付宝支付</span>
      <i class="iconfont icon-xiangyoujiantou arrow" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.pay-method {
  width: 5.1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.2rem;
  background-color: #fff;
  margin: 0.2rem 0;
  .pay-txt {
    color: #949494;
    margin-left: 0.2rem;
  }
  .pay-type {
    flex: 1;
    text-align: right;
    padding-right: 0.5rem;
    &-img {
      width: 0.32rem;
      height: 0.32rem;
      object-fit: contain;
      vertical-align: middle;
      margin-right: 0.1rem;
    }
    &-txt {
      color: #333;
      margin-right: 0.1rem;
      font-weight: 600;
    }
    .arrow {
      font-size: 0.21rem;
      font-weight: 800;
    }
  }
}
</style>
