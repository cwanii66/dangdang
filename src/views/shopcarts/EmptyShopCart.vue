<template>
  <div id="empty">
    <div class="empty-shopcart">
      <i class="iconfont icon-konggouwuche" />
    </div>
    <div class="empty-description">
      <span>您的购物车空空如也，快去逛逛吧！</span>
    </div>
    <div class="empty-button">
      <router-link to="/ctgy" class="button">
        去逛逛
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#empty {
  display: flex;
  width: 5.14rem;
  height: 6rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  .empty-shopcart {
    .iconfont {
      font-size: 2rem;
      color: #6a6a6a8d;
      text-shadow: 0 0 0.3rem #3f3f3f;
    }
  }
  .empty-description {
    font-size: 0.3rem;
  }
  .empty-button {
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.2rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      background-color: #ff6700;
      color: white;
      font-size: 0.3rem;
    }
  }
}
</style>
