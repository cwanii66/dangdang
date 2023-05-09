import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { useBookStore } from '@/pstore/books'
import type { BookInfo } from '@/pstore/books'
import FstToThrdCtgy from '@/views/ctgy/service'

type SortType = 'desc' | 'asc'
type SortFieldType = keyof BookInfo

const { ctgyStoreRefs } = FstToThrdCtgy
export const bookStore = useBookStore()

class BookService {
  static bookStoreRefs = storeToRefs(bookStore)
  static activeThirdCtgyId: Ref<number> = ref(ctgyStoreRefs.getThirdCtgy.value.thirdctgyId)
  static sortField: Ref<string> = ref('originalprice')
  static sortType: Ref<SortType> = ref('desc')
  static isDesc: Ref<boolean> = ref(true) // depends on sort type

  static async fetchBookList() {
    watchEffect(async () => {
      if (BookService.activeThirdCtgyId.value < 0)
        await bookStore.findBookListBySecondCtgyId(ctgyStoreRefs.getThirdCtgy.value.secctgyid)
      else
        await bookStore.findBookList(BookService.activeThirdCtgyId.value, BookService.sortField.value, BookService.sortType.value)
    })
  }

  static setActiveThirdCtgyId(thirdCtgyId: number) {
    BookService.activeThirdCtgyId.value = thirdCtgyId
  }

  static sortBook(sortField: SortFieldType) {
    BookService.sortField.value = sortField
    BookService.toggleSortType()
  }

  static toggleSortType() {
    BookService.sortType.value = BookService.sortType.value === 'desc' ? 'asc' : 'desc'
    if (BookService.sortField.value !== 'originalprice')
      return
    BookService.isDesc.value = BookService.sortType.value === 'desc'
  }
}

export default BookService
