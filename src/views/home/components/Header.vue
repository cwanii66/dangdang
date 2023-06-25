<script setup lang="ts">

</script>

<template>
  <div class="header">
    <h1 class="header-title">
      当当
    </h1>
    <div class="header-content">
      <div class="header-searchandsort">
        <div class="header-search">
          <i class="iconfont icon-fangdajing magnifier" />
          <input type="text" placeholder="神奇校车" class="header-search-input">
        </div>
        <div class="header-sort">
          <i class="iconfont icon-icon04 sort" />
          <span class="sort-text">分类</span>
        </div>
      </div>
      <div class="header-adv-img">
        <img class="img-adv" src="@/assets/img/adv.png">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  &-title {
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.26rem;
  }
  &-content {
    display: flex;
    flex-direction: column;
    height: 2.5rem;
    width: 100%;
    background-image: linear-gradient(#06086c, #04086c, #04086c, #e7e7ef);
    overflow: hidden;
    .header-searchandsort {
      margin-top: 0.2rem;
      display: flex;
      align-items: center;
      height: 0.6rem;
      gap: 0.2rem;
      .header-search {
        display: flex;
        align-items: center;
        gap: 0.1rem;
        flex: 1;
        height: 100%;
        background-color: #fff;
        border-radius: 0.3rem;
        padding: 0 0.1rem;
        .magnifier {
          font-size: 0.3rem;
          color: #999;
          margin-left: 0.1rem;
        }
        &-input {
          width: 82%;
          height: 0.6rem;
          border: none;
          outline: none;
          font-size: 0.2rem;
        }
      }
      .header-sort {
        display: flex;
        align-items: center;
        gap: 0.06rem;
        width: 1rem;
        height: 100%;
        font-size: 0.22rem;
        .sort {
          color: rgb(180, 180, 180);
        }
        .sort-text {
          color: #e0e0e0;
        }
      }
    }
    .header-adv-img {
      display: flex;
      align-self: center;
      margin-top: 0.18rem;
      width: 5.1rem;
      .img-adv {
        width: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
