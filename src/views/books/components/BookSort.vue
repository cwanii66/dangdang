<script setup lang="ts">
import BookService from '../service'

const { sortBook, isDesc } = BookService
</script>

<template>
  <ul class="book-sort">
    <li class="compsive"><span class="inner">综合</span></li>
    <li @click="sortBook('monthsalecount')">
      销量
      <span class="asc-desc">
        <i v-show="isDesc" class="iconfont icon-zuoce-xiangxiaxiaojiantousvg"></i>
        <i v-show="!isDesc" class="iconfont icon-zuoce-xiangshangxiaojiantou"></i>
      </span>
    </li>
    <li @click="sortBook('price')">
      价格
      <span class="asc-desc">
        <i v-show="isDesc" class="iconfont icon-zuoce-xiangxiaxiaojiantousvg"></i>
        <i v-show="!isDesc" class="iconfont icon-zuoce-xiangshangxiaojiantou"></i>
      </span>
    </li>
    <li class="shop">店铺</li>
    <li class="dressing">
      筛选
      <i class="iconfont icon-shaixuan"></i>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.book-sort {
  display: flex;
  font-size: 0.2rem;
  align-items: center;
  margin-left: 0.1rem;

  >li {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
}
</style>
