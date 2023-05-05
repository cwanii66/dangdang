import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { useBookStore } from '@/pstore/books'
import FstToThrdCtgy from '@/views/ctgy/service'

const { ctgyStoreRefs } = FstToThrdCtgy
export const bookStore = useBookStore()

class BookService {
  static bookStoreRefs = storeToRefs(bookStore)
  static activeThirdCtgyId: Ref<number> = ref(ctgyStoreRefs.getThirdCtgy.value.thirdctgyId)

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
}

export default BookService
