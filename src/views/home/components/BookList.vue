<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import Loading from '../components/Loading.vue'
import { HomeService } from '../service'
import getImg from '@/utils/imgUtil'
import { throttle } from '@/utils/generalUtil'

const { getCurrentPageDataList, isLastPage } = HomeService.bookStoreRefs
const { findBooksWithPager, pageScroll } = HomeService

const booksRef = ref<HTMLElement | null>(null)

findBooksWithPager()

useEventListener('scroll', throttle(pageScroll, 1000))
</script>

<template>
  <div class="dangdang-books">
    <div ref="booksRef" class="dangdang-books-wrapper">
      <div
        v-for="bookItem in getCurrentPageDataList"
        :key="bookItem.ISBN"
        class="dangdang-books-item"
      >
        <div class="dangdang-books-pic">
          <img class="bookpic" :src="getImg(bookItem.bookpicname)">
        </div>
        <div class="dangdang-books-summary">
          <div class="dangdang-books-title">
            {{ bookItem.bookname }}
          </div>
          <div class="dangdang-books-favorable">
            <span class="self-support">自营</span>
            <span class="coupons">券</span>
            <span class="free-shipping">包邮</span>
          </div>
          <div class="price-and-addcart">
            <span class="price">&yen;{{ bookItem.discountprice }}</span>
            <span class="shopcart">
              <i class="iconfont icon-gouwuche shopcart-icon" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!isLastPage" class="dangdang-books-loading">
      <Loading />
    </div>
    <div v-show="isLastPage" class="dangdang-books-bottom">
      到底了
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dangdang-books {
  position: absolute;
  top: 5.4rem;
  width: 5.2rem;
  &-wrapper {
    width: 5.2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.1rem;
    background-color: rgba(255, 247, 240, 0.9);
    .dangdang-books-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 0.1rem;
      width: 2.55rem;
      background-color: #fff;
      .dangdang-books-pic {
        display: flex;
        justify-content: center;
        width: 2.5rem;
        .bookpic {
          width: 80%;
          height: 2rem;
          object-fit: contain;
        }
      }
      .dangdang-books-summary {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        margin-bottom: 0.08rem;
        .dangdang-books-title {
          font-size: 0.2rem;
          padding: 0 0.05rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dangdang-books-favorable {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          .self-support {
            padding: 0.05rem;
            border-radius: 0.05rem;
            text-shadow: 0 0.005rem #7f7f7f;
            background-color: #eb636d;
            color: #fff;
          }
          .coupons,
          .free-shipping {
            padding: 0.05rem;
            border-radius: 0.05rem;
            border: 1px #d06d70 solid;
            color: #7f7f7f;
            box-shadow: 0 0 0 0.01rem #d06d70;
            text-shadow: 0 0.005rem #d06d70;
          }
        }
        .price-and-addcart {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            font-size: 0.2rem;
            color: #d06d70;
          }
          .shopcart {
            margin-right: 0.1rem;
            background-color: #fb4b3c;
            border-radius: 50%;
            padding: 0.05rem;
            color: #fff;
            .shopcart-icon {
              text-shadow: 0 0.01rem #7f7f7f;
            }
          }
        }
      }
    }
  }
  &-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.5rem;
    font-size: 0.2rem;
    color: #7f7f7f;
  }
}
.dangdang-books::after {
  content: '';
  display: block;
  width: 100%;
  height: 0.7rem;
  background-color: transparent;
}
</style>
