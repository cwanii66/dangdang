import { storeToRefs } from 'pinia'
import { ref, watchEffect } from 'vue'
import { useBookStore } from '@/pstore/books'
import FstToThrdCtgy from '@/views/ctgy/service'

const { ctgyStoreRefs } = FstToThrdCtgy
export const bookStore = useBookStore()

class BookService {
  static bookStoreRefs = storeToRefs(bookStore)

  static async fetchBookList() {
    const initialThirdCtgyId = ref<number>(ctgyStoreRefs.getThirdCtgy.value.thirdctgyId)
    watchEffect(async () => {
      await bookStore.findBookList(initialThirdCtgyId.value)
    })
  }
}

export default BookService
