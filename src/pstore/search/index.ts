import { defineStore } from 'pinia'
import storage, { OPTION } from '@/utils/storageUtil'
import searchAPI from '@/api/SearchAPI'

export interface Keyword {
  kwid: number
  keyword: string
}

export interface HistoryKeyword {
  hkwid: number
  historykeyword: string
  clickcount: number
}

export interface SearchStoreState {
  keyword: string
  searchKeywords: Keyword[]
  historyKeywords: string[]
  historyKeywordsDesc: string[]
}

export const useSearchStore = defineStore('search-store', {
  state: (): SearchStoreState => ({
    keyword: '', // user input
    searchKeywords: [],
    historyKeywords: [],
    historyKeywordsDesc: [],
  }),
  getters: {
    getSearchKeywords(state) {
      return state.searchKeywords
    },
    getHistoryKeywords(state): string[] {
      return state.historyKeywords.length > 0 ? state.historyKeywords : storage.get('historyKeywords')
    },
    getHistoryKeywordsDesc(state): string[] {
      return state.historyKeywordsDesc
    },
  },
  actions: {
    async storeSearchKeywords(keyword: string) {
      const keywordList = await searchAPI.getSearchKeywords(keyword)
      this.searchKeywords = keywordList.data
    },
    async addSearchHistory(historyKeyword: string) {
      const addedHkwid = await searchAPI.addSearchHistory(historyKeyword)
      if (addedHkwid.data) {
        const historyKeywordList = storage.set('historyKeywords', historyKeyword, OPTION.ACCUMULATE)
        this.historyKeywords = historyKeywordList.slice(-9).reverse()
      }
    },
    async updateSearchHistory(historyKeyword: string) {
      await searchAPI.updateSearchHistory(historyKeyword)
    },
    async storeHistorKeywords() {
      const historyKeywordList = await searchAPI.getHistoryKeywords()
      this.historyKeywords
        = historyKeywordList.data
          .map((item: HistoryKeyword) => item.historykeyword)
          .slice(-9)
          .reverse()
      if (!storage.get('historyKeywords'))
        storage.set('historyKeywords', this.historyKeywords)
    },
    async storeHistoryKeywordsDesc() {
      const historyKeywordList = await searchAPI.getHistoryKeywordsDesc()
      this.historyKeywordsDesc
        = historyKeywordList.data
          .map((item: HistoryKeyword) => item.historykeyword)
          .slice(0, 6)
    },
  },
})
