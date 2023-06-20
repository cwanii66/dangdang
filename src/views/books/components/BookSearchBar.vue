<script setup lang="ts">
import FstToThrdCtgy from '@/views/ctgy/service'

const { ctgyStoreRefs, back, toSearch } = FstToThrdCtgy
const { getThirdCtgy } = ctgyStoreRefs
</script>

<template>
  <div class="content">
    <span @click="$router.push({ name: 'ctgy' })"><i class="iconfont icon-xiangzuojiantou" /></span>
    <div class="search-bar">
      <i class="iconfont icon-fangdajing" />
      <div class="search-keyword">
        <div class="input-keyword">
          <span class="keyword"> {{ getThirdCtgy.thirdname }} </span>
          <i class="iconfont icon-close" />
        </div>
        <div class="input-bar">
          <input type="text" class="search-keyword-input" @click.prevent="toSearch">
          <i class="iconfont icon-iconfontscan" />
        </div>
      </div>
    </div>
    <i class="iconfont icon-iosgengduo_o more" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/css/common' as *;

.content {
  @extend .multiplex-content;
  background-color: white;
  z-index: 999;
  .search-bar {
    @extend .multiplex-search-bar;
    margin: 0 0.2rem;
    .icon-fangdajing {
      font-size: 0.32rem;
      margin: 0 0.2rem;
    }

    .search-keyword {
      display: grid;
      grid-template-columns: 3rem;
      .input-keyword {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: center;
        width: min-content;
        height: 0.3rem;
        border-radius: 1rem;
        background-color: #838383;
        padding: 0.09rem 0.13rem;
        color: white;
        .keyword {
          white-space: nowrap;
        }
        .icon-close {
          justify-self: flex-end;
          margin-left: 0.12rem;
        }
      }

      .input-keyword,
      .input-bar {
        grid-area: 1 / 1 / 2 / 2;
      }

      .input-bar {
        @extend .multiplex-search-keyword;
      }
    }
  }

  .more {
    font-size: 0.4rem
  }
}
</style>
