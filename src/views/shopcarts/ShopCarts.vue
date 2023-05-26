<script setup lang="ts">
import getImg from '@/utils/imgUtil'
</script>

<template>
  <div class="shopcarts">
    <header class="header">
      <i class="iconfont icon-xiangzuojiantou back-arrow" />
      <input type="checkbox" class="check">
      <span class="label">当当网</span>
    </header>
    <main class="items">
      <div class="item">
        <div class="content">
          <input type="checkbox" class="check">
          <div class="pic">
            <img :src="getImg('1童年.png')" class="pic-image">
          </div>
          <div class="description">
            <div class="book-title">
              童年
            </div>
            <div class="price">
              <span class="curprice">&yen;89.93</span>
              <span>添加删除购物车组件</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <input type="checkbox" class="check">
          <div class="pic">
            <img :src="getImg('1童年.png')" class="pic-image">
          </div>
          <div class="description">
            <div class="book-title">
              童年
            </div>
            <div class="price">
              <span class="curprice">&yen;89.93</span>
              <span>添加删除购物车组件</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="content">
          <input type="checkbox" class="check">
          <div class="pic">
            <img :src="getImg('1童年.png')" class="pic-image">
          </div>
          <div class="description">
            <div class="book-title">
              童年
            </div>
            <div class="price">
              <span class="curprice">&yen;89.93</span>
              <span>添加删除购物车组件</span>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="cal">
      <span class="checkall">
        <input type="checkbox" class="check">
        <span class="label">全选</span>
        <span class="total">
          合计: <span class="money">&yen;989.93</span>
        </span>
      </span>
      <span class="settlement">去结算3232.32</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shopcarts {
  padding: 0 0.13rem;
  .header {
    display: flex;
    position: fixed;
    width: 5.14rem;
    height: 0.85rem;
    align-items: center;
    gap: 0.25rem;
    background-color: white;
    z-index: 99;
    .back-arrow,
    .label {
      font-size: 0.25rem;
    }
    .check {
      width: 0.3rem;
      height: 0.22rem;
      cursor: pointer;
    }
  }
  .items {
    display: grid;
    grid-template-columns: 5.14rem;
    // grid-template-rows: repeat(auto-fill, 2.89rem);
    grid-auto-rows: 2.89rem;
    align-items: center;
    row-gap: 0.2rem;
    padding: 0.2rem 0;
    position: relative;
    width: 5.14rem;
    top: 0.86rem;
    bottom: 0.86rem;
    overflow-y: scroll;
    .content {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      .check {
        width: 0.3rem;
        height: 0.22rem;
        cursor: pointer;
      }
      .pic {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.539rem;
        height: 2.16rem;
        .pic-image {
          width: 80%;
          height: 70%;
        }
      }
      .description {
        display: flex;
        width: 3.21rem;
        flex-direction: column;
        .book-title {
          height: 0.8rem;
          line-height: 0.8rem;
          color: #272727;
          font-size: 0.2rem;
        }
        .price {
          display: flex;
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          font-size: 0.2rem;
          color: #ea5430;
          .curprice {
            flex: 1;
          }
          span {
            flex: 2;
          }
        }
      }
    }
  }
  .cal {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 5.14rem;
    height: 0.85rem;
    bottom: 0;
    background-color: white;
    z-index: 99;
    .checkall {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      .check {
        width: 0.3rem;
        height: 0.22rem;
        cursor: pointer;
      }
      .label {
        font-size: 0.25rem;
      }
      .total {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.1rem;
        margin-left: 0.2rem;
        font-weight: 600;
        .money {
          font-size: 0.25rem;
          color: #ea5430;
        }
      }
    }
    .settlement {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.2rem;
      height: 0.6rem;
      background-color: #ea5430;
      border-radius: 1rem;
      color: white;
      font-size: 0.25rem;
      text-shadow: 0 0 0.01rem #3f3f3f;
    }
  }
}
</style>
