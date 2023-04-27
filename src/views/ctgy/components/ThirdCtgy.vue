<script setup lang="ts">
import { ref } from 'vue'
import type { SecondCtgy, ThirdCtgy } from '@/pstore/ctgy/state'

const props = defineProps<{
  thirdctgys: ThirdCtgy[]
  isSpreadCtgys: boolean
  secondctgy: SecondCtgy
  subThirdCtgys: ThirdCtgy[]
}>()

const spreadSwitcher = ref<string>('展开')
const spreadFlag = ref<boolean>(props.isSpreadCtgys)
const spreadIconClass = ref<string>('icon-xiangxiajiantou')
function switchSpread() {
  spreadSwitcher.value = spreadSwitcher.value === '展开' ? '收起' : '展开'
  spreadIconClass.value = spreadSwitcher.value === '展开' ? 'icon-xiangxiajiantou' : 'icon-xiangshangjiantou'
  spreadFlag.value = !spreadFlag.value
}

function displayClass(index: number) {
  return (index % 3 !== 0) ? '' : 'hidden'
}
</script>

<template>
  <ul class="thirdctgy">
    <li class="thirdctgy-item" v-for="({ thirdctgyId, thirdname }, index) in (spreadFlag ? thirdctgys : subThirdCtgys)"
      :key="thirdctgyId">
      <span class="thirdname">{{ thirdname }}</span>
      <i class="iconfont icon-shuxian" :class="displayClass(index + 1)"></i>
    </li>

    <div class="spread">
      <div class="spread-button" @click="switchSpread">
        <span> {{ spreadSwitcher }} </span>
        <i class="iconfont" :class="spreadIconClass"></i>
      </div>
    </div>
  </ul>
</template>

<style lang="scss" scoped>
.thirdctgy {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  padding: 0 0.05rem 0 0.1rem;

  &-item {
    display: flex;
    padding: 0.2rem 0;

    .thirdname {
      flex: 1;
    }
  }

  .spread {
    width: 1.25rem;
    grid-column-end: 4;
    padding: 0.2rem 0;
    color: rgba(150, 150, 150, 0.818);

    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      .iconfont {
        font-size: 0.03rem;
      }
    }
  }
}

/* resolve the problem of the last line of the third category */
.hidden::before {
  visibility: hidden;
  pointer-events: none;
}
</style>
