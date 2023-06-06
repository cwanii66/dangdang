import { ref, watchEffect } from 'vue'
import { refDebounced } from '@vueuse/core'
import type { Ref } from 'vue'
import { storeToRefs } from 'pinia'
import CompUtil from '@/utils/CompUtil'
import { useSearchStore } from '@/pstore/search'
import { Operate, useBookStore } from '@/pstore/books'
import router from '@/router'

const bookStore = useBookStore()
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

  static async delSearchHistory() {
    CompUtil.confirm(
      'Are you sure to delete all search history?',
      'Delete Search History',
      'confirm',
      'cancel',
      'warning',
    )
      .then(async () => {
        await searchStore.delSearchHistory()
        CompUtil.message({
          message: 'Delete Search History Successfully!',
          type: 'success',
          duration: 1000,
        })
      })
      .catch((reason) => {
        reason === 'cancel'
          && CompUtil.message({
            message: 'Delete Search History Cancelled!',
            type: 'warning',
            duration: 1000,
          })
      })
  }

  static async searchBooksByKeyword(historyKeyword: string) {
    await SearchService.addOrUpdateSearchHistory(historyKeyword)
    bookStore.storeOperate(Operate.AUTOCOMPKEYWORD)
    searchStore.storeCompKeyword(historyKeyword)
    router.push({ name: 'books' })
  }
}

export default SearchService
