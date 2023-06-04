<script setup lang="ts">
import { ref } from 'vue'
import { useToggle } from '@vueuse/core'
import EmptySearch from './EmptySearch.vue'
import SearchService from './service'
import router from '@/router'

const {
  isAutoComplete,
  searchStoreRefs,
  watchFocusAndInput,
  addOrUpdateSearchHistory,
  delSearchHistory,
  toggleAutoComplete,
  storeHistoryKeywords,
  storeHistoryKeywordsDesc,
} = SearchService
const { keyword, getSearchKeywords, getHistoryKeywords, getHistoryKeywordsDesc } = searchStoreRefs
const searchInputRef = ref<HTMLInputElement | null>(null)

storeHistoryKeywords()
storeHistoryKeywordsDesc()

watchFocusAndInput(searchInputRef)

const [isShowSearchFound, toggleSearchFound] = useToggle(true)
</script>

<template>
  <div class="search">
    <header class="search-header">
      <i class="iconfont icon-xiangzuojiantou back" @click="router.back" />
      <span class="search-text">搜索</span>
      <i class="iconfont" />
    </header>
    <div class="search-keyword">
      <div class="search-keyword-wrapper">
        <i class="iconfont icon-fangdajing magnifier" />
        <input
          ref="searchInputRef"
          v-model="keyword"
          type="text"
          class="search-keyword-input"
          @blur="toggleAutoComplete(false)"
          @focus="toggleAutoComplete(true)"
        >
      </div>
      <span class="search-button">搜索</span>
    </div>
    <div v-show="isAutoComplete" class="auto-complete">
      <div v-for="searchKeywordObj, idx in getSearchKeywords" :key="idx" class="complete-item">
        <span class="complete-item-text" @mousedown.self="addOrUpdateSearchHistory(searchKeywordObj.keyword)">{{ searchKeywordObj.keyword }}</span>
      </div>
      <EmptySearch v-show="getSearchKeywords.length === 0 || !getSearchKeywords" />
    </div>
    <div class="search-history">
      <div class="search-history-title">
        <span class="history-text">搜索历史</span>
        <i v-show="getHistoryKeywords.length" @click="delSearchHistory()" class="iconfont icon-shanchu del" />
      </div>
      <div class="search-history-list">
        <div v-for="historyKeyword, idx in getHistoryKeywords" :key="idx" class="search-history-item">
          <span>{{ historyKeyword }}</span>
        </div>
      </div>
    </div>
    <div class="search-history frequency">
      <div class="search-history-title">
        <span class="history-text">搜索发现</span>
        <span v-show="isShowSearchFound" @click="toggleSearchFound()">隐藏</span>
        <span v-show="!isShowSearchFound" @click="toggleSearchFound()">展开</span>
      </div>
      <div v-show="isShowSearchFound" class="search-history-list">
        <div v-for="historyKeyword, idx in getHistoryKeywordsDesc" :key="idx" class="search-history-item">
          <span>{{ historyKeyword }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 5.4rem;
  &-header {
    display: flex;
    align-items: center;
    height: 0.54rem;
    border-bottom: 1px solid #f6f6f6;
    .back {
      font-size: 0.3rem;
      color: #333;
    }
    .search-text {
      font-size: 0.25rem;
      font-weight: 500;
      text-align: center;
      color: #333;
      flex: 1;
    }
  }
  &-keyword {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.1rem;
    width: 5.14rem;
    height: 0.75rem;
    padding: 0 0.13rem;
    &-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.1rem;
      height: 0.6rem;
      border-radius: 0.6rem;
      background-color: #f6f6f6;
      .magnifier {
        font-size: 0.26rem;
        color: #999;
        margin-left: 0.2rem;
      }
      .search-keyword-input {
        width: 90%;
        height: 100%;
        border: none;
        font-size: 0.2rem;
        background: none;
        color: #999;
      }
    }
    .search-button {
      width: 0.5rem;
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.2rem;
      color: #999;
    }
  }
  .auto-complete {
    position: fixed;
    width: 5.4rem;
    height: calc(100vh - 1.29rem);
    background-color: white;
    .complete-item {
      display: flex;
      height: 0.6rem;
      line-height: 0.6rem;
      padding: 0 0.13rem;
      font-size: 0.2rem;
      color: #999;
      border-bottom: 1px solid #f6f6f6;
      .complete-item-text {
        font-weight: 500;
        flex: 1;
      }
    }
  }
  &-history {
    width: 5.14rem;
    padding: 0 0.13rem;
    &-title {
      display: flex;
      justify-content: space-between;
      height: 0.4rem;
      margin-top: 0.2rem;
      font-size: 0.2rem;
      color: #999;
      .history-text {
        font-weight: 500;
      }
      .del {
        font-size: 0.26rem;
        color: #999;
      }
    }
    &-list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.1rem;
      margin-top: 0.1rem;
      .search-history-item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.06rem 0.1rem;
        border-radius: 0.1rem;
        text-align: center;
        font-size: 0.2rem;
        color: #999;
        background-color: #f6f6f6;
      }
    }
  }

  .frequency {
    margin-top: 0.5rem;
  }
}
</style>
