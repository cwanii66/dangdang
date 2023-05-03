<script setup lang="ts">
import { ref } from 'vue'
import FstToThrdCtgy from '@/views/ctgy/service'

const { openOrCollapseInBook } = FstToThrdCtgy
const { getThirdCtgyList, getSubThirdCtgyList, isSpreadCtgys, getThirdCtgy } = FstToThrdCtgy.ctgyStoreRefs

const activeThirdCtgyIndex = ref<number>(getThirdCtgy.value.thirdctgyId)
function isActiveThirdCtgy(idx: number) {
  return activeThirdCtgyIndex.value === getThirdCtgyList.value[idx].thirdctgyId
}
function setActiveThirdCtgy(idx: number) {
  activeThirdCtgyIndex.value = idx
}
</script>

<template>
  <div class="content">
    <div class="thrdctgys">
      <span class="thirdctgy-item">全部</span>
    </div>
    <div
      v-for="thirdctgy, idx in isSpreadCtgys ? getThirdCtgyList : getSubThirdCtgyList" :key="thirdctgy.thirdctgyId"
      class="thrdctgys" :class="{ 'active-ctgy': isActiveThirdCtgy(idx) }" @click="setActiveThirdCtgy(idx + 1)"
    >
      <span class="thirdctgy-item">{{ thirdctgy.thirdname }}</span>
    </div>
    <div class="icon">
      <span v-show="!isSpreadCtgys" @click="openOrCollapseInBook(true)">
        <i class="iconfont icon-xiangxiajiantou" />
      </span>
      <span v-show="isSpreadCtgys" @click="openOrCollapseInBook(false)">
        <i class="iconfont icon-xiangshangjiantou" />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 0.3rem;
  width: 5.04rem;
  .thrdctgys {
    float: left;
    font-size: 0.18rem;
    margin-right: 0.5rem;
    height: 0.48rem;
    .thirdctgy-item {
      text-shadow: 0 0 0.01rem gray;
      &.active-ctgy {
        background-color: #f5f5f5;
      }
    }
  }
  .thrdctgys:last-child {
    margin-right: 0;
  }
  .icon {
    position: relative;
  }
}
</style>
