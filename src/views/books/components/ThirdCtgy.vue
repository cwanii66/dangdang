<script setup lang="ts">
import { computed, ref } from 'vue'
import FstToThrdCtgy from '@/views/ctgy/service'

const { openOrCollapseInBook } = FstToThrdCtgy
const { getThirdCtgyList, getSubThirdCtgyList, isSpreadCtgys, getThirdCtgy } = FstToThrdCtgy.ctgyStoreRefs

const activeThirdCtgyIndex = ref<number>(getThirdCtgy.value.thirdctgyId)
const thirdCtgyList = computed(() => isSpreadCtgys.value ? getThirdCtgyList.value : getSubThirdCtgyList.value)
const allEl = ref<HTMLDivElement | null>(null)

const displayedThirdCtgyList = computed(() => {
  const list = thirdCtgyList.value
  const activeIndex = list.findIndex(thirdctgy => thirdctgy.thirdctgyId === activeThirdCtgyIndex.value)

  if (activeIndex > 0)
    moveToFirst(activeIndex)
  return list
})
function setActiveThirdCtgy(idx: number) {
  if (idx === -1) {
    allEl.value?.classList.add('active-ctgy')
    activeThirdCtgyIndex.value = -1
  }
  else {
    allEl.value?.classList.remove('active-ctgy')
    activeThirdCtgyIndex.value = thirdCtgyList.value[idx].thirdctgyId
    moveToFirst(idx)
  }
}
function moveToFirst(idx: number) {
  const clickedElement = thirdCtgyList.value.splice(idx, 1)[0]
  thirdCtgyList.value.unshift(clickedElement)
}
</script>

<template>
  <div class="content">
    <div ref="allEl" class="thrdctgys" @click="setActiveThirdCtgy(-1)">
      <span class="thirdctgy-item">全部</span>
    </div>
    <div v-for="thirdctgy, idx in displayedThirdCtgyList" :key="thirdctgy.thirdctgyId" class="thrdctgys"
      :class="{ 'active-ctgy': activeThirdCtgyIndex === thirdctgy.thirdctgyId }" @click="setActiveThirdCtgy(idx)">
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
  position: relative;
  margin-top: 0.2rem;
  width: 5.04rem;
  overflow: hidden;

  .thrdctgys {
    float: left;
    font-size: 0.18rem;
    margin-right: 0.24rem;
    height: 0.43rem;

    .thirdctgy-item {
      padding: 0 0.1rem;
      line-height: 0.43rem;
      text-shadow: 0 0 0.01rem gray;
    }
  }

  .active-ctgy {
    color: white;
    background-color: rgba(255, 0, 0, 0.8);
    border-radius: 0.18rem;
  }

  .icon {
    display: inline-block;
    position: absolute;
    top: 0.1rem;
    right: 0.18rem;
    font-size: 0.18rem;
    color: rgba(123, 122, 122, 0.871);
  }
}
</style>
