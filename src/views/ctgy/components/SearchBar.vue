<script setup lang="ts">

</script>

<template>
  <div class="content">
    <!-- input element -->
    <div class="search-bar">
      <i class="iconfont icon-fangdajing"></i>
      <div class="search-keyword">
        <input type="text" class="search-keyword-input" placeholder="typescript" />
        <i class="iconfont icon-iconfontscan"></i>
      </div>
    </div>
    <div class="message">
      <i class="iconfont icon-xiaoxi"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/css/common' as *;
  .content {
    @extend .multiplex-content;
    .search-bar {
      @extend .multiplex-search-bar;
      .icon-fangdajing {
        font-size: 0.32rem;
        margin: 0 0.2rem;
      }
      .search-keyword {
        @extend .multiplex-search-keyword;
        .icon-iconfontscan {
          font-size: 0.32rem;
        }
      }
    }
    .message {
      display: flex;
      align-items: center;
      width: 0.76rem;
      margin-left: 0.28rem;
      .icon-xiaoxi {
        font-size: 0.36rem;
      }
    }
  }
</style>
