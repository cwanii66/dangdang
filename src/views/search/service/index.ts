import { ref, watchEffect } from 'vue'
import { refDebounced } from '@vueuse/core'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/pstore/search'

export const searchStore = useSearchStore()

class SearchService {
  static searchStoreRefs = storeToRefs(searchStore)
  static isAutoComplete = ref<boolean>(false)

  private constructor() {}

  static watchFocusAndInput(inputRef: Ref<HTMLInputElement | null>) {
    const debouncedKeywords = refDebounced(SearchService.searchStoreRefs.keyword, 600) // debounce updates of ref

    async function inputEffect() {
      if (debouncedKeywords.value !== '') {
        await searchStore.storeSearchKeywords(debouncedKeywords.value)
        SearchService.toggleAutoComplete(true)
        inputRef.value!.placeholder = ''
      }
      else {
        SearchService.toggleAutoComplete(false)
        searchStore.searchKeywords.length = 0
        inputRef.value!.placeholder = 'please input your keywords...'
      }
    }

    watchEffect(inputEffect, { flush: 'post' })
  }

  static toggleAutoComplete(isAutoComplete: boolean) {
    SearchService.isAutoComplete.value = isAutoComplete
  }

  private static async addSearchHistory(historyKeyword: string) {
    await searchStore.addSearchHistory(historyKeyword)
  }

  private static async updateSearchHistory(historyKeyword: string) {
    await searchStore.updateSearchHistory(historyKeyword)
  }

  static async addOrUpdateSearchHistory(historyKeyword: string) {
    const isAdded = searchStore.getHistoryKeywords.includes(historyKeyword)
    if (isAdded)
      await SearchService.updateSearchHistory(historyKeyword)
    else
      await SearchService.addSearchHistory(historyKeyword)

    SearchService.toggleAutoComplete(false)
    SearchService.storeHistoryKeywordsDesc()
  }

  static async storeHistoryKeywords() {
    await searchStore.storeHistorKeywords()
  }

  static async storeHistoryKeywordsDesc() {
    await searchStore.storeHistoryKeywordsDesc()
  }
}

export default SearchService
