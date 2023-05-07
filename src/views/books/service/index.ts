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
  static sortField: Ref<string> = ref('')
  static sortType: Ref<SortType> = ref('desc')
  static isDesc: Ref<boolean> = ref(true) // depends on sort type

  static async fetchBookList() {
    watchEffect(async () => {
      if (BookService.activeThirdCtgyId.value < 0)
        await bookStore.findBookListBySecondCtgyId(ctgyStoreRefs.getThirdCtgy.value.secctgyid)
      else
        await bookStore.findBookList(BookService.activeThirdCtgyId.value)
    })
  }

  static setActiveThirdCtgyId(thirdCtgyId: number) {
    BookService.activeThirdCtgyId.value = thirdCtgyId
  }

  static sortBook(sortField: string) {
    BookService.sortField.value = sortField
    BookService.toggleSortType()
    switch (sortField) {
      case 'price':
        BookService.defaultSort('originalprice')
        break
      case 'monthsalecount':
        BookService.defaultSort('monthsalecount')
        break
      default:
        break
    }
  }

  static toggleSortType() {
    BookService.sortType.value = BookService.sortType.value === 'desc' ? 'asc' : 'desc'
    BookService.isDesc.value = BookService.sortType.value === 'desc'
  }

  static defaultSort(sortFieldType: SortFieldType) {
    if (BookService.isDesc.value) // TODO: fix type error for sortFieldType
      bookStore.bookList.sort((a, b) => <number>b[sortFieldType] - <number>a[sortFieldType])
    else
      bookStore.bookList.sort((a, b) => <number>a[sortFieldType] - <number>b[sortFieldType])
  }
}

export default BookService
