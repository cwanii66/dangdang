import { storeToRefs } from 'pinia'
import { useBookStore } from '@/pstore/books'

const bookStore = useBookStore()
export class HomeService {
  static bookStoreRefs = storeToRefs(bookStore)

  static async findBooksWithPager() {
    await bookStore.findBooksWithPager()
  }

  static async pageScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement || document.body
    if (scrollTop + clientHeight >= scrollHeight)
      await bookStore.findBooksWithPager()
  }
}
