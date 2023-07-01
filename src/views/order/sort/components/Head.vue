<script setup lang="ts">
import { ref } from 'vue'

const orderinfos = ['全部订单', '待付款', '待收货', '待评价', '|', '筛选'] as const
const activeIndex = ref<number>(0)

function changeTab(index: number) {
  activeIndex.value = index
}
</script>

<template>
  <div class="order-header">
    <div class="order-search">
      <i class="iconfont icon-zuojiantou left-arrow" />
      <i class="iconfont icon-fangdajing magnifier" />
      <input id="input" type="text" placeholder="搜索我的订单" class="keyword-input">
    </div>
    <div class="order-status">
      <div
        v-for="(orderinfo, index) in orderinfos"
        :key="index"
        :class="{
          'item-active': activeIndex === index && activeIndex !== 4,
        }"
        class="order-status-item"
        @click="changeTab(index)"
      >
        {{ orderinfo }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-header {
  width: 5.1rem;
  position: fixed;
  top: 0;
  height: 1.2rem;
  margin-top: 0.2rem;
  .order-search {
    display: flex;
    height: 0.65rem;
    background-color: #f6f6f6;
    border-radius: 1rem;
    align-items: center;
    .left-arrow {
      margin-left: 0.1rem;
      font-size: 0.24rem;
    }
    .magnifier {
      margin: 0 0.1rem 0 0.2rem;
      font-size: 0.24rem;
    }
    .keyword-input {
      width: 4rem;
      height: 0.65rem;
      border: none;
      background: none;
      outline: none;
      font-size: 0.2rem;
      color: #999;
    }
  }
  .order-status {
    margin-top: 0.16rem;
    display: flex;
    justify-content: space-around;
    font-size: 0.2rem;
    &-item {
      &:nth-child(5) {
        pointer-events: none;
      }
    }
    .item-active {
      color: #ff464e;
      border-bottom: 1px solid #936e7f;
    }
  }
}
</style>
