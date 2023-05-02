<script setup lang="ts">
import FstToThrdCtgy from '@/views/ctgy/service'

const { openOrCollapseInBook } = FstToThrdCtgy
const { getThirdCtgyList, getSubThirdCtgyList, isSpreadCtgys } = FstToThrdCtgy.ctgyStoreRefs
</script>

<template>
  <div class="content">
    <div class="allthirdctgy">
      <span>全部</span>
    </div>
    <div>
      <p class="thrdctgys" v-for="thirdctgy in isSpreadCtgys ? getThirdCtgyList : getSubThirdCtgyList"
        :key="thirdctgy.thirdctgyId">
        {{ thirdctgy.thirdname }}
      </p>
      <div class="icon">
        <span v-show="!isSpreadCtgys" @click="openOrCollapseInBook(true)">
          <i class="iconfont icon-xiangxiajiantou" />
        </span>
        <span v-show="isSpreadCtgys" @click="openOrCollapseInBook(false)">
          <i class="iconfont icon-xiangshangjiantou" />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  position: relative;
  margin-top: 0.3rem;
  width: 5.04rem;
}
</style>
