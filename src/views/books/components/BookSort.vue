<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import BookService from '../service'

const props = defineProps<{
  ctrlShopCart: (isShow: boolean) => void
}>()

const { sortField, sortBook, isDesc, isAutoCompSearch, isPublishersOpen, isAuthorsOpen, initForBookSortComp, findBooksByPublisherIds } = BookService
const { publishers } = BookService.bookStoreRefs

const isShowShopCart = computed(() => !isPublishersOpen.value && !isAuthorsOpen.value)
function togglePublishersOpen() {
  document.body.style.overflow = isPublishersOpen.value ? 'auto' : 'hidden'
  isPublishersOpen.value = !isPublishersOpen.value
}
function toggleAuthorsOpen() {
  document.body.style.overflow = isAuthorsOpen.value ? 'auto' : 'hidden'
  isAuthorsOpen.value = !isAuthorsOpen.value
}
watchEffect(() => {
  props.ctrlShopCart(isShowShopCart.value)
})

initForBookSortComp()
</script>

<template>
  <ul class="book-sort">
    <li class="compsive">
      <span class="inner">综合</span>
    </li>
    <li :class="{ selected: sortField === 'monthsalecount' }" @click.self="sortBook('monthsalecount')">
      销量
    </li>
    <li :class="{ selected: sortField === 'originalprice' }" @click.self="sortBook('originalprice')">
      价格
      <span class="asc-desc">
        <i v-show="isDesc" class="iconfont icon-zuoce-xiangxiaxiaojiantousvg" />
        <i v-show="!isDesc" class="iconfont icon-zuoce-xiangshangxiaojiantou" />
      </span>
    </li>
    <li class="shop">
      店铺
    </li>
    <li class="dressing">
      筛选
      <i class="iconfont icon-shaixuan" />
    </li>
  </ul>
  <ul v-show="isAutoCompSearch" class="auto-comp-search">
    <li>当当发货</li>
    <li>促销</li>
    <li class="publisher" @click.self="togglePublishersOpen()">
      出版社
      <span class="down-or-up-arrow" @click="togglePublishersOpen()">
        <i v-show="isPublishersOpen" class="iconfont icon-zuoce-xiangshangxiaojiantou" />
        <i v-show="!isPublishersOpen" class="iconfont icon-zuoce-xiangxiaxiaojiantousvg" />
      </span>
      <section v-show="isPublishersOpen" class="publisher-panel">
        <div class="publisher-items">
          <div
            v-for="publisher in publishers"
            :key="publisher.publishid"
            class="publisher-item"
          >
            <span class="publisher-item-name">{{ publisher.publishername }}</span>
            <span><i class="iconfont icon-duigou2" /></span>
          </div>
        </div>
        <div class="confirm-reset">
          <span class="reset">重置</span>
          <span
            class="confirm"
            @click.stop="
              findBooksByPublisherIds(),
              togglePublishersOpen()
            "
          >搜索</span>
        </div>
        <div class="overlay" />
      </section>
    </li>
    <li class="author">
      作者
      <span class="down-or-up-arrow">
        <i v-show="isAuthorsOpen" class="iconfont icon-zuoce-xiangshangxiaojiantou" @click="toggleAuthorsOpen()" />
        <i v-show="!isAuthorsOpen" class="iconfont icon-zuoce-xiangxiaxiaojiantousvg" @click="toggleAuthorsOpen()" />
      </span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.book-sort,
.auto-comp-search {
  display: flex;
  font-size: 0.2rem;
  align-items: center;
  margin-left: 0.1rem;

  >li {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  .selected {
    color: rgb(255, 33, 33);
  }
}

.auto-comp-search {
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  .publisher {
    position: relative;
    &-panel {
      position: absolute;
      width: 5.4rem;
      left: -2.63rem;
      top: 0.32rem;
      background-color: white;
      .publisher-items {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
      }
      .confirm-reset {
        display: flex;
        border-top: 0.02rem solid #f6f6f6;
        height: 0.8rem;
        align-items: center;
        justify-content: space-around;
        .confirm,
        .reset {
          height: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          flex: 1;
          color: #666;
        }
        .reset {
          border-right: 0.02rem solid #f6f6f6;
        }
      }
      .overlay {
        position: absolute;
        width: 5.4rem;
        height: 100vh;
        background-color: #7777774a;
        z-index: 999;
      }
    }
    &-item {
      height: 0.82rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .iconfont {
        font-size: 0.2rem;
        color: #666;
      }
    }
  }
}
</style>
