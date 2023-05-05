import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import { useBookStore } from '@/pstore/books'
import FstToThrdCtgy from '@/views/ctgy/service'

const { ctgyStoreRefs } = FstToThrdCtgy
export const bookStore = useBookStore()

class BookService {
  static bookStoreRefs = storeToRefs(bookStore)

  static async fetchBookList() {
    watchEffect(async () => {
      if (ctgyStoreRefs.getActiveThirdCtgyId.value < 0)
        await bookStore.findBookListBySecondCtgyId(ctgyStoreRefs.getThirdCtgy.value.secctgyid)
      else
        await bookStore.findBookList(ctgyStoreRefs.getActiveThirdCtgyId.value)
    })
  }
}

export default BookService
