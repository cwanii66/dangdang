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
  .content {
    position: fixed;
    display: flex;
    margin: 0 .18rem;
    width: 5.04rem;
    height: 0.85rem;
    align-items: center;
    .search-bar {
      display: flex;
      align-items: center;
      width: 4.32rem;
      height: 0.67rem;
      background-color: #f6f6f6;
      border-radius: 1rem;
      .icon-fangdajing {
        font-size: 0.32rem;
        margin: 0 0.2rem;
      }
      .search-keyword {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        width: 3.5rem;
        height: 0.63rem;
        & > .search-keyword-input {
          width: 2.8rem;
          height: 0.63rem;
          background: none;
          border: none;
          font-size: 0.28rem;
        }
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
