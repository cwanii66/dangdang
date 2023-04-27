<script setup lang="ts">
import FirstToThirdCtgy from '../service'
import ThirdCtgy from './ThirdCtgy.vue'
import type { SecondCtgy } from '@/pstore/ctgy/state'

const {
  ctgyStoreRefs,
  firstCtgyActiveIndex,
  setActiveIndex,
  getAllCtgys,
} = FirstToThirdCtgy
const { firstCtgyList, secondCtgyList } = ctgyStoreRefs
getAllCtgys()

function getThirdCtgyProps(secondctgy: SecondCtgy) {
  return {
    thirdctgys: secondctgy.thirdctgys,
    isSpreadCtgys: secondctgy.isSpreadCtgys,
    subThirdCtgys: secondctgy.subThirdCtgys,
    secondctgy,
  }
}
</script>

<template>
  <main class="content">
    <ul class="firstctgy">
      <li class="firstctgy-item" :class="{ 'firstctgy-item-active': firstCtgyActiveIndex === index }"
        @click="setActiveIndex(index)" v-for="(firstctgy, index) in firstCtgyList" :key="firstctgy.firstctgyId">
        <span class="firstctgy-name"> {{ firstctgy.name }} </span>
      </li>
    </ul>
    <div class="secthrdctgy-wrapper">
      <ul class="secthrdctgy">
        <template v-for="secondctgy in secondCtgyList" :key="secondctgy.secondctgyId">
          <li class="secthrdctgy-item">
            <div class="secondctgy-item">
              <span class="secctgyname"> {{ secondctgy.secondgyname }} </span>
              <span class="secctgyname-gallery"> {{ secondctgy.secondgyname }}馆 <i
                  class="iconfont icon-xiangyoujiantou"></i> </span>
            </div>
            <ThirdCtgy v-bind="getThirdCtgyProps(secondctgy)" />
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  width: 100%;
  top: 1.02rem;
  left: 0;
  bottom: 0.85rem;
  gap: 0.2rem;

  .firstctgy {
    width: 1.3rem;
    flex-basis: 1.3rem;
    overflow-y: auto;

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 0.78rem;
      color: #333;
    }

    &-item-active {
      text-shadow: 0 0 0.02rem #2a2a2a;
      color: red;
      background-color: #f7f7f7;

      .firstctgy-name {
        width: 100%;
        text-align: center;
        border-left: 0.08rem solid rgba(255, 0, 0, 0.8);
      }
    }
  }

  .secthrdctgy-wrapper {
    flex: 1;
    margin-right: 0.19rem;
    overflow-y: scroll;

    .secthrdctgy {
      display: flex;
      flex-direction: column;

      .secthrdctgy-item {
        background-color: white;

        .secondctgy-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 0.73rem;

          .secctgyname {
            color: #0d0d0d;
            font-size: 0.2rem;
            font-weight: 600;
          }

          .secctgyname-gallery {
            color: #999;
            font-size: 0.14rem;
          }
        }
      }
    }
  }
}
</style>
