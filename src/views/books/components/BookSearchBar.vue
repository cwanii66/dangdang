<script setup lang="ts">

</script>

<template>
  <div class="content">
    <i class="iconfont icon-xiangzuojiantou"></i>
    <div class="search-bar">
      <i class="iconfont icon-fangdajing"></i>
      <div class="search-keyword">
        <!-- multiple render in future -->
        <div class="input-keyword">
          <span class="keyword"> keyword </span>
          <i class="iconfont icon-close"></i>
        </div>
        <div class="input-bar">
          <input type="text" class="search-keyword-input" placeholder="" />
          <i class="iconfont icon-iconfontscan"></i>
        </div>
      </div>
    </div>
    <i class="iconfont icon-iosgengduo_o more"></i>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/css/common' as *;

.content {
  @extend .multiplex-content;
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
        justify-content: space-between;
        align-self: center;
        width: 0.7rem;
        height: 0.3rem;
        border-radius: 1rem;
        background-color: #838383;
        padding: 0.09rem 0.45rem 0.09rem 0.13rem;
        color: white;
        .keyword {
          flex: 1;
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
