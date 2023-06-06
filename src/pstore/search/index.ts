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
  autoCompKeyword: string
}

export const useSearchStore = defineStore('search-store', {
  state: (): SearchStoreState => ({
    keyword: '', // user input
    searchKeywords: [],
    historyKeywords: [],
    historyKeywordsDesc: [],
    autoCompKeyword: '',
  }),
  getters: {
    getSearchKeywords(state) {
      return state.searchKeywords
    },
    getHistoryKeywords(state): string[] {
      return state.historyKeywords.length > 0 ? state.historyKeywords : storage.get('historyKeywords', OPTION.ACCUMULATE)
    },
    getHistoryKeywordsDesc(state): string[] {
      return state.historyKeywordsDesc.length > 0 ? state.historyKeywordsDesc : storage.get('historyKeywordsDesc', OPTION.ACCUMULATE)
    },
    getAutoCompKeyword(state): string {
      return state.autoCompKeyword ? state.autoCompKeyword : storage.get('autoCompKeyword')
    },
  },
  actions: {
    storeCompKeyword(autoCompKeyword: string) {
      this.autoCompKeyword = autoCompKeyword
      storage.set('autoCompKeyword', autoCompKeyword)
    },
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
      if (!storage.get('historyKeywordsDesc'))
        storage.set('historyKeywordsDesc', historyKeywordList.data)
    },
    async delSearchHistory() {
      await searchAPI.delSearchHistory()
      this.historyKeywords.length = 0
      storage.remove('historyKeywords')
    },
  },
})
