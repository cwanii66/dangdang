<script setup lang="ts">
</script>

<template>
  <div class="order-header">
    <i class="iconfont icon-xiangzuojiantou back-arrow" @click="$router.push({ name: 'shopcarts' })" />
    <div class="order-text">
      确认订单
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.6rem;
  width: 5.1rem;
  background-color: #fff;
  .back-arrow {
    font-size: 0.3rem;
    color: #333;
  }
  .order-text {
    flex: 1;
    font-size: 0.26rem;
    color: #333;
    text-align: center;
    font-weight: 500;
  }
}
</style>
