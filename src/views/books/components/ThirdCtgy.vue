<script setup lang="ts">
import { computed, ref } from 'vue'
import FstToThrdCtgy from '@/views/ctgy/service'

const { openOrCollapseInBook, setActiveThirdCtgyId } = FstToThrdCtgy
const { getThirdCtgyList, getSubThirdCtgyList, isSpreadCtgys, getThirdCtgy } = FstToThrdCtgy.ctgyStoreRefs

const activeThirdCtgyId = ref<number>(getThirdCtgy.value.thirdctgyId)
const thirdCtgyList = computed(() => isSpreadCtgys.value ? getThirdCtgyList.value : getSubThirdCtgyList.value)
const allEl = ref<HTMLDivElement | null>(null)

function setActiveThirdCtgy(idx: number) {
  if (idx === -1) {
    allEl.value?.classList.add('active-ctgy')
    activeThirdCtgyId.value = -1
  }
  else {
    allEl.value?.classList.remove('active-ctgy')
    activeThirdCtgyId.value = thirdCtgyList.value[idx].thirdctgyId
  }
  setActiveThirdCtgyId(activeThirdCtgyId.value)
}
</script>

<template>
  <div class="content">
    <div ref="allEl" class="thrdctgys" @click="setActiveThirdCtgy(-1)">
      <span class="thirdctgy-item">全部</span>
    </div>
    <div v-for="thirdctgy, idx in thirdCtgyList" :key="thirdctgy.thirdctgyId" class="thrdctgys"
      :class="{ 'active-ctgy': activeThirdCtgyId === thirdctgy.thirdctgyId }" @click="setActiveThirdCtgy(idx)">
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
  margin: 0.2rem 0;
  width: 5.04rem;
  overflow: hidden;

  .thrdctgys {
    float: left;
    font-size: 0.18rem;
    margin-right: 0.24rem;
    height: 0.4rem;

    .thirdctgy-item {
      padding: 0 0.1rem;
      line-height: 0.4rem;
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
