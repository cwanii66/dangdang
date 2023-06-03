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
}

export const useSearchStore = defineStore('search-store', {
  state: (): SearchStoreState => ({
    keyword: '', // user input
    searchKeywords: [],
    historyKeywords: [],
  }),
  getters: {
    getSearchKeywords(state) {
      return state.searchKeywords
    },
    getHistoryKeywords(state) {
      return state.historyKeywords.length > 0 ? state.historyKeywords : storage.get('historyKeywords')
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
        this.historyKeywords = historyKeywordList
      }
    },
    async updateSearchHistory(historyKeyword: string) {
      const affectedRows = await searchAPI.updateSearchHistory(historyKeyword)
    },
  },
})
